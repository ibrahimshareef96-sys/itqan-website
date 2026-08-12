"use client";

import { useState } from "react";
import type { Swatch } from "@/data/brand-spec";

/**
 * Swatches that copy their own hex.
 *
 * The single most common reason someone opens a brand portal is to get a hex
 * code into another tool. Making them select six characters by hand is the
 * difference between a reference and a chore.
 */
export function ColourGrid({ swatches }: { swatches: Swatch[] }) {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopied(hex);
      window.setTimeout(() => setCopied((c) => (c === hex ? null : c)), 1400);
    } catch {
      // Clipboard is permission-gated and blocked in some embedded views. The
      // hex is on screen either way, so failing silently is the right cost.
    }
  };

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {swatches.map((s) => (
        <li
          key={s.token}
          className="overflow-hidden rounded-xl border border-[var(--color-border)]"
        >
          <button
            type="button"
            onClick={() => copy(s.hex)}
            className="group relative block h-28 w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-accent)]"
            style={{ backgroundColor: s.hex }}
            aria-label={`Copy ${s.name} hex ${s.hex}`}
          >
            <span
              className="absolute bottom-3 right-3 rounded-md px-2 py-1 font-[family-name:var(--font-mono)] text-[0.6875rem] opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100"
              style={{
                backgroundColor: "color-mix(in oklab, var(--color-tile-dark) 78%, transparent)",
                color: "var(--color-fg)",
              }}
            >
              {copied === s.hex ? "Copied" : "Copy hex"}
            </span>
          </button>

          <div className="p-4">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-[0.9375rem] font-medium">{s.name}</h3>
              <code className="font-[family-name:var(--font-mono)] text-[0.75rem] uppercase text-[var(--color-accent)]">
                {s.hex}
              </code>
            </div>
            <code className="mt-1 block font-[family-name:var(--font-mono)] text-[0.6875rem] text-[var(--color-muted)]">
              {s.token}
            </code>
            <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-[var(--color-text-secondary)]">
              {s.role}
            </p>
            {s.on && (
              <p className="mt-2 font-[family-name:var(--font-mono)] text-[0.6875rem] text-[var(--color-muted)]">
                {s.on.ratio.toFixed(2)}:1 on {s.on.name}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
