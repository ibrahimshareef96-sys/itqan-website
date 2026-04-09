'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Gear,
  Sparkle,
  PencilSimpleLine,
  TerminalWindow,
  Package,
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { FadeUp } from '@/components/ui/FadeUp';
import { ScaleReveal } from '@/components/ui/ScaleReveal';
import { SpringCard } from '@/components/ui/SpringCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SPRING_SNAPPY } from '@/lib/motion';

const steps = [
  {
    Icon: Sparkle,
    title: 'Select a Plan.',
    description:
      "Choose a plan that fits your needs, and we'll tailor the experience around your vision, goals and brand direction.",
  },
  {
    Icon: PencilSimpleLine,
    title: 'Request Your Designs.',
    description:
      'Share your vision, and our experts will translate it into stunning, functional designs that meet your business goals.',
  },
  {
    Icon: TerminalWindow,
    title: 'We Start Development.',
    description:
      'Our skilled developers bring your designs to life, crafting a robust and scalable solution.',
  },
  {
    Icon: Package,
    title: 'And We Deliver.',
    description:
      'Receive a fully tested, polished & quality product that meets your needs with ongoing support.',
  },
];

export function ProcessSteps() {
  return (
    <section className="bg-brand-accent/[0.18] py-24 lg:py-32 border-t border-brand-accent/25">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <FadeUp>
          <SectionLabel icon={<Gear size={13} />} label="Process" />
        </FadeUp>

        <FadeUp delay={0.08} className="mt-6 max-w-2xl">
          <h2 className="font-sans font-bold text-3xl md:text-[2.25rem] text-brand-dark leading-tight tracking-tight">
            A process built for:
            <br />
            <span className="font-serif font-normal italic text-brand-accent-on-light">
              Clarity, Precision &amp; Results.
            </span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.16} className="mt-5">
          <p className="text-text-secondary text-base leading-relaxed max-w-[62ch]">
            Purpose-led brand strategy, refined design systems, bespoke user interfaces, and
            seamless digital execution, all crafted for founders who value detail, direction, and
            distinction.
          </p>
        </FadeUp>

        {/* 2x2 step grid */}
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {steps.map(({ Icon, title, description }, i) => (
            <ScaleReveal key={title} delay={0.1 + i * 0.08}>
              <SpringCard className="h-full">
                <div className="bg-brand-cream rounded-2xl p-8 border border-brand-accent/15 shadow-[0_4px_24px_rgba(47,28,44,0.04)] h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="inline-flex items-center bg-brand-dark text-brand-cream px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                      Step {i + 1}
                    </span>
                    <Icon size={18} className="text-brand-accent" />
                  </div>
                  <h3 className="font-sans font-semibold text-xl text-brand-dark leading-snug mb-3">
                    {title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
                </div>
              </SpringCard>
            </ScaleReveal>
          ))}
        </div>

        <FadeUp delay={0.4} className="mt-12">
          <MagneticButton strength={0.15}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={SPRING_SNAPPY}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand-dark text-brand-cream px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity duration-200"
              >
                Get started
                <ArrowRight size={14} weight="bold" />
              </Link>
            </motion.div>
          </MagneticButton>
        </FadeUp>

      </div>
    </section>
  );
}
