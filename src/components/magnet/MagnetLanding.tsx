"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { LeadMagnet } from "@/lib/magnet-lookup";
import { testimonials, type Testimonial } from "@/data/testimonials";

/**
 * Itqan lead magnet landing page (v3 dark, 2026-05-23).
 *
 * Design lock: deliverables/38_itqan_editorial_v3_dark.html
 * Approved by Ibrahim 2026-05-23.
 *
 * Brand tokens (BRAND.md):
 *   --brand-dark   #2f1c2c  (plum) — main background
 *   --brand-accent #cca4c2  (mauve) — accents + button + section numbering
 *   --brand-cream  #fffbf5  (cream) — primary text on dark
 *
 * Motion philosophy (per Ibrahim 2026-05-23):
 *   "Serious motion, not generic AI slop animations."
 *   - Slow timing (1.1s duration), cubic-bezier(0.22, 1, 0.36, 1) easing
 *   - Opacity + 24px translateY only. No bounce, rotate, scale-in.
 *   - whileInView, once: true (no re-fire on re-enter)
 *   - prefers-reduced-motion respected
 *
 * Section system:
 *   1. Sticky email capture bar (always visible)
 *   2. Hero with ambient video (hero-bg.mp4 at 18% opacity + plum vignette)
 *   3. Power statement pull quote
 *   4. Founder silhouette divider
 *   5. 01/Inside + 02/Audience two-panel grid (static defaults, per-brand)
 *   6. Featured project mockup (per-magnet, rotates by slug)
 *   7. Testimonial card with real face (rotates by slug hash)
 *   8. Final CTA with email + first name
 *   9. Footer with logo + credo
 *
 * Content sources (v2.1 Agent 5 split):
 *   - magnet.title: Claude-generated editorial title
 *   - magnet.landingTeaser: ~150-word hook content (Body property in Notion)
 *   - Full ~1200-word PDF content stays in page children blocks (PDF only)
 */
