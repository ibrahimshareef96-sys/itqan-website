'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { setLenis } from '@/lib/smooth-scroll';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion — fall back to native scroll
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      lerp: 0.085,
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    // Published so overlays can actually pause scrolling — body overflow alone
    // does not stop Lenis (see src/lib/smooth-scroll.ts).
    setLenis(lenis);

    /*
     * The frame loop must be cancellable. Previously cleanup destroyed Lenis but
     * left the recursive rAF running, so every remount (a navigation teardown, or
     * Strict Mode in development) accumulated another permanent loop calling
     * `raf()` on a destroyed instance — CPU burned forever and a live crash risk.
     */
    let frame = 0;
    let disposed = false;

    function raf(time: number) {
      if (disposed) return;
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }

    frame = requestAnimationFrame(raf);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  return <>{children}</>;
}
