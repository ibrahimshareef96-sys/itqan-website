import { NextRequest, NextResponse } from "next/server";
import { upsertSubscriber, sendTx, ListmonkError } from "@/lib/listmonk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/leads/capture
 *
 * Hit by the magnet landing page opt-in form. Flow:
 *   1. Validate the payload.
 *   2. Upsert the subscriber in Listmonk (self-hosted, replaced Kit), on the
 *      itqan list, preconfirmed (explicit magnet request — no double opt-in
 *      needed since the visitor is actively asking for the PDF). Tags the
 *      subscriber with a brand-prefixed tag and stores the magnet slug + PDF
 *      URL as attribs so the delivery template can render {{ magnet_url }}.
 *   3. Send the delivery transactional email (Listmonk /api/tx) with the PDF
 *      link, when a pdfUrl was provided.
 *
 * The landing page also shows an instant on-page download button using the
 * pdfUrl echoed back in the response, so delivery does not depend on the
 * email arriving.
 *
 * Body: { email, magnetSlug, dmKeyword, pdfUrl?, firstName? }
 *
 * Same Listmonk instance/list is used for both Itqan and Shareefico magnets.
 * The tag is brand-prefixed (magnet-itqan-<keyword>) so per-brand
 * segmentation and automations stay clean.
 *
 * Every Listmonk call is checked. We never return ok:true unless the
 * subscriber was upserted AND tagged. The transactional send is best-effort:
 * if it fails we still return ok:true (the on-page download covers delivery)
 * but flag enrolled:false so the failure is visible.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface CapturePayload {
  email?: unknown;
  magnetSlug?: unknown;
  dmKeyword?: unknown;
  pdfUrl?: unknown;
  firstName?: unknown;
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

  const listId = process.env.LISTMONK_LIST_ID_ITQAN;
  if (!listId) {
    console.error("[leads/capture] LISTMONK_LIST_ID_ITQAN not set");
    return NextResponse.json(
      { ok: false, error: "Listmonk not configured" },
      { status: 500 }
    );
  }

  // Canonical brand-prefixed tag. Format: magnet-itqan-<dmKeyword>, lowercase.
  const tagName = `magnet-itqan-${dmKeyword.toLowerCase()}`;

  try {
    // ── 1. Upsert subscriber (preconfirmed — explicit magnet request) ──────
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

    // ── 2. Send the delivery transactional email (best-effort) ─────────────
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
