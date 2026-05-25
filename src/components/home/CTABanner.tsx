'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { SPRING_SNAPPY } from '@/lib/motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, amount: 0.3 } as const,
  transition: { duration: 0.8, ease: EASE, delay },
});

export function CTABanner() {
  return (
    <section className="py-32 md:py-40" aria-labelledby="cta-banner">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8">
        <motion.h2
          id="cta-banner"
          className="font-sans font-semibold text-brand-cream leading-[1.05] tracking-[-0.02em]"
          style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 5rem)',
            maxWidth: 'min(100%, 18ch)',
          }}
          {...fadeUp(0)}
        >
          From{' '}
          <span className="text-brand-cream/45">invisible</span>{' '}
          to{' '}
          <span className="accent-italic">inevitable</span>{' '}
          in 90 days.
        </motion.h2>

        <motion.p
          className="mt-7 font-sans font-normal text-brand-cream/65 leading-[1.55]"
          style={{
            fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)',
            maxWidth: 'min(100%, 52ch)',
          }}
          {...fadeUp(0.1)}
        >
          Two ways to start. Pick the one that fits where you are.
        </motion.p>

        <motion.div {...fadeUp(0.2)}>
          <div className="mt-10 flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
            {/* Primary CTA */}
            <MagneticButton strength={0.15}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING_SNAPPY}
              >
                <Link
                  href="/contact"
                  className="btn-gloss inline-flex items-center justify-center h-[56px] px-8 rounded-[10px] bg-brand-cream text-brand-dark font-semibold text-base hover:bg-brand-cream/90 transition-colors duration-200"
                >
                  Book a discovery call
                </Link>
              </motion.div>
            </MagneticButton>

            {/* Secondary CTA — $497 audit */}
            <MagneticButton strength={0.12}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING_SNAPPY}
              >
                <Link
                  href="/contact?intent=audit"
                  className="inline-flex items-center justify-center gap-2 h-[56px] px-7 rounded-[10px] border border-brand-cream/30 bg-brand-cream/[0.04] text-brand-cream font-semibold text-[0.9375rem] hover:border-brand-cream/55 hover:bg-brand-cream/[0.08] transition-colors duration-200"
                >
                  <span className="text-brand-accent">$497</span>
                  <span>Brand Audit</span>
                  <ArrowRight size={14} weight="bold" className="opacity-70" />
                </Link>
              </motion.div>
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
