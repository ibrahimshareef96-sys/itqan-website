'use client';

import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

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
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
