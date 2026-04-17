'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, amount: 0.3 } as const,
  transition: { duration: 0.8, ease: EASE, delay },
});

export function CTABanner() {
  return (
    <section className="py-40" aria-labelledby="cta-banner">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8">
        <motion.h2
          id="cta-banner"
          className="font-sans font-medium text-brand-cream leading-[1.1] tracking-[-0.02em]"
          style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            maxWidth: 'min(100%, 20ch)',
          }}
          {...fadeUp(0)}
        >
          Let&rsquo;s build something that earns its place.
        </motion.h2>

        <motion.p
          className="mt-6 font-sans font-normal text-[rgba(255,251,245,0.65)] leading-[1.5]"
          style={{
            fontSize: '1.125rem',
            maxWidth: 'min(100%, 48ch)',
          }}
          {...fadeUp(0.1)}
        >
          Book a discovery call &mdash; we&rsquo;ll tell you honestly whether we&rsquo;re the right fit.
        </motion.p>

        <motion.div {...fadeUp(0.2)}>
          <Link
            href="/contact"
            className="btn-gloss inline-flex items-center justify-center h-[56px] px-8 rounded-[10px] bg-brand-cream text-brand-dark font-semibold text-base hover:bg-brand-cream/90 transition-colors duration-200 mt-10"
          >
            Book a discovery call
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
