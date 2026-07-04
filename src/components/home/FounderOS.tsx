'use client';

import { FadeUp } from '@/components/ui/FadeUp';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

/**
 * "How we work" — the Identity / System / Automation method, reframed off the old
 * rigid "90-Day Founder Operating System" (no day-gates, no Telegram specifics):
 * it now reads as an ongoing way of working, not a fixed sprint. Rendered on
 * /services. Light-first, dark-aware.
 */
interface Pillar {
  number: string;
  name: string;
  metaphor: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    number: '01',
    name: 'Identity',
    metaphor: 'the soul',
    description:
      'Brand strategy, a visual identity system, content positioning, and a calendar ready to ship from.',
  },
  {
    number: '02',
    name: 'System',
    metaphor: 'the skeleton',
    description:
      'Social-media marketing and a content engine built to ship 4+ pieces a week, on a tooling stack with documented workflows.',
  },
  {
    number: '03',
    name: 'Automation',
    metaphor: 'the heartbeat',
    description:
      'Agentic automation that runs the operation — lead capture, distribution, and KPI digests, with a human in control.',
  },
];

export function FounderOS() {
  return (
    <section
      className="relative bg-brand-cream dark:bg-[#1f1420] py-20 md:py-28 overflow-hidden"
      aria-labelledby="method-heading"
    >
      {/* Subtle accent ambient — mode-tuned */}
      <div
        className="absolute inset-0 pointer-events-none dark:hidden"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 15% 30%, rgba(109,74,102,0.05), transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none hidden dark:block"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 15% 30%, rgba(204,164,194,0.07), transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Numbered badge — the method */}
        <FadeUp>
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand-dark text-brand-cream dark:bg-brand-cream dark:text-brand-dark text-[0.6875rem] sm:text-[0.75rem] font-semibold">
              4
            </span>
            <span className="text-[0.75rem] sm:text-[0.8125rem] font-medium text-text-primary dark:text-brand-cream border border-black/[0.12] dark:border-brand-cream/[0.18] rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
              The method
            </span>
          </div>
        </FadeUp>

        {/* Section heading */}
        <FadeUp delay={0.06}>
          <h2
            id="method-heading"
            className="mt-7 sm:mt-8 font-sans font-semibold text-text-primary dark:text-brand-cream leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)', maxWidth: '20ch' }}
          >
            Identity, system, and the{' '}
            <span className="accent-italic">automation</span> that runs it.
          </h2>
        </FadeUp>

        {/* Lead */}
        <FadeUp delay={0.12}>
          <p
            className="mt-7 text-text-secondary dark:text-brand-cream/70 leading-[1.55]"
            style={{ fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)', maxWidth: '62ch' }}
          >
            Every living business has three things: a{' '}
            <span className="text-text-primary dark:text-brand-cream">soul</span>, a{' '}
            <span className="text-text-primary dark:text-brand-cream">skeleton</span>, and a{' '}
            <span className="text-text-primary dark:text-brand-cream">heartbeat</span>. Most have one.
            Some have two.{' '}
            <span className="text-text-primary dark:text-brand-cream font-medium">
              We build all three &mdash; then stay to keep them running.
            </span>
          </p>
        </FadeUp>

        {/* Pillars */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-black/[0.08] dark:bg-brand-cream/[0.08] rounded-[14px] overflow-hidden">
          {pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.number} direction="up" distance={28} delay={i * 0.1}>
              <PillarCard pillar={pillar} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <article className="relative h-full bg-white dark:bg-[#2a1a28] hover:bg-[#f5efe6] dark:hover:bg-[#341f31] p-8 md:p-10 lg:p-12 flex flex-col group transition-colors duration-300">
      {/* Phase number */}
      <span
        className="font-sans font-medium text-brand-accent-on-light/40 dark:text-brand-accent/40 tabular-nums mb-10"
        style={{ fontSize: 'clamp(2.25rem, 3.5vw, 3rem)', lineHeight: 1 }}
      >
        {pillar.number}
      </span>

      {/* Pillar name */}
      <h3
        className="font-sans font-semibold text-text-primary dark:text-brand-cream leading-[1.05] tracking-[-0.01em]"
        style={{ fontSize: 'clamp(1.75rem, 2.4vw, 2.25rem)' }}
      >
        {pillar.name}
      </h3>

      {/* Metaphor — italic Playfair, accent */}
      <p
        className="mt-2 text-brand-accent-on-light dark:text-brand-accent/85"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(1.0625rem, 1.25vw, 1.25rem)',
        }}
      >
        {pillar.metaphor}
      </p>

      <div className="flex-1 min-h-[24px]" />

      {/* Description */}
      <p
        className="text-text-secondary dark:text-brand-cream/70 leading-[1.6]"
        style={{ fontSize: '0.9375rem', maxWidth: '34ch' }}
      >
        {pillar.description}
      </p>

      {/* Accent underline on hover */}
      <div className="mt-8 h-px bg-gradient-to-r from-brand-accent-on-light/60 dark:from-brand-accent/60 via-brand-accent-on-light/20 dark:via-brand-accent/20 to-transparent origin-left scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-500 ease-out" />
    </article>
  );
}
