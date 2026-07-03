'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, List, X } from '@phosphor-icons/react';
import { RollButton } from '@/components/ui/RollButton';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { AiVisibility } from '@/components/home/AiVisibility';

// WebGPU shader is client-only; the section's CSS gradient is the fallback.
const HeroShader = dynamic(() => import('@/components/home/HeroShader'), { ssr: false });

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

/** Starburst mark for the proof badge (from the Axion reference, brand-recolored). */
function Starburst({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z"
      />
    </svg>
  );
}

export function HeroAxion() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showShader, setShowShader] = useState(false);
  const [quarter, setQuarter] = useState('');
  const dubaiTime = useDubaiTime();
  const sheetRef = useRef<HTMLDivElement>(null);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

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

  // Defer the WebGPU shader chunk until after LCP, and never fetch it for
  // reduced-motion users (the CSS gradient fallback covers both cases).
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const start = () => setShowShader(true);
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 1200);
    return () => clearTimeout(t);
  }, []);

  // Availability quarter, derived from the real date so it never goes stale.
  useEffect(() => {
    const d = new Date();
    setQuarter(`Q${Math.floor(d.getMonth() / 3) + 1} ${d.getFullYear()}`);
  }, []);

  return (
    <section
      className="relative min-h-[100dvh] flex flex-col overflow-hidden bg-brand-cream dark:bg-[#1f1420]"
      aria-label="Introduction"
    >
      {/* CSS gradient fallback — always painted; the shader layers on top when available */}
      <div
        className="absolute inset-0 pointer-events-none dark:hidden"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 75% 60% at 78% 22%, rgba(204,164,194,0.28), transparent 60%), radial-gradient(ellipse 60% 55% at 12% 80%, rgba(209,194,165,0.22), transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none hidden dark:block"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 75% 60% at 78% 22%, rgba(204,164,194,0.14), transparent 60%), radial-gradient(ellipse 60% 55% at 12% 80%, rgba(209,194,165,0.08), transparent 60%)',
        }}
      />

      {/* Animated shader overlay — mounted post-idle, skipped for reduced motion */}
      {showShader && <HeroShader />}

      {/* ── Pill navbar ── */}
      <div className="relative z-20 max-w-[1440px] w-full mx-auto p-2 sm:p-3">
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
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[0.875rem] font-medium text-text-primary hover:text-text-secondary dark:text-brand-cream dark:hover:text-brand-cream/70 transition-colors duration-300"
                >
                  {l.label}
                </Link>
              ))}
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

      {/* ── Middle zone: the AI-visibility panel ── */}
      <div className="relative z-20 flex-1 flex items-center justify-center lg:justify-end max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 py-8">
        <AiVisibility className="w-full max-w-[420px] lg:mr-4" />
      </div>

      {/* ── Hero content — bottom-anchored ── */}
      <div className="relative z-20 max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 pb-12 sm:pb-16 lg:pb-20">
        <p className="text-[0.8125rem] sm:text-[0.875rem] font-medium tracking-wide text-text-primary dark:text-brand-cream mb-5 sm:mb-7">
          Itqan Studio &mdash; Dubai
        </p>

        <h1
          className="font-sans font-semibold text-text-primary dark:text-brand-cream leading-[1.08] tracking-[-0.03em]"
          style={{ fontSize: 'clamp(2.25rem, 6.5vw, 4.2rem)' }}
        >
          Your next customer just{' '}
          <span
            className="text-brand-accent-on-light dark:text-brand-accent"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 500 }}
          >
            asked
          </span>{' '}
          ChatGPT.
        </h1>

        <p className="mt-5 sm:mt-6 text-[0.9375rem] sm:text-[1.0625rem] leading-[1.55] text-[#4a4a4a] dark:text-brand-cream/70 max-w-[52ch]">
          Did your name come up? That&apos;s the work &mdash; getting you into the answer,
          and converting the buyers who land.
        </p>

        {/* CTA row */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
          <RollButton href="/contact" label="Start a conversation" className="self-start" />

          {/* Proof badge */}
          <Link
            href="/work"
            className="self-start inline-flex items-center gap-2.5 rounded-[6px] bg-white dark:bg-[#2a1a28] px-3.5 py-2.5 shadow-[0_2px_8px_rgba(47,28,44,0.08)] hover:shadow-[0_4px_16px_rgba(47,28,44,0.14)] transition-shadow duration-300"
          >
            <Starburst className="w-5 h-5 sm:w-6 sm:h-6 text-brand-accent-on-light dark:text-brand-accent" />
            {/* Real outcome (Nexilink, src/data/case-studies.ts) — not a slogan */}
            <span className="text-[0.8125rem] sm:text-[0.875rem] font-medium text-text-primary dark:text-brand-cream">
              Client placed 1st &mdash; 2024
            </span>
            <span className="text-[0.625rem] sm:text-[0.6875rem] font-semibold bg-brand-dark text-brand-cream dark:bg-brand-cream dark:text-brand-dark px-2 py-0.5 rounded">
              See work
            </span>
          </Link>
        </div>
      </div>

      {/* ── Mobile menu overlay ── */}
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
    </section>
  );
}
