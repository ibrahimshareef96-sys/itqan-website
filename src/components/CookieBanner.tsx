'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ACCEPT_DAYS,
  CONSENT_EVENT,
  CONSENT_KEY,
  DECLINE_DAYS,
  readConsent,
  writeConsent,
} from '@/lib/consent';

// Re-exported so existing importers keep working; the definitions now live in
// one place (src/lib/consent.ts) alongside the parser.
export { CONSENT_KEY, CONSENT_EVENT };

/** Matches the exit transform duration below; the card unmounts after it. */
const EXIT_MS = 360;

export function CookieBanner() {
  /** `present` = in the DOM at all. `visible` = animated in. */
  const [present, setPresent] = useState(false);
  const [visible, setVisible] = useState(false);
  /**
   * Whether the card has actually finished entering. The exit effect below
   * cannot tell "not yet entered" from "exiting" by state alone, and arming the
   * unmount timer during the pre-entry commit is a live bug: a hidden tab never
   * runs requestAnimationFrame but DOES run setTimeout, so the 360ms timer wins
   * and the card deletes itself before it is ever seen. Anyone who opens the
   * site in a background tab (cmd-click from search, session restore) would
   * never get a consent surface for that whole page load.
   */
  const entered = useRef(false);
  /** Focus is moved here on dismiss so keyboard users are not dropped to body. */
  const restoreFocusTo = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (readConsent()) return;
    restoreFocusTo.current = (document.activeElement as HTMLElement) ?? null;
    setPresent(true);
    const raf = requestAnimationFrame(() => {
      entered.current = true;
      setVisible(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Unmount once the exit transition has played. Leaving the card mounted at
  // opacity 0 left an invisible, still-clickable strip across the bottom of
  // every page — `opacity: 0` does not disable pointer events.
  useEffect(() => {
    if (visible || !present || !entered.current) return;
    const id = setTimeout(() => setPresent(false), EXIT_MS);
    return () => clearTimeout(id);
  }, [visible, present]);

  /**
   * Move focus somewhere deliberate before the node leaves the DOM.
   *
   * `document.activeElement` on mount is normally `<body>`, which is technically
   * "in the document" but is not a focus destination — sending focus there drops
   * a keyboard user back to the very start of the page. Body and <html> are
   * therefore rejected in favour of the main landmark.
   */
  const dismiss = (value: 'accepted' | 'declined'): void => {
    writeConsent(value, value === 'accepted' ? ACCEPT_DAYS : DECLINE_DAYS);

    const saved = restoreFocusTo.current;
    const savedIsUsable =
      !!saved &&
      saved !== document.body &&
      saved !== document.documentElement &&
      document.contains(saved);

    const target = savedIsUsable ? saved : document.querySelector<HTMLElement>('main');
    if (target) {
      if (!target.hasAttribute('tabindex') && !target.matches('a[href], button, input, select, textarea')) {
        target.setAttribute('tabindex', '-1');
      }
      target.focus({ preventScroll: true });
    }
    // If focus still sits inside the card, drop it rather than leave it in a
    // subtree that is about to become inert and then disappear.
    if (document.activeElement && cardRef.current?.contains(document.activeElement)) {
      (document.activeElement as HTMLElement).blur();
    }
    setVisible(false);
  };

  if (!present) return null;

  /*
   * A small floating card, not a full-width bar. The bar spanned the viewport
   * and sat on top of the hero's primary CTA on a 390px screen — the one control
   * the page exists to get pressed.
   *
   * z-40, deliberately BELOW the mobile nav sheet's z-50 overlay: at z-60 this
   * card painted over the open menu and covered its "Start a conversation" CTA,
   * so the sheet's own primary action was unclickable while consent was pending.
   * The sheet's scrim now covers the card instead, which is the correct
   * modal stacking.
   */
  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-40 pointer-events-none px-3 pb-3"
      style={{
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(12%) scale(0.97)',
        opacity: visible ? 1 : 0,
        transition: `transform ${EXIT_MS - 20}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease-out`,
      }}
    >
      {/* A full border, not the old bar's `border-t`: on a rounded floating card
          a lone top edge reads as a leftover seam. `inert` while not visible so
          the exiting card is unreachable by pointer AND by keyboard. */}
      <div
        ref={cardRef}
        {...(visible ? {} : { inert: true })}
        className={`material-chrome w-full sm:max-w-[520px] rounded-2xl border border-white/80 dark:border-brand-cream/10 bg-brand-cream/78 dark:bg-[#1a0e18]/82 shadow-[0_18px_50px_-20px_rgba(47,28,44,0.45)] ${
          visible ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="flex flex-row items-center justify-between gap-3 px-4 py-3">
          {/* Vibrancy: over a translucent surface whose backdrop changes with the
              page behind it, flat grey body text loses legibility. Higher
              contrast, slightly heavier weight and a small tracking bump — not
              more opacity — is what keeps it readable. */}
          <p className="font-sans font-medium text-[0.8125rem] tracking-[0.005em] text-text-primary dark:text-brand-cream leading-snug">
            We use cookies.{' '}
            <Link
              href="/cookies"
              className="text-brand-accent-on-light dark:text-brand-accent underline underline-offset-4 decoration-1 hover:text-brand-dark dark:hover:text-brand-cream transition-colors duration-200"
            >
              Cookie Policy
            </Link>
          </p>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => dismiss('declined')}
              className="press-scale font-sans font-medium text-[0.8125rem] h-[34px] px-4 rounded-full border border-black/[0.18] text-text-secondary hover:text-brand-dark hover:border-black/40 dark:border-[rgba(255,251,245,0.25)] dark:text-brand-cream/85 dark:hover:text-brand-cream dark:hover:border-brand-cream/55"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={() => dismiss('accepted')}
              className="press-scale font-sans font-semibold text-[0.8125rem] h-[34px] px-4 rounded-full bg-brand-dark text-brand-cream dark:bg-brand-accent dark:text-brand-dark"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
