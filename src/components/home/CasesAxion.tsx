'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from '@phosphor-icons/react';
import { FadeUp } from '@/components/ui/FadeUp';
import { RollButton } from '@/components/ui/RollButton';

const EASE = 'cubic-bezier(0.25, 0.1, 0.25, 1)';

interface CaseCard {
  href: string;
  title: string;
  /** Stakes + real outcome (src/data/case-studies.ts) — leads the caption. */
  outcome: string;
  media: { video?: string; image: string; alt: string };
  aspect: string;
  /** Expanding hover chip style. */
  chip: 'light' | 'dark';
  chipWidth: string;
}

const cards: CaseCard[] = [
  {
    href: '/work/shareefico',
    title: 'Shareefico',
    outcome: 'Brand + content engine, live in under 30 days.',
    media: {
      video: '/videos/shareefico-cover.mp4',
      image: '/images/portfolio/shareefico/cover-poster.jpg',
      alt: 'Shareefico — personal brand and custom CMS by Itqan Studio',
    },
    aspect: 'aspect-[329/246]',
    chip: 'light',
    chipWidth: 'group-hover:w-[168px]',
  },
  {
    href: '/work/mutqin',
    title: 'Mutqin',
    outcome: 'Brand, product and AI shipped as one. Live.',
    media: {
      image: '/images/portfolio/mutqin/hero-landing.webp',
      alt: 'Mutqin — AI startup companion built end to end by Itqan Studio',
    },
    aspect: 'aspect-square md:aspect-[329/246]',
    chip: 'dark',
    chipWidth: 'group-hover:w-[168px]',
  },
];

/** Expanding hover chip: circle grows into a labeled pill (Axion case-card pattern). */
function HoverChip({ chip, chipWidth }: { chip: 'light' | 'dark'; chipWidth: string }) {
  return (
    <span
      className={`absolute bottom-4 left-4 flex items-center gap-2 h-9 w-9 ${chipWidth} rounded-full overflow-hidden pl-[11px] transition-all duration-300 ease-in-out ${
        chip === 'light' ? 'bg-white text-text-primary' : 'bg-brand-dark text-brand-cream'
      }`}
      aria-hidden="true"
    >
      <ArrowRight
        size={14}
        weight="bold"
        className="flex-shrink-0 -rotate-45 group-hover:rotate-0 transition-transform duration-300"
        style={{ transitionTimingFunction: EASE }}
      />
      <span className="text-[0.8125rem] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
        View case study
      </span>
    </span>
  );
}

/**
 * Axion "Section 3" adapted: two flagship cases with expanding hover chips,
 * captions leading with stakes + real outcomes. Light-first, dark-aware.
 */
export function CasesAxion() {
  return (
    <section
      className="bg-[#f5efe6] dark:bg-[#1a0f1c] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28"
      aria-labelledby="cases-heading"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Numbered badge row */}
        <FadeUp>
          <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
            <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand-dark text-brand-cream dark:bg-brand-cream dark:text-brand-dark text-[0.6875rem] sm:text-[0.75rem] font-semibold">
              2
            </span>
            <span className="text-[0.75rem] sm:text-[0.8125rem] font-medium text-text-primary dark:text-brand-cream border border-black/[0.15] dark:border-brand-cream/[0.18] rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
              Selected work
            </span>
          </div>
        </FadeUp>

        {/* Heading */}
        <FadeUp delay={0.06}>
          <h2
            id="cases-heading"
            className="px-5 sm:px-8 lg:px-12 font-sans font-semibold text-text-primary dark:text-brand-cream leading-[1.08] tracking-[-0.03em] mb-10 sm:mb-14 lg:mb-16"
            style={{ fontSize: 'clamp(1.75rem, 6vw, 4.2rem)' }}
          >
            Proof, not{' '}
            <span
              className="text-brand-accent-on-light dark:text-brand-accent"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 500 }}
            >
              promises
            </span>
            .
          </h2>
        </FadeUp>

        {/* Cards */}
        <div className="px-5 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
          {cards.map((card, i) => (
            <FadeUp key={card.href} delay={i * 0.08}>
              <Link href={card.href} className="group block cursor-pointer">
                <div className={`relative ${card.aspect} rounded-2xl overflow-hidden bg-brand-dark/10`}>
                  {card.media.video ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={card.media.image}
                      aria-label={card.media.alt}
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src={card.media.video} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={card.media.image}
                      alt={card.media.alt}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                  <HoverChip chip={card.chip} chipWidth={card.chipWidth} />
                </div>
                <p className="mt-4 text-[0.8125rem] sm:text-[0.875rem] text-text-secondary dark:text-brand-cream/60 leading-relaxed">
                  {card.outcome}
                </p>
                <p className="mt-1 text-[0.875rem] sm:text-[0.9375rem] font-semibold text-text-primary dark:text-brand-cream">
                  {card.title}
                </p>
              </Link>
            </FadeUp>
          ))}
        </div>

        {/* All work */}
        <FadeUp delay={0.12}>
          <div className="px-5 sm:px-8 lg:px-12 mt-12 sm:mt-14">
            <RollButton href="/work" label="All work" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
