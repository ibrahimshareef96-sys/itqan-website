'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

function useCountUp(target: number, shouldStart: boolean, duration = 2000): number {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!shouldStart || hasRun.current) return;
    hasRun.current = true;

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }

    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [shouldStart, target, duration]);

  return value;
}

export function StatsLine() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const years = useCountUp(20, isInView);
  const countries = useCountUp(6, isInView);
  const languages = useCountUp(8, isInView);

  return (
    <section ref={ref} className="py-40 px-4 md:px-8 overflow-hidden" aria-label="Itqan by the numbers">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <h2
          className="stats-gradient stats-line font-sans font-bold leading-[1.25] tracking-[-0.02em] whitespace-nowrap mx-auto pb-[0.15em]"
          style={{ fontSize: 'clamp(2.25rem, 4.5vw, 4rem)' }}
        >
          <span className="tabular-nums">{years}</span> years of craft.{' '}
          <span className="tabular-nums">{countries}</span> countries.{' '}
          <span className="tabular-nums">{languages}</span> languages.
        </h2>
      </motion.div>
    </section>
  );
}
