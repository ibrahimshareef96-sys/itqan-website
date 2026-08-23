'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { Moon, Sun } from '@phosphor-icons/react';

/**
 * Page-local dark mode for the feedback form.
 *
 * The site's theme is next-themes with light as the deliberate default and the only
 * toggle in the nav — which the chrome-less feedback subdomain strips, so the form's
 * `dark:` styles could never activate there. Rather than bend the global provider
 * (light-first was an explicit call), this wrapper owns theming for THIS page alone:
 * Tailwind's class strategy matches ANY `.dark` ancestor, so a `dark` class on this
 * wrapper flips every `dark:` style inside it and nothing outside it.
 *
 * Default follows the visitor's system preference — a client opening a one-time link
 * never hunts for a toggle — and an explicit choice is remembered under a page-scoped
 * key so it cannot fight the site-wide next-themes storage.
 */
const STORAGE_KEY = 'fb-theme';

export function FeedbackThemer({ children }: { children: ReactNode }) {
  // null until mounted: SSR cannot know the system preference, so the first client
  // paint decides. A brief light flash for dark-system visitors is the accepted cost
  // of keeping this free of inline-script theming.
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'dark' || saved === 'light') {
        setDark(saved === 'dark');
        return;
      }
    } catch {
      /* storage unavailable (private mode) — fall through to system */
    }
    setDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  const toggle = () => {
    const next = !(dark ?? false);
    setDark(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
    } catch {
      /* non-fatal */
    }
  };

  return (
    <div className={dark ? 'dark' : ''}>
      <div className="relative">
        <button
          type="button"
          onClick={toggle}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="absolute right-5 top-5 z-10 rounded-full border border-black/[0.12] dark:border-[rgba(255,251,245,0.2)] bg-white/70 dark:bg-[rgba(255,251,245,0.06)] p-2.5 text-[#1a1a1a] dark:text-brand-cream backdrop-blur transition-colors"
        >
          {dark ? <Sun size={18} weight="bold" /> : <Moon size={18} weight="bold" />}
        </button>
        {children}
      </div>
    </div>
  );
}
