'use client';

import { useEffect, useRef } from 'react';

/**
 * Playback controller for decorative, muted, looping video.
 *
 * Every such video on the site used to carry a literal `autoPlay` attribute (or
 * `autoPlay={!reduce}`, which is worse than it looks). Two problems:
 *
 *  1. `useReducedMotion()` resolves to `null` during SSR, so `autoPlay={!reduce}`
 *     rendered `!null === true` and the server shipped `autoplay` regardless of
 *     preference. The browser then began playing during parse, BEFORE hydration —
 *     and removing the attribute afterwards does not pause an element that is
 *     already playing.
 *  2. An unconditional `autoPlay` on a >5s looping video with no pause control is
 *     a WCAG 2.2.2 failure, and it burns battery on every offscreen video.
 *
 * So the attribute is never rendered. Playback is driven from here instead:
 * paused outright under reduced motion, otherwise playing only while onscreen.
 *
 * Attach the returned ref to the <video> and omit `autoPlay` entirely.
 */
export function useDecorativeVideo<T extends HTMLVideoElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // React does not serialize `muted` into SSR HTML (facebook/react#10389), and
    // an unmuted video is blocked from playing by Chrome and Safari, so set the
    // DOM property imperatively before any play attempt.
    node.muted = true;

    // Read the preference directly rather than through a hook, so there is no
    // server/client disagreement to reconcile in the first place.
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');

    let observer: IntersectionObserver | null = null;

    const teardown = () => {
      observer?.disconnect();
      observer = null;
    };

    const apply = () => {
      teardown();
      if (query.matches) {
        node.pause();
        try {
          node.currentTime = 0; // show the poster frame, not a frozen mid-motion one
        } catch {
          // Seeking before metadata loads can throw; harmless.
        }
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries[0]?.isIntersecting ?? false;
          if (visible) void node.play().catch(() => undefined);
          else node.pause();
        },
        { threshold: 0.1 },
      );
      observer.observe(node);
    };

    apply();
    // Honour a preference change made while the page is open.
    query.addEventListener('change', apply);
    return () => {
      query.removeEventListener('change', apply);
      teardown();
    };
  }, []);

  return ref;
}
