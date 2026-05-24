'use client';

import { Check, X } from '@phosphor-icons/react';
import { FadeUp } from '@/components/ui/FadeUp';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const forYou = [
  "You're a solo founder or 2-3 person team",
  'Building tech-adjacent — SaaS, fintech, productized service, creator brand, knowledge business',
  'GCC-based or relocating to GCC',
  'You care about craft and intelligence',
  "You're tired of looking smaller than you are",
];

const notForYou = [
  "You're shopping for a logo",
  'You run a commodity business and need decoration',
  'You want a friend discount',
  'You need this done in less than 30 days',
];

export function WhoFor() {
  return (
    <section
      className="relative py-28 md:py-40"
      aria-labelledby="who-for-heading"
    >
      <div className="max-w-[1440px] mx-auto px-5 md:px-8">
        {/* Eyebrow */}
        <FadeUp>
          <p
            className="font-sans font-medium text-[0.75rem] uppercase text-brand-accent"
            style={{ letterSpacing: '0.22em' }}
          >
            Honest filter
          </p>
        </FadeUp>

        {/* Heading */}
        <FadeUp delay={0.06}>
          <h2
            id="who-for-heading"
            className="mt-6 font-sans font-semibold text-brand-cream leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', maxWidth: '20ch' }}
          >
            We are{' '}
            <span
              className="text-brand-accent"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
            >
              not
            </span>{' '}
            for everyone.
          </h2>
        </FadeUp>

        <FadeUp delay={0.12}>
          <p
            className="mt-8 text-brand-cream/65 leading-[1.55]"
            style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)', maxWidth: '58ch' }}
          >
            We work with a small number of founders per quarter. Reading these lists honestly
            saves both of us a call.
          </p>
        </FadeUp>

        {/* Two columns */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* This IS for you */}
          <ScrollReveal direction="up" distance={24}>
            <div className="h-full rounded-[14px] border border-brand-cream/[0.08] bg-brand-cream/[0.02] p-7 md:p-9">
              <div className="flex items-center gap-2.5 mb-7">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-accent/15 text-brand-accent">
                  <Check size={14} weight="bold" />
                </span>
                <h3 className="font-sans font-semibold text-brand-cream text-[0.9375rem] tracking-[0.02em] uppercase">
                  This is for you if
                </h3>
              </div>
              <ul role="list" className="space-y-4">
                {forYou.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-brand-cream/85 text-[0.9375rem] md:text-[1rem] leading-[1.55]"
                  >
                    <span
                      className="mt-[0.45em] inline-block w-1.5 h-1.5 rounded-full bg-brand-accent/70 flex-shrink-0"
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
            <div className="h-full rounded-[14px] border border-brand-cream/[0.06] bg-brand-cream/[0.015] p-7 md:p-9">
              <div className="flex items-center gap-2.5 mb-7">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-cream/8 text-brand-cream/45">
                  <X size={14} weight="bold" />
                </span>
                <h3 className="font-sans font-semibold text-brand-cream/55 text-[0.9375rem] tracking-[0.02em] uppercase">
                  This isn&apos;t for you if
                </h3>
              </div>
              <ul role="list" className="space-y-4">
                {notForYou.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-brand-cream/50 text-[0.9375rem] md:text-[1rem] leading-[1.55]"
                  >
                    <span
                      className="mt-[0.45em] inline-block w-1.5 h-1.5 rounded-full bg-brand-cream/25 flex-shrink-0"
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
