'use client';

import { Check, X } from '@phosphor-icons/react';
import { FadeUp } from '@/components/ui/FadeUp';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

/**
 * Who this is for — a fast qualifier. The "not for you" column is intentionally
 * muted (secondary text, softer card) so the "for you" side leads the eye.
 * Light-first, dark-aware (badge 7).
 */
const forYou = [
  'Founders, CEOs and owners who carry the final call',
  'Companies where the brand is a material asset — funded, growth-stage, or family-held',
  'GCC-based, or building for the GCC from abroad',
  "You've decided to rebrand and refuse to gamble it",
  'You want senior hands, not a junior team learning on your brand',
];

const notForYou = [
  'You need a logo and nothing behind it',
  'The decision goes to a committee with no owner',
  "You're shopping on price alone",
  'You want a vendor to take orders, not a partner who pushes back',
];

export function WhoFor() {
  return (
    <section
      className="relative bg-white dark:bg-[#241626] py-24 md:py-36"
      aria-labelledby="who-for-heading"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8">
        {/* Numbered badge row */}
        <FadeUp>
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand-dark text-brand-cream dark:bg-brand-cream dark:text-brand-dark text-[0.6875rem] sm:text-[0.75rem] font-semibold">
              7
            </span>
            <span className="text-[0.75rem] sm:text-[0.8125rem] font-medium text-text-primary dark:text-brand-cream border border-black/[0.12] dark:border-brand-cream/[0.18] rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
              Who we take on
            </span>
          </div>
        </FadeUp>

        {/* Heading */}
        <FadeUp delay={0.06}>
          <h2
            id="who-for-heading"
            className="font-sans font-semibold text-text-primary dark:text-brand-cream leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', maxWidth: '20ch' }}
          >
            We are{' '}
            <span className="accent-italic">not</span>{' '}
            for everyone.
          </h2>
        </FadeUp>

        <FadeUp delay={0.12}>
          <p
            className="mt-8 text-text-secondary dark:text-brand-cream/65 leading-[1.55]"
            style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)', maxWidth: '58ch' }}
          >
            We take on a small number of companies each quarter. These notes tell you
            fast whether we&apos;re the team for this decision.
          </p>
        </FadeUp>

        {/* Two columns */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* This IS for you */}
          <ScrollReveal direction="up" distance={24}>
            <div className="h-full rounded-[14px] border border-black/[0.08] dark:border-brand-cream/[0.08] bg-[#f5efe6] dark:bg-[#2a1a28] p-7 md:p-9">
              <div className="flex items-center gap-2.5 mb-7">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-accent-on-light/15 text-brand-accent-on-light dark:bg-brand-accent/15 dark:text-brand-accent">
                  <Check size={14} weight="bold" />
                </span>
                <h3 className="font-sans font-semibold text-text-primary dark:text-brand-cream text-[0.9375rem] tracking-[0.02em] uppercase">
                  This is for you if
                </h3>
              </div>
              <ul role="list" className="space-y-4">
                {forYou.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-text-primary dark:text-brand-cream/85 text-[0.9375rem] md:text-[1rem] leading-[1.55]"
                  >
                    <span
                      className="mt-[0.45em] inline-block w-1.5 h-1.5 rounded-full bg-brand-accent-on-light/70 dark:bg-brand-accent/70 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* This is NOT for you */}
          <ScrollReveal direction="up" distance={24} delay={0.08}>
            <div className="h-full rounded-[14px] border border-black/[0.06] dark:border-brand-cream/[0.06] bg-[#f5efe6]/50 dark:bg-[#241626] p-7 md:p-9">
              <div className="flex items-center gap-2.5 mb-7">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-black/[0.06] text-text-secondary/70 dark:bg-brand-cream/[0.08] dark:text-brand-cream/45">
                  <X size={14} weight="bold" />
                </span>
                <h3 className="font-sans font-semibold text-text-secondary dark:text-brand-cream/55 text-[0.9375rem] tracking-[0.02em] uppercase">
                  We&apos;re probably not the fit if
                </h3>
              </div>
              <ul role="list" className="space-y-4">
                {notForYou.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-text-secondary dark:text-brand-cream/50 text-[0.9375rem] md:text-[1rem] leading-[1.55]"
                  >
                    <span
                      className="mt-[0.45em] inline-block w-1.5 h-1.5 rounded-full bg-text-secondary/40 dark:bg-brand-cream/25 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
