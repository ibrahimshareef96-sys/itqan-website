'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
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
 * Line 2 — "We revive companies."
 * "revive" is the gradient-accent word (the soul of the new positioning).
 * Mirrors the original line-2 stagger pattern but with new copy.
 */
function HeroLine2() {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-72px 0px' as `${number}px` });

  const leading = ['We'];
  const trailing = ['companies'];

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
          style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
        >
          revive
        </span>
      </motion.span>
      {' '}
      {trailing.map((word) => (
        <motion.span
          key={word}
          variants={staggerChildVariants}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {word}
        </motion.span>
      ))}
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
        <div className="max-w-[920px]">
          {/* Line 1: "We don't redesign brands." */}
          <h1
            className="font-sans font-semibold text-brand-cream leading-[0.95] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(3rem, 7vw, 5.75rem)' }}
          >
            <SplitText text="We don't redesign brands." stagger={0.04} delay={0.3} />
          </h1>

          {/* Line 2: "We revive companies." */}
          <HeroLine2 />

          {/* Sub-headline — the substance */}
          <TextReveal direction="up" delay={0.85}>
            <p
              className="mt-8 text-brand-cream/80 leading-[1.55] max-w-[58ch]"
              style={{ fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)' }}
            >
              Itqan is the founder studio that takes ambitious companies from{' '}
              <span className="text-brand-cream font-medium">invisible to inevitable</span> in 90 days &mdash;
              with a brand, a system, and an agentic automation engine you can run from Telegram.{' '}
              <span className="text-brand-cream font-medium">Guaranteed.</span>
            </p>
          </TextReveal>

          {/* Proof line — numbers above the fold */}
          <TextReveal direction="up" delay={0.95}>
            <p
              className="mt-6 font-sans font-medium text-brand-cream/55 tracking-[0.01em]"
              style={{ fontSize: 'clamp(0.875rem, 1vw, 1rem)' }}
            >
              4 engagements · average delivery{' '}
              <span className="text-brand-cream/85">2-4 weeks</span> · industry average{' '}
              <span className="text-brand-cream/40 line-through decoration-from-font">8-16 weeks</span>
            </p>
          </TextReveal>

          {/* CTAs — primary (discovery) + secondary ($497 audit) */}
          <FadeUp delay={1.1}>
            <div className="mt-10 flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
              {/* Primary CTA — discovery call */}
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

              {/* Secondary CTA — $497 brand audit (low-intent wedge) */}
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
                    <ArrowRight
                      size={14}
                      weight="bold"
                      className="opacity-70"
                    />
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
