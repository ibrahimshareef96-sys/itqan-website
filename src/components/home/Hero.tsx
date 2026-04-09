'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { FadeUp } from '@/components/ui/FadeUp';
import { SplitText } from '@/components/ui/SplitText';
import { TextReveal } from '@/components/ui/TextReveal';
import { Parallax } from '@/components/ui/Parallax';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { SPRING_SNAPPY } from '@/lib/motion';

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background image with parallax */}
      <Parallax speed={-0.12} className="absolute inset-0">
        <Image
          src="/images/hero/hero-main.png"
          alt="Itqan Studio brand design work"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </Parallax>

      {/* Asymmetric gradient overlay — stronger for mobile readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/78 to-brand-dark/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />

      {/* Premium inset frame */}
      <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.09)] pointer-events-none z-20" />

      {/* Content — left-aligned */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-24 pb-16">
        <div className="max-w-[820px]">
          {/* Line 1: Manrope Bold — word-by-word reveal */}
          <h1 className="font-sans font-bold text-[1.75rem] sm:text-[2.25rem] md:text-[3.25rem] lg:text-[4rem] text-brand-cream leading-tight tracking-tight">
            <SplitText text="Your brand has potential." stagger={0.04} delay={0.3} />
          </h1>
          {/* Line 2: Playfair Display Italic — word-by-word reveal, delayed */}
          <p className="font-serif italic text-[1.75rem] sm:text-[2.25rem] md:text-[3.25rem] lg:text-[4rem] text-brand-accent leading-tight tracking-tight mt-1">
            <SplitText text="We give it direction." stagger={0.04} delay={0.6} />
          </p>

          <TextReveal direction="up" delay={0.85}>
            <p className="mt-7 text-brand-cream/65 text-base md:text-lg leading-relaxed max-w-[46ch]">
              Strategic brand design and digital execution, crafted for founders who value
              detail, direction, and distinction.
            </p>
          </TextReveal>

          <FadeUp delay={1.0}>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <MagneticButton strength={0.15}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={SPRING_SNAPPY}
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2.5 bg-brand-cream text-brand-dark px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-brand-cream/90 transition-colors duration-200"
                  >
                    Book a meeting
                    <ArrowRight size={15} weight="bold" />
                  </Link>
                </motion.div>
              </MagneticButton>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING_SNAPPY}
              >
                <Link
                  href="/work"
                  className="inline-flex items-center justify-center gap-2.5 border border-brand-cream/35 text-brand-cream px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-brand-cream/10 transition-colors duration-200"
                >
                  View our work
                  <ArrowRight size={15} weight="bold" />
                </Link>
              </motion.div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
