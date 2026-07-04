// src/lib/magnet-lookup.ts
//
// Reads Itqan-brand lead magnets from the cross-brand Notion Lead Magnets
// DB (created in itqan-crm under Strategy Hub). Filters to Brand=Itqan only
// since this is the Itqan public website. Shareefico magnets are served
// from shareefi.co (separate codebase, same Notion DB).
//
// Used by /magnet/[slug]/page.tsx to render the public landing pages.
//
// SCHEMA CONTRACT (v2.1, Agent 5 split as of 2026-05-23):
//   - "Body" property        → landing_teaser (~150 words, page-visible)
//   - page children blocks   → magnet_content_full (~1200 words, PDF only)
//                              followed by drip subject lines
// The landing page reads ONLY the Body property. The full content lives in
// page children and is consumed by /api/magnet-pdf/[slug] when the PDF
// generation route is wired (Phase 3).

import { Client } from "@notionhq/client";

const NOTION_DB_LEAD_MAGNETS = "3661abda-61bb-81df-b6b9-fca6666130f2";

let _client: Client | null = null;
function notion(): Client {
  if (_client) return _client;
  const token = process.env.NOTION_TOKEN;
  if (!token) throw new Error("NOTION_TOKEN is not set");
  _client = new Client({ auth: token });
  return _client;
}

export interface LeadMagnet {
  pageId: string;
  title: string;
  topicSlug: string;
  dmKeyword: string;
  status: string;
  /**
   * The ~150-word page-visible landing teaser written by Agent 5 (v2.1).
   * This is what shows above the email signup form. The full ~1200-word PDF
   * body lives in the page's children blocks and is fetched separately by
   * the PDF generation route.
   */
  landingTeaser: string;
  /**
   * Public URL of the deliverable PDF (Notion "PDF URL" property). Used for
   * the instant on-page download button and passed to the capture route so
   * Listmonk stores it on the subscriber's `magnet_pdf_url` attrib for the
   * delivery email. Null when the magnet has no PDF URL set yet.
   */
  pdfUrl: string | null;
}

// Notion API property reader helpers (typed loosely since we don't pull
// the full @notionhq/client types here)
type RichTextRun = { plain_text?: string };
type NotionProp = {
  title?: RichTextRun[];
  rich_text?: RichTextRun[];
  select?: { name?: string } | null;
  url?: string | null;
};
type NotionPage = {
  id: string;
  properties?: Record<string, NotionProp | undefined>;
};

function readTitle(page: NotionPage, field: string): string {
  return (page.properties?.[field]?.title ?? [])
    .map((r) => r.plain_text ?? "")
    .join("");
}
function readText(page: NotionPage, field: string): string {
  return (page.properties?.[field]?.rich_text ?? [])
    .map((r) => r.plain_text ?? "")
    .join("");
}
function readSelect(page: NotionPage, field: string): string | null {
  return page.properties?.[field]?.select?.name ?? null;
}
function readUrl(page: NotionPage, field: string): string | null {
  const url = page.properties?.[field]?.url;
  return typeof url === "string" && url.trim() ? url.trim() : null;
}

/**
 * Look up an Itqan magnet by slug. Returns null if not found OR if the
 * magnet's brand is not Itqan (Shareefico magnets are served from a
 * different domain).
 */
export async function findItqanMagnetBySlug(
  slug: string
): Promise<LeadMagnet | null> {
  const normalized = slug.toLowerCase().trim();

  const res = await notion().databases.query({
    database_id: NOTION_DB_LEAD_MAGNETS,
    page_size: 100,
  });

  const pages = res.results as NotionPage[];
  const matched = pages.find(
    (p) =>
      readText(p, "Topic slug").toLowerCase() === normalized &&
      readSelect(p, "Brand") === "Itqan"
  );
  if (!matched) return null;

  // Landing teaser comes from the Body property ONLY. Page children blocks
  // hold the full 1200-word PDF content and must NOT leak onto the public
  // landing page (that would defeat the email-gate).
  return {
    pageId: matched.id,
    title: readTitle(matched, "Title"),
    topicSlug: readText(matched, "Topic slug"),
    dmKeyword: readText(matched, "DM keyword"),
    status: readSelect(matched, "Status") ?? "Draft",
    landingTeaser: readText(matched, "Body"),
    pdfUrl: readUrl(matched, "PDF URL"),
  };
}

/**
 * Fetch the full magnet content (the ~1200-word PDF body) from the page's
 * children blocks. Used by /api/magnet-pdf/[slug] to render the PDF.
 *
 * NOT used by the public landing page — that would expose the full content
 * to anyone who finds the URL, bypassing the email signup gate.
 *
 * Returns plain markdown joined from paragraph blocks. Heading blocks (the
 * "Magnet content (PDF body)" and "drip subject lines" markers Agent 5
 * writes) are skipped so the PDF doesn't include them.
 */
export async function findItqanMagnetFullContent(
  pageId: string
): Promise<string> {
  type Block = {
    type: string;
    paragraph?: { rich_text?: RichTextRun[] };
  };
  const blocks = await notion().blocks.children.list({
    block_id: pageId,
    page_size: 100,
  });
  return (blocks.results as Block[])
    .filter((b) => b.type === "paragraph")
    .map((b) =>
      (b.paragraph?.rich_text ?? [])
        .map((r) => r.plain_text ?? "")
        .join("")
    )
    .filter((line) => {
      // Skip drip subject lines (Agent 5 appends them as numbered paragraphs
      // after the "drip subject lines" heading). They start with "1. ",
      // "2. ", "3. " and are short.
      const trimmed = line.trim();
      if (/^[1-3]\.\s+.{0,60}$/.test(trimmed)) return false;
      return trimmed.length > 0;
    })
    .join("\n\n");
}
