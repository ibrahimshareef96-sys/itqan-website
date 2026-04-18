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

/** Line 2 as a single stagger parent so "pixel" animates in sequence with "Built into every" */
function HeroLine2() {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-72px 0px' as `${number}px` });

  const words = ['Built', 'into', 'every'];

  return (
    <motion.p
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainerVariants({ stagger: 0.04, delay: 0.6 })}
      className="font-sans font-semibold text-brand-cream leading-[0.95] tracking-[-0.02em] mt-2"
      style={{ fontSize: 'clamp(3.5rem, 8vw, 6.5rem)' }}
    >
      {words.map((word) => (
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
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          pixel
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
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(19, 10, 20, 0.55) 0%, rgba(19, 10, 20, 0.75) 100%)',
        }}
      />

      {/* Content — left-aligned */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-8 w-full pt-[72px] md:pt-[120px] pb-16">
        <div className="max-w-[900px]">
          {/* Line 1: "Precision." — Manrope 600, hero-headline scale */}
          <h1 className="font-sans font-semibold text-brand-cream leading-[0.95] tracking-[-0.02em]" style={{ fontSize: 'clamp(3.5rem, 8vw, 6.5rem)' }}>
            <SplitText text="Precision." stagger={0.04} delay={0.3} />
          </h1>
          {/* Line 2: "Built into every pixel." — all words in one stagger parent */}
          <HeroLine2 />

          {/* Lead paragraph — directly under headline */}
          <TextReveal direction="up" delay={0.85}>
            <p
              className="mt-8 text-brand-cream/75 leading-[1.55] max-w-[52ch]"
              style={{ fontSize: 'clamp(1.125rem, 1.5vw, 1.375rem)' }}
            >
              We build brand identities, digital products, and internal systems for ambitious companies across the GCC and beyond.
            </p>
          </TextReveal>

          {/* CTAs */}
          <FadeUp delay={1.1}>
            <div className="mt-10 flex flex-col sm:flex-row items-start gap-5">
              {/* Primary CTA — solid cream fill, dark text, 10px radius, 56px height */}
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

              {/* Secondary text-link — "See the work →" with arrow slide */}
              <Link
                href="/work"
                className="group inline-flex items-center gap-1.5 h-[56px] text-brand-cream/75 hover:text-brand-cream font-medium text-[0.9375rem] transition-colors duration-200"
              >
                See the work
                <ArrowRight
                  size={15}
                  weight="bold"
                  className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                />
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
