'use client';

import Image from 'next/image';
import { FadeUp } from '@/components/ui/FadeUp';
import { TextReveal } from '@/components/ui/TextReveal';

/**
 * "Our name" section — the meaning behind Itqan, paired with a premium editorial
 * still: a gilded Islamic geometric screen on plum, carrying the Arabic إتقان,
 * "Excellence", and the meaning. A self-contained dark-canvas image (reads dark
 * in both themes, like the case-media overlays). Below, an honest pedigree strip.
 * Alt surface (white / plum), theme-aware. The Islamic geometric star watermark
 * stays: mauve at low opacity on dark, deep mauve #6d4a66 at a lower opacity on light.
 */

/** Honest, verifiable numbers only — no fabricated metrics. */
const pedigree = [
  { value: '20', label: 'Years of craft' },
  { value: '6', label: 'Countries worked across' },
  { value: '6', label: 'Languages in the studio' },
  { value: '7', label: 'Case studies on /work' },
];

export function MissionStatement() {
  return (
    <section
      className="relative overflow-hidden bg-white dark:bg-[#241626] py-20 sm:py-24 lg:py-32"
      aria-labelledby="mission-heading"
    >
      {/* Islamic geometric star watermark — decorative, theme-recolored via currentColor */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[60%] pointer-events-none select-none text-[#6d4a66]/[0.06] dark:text-brand-accent/[0.10]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none">
          <defs>
            <pattern id="islamic-star" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              {/* Central 8-pointed star */}
              <polygon
                points="50,10 58.5,35 85,27 68,48 85,70 58.5,62 50,88 41.5,62 15,70 32,48 15,27 41.5,35"
                fill="currentColor"
              />
              {/* Corner quarter-stars for seamless tessellation */}
              <polygon points="0,0 8.5,25 35,17 18,38" fill="currentColor" />
              <polygon points="100,0 91.5,25 65,17 82,38" fill="currentColor" />
              <polygon points="0,100 8.5,75 35,83 18,62" fill="currentColor" />
              <polygon points="100,100 91.5,75 65,83 82,62" fill="currentColor" />
              {/* Connecting diamond shapes */}
              <polygon points="50,0 58.5,17 50,35 41.5,17" fill="currentColor" />
              <polygon points="50,65 58.5,83 50,100 41.5,83" fill="currentColor" />
              <polygon points="0,50 17,41.5 35,50 17,58.5" fill="currentColor" />
              <polygon points="65,50 83,41.5 100,50 83,58.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="400" height="600" fill="url(#islamic-star)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Numbered badge row */}
        <FadeUp>
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand-dark text-brand-cream dark:bg-brand-cream dark:text-brand-dark text-[0.6875rem] sm:text-[0.75rem] font-semibold">
              2
            </span>
            <span className="text-[0.75rem] sm:text-[0.8125rem] font-medium text-text-primary dark:text-brand-cream border border-black/[0.12] dark:border-brand-cream/[0.18] rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
              Our name
            </span>
          </div>
        </FadeUp>

        {/* Split: the meaning (left) + the mark, filmed (right) */}
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 sm:gap-12 lg:gap-16 items-center">
          <div>
            <TextReveal direction="left" delay={0}>
              <p
                id="mission-heading"
                className="font-sans font-semibold text-text-primary dark:text-brand-cream leading-[1.1] tracking-[-0.02em] max-w-[24ch]"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 3.2rem)' }}
              >
                Itqan comes from the Arabic word meaning{' '}
                <span
                  className="text-brand-accent-on-light dark:text-brand-accent"
                  style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 500 }}
                >
                  Excellence
                </span>
                .
              </p>
            </TextReveal>
            <TextReveal direction="right" delay={0.14}>
              <p
                className="mt-4 font-sans font-medium text-text-secondary dark:text-brand-cream/60 leading-[1.1] tracking-[-0.02em] max-w-[26ch]"
                style={{ fontSize: 'clamp(1.75rem, 4vw, 3.2rem)' }}
              >
                And Excellence is defined by the values that shape it.
              </p>
            </TextReveal>

            {/* AI-moment — the single scroll-stopping "buyers ask AI" line for /about */}
            <FadeUp delay={0.1}>
              <p
                className="mt-10 sm:mt-12 text-[#4a4a4a] dark:text-brand-cream/70 leading-[1.6]"
                style={{ fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)', maxWidth: '46ch' }}
              >
                Two decades of that craft, made{' '}
                <span
                  className="text-brand-accent-on-light dark:text-brand-accent"
                  style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 500 }}
                >
                  legible
                </span>{' '}
                to the machines your buyers now ask first.
              </p>
            </FadeUp>
          </div>

          {/* The brand still — a gilded girih screen on plum carrying إتقان +
              "Excellence". A dark-canvas image in BOTH themes (like the case-media
              overlays); all copy is baked in for crisp Arabic at any size. */}
          <FadeUp delay={0.16}>
            <div className="relative rounded-2xl overflow-hidden border border-black/[0.08] dark:border-brand-cream/[0.12] bg-[#241019] shadow-[0_2px_12px_rgba(47,28,44,0.06)]">
              <div className="relative aspect-video">
                <Image
                  src="/images/about/excellence.webp"
                  alt="Excellence — إتقان — a gilded Islamic geometric screen, the meaning behind the Itqan name"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Pedigree strip — honest numbers only */}
        <FadeUp delay={0.1}>
          <dl className="mt-14 sm:mt-16 lg:mt-20 pt-10 sm:pt-12 border-t border-black/[0.08] dark:border-brand-cream/[0.12] grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-10">
            {pedigree.map(({ value, label }) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd
                  className="font-sans font-bold text-brand-accent-on-light dark:text-brand-accent leading-none tracking-[-0.02em]"
                  style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)' }}
                >
                  {value}
                </dd>
                <p className="mt-3 text-[0.8125rem] sm:text-sm font-medium text-text-secondary dark:text-brand-cream/60">
                  {label}
                </p>
              </div>
            ))}
          </dl>
        </FadeUp>
      </div>
    </section>
  );
}
