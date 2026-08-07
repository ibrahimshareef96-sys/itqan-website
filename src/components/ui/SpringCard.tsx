'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { SPRING_HOVER, SPRING_PRESS } from '@/lib/motion';

interface SpringCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Card wrapper with spring-physics hover effect.
 * Replaces CSS hover translate with Framer Motion spring for a tactile feel.
 */
export function SpringCard({ children, className }: SpringCardProps) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.015,
        // Critically damped. The previous stiffness 300 / damping 20 is a damping
        // ratio of ~0.58, i.e. a visible bounce on a hover that carried no
        // momentum — overshoot belongs on flicks and drags, not on cursor entry.
        transition: SPRING_HOVER,
      }}
      // Feedback lands on pointer-DOWN and is faster than the release, so the
      // press reads as instant and the return reads as settling.
      whileTap={{ scale: 0.972, transition: SPRING_PRESS }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
