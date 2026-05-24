'use client';

import { ShieldCheck } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { FadeUp } from '@/components/ui/FadeUp';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const gates = [
  {
    day: 'Day 30',
    delivers: 'Identity complete — brand, visuals, voice.',
  },
  {
    day: 'Day 60',
    delivers: 'System complete — tools, workflows, content engine.',
  },
  {
    day: 'Day 90',
    delivers: 'Automation complete — agentic layer running from Telegram.',
  },
];

export function Guarantee() {
  return (
    <section
      className="relative py-28 md:py-40 overflow-hidden"
      aria-labelledby="guarantee-heading"
    >
      {/* Soft accent ambient — bottom-right */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 85% 80%, rgba(204,164,194,0.06), transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 md:gap-16 items-start">
          {/* Left — heading + lead */}
          <div>
            <FadeUp>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20">
                <ShieldCheck size={14} weight="bold" className="text-brand-accent" />
                <p className="text-[0.6875rem] font-bold tracking-[0.18em] uppercase text-brand-accent">
                  Guarantee
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.06}>
              <h2
                id="guarantee-heading"
                className="mt-7 font-sans font-semibold text-brand-cream leading-[1.05] tracking-[-0.02em]"
                style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.5rem)' }}
              >
                Phase-gated outputs.{' '}
                <span
                  className="text-brand-accent"
                  style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
                >
                  No surprises.
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.12}>
              <p
                className="mt-7 text-brand-cream/75 leading-[1.6]"
                style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)', maxWidth: '46ch' }}
              >
                At Day 30, Day 60, and Day 90, defined deliverables are checked. If any
                pillar isn&apos;t complete on time,{' '}
                <span className="text-brand-cream font-medium">
                  we extend free until it is.
                </span>
              </p>
            </FadeUp>

            <FadeUp delay={0.18}>
              <p
                className="mt-5 text-brand-cream/75 leading-[1.6]"
                style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)', maxWidth: '46ch' }}
              >
                If at Day 30 it&apos;s not working for either side,{' '}
                <span className="text-brand-cream font-medium">
                  you keep the identity, we keep the deposit, we part as friends.
                </span>
              </p>
            </FadeUp>

            {/* Honest caveat — muted */}
            <FadeUp delay={0.26}>
              <p
                className="mt-9 italic text-brand-cream/45 leading-[1.55]"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '0.9375rem',
                  maxWidth: '46ch',
                }}
              >
                We don&apos;t guarantee your revenue, your leads, or your PR &mdash; those
                depend on factors outside our hands. We guarantee what we build.
              </p>
            </FadeUp>
          </div>

          {/* Right — phase gate cards */}
          <div className="grid gap-3 md:gap-4">
            {gates.map((gate, i) => (
              <ScrollReveal
                key={gate.day}
                direction="up"
                distance={20}
                delay={i * 0.08}
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="relative flex items-start gap-5 md:gap-6 p-6 md:p-7 rounded-[12px] border border-brand-cream/[0.08] bg-brand-cream/[0.025]"
                >
                  {/* Gate marker */}
                  <div
                    className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-sans font-semibold text-brand-accent border border-brand-accent/35 bg-brand-accent/[0.08] tabular-nums"
                    style={{ fontSize: '0.875rem' }}
                  >
                    {gate.day.split(' ')[1]}
                  </div>

                  <div className="flex-1 pt-1">
                    <p className="text-[0.6875rem] font-bold tracking-[0.18em] uppercase text-brand-cream/45">
                      {gate.day} checkpoint
                    </p>
                    <p className="mt-2 text-brand-cream/85 text-[1rem] md:text-[1.0625rem] leading-[1.5]">
                      {gate.delivers}
                    </p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
