import type { Transition, Variants } from 'framer-motion';

// ── Easing curves ──────────────────────────────────────────────
export const EASE_SMOOTH: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.4, 0, 0.2, 1];
/** CSS-string easing for the Axion-style roll/expand micro-interactions (used in style attrs). */
export const EASE_ROLL_CSS = 'cubic-bezier(0.25, 0.1, 0.25, 1)';

// ── Spring configs ─────────────────────────────────────────────
/*
 * Springs below are parameterised the way Apple parameterises them: `bounce`
 * (overshoot, = 1 - dampingRatio) and `duration` (response, roughly how quickly
 * the value reaches the target) rather than mass/stiffness/damping.
 *
 * House rule: bounce 0 (critically damped) by DEFAULT. Overshoot is only correct
 * when the gesture itself carried momentum — a flick, a throw, a drag release.
 * Bounce on something that merely faded in or got hovered feels wrong.
 */

/**
 * Narrower than framer's `Transition` union on purpose: these are spread into
 * `animate(motionValue, target, options)`, whose overloads reject the broad
 * union. `SpringSpec` still satisfies `Transition` for variant use.
 */
export interface SpringSpec {
  type: 'spring';
  bounce: number;
  duration: number;
}

/** Default for anything the user can touch that did not carry momentum. */
export const SPRING_HOVER: SpringSpec = { type: 'spring', bounce: 0, duration: 0.4 };

/** Press-down feedback: faster than the release, so the press reads as instant. */
export const SPRING_PRESS: SpringSpec = { type: 'spring', bounce: 0, duration: 0.18 };

/** Momentum-driven settle — use ONLY after a flick or drag release. */
export const SPRING_MOMENTUM: SpringSpec = { type: 'spring', bounce: 0.2, duration: 0.4 };

/**
 * Drawer / sheet presentation. Apple ships damping 0.8, response 0.3 for this
 * one — a sheet earns its overshoot because it arrives as a physical panel.
 */
export const SPRING_SHEET: SpringSpec = { type: 'spring', bounce: 0.2, duration: 0.3 };

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

/**
 * Project where a flick is HEADED, so a gesture lands on the target nearest its
 * momentum rather than the one nearest its release point. This is the
 * exponential-decay form Apple ships in the Designing Fluid Interfaces sample —
 * NOT the physics-textbook `v² / 2a`.
 *
 * @param velocity     release velocity in px/s
 * @param deceleration 0.998 for a normal scroll feel, 0.99 for a snappier rail
 * @returns            distance in px the gesture would still travel
 */
export function projectMomentum(velocity: number, deceleration = 0.998): number {
  return ((velocity / 1000) * deceleration) / (1 - deceleration);
}

// NOTE: there is deliberately no `rubberband()` helper here. Boundary resistance
// is Framer's `dragElastic`, which already implements it on the constrained axis;
// a hand-rolled duplicate would be dead code that invites divergence.

// ── Default durations ──────────────────────────────────────────
export const DURATION_FAST = 0.28;
export const DURATION_DEFAULT = 0.8;
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
