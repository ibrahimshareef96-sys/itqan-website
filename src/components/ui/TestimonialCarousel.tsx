'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  animate,
  useMotionValue,
  useReducedMotion,
  type AnimationPlaybackControls,
} from 'framer-motion';
import { ArrowLeft, ArrowRight, Quotes } from '@phosphor-icons/react';
import { projectMomentum, SPRING_MOMENTUM, SPRING_HOVER } from '@/lib/motion';
import type { Testimonial } from '@/data/testimonials';

interface Props {
  testimonials: Testimonial[];
  variant?: 'card' | 'inline';
}

/** Shared accent pair (dual-accent rule): deep mauve on light, light pink on dark. */
const ACCENT = 'text-brand-accent-on-light dark:text-brand-accent';

const AUTOPLAY_MS = 5000;
/** How long a touch tap holds autoplay off before it resumes on its own. */
const TOUCH_PAUSE_MS = 12000;
/** A rail decelerates faster than a scroll view, so it snaps rather than glides. */
const RAIL_DECELERATION = 0.99;

/**
 * Testimonial carousel.
 *
 * Direct manipulation: the rail tracks the pointer 1:1, a flick projects its own
 * momentum to choose the landing card, and the release velocity is handed to the
 * spring so drag and animation are one continuous motion. Every transition
 * animates from the CURRENT position, so a second input mid-flight redirects it
 * rather than being queued or dropped.
 *
 * The track is explicitly `count × 100%` wide with proportional slides. This is
 * load-bearing, not cosmetic: with `w-full` slides the track measures the same
 * width as its viewport, so Framer computes zero drag constraints and the gesture
 * degrades to elastic rubber-banding — a 150px drag moved the rail 27px.
 *
 * Autoplay yields to the reader: it pauses on hover, focus and touch anywhere in
 * the component (rail AND controls), and is off entirely under reduced motion. It
 * ping-pongs at the ends rather than wrapping, because on a finite rail a wrap
 * sweeps backward across every slide.
 */
