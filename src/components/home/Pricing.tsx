'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from '@phosphor-icons/react';
import { FadeUp } from '@/components/ui/FadeUp';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { SPRING_SNAPPY } from '@/lib/motion';

interface Tier {
  price: string;
  name: string;
  duration: string;
  description: string;
  featured?: boolean;
  intent: string; // contact form intent param
}

const tiers: Tier[] = [
  {
    price: '$497',
    name: 'Founder Brand Audit',
    duration: '1 hour + report',
    description:
      '1 hour + diagnostic report + 3 specific fixes. Credit toward any higher tier within 30 days.',
    intent: 'audit',
  },
  {
    price: '$5–7k',
    name: 'Founder Identity Sprint',
    duration: '14 days',
    description: 'Identity only. Brand strategy, visual system, content positioning.',
    intent: 'identity-sprint',
  },
  {
    price: '$15–25k',
    name: 'System + Automation',
    duration: '60 days',
    description:
      'For founders whose brand is already strong. We build the skeleton and the heartbeat.',
    intent: 'system-automation',
  },
  {
    price: '$25–30k',
    name: 'Founder OS Core',
    duration: '90 days · all three pillars',
    description:
      'The complete 90-Day Founder OS. Identity, System, and Automation. The flagship engagement.',
    featured: true,
    intent: 'founder-os-core',
  },
  {
    price: '$50k+',
    name: 'Founder OS Quarterly+',
    duration: '90 days + 90 days support',
    description: 'Core + 90 days of post-implementation support and optimization.',
    intent: 'founder-os-quarterly',
  },
];

export function Pricing() {
  return (
    <section
      className="relative py-28 md:py-40 overflow-hidden"
      aria-labelledby="pricing-heading"
    >
      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-8">
        {/* Eyebrow */}
        <FadeUp>
          <p
            className="font-sans font-medium text-[0.75rem] uppercase text-brand-accent"
            style={{ letterSpacing: '0.22em' }}
          >
            Pricing
          </p>
        </FadeUp>

        {/* Heading */}
        <FadeUp delay={0.06}>
          <h2
            id="pricing-heading"
            className="mt-6 font-sans font-semibold text-brand-cream leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', maxWidth: '18ch' }}
          >
            Built to fit{' '}
            <span
              className="text-brand-accent"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
            >
              where you are.
            </span>
          </h2>
        </FadeUp>

        {/* Pricing tiers — vertical list with hover detail */}
        <div className="mt-16 md:mt-20 grid gap-3 md:gap-4">
          {tiers.map((tier, i) => (
            <ScrollReveal
              key={tier.name}
              direction="up"
              distance={20}
              delay={i * 0.05}
            >
              <TierRow tier={tier} />
            </ScrollReveal>
          ))}
        </div>

        {/* Footnote — credit policy */}
        <FadeUp delay={0.4}>
          <p className="mt-10 text-brand-cream/45 text-[0.8125rem] leading-[1.5] max-w-[60ch]">
            Each engagement is capped. We take a small number of founders per quarter so
            every project earns full attention. Audit credit applies to any higher tier
            when booked within 30 days.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}

function TierRow({ tier }: { tier: Tier }) {
  const isFeatured = tier.featured;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={SPRING_SNAPPY}
      className={`group relative grid grid-cols-1 md:grid-cols-[180px_1fr_auto] gap-5 md:gap-10 items-start md:items-center p-6 md:p-7 rounded-[14px] transition-colors duration-300 ${
        isFeatured
          ? 'bg-brand-accent/[0.08] border border-brand-accent/30 hover:border-brand-accent/55'
          : 'bg-brand-cream/[0.025] border border-brand-cream/[0.08] hover:border-brand-cream/20'
      }`}
    >
      {/* Featured ribbon */}
      {isFeatured && (
        <div className="absolute -top-3 left-6 md:left-7 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-accent text-brand-dark text-[0.6875rem] font-bold tracking-[0.1em] uppercase">
          <Star size={10} weight="fill" />
          Flagship
        </div>
      )}

      {/* Price + duration */}
      <div>
        <p
          className="font-sans font-semibold text-brand-cream tabular-nums leading-none"
          style={{ fontSize: 'clamp(1.625rem, 2.4vw, 2rem)' }}
        >
          {tier.price}
        </p>
        <p className="mt-1.5 text-[0.75rem] font-medium tracking-[0.1em] uppercase text-brand-cream/45">
          {tier.duration}
        </p>
      </div>

      {/* Name + description */}
      <div>
        <h3 className="font-sans font-semibold text-brand-cream text-[1.0625rem] md:text-[1.125rem] tracking-[-0.01em]">
          {tier.name}
        </h3>
        <p className="mt-2 text-brand-cream/65 text-[0.9375rem] leading-[1.55] max-w-[58ch]">
          {tier.description}
        </p>
      </div>

      {/* CTA */}
      <div className="md:justify-self-end">
        <MagneticButton strength={0.1}>
          <Link
            href={`/contact?intent=${tier.intent}`}
            className={`inline-flex items-center gap-2 h-[44px] px-5 rounded-[10px] font-medium text-[0.875rem] transition-colors duration-200 ${
              isFeatured
                ? 'bg-brand-cream text-brand-dark hover:bg-brand-cream/90'
                : 'border border-brand-cream/15 text-brand-cream/85 hover:border-brand-cream/40 hover:text-brand-cream'
            }`}
          >
            {isFeatured ? 'Book a discovery call' : 'Enquire'}
            <ArrowRight size={13} weight="bold" />
          </Link>
        </MagneticButton>
      </div>
    </motion.div>
  );
}
