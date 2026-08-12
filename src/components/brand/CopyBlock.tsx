"use client";

import { useState } from "react";

/**
 * A block of approved copy with a copy-to-clipboard control.
 *
 * The copy library only works if the text leaves the page intact — retyping a
 * bio is how a wrong version of it starts circulating.
 */
export function CopyBlock({
  label,
  meta,
  text,
}: {
  label: string;
  meta?: string;
  text: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      // Clipboard access is permission-gated; the text is selectable regardless.
    }
  };

  return (
    <div className="rounded-xl border border-[var(--color-border)] p-5">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <div>
          <h3 className="text-[0.9375rem] font-medium">{label}</h3>
          {meta && (
            <p className="mt-0.5 font-[family-name:var(--font-mono)] text-[0.6875rem] text-[var(--color-muted)]">
              {meta}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-[0.75rem] transition-colors duration-150 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="text-[0.9375rem] leading-relaxed text-[var(--color-text-secondary)]">{text}</p>
    </div>
  );
}
