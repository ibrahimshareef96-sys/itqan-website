'use client';

import { PillNav } from '@/components/layout/PillNav';

/**
 * Sitewide navigation = the Axion-style pill nav (sticky, theme-aware) on EVERY
 * page — Ibrahim's 2026-07-04 direction. The old fixed dark navbar is retired;
 * this shell keeps the layout import stable.
 */
export function Navbar() {
  return <PillNav />;
}