export function TestimonialCarousel({ testimonials, variant = 'card' }: Props) {
  const [index, setIndex] = useState(0);
  /*
   * Engagement is three independent signals, not one flag. A single flag forced
   * a choice between two bugs: clearing it on drag-end resumed autoplay while a
   * mouse was still hovering, and not clearing it left autoplay paused forever
   * after a touch swipe (a touch pointer's leave event is unreliable once the
   * drag has captured it). Tracking hover, focus and drag separately, and
   * ignoring hover for non-mouse pointers, handles both.
   */
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  /**
   * Touch engagement is a COUNTER, not a boolean. With a boolean, a second tap
   * while already "touched" was a no-op for the grace-window effect, so tapping
   * the already-active dot did not extend the pause and autoplay resumed under
   * the reader. Every interaction bumps the counter, which always retriggers it.
   */
  const [touchTick, setTouchTick] = useState(0);
  const [touchPaused, setTouchPaused] = useState(false);
  const engaged = hovering || focused || dragging || touchPaused;
  const railRef = useRef<HTMLDivElement>(null);
  const runningRef = useRef<AnimationPlaybackControls | null>(null);
  /** Autoplay direction; flips at the ends so the rail never sweeps back. */
  const stepRef = useRef(1);
  const x = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  const count = testimonials.length;
  const getRailWidth = useCallback(() => railRef.current?.clientWidth ?? 0, []);

  /** Settle on a card. Bounce is only applied when a flick preceded it. */
  const settle = useCallback(
    (next: number, velocity = 0) => {
      if (count === 0) return;
      const clamped = Math.max(0, Math.min(count - 1, next));
      setIndex(clamped);
      // One animation owns the motion value at a time; a second would fight it.
      runningRef.current?.stop();
      runningRef.current = animate(x, -clamped * getRailWidth(), {
        ...(velocity ? SPRING_MOMENTUM : SPRING_HOVER),
        ...(reduceMotion ? { duration: 0.01, bounce: 0 } : null),
        // Only pass velocity when there IS one. An explicit `velocity: 0`
        // overrides framer's inherited value, so redirecting a still-moving rail
        // (a second arrow press mid-flight) restarted it from a dead stop.
        ...(velocity ? { velocity } : null),
      });
    },
    [count, getRailWidth, x, reduceMotion],
  );

  const goNext = useCallback(() => settle(index + 1), [index, settle]);
  const goPrev = useCallback(() => settle(index - 1), [index, settle]);

  // Committed index, readable from callbacks without re-subscribing them.
  const indexRef = useRef(0);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  // Autoplay — suspended whenever the reader is engaged, and off entirely when
  // the user has asked for reduced motion. The tick reads the committed index
  // from a ref and calls `settle`, so NOTHING happens inside a state updater:
  // updaters must be pure, and React may run them more than once.
  // `index` is in the deps so the timer RESTARTS whenever the card changes,
  // including from a manual arrow/dot/swipe. Without it a tap could be followed
  // by an autoplay advance a few milliseconds later, yanking the card away from
  // the person who just chose it.
  useEffect(() => {
    if (engaged || reduceMotion || count < 2) return;
    const id = setInterval(() => {
      const i = indexRef.current;
      // Ping-pong at the ends. On a finite rail a wrap would sweep the track
      // backward across every slide.
      if (i + stepRef.current > count - 1 || i + stepRef.current < 0) {
        stepRef.current *= -1;
      }
      settle(i + stepRef.current);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [engaged, reduceMotion, count, settle, index]);

  // Keep the rail aligned when its width changes. A ResizeObserver on the rail
  // catches container-only changes (a sidebar opening) that `window.resize`
  // misses, and the in-flight spring must be stopped first or it finishes to a
  // target computed from the OLD width and parks the rail mid-card.
  useEffect(() => {
    const node = railRef.current;
    if (!node) return;
    const realign = () => {
      runningRef.current?.stop();
      x.set(-indexRef.current * getRailWidth());
    };
    const ro = new ResizeObserver(realign);
    ro.observe(node);
    window.addEventListener('resize', realign);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', realign);
    };
  }, [getRailWidth, x]);

  // If the list ever shrinks under a high index, every slide would be
  // aria-hidden and the rail parked past its own content.
  useEffect(() => {
    if (count > 0 && index > count - 1) settle(count - 1);
  }, [count, index, settle]);

  // A touch tap buys a grace window, not a permanent stop — there is no reliable
  // pointerleave for touch, and pausing forever is the same "stuck" bug in a
  // different costume. Keyed on the counter so every tap restarts the window.
  useEffect(() => {
    if (touchTick === 0) return;
    setTouchPaused(true);
    const id = setTimeout(() => setTouchPaused(false), TOUCH_PAUSE_MS);
    return () => clearTimeout(id);
  }, [touchTick]);

  // Never leave a spring running on an unmounted component.
  useEffect(() => () => runningRef.current?.stop(), []);

  // An empty list would leave live controls computing `% 0` and feeding NaN into
  // the spring. Render nothing rather than a broken shell.
  if (count === 0) return null;

  const atStart = index === 0;
  const atEnd = index === count - 1;

  /** Nav row (arrows + dots) — shared by both variants, theme-aware. */
  const nav = (
    <div className="flex items-center gap-2 mt-6 pt-5 border-t border-black/[0.08] dark:border-brand-cream/[0.12]">
      <button
        onClick={goPrev}
        disabled={atStart}
        className="press-scale w-8 h-8 rounded-full border border-black/[0.15] dark:border-brand-cream/25 flex items-center justify-center text-text-secondary dark:text-brand-cream/60 hover:border-brand-dark hover:text-brand-dark dark:hover:border-brand-cream dark:hover:text-brand-cream disabled:opacity-35 disabled:pointer-events-none"
        aria-label="Previous testimonial"
      >
        <ArrowLeft size={13} />
      </button>
      <button
        onClick={goNext}
        disabled={atEnd}
        className="press-scale w-8 h-8 rounded-full border border-black/[0.15] dark:border-brand-cream/25 flex items-center justify-center text-text-secondary dark:text-brand-cream/60 hover:border-brand-dark hover:text-brand-dark dark:hover:border-brand-cream dark:hover:text-brand-cream disabled:opacity-35 disabled:pointer-events-none"
        aria-label="Next testimonial"
      >
        <ArrowRight size={13} />
      </button>
      <div className="flex items-center gap-1.5 ml-3">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => settle(i)}
            aria-current={i === index ? 'true' : undefined}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index
                ? 'w-5 bg-brand-accent-on-light dark:bg-brand-accent'
                : 'w-1.5 bg-black/20 dark:bg-brand-cream/25'
            }`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );

  /** One slide's body. Every testimonial renders so the rail can be dragged. */
  const slide = (t: Testimonial, quoteSize: number) => (
    <>
      <Quotes size={quoteSize} className={`${ACCENT} mb-4`} weight="fill" />
      <blockquote className="text-text-primary dark:text-brand-cream/90 text-base leading-relaxed">
        {t.quote}
      </blockquote>
      <div className="mt-6 flex items-center gap-3">
        {t.image && (
          <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-brand-accent-on-light/30 dark:ring-brand-accent/30">
            <Image src={t.image} alt={t.name} fill className="object-cover" sizes="44px" />
          </div>
        )}
        <div>
          <p className="font-semibold text-text-primary dark:text-brand-cream text-sm">{t.name}</p>
          <p className="text-text-secondary dark:text-brand-cream/60 text-xs mt-0.5">{t.company}</p>
        </div>
      </div>
    </>
  );

  const rail = (quoteSize: number) => (
    <div ref={railRef} className="relative overflow-hidden" aria-roledescription="carousel">
      <motion.div
        className="flex"
        // Explicit track width — see the component doc. `w-full` slides make the
        // track the same width as the rail and Framer's constraints collapse.
        style={{ x, width: `${count * 100}%` }}
        drag="x"
        dragConstraints={railRef}
        dragElastic={0.18}
        /* Framer's inertia is off: we project the momentum ourselves so the
           landing decision and the settle animation share one velocity. */
        dragMomentum={false}
        onDragStart={() => {
          runningRef.current?.stop();
          setDragging(true);
        }}
        onDragEnd={(_, info) => {
          const w = getRailWidth();
          if (w) {
            const velocity = info.velocity.x;
            const projected = x.get() + projectMomentum(velocity, RAIL_DECELERATION);
            settle(Math.round(-projected / w), velocity);
          }
          // Must reset, or a touch swipe pauses autoplay for good. A hovering
          // mouse keeps it paused via `hovering`, which is unaffected here.
          setDragging(false);
        }}
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="flex-shrink-0"
            style={{ width: `${100 / count}%` }}
            aria-hidden={i !== index}
          >
            {slide(t, quoteSize)}
          </div>
        ))}
      </motion.div>
    </div>
  );

  /* Engagement handlers sit on the WRAPPER, not the rail: the arrows and dots
     live in the sibling nav, so rail-only handlers let autoplay move the
     testimonial out from under a keyboard user operating the controls. */
  const engagementProps = {
    // Hover is a mouse concept. A touch pointer fires enter/leave around a tap,
    // which would strand the paused state; drag tracking covers touch instead.
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType === 'mouse') setHovering(true);
    },
    onPointerLeave: (e: React.PointerEvent) => {
      if (e.pointerType === 'mouse') setHovering(false);
    },
    /*
     * A touch TAP on the arrows or dots is engagement too, and it produces no
     * hover and — on iOS Safari — often no focus either, because Safari does not
     * focus a <button> on tap. Without this, a touch reader stepping through
     * quotes with the arrows still had autoplay moving the card underneath them.
     * The timer also restarts on `index`, so a tap always buys a full interval.
     */
    onPointerDown: (e: React.PointerEvent) => {
      if (e.pointerType !== 'mouse') setTouchTick((n) => n + 1);
    },
    onFocusCapture: () => setFocused(true),
    onBlurCapture: () => setFocused(false),
  };

  if (variant === 'inline') {
    return (
      <div className="relative" {...engagementProps}>
        {rail(28)}
        {nav}
      </div>
    );
  }

  // card variant (used in contact page)
  return (
    <div
      className="bg-white dark:bg-[#2a1a28] rounded-2xl p-8 shadow-[0_8px_40px_rgba(47,28,44,0.07)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.25)] border border-black/[0.08] dark:border-brand-cream/[0.12]"
      {...engagementProps}
    >
      {rail(30)}
      {nav}
    </div>
  );
}
