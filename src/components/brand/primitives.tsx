import Image from "next/image";
import Link from "next/link";
import { PORTAL_PAGES, portalCategoryOf, portalPage } from "@/data/brand-portal";
import { cn } from "@/lib/cn";

/**
 * Portal primitives — the building blocks every spec page composes from.
 *
 * Server-rendered and plain: a reference manual should not need JavaScript to
 * be readable. Only the asset library, search and copy-to-clipboard are client
 * components.
 *
 * LAYOUT MODEL — everything here is a child of `.portal-canvas` (globals.css).
 * Every block shares ONE left edge; prose is capped at a readable measure,
 * <Wide> widens to the container, and <Bleed> runs edge to edge. That single
 * shared edge is what stops the page reading as two designs stacked.
 */

/* ── layout escapes ─────────────────────────────────────────────────────── */

/** Full viewport width. For colour bands, imagery, the hero. */
export function Bleed({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("portal-bleed", className)}>{children}</div>;
}

/** Wider than prose, still inset. For grids, specimens, tables. */
export function Wide({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("portal-wide", className)}>{children}</div>;
}

/* ── hero ───────────────────────────────────────────────────────────────── */

interface PortalHeroProps {
  href: string;
  title?: string;
  lede?: string;
  /** Optional backdrop. Kept dim so type stays the subject. */
  image?: string;
  imageAlt?: string;
}

/**
 * The page opener.
 *
 * Full-bleed and deliberately large. A manual that starts with a small heading
 * and drops straight into a table reads as a spec sheet; the hero is what makes
 * it read as a brand.
 */
export function PortalHero({ href, title, lede, image, imageAlt }: PortalHeroProps) {
  const page = portalPage(href);
  const category = portalCategoryOf(href);
  const heading = title ?? page?.label ?? "";
  const sub = lede ?? page?.summary;

  return (
    <Bleed className="relative isolate overflow-hidden border-b border-[var(--color-border)]">
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-30"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, color-mix(in oklab, var(--color-bg-deep) 55%, transparent) 0%, color-mix(in oklab, var(--color-bg-deep) 84%, transparent) 55%, var(--color-bg-deep) 100%)",
            }}
          />
        </>
      )}

      <div className="portal-inset-block relative py-20 md:py-28 lg:py-32">
        {category && <p className="t-eyebrow mb-6">{category}</p>}
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,7vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
          {heading}
        </h1>
        {sub && (
          <p className="mt-7 max-w-[46ch] text-[clamp(1.0625rem,2vw,1.375rem)] leading-[1.55] text-[var(--color-text-secondary)]">
            {sub}
          </p>
        )}
      </div>
    </Bleed>
  );
}

/* ── section ────────────────────────────────────────────────────────────── */

export function Section({
  title,
  intro,
  children,
  className,
}: {
  title?: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("mb-24 md:mb-32", className)}>
      {title && (
        <h2 className="mb-4 font-[family-name:var(--font-display)] text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-tight tracking-[-0.02em]">
          {title}
        </h2>
      )}
      {intro && (
        <p className="mb-10 max-w-[52ch] text-[1.0625rem] leading-[1.7] text-[var(--color-text-secondary)]">
          {intro}
        </p>
      )}
      {children}
    </section>
  );
}

/** A paragraph of portal prose. Sized for reading, not for filling space. */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-6 text-[1.0625rem] leading-[1.75] text-[var(--color-text-secondary)]">
      {children}
    </p>
  );
}

/* ── imagery ────────────────────────────────────────────────────────────── */

/**
 * A picture with a caption that says something.
 *
 * The caption is required on purpose: an uncaptioned image in a brand manual
 * is decoration, and decoration is what makes a portal feel padded rather than
 * useful.
 */
export function Figure({
  src,
  alt,
  caption,
  ratio = "16 / 9",
  tone = "frame",
}: {
  src: string;
  alt: string;
  caption: string;
  ratio?: string;
  /** `frame` sits in a bordered card; `plain` lets the image breathe alone. */
  tone?: "frame" | "plain";
}) {
  return (
    <figure className="my-10">
      <div
        className={cn(
          "relative overflow-hidden rounded-xl",
          tone === "frame" &&
            "border border-[var(--color-border)] bg-[var(--color-surface)]",
        )}
        style={{ aspectRatio: ratio }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1180px) 1100px, 100vw"
          className="object-cover"
        />
      </div>
      <figcaption className="mt-3 text-[0.8125rem] leading-relaxed text-[var(--color-muted)]">
        {caption}
      </figcaption>
    </figure>
  );
}

