'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { scaleInVariants } from '@/lib/motion';

interface ScaleRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  from?: number;
  once?: boolean;
  margin?: string;
  className?: string;
}

/**
 * Reveals content with a scale-in animation (grow from 92% to 100% with opacity).
 * Uses scaleInVariants from motion.ts.
 */
export function ScaleReveal({
  children,
  delay = 0,
  duration,
  from = 0.92,
  once = true,
  margin = '-72px 0px',
  className,
}: ScaleRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: margin as `${number}px` });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={scaleInVariants({ from, delay, duration })}
      className={className}
    >
      {children}
    </motion.div>
  );
}
