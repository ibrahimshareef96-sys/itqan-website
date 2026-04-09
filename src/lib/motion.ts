import type { Transition, Variants } from 'framer-motion';

// ── Easing curves ──────────────────────────────────────────────
export const EASE_SMOOTH: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_OUT_EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.4, 0, 0.2, 1];

// ── Spring configs ─────────────────────────────────────────────
export const SPRING_SNAPPY: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 24,
};

export const SPRING_SOFT: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
};

export const SPRING_BOUNCY: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 17,
};

// ── Default durations ──────────────────────────────────────────
export const DURATION_FAST = 0.28;
export const DURATION_DEFAULT = 0.55;
export const DURATION_SLOW = 0.8;

// ── Default reveal transition ──────────────────────────────────
export const DEFAULT_REVEAL_TRANSITION: Transition = {
  duration: DURATION_DEFAULT,
  ease: EASE_SMOOTH,
};

// ── Direction map for scroll reveals ───────────────────────────
type Direction = 'up' | 'down' | 'left' | 'right';

interface RevealOptions {
  direction?: Direction;
  distance?: number;
  duration?: number;
  delay?: number;
}

const directionOffset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

export function revealVariants({
  direction = 'up',
  distance = 24,
  duration = DURATION_DEFAULT,
  delay = 0,
}: RevealOptions = {}): Variants {
  const offset = directionOffset[direction];
  return {
    hidden: {
      opacity: 0,
      x: offset.x * distance,
      y: offset.y * distance,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: EASE_SMOOTH,
      },
    },
  };
}

// ── Scale-in variant ───────────────────────────────────────────
export function scaleInVariants({
  duration = DURATION_DEFAULT,
  delay = 0,
  from = 0.92,
}: { duration?: number; delay?: number; from?: number } = {}): Variants {
  return {
    hidden: { opacity: 0, scale: from },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration, delay, ease: EASE_SMOOTH },
    },
  };
}

// ── Clip-path reveal variant ───────────────────────────────────
export function clipRevealVariants({
  duration = DURATION_SLOW,
  delay = 0,
  from = 'inset(100% 0% 0% 0%)',
  to = 'inset(0% 0% 0% 0%)',
}: {
  duration?: number;
  delay?: number;
  from?: string;
  to?: string;
} = {}): Variants {
  return {
    hidden: { clipPath: from, opacity: 0 },
    visible: {
      clipPath: to,
      opacity: 1,
      transition: { duration, delay, ease: EASE_OUT_EXPO },
    },
  };
}

// ── Stagger container variant ──────────────────────────────────
export function staggerContainerVariants({
  stagger = 0.08,
  delay = 0,
}: { stagger?: number; delay?: number } = {}): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };
}

// ── Stagger child (generic) ────────────────────────────────────
export const staggerChildVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION_DEFAULT, ease: EASE_SMOOTH },
  },
};

// ── Draw path variant (SVG line drawing) ──────────────────────
export function drawVariants({
  duration = DURATION_SLOW,
  delay = 0,
}: { duration?: number; delay?: number } = {}): Variants {
  return {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration, delay, ease: EASE_OUT_EXPO },
    },
  };
}

// ── Parallax speed bounds ─────────────────────────────────────
export const PARALLAX_SPEED_RANGE = { min: -0.3, max: 0.3 } as const;

// ── Reduced motion helper ──────────────────────────────────────
export function getReducedMotionQuery(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
