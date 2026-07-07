'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { FadeUp } from '@/components/ui/FadeUp';
import { SplitText } from '@/components/ui/SplitText';
import { TextReveal } from '@/components/ui/TextReveal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import {
  SPRING_SNAPPY,
  staggerContainerVariants,
  staggerChildVariants,
} from '@/lib/motion';

/**
 * Line 2 — "Make it with people who've done it before."
 * "before" is the single Playfair-italic mauve accent word (gradient) — the
 * certainty/safety half of the stakes+certainty hero (experience = risk removed,
 * matching the won.agency "someone who's done it a hundred times" benchmark).
 * No trailing words after the accent, so the period follows it.
 */
function HeroLine2() {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-72px 0px' as `${number}px` });

  const leading = ['Make', 'it', 'with', 'people', "who've", 'done', 'it'];

  return (
    <motion.p
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainerVariants({ stagger: 0.04, delay: 0.6 })}
      className="font-sans font-semibold text-brand-cream leading-[0.95] tracking-[-0.02em] mt-2"
      style={{ fontSize: 'clamp(3rem, 7vw, 5.75rem)' }}
    >
      {leading.map((word) => (
        <motion.span
          key={word}
          variants={staggerChildVariants}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {word}{' '}
        </motion.span>
      ))}
      <motion.span
        variants={staggerChildVariants}
        style={{ display: 'inline-block' }}
      >
        <span
          className="pixel-gradient"
          style={{ fontFamily: "var(--font-serif), serif", fontStyle: 'italic' }}
        >
          before
        </span>
      </motion.span>
      <motion.span
        variants={staggerChildVariants}
        style={{ display: 'inline-block' }}
      >
        .
      </motion.span>
    </motion.p>
  );
}

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Respect prefers-reduced-motion: pause video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      video.pause();
    }
  }, []);

  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden" aria-label="Introduction">
      {/* Background video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero/hero-main.png"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full hero-video"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay — between video and content for text readability */}
      <div
        className="hero-overlay absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Content — left-aligned */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-8 w-full pt-[72px] md:pt-[120px] pb-16">
        <div className="max-w-[980px]">
          {/* Line 1 — the stakes */}
          <h1
            className="font-sans font-semibold text-brand-cream leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(3rem, 7vw, 5.75rem)' }}
          >
            <SplitText text="The rebrand is the most dangerous decision you'll make." stagger={0.035} delay={0.3} />
          </h1>

          {/* Line 2 — the certainty */}
          <HeroLine2 />

          {/* Sub-headline — pedigree + one honest commercial proof (Nexilink, real) */}
          <TextReveal direction="up" delay={0.85}>
            <p
              className="mt-8 text-brand-cream/80 leading-[1.55] max-w-[60ch]"
              style={{ fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)' }}
            >
              Twenty years of craft across six countries. We take on the{' '}
              <span className="text-brand-cream font-medium">one asset a company can&apos;t afford to break</span>.{' '}
              A brand we built placed first at a 2024 investor competition.
            </p>
          </TextReveal>

          {/* Proof line — Nexilink (brand+product, 3 weeks) + Itqan CRM (5 tools, 8h->15min), both real */}
          <TextReveal direction="up" delay={0.95}>
            <p
              className="mt-6 font-sans font-medium text-brand-cream/55 tracking-[0.01em]"
              style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)' }}
            >
              Brand + product in{' '}
              <span className="text-brand-cream/85">3 weeks</span> &middot; 5 tools replaced,{' '}
              <span className="text-brand-cream/85">8h &rarr; 15 min</span> &middot; phase-gated,{' '}
              <span className="text-brand-cream/85">you approve every stage</span>
            </p>
          </TextReveal>

          {/* CTA — single, senior, no funnel */}
          <FadeUp delay={1.1}>
            <div className="mt-10 flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
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
                    Start a conversation
                  </Link>
                </motion.div>
              </MagneticButton>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
