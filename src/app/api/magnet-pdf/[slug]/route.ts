import { NextRequest, NextResponse } from "next/server";
import {
  findItqanMagnetBySlug,
  findItqanMagnetFullContent,
} from "@/lib/magnet-lookup";
import { MagnetPDF } from "@/components/magnet/MagnetPDF";

// react-pdf needs Node.js APIs (no Edge runtime).
export const runtime = "nodejs";
// Notion content is editable in real time; we don't cache the PDF response.
// If we wanted aggressive caching later, we could add an ETag based on the
// magnet's Notion last_edited_time.
export const dynamic = "force-dynamic";

/**
 * GET /api/magnet-pdf/[slug]
 *
 * Renders an Itqan lead magnet as a downloadable PDF. The URL is meant to
 * be sent via Kit email after a user subscribes via the landing page form,
 * but currently has no signed-token gate — anyone with the URL can download.
 * v2 TODO: add HMAC signing so the URL is only valid for tagged subscribers.
 *
 * Pipeline:
 *   1. Look up the magnet row by slug (Brand=Itqan only)
 *   2. Fetch full markdown content from page children blocks
 *   3. Render <MagnetPDF /> via @react-pdf/renderer to a Node stream
 *   4. Buffer the stream and return as application/pdf with attachment disposition
 *
 * Errors:
 *   - 404 if no magnet row matches the slug (or Brand !== "Itqan")
 *   - 500 if Notion or react-pdf fails (Notion outage, malformed content, etc.)
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  let magnet;
  try {
    magnet = await findItqanMagnetBySlug(slug);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[magnet-pdf] Notion lookup failed for ${slug}:`, msg);
    return NextResponse.json(
      { error: "Failed to look up magnet" },
      { status: 500 }
    );
  }

  if (!magnet) {
    return NextResponse.json({ error: "Magnet not found" }, { status: 404 });
  }

  let fullContent: string;
  try {
    fullContent = await findItqanMagnetFullContent(magnet.pageId);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(
      `[magnet-pdf] Failed to fetch full content for ${slug}:`,
      msg
    );
    return NextResponse.json(
      { error: "Failed to fetch magnet body" },
      { status: 500 }
    );
  }

  if (!fullContent || fullContent.trim().length < 100) {
    // The Notion page is missing the body content. Either it's a legacy
    // v1.x magnet that didn't get regenerated, or Agent 5 wrote a degenerate
    // output. Surface a clear error rather than ship an empty PDF.
    return NextResponse.json(
      {
        error:
          "Magnet content is empty or too short. Regenerate via /magnet command in Telegram.",
      },
      { status: 422 }
    );
  }

  // Lazy-import the renderer so route bundling stays lean and the
  // @react-pdf module only loads on actual PDF requests.
  const { renderToStream } = await import("@react-pdf/renderer");

  let stream;
  try {
    stream = await renderToStream(
      MagnetPDF({ magnet, fullContent }) as React.ReactElement
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[magnet-pdf] PDF render failed for ${slug}:`, msg);
    return NextResponse.json(
      { error: "Failed to render PDF" },
      { status: 500 }
    );
  }

  // Buffer the Node readable stream. react-pdf's renderToStream returns a
  // ReadableStream<Uint8Array> in modern versions; iterate and concat.
  const chunks: Buffer[] = [];
  try {
    for await (const chunk of stream as AsyncIterable<Buffer | Uint8Array>) {
      chunks.push(Buffer.from(chunk));
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[magnet-pdf] Stream buffer failed for ${slug}:`, msg);
    return NextResponse.json(
      { error: "Failed to assemble PDF" },
      { status: 500 }
    );
  }

  const pdfBuffer = Buffer.concat(chunks);

  // Filename: itqan-<slug>.pdf (lowercase, hyphenated).
  const safeFilename = `itqan-${slug.replace(/[^a-z0-9-]/gi, "")}.pdf`;

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${safeFilename}"`,
      "Cache-Control": "no-store",
      // CORS: allow Kit emails (rendered in any browser) to direct-download.
      // The PDF is public for now (no signed-token gate yet); we can tighten
      // this in v2 if abuse appears.
      "X-Content-Type-Options": "nosniff",
    },
  });
}
