"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

export interface BrandAsset {
  id: string;
  brand: string;
  category: string;
  name: string;
  slug: string;
  format: string;
  bytes: number;
  src?: string;
  width?: number;
  height?: number;
  sourceOnly?: boolean;
}

export interface AssetBundle {
  brand: string;
  category: string;
  href: string;
  count: number;
  bytes: number;
}

const fmtBytes = (b: number) =>
  b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`;

/**
 * Marks drawn in white or lime need a dark tile; marks drawn dark need a light
 * one. The filename carries that intent (…-WHT, …-light, …-lime, …-drk), which
 * is the only signal the source files actually provide.
 */
function tileFor(asset: BrandAsset): { bg: string; label: string } {
  const s = `${asset.slug}`.toLowerCase();
  if (/(^|-)(wht|white|light|lime)(-|$)/.test(s)) return { bg: "var(--color-tile-dark)", label: "on the dark ground" };
  if (/(^|-)(drk|dark|black)(-|$)/.test(s)) return { bg: "var(--color-tile-light)", label: "on the light ground" };
  return { bg: "var(--color-tile-neutral)", label: "on the brand ground" };
}

export function AssetLibrary({
  assets,
  bundles,
  categories,
  initialQuery = "",
}: {
  assets: BrandAsset[];
  bundles: AssetBundle[];
  /** Category filter chips, in the order they should appear. */
  categories: string[];
  initialQuery?: string;
}) {
  const [cat, setCat] = useState<string>("all");
  const [fmt, setFmt] = useState<string>("all");
  const [q, setQ] = useState(initialQuery);
  const [viewing, setViewing] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const formats = useMemo(
    () => [...new Set(assets.map((a) => a.format))].sort(),
    [assets]
  );

  const shown = useMemo(() => {
    const query = q.trim().toLowerCase();
    return assets.filter((a) => {
      if (cat !== "all" && a.category !== cat) return false;
      if (fmt !== "all" && a.format !== fmt) return false;
      if (query && !`${a.name} ${a.category} ${a.format}`.toLowerCase().includes(query)) return false;
      return true;
    });
  }, [assets, cat, fmt, q]);

  const close = useCallback(() => setViewing(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setViewing((v) => (v === null ? v : (v + dir + shown.length) % shown.length)),
    [shown.length]
  );

  useEffect(() => {
    if (viewing === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [viewing, close, step]);

  // A filter change can leave the open index pointing past the new list.
  useEffect(() => {
    setViewing((v) => (v !== null && v >= shown.length ? null : v));
  }, [shown.length]);

  const active = viewing !== null ? shown[viewing] : null;

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2.5 mb-6">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Filter assets"
          aria-label="Filter assets by name"
          className="rounded-lg border border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-fg)_5%,transparent)] px-3 py-1.5 text-[0.8125rem] outline-none placeholder:text-[var(--color-muted)] focus:border-[var(--color-border-hover)]"
        />
        <div className="flex flex-wrap gap-1.5">
          {["all", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              aria-pressed={cat === c}
              className={cn(
                "rounded-full px-3 py-1.5 text-[0.75rem] font-medium capitalize transition-colors duration-150",
                cat === c
                  ? "bg-[var(--color-accent)] text-[var(--color-on-accent)]"
                  : "border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-fg)]"
              )}
            >
              {c === "all" ? "All" : c}
            </button>
          ))}
        </div>
        <select
          value={fmt}
          onChange={(e) => setFmt(e.target.value)}
          aria-label="Filter by format"
          className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-1.5 text-[0.75rem] text-[var(--color-text-secondary)]"
        >
          <option value="all">All formats</option>
          {formats.map((f) => (
            <option key={f} value={f}>
              {f.toUpperCase()}
            </option>
          ))}
        </select>
        <span className="ml-auto font-[family-name:var(--font-mono)] text-[0.75rem] text-[var(--color-muted)]">
          {shown.length} of {assets.length}
        </span>
      </div>

      {/* Bulk download bar */}
      {bundles.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {bundles
            .filter((b) => cat === "all" || b.category === cat || b.category === "all")
            .map((b) => (
              <a
                key={b.href}
                href={b.href}
                download
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border-hover)] px-3.5 py-2 text-[0.75rem] transition-colors duration-150 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                <span className="capitalize">
                  {b.category === "all" ? "Everything" : b.category}
                </span>
                <span className="text-[var(--color-muted)]">
                  {b.count} files · {fmtBytes(b.bytes)}
                </span>
                <span aria-hidden="true">↓</span>
              </a>
            ))}
        </div>
      )}

      {/* Grid */}
      {shown.length === 0 ? (
        <p className="py-16 text-center text-[0.9375rem] text-[var(--color-muted)]">
          No assets match those filters.
        </p>
      ) : (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {shown.map((asset, i) => {
            const tile = tileFor(asset);
            return (
              <li key={asset.id}>
                <button
                  type="button"
                  onClick={() => setViewing(i)}
                  className="group w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-xl"
                  aria-label={`Open ${asset.name}`}
                >
                  <div
                    className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl border border-[var(--color-border)] p-6 transition-transform duration-200 group-hover:-translate-y-0.5"
                    style={{ backgroundColor: tile.bg }}
                  >
                    {asset.src ? (
                      <Image
                        src={asset.src}
                        alt={asset.name}
                        width={asset.width ?? 400}
                        height={asset.height ?? 300}
                        className="max-h-full w-auto max-w-full object-contain"
                        sizes="(min-width: 1024px) 22vw, 45vw"
                      />
                    ) : (
                      <span className="font-[family-name:var(--font-mono)] text-[0.6875rem] text-[var(--color-muted)]">
                        {asset.format.toUpperCase()} source
                      </span>
                    )}
                  </div>
                  <p className="mt-2 truncate text-[0.8125rem]">{asset.name}</p>
                  <p className="font-[family-name:var(--font-mono)] text-[0.6875rem] text-[var(--color-muted)]">
                    {asset.format.toUpperCase()}
                    {asset.width ? ` · ${asset.width}×${asset.height}` : ""}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* Asset viewer / lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={active.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[color-mix(in_oklab,var(--color-tile-dark)_92%,transparent)] p-4 backdrop-blur-sm"
            onClick={close}
          >
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="grid max-h-[88vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-[var(--color-border-hover)] bg-[var(--color-surface)] md:grid-cols-[1fr_300px]"
            >
              <div
                className="flex min-h-[300px] items-center justify-center p-10"
                style={{ backgroundColor: tileFor(active).bg }}
              >
                {active.src ? (
                  <Image
                    src={active.src}
                    alt={active.name}
                    width={active.width ?? 1200}
                    height={active.height ?? 900}
                    className="max-h-[60vh] w-auto max-w-full object-contain"
                  />
                ) : (
                  <p className="text-center text-[0.875rem] text-[var(--color-muted)]">
                    Layered source file.
                    <br />
                    Available on request.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-5 overflow-y-auto p-6">
                <div>
                  <p className="text-[0.625rem] font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                    {active.category}
                  </p>
                  <h2 className="mt-1.5 font-[family-name:var(--font-display)] text-[1.25rem] font-semibold leading-tight">
                    {active.name}
                  </h2>
                </div>

                <dl className="space-y-2 text-[0.8125rem]">
                  {(
                    [
                      ["Format", active.format.toUpperCase()],
                      ...(active.width
                        ? ([["Dimensions", `${active.width} × ${active.height}`]] as const)
                        : []),
                      ["Size", fmtBytes(active.bytes)],
                      ["Tile", tileFor(active).label],
                    ] as ReadonlyArray<readonly [string, string]>
                  ).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <dt className="text-[var(--color-muted)]">{k}</dt>
                      <dd className="font-[family-name:var(--font-mono)] text-[0.75rem]">{v}</dd>
                    </div>
                  ))}
                </dl>

                {active.src && (
                  <a
                    href={active.src}
                    download
                    className="rounded-lg bg-[var(--color-accent)] px-4 py-2.5 text-center text-[0.8125rem] font-semibold text-[var(--color-on-accent)] transition-colors duration-150 hover:bg-[var(--color-accent-hover)]"
                  >
                    Download {active.format.toUpperCase()}
                  </a>
                )}

                <div className="mt-auto flex items-center justify-between pt-4 text-[0.75rem] text-[var(--color-muted)]">
                  <button type="button" onClick={() => step(-1)} className="hover:text-[var(--color-fg)]">
                    ← Previous
                  </button>
                  <span className="font-[family-name:var(--font-mono)]">
                    {(viewing ?? 0) + 1}/{shown.length}
                  </span>
                  <button type="button" onClick={() => step(1)} className="hover:text-[var(--color-fg)]">
                    Next →
                  </button>
                </div>

                <button
                  type="button"
                  onClick={close}
                  className="rounded-lg border border-[var(--color-border)] px-4 py-2 text-[0.75rem] hover:border-[var(--color-border-hover)]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
