import Link from "next/link";
import { PORTAL_PAGES, portalCategoryOf, portalPage } from "@/data/brand-portal";
import { cn } from "@/lib/cn";

/**
 * Portal primitives — the building blocks every spec page composes from.
 *
 * Deliberately plain and server-rendered: a reference manual should not need
 * JavaScript to be readable. Only the asset library and search are client
 * components.
 */

/* ── page header ────────────────────────────────────────────────────────── */

export function PageHeader({
  href,
  title,
  lede,
}: {
  href: string;
  title: string;
  lede?: string;
}) {
  const category = portalCategoryOf(href);
  return (
    <header className="mb-14 border-b border-[var(--color-border)] pb-10">
      {category && <p className="t-eyebrow mb-4">{category}</p>}
      <h1 className="font-[family-name:var(--font-display)] text-[2.25rem] sm:text-[3rem] font-semibold leading-[1.05] tracking-[-0.02em]">
        {title}
      </h1>
      {lede && (
        <p className="mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-[var(--color-text-secondary)]">
          {lede}
        </p>
      )}
    </header>
  );
}

/* ── section ────────────────────────────────────────────────────────────── */

export function Section({
  title,
  intro,
  children,
}: {
  title?: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      {title && (
        <h2 className="mb-3 font-[family-name:var(--font-display)] text-[1.375rem] font-semibold tracking-[-0.01em]">
          {title}
        </h2>
      )}
      {intro && (
        <p className="mb-8 max-w-2xl text-[0.9375rem] leading-relaxed text-[var(--color-text-secondary)]">
          {intro}
        </p>
      )}
      {children}
    </section>
  );
}

/* ── callout (Frontify tip / info / note / warning) ─────────────────────── */

const CALLOUT_TONE = {
  tip: { border: "#6dbf95", label: "Tip" },
  info: { border: "#93b3d4", label: "Note" },
  note: { border: "#d7fd64", label: "Remember" },
  warning: { border: "#d97a72", label: "Never" },
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
      className="my-8 rounded-r-lg border-l-2 bg-[color-mix(in_oklab,var(--color-fg)_4%,transparent)] px-5 py-4"
      style={{ borderLeftColor: t.border }}
    >
      <p
        className="mb-1.5 text-[0.625rem] font-bold uppercase tracking-[0.2em]"
        style={{ color: t.border }}
      >
        {title ?? t.label}
      </p>
      <div className="text-[0.9375rem] leading-relaxed text-[var(--color-text-secondary)]">
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
    <div className="grid gap-x-10 gap-y-4 sm:grid-cols-2">
      {rules.map((r) => (
        <div key={r.text} className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className={cn(
              "mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
              r.kind === "do" ? "bg-[var(--color-accent)] text-[var(--color-on-accent)]" : "bg-[var(--color-danger)] text-[var(--color-on-accent)]"
            )}
          >
            {r.kind === "do" ? "✓" : "✕"}
          </span>
          <p className="text-[0.9375rem] leading-relaxed text-[var(--color-text-secondary)]">
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
                className="pb-3 pr-6 text-[0.625rem] font-bold uppercase tracking-[0.2em] text-[var(--color-muted)]"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-[var(--color-border)]">
              <td className="py-3.5 pr-6 text-[0.875rem] font-medium">{row[0]}</td>
              <td className="py-3.5 pr-6 font-[family-name:var(--font-mono)] text-[0.8125rem] text-[var(--color-accent)]">
                {row[1]}
              </td>
              {row[2] !== undefined && (
                <td className="py-3.5 text-[0.875rem] text-[var(--color-text-secondary)]">{row[2]}</td>
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
    <nav className="mt-20 grid gap-3 border-t border-[var(--color-border)] pt-8 sm:grid-cols-2">
      {prev ? (
        <Link
          href={prev.href}
          className="group rounded-lg border border-[var(--color-border)] p-4 transition-colors duration-150 hover:border-[var(--color-border-hover)]"
        >
          <p className="text-[0.625rem] font-bold uppercase tracking-[0.2em] text-[var(--color-muted)]">
            Previous
          </p>
          <p className="mt-1 text-[0.9375rem] group-hover:text-[var(--color-accent)]">{prev.label}</p>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          href={next.href}
          className="group rounded-lg border border-[var(--color-border)] p-4 text-right transition-colors duration-150 hover:border-[var(--color-border-hover)]"
        >
          <p className="text-[0.625rem] font-bold uppercase tracking-[0.2em] text-[var(--color-muted)]">
            Next
          </p>
          <p className="mt-1 text-[0.9375rem] group-hover:text-[var(--color-accent)]">{next.label}</p>
        </Link>
      )}
    </nav>
  );
}

/* ── page wrapper ───────────────────────────────────────────────────────── */

export function PortalPageBody({
  href,
  title,
  children,
}: {
  href: string;
  title?: string;
  children: React.ReactNode;
}) {
  const page = portalPage(href);
  return (
    <div className="mx-auto max-w-3xl px-6 py-14 sm:px-10 lg:py-20">
      <PageHeader href={href} title={title ?? page?.label ?? ""} lede={page?.summary} />
      {children}
      <PrevNext href={href} />
    </div>
  );
}
