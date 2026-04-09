'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { staggerContainerVariants, staggerChildVariants } from '@/lib/motion';

interface StaggerContainerProps {
  children: ReactNode;
  stagger?: number;
  delay?: number;
  once?: boolean;
  margin?: string;
  className?: string;
}

/**
 * Wraps children in a stagger animation container.
 * Direct children should be wrapped in `<StaggerItem>` for the stagger effect.
 */
export function StaggerContainer({
  children,
  stagger = 0.08,
  delay = 0,
  once = true,
  margin = '-72px 0px',
  className,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: margin as `${number}px` });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainerVariants({ stagger, delay })}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

/**
 * A child item inside `<StaggerContainer>` that animates with the stagger.
 */
export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div variants={staggerChildVariants} className={className}>
      {children}
    </motion.div>
  );
}
