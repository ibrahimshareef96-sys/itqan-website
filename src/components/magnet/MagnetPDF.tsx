import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { LeadMagnet } from "@/lib/magnet-lookup";

/**
 * Itqan lead magnet PDF (v1, 2026-05-28).
 *
 * Rendered server-side by /api/magnet-pdf/[slug] via @react-pdf/renderer.
 * Cream background + plum text + mauve accent — the print-friendly version
 * of the brand (the screen version is the dark v3 landing page).
 *
 * v1 font choice: built-in Helvetica (body) + Times-Italic (accents).
 * v2 TODO: register actual Manrope + Playfair Display TTF files so the
 * PDF matches the landing page typography exactly. Blocking on finding
 * a stable TTF source — @fontsource ships only woff/woff2, and Google
 * Fonts gstatic URLs are versioned + unstable.
 *
 * Asterisk convention: titles can contain ONE *word* marker (Agent 5
 * adds it) — we render the wrapped word in Times-Italic mauve on the
 * cover page. Backward compatible with magnets that have no asterisks.
 */

// ─── Brand tokens (PDF version) ────────────────────────────────────────────
const COLOR = {
  cream: "#fffbf5",
  creamWarm: "#fff5e8",
  plum: "#2f1c2c",
  plumMuted: "rgba(47, 28, 44, 0.72)",
  plumFaint: "rgba(47, 28, 44, 0.5)",
  mauve: "#cca4c2",
  sand: "#d1c2a5",
  rule: "rgba(47, 28, 44, 0.15)",
  ruleStrong: "rgba(47, 28, 44, 0.3)",
};

const styles = StyleSheet.create({
  // Page setup
  page: {
    backgroundColor: COLOR.cream,
    paddingTop: 60,
    paddingBottom: 80,
    paddingHorizontal: 70,
    fontFamily: "Helvetica",
    fontSize: 11,
    color: COLOR.plum,
    lineHeight: 1.55,
  },

  // ─── Cover page ─────────────────────────────────────────────────────────
  coverPage: {
    backgroundColor: COLOR.cream,
    paddingTop: 80,
    paddingBottom: 80,
    paddingHorizontal: 70,
    fontFamily: "Helvetica",
    color: COLOR.plum,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  coverHeader: {
    fontSize: 9,
    letterSpacing: 3,
    color: COLOR.plumMuted,
    textTransform: "uppercase",
    fontFamily: "Helvetica-Bold",
  },
  coverTitleWrap: {
    flexDirection: "column",
    gap: 16,
    paddingTop: 60,
    paddingBottom: 60,
  },
  coverTitle: {
    fontSize: 36,
    fontFamily: "Helvetica-Bold",
    lineHeight: 1.08,
    color: COLOR.plum,
    letterSpacing: -0.5,
  },
  coverTitleAccent: {
    fontFamily: "Times-Italic",
    fontWeight: "normal",
    color: COLOR.mauve,
  },
  coverSubtitle: {
    fontFamily: "Times-Italic",
    fontSize: 16,
    color: COLOR.plumMuted,
    lineHeight: 1.4,
    maxWidth: 380,
  },
  coverRule: {
    width: 60,
    height: 1,
    backgroundColor: COLOR.mauve,
    marginTop: 24,
    marginBottom: 24,
  },
  coverFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: COLOR.rule,
    fontSize: 9,
    color: COLOR.plumMuted,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },

  // ─── Body pages ─────────────────────────────────────────────────────────
  bodyHeader: {
    position: "absolute",
    top: 28,
    left: 70,
    right: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: COLOR.plumFaint,
    letterSpacing: 1.8,
    textTransform: "uppercase",
    fontFamily: "Helvetica-Bold",
  },
  bodyFooter: {
    position: "absolute",
    bottom: 32,
    left: 70,
    right: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: COLOR.plumFaint,
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  // Section H2 (the editorial section titles in the body)
  h2: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: COLOR.plum,
    marginTop: 28,
    marginBottom: 14,
    lineHeight: 1.2,
  },
  h2Num: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: COLOR.mauve,
    letterSpacing: 1.8,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  h3: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: COLOR.plum,
    marginTop: 18,
    marginBottom: 10,
    lineHeight: 1.25,
  },
  paragraph: {
    fontSize: 11,
    color: COLOR.plum,
    lineHeight: 1.55,
    marginBottom: 11,
  },
  list: {
    marginBottom: 12,
    marginTop: 2,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 6,
  },
  bullet: {
    width: 16,
    fontSize: 11,
    color: COLOR.mauve,
  },
  listText: {
    flex: 1,
    fontSize: 11,
    color: COLOR.plum,
    lineHeight: 1.55,
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
  italic: {
    fontFamily: "Times-Italic",
  },
  pullQuote: {
    fontFamily: "Times-Italic",
    fontSize: 14,
    color: COLOR.plum,
    lineHeight: 1.4,
    marginVertical: 20,
    paddingLeft: 18,
    borderLeftWidth: 2,
    borderLeftColor: COLOR.mauve,
  },

  // ─── Closing page footer credo ──────────────────────────────────────────
  endRule: {
    width: 80,
    height: 1,
    backgroundColor: COLOR.mauve,
    marginVertical: 24,
    marginHorizontal: "auto",
  },
  endCredo: {
    fontFamily: "Times-Italic",
    fontSize: 13,
    color: COLOR.plumMuted,
    textAlign: "center",
    marginTop: 18,
  },
});

