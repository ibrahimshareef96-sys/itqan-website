'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

/**
 * Light is the DEFAULT (Ibrahim's call, 2026-07-03): the Axion-style redesign is
 * light-first; dark preserves the plum identity as a toggle. System preference is
 * deliberately NOT followed for the first impression (enableSystem={false}).
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </NextThemesProvider>
  );
}
