'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  staggerContainerVariants,
  staggerChildVariants,
  DURATION_DEFAULT,
  EASE_SMOOTH,
  getReducedMotionQuery,
} from '@/lib/motion';

interface SplitTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
}

/**
 * Splits text into words and staggers their entrance animation.
 * Each word fades up individually for a cinematic headline effect.
 */
export function SplitText({
  text,
  className,
  wordClassName,
  stagger = 0.04,
  delay = 0,
  once = true,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: '-72px 0px' as `${number}px` });

  const words = text.split(' ');

  return (
    <motion.span
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainerVariants({ stagger, delay })}
      className={className}
      style={{ display: 'inline' }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={staggerChildVariants}
          className={wordClassName}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {word}{i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
}
