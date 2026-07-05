'use client';

import { useEffect, useRef, useState } from 'react';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, List, X } from '@phosphor-icons/react';
import { RollButton } from '@/components/ui/RollButton';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const NAV_LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

/** Live Dubai time, HH:MM. Placeholder until mounted to avoid hydration mismatch. */
function useDubaiTime(): string {
  const [time, setTime] = useState('--:--');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Dubai',
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/**
 * Global Axion-style pill navigation — sticky, theme-aware, on every page.
 * Carries the availability note, live Dubai clock, theme toggle, primary CTA,
 * and the mobile bottom-sheet menu (full modal contract).
 */
export function PillNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quarter, setQuarter] = useState('');
  const dubaiTime = useDubaiTime();
  const pathname = usePathname();
  const sheetRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  // Availability quarter, derived from the real date so it never goes stale.
  useEffect(() => {
    const d = new Date();
    setQuarter(`Q${Math.floor(d.getMonth() / 3) + 1} ${d.getFullYear()}`);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Close the sheet on route change.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Mobile sheet modal contract: initial focus, Escape close, Tab trap, focus restore.
  useEffect(() => {
    if (!menuOpen) return;
    const sheet = sheetRef.current;
    const focusables = () =>
      sheet ? Array.from(sheet.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')) : [];
    focusables()[0]?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        return;
      }
      if (e.key === 'Tab') {
        const els = focusables();
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      menuTriggerRef.current?.focus();
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50">
      <div className="max-w-[1440px] w-full mx-auto p-2 sm:p-3">
        <nav
          className="flex items-center justify-between rounded-full bg-white dark:bg-[#2a1a28] p-[5px] shadow-[0_2px_12px_rgba(47,28,44,0.06)]"
          aria-label="Main navigation"
        >
          {/* Logo + links */}
          <div className="flex items-center gap-6 pl-1">
            <Link
              href="/"
              aria-label="Itqan Studio — home"
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-dark dark:bg-brand-cream flex-shrink-0"
            >
              <Image src="/images/brand/light-icon.svg" alt="" width={18} height={18} className="dark:hidden" />
              <Image src="/images/brand/dark-icon.svg" alt="" width={18} height={18} className="hidden dark:block" />
            </Link>
            <div className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((l) => {
                const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    aria-current={active ? 'page' : undefined}
                    className={`text-[0.875rem] font-medium transition-colors duration-300 ${
                      active
                        ? 'text-brand-accent-on-light dark:text-brand-accent'
                        : 'text-text-primary hover:text-text-secondary dark:text-brand-cream dark:hover:text-brand-cream/70'
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right cluster */}
          <div className="hidden md:flex items-center gap-4">
            {quarter && (
              <span className="hidden lg:block text-[0.8125rem] text-text-secondary dark:text-brand-cream/55">
                Taking on projects for {quarter}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-[0.8125rem] text-text-secondary dark:text-brand-cream/55 tabular-nums">
              <Clock size={14} aria-hidden="true" />
              {dubaiTime} in Dubai
            </span>
            <ThemeToggle />
            <RollButton href="/contact" label="Start a conversation" />
          </div>

          {/* Mobile: theme + menu */}
          <div className="flex md:hidden items-center gap-2 pr-1">
            <ThemeToggle />
            <button
              ref={menuTriggerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-dark text-brand-cream dark:bg-brand-cream dark:text-brand-dark px-4 py-2 text-[0.8125rem] font-semibold"
            >
              <List size={15} weight="bold" />
              Menu
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-black/60 flex flex-col justify-end"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              ref={sheetRef}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="bg-white dark:bg-[#2a1a28] rounded-2xl mx-3 mb-3 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="inline-flex items-center gap-1.5 text-[0.8125rem] text-text-secondary dark:text-brand-cream/55 tabular-nums border border-black/10 dark:border-brand-cream/15 rounded-full px-3 py-1.5">
                  <Clock size={13} aria-hidden="true" />
                  {dubaiTime} in Dubai
                </span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-dark text-brand-cream dark:bg-brand-cream dark:text-brand-dark px-4 py-2 text-[0.8125rem] font-semibold"
                >
                  <X size={15} weight="bold" />
                  Close
                </button>
              </div>

              <nav className="flex flex-col gap-5 mb-8" aria-label="Mobile navigation">
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-[1.75rem] leading-[2rem] font-medium text-text-primary dark:text-brand-cream"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>

              <RollButton href="/contact" label="Start a conversation" className="w-full justify-between" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
