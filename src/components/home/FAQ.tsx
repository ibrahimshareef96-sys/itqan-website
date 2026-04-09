'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CaretDown, Question, EnvelopeSimple, Phone } from '@phosphor-icons/react';
import { FadeUp } from '@/components/ui/FadeUp';
import { StaggerContainer, StaggerItem } from '@/components/ui/StaggerContainer';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { EASE_SMOOTH } from '@/lib/motion';

const faqs = [
  {
    q: "Why wouldn't I just hire an in-house designer?",
    a: "An in-house designer executes based on the current direction. We architect the direction that is best befitting your brand. With that we bring strategic clarity, brand positioning and execution systems that an individual hire often can't provide alone.",
  },
  {
    q: "What exactly do you mean by 'giving direction'?",
    a: "We help define your brand's visual language, positioning, and digital strategy so every design decision serves a larger purpose.",
  },
  {
    q: 'Who do you typically work with?',
    a: 'Founders, startups, and growing businesses who care about brand quality and want a senior-level design partner.',
  },
  {
    q: 'What does a typical engagement look like?',
    a: 'It starts with a strategy call, then we scope the project, set milestones, and deliver iteratively with 48-hour update cycles.',
  },
  {
    q: 'What makes Itqan different?',
    a: 'We combine strategic thinking with senior design execution. You get the strategy of a consultancy with the craft of a boutique studio.',
  },
  {
    q: 'What if I am not sure what I need yet?',
    a: "That's exactly when you should reach out. We help you figure out what you need before we start building.",
  },
  {
    q: 'Do you offer ongoing support?',
    a: 'Yes, we offer retainer packages for ongoing design, development, and systems support.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="bg-brand-accent/[0.18] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <FadeUp>
          <SectionLabel icon={<Question size={13} />} label="FAQs" />
        </FadeUp>

        <FadeUp delay={0.08} className="mt-6">
          <h2 className="font-sans font-bold text-4xl md:text-[2.75rem] text-brand-dark leading-tight tracking-tight">
            Frequently Asked Questions!
          </h2>
        </FadeUp>

        {/* Accordion */}
        <StaggerContainer stagger={0.06} className="mt-12 space-y-3 max-w-3xl">
          {faqs.map(({ q, a }, i) => (
            <StaggerItem key={q}>
              <div className="bg-brand-cream rounded-2xl border border-brand-accent/12 overflow-hidden">
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left group"
                  aria-expanded={openIndex === i}
                >
                  <span className="font-semibold text-brand-dark text-sm leading-snug">{q}</span>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.28, ease: EASE_SMOOTH }}
                    className="flex-shrink-0 text-text-secondary group-hover:text-brand-dark transition-colors duration-200"
                  >
                    <CaretDown size={17} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE_SMOOTH }}
                      className="overflow-hidden"
                    >
                      <p className="px-7 pb-6 text-text-secondary text-sm leading-relaxed">
                        {a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Help box */}
        <FadeUp delay={0.3} className="mt-12 max-w-3xl">
          <div className="bg-brand-cream rounded-2xl border border-brand-accent/12 px-8 py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <p className="font-semibold text-brand-dark">
                Can&apos;t Find Your Answer Here?
              </p>
              <p className="text-text-secondary text-sm mt-0.5">We Can Help Out!</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:hello@itqanstudio.com"
                className="inline-flex items-center gap-2 bg-brand-dark text-brand-cream px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity duration-200"
              >
                <EnvelopeSimple size={14} />
                Send Us an Email
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-brand-dark/25 text-brand-dark px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-dark hover:text-brand-cream transition-colors duration-200"
              >
                <Phone size={14} />
                Schedule a Call
              </Link>
            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
