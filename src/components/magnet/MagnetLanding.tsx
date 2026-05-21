"use client";

import { useState, useMemo } from "react";
import type { LeadMagnet } from "@/lib/magnet-lookup";

/**
 * Itqan lead magnet landing page.
 *
 * Design references (Mobbin):
 * - Contra Freelance Industry Report (editorial Playfair hero, sticky email pill,
 *   numbered ToC at bottom)
 * - Ghost Red Velvet Bakery (centered email pill, premium mauve)
 *
 * Brand tokens (BRAND.md):
 * - brand-dark (#2f1c2c) — main background
 * - brand-accent (#cca4c2) — Playfair italic accents + button + email border
 * - brand-cream (#fffbf5) — main text on dark
 *
 * Component structure:
 * 1. Sticky top capture bar (always visible)
 * 2. Hero block (editorial Playfair italic + Manrope bold)
 * 3. Body (the magnet content rendered as markdown)
 * 4. Numbered section ToC at bottom (extracted from H2s in the body)
 * 5. CTA footer
 */
export function MagnetLanding({ magnet }: { magnet: LeadMagnet }) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Parse section headers (## H2s in markdown) for the bottom ToC.
  const sections = useMemo(() => {
    const headers = magnet.body.match(/^##\s+(.+)$/gm) ?? [];
    return headers.slice(0, 6).map((h, i) => ({
      num: String(i + 1).padStart(2, "0"),
      title: h.replace(/^##\s+/, "").trim(),
    }));
  }, [magnet.body]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/leads/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName: firstName || undefined,
          magnetSlug: magnet.topicSlug,
          dmKeyword: magnet.dmKeyword,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Try again.");
    }
  }

  return (
    <div className="min-h-screen bg-brand-dark text-brand-cream">
      {/* Sticky top capture bar (Contra-inspired) */}
      <div className="sticky top-0 z-50 bg-brand-dark/95 backdrop-blur-md border-b border-brand-accent/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs tracking-widest uppercase text-brand-accent font-semibold">
            Itqan Studio · Free Guide
          </div>
          {status !== "success" ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:max-w-md">
              <input
                type="email"
                required
                placeholder="Your best email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent border border-brand-accent/40 rounded-full px-5 py-2 text-sm text-brand-cream placeholder:text-brand-cream/50 focus:outline-none focus:border-brand-accent transition"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="rounded-full px-6 py-2 text-sm font-semibold bg-brand-accent text-brand-dark hover:bg-brand-cream transition disabled:opacity-50 whitespace-nowrap"
              >
                {status === "submitting" ? "Sending…" : "Get the guide"}
              </button>
            </form>
          ) : (
            <div className="text-sm text-brand-accent font-semibold">
              ✓ Sent. Check your inbox.
            </div>
          )}
        </div>
      </div>

      {/* Hero block */}
      <header className="max-w-5xl mx-auto px-6 pt-20 pb-16 sm:pt-32 sm:pb-24">
        <div className="text-xs tracking-[0.25em] uppercase text-brand-accent font-semibold mb-6">
          Itqan Studio · Brand Foundation
        </div>
        <h1 className="font-sans font-bold text-5xl sm:text-7xl leading-[1.05] mb-8 tracking-tight">
          {magnet.title}
        </h1>
        <p className="font-serif italic text-2xl sm:text-3xl text-brand-accent leading-snug max-w-3xl">
          A free guide for GCC founders who need brand to be execution, not graphic design.
        </p>
      </header>

      {/* Decorative divider */}
      <div className="max-w-5xl mx-auto px-6 mb-16">
        <div className="h-px bg-gradient-to-r from-brand-accent/0 via-brand-accent/40 to-brand-accent/0" />
      </div>

      {/* Main body */}
      <main className="max-w-3xl mx-auto px-6 pb-24">
        <div className="prose-magnet">{renderMarkdown(magnet.body)}</div>
      </main>

      {/* Numbered Table of Contents (Contra-inspired bottom strip) */}
      {sections.length > 0 && (
        <section className="bg-brand-accent/[0.08] border-y border-brand-accent/15">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-xs tracking-[0.25em] uppercase text-brand-accent font-semibold mb-6">
              What&apos;s inside
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
              {sections.map((s) => (
                <div key={s.num} className="border-t border-brand-accent/30 pt-4">
                  <div className="text-sm text-brand-accent/70 font-mono mb-2">{s.num}</div>
                  <div className="text-base font-semibold text-brand-cream leading-snug">
                    {s.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="font-sans font-bold text-3xl sm:text-5xl leading-tight mb-4">
          Ready to read the whole thing?
        </h2>
        <p className="font-serif italic text-xl text-brand-accent mb-10">
          One email. The full guide. Zero spam.
        </p>
        {status !== "success" ? (
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex flex-col gap-3"
          >
            <input
              type="text"
              placeholder="First name (optional)"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-transparent border border-brand-accent/40 rounded-full px-6 py-3 text-base text-brand-cream placeholder:text-brand-cream/50 focus:outline-none focus:border-brand-accent transition text-center sm:text-left"
            />
            <input
              type="email"
              required
              placeholder="Your best email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border border-brand-accent/40 rounded-full px-6 py-3 text-base text-brand-cream placeholder:text-brand-cream/50 focus:outline-none focus:border-brand-accent transition text-center sm:text-left"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-full px-6 py-3 text-base font-semibold bg-brand-accent text-brand-dark hover:bg-brand-cream transition disabled:opacity-50"
            >
              {status === "submitting" ? "Sending…" : "Send me the guide"}
            </button>
            {status === "error" && (
              <div className="text-sm text-red-300">{errorMsg}</div>
            )}
            <p className="text-xs text-brand-cream/50 mt-2">
              No spam. Unsubscribe anytime.
            </p>
          </form>
        ) : (
          <div className="max-w-md mx-auto p-8 border border-brand-accent/40 rounded-2xl">
            <div className="text-2xl font-semibold mb-2">✓ You&apos;re in.</div>
            <div className="text-brand-cream/70">
              Check your inbox in the next couple of minutes.
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-brand-accent/15">
        <div className="max-w-7xl mx-auto px-6 py-10 text-center">
          <div className="font-serif italic text-brand-accent mb-2">
            Brand is execution, not graphic design.
          </div>
          <div className="text-sm text-brand-cream/50">
            Itqan Studio · itqanstudio.com
          </div>
        </div>
      </footer>

      {/* Prose styling override for this page only */}
      <style jsx global>{`
        .prose-magnet h1 {
          font-family: var(--font-sans, Manrope), system-ui, sans-serif;
          font-size: 2.25rem;
          font-weight: 700;
          line-height: 1.15;
          margin: 3rem 0 1.5rem;
          color: #fffbf5;
        }
        .prose-magnet h2 {
          font-family: var(--font-sans, Manrope), system-ui, sans-serif;
          font-size: 1.75rem;
          font-weight: 700;
          line-height: 1.2;
          margin: 2.5rem 0 1rem;
          color: #fffbf5;
        }
        .prose-magnet h3 {
          font-family: var(--font-sans, Manrope), system-ui, sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.3;
          margin: 2rem 0 0.75rem;
          color: #fffbf5;
        }
        .prose-magnet p {
          font-size: 1.0625rem;
          line-height: 1.75;
          color: #fffbf5cc;
          margin-bottom: 1.25rem;
        }
        .prose-magnet ul,
        .prose-magnet ol {
          margin: 0.75rem 0 1.5rem 1.25rem;
        }
        .prose-magnet li {
          font-size: 1.0625rem;
          line-height: 1.7;
          color: #fffbf5cc;
          margin-bottom: 0.5rem;
        }
        .prose-magnet strong {
          color: #fffbf5;
          font-weight: 600;
        }
        .prose-magnet em {
          font-family: var(--font-serif, "Playfair Display"), Georgia, serif;
          font-style: italic;
          color: #cca4c2;
        }
        .prose-magnet hr {
          border: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(204, 164, 194, 0.4), transparent);
          margin: 3rem 0;
        }
      `}</style>
    </div>
  );
}

/**
 * Tiny markdown renderer. Handles headers, bold, italic, lists, hr.
 * Server-controlled content (no XSS surface from end users).
 */
function renderMarkdown(md: string): React.ReactNode {
  const blocks = md.split(/\n\n+/);
  return blocks.map((block, i) => {
    const t = block.trim();
    if (!t) return null;

    if (t === "---" || t === "***") {
      return <hr key={i} />;
    }
    if (t.startsWith("### ")) {
      return <h3 key={i}>{renderInline(t.slice(4))}</h3>;
    }
    if (t.startsWith("## ")) {
      return <h2 key={i}>{renderInline(t.slice(3))}</h2>;
    }
    if (t.startsWith("# ")) {
      return <h1 key={i}>{renderInline(t.slice(2))}</h1>;
    }
    if (t.split("\n").every((l) => l.trim().match(/^[-*]\s+/))) {
      return (
        <ul key={i}>
          {t.split("\n").map((l, j) => (
            <li key={j}>{renderInline(l.trim().replace(/^[-*]\s+/, ""))}</li>
          ))}
        </ul>
      );
    }
    return <p key={i}>{renderInline(t)}</p>;
  });
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let r = text;
  let k = 0;
  while (r.length > 0) {
    const bold = r.match(/^\*\*([^*]+)\*\*/);
    if (bold) {
      parts.push(<strong key={k++}>{bold[1]}</strong>);
      r = r.slice(bold[0].length);
      continue;
    }
    const italic = r.match(/^\*([^*]+)\*/);
    if (italic) {
      parts.push(<em key={k++}>{italic[1]}</em>);
      r = r.slice(italic[0].length);
      continue;
    }
    const next = r.search(/\*\*|\*/);
    const chunk = next === -1 ? r : r.slice(0, next);
    if (chunk) parts.push(chunk);
    r = next === -1 ? "" : r.slice(chunk.length);
  }
  return parts;
}
