'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, MoonStars } from '@phosphor-icons/react';

/**
 * Light/dark toggle. Renders a stable placeholder until mounted so the icon
 * never mismatches the server-rendered HTML (next-themes is client-resolved).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-full border border-black/10 text-text-primary hover:bg-black/5 dark:border-brand-cream/20 dark:text-brand-cream dark:hover:bg-brand-cream/10 transition-colors duration-300 ${className ?? ''}`}
    >
      {isDark ? <Sun size={16} weight="bold" /> : <MoonStars size={16} weight="bold" />}
    </button>
  );
}
