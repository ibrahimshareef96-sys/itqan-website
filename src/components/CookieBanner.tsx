'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export const CONSENT_KEY = 'itqan_cookie_consent';
const ACCEPT_DAYS = 365;
const DECLINE_DAYS = 30;

/**
 * Same-tab consent signal. localStorage's 'storage' event only fires in OTHER tabs,
 * so the analytics provider (PostHogProvider) listens for this custom event to react
 * to Accept/Decline in the current tab without polling. Logic-preserving: dispatch only.
 */
export const CONSENT_EVENT = 'itqan:cookie-consent';

type ConsentValue = 'accepted' | 'declined';

function readConsentFromCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === CONSENT_KEY && value) {
      try {
        return decodeURIComponent(value);
      } catch {
        // A malformed percent-encoded cookie (hand-edited, or truncated) must not
        // throw out of the mount effect — that would replace the consent prompt
        // with a crashed component. Treat it as no consent on record.
        return null;
      }
    }
  }
  return null;
}

function readConsentFromStorage(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

function writeConsent(value: ConsentValue, days: number): void {
  const maxAgeSeconds = days * 24 * 60 * 60;
  try {
    document.cookie = `${CONSENT_KEY}=${encodeURIComponent(
      value,
    )}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
  } catch {
    // Cookie write failed — fall through to localStorage below
  }
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // localStorage unavailable (private mode) — cookie is the fallback
  }
  try {
    // Same-tab notification for analytics consent gating (see CONSENT_EVENT).
    window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
  } catch {
    // CustomEvent unsupported (very old UA) — provider still catches consent on next mount
  }
}

/** Matches the exit transform duration below; the card unmounts after it. */
const EXIT_MS = 360;

export function CookieBanner() {
  /** `present` = in the DOM at all. `visible` = animated in. */
  const [present, setPresent] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = readConsentFromCookie() ?? readConsentFromStorage();
    if (existing) return;
    setPresent(true);
    // Mount at the "out" position first, then animate in on the next frame.
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  /*
   * Unmount once the exit transition has played. Leaving the card mounted at
   * opacity 0 left an INVISIBLE, still-clickable 60px strip across the bottom of
   * every page for every returning visitor — `opacity: 0` does not disable
   * pointer events, and the inner card re-asserted `pointer-events-auto`. It also
   * stayed exposed to assistive technology. Verified before the fix:
   * `elementFromPoint` at the card's centre returned an element inside the banner.
   */
  useEffect(() => {
    if (visible || !present) return;
    const id = setTimeout(() => setPresent(false), EXIT_MS);
    return () => clearTimeout(id);
  }, [visible, present]);

  const handleAccept = (): void => {
    writeConsent('accepted', ACCEPT_DAYS);
    setVisible(false);
  };

  const handleDecline = (): void => {
    writeConsent('declined', DECLINE_DAYS);
    setVisible(false);
  };

  if (!present) return null;

  /*
   * A small floating card, not a full-width bar. The bar spanned the viewport and
   * sat on top of the hero's primary CTA on a 390px screen — the one control the
   * page exists to get pressed. This card is a single compact row anchored to the
   * bottom-left, so it clears the CTA, and it reads as a lighter layer floating
   * over the page rather than a structural strip bolted to it.
   *
   * It materializes (blur + scale together) rather than plain-sliding, so it
   * arrives as a piece of glass instead of a rectangle on rails.
   */
  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      aria-hidden={!visible}
      className="fixed inset-x-0 bottom-0 z-[60] pointer-events-none px-3 pb-3"
      style={{
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(12%) scale(0.97)',
        opacity: visible ? 1 : 0,
        transition: `transform ${EXIT_MS - 20}ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease-out`,
      }}
    >
      {/* A full border, not the old bar's `border-t`: on a rounded floating card
          a lone top edge reads as a leftover seam. */}
      {/* `pointer-events` is gated on `visible`, not just on mount: during the
          exit transition the card is still painted but must stop taking clicks. */}
      <div
        className={`material-chrome w-full sm:max-w-[520px] rounded-2xl border border-white/80 dark:border-brand-cream/10 bg-brand-cream/78 dark:bg-[#1a0e18]/82 shadow-[0_18px_50px_-20px_rgba(47,28,44,0.45)] ${
          visible ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="flex flex-row items-center justify-between gap-3 px-4 py-3">
          <p className="font-sans font-normal text-[0.8125rem] text-text-secondary dark:text-brand-cream/80 leading-snug">
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
              onClick={handleDecline}
              className="press-scale font-sans font-medium text-[0.8125rem] h-[34px] px-4 rounded-full border border-black/[0.18] text-text-secondary hover:text-brand-dark hover:border-black/40 dark:border-[rgba(255,251,245,0.25)] dark:text-brand-cream/85 dark:hover:text-brand-cream dark:hover:border-brand-cream/55"
            >
              Decline
            </button>
            <button
              type="button"
              onClick={handleAccept}
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
