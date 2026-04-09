'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quotes } from '@phosphor-icons/react';
import { EASE_SMOOTH } from '@/lib/motion';
import type { Testimonial } from '@/data/testimonials';

interface Props {
  testimonials: Testimonial[];
  variant?: 'card' | 'inline';
}

export function TestimonialCarousel({ testimonials, variant = 'card' }: Props) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const next = useCallback(() => {
    setDir(1);
    setIndex((i) => (i + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setDir(-1);
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  const current = testimonials[index];

  const variants = {
    initial: (d: number) => ({ opacity: 0, x: d * 18 }),
    animate: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -18 }),
  };

  if (variant === 'inline') {
    return (
      <div className="relative">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.38, ease: EASE_SMOOTH }}
          >
            <Quotes size={28} className="text-brand-accent mb-4" weight="fill" />
            <blockquote className="text-text-primary text-base leading-relaxed">
              {current.quote}
            </blockquote>
            <div className="mt-5 flex items-center gap-3">
              {current.image && (
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-brand-accent/30">
                  <Image
                    src={current.image}
                    alt={current.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
              )}
              <div>
                <p className="font-semibold text-brand-dark text-sm">{current.name}</p>
                <p className="text-text-secondary text-xs mt-0.5">{current.company}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-brand-accent/12">
          <button
            onClick={prev}
            className="w-8 h-8 rounded-full border border-brand-accent/30 flex items-center justify-center text-text-secondary hover:border-brand-dark hover:text-brand-dark transition-colors duration-200"
            aria-label="Previous testimonial"
          >
            <ArrowLeft size={13} />
          </button>
          <button
            onClick={next}
            className="w-8 h-8 rounded-full border border-brand-accent/30 flex items-center justify-center text-text-secondary hover:border-brand-dark hover:text-brand-dark transition-colors duration-200"
            aria-label="Next testimonial"
          >
            <ArrowRight size={13} />
          </button>
          <div className="flex items-center gap-1.5 ml-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? 'w-5 bg-brand-accent' : 'w-1.5 bg-brand-accent/30'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // card variant (used in contact page)
  return (
    <div className="bg-white rounded-2xl p-8 shadow-[0_8px_40px_rgba(47,28,44,0.07)] border border-brand-accent/12">
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={index}
          custom={dir}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.38, ease: EASE_SMOOTH }}
        >
          <Quotes size={30} className="text-brand-accent mb-5" weight="fill" />
          <blockquote className="text-text-primary text-base leading-relaxed">
            {current.quote}
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            {current.image && (
              <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-brand-accent/30">
                <Image
                  src={current.image}
                  alt={current.name}
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </div>
            )}
            <div>
              <p className="font-semibold text-brand-dark text-sm">{current.name}</p>
              <p className="text-text-secondary text-xs mt-0.5">{current.company}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-2 mt-6 pt-5 border-t border-brand-accent/12">
        <button
          onClick={prev}
          className="w-8 h-8 rounded-full border border-brand-accent/30 flex items-center justify-center text-text-secondary hover:border-brand-dark hover:text-brand-dark transition-colors duration-200"
          aria-label="Previous testimonial"
        >
          <ArrowLeft size={13} />
        </button>
        <button
          onClick={next}
          className="w-8 h-8 rounded-full border border-brand-accent/30 flex items-center justify-center text-text-secondary hover:border-brand-dark hover:text-brand-dark transition-colors duration-200"
          aria-label="Next testimonial"
        >
          <ArrowRight size={13} />
        </button>
        <div className="flex items-center gap-1.5 ml-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-5 bg-brand-accent' : 'w-1.5 bg-brand-accent/30'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
