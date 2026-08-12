"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { PORTAL_BRAND, PORTAL_NAV, type PortalCategory } from "@/data/brand-portal";
import { PortalSearch } from "./PortalSearch";

/**
 * Portal shell — the Frontify/brand.uber.com layout model.
 *
 * A persistent sticky LEFT sidebar with three nav levels
 * (CATEGORY → section → page) beside a single scrolling content column.
 * This is deliberately NOT the marketing site's chrome: the portal is a
 * reference manual, so navigation is always visible and every topic is its
 * own URL rather than an anchor in one long page.
 *
 * On mobile the sidebar collapses into a sheet behind a "Contents" button,
 * because a 3-level tree cannot honestly fit a phone rail.
 */
export function PortalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Route change closes the mobile sheet — otherwise it covers the page the
  // user just asked for.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="brand-portal min-h-screen bg-[var(--color-bg-deep)] text-[var(--color-fg)]">
      {/* Portal top bar — its own, minimal: mark, wordmark, search, exit. */}
      <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-bg-deep)_88%,transparent)] backdrop-blur-xl">
        <div className="flex items-center gap-4 px-4 sm:px-6 h-14">
          <Link href="/brand" className="flex items-center gap-2.5 shrink-0 group">
            <Image
              src={PORTAL_BRAND.markSrc}
              alt=""
              width={26}
              height={26}
              className="h-[26px] w-auto"
              priority
            />
            <span className="font-[family-name:var(--font-display)] text-[0.9375rem] font-semibold tracking-tight">
              Brand
            </span>
          </Link>

          <div className="hidden md:block flex-1 max-w-md">
            <PortalSearch />
          </div>

          <div className="flex-1 md:hidden" />

          <a
            href={PORTAL_BRAND.siteUrl}
            className="hidden sm:inline-flex text-[0.8125rem] text-[var(--color-text-secondary)] hover:text-[var(--color-fg)] transition-colors duration-200"
          >
            {PORTAL_BRAND.siteLabel} ↗
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center gap-2 rounded-full border border-[var(--color-border-hover)] px-3.5 py-1.5 text-[0.75rem] font-semibold uppercase tracking-[0.14em]"
            aria-expanded={open}
            aria-controls="portal-contents"
          >
            {open ? "Close" : "Contents"}
          </button>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1500px]">
        {/* Desktop sidebar */}
        <aside
          className="hidden lg:block w-[276px] shrink-0 border-r border-[var(--color-border)]"
          aria-label="Brand portal contents"
        >
          <div className="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto px-5 py-8">
            <SidebarTree pathname={pathname} />
          </div>
        </aside>

        {/* Mobile sheet */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="portal-contents"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed inset-x-0 top-14 bottom-0 z-30 overflow-y-auto bg-[var(--color-bg-deep)] px-5 py-6"
            >
              <div className="mb-6">
                <PortalSearch />
              </div>
              <SidebarTree pathname={pathname} />
            </motion.div>
          )}
        </AnimatePresence>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

function SidebarTree({ pathname }: { pathname: string }) {
  const tree = useMemo(() => PORTAL_NAV, []);
  return (
    <nav className="space-y-8">
      {tree.map((cat: PortalCategory) => (
        <div key={cat.label}>
          <p className="mb-3 text-[0.625rem] font-bold uppercase tracking-[0.2em] text-[var(--color-muted)]">
            {cat.label}
          </p>
          <ul className="space-y-0.5">
            {cat.items.map((item) => {
              const active = pathname === item.href;
              const childActive = item.children?.some((c) => pathname === c.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-2.5 py-[7px] text-[0.875rem] transition-colors duration-150",
                      active
                        ? "bg-[color-mix(in_oklab,var(--color-accent)_16%,transparent)] text-[var(--color-accent)] font-medium"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-fg)] hover:bg-[color-mix(in_oklab,var(--color-fg)_6%,transparent)]"
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children && (active || childActive) && (
                    <ul className="mt-0.5 ml-2.5 space-y-0.5 border-l border-[var(--color-border)] pl-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            aria-current={pathname === child.href ? "page" : undefined}
                            className={cn(
                              "block rounded-md px-2.5 py-1.5 text-[0.8125rem] transition-colors duration-150",
                              pathname === child.href
                                ? "text-[var(--color-accent)] font-medium"
                                : "text-[var(--color-muted)] hover:text-[var(--color-fg)]"
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
