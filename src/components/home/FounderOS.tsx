'use client';

import { motion } from 'framer-motion';
import { FadeUp } from '@/components/ui/FadeUp';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { EASE_SMOOTH } from '@/lib/motion';

interface Pillar {
  number: string;
  name: string;
  days: string;
  metaphor: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    number: '01',
    name: 'IDENTITY',
    days: 'Days 1–30',
    metaphor: 'the soul',
    description:
      'Brand strategy, visual identity system, content positioning, 30-day content calendar.',
  },
  {
    number: '02',
    name: 'SYSTEM',
    days: 'Days 31–60',
    metaphor: 'the skeleton',
    description:
      'Social-media marketing and a content engine built to ship 4+ pieces/week, on a tooling stack with three documented workflows.',
  },
  {
    number: '03',
    name: 'AUTOMATION',
    days: 'Days 61–90',
    metaphor: 'the heartbeat',
    description:
      'Agentic Telegram-runnable operating layer. Lead capture, distribution, KPI digests — all automated.',
  },
];

export function FounderOS() {
  return (
    <section
      className="relative py-28 md:py-40 overflow-hidden"
      aria-labelledby="founder-os-heading"
    >
      {/* Subtle accent ambient — mauve haze, left side */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 15% 30%, rgba(204,164,194,0.07), transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-8">
        {/* Eyebrow */}
        <FadeUp>
          <p
            className="font-sans font-medium text-[0.75rem] uppercase text-brand-accent"
            style={{ letterSpacing: '0.22em' }}
          >
            The method
          </p>
        </FadeUp>

        {/* Section heading */}
        <FadeUp delay={0.06}>
          <h2
            id="founder-os-heading"
            className="mt-6 font-sans font-semibold text-brand-cream leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', maxWidth: '20ch' }}
          >
            The 90-Day Founder{' '}
            <span className="accent-italic">Operating System</span>
          </h2>
        </FadeUp>

        {/* Lead — philosophy line */}
        <FadeUp delay={0.12}>
          <p
            className="mt-8 text-brand-cream/70 leading-[1.55]"
            style={{
              fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)',
              maxWidth: '62ch',
            }}
          >
            Strategy that can&apos;t be run is decoration. Our method turns the rebrand into
            something that operates. Every alive business has a{' '}
            <span className="text-brand-cream">soul</span>, a{' '}
            <span className="text-brand-cream">skeleton</span>, and a{' '}
            <span className="text-brand-cream">heartbeat</span>. Most have one.
            Some have two.{' '}
            <span className="text-brand-cream font-medium">We build all three.</span>
          </p>
        </FadeUp>

        {/* Pillars — 3 columns desktop, stacked mobile */}
        <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-px bg-brand-cream/[0.08] rounded-[14px] overflow-hidden">
          {pillars.map((pillar, i) => (
            <ScrollReveal
              key={pillar.number}
              direction="up"
              distance={28}
              delay={i * 0.1}
            >
              <PillarCard pillar={pillar} index={i} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

interface PillarCardProps {
  pillar: Pillar;
  index: number;
}

function PillarCard({ pillar, index }: PillarCardProps) {
  return (
    <motion.article
      className="relative h-full bg-brand-dark/40 p-8 md:p-10 lg:p-12 flex flex-col group"
      whileHover={{ backgroundColor: 'rgba(47, 28, 44, 0.65)' }}
      transition={{ duration: 0.3, ease: EASE_SMOOTH }}
    >
      {/* Phase number — large editorial */}
      <div className="flex items-baseline justify-between mb-10">
        <span
          className="font-sans font-medium text-brand-accent/40 tabular-nums"
          style={{ fontSize: 'clamp(2.25rem, 3.5vw, 3rem)', lineHeight: 1 }}
        >
          {pillar.number}
        </span>
        <span className="text-[0.625rem] font-bold tracking-[0.22em] uppercase text-brand-cream/40">
          {pillar.days}
        </span>
      </div>

      {/* Pillar name */}
      <h3
        className="font-sans font-semibold text-brand-cream leading-[1.05] tracking-[-0.01em]"
        style={{ fontSize: 'clamp(1.75rem, 2.4vw, 2.25rem)' }}
      >
        {pillar.name}
      </h3>

      {/* Metaphor — italic Playfair, accent color */}
      <p
        className="mt-2 text-brand-accent/85"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(1.0625rem, 1.25vw, 1.25rem)',
        }}
      >
        {pillar.metaphor}
      </p>

      {/* Spacer pushes description to bottom for visual rhythm */}
      <div className="flex-1 min-h-[24px]" />

      {/* Description */}
      <p
        className="text-brand-cream/70 leading-[1.6]"
        style={{ fontSize: '0.9375rem', maxWidth: '34ch' }}
      >
        {pillar.description}
      </p>

      {/* Subtle accent line — animates on hover */}
      <div
        className="mt-8 h-px bg-gradient-to-r from-brand-accent/60 via-brand-accent/20 to-transparent origin-left scale-x-100 md:scale-x-0 md:group-hover:scale-x-100 transition-transform duration-500 ease-out"
      />
    </motion.article>
  );
}
