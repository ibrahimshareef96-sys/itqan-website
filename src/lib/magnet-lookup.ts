// src/lib/magnet-lookup.ts
//
// Reads Itqan-brand lead magnets from the cross-brand Notion Lead Magnets
// DB (created in itqan-crm under Strategy Hub). Filters to Brand=Itqan only
// since this is the Itqan public website. Shareefico magnets are served
// from shareefi.co (separate codebase, same Notion DB).
//
// Used by /magnet/[slug]/page.tsx to render the public landing pages.

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
  body: string; // full markdown body joined from children blocks
}

// Notion API property reader helpers (typed loosely since we don't pull
// the full @notionhq/client types here)
type RichTextRun = { plain_text?: string };
type NotionProp = {
  title?: RichTextRun[];
  rich_text?: RichTextRun[];
  select?: { name?: string } | null;
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

  // Pull the full body from the page's children blocks. Agent 5 stored the
  // magnet as a series of paragraph blocks (each ~1900 chars), so we
  // concatenate them here.
  type Paragraph = {
    type: string;
    paragraph?: { rich_text?: RichTextRun[] };
  };
  const blocks = await notion().blocks.children.list({
    block_id: matched.id,
    page_size: 100,
  });
  const body = (blocks.results as Paragraph[])
    .filter((b) => b.type === "paragraph")
    .map((b) =>
      (b.paragraph?.rich_text ?? [])
        .map((r) => r.plain_text ?? "")
        .join("")
    )
    .join("\n\n");

  return {
    pageId: matched.id,
    title: readTitle(matched, "Title"),
    topicSlug: readText(matched, "Topic slug"),
    dmKeyword: readText(matched, "DM keyword"),
    status: readSelect(matched, "Status") ?? "Draft",
    body,
  };
}
