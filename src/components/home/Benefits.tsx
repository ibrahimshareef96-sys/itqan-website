'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle, XCircle } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { FadeUp } from '@/components/ui/FadeUp';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { SPRING_SNAPPY } from '@/lib/motion';

const withItqan = [
  {
    title: 'Senior Designer.',
    desc: 'Top-tier experts who bring strategic depth and precision craft to every project, from concept through delivery.',
  },
  {
    title: 'Easy Project Management.',
    desc: 'Transparent timelines, clear communication, and structured update cycles that keep you fully in the loop.',
  },
  {
    title: 'Cost Efficient.',
    desc: 'Fixed pricing with no hidden fees. Know exactly what you are investing in from day one.',
  },
  {
    title: 'Consistent Progress Updates.',
    desc: 'Regular progress check-ins so you always know exactly where your project stands.',
  },
];

const withoutItqan = [
  {
    title: 'Junior Designers.',
    desc: 'Cheaper at first glance, but costly in revisions, strategy gaps, and missed brand opportunities.',
  },
  {
    title: 'Tedious & Hard to Keep Up.',
    desc: 'Managing multiple freelancers means fragmented communication and unclear ownership.',
  },
  {
    title: 'Never-ending Invoices.',
    desc: 'Scope creep and revision charges inflate well beyond the initial quote, consistently.',
  },
  {
    title: 'Slow & Rushed Work.',
    desc: 'Inconsistent delivery creates bottlenecks, missed deadlines, and last-minute compromises.',
  },
];

export function Benefits() {
  return (
    <section className="bg-brand-dark py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="max-w-5xl">
          <FadeUp>
            <h2 className="font-sans font-bold text-2xl md:text-[2rem] text-brand-cream leading-tight tracking-tight">
              Benefits of our Meticulous Design Process:
              <br />
              <span className="font-serif font-normal italic text-brand-accent">
                Carefully refined over 10 years of dedicated expertise.
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="mt-8">
              <MagneticButton strength={0.15}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={SPRING_SNAPPY}
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-brand-accent text-brand-dark px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity duration-200"
                  >
                    Book a meeting
                    <ArrowRight size={14} weight="bold" />
                  </Link>
                </motion.div>
              </MagneticButton>
            </div>
          </FadeUp>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-5">

          {/* With Itqan — slides from left */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold tracking-[0.22em] text-brand-accent uppercase mb-5">
              With Itqan:
            </p>
            {withItqan.map(({ title, desc }, i) => (
              <ScrollReveal key={title} direction="left" distance={28} delay={0.1 + i * 0.07}>
                <div className="bg-brand-cream/[0.08] border border-brand-cream/[0.1] rounded-2xl p-6 flex gap-4">
                  <CheckCircle size={19} weight="fill" className="text-brand-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-brand-cream text-sm">{title}</p>
                    <p className="text-brand-cream/50 text-xs mt-1.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Without Itqan — slides from right */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold tracking-[0.22em] text-text-secondary uppercase mb-5">
              Without Itqan:
            </p>
            {withoutItqan.map(({ title, desc }, i) => (
              <ScrollReveal key={title} direction="right" distance={28} delay={0.15 + i * 0.07}>
                <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 flex gap-4">
                  <XCircle size={19} weight="fill" className="text-text-secondary/50 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-brand-cream/45 text-sm">{title}</p>
                    <p className="text-brand-cream/25 text-xs mt-1.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
