'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState, type ReactNode } from 'react';
import { PARALLAX_SPEED_RANGE } from '@/lib/motion';

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

/**
 * Scroll-linked parallax wrapper.
 * Applies a subtle Y-axis translation based on scroll position.
 * Disabled on touch devices and when prefers-reduced-motion is active.
 */
export function Parallax({
  children,
  speed = 0.15,
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(!isTouch && !reducedMotion);
  }, []);

  const clampedSpeed = Math.max(PARALLAX_SPEED_RANGE.min, Math.min(PARALLAX_SPEED_RANGE.max, speed));

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const rawY = useTransform(scrollYProgress, [0, 1], [clampedSpeed * -100, clampedSpeed * 100]);
  const y = useSpring(rawY, { stiffness: 100, damping: 30 });

  if (!enabled) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className} style={{ overflow: 'hidden' }}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
