'use client';

import { FadeUp } from '@/components/ui/FadeUp';
import { RollButton } from '@/components/ui/RollButton';

/**
 * Axion-style About hero. Light-first, dark-aware. The global sticky PillNav
 * sits above this section, so it opens with normal section padding (no fixed-nav
 * compensation). Keeps the 'Engineer. Designer. Storyteller. / All in one.'
 * identity statement and the CEO / co-founder copy verbatim.
 */
export function AboutHero() {
  return (
    <section
      className="relative overflow-hidden bg-brand-cream dark:bg-[#1f1420] pt-10 sm:pt-14 lg:pt-20 pb-16 sm:pb-20 lg:pb-28"
      aria-label="About Itqan Studio"
    >
      {/* Soft accent wash — mauve/beige radials, dialed down per theme */}
      <div
        className="absolute inset-0 pointer-events-none dark:hidden"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 82% 18%, rgba(204,164,194,0.24), transparent 60%), radial-gradient(ellipse 55% 50% at 10% 85%, rgba(209,194,165,0.20), transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none hidden dark:block"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 82% 18%, rgba(204,164,194,0.13), transparent 60%), radial-gradient(ellipse 55% 50% at 10% 85%, rgba(209,194,165,0.07), transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Numbered badge row */}
        <FadeUp>
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand-dark text-brand-cream dark:bg-brand-cream dark:text-brand-dark text-[0.6875rem] sm:text-[0.75rem] font-semibold">
              1
            </span>
            <span className="text-[0.75rem] sm:text-[0.8125rem] font-medium text-text-primary dark:text-brand-cream border border-black/[0.12] dark:border-brand-cream/[0.18] rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
              The studio
            </span>
          </div>
        </FadeUp>

        {/* Identity statement */}
        <FadeUp delay={0.06}>
          <h1
            className="font-sans font-semibold text-text-primary dark:text-brand-cream leading-[1.06] tracking-[-0.03em] max-w-[22ch]"
            style={{ fontSize: 'clamp(2.25rem, 6vw, 4.6rem)' }}
          >
            Engineer. Designer. Storyteller.{' '}
            <span
              className="text-brand-accent-on-light dark:text-brand-accent"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 500 }}
            >
              All in one.
            </span>
          </h1>
        </FadeUp>

        <FadeUp delay={0.12}>
          <p
            className="mt-8 sm:mt-9 text-[#4a4a4a] dark:text-brand-cream/70 leading-[1.6]"
            style={{ fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)', maxWidth: '56ch' }}
          >
            Ibrahim Shareef. CEO and co-founder of Itqan Studio. The rare person who can{' '}
            <span className="text-text-primary dark:text-brand-cream font-medium">build the brand</span>,{' '}
            <span className="text-text-primary dark:text-brand-cream font-medium">code the system</span>, and{' '}
            <span className="text-text-primary dark:text-brand-cream font-medium">tell the story</span> &mdash; without
            handing it off three times.
          </p>
        </FadeUp>

        <FadeUp delay={0.18}>
          <div className="mt-10">
            <RollButton href="/contact" label="Start a conversation" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