interface MagnetPDFProps {
  magnet: LeadMagnet;
  fullContent: string;
  edition?: string; // e.g. "2026 EDITION"
}

export function MagnetPDF({
  magnet,
  fullContent,
  edition = `${new Date().getFullYear()} EDITION`,
}: MagnetPDFProps) {
  const titleNodes = renderPDFTitle(magnet.title);
  const bodyNodes = renderMarkdownToPDF(fullContent);

  return (
    <Document
      title={magnet.title.replace(/\*/g, "")}
      author="Itqan Studio"
      subject="From invisible to inevitable in 90 days."
      keywords={`itqan, brand, founder, ${magnet.topicSlug}`}
    >
      {/* COVER PAGE */}
      <Page size="A4" style={styles.coverPage}>
        <View style={styles.coverHeader}>
          <Text>Itqan Studio · A Working Document</Text>
        </View>

        <View style={styles.coverTitleWrap}>
          <Text style={styles.coverTitle}>{titleNodes}</Text>
          <View style={styles.coverRule} />
          <Text style={styles.coverSubtitle}>
            {magnet.landingTeaser
              ? magnet.landingTeaser.split(/\n+/)[0].slice(0, 220)
              : "From invisible to inevitable in 90 days. The working document we hand every founder before we quote them."}
          </Text>
        </View>

        <View style={styles.coverFooter}>
          <Text>itqanstudio.com</Text>
          <Text>{edition}</Text>
        </View>
      </Page>

      {/* BODY PAGES (auto-paginate) */}
      <Page size="A4" style={styles.page}>
        {/* Running header on every body page */}
        <View style={styles.bodyHeader} fixed>
          <Text>Itqan Studio</Text>
          <Text>{magnet.topicSlug}</Text>
        </View>

        {bodyNodes}

        {/* Closing credo on the last page (renders once at end of content) */}
        <View style={styles.endRule} />
        <Text style={styles.endCredo}>
          We don&apos;t redesign brands. We revive companies.
        </Text>

        {/* Running footer with page numbers on every body page */}
        <View style={styles.bodyFooter} fixed>
          <Text>itqanstudio.com</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}

// ─── Title renderer with asterisk-italic accent ────────────────────────────
// Mirrors the convention used by MagnetLanding's renderTitleWithItalicAccent.
// Wraps the *word* in Times-Italic mauve while the rest stays Helvetica Bold.
function renderPDFTitle(title: string): React.ReactNode {
  if (!title) return null;
  const parts = title.split(/(\*[^*\n]+\*)/);
  return parts.map((part, i) => {
    if (
      part.startsWith("*") &&
      part.endsWith("*") &&
      part.length > 2 &&
      !part.startsWith("**")
    ) {
      return (
        <Text key={i} style={styles.coverTitleAccent}>
          {part.slice(1, -1)}
        </Text>
      );
    }
    return <Text key={i}>{part}</Text>;
  });
}

// ─── Markdown-to-PDF renderer ──────────────────────────────────────────────
// Parses the magnet_content_full markdown into react-pdf nodes. Handles:
//   - H2 (## ...)  → section title with a small auto-numbered eyebrow
//   - H3 (### ...) → sub-heading
//   - bullet lists (-  ...)
//   - paragraphs (default)
//   - bold (**...**) and italic (*...*) inline (single-asterisk italic only
//     when surrounded by spaces or at edges, to avoid catching the title
//     accent convention in body content — though Agent 5 puts the accent
//     only in titles, not in body)
//
// Section numbering: every H2 in order gets a "01 / ", "02 / ", "03 / ..."
// eyebrow above it. Carries the editorial document-feel from the landing
// page over to the PDF.
function renderMarkdownToPDF(md: string): React.ReactNode[] {
  if (!md) {
    return [
      <Text key="empty" style={styles.paragraph}>
        [No content available. Edit the Notion page to add the full magnet body.]
      </Text>,
    ];
  }

  const blocks = md.split(/\n\n+/);
  const nodes: React.ReactNode[] = [];
  let h2Counter = 0;

  blocks.forEach((rawBlock, blockIdx) => {
    const block = rawBlock.trim();
    if (!block) return;

    // H3 detect
    if (block.startsWith("### ")) {
      nodes.push(
        <Text key={`h3-${blockIdx}`} style={styles.h3}>
          {renderInlineForPDF(block.slice(4))}
        </Text>
      );
      return;
    }

    // H2 detect — adds auto-numbered eyebrow
    if (block.startsWith("## ")) {
      h2Counter += 1;
      const num = String(h2Counter).padStart(2, "0");
      nodes.push(
        <View key={`h2-wrap-${blockIdx}`} wrap={false}>
          <Text style={styles.h2Num}>{`${num} / Section`}</Text>
          <Text style={styles.h2}>{renderInlineForPDF(block.slice(3))}</Text>
        </View>
      );
      return;
    }

    // H1 (rare in magnet body — title is on cover) — render as H2
    if (block.startsWith("# ")) {
      nodes.push(
        <Text key={`h1-${blockIdx}`} style={styles.h2}>
          {renderInlineForPDF(block.slice(2))}
        </Text>
      );
      return;
    }

    // Bullet list detect — every line in the block starts with - or *
    const lines = block.split("\n");
    const isList = lines.every((l) => /^\s*[-*]\s+/.test(l));
    if (isList) {
      nodes.push(
        <View key={`list-${blockIdx}`} style={styles.list}>
          {lines.map((l, j) => (
            <View key={j} style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>
                {renderInlineForPDF(l.replace(/^\s*[-*]\s+/, ""))}
              </Text>
            </View>
          ))}
        </View>
      );
      return;
    }

    // Pull quote detect — starts with >
    if (block.startsWith("> ")) {
      const quoteText = block
        .split("\n")
        .map((l) => l.replace(/^>\s?/, ""))
        .join(" ");
      nodes.push(
        <Text key={`q-${blockIdx}`} style={styles.pullQuote}>
          {renderInlineForPDF(quoteText)}
        </Text>
      );
      return;
    }

    // Horizontal rule
    if (block === "---" || block === "***") {
      nodes.push(<View key={`hr-${blockIdx}`} style={styles.coverRule} />);
      return;
    }

    // Default: paragraph
    nodes.push(
      <Text key={`p-${blockIdx}`} style={styles.paragraph}>
        {renderInlineForPDF(block)}
      </Text>
    );
  });

  return nodes;
}

// ─── Inline markdown renderer (bold + italic) ──────────────────────────────
// Handles **bold** and *italic* inline. Single asterisks are only treated
// as italic when they wrap visible text without nested asterisks. The body
// content from Agent 5 has very little inline markdown; this is mostly here
// for resilience if Ibrahim edits the Notion content and adds emphasis.
function renderInlineForPDF(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let k = 0;

  while (remaining.length > 0) {
    const bold = remaining.match(/^\*\*([^*]+)\*\*/);
    if (bold) {
      parts.push(
        <Text key={k++} style={styles.bold}>
          {bold[1]}
        </Text>
      );
      remaining = remaining.slice(bold[0].length);
      continue;
    }
    const italic = remaining.match(/^\*([^*\n]+)\*/);
    if (italic) {
      parts.push(
        <Text key={k++} style={styles.italic}>
          {italic[1]}
        </Text>
      );
      remaining = remaining.slice(italic[0].length);
      continue;
    }
    // Find next inline marker or end of string
    const nextMarker = remaining.search(/\*\*|\*/);
    const chunk = nextMarker === -1 ? remaining : remaining.slice(0, nextMarker);
    if (chunk) {
      parts.push(<Text key={k++}>{chunk}</Text>);
    }
    remaining = nextMarker === -1 ? "" : remaining.slice(chunk.length);
  }

  return parts.length > 0 ? parts : [text];
}
