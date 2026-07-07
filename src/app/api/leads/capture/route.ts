import { NextRequest, NextResponse } from "next/server";
import { upsertSubscriber, sendTx, ListmonkError } from "@/lib/listmonk";
import { findItqanMagnetBySlug } from "@/lib/magnet-lookup";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/leads/capture
 *
 * Public, unauthenticated endpoint hit by the magnet landing page opt-in form.
 *
 * SECURITY — this route emails a link from itqanstudio.com's trusted, SPF/DKIM
 * signed domain, so it MUST NOT be usable as an open spam/phishing relay:
 *   - The delivered link + the Listmonk tag are resolved SERVER-SIDE from the
 *     trusted Notion magnet registry (findItqanMagnetBySlug), keyed only by the
 *     slug. The request body can NEVER choose the URL we email or forge the tag.
 *     (Prior versions trusted a body `pdfUrl` — that was the relay hole.)
 *   - An unknown/forged slug is rejected (404) before any email is sent.
 *   - Per-IP and per-email rate limits cap bulk spam + backscatter at a third
 *     party, protecting the sending reputation.
 *
 * Flow:
 *   1. Validate email + slug, then rate-limit (per-IP + per-email).
 *   2. Resolve the magnet server-side (trusted pdfUrl + dmKeyword).
 *   3. Upsert the subscriber onto the Itqan Listmonk list, preconfirmed
 *      (explicit magnet request — no double opt-in), tagged magnet-itqan-<kw>.
 *   4. Send the delivery transactional email with the trusted magnet_url.
 *
 * The landing page also shows an instant on-page download button from the
 * server-echoed (trusted) pdfUrl, so delivery does not depend on the email.
 *
 * Body: { email, magnetSlug, firstName? }
 * (`pdfUrl` / `dmKeyword` are intentionally ignored if sent — resolved server-side.)
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
  firstName?: unknown;
}

/**
 * A magnet keyword becomes part of a Listmonk tag (magnet-itqan-<kw>), which
 * must match /^[a-zA-Z0-9_-]+$/. Sanitize + cap so the tag stays well-formed
 * even though the keyword now comes from the trusted registry.
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

  // ── Rate limit BEFORE any external call (Notion + Listmonk + email) ─────────
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

  // ── Resolve the magnet server-side (TRUSTED source of pdfUrl + keyword) ─────
  // Everything we act on comes from here, NEVER from the request body — so a
  // caller can neither choose the URL we email (open-relay fix) nor forge the tag.
  let magnet;
  try {
    magnet = await findItqanMagnetBySlug(magnetSlug);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[leads/capture] magnet lookup failed:", msg);
    return NextResponse.json(
      { ok: false, error: "Subscription failed. Please try again." },
      { status: 502 }
    );
  }
  if (!magnet) {
    return NextResponse.json(
      { ok: false, error: "Unknown magnet" },
      { status: 404 }
    );
  }

  const keyword = sanitizeKeyword(magnet.dmKeyword);
  if (!keyword) {
    console.error(
      `[leads/capture] magnet '${magnetSlug}' has no usable dmKeyword`
    );
    return NextResponse.json(
      { ok: false, error: "Subscription failed. Please try again." },
      { status: 500 }
    );
  }
  const tagName = `magnet-itqan-${keyword}`;
  const pdfUrl = magnet.pdfUrl ?? undefined; // trusted, admin-set in Notion

  try {
    // ── 1. Upsert subscriber (preconfirmed — explicit magnet request) ────────
    const attribs: Record<string, unknown> = {
      tags: [tagName],
      magnet_slug: magnetSlug,
    };
    if (pdfUrl) attribs.magnet_pdf_url = pdfUrl;

    await upsertSubscriber({
      email,
      name: firstName,
      listIds: [Number(listId)],
      attribs,
      preconfirm: true,
    });

    // ── 2. Send the delivery transactional email (best-effort) ───────────────
    let enrolled = false;
    if (pdfUrl) {
      const templateId = process.env.LISTMONK_TX_TEMPLATE_MAGNET;
      if (!templateId) {
        console.error("[leads/capture] LISTMONK_TX_TEMPLATE_MAGNET not set");
      } else {
        enrolled = await sendTx({
          subscriberEmail: email,
          templateId: Number(templateId),
          data: { magnet_url: pdfUrl },
        });
      }
    }

    return NextResponse.json({
      ok: true,
      pdfUrl: pdfUrl ?? null,
      tagged: true,
      enrolled,
    });
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
