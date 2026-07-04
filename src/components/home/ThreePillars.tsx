'use client';

import { Medal, TrendUp, Handshake } from '@phosphor-icons/react';
import { FadeUp } from '@/components/ui/FadeUp';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

/**
 * The spine of the decision-maker narrative. Senior buyers weigh a rebrand on
 * three criteria; each pillar answers one. Kept honest — the Honesty pillar
 * repeats the guarantee's boundary (we build it, we don't promise revenue).
 * Light-first, dark-aware (badge 3).
 */
interface Pillar {
  Icon: typeof Medal;
  number: string;
  name: string;
  accent: string;
  body: string;
}

const pillars: Pillar[] = [
  {
    Icon: Medal,
    number: '01',
    name: 'Reputation',
    accent: 'Your most valuable asset is also the most fragile.',
    body: 'A brand compounds trust over years and can leak it in a week. We treat it like the balance-sheet item it is — every decision measured against what it protects, not how it looks in a deck.',
  },
  {
    Icon: TrendUp,
    number: '02',
    name: 'Commercial impact',
    accent: 'Brand is a lever on enterprise value.',
    body: 'Valuation, deal-flow, pricing power, investor confidence, the talent you can hire. We build for the number.',
  },
  {
    Icon: Handshake,
    number: '03',
    name: 'Honesty',
    accent: 'You see it before you commit.',
    body: 'The work is phase-gated, so nothing is a leap of faith. We guarantee what we build. We never promise revenue, leads, or PR we do not control — and we say so out loud.',
  },
];

export function ThreePillars() {
  return (
    <section
      className="relative bg-brand-cream dark:bg-[#1f1420] py-24 md:py-36 overflow-hidden"
      aria-labelledby="pillars-heading"
    >
      {/* Subtle accent ambient — mauve haze, right side (low on light, richer on dark) */}
      <div
        className="absolute inset-0 pointer-events-none dark:hidden"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 85% 25%, rgba(109,74,102,0.05), transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none hidden dark:block"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 85% 25%, rgba(204,164,194,0.08), transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-8">
        {/* Numbered badge row */}
        <FadeUp>
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand-dark text-brand-cream dark:bg-brand-cream dark:text-brand-dark text-[0.6875rem] sm:text-[0.75rem] font-semibold">
              3
            </span>
            <span className="text-[0.75rem] sm:text-[0.8125rem] font-medium text-text-primary dark:text-brand-cream border border-black/[0.12] dark:border-brand-cream/[0.18] rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
              How the decision gets made
            </span>
          </div>
        </FadeUp>

        {/* Heading */}
        <FadeUp delay={0.06}>
          <h2
            id="pillars-heading"
            className="font-sans font-semibold text-text-primary dark:text-brand-cream leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', maxWidth: '20ch' }}
          >
            Three questions before you{' '}
            <span className="accent-italic">commit</span>.
          </h2>
        </FadeUp>

        {/* Lead */}
        <FadeUp delay={0.12}>
          <p
            className="mt-8 text-text-secondary dark:text-brand-cream/70 leading-[1.55]"
            style={{
              fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)',
              maxWidth: '62ch',
            }}
          >
            A rebrand compounds enterprise value or quietly erodes it. Owners weigh it
            on three things before they sign. {' '}
            <span className="text-text-primary dark:text-brand-cream font-medium">So do we.</span>
          </p>
        </FadeUp>

        {/* Pillars */}
        <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-black/[0.08] dark:bg-brand-cream/[0.08] rounded-[14px] overflow-hidden">
          {pillars.map((pillar, i) => (
            <ScrollReveal
              key={pillar.number}
              direction="up"
              distance={28}
              delay={i * 0.1}
            >
              <PillarCard pillar={pillar} />
            </ScrollReveal>
          ))}
        </div>

        {/* Capability line — social/content marketing named as a first-class, full-loop
            capability (kept off the enterprise-value pillar so that stays at altitude). */}
        <FadeUp delay={0.1}>
          <p
            className="mt-14 md:mt-16 text-text-secondary dark:text-brand-cream/70 leading-[1.55]"
            style={{ fontSize: 'clamp(1rem, 1.2vw, 1.125rem)', maxWidth: '64ch' }}
          >
            One team ships all of it &mdash;{' '}
            <span className="text-text-primary dark:text-brand-cream font-medium">
              brand, product, web, and the social and content marketing
            </span>{' '}
            that keeps you in the market after launch.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

function PillarCard({ pillar }: { pillar: Pillar }) {
  const { Icon } = pillar;
  return (
    <article
      className="relative h-full bg-white dark:bg-[#2a1a28] hover:bg-[#f5efe6] dark:hover:bg-[#341f31] p-8 md:p-10 lg:p-12 flex flex-col group transition-colors duration-300"
    >
      {/* Icon + phase number */}
      <div className="flex items-center justify-between mb-10">
        <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-brand-accent-on-light/[0.1] border border-brand-accent-on-light/25 text-brand-accent-on-light dark:bg-brand-accent/[0.1] dark:border-brand-accent/25 dark:text-brand-accent">
          <Icon size={20} weight="regular" />
        </span>
        <span
          className="font-sans font-medium text-brand-accent-on-light/40 dark:text-brand-accent/40 tabular-nums"
          style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', lineHeight: 1 }}
        >
          {pillar.number}
        </span>
      </div>

      {/* Pillar name */}
      <h3
        className="font-sans font-semibold text-text-primary dark:text-brand-cream leading-[1.05] tracking-[-0.01em]"
        style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2rem)' }}
      >
        {pillar.name}
      </h3>

      {/* Accent line — italic Playfair */}
      <p
        className="mt-3 text-brand-accent-on-light dark:text-brand-accent/85"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(1.0625rem, 1.2vw, 1.1875rem)',
          maxWidth: '30ch',
        }}
      >
        {pillar.accent}
      </p>

      {/* Spacer for rhythm */}
      <div className="flex-1 min-h-[20px]" />

      {/* Body */}
      <p
        className="mt-6 text-text-secondary dark:text-brand-cream/70 leading-[1.6]"
        style={{ fontSize: '0.9375rem', maxWidth: '38ch' }}
      >
        {pillar.body}
      </p>

      {/* Accent underline on hover */}
      <div className="mt-8 h-px bg-gradient-to-r from-brand-accent-on-light/60 via-brand-accent-on-light/20 to-transparent dark:from-brand-accent/60 dark:via-brand-accent/20 origin-left scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-500 ease-out" />
    </article>
  );
}
