'use client';

import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { FadeUp } from '@/components/ui/FadeUp';
import { SplitText } from '@/components/ui/SplitText';
import { TextReveal } from '@/components/ui/TextReveal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { SPRING_SNAPPY } from '@/lib/motion';

export function AboutHero() {
  return (
    <section className="relative min-h-[72vh] md:min-h-[80vh] flex items-center overflow-hidden">
      {/* Subtle radial gradient accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_60%,rgba(204,164,194,0.12),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_20%,rgba(209,194,165,0.06),transparent)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-28 pb-20">
        <FadeUp delay={0.15}>
          <p
            className="text-[0.6875rem] font-bold tracking-[0.22em] text-brand-accent uppercase mb-6"
          >
            About Itqan Studio
          </p>
        </FadeUp>

        {/* Identity statement — the new About hero */}
        <h1
          className="font-sans font-semibold text-brand-cream leading-[1.02] tracking-[-0.02em] max-w-[22ch]"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5.25rem)' }}
        >
          <SplitText text="Engineer. Designer. Storyteller." stagger={0.05} delay={0.2} />
          <span className="accent-italic block mt-2">All in one.</span>
        </h1>

        <TextReveal direction="up" delay={0.55}>
          <p
            className="mt-9 text-brand-cream/75 leading-[1.6]"
            style={{ fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)', maxWidth: '56ch' }}
          >
            Ibrahim Shareef. Solo founder of Itqan Studio. The rare person who can{' '}
            <span className="text-brand-cream">build the brand</span>,{' '}
            <span className="text-brand-cream">code the system</span>, and{' '}
            <span className="text-brand-cream">tell the story</span> &mdash; without
            handing it off three times.
          </p>
        </TextReveal>

        <FadeUp delay={0.7}>
          <div className="mt-10">
            <MagneticButton strength={0.15}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING_SNAPPY}
              >
                <Link
                  href="/contact"
                  className="btn-gloss inline-flex items-center gap-2 bg-brand-cream text-brand-dark px-6 py-3 rounded-[10px] text-sm font-semibold hover:bg-brand-cream/90 transition-colors duration-200"
                >
                  Book a discovery call
                  <ArrowRight size={14} weight="bold" />
                </Link>
              </motion.div>
            </MagneticButton>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
