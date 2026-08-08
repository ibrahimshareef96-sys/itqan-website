import type Lenis from 'lenis';

/**
 * Module-level handle on the Lenis instance.
 *
 * Why this exists: `document.body.style.overflow = 'hidden'` does NOT stop Lenis.
 * Lenis listens for wheel/touch events and drives scroll by writing a transform,
 * so with the mobile nav sheet open the page still scrolled underneath it on a
 * trackpad or a wheel. The lock has to tell Lenis to stop, not just tell the
 * document not to overflow.
 *
 * A module singleton rather than a React context: the provider sits at the root
 * of the tree and the only consumers are scroll locks in overlays, so threading
 * a context through every layer would buy nothing.
 */
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null): void {
  instance = next;
}

/** Pause smooth scrolling (no-op when Lenis is absent, e.g. reduced motion). */
export function pauseSmoothScroll(): void {
  instance?.stop();
}

/** Resume smooth scrolling. */
export function resumeSmoothScroll(): void {
  instance?.start();
}
