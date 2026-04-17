'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CaretDown } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeUp } from '@/components/ui/FadeUp';
import { EASE_SMOOTH } from '@/lib/motion';

const services = [
  {
    name: 'Branding',
    outcome:
      'Positioning, naming, and identity systems built to survive a decade, not a campaign.',
    image: '/images/founder-render.png',
    cta: 'Explore Branding',
  },
  {
    name: 'UI/UX',
    outcome:
      'Interfaces grounded in research, shaped by craft, tested on the people who\u2019ll actually use them.',
    image: '/images/app-hand-v2-render.png',
    cta: 'Explore UI/UX',
  },
  {
    name: 'AI Implementation',
    outcome:
      'AI-native systems, assistants, and agents built into your product and your operations \u2014 not bolted on.',
    image: '/images/close-app-render.png',
    cta: 'Explore AI Implementation',
  },
  {
    name: 'Application Development',
    outcome:
      'Web and internal apps built to replace spreadsheets, scale with the team, and survive real use.',
    image: '/images/itqan-crm.png',
    cta: 'Explore Application Development',
  },
  {
    name: 'Content & Growth',
    outcome:
      'Copy, SEO, and social design that carry the brand\u2019s voice into every channel without diluting it.',
    image: '/images/content-creation.png',
    cta: 'Explore Content & Growth',
  },
];

function useGlassPosition(active: number, refs: React.RefObject<(HTMLButtonElement | null)[]>) {
  const [pos, setPos] = useState({ top: 0, height: 0 });
  const [ready, setReady] = useState(false);

  const measure = useCallback(() => {
    const el = refs.current?.[active];
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;
    const parentRect = parent.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setPos({
      top: elRect.top - parentRect.top,
      height: elRect.height,
    });
    setReady(true);
  }, [active, refs]);

  useEffect(() => {
    measure();
  }, [measure]);

  // Re-measure on resize
  useEffect(() => {
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [measure]);

  return { pos, ready };
}

export function Services() {
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState<number | null>(0);
  const labelRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const { pos, ready } = useGlassPosition(active, labelRefs);

  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  return (
    <section className="py-32" aria-label="Services offered">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8">

        {/* Desktop — three-column layout */}
        <FadeUp>
          <div className="hidden md:grid grid-cols-[22%_48%_22%] gap-12 items-start justify-between">
            {/* Left column — service name list with glass indicator */}
            <div className="relative flex flex-col gap-10 pt-2">
              {/* Glass container — follows active label */}
              {ready && (
                <div
                  className="absolute -left-4 z-0 pointer-events-none rounded-lg"
                  style={{
                    top: pos.top - 8,
                    height: pos.height + 16,
                    width: 'calc(100% + 2rem)',
                    background: 'rgba(255, 251, 245, 0.06)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 251, 245, 0.1)',
                    transition: prefersReduced
                      ? 'none'
                      : 'top 400ms cubic-bezier(0.22, 1, 0.36, 1), height 400ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              )}

              {services.map((s, i) => (
                <button
                  key={s.name}
                  ref={(el) => { labelRefs.current[i] = el; }}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className={`relative z-10 text-left font-sans font-medium leading-[1.2] tracking-[-0.01em] transition-opacity duration-200 ${
                    i === active
                      ? 'text-brand-cream opacity-100'
                      : 'text-brand-cream/[0.35] hover:text-brand-cream/[0.6]'
                  }`}
                  style={{ fontSize: 'clamp(1.25rem, 1.8vw, 1.625rem)' }}
                >
                  {s.name}
                </button>
              ))}
            </div>

            {/* Center column — image */}
            <div className="relative w-full max-w-[500px] mx-auto rounded-[12px] overflow-hidden" style={{ aspectRatio: '4 / 5' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE_SMOOTH }}
                  className="absolute inset-0"
                >
                  <Image
                    src={services[active].image}
                    alt={services[active].name}
                    fill
                    className="object-cover"
                    sizes="36vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right column — outcome + CTA */}
            <div className="flex flex-col justify-end pt-2 pb-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE_SMOOTH }}
                >
                  <p className="text-brand-cream/75 text-base leading-[1.6] max-w-[32ch]">
                    {services[active].outcome}
                  </p>
                  <Link
                    href="/services"
                    className="mt-8 inline-flex items-center gap-2 font-sans font-medium text-[0.875rem] text-brand-cream/60 hover:text-brand-cream border border-[rgba(255,251,245,0.08)] hover:border-[rgba(255,251,245,0.15)] rounded-[10px] px-5 h-[40px] transition-all duration-200"
                  >
                    {services[active].cta}
                    <ArrowRight size={14} weight="bold" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </FadeUp>

        {/* Mobile — vertical accordion */}
        <div className="md:hidden space-y-0">
          {services.map((s, i) => {
            const isOpen = mobileOpen === i;
            return (
              <div
                key={s.name}
                className="border-t border-[rgba(255,251,245,0.08)] last:border-b"
              >
                <button
                  onClick={() => setMobileOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left"
                >
                  <span
                    className={`font-sans font-medium leading-[1.2] tracking-[-0.01em] transition-opacity duration-200 ${
                      isOpen ? 'text-brand-cream opacity-100' : 'text-brand-cream/[0.35]'
                    }`}
                    style={{ fontSize: 'clamp(1.25rem, 4vw, 1.625rem)' }}
                  >
                    {s.name}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.28, ease: EASE_SMOOTH }}
                    className="text-brand-cream/50 flex-shrink-0 ml-4"
                  >
                    <CaretDown size={18} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE_SMOOTH }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6">
                        <div className="relative w-full rounded-[12px] overflow-hidden" style={{ aspectRatio: '4 / 5' }}>
                          <Image
                            src={s.image}
                            alt={s.name}
                            fill
                            className="object-cover"
                            sizes="100vw"
                          />
                        </div>
                        <p className="mt-4 text-brand-cream/75 text-base leading-[1.6] max-w-[32ch]">
                          {s.outcome}
                        </p>
                        <Link
                          href="/services"
                          className="mt-6 inline-flex items-center gap-2 font-sans font-medium text-[0.875rem] text-brand-cream/60 hover:text-brand-cream border border-[rgba(255,251,245,0.08)] rounded-[10px] px-5 h-[40px] transition-all duration-200"
                        >
                          {s.cta}
                          <ArrowRight size={14} weight="bold" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
