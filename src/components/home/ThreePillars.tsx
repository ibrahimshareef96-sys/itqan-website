'use client';

import { motion } from 'framer-motion';
import { Medal, TrendUp, Handshake } from '@phosphor-icons/react';
import { FadeUp } from '@/components/ui/FadeUp';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { EASE_SMOOTH } from '@/lib/motion';

/**
 * The spine of the decision-maker narrative. Senior buyers weigh a rebrand on
 * three criteria; each pillar answers one. Kept honest — the Honesty pillar
 * repeats the guarantee's boundary (we build it, we don't promise revenue).
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
      className="relative py-28 md:py-40 overflow-hidden"
      aria-labelledby="pillars-heading"
    >
      {/* Subtle accent ambient — mauve haze, right side */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 85% 25%, rgba(204,164,194,0.07), transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-8">
        {/* Eyebrow */}
        <FadeUp>
          <p
            className="font-sans font-medium text-[0.75rem] uppercase text-brand-accent"
            style={{ letterSpacing: '0.22em' }}
          >
            How the decision gets made
          </p>
        </FadeUp>

        {/* Heading */}
        <FadeUp delay={0.06}>
          <h2
            id="pillars-heading"
            className="mt-6 font-sans font-semibold text-brand-cream leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', maxWidth: '20ch' }}
          >
            Three questions before you{' '}
            <span className="accent-italic">commit</span>.
          </h2>
        </FadeUp>

        {/* Lead */}
        <FadeUp delay={0.12}>
          <p
            className="mt-8 text-brand-cream/70 leading-[1.55]"
            style={{
              fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)',
              maxWidth: '62ch',
            }}
          >
            A rebrand compounds enterprise value or quietly erodes it. Owners weigh it
            on three things before they sign. {' '}
            <span className="text-brand-cream font-medium">So do we.</span>
          </p>
        </FadeUp>

        {/* Pillars */}
        <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-cream/[0.08] rounded-[14px] overflow-hidden">
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
            className="mt-14 md:mt-16 text-brand-cream/70 leading-[1.55]"
            style={{ fontSize: 'clamp(1rem, 1.2vw, 1.125rem)', maxWidth: '64ch' }}
          >
            One team ships all of it &mdash;{' '}
            <span className="text-brand-cream font-medium">
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
    <motion.article
      className="relative h-full bg-brand-dark/40 p-8 md:p-10 lg:p-12 flex flex-col group"
      whileHover={{ backgroundColor: 'rgba(47, 28, 44, 0.65)' }}
      transition={{ duration: 0.3, ease: EASE_SMOOTH }}
    >
      {/* Icon + phase number */}
      <div className="flex items-center justify-between mb-10">
        <span className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-brand-accent/[0.1] border border-brand-accent/25 text-brand-accent">
          <Icon size={20} weight="regular" />
        </span>
        <span
          className="font-sans font-medium text-brand-accent/40 tabular-nums"
          style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', lineHeight: 1 }}
        >
          {pillar.number}
        </span>
      </div>

      {/* Pillar name */}
      <h3
        className="font-sans font-semibold text-brand-cream leading-[1.05] tracking-[-0.01em]"
        style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2rem)' }}
      >
        {pillar.name}
      </h3>

      {/* Accent line — italic Playfair */}
      <p
        className="mt-3 text-brand-accent/85"
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
        className="mt-6 text-brand-cream/70 leading-[1.6]"
        style={{ fontSize: '0.9375rem', maxWidth: '38ch' }}
      >
        {pillar.body}
      </p>

      {/* Accent underline on hover */}
      <div className="mt-8 h-px bg-gradient-to-r from-brand-accent/60 via-brand-accent/20 to-transparent origin-left scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-500 ease-out" />
    </motion.article>
  );
}
