'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';

interface AnimatedArrowProps {
  size?: number;
  className?: string;
}

/**
 * Arrow icon that extends on hover via the parent group.
 * Must be placed inside a `group` container to respond to hover.
 */
export function AnimatedArrow({ size = 14, className }: AnimatedArrowProps) {
  return (
    <motion.span
      className={`inline-flex ${className ?? ''}`}
      initial={{ x: 0 }}
      whileHover={{ x: 3 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <ArrowRight size={size} weight="bold" />
    </motion.span>
  );
}
