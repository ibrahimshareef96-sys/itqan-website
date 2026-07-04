import { NextRequest, NextResponse } from "next/server";
import { upsertSubscriber, ListmonkError } from "@/lib/listmonk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/subscribe
 *
 * Newsletter signup (NewsletterForm.tsx footer widget). Upserts the
 * subscriber into the shared itqan Listmonk list with double opt-in
 * (preconfirm: false) — Listmonk sends its own confirmation email, matching
 * the "Success! Check your email to confirm." copy already on the form.
 *
 * Note: while SES is in sandbox, the confirmation mail may not land for
 * unverified recipients — expected until production access is granted. The
 * subscriber is still stored (unconfirmed) either way.
 *
 * Body: { email }
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── tiny in-memory rate limiter: 5 requests / 10 min per IP ────────────────
// Best-effort only (resets on redeploy, not shared across instances) — fine
// for a low-traffic newsletter form; swap for a shared store if this route
// ever needs multi-instance accuracy.
const RATE_LIMIT_WINDOW_MS = 10 * 60_000;
const RATE_LIMIT_MAX = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT_MAX) {
    requestLog.set(ip, timestamps);
    return true;
  }
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return false;
}

function clientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  const ip = clientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let payload: { email?: unknown };
  try {
    payload = (await req.json()) as { email?: unknown };
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Valid email required" },
      { status: 400 }
    );
  }

  const listId = process.env.LISTMONK_LIST_ID_ITQAN;
  if (!listId) {
    console.error("[subscribe] LISTMONK_LIST_ID_ITQAN not set");
    return NextResponse.json(
      { ok: false, error: "Newsletter not configured" },
      { status: 500 }
    );
  }

  try {
    await upsertSubscriber({
      email,
      listIds: [Number(listId)],
      preconfirm: false,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof ListmonkError) {
      console.error(
        `[subscribe] Listmonk error (${err.status}):`,
        err.bodySnippet
      );
      return NextResponse.json(
        { ok: false, error: "Subscription failed. Please try again." },
        { status: err.status }
      );
    }
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[subscribe] unexpected error:", msg);
    return NextResponse.json(
      { ok: false, error: "Subscription failed. Please try again." },
      { status: 502 }
    );
  }
}
