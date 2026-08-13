"use client";

import { useState } from "react";
import type { Swatch } from "@/data/brand-spec";

/**
 * Full-bleed colour bands.
 *
 * A palette shown as small cards reads as a spec sheet. Shown as bands that run
 * edge to edge, it reads as the brand — you see the actual colour at the size
 * you will actually use it, and the type sitting on it proves the pairing works
 * rather than asserting it in a table.
 *
 * Each band carries its own foreground so the demonstration is literal: what
 * you see is the approved combination.
 */
export function ColourBands({ swatches }: { swatches: Swatch[] }) {
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
    <ul>
      {swatches.map((s) => (
        <li key={s.token}>
          <button
            type="button"
            onClick={() => copy(s.hex)}
            aria-label={`Copy ${s.name} hex ${s.hex}`}
            className="group block w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-accent)]"
            style={{ backgroundColor: s.hex, color: s.fg }}
          >
            <div className="portal-inset-block flex flex-col gap-6 py-12 md:flex-row md:items-end md:justify-between md:py-16">
              <div className="max-w-[40ch]">
                <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,3.5vw,2.25rem)] font-semibold leading-tight tracking-[-0.02em]">
                  {s.name}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-[1.7] opacity-80">{s.role}</p>
              </div>

              <div className="shrink-0 md:text-right">
                <p className="font-[family-name:var(--font-mono)] text-[1.125rem] uppercase tracking-wide">
                  {copied === s.hex ? "Copied" : s.hex}
                </p>
                <p className="mt-1 font-[family-name:var(--font-mono)] text-[0.75rem] opacity-70">
                  {s.token}
                </p>
                {s.on && (
                  <p className="mt-3 font-[family-name:var(--font-mono)] text-[0.75rem] opacity-70">
                    {s.on.ratio.toFixed(2)}:1 on {s.on.name}
                  </p>
                )}
                <p className="mt-3 text-[0.6875rem] uppercase tracking-[0.18em] opacity-0 transition-opacity duration-150 group-hover:opacity-70 group-focus-visible:opacity-70">
                  Click to copy
                </p>
              </div>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
