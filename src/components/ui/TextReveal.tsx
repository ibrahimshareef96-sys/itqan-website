'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode, type ElementType } from 'react';
import { clipRevealVariants, DURATION_DEFAULT, EASE_SMOOTH } from '@/lib/motion';

type Direction = 'up' | 'down' | 'left' | 'right';

const clipFromDirection: Record<Direction, string> = {
  up: 'inset(100% 0% 0% 0%)',
  down: 'inset(0% 0% 100% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
};

interface TextRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  once?: boolean;
}

/**
 * Reveals content with a clip-path mask animation.
 * Uses clipRevealVariants from motion.ts for directional wipe reveals.
 */
export function TextReveal({
  children,
  direction = 'up',
  delay = 0,
  duration,
  className,
  as = 'div',
  once = true,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-72px 0px' as `${number}px` });

  const Tag = motion[as as keyof typeof motion] as ElementType;

  return (
    <Tag
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={clipRevealVariants({
        from: clipFromDirection[direction],
        delay,
        duration,
      })}
      className={className}
    >
      {children}
    </Tag>
  );
}
