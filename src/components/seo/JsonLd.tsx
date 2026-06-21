/**
 * Renders a JSON-LD structured-data block. Server-rendered so crawlers and AI
 * bots (which often skip client JS) see it on first response.
 *
 * Security: `data` is ALWAYS developer-authored structured data (never user
 * input) built in src/lib/seo.ts. The only XSS vector for inline JSON-LD is a
 * literal `</script>` inside a string value; we neutralize it by escaping every
 * `<` to its unicode form `<`, which is Next.js's documented JSON-LD guard.
 * This is why an HTML sanitizer (DOMPurify) is neither applicable nor needed
 * here — the payload is JSON, not HTML.
 */
interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