export function Gallery({
  items,
  columns = 3,
}: {
  items: Array<{ src: string; alt: string; caption?: string }>;
  columns?: 2 | 3 | 4;
}) {
  return (
    <ul
      className={cn(
        "grid gap-4",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-2 lg:grid-cols-4",
      )}
    >
      {items.map((it) => (
        <li key={it.src}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            <Image
              src={it.src}
              alt={it.alt}
              fill
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          {it.caption && (
            <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-[var(--color-muted)]">
              {it.caption}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * A pull quote. One per page at most.
 *
 * This is the biggest thing separating a brand portal from documentation:
 * somewhere on the page the brand should SAY something in its own voice rather
 * than specify something.
 */
export function PullQuote({
  children,
  attribution,
}: {
  children: React.ReactNode;
  attribution?: string;
}) {
  return (
    <blockquote className="my-16 border-l-2 border-[var(--color-accent)] pl-6 md:pl-8">
      <p className="font-[family-name:var(--font-display)] text-[clamp(1.375rem,3vw,1.875rem)] font-semibold leading-[1.3] tracking-[-0.02em]">
        {children}
      </p>
      {attribution && (
        <cite className="mt-4 block text-[0.875rem] not-italic text-[var(--color-muted)]">
          {attribution}
        </cite>
      )}
    </blockquote>
  );
}

/* ── callout (Frontify tip / info / note / warning) ─────────────────────── */

const CALLOUT_TONE = {
  tip: { border: "#6dbf95", label: "Tip" },
  info: { border: "#93b3d4", label: "Note" },
  note: { border: "var(--color-accent)", label: "Remember" },
  warning: { border: "var(--color-danger)", label: "Never" },
} as const;

export function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: keyof typeof CALLOUT_TONE;
  title?: string;
  children: React.ReactNode;
}) {
  const t = CALLOUT_TONE[tone];
  return (
    <div
      className="my-10 rounded-r-lg border-l-2 bg-[color-mix(in_oklab,var(--color-fg)_4%,transparent)] px-6 py-5"
      style={{ borderLeftColor: t.border }}
    >
      <p
        className="mb-2 text-[0.625rem] font-bold uppercase tracking-[0.2em]"
        style={{ color: t.border }}
      >
        {title ?? t.label}
      </p>
      <div className="text-[0.9375rem] leading-[1.7] text-[var(--color-text-secondary)]">
        {children}
      </div>
    </div>
  );
}

/* ── do / don't rules ───────────────────────────────────────────────────── */

export interface Rule {
  kind: "do" | "dont";
  text: string;
}

export function RuleGrid({ rules }: { rules: Rule[] }) {
  return (
    <div className="grid gap-x-12 gap-y-5 sm:grid-cols-2">
      {rules.map((r) => (
        <div key={r.text} className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className={cn(
              "mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
              r.kind === "do"
                ? "bg-[var(--color-accent)] text-[var(--color-on-accent)]"
                : "bg-[var(--color-danger)] text-[var(--color-on-accent)]",
            )}
          >
            {r.kind === "do" ? "✓" : "✕"}
          </span>
          <p className="text-[0.9375rem] leading-[1.7] text-[var(--color-text-secondary)]">
            <span className="sr-only">{r.kind === "do" ? "Do: " : "Do not: "}</span>
            {r.text}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ── spec table ─────────────────────────────────────────────────────────── */

export function SpecTable({
  rows,
  columns,
}: {
  columns: [string, string, string?];
  rows: Array<[string, string, string?]>;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-left">
        <thead>
          <tr className="border-b border-[var(--color-border-hover)]">
            {columns.filter(Boolean).map((c) => (
              <th
                key={c}
                className="pb-4 pr-6 text-[0.625rem] font-bold uppercase tracking-[0.2em] text-[var(--color-muted)]"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-[var(--color-border)]">
              <td className="py-4 pr-6 text-[0.875rem] font-medium">{row[0]}</td>
              <td className="py-4 pr-6 font-[family-name:var(--font-mono)] text-[0.8125rem] text-[var(--color-accent)]">
                {row[1]}
              </td>
              {row[2] !== undefined && (
                <td className="py-4 text-[0.875rem] leading-relaxed text-[var(--color-text-secondary)]">
                  {row[2]}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── prev / next ────────────────────────────────────────────────────────── */

export function PrevNext({ href }: { href: string }) {
  const i = PORTAL_PAGES.findIndex((p) => p.href === href);
  const prev = i > 0 ? PORTAL_PAGES[i - 1] : undefined;
  const next = i >= 0 && i < PORTAL_PAGES.length - 1 ? PORTAL_PAGES[i + 1] : undefined;
  if (!prev && !next) return null;
  return (
    <nav className="mt-4 grid gap-3 border-t border-[var(--color-border)] pt-10 sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="group rounded-xl border border-[var(--color-border)] p-5 transition-colors duration-150 hover:border-[var(--color-border-hover)]"
        >
          <p className="text-[0.625rem] font-bold uppercase tracking-[0.2em] text-[var(--color-muted)]">
            Previous
          </p>
          <p className="mt-1.5 text-[1rem] group-hover:text-[var(--color-accent)]">{prev.label}</p>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          href={next.href}
          className="group rounded-xl border border-[var(--color-border)] p-5 text-right transition-colors duration-150 hover:border-[var(--color-border-hover)]"
        >
          <p className="text-[0.625rem] font-bold uppercase tracking-[0.2em] text-[var(--color-muted)]">
            Next
          </p>
          <p className="mt-1.5 text-[1rem] group-hover:text-[var(--color-accent)]">{next.label}</p>
        </Link>
      )}
    </nav>
  );
}

/* ── page wrapper ───────────────────────────────────────────────────────── */

export function PortalPageBody({
  href,
  title,
  lede,
  heroImage,
  heroAlt,
  children,
}: {
  href: string;
  title?: string;
  lede?: string;
  heroImage?: string;
  heroAlt?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="portal-canvas pb-28">
      <PortalHero href={href} title={title} lede={lede} image={heroImage} imageAlt={heroAlt} />
      <div className="h-16 md:h-24" />
      {children}
      <PrevNext href={href} />
    </div>
  );
}
