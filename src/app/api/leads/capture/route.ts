import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/leads/capture
 *
 * Hit by the magnet landing page opt-in form. Flow:
 *   1. Validate the payload.
 *   2. Upsert the subscriber in Kit (v4), storing the PDF URL on the
 *      `magnet_pdf_url` custom field so the delivery sequence's Email 0 can
 *      render it as {{ subscriber.magnet_pdf_url }}.
 *   3. Find-or-create the brand-prefixed tag and attach the subscriber.
 *   4. Enroll the subscriber in the shared "Magnet Delivery" sequence so Kit
 *      emails them the PDF.
 *
 * The landing page also shows an instant on-page download button using the
 * pdfUrl echoed back in the response, so delivery does not depend on the
 * email arriving.
 *
 * Body: { email, magnetSlug, dmKeyword, pdfUrl?, firstName? }
 *
 * Same Kit account is used for both Itqan and Shareefico magnets. The sender
 * shows as the account owner (Ibrahim, founder of both), which is fine. The
 * tag is brand-prefixed (magnet-itqan-<keyword>) so per-brand segmentation and
 * automations stay clean.
 *
 * Every Kit call is checked. We never return ok:true unless the subscriber was
 * created/found AND tagged. Sequence enrollment is best-effort: if it fails we
 * still return ok:true (the on-page download covers delivery) but flag
 * enrolled:false so the failure is visible.
 */

const KIT_BASE = "https://api.kit.com/v4";
const DELIVERY_SEQUENCE_ID = 2777738; // shared "Magnet Delivery" sequence
const KIT_FETCH_TIMEOUT_MS = 15_000;
const TAGS_PER_PAGE = 1000;
const MAGNET_PDF_FIELD = "magnet_pdf_url";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface CapturePayload {
  email?: unknown;
  magnetSlug?: unknown;
  dmKeyword?: unknown;
  pdfUrl?: unknown;
  firstName?: unknown;
}

interface KitTag {
  id: number;
  name: string;
}

interface KitTagsPage {
  tags?: KitTag[];
  pagination?: {
    has_next_page?: boolean;
    end_cursor?: string | null;
  };
}

/**
 * fetch wrapper for Kit calls: injects auth + JSON headers and enforces a 15s
 * timeout via AbortController. The API key is never logged.
 */
async function kitFetch(
  apiKey: string,
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), KIT_FETCH_TIMEOUT_MS);
  try {
    return await fetch(`${KIT_BASE}${path}`, {
      ...init,
      signal: controller.signal,
      headers: {
        "X-Kit-Api-Key": apiKey,
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(init.headers ?? {}),
      },
    });
  } finally {
    clearTimeout(timer);
  }
}

/** Read a short, safe snippet of an error response body for logging. */
async function safeBodySnippet(res: Response): Promise<string> {
  try {
    const txt = await res.text();
    return txt.slice(0, 300);
  } catch {
    return "(unreadable body)";
  }
}

/**
 * Find an existing tag by exact name, paginating through every page. Kit v4
 * uses cursor pagination: pagination.has_next_page + pagination.end_cursor,
 * advanced via the `after` query param.
 */
async function findTagByName(
  apiKey: string,
  name: string
): Promise<KitTag | null> {
  let cursor: string | null = null;
  // Hard cap on pages as a safety net against an unbounded loop.
  for (let page = 0; page < 1000; page += 1) {
    const qs = new URLSearchParams({ per_page: String(TAGS_PER_PAGE) });
    if (cursor) qs.set("after", cursor);

    const res = await kitFetch(apiKey, `/tags?${qs.toString()}`);
    if (!res.ok) {
      const snippet = await safeBodySnippet(res);
      throw new KitError(
        `tags list failed (${res.status})`,
        502,
        `[leads/capture] Kit tags list failed ${res.status} ${snippet}`
      );
    }

    const data = (await res.json()) as KitTagsPage;
    const match = (data.tags ?? []).find((t) => t.name === name);
    if (match) return match;

    const pagination = data.pagination;
    if (!pagination?.has_next_page || !pagination.end_cursor) return null;
    cursor = pagination.end_cursor;
  }
  return null;
}

/**
 * Find-or-create the tag. Handles the 422-on-create race (another request
 * created the same tag between our list and our create) by re-listing.
 */
async function findOrCreateTag(
  apiKey: string,
  name: string
): Promise<KitTag> {
  const existing = await findTagByName(apiKey, name);
  if (existing) return existing;

  const createRes = await kitFetch(apiKey, "/tags", {
    method: "POST",
    body: JSON.stringify({ name }),
  });

  if (createRes.ok) {
    const created = (await createRes.json()) as { tag?: KitTag };
    if (created.tag?.id) return created.tag;
    // Created OK but unexpected body shape: fall through to a re-list.
  } else if (createRes.status !== 422) {
    const snippet = await safeBodySnippet(createRes);
    throw new KitError(
      `tag create failed (${createRes.status})`,
      502,
      `[leads/capture] Kit tag create failed ${createRes.status} ${snippet}`
    );
  }

  // 422 (already exists, race) or odd-but-2xx body: re-list to resolve the id.
  const afterRace = await findTagByName(apiKey, name);
  if (afterRace) return afterRace;

  throw new KitError(
    "tag could not be resolved after create",
    502,
    `[leads/capture] tag "${name}" not found after create attempt`
  );
}

