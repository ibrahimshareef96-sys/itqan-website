'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/**
 * Wraps a child element with a subtle magnetic pull-toward-cursor effect.
 * Uses useMotionValue + useSpring for 60fps performance (no useState re-renders).
 * Automatically disabled on touch devices.
 */
export function MagneticButton({
  children,
  className,
  strength = 0.15,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 25 });
  const springY = useSpring(y, { stiffness: 200, damping: 25 });

  useEffect(() => {
    setIsTouch(
      'ontouchstart' in window || navigator.maxTouchPoints > 0
    );
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isTouch) return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={isTouch ? undefined : { x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
