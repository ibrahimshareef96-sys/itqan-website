import { NextRequest, NextResponse } from "next/server";
import { upsertSubscriber, sendTx, ListmonkError } from "@/lib/listmonk";
import { rateLimit } from "@/lib/rate-limit";
import { SITE_URL } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/leads/capture
 *
 * Public, unauthenticated endpoint hit by the magnet landing page opt-in form.
 *
 * SECURITY — this route emails a link from itqanstudio.com's trusted, SPF/DKIM
 * signed domain, so it MUST NOT be usable as an open spam/phishing relay:
 *   - The delivered link is built SERVER-SIDE as `${SITE_URL}/magnet/<slug>` — an
 *     absolute URL on our OWN canonical origin (SITE_URL is a hardcoded constant,
 *     never the request Host header). The request body can NEVER choose the URL
 *     we email. (Prior versions trusted a body `pdfUrl` — that was the relay hole.)
 *   - Per-IP and per-email rate limits cap bulk spam + backscatter at a third
 *     party, protecting the sending reputation.
 *   - The tag keyword is sanitized to /^[a-z0-9_-]{1,40}$/ before use.
 *
 * Flow: validate -> rate-limit -> upsert subscriber (Itqan list, preconfirmed,
 * tagged magnet-itqan-<kw>) -> send the delivery tx email with the own-origin
 * magnet_url. Delivery is best-effort; the subscriber + tag is the durable record.
 *
 * Body: { email, magnetSlug, dmKeyword, firstName? }
 * (A `pdfUrl` in the body is intentionally ignored — the link is server-derived.)
 *
 * Mirrors the hardening shipped in itqan-crm's equivalent route.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Per-IP: bulk-abuse cap. Per-email: backscatter/harassment cap on a third party.
const IP_MAX = 12;
const IP_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const EMAIL_MAX = 3;
const EMAIL_WINDOW_MS = 24 * 60 * 60 * 1000; // 1 day

interface CapturePayload {
  email?: unknown;
  magnetSlug?: unknown;
  dmKeyword?: unknown;
  firstName?: unknown;
}

/**
 * A magnet keyword becomes part of a Listmonk tag (magnet-itqan-<kw>), which
 * must match /^[a-zA-Z0-9_-]+$/. Sanitize + cap so the tag stays well-formed.
 */
function sanitizeKeyword(raw: string): string {
  return raw.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 40);
}

/**
 * Best-effort real client IP. Coolify's Traefik appends the true peer as the
 * LAST x-forwarded-for hop; the leftmost entries are client-supplied and
 * spoofable, so a caller can't rotate a fake header to dodge the per-IP cap.
 * Prefer x-real-ip (Traefik-set) when present.
 */
function clientIp(req: NextRequest): string {
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const hops = xff.split(",").map((p) => p.trim()).filter(Boolean);
    if (hops.length) return hops[hops.length - 1];
  }
  return "unknown";
}

/**
 * Rate-limit key for an email. Collapses provider aliases (+subaddress for all,
 * dots for gmail) so the per-email backscatter cap can't be bypassed with
 * victim+1@, victim+2@, ... variants that still land in the same inbox. Only
 * the KEY is normalized — the address we actually deliver to is unchanged.
 */
function rateLimitEmailKey(email: string): string {
  const at = email.lastIndexOf("@");
  if (at < 0) return email;
  let local = email.slice(0, at);
  const domain = email.slice(at + 1);
  const plus = local.indexOf("+");
  if (plus >= 0) local = local.slice(0, plus);
  if (domain === "gmail.com" || domain === "googlemail.com") {
    local = local.replace(/\./g, "");
  }
  return `${local}@${domain}`;
}

export async function POST(req: NextRequest) {
  // ── Parse ─────────────────────────────────────────────────────────────────
  let payload: CapturePayload;
  try {
    payload = (await req.json()) as CapturePayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const email =
    typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const magnetSlug =
    typeof payload.magnetSlug === "string"
      ? payload.magnetSlug.trim().slice(0, 100)
      : "";
  const dmKeyword =
    typeof payload.dmKeyword === "string" ? payload.dmKeyword : "";
  const firstName =
    typeof payload.firstName === "string" && payload.firstName.trim()
      ? payload.firstName.trim().slice(0, 80)
      : undefined;

  // ── Cheap validation (no external calls yet) ───────────────────────────────
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Valid email required" },
      { status: 400 }
    );
  }
  if (!magnetSlug) {
    return NextResponse.json(
      { ok: false, error: "magnetSlug required" },
      { status: 400 }
    );
  }
  const keyword = sanitizeKeyword(dmKeyword);
  if (!keyword) {
    return NextResponse.json(
      { ok: false, error: "dmKeyword required" },
      { status: 400 }
    );
  }

  // ── Rate limit BEFORE any external call (Listmonk + email) ─────────────────
  // In-memory limiter — valid because prod is a single Coolify `next start`
  // container (see lib/rate-limit.ts). Traefik/Coolify sets x-forwarded-for.
  const ip = clientIp(req);
  if (!rateLimit(`leads:ip:${ip}`, IP_MAX, IP_WINDOW_MS).allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }
  if (
    !rateLimit(
      `leads:email:${rateLimitEmailKey(email)}`,
      EMAIL_MAX,
      EMAIL_WINDOW_MS
    ).allowed
  ) {
    return NextResponse.json(
      { ok: false, error: "We already sent your guide — check your inbox (and spam)." },
      { status: 429 }
    );
  }

  const listId = process.env.LISTMONK_LIST_ID_ITQAN;
  if (!listId) {
    console.error("[leads/capture] LISTMONK_LIST_ID_ITQAN not set");
    return NextResponse.json(
      { ok: false, error: "Listmonk not configured" },
      { status: 500 }
    );
  }

  const tagName = `magnet-itqan-${keyword}`;
  // The delivered link — ALWAYS our own canonical origin. Never caller-supplied.
  const magnetUrl = `${SITE_URL}/magnet/${encodeURIComponent(magnetSlug)}`;

  try {
    // ── 1. Upsert subscriber (preconfirmed — explicit magnet request) ────────
    await upsertSubscriber({
      email,
      name: firstName,
      listIds: [Number(listId)],
      attribs: { tags: [tagName], magnet_slug: magnetSlug },
      preconfirm: true,
    });

    // ── 2. Send the delivery transactional email (best-effort) ───────────────
    let enrolled = false;
    const templateId = process.env.LISTMONK_TX_TEMPLATE_MAGNET;
    if (!templateId) {
      console.error("[leads/capture] LISTMONK_TX_TEMPLATE_MAGNET not set");
    } else {
      enrolled = await sendTx({
        subscriberEmail: email,
        templateId: Number(templateId),
        data: { magnet_url: magnetUrl },
      });
    }

    return NextResponse.json({ ok: true, tagged: true, enrolled });
  } catch (err) {
    if (err instanceof ListmonkError) {
      console.error(
        `[leads/capture] Listmonk error (${err.status}):`,
        err.bodySnippet
      );
      return NextResponse.json(
        { ok: false, error: "Subscription failed. Please try again." },
        { status: err.status }
      );
    }
    // AbortError (timeout) or unexpected failure.
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[leads/capture] unexpected error:", msg);
    return NextResponse.json(
      { ok: false, error: "Subscription failed. Please try again." },
      { status: 502 }
    );
  }
}