export function MagnetLanding({ magnet }: { magnet: LeadMagnet }) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  // PDF URL confirmed by the capture API on success, used for the instant
  // on-page download button. Falls back to the magnet's own pdfUrl.
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const reduce = useReducedMotion();

  const featuredProject = useMemo(
    () => pickFeaturedProject(magnet.topicSlug),
    [magnet.topicSlug]
  );
  const testimonial = useMemo(
    () => pickTestimonial(magnet.topicSlug),
    [magnet.topicSlug]
  );
  const insidePanel = useMemo(() => INSIDE_PANEL_DEFAULTS, []);
  const audiencePanel = useMemo(() => AUDIENCE_PANEL_DEFAULTS, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      // No `pdfUrl` is sent: the delivered link is built SERVER-SIDE from our own
      // origin, so the client can never choose the URL we email (open-relay
      // hardening). dmKeyword only namespaces the subscriber tag.
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
      // Prefer the URL the server confirmed; fall back to the magnet's own.
      setDownloadUrl(data.pdfUrl ?? magnet.pdfUrl ?? null);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Try again.");
    }
  }

  // Reveal animation variants. reduce-motion users get instant visible.
  const reveal = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduce ? 0 : 1.1,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    // Deliberate dark-in-both-modes surface (Axion design system permits one such
    // moment): this design-locked, approved funnel uses only fixed dark hex + brand
    // tokens, so it renders identically in light and dark themes. The mauve accent
    // (#cca4c2) sits only on dark here, so it stays dual-accent compliant with no
    // theme pairs needed. Do NOT flip surfaces to light — the lock is dark.
    <div className="relative min-h-screen bg-[#1a0d17] text-brand-cream overflow-x-hidden">
      {/* Blueprint grid background — very subtle */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,251,245,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,251,245,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Atmospheric breathing orbs */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 12% 10%, rgba(204,164,194,0.22), transparent 38%), radial-gradient(circle at 88% 92%, rgba(209,194,165,0.18), transparent 42%)",
        }}
      />

      {/* STICKY CAPTURE BAR */}
      <div className="sticky top-0 z-50 bg-[#1a0d17]/90 backdrop-blur-md border-b border-brand-accent/15">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm">
            <span
              className="w-2 h-2 rounded-full bg-brand-accent"
              style={{
                animation: reduce
                  ? undefined
                  : "magnet-pulse 2.4s ease-out infinite",
              }}
            />
            <span className="font-serif italic text-brand-cream/90">
              Itqan Studio
            </span>
          </div>
          {status !== "success" ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto sm:max-w-md"
            >
              <input
                type="email"
                required
                placeholder="Your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent border border-brand-accent/30 rounded-md px-4 py-2 text-sm text-brand-cream placeholder:text-brand-cream/40 focus:outline-none focus:border-brand-accent transition"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="rounded-md px-5 py-2 text-xs font-semibold tracking-[0.08em] uppercase bg-brand-accent text-[#2f1c2c] hover:bg-brand-cream transition disabled:opacity-50 whitespace-nowrap"
              >
                {status === "submitting" ? "Sending" : "Get the blueprint"}
              </button>
            </form>
          ) : downloadUrl ? (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-5 py-2 text-xs font-semibold tracking-[0.08em] uppercase bg-brand-accent text-[#2f1c2c] hover:bg-brand-cream transition whitespace-nowrap"
            >
              Download your guide
            </a>
          ) : (
            <div className="text-sm text-brand-accent font-semibold">
              ✓ Sent. Check your inbox.
            </div>
          )}
        </div>
      </div>

      {/* HERO with ambient video */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">
        {/* Ambient video background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero/hero-main.png"
            className="w-full h-full object-cover opacity-[0.22]"
            style={{ filter: "saturate(0.85) contrast(1.05)" }}
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          {/* Plum vignette + bottom fade */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(26,13,23,0.35) 0%, rgba(26,13,23,0.75) 60%, #1a0d17 100%), radial-gradient(circle at center, transparent 25%, rgba(26,13,23,0.5) 80%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-7">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            className="inline-flex items-center gap-3 text-[11px] font-mono font-medium tracking-[0.22em] uppercase text-brand-cream/70"
          >
            <span className="inline-block w-7 h-px bg-current opacity-50" />
            <span>Itqan Studio · Free Blueprint</span>
            <span className="inline-block w-7 h-px bg-current opacity-50" />
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{
              ...reveal.visible.transition,
              delay: reduce ? 0 : 0.12,
            }}
            className="font-sans font-bold leading-[0.94] tracking-[-0.025em] max-w-[14ch]"
            style={{
              fontSize: "clamp(48px, 8vw, 116px)",
              background:
                "linear-gradient(135deg, #fffbf5 0%, #fffbf5 38%, #e6c8dc 70%, #d1c2a5 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            {renderTitleWithItalicAccent(magnet.title)}
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{
              ...reveal.visible.transition,
              delay: reduce ? 0 : 0.24,
            }}
            className="max-w-[56ch] text-brand-cream/75 leading-relaxed"
            style={{ fontSize: "clamp(16px, 1.4vw, 20px)" }}
          >
            {magnet.landingTeaser ||
              "From invisible to inevitable in 90 days. The blueprint we hand every founder before we quote them."}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            transition={{
              ...reveal.visible.transition,
              delay: reduce ? 0 : 0.36,
            }}
            className="flex flex-col items-center gap-3 mt-4 text-brand-cream/55"
          >
            <span className="text-[10px] font-mono tracking-[0.22em] uppercase">
              Read
            </span>
            <span
              className="w-2 h-2 rounded-full bg-brand-accent"
              style={{
                animation: reduce
                  ? undefined
                  : "magnet-drift 2.4s ease-in-out infinite",
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* POWER STATEMENT */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={reveal}
        className="relative py-28 sm:py-36 px-6"
      >
        <div className="max-w-3xl mx-auto text-center relative">
          <span
            aria-hidden
            className="absolute -top-6 -left-3 font-serif text-brand-accent/55"
            style={{ fontSize: "110px", lineHeight: 0 }}
          >
            &ldquo;
          </span>
          <p className="font-serif italic text-brand-cream leading-[1.28] max-w-[22ch] mx-auto"
             style={{ fontSize: "clamp(24px, 3.2vw, 40px)" }}>
            A brand is a{" "}
            <span
              className="not-italic font-semibold"
              style={{
                background:
                  "linear-gradient(135deg, #fffbf5, #cca4c2)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              working document
            </span>
            , not a logo. This is the working document.
          </p>
          <span
            aria-hidden
            className="absolute -bottom-3 -right-3 font-serif text-brand-accent/55"
            style={{ fontSize: "110px", lineHeight: 0 }}
          >
            &rdquo;
          </span>
        </div>
      </motion.section>

      {/* FOUNDER SILHOUETTE DIVIDER */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={reveal}
        className="relative text-center py-12 px-6"
      >
        <div
          className="relative w-[260px] h-[260px] mx-auto"
          style={{
            opacity: 0.1,
            filter: "grayscale(100%) contrast(1.1)",
          }}
        >
          <Image
            src="/images/founder-render.png"
            alt=""
            fill
            sizes="260px"
            className="object-contain"
            aria-hidden
          />
        </div>
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-brand-accent/45 to-transparent mx-auto mt-8" />
      </motion.section>

      {/* INSIDE — two panels with numbered sections */}
      <section className="px-6 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          className="max-w-3xl mx-auto text-center mb-16 sm:mb-20 flex flex-col items-center gap-4"
        >
          <div className="font-mono text-[12px] tracking-[0.18em] uppercase text-brand-accent font-medium flex items-center gap-2">
            <span className="inline-block w-3 h-px bg-current align-middle" />
            <span>The document</span>
          </div>
          <h2
            className="font-serif font-medium leading-[1.05] tracking-[-0.02em] max-w-[18ch] text-brand-cream"
            style={{ fontSize: "clamp(30px, 4vw, 48px)" }}
          >
            Two questions <em className="text-brand-cream/70 italic">most</em>{" "}
            founders skip.
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <Panel num="01" tag="Inside" {...insidePanel} reveal={reveal} />
          <Panel num="02" tag="Audience" {...audiencePanel} reveal={reveal} />
        </div>
      </section>

      {/* FEATURED PROJECT */}
      <section className="px-6 py-24 sm:py-32 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={reveal}
            className="flex flex-col gap-5"
          >
            <div className="font-mono text-[12px] tracking-[0.18em] uppercase text-brand-accent font-medium flex items-center gap-2">
              <span className="inline-block w-3 h-px bg-current align-middle" />
              <span>Reference foundation</span>
            </div>
            <h3
              className="font-serif font-medium leading-[1.12] text-brand-cream"
              style={{ fontSize: "clamp(22px, 2.8vw, 34px)" }}
            >
              A real Itqan{" "}
              <em className="italic text-brand-cream/72">brand foundation</em>,
              redacted.
            </h3>
            <p className="text-brand-cream/72 leading-relaxed max-w-[50ch]"
               style={{ fontSize: "16px" }}>
              We&apos;ve stripped the names and replaced the proprietary
              positioning, but the structure, exercises, and decision logs
              are intact. Use it as the template. Use it as the proof. It&apos;s
              the artifact behind every engagement.
            </p>
            <p className="text-brand-cream/50 text-sm">
              Featured: {featuredProject.label}.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={reveal}
            transition={{
              ...reveal.visible.transition,
              delay: reduce ? 0 : 0.14,
            }}
            className="relative aspect-[4/3] rounded-[14px] overflow-hidden bg-[#2a1825]"
            style={{
              boxShadow:
                "0 32px 64px -28px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,251,245,0.06)",
            }}
          >
            <Image
              src={featuredProject.src}
              alt={featuredProject.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1400ms]"
              style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
            />
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="px-6 py-24 sm:py-32 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          className="max-w-2xl mx-auto bg-[rgba(255,251,245,0.04)] border border-brand-accent/15 rounded-[18px] px-10 sm:px-12 py-14 text-center relative"
        >
          <div
            className="w-[72px] h-[72px] rounded-full overflow-hidden mx-auto -mt-20 mb-6 ring-4 ring-[#1a0d17] bg-brand-accent relative"
            style={{ boxShadow: "0 10px 30px -14px rgba(0,0,0,0.5)" }}
          >
            <Image
              src={testimonial.image ?? "/images/team/ibrahim-shareef.png"}
              alt={testimonial.name}
              fill
              sizes="72px"
              className="object-cover"
            />
          </div>
          <p
            className="font-serif italic text-brand-cream leading-[1.45] mb-7"
            style={{ fontSize: "clamp(18px, 1.9vw, 24px)" }}
          >
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <p className="text-sm text-brand-cream/70 tracking-[0.04em]">
            <span className="block font-semibold text-brand-cream text-base">
              {testimonial.name}
            </span>
            {testimonial.company}
          </p>
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 pt-16 pb-32 sm:pt-24 sm:pb-44 text-center">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          className="font-serif font-medium leading-[1.1] text-brand-cream max-w-[18ch] mx-auto mb-4"
          style={{ fontSize: "clamp(34px, 4.5vw, 56px)" }}
        >
          Get the{" "}
          <em className="italic text-brand-cream/72">blueprint</em>.
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={reveal}
          transition={{
            ...reveal.visible.transition,
            delay: reduce ? 0 : 0.12,
          }}
          className="text-brand-cream/65 max-w-[48ch] mx-auto mb-10"
          style={{ fontSize: "16px" }}
        >
          Drop your email and first name. The PDF lands within a minute, plus
          a five-day note series breaking down each section.
        </motion.p>

        {status !== "success" ? (
          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={reveal}
            transition={{
              ...reveal.visible.transition,
              delay: reduce ? 0 : 0.2,
            }}
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex flex-col gap-3"
          >
            <input
              type="text"
              placeholder="First name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-transparent border border-brand-accent/30 rounded-lg px-5 py-3.5 text-base text-brand-cream placeholder:text-brand-cream/40 focus:outline-none focus:border-brand-accent transition"
            />
            <input
              type="email"
              required
              placeholder="Work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border border-brand-accent/30 rounded-lg px-5 py-3.5 text-base text-brand-cream placeholder:text-brand-cream/40 focus:outline-none focus:border-brand-accent transition"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-lg px-6 py-3.5 text-sm font-semibold tracking-[0.12em] uppercase bg-brand-accent text-[#2f1c2c] hover:bg-brand-cream transition disabled:opacity-50"
            >
              {status === "submitting" ? "Sending" : "Send the blueprint"}
            </button>
            {status === "error" && (
              <div className="text-sm text-red-300 mt-1">{errorMsg}</div>
            )}
            <p className="text-xs text-brand-cream/40 mt-2">
              No spam. Unsubscribe anytime.
            </p>
          </motion.form>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            className="max-w-md mx-auto p-8 border border-brand-accent/40 rounded-2xl"
          >
            <div className="text-2xl font-semibold mb-2">
              ✓ You&apos;re in.
            </div>
            {downloadUrl ? (
              <>
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 mb-4 rounded-lg px-6 py-3.5 text-sm font-semibold tracking-[0.12em] uppercase bg-brand-accent text-[#2f1c2c] hover:bg-brand-cream transition"
                >
                  Download your guide
                </a>
                <div className="text-brand-cream/70 text-sm">
                  We also emailed it to you.
                </div>
              </>
            ) : (
              <div className="text-brand-cream/70">
                Check your inbox in the next couple of minutes.
              </div>
            )}
          </motion.div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="border-t border-brand-accent/15 py-12 text-center bg-[#1a0d17] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <Image
            src="/images/brand/light-logo.svg"
            alt="Itqan Studio"
            width={120}
            height={28}
            className="h-7 w-auto mx-auto mb-4 opacity-85"
          />
          <p className="font-serif italic text-brand-cream/65 text-sm tracking-[0.02em]">
            We don&apos;t redesign brands. We revive companies.
          </p>
        </div>
      </footer>

      {/* Pulse + drift keyframes (component-scoped via styled-jsx) */}
      <style jsx global>{`
        @keyframes magnet-pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(204, 164, 194, 0.55);
          }
          70% {
            box-shadow: 0 0 0 8px rgba(204, 164, 194, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(204, 164, 194, 0);
          }
        }
        @keyframes magnet-drift {
          0%,
          100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(8px);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Two-panel sub-component with corner brackets on hover.
 * Borrowed from the architectural blueprint mockup (file 34)
 * and grafted onto the editorial direction (file 33).
 */
function Panel({
  num,
  tag,
  title,
  items,
  reveal,
}: {
  num: string;
  tag: string;
  title: string;
  items: string[];
  reveal: {
    hidden: { opacity: number; y: number };
    visible: { opacity: number; y: number; transition: object };
  };
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={reveal}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-[rgba(255,251,245,0.03)] border border-brand-accent/15 rounded-2xl px-9 py-11 hover:border-brand-accent/40 hover:bg-[rgba(255,251,245,0.05)] transition-all duration-500"
    >
      {/* Corner brackets on hover */}
      <span className="absolute top-3 left-3 w-3.5 h-3.5 border-t border-l border-brand-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <span className="absolute bottom-3 right-3 w-3.5 h-3.5 border-b border-r border-brand-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-brand-cream/50 mb-4">
        {num} / {tag}
      </div>
      <h3 className="font-serif font-medium text-[1.6rem] leading-[1.15] mb-5 text-brand-cream">
        {title}
      </h3>
      <ul className="flex flex-col gap-3.5 list-none p-0 m-0">
        {items.map((item, i) => (
          <li
            key={i}
            className="relative pl-6 text-brand-cream/72 leading-relaxed"
            style={{ fontSize: "15px" }}
          >
            <span className="absolute left-0 top-[11px] w-3 h-px bg-brand-accent" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─── Static per-brand defaults for the Inside + Audience panels ────────────
// Future: drive these per-magnet from Notion fields. For now, the v2.1
// agent output focuses on the title + landing_teaser + full content; these
// two panels carry the Itqan "what's in / who for" anchor across all magnets.

const INSIDE_PANEL_DEFAULTS = {
  title: "What the blueprint contains",
  items: [
    "The 7-section foundation document with prompts and examples",
    "The earned-secret exercise we run in every kickoff",
    "Positioning frameworks: one-liner, ICP, before-after-bridge",
    "The decision matrix: when to brand, when to wait, when to walk",
    "Two reference foundations: a recruitment platform and a health-tech app",
  ],
};

const AUDIENCE_PANEL_DEFAULTS = {
  title: "Who this is for",
  items: [
    "GCC founders preparing a Series A raise",
    "Operators building a category-defining product in F&B, retail, fashion, or wellness",
    "Founders who refuse to start with a logo",
    "Anyone who's been burned by a freelance brand engagement that produced moodboards and nothing else",
    "The team that wants the strategist in the room, not the deck",
  ],
};

// ─── Per-magnet featured project image system ──────────────────────────────
// Each Itqan magnet gets a different featured client mockup so the 8 magnets
// don't all look like the same hero. Mapping is keyed off topic slug, with
// a brand-aware fallback for unknown slugs.

interface FeaturedProject {
  src: string;
  alt: string;
  label: string;
}

const FEATURED_PROJECT_MAP: Record<string, FeaturedProject> = {
  "founder-os-diagnostic": {
    src: "/images/portfolio/nexilink/cover.png",
    alt: "Nexilink — recruitment platform foundation",
    label: "Nexilink (recruitment platform), anonymized",
  },
  "weekly-company-revival-teardown": {
    src: "/images/portfolio/oud-closet/cover.png",
    alt: "Oud Closet — modest fashion foundation",
    label: "Oud Closet (modest fashion), anonymized",
  },
  "soul-skeleton-heartbeat-diagnostic": {
    src: "/images/portfolio/medacs/cover.png",
    alt: "Medacs — health-tech foundation",
    label: "Medacs (health-tech), anonymized",
  },
  "90-day-founder-os-stack": {
    src: "/images/portfolio/shareefico/cover.png",
    alt: "Shareefico Studio — creator tooling foundation",
    label: "Shareefico Studio (creator tooling), anonymized",
  },
  // Legacy v1 topic slugs (Brand Foundation Sprint era) — keep working until
  // the 8 old magnets get regenerated under v2.1.
  "brand-foundation-roadmap": {
    src: "/images/portfolio/nexilink/cover.png",
    alt: "Nexilink — recruitment platform foundation",
    label: "Nexilink (recruitment platform), anonymized",
  },
  "weekly-re-brand-teardown": {
    src: "/images/portfolio/oud-closet/cover.png",
    alt: "Oud Closet — modest fashion foundation",
    label: "Oud Closet (modest fashion), anonymized",
  },
  "brand-vs-logo-diagnostic": {
    src: "/images/portfolio/medacs/cover.png",
    alt: "Medacs — health-tech foundation",
    label: "Medacs (health-tech), anonymized",
  },
  "gcc-founders-brand-stack": {
    src: "/images/portfolio/shareefico/cover.png",
    alt: "Shareefico Studio — creator tooling foundation",
    label: "Shareefico Studio (creator tooling), anonymized",
  },
};

function pickFeaturedProject(slug: string): FeaturedProject {
  return (
    FEATURED_PROJECT_MAP[slug] ?? {
      src: "/images/founder-render.png",
      alt: "Itqan studio reference",
      label: "Itqan reference foundation",
    }
  );
}

// ─── Per-slug testimonial rotation ─────────────────────────────────────────
// Deterministic pick so the same magnet always shows the same testimonial
// (no flicker between server and client renders, no flicker between page
// re-renders). Hash-based selection across the real testimonials we have.

function pickTestimonial(slug: string): Testimonial {
  if (!testimonials.length) {
    return {
      quote: "[INSERT: real testimonial from Notion or LinkedIn]",
      name: "[INSERT: name]",
      company: "[INSERT: company]",
    };
  }
  const hash = slug
    .split("")
    .reduce((acc, c) => (acc + c.charCodeAt(0)) | 0, 0);
  const idx = Math.abs(hash) % testimonials.length;
  return testimonials[idx];
}

// ─── Hero title with Playfair Italic accent (v3.1, 2026-05-28) ─────────────
// Convention: Agent 5 wraps ONE editorial word in single asterisks in the
// title (e.g. "The Founder OS *Diagnostic*: 10 Questions..."). This helper
// splits on those markers and renders the wrapped word as Playfair Display
// italic against the Manrope Bold backbone, creating an editorial accent.
//
// Backward compatible: if the title has no asterisks (legacy v2.1 magnets),
// the whole title renders in Manrope Bold with no italic — the parent
// gradient text-clip still applies uniformly.
//
// The italic word breaks out of the cream-mauve-sand gradient and renders
// in solid mauve (#cca4c2) so it pops as a deliberate accent, not a tint
// caught accidentally by the gradient position.
function renderTitleWithItalicAccent(title: string): React.ReactNode {
  if (!title) return null;
  // Split on single-asterisk pairs (non-greedy, no nested asterisks).
  // The capturing group keeps the markers so we can detect them.
  const parts = title.split(/(\*[^*\n]+\*)/);
  return parts.map((part, i) => {
    if (
      part.startsWith("*") &&
      part.endsWith("*") &&
      part.length > 2 &&
      !part.startsWith("**")
    ) {
      const inner = part.slice(1, -1);
      return (
        <em
          key={i}
          className="italic"
          style={{
            fontFamily: 'var(--font-serif, "Playfair Display"), Georgia, serif',
            fontWeight: 500,
            // Override the parent H1's transparent text-fill so this word
            // shows in solid mauve instead of inheriting the gradient.
            color: "#cca4c2",
            WebkitTextFillColor: "#cca4c2",
          }}
        >
          {inner}
        </em>
      );
    }
    return <span key={i}>{part}</span>;
  });
}
