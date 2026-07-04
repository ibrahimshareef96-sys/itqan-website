'use client';

import { ArrowRight } from '@phosphor-icons/react';
import { FadeUp } from '@/components/ui/FadeUp';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

/**
 * The most important section for a CEO. Names the real failure modes of a
 * rebrand and how Itqan removes each. De-risking, not decorating — this is the
 * proof that we understand why the decision is dangerous in the first place.
 * Light-first, dark-aware (badge 4).
 */
interface FailureMode {
  number: string;
  name: string;
  failure: string;
  fix: string;
}

const modes: FailureMode[] = [
  {
    number: '01',
    name: 'No strategy',
    failure:
      'A new logo bolted onto the same unanswered questions. It looks different and changes nothing.',
    fix: 'We start with the commercial thesis — who you are for, why you win, what the brand has to move — then design to it.',
  },
  {
    number: '02',
    name: 'Design by committee',
    failure:
      'Ten stakeholders, ten opinions, averaged down to something no one hates and no one remembers.',
    fix: 'One accountable team, one decision-maker. We run the room, but the direction stays sharp.',
  },
  {
    number: '03',
    name: 'Ego over evidence',
    failure:
      'The loudest taste in the building wins, and the market never gets a vote.',
    fix: 'We test the direction with your actual buyers before anything ships. Evidence settles the argument.',
  },
  {
    number: '04',
    name: 'No execution muscle',
    failure:
      'A beautiful strategy deck handed to a team that cannot build it. It dies in the gap between design and code.',
    fix: 'We design and engineer in-house. What we draw is what ships — brand, product and site from one team.',
  },
  {
    number: '05',
    name: 'Cultural blind spots',
    failure:
      'Global gloss that misreads the room — tone-deaf in Arabic, off-key in the Gulf.',
    fix: 'Regional fluency built in. Arabic and English, Khaleeji taste, a market moving on Vision 2030.',
  },
];

export function WhyRebrandsFail() {
  return (
    <section
      className="relative bg-white dark:bg-[#241626] py-24 md:py-36 overflow-hidden"
      aria-labelledby="fail-heading"
    >
      {/* Soft accent ambient — bottom-left (low on light, richer on dark) */}
      <div
        className="absolute inset-0 pointer-events-none dark:hidden"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 12% 75%, rgba(109,74,102,0.04), transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none hidden dark:block"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 12% 75%, rgba(204,164,194,0.07), transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-8">
        {/* Numbered badge row */}
        <FadeUp>
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand-dark text-brand-cream dark:bg-brand-cream dark:text-brand-dark text-[0.6875rem] sm:text-[0.75rem] font-semibold">
              4
            </span>
            <span className="text-[0.75rem] sm:text-[0.8125rem] font-medium text-text-primary dark:text-brand-cream border border-black/[0.12] dark:border-brand-cream/[0.18] rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
              The real risk
            </span>
          </div>
        </FadeUp>

        {/* Heading */}
        <FadeUp delay={0.06}>
          <h2
            id="fail-heading"
            className="font-sans font-semibold text-text-primary dark:text-brand-cream leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', maxWidth: '18ch' }}
          >
            Most rebrands fail. Here&apos;s{' '}
            <span className="accent-italic">where</span>.
          </h2>
        </FadeUp>

        {/* Lead */}
        <FadeUp delay={0.12}>
          <p
            className="mt-8 text-text-secondary dark:text-brand-cream/70 leading-[1.55]"
            style={{ fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)', maxWidth: '60ch' }}
          >
            The most expensive decision a company makes fails in five predictable
            places. {' '}
            <span className="text-text-primary dark:text-brand-cream font-medium">We engineer each one out.</span>
          </p>
        </FadeUp>

        {/* Failure-mode list */}
        <div className="mt-16 md:mt-20 border-t border-black/[0.1] dark:border-brand-cream/[0.1]">
          {modes.map((mode, i) => (
            <ScrollReveal key={mode.number} direction="up" distance={20} delay={i * 0.05}>
              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-6 md:gap-12 py-8 md:py-10 border-b border-black/[0.1] dark:border-brand-cream/[0.1]">
                {/* Left — the failure */}
                <div className="flex gap-5">
                  <span
                    className="font-sans font-medium text-brand-accent-on-light/40 dark:text-brand-accent/40 tabular-nums leading-none flex-shrink-0"
                    style={{ fontSize: 'clamp(1.5rem, 2vw, 2rem)' }}
                  >
                    {mode.number}
                  </span>
                  <div>
                    <h3 className="font-sans font-semibold text-text-primary dark:text-brand-cream text-[1.1875rem] md:text-[1.375rem] leading-[1.2]">
                      {mode.name}
                    </h3>
                    <p className="mt-2.5 text-text-secondary dark:text-brand-cream/55 text-[0.9375rem] md:text-[1rem] leading-[1.55] max-w-[42ch]">
                      {mode.failure}
                    </p>
                  </div>
                </div>

                {/* Right — how Itqan removes it */}
                <div className="md:pl-8 md:border-l border-black/[0.08] dark:border-brand-cream/[0.08]">
                  <div className="flex items-center gap-2 mb-2.5">
                    <ArrowRight size={13} weight="bold" className="text-brand-accent-on-light dark:text-brand-accent" aria-hidden="true" />
                    <span className="text-[0.6875rem] font-bold tracking-[0.18em] uppercase text-brand-accent-on-light dark:text-brand-accent">
                      How we remove it
                    </span>
                  </div>
                  <p className="text-text-primary dark:text-brand-cream/85 text-[0.9375rem] md:text-[1.0625rem] leading-[1.6] max-w-[46ch]">
                    {mode.fix}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