/** Error carrying the HTTP status to return + a server-side log line. */
class KitError extends Error {
  status: number;
  logLine: string;
  constructor(message: string, status: number, logLine: string) {
    super(message);
    this.name = "KitError";
    this.status = status;
    this.logLine = logLine;
  }
}

export async function POST(req: NextRequest) {
  // ── Parse + validate ────────────────────────────────────────────────────
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
    typeof payload.email === "string" ? payload.email.trim() : "";
  const magnetSlug =
    typeof payload.magnetSlug === "string" ? payload.magnetSlug.trim() : "";
  const dmKeyword =
    typeof payload.dmKeyword === "string" ? payload.dmKeyword.trim() : "";
  const firstName =
    typeof payload.firstName === "string" && payload.firstName.trim()
      ? payload.firstName.trim()
      : undefined;
  const pdfUrl =
    typeof payload.pdfUrl === "string" && payload.pdfUrl.trim()
      ? payload.pdfUrl.trim()
      : undefined;

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Valid email required" },
      { status: 400 }
    );
  }
  if (!magnetSlug || !dmKeyword) {
    return NextResponse.json(
      { ok: false, error: "magnetSlug and dmKeyword required" },
      { status: 400 }
    );
  }

  const kitApiKey = process.env.KIT_API_KEY;
  if (!kitApiKey) {
    console.error("[leads/capture] KIT_API_KEY not set");
    return NextResponse.json(
      { ok: false, error: "Kit not configured" },
      { status: 500 }
    );
  }

  // Canonical brand-prefixed tag. Format: magnet-itqan-<dmKeyword>, lowercase.
  const tagName = `magnet-itqan-${dmKeyword.toLowerCase()}`;

  try {
    // ── 1. Upsert subscriber ────────────────────────────────────────────────
    // Include the PDF URL custom field only when we actually have a URL, so we
    // never clobber an existing value with an empty one.
    const subscriberBody: Record<string, unknown> = {
      email_address: email,
      state: "active",
    };
    if (firstName) subscriberBody.first_name = firstName;
    if (pdfUrl) subscriberBody.fields = { [MAGNET_PDF_FIELD]: pdfUrl };

    const subRes = await kitFetch(kitApiKey, "/subscribers", {
      method: "POST",
      body: JSON.stringify(subscriberBody),
    });

    // 201 = created, 200 = already existed. Both are success.
    if (!subRes.ok) {
      const snippet = await safeBodySnippet(subRes);
      if (subRes.status === 422) {
        // Kit rejected the email as invalid/unmailable.
        console.error(
          "[leads/capture] Kit rejected subscriber 422",
          snippet
        );
        return NextResponse.json(
          { ok: false, error: "that email looks invalid" },
          { status: 400 }
        );
      }
      console.error(
        "[leads/capture] Kit subscriber upsert failed",
        subRes.status,
        snippet
      );
      return NextResponse.json(
        { ok: false, error: "Subscription failed. Please try again." },
        { status: 502 }
      );
    }

    // ── 2. Find-or-create the tag ───────────────────────────────────────────
    const tag = await findOrCreateTag(kitApiKey, tagName);

    // ── 3. Attach the tag (must succeed) ─────────────────────────────────────
    const attachRes = await kitFetch(
      kitApiKey,
      `/tags/${tag.id}/subscribers`,
      {
        method: "POST",
        body: JSON.stringify({ email_address: email }),
      }
    );
    if (!attachRes.ok) {
      const snippet = await safeBodySnippet(attachRes);
      console.error(
        "[leads/capture] Kit tag attach failed",
        attachRes.status,
        snippet
      );
      return NextResponse.json(
        { ok: false, error: "Tagging failed. Please try again." },
        { status: 502 }
      );
    }

    // ── 4. Enroll in the delivery sequence (best-effort) ─────────────────────
    let enrolled = false;
    try {
      const seqRes = await kitFetch(
        kitApiKey,
        `/sequences/${DELIVERY_SEQUENCE_ID}/subscribers`,
        {
          method: "POST",
          body: JSON.stringify({ email_address: email }),
        }
      );
      if (seqRes.ok) {
        enrolled = true;
      } else {
        const snippet = await safeBodySnippet(seqRes);
        console.error(
          "[leads/capture] Kit sequence enroll failed",
          seqRes.status,
          snippet
        );
      }
    } catch (seqErr) {
      const msg = seqErr instanceof Error ? seqErr.message : String(seqErr);
      console.error("[leads/capture] Kit sequence enroll error:", msg);
    }

    return NextResponse.json({
      ok: true,
      pdfUrl: pdfUrl ?? null,
      tagged: true,
      enrolled,
    });
  } catch (err) {
    if (err instanceof KitError) {
      console.error(err.logLine);
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
