"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { PORTAL_PAGES, portalCategoryOf } from "@/data/brand-portal";
import manifest from "@/data/brand-assets.json";
import { cn } from "@/lib/cn";

interface Hit {
  href: string;
  label: string;
  context: string;
  kind: "page" | "asset";
}

/**
 * Portal search — pages AND assets in one index.
 *
 * A brand portal is a reference manual: people arrive knowing the word they
 * want ("clear space", "lime", "sticker") and should not have to guess which
 * chapter owns it. Everything is local and static, so this is a plain
 * substring/token match rather than a fetch — instant, and correct offline.
 */
export function PortalSearch() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const index = useMemo<Hit[]>(() => {
    const pages: Hit[] = PORTAL_PAGES.map((p) => ({
      href: p.href,
      label: p.label,
      context: `${portalCategoryOf(p.href) ?? "Portal"} · ${p.summary}`,
      kind: "page",
    }));
    const assets: Hit[] = manifest.assets
      .filter((a: { src?: string }) => Boolean(a.src))
      .map((a: { name: string; category: string; format: string; brand: string }) => ({
        href: `/brand/assets?q=${encodeURIComponent(a.name)}`,
        label: a.name,
        context: `${a.category} · ${a.format.toUpperCase()}`,
        kind: "asset" as const,
      }));
    return [...pages, ...assets];
  }, []);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (query.length < 2) return [];
    const tokens = query.split(/\s+/);
    return index
      .map((hit) => {
        const hay = `${hit.label} ${hit.context}`.toLowerCase();
        // Every token must appear; earlier matches in the label rank higher.
        if (!tokens.every((t) => hay.includes(t))) return null;
        const pos = hit.label.toLowerCase().indexOf(tokens[0]);
        return { hit, score: (pos === -1 ? 200 : pos) + (hit.kind === "page" ? 0 : 50) };
      })
      .filter(Boolean)
      .sort((a, b) => a!.score - b!.score)
      .slice(0, 8)
      .map((r) => r!.hit);
  }, [q, index]);

  // Cmd/Ctrl-K focuses search from anywhere in the portal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => setCursor(0), [q]);

  return (
    <div ref={boxRef} className="relative">
      <div className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-fg)_5%,transparent)] px-3 py-1.5 focus-within:border-[var(--color-border-hover)]">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 opacity-50">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setCursor((c) => Math.min(c + 1, results.length - 1));
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setCursor((c) => Math.max(c - 1, 0));
            }
          }}
          type="search"
          placeholder="Search the brand"
          aria-label="Search the brand portal"
          className="w-full bg-transparent text-[0.8125rem] outline-none placeholder:text-[var(--color-muted)]"
        />
        <kbd className="hidden sm:block shrink-0 rounded border border-[var(--color-border)] px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[0.625rem] text-[var(--color-muted)]">
          ⌘K
        </kbd>
      </div>

      {open && q.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-lg border border-[var(--color-border-hover)] bg-[var(--color-surface)] shadow-2xl">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-[0.8125rem] text-[var(--color-muted)]">
              Nothing matches “{q.trim()}”.
            </p>
          ) : (
            <ul>
              {results.map((hit, i) => (
                <li key={`${hit.kind}-${hit.href}-${hit.label}`}>
                  <Link
                    href={hit.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-baseline justify-between gap-3 px-4 py-2.5 transition-colors duration-100",
                      i === cursor
                        ? "bg-[color-mix(in_oklab,var(--color-accent)_14%,transparent)]"
                        : "hover:bg-[color-mix(in_oklab,var(--color-fg)_6%,transparent)]"
                    )}
                  >
                    <span className="text-[0.875rem]">{hit.label}</span>
                    <span className="shrink-0 text-[0.6875rem] text-[var(--color-muted)]">{hit.context}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
