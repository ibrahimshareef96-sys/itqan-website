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
    if (name === CONSENT_KEY && value) return decodeURIComponent(value);
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

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const existing = readConsentFromCookie() ?? readConsentFromStorage();
    if (!existing) {
      setVisible(true);
    }
  }, []);

  const handleAccept = (): void => {
    writeConsent('accepted', ACCEPT_DAYS);
    setVisible(false);
  };

  const handleDecline = (): void => {
    writeConsent('declined', DECLINE_DAYS);
    setVisible(false);
  };

  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[60] pointer-events-none"
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        opacity: visible ? 1 : 0,
        transition: 'transform 300ms ease-out, opacity 300ms ease-out',
      }}
    >
      <div className="w-full border-t border-black/[0.08] dark:border-brand-cream/[0.08] bg-brand-cream dark:bg-[#1a0e18] shadow-[0_-2px_16px_rgba(47,28,44,0.06)] dark:shadow-none pointer-events-auto">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-sans font-normal text-[0.875rem] text-text-secondary dark:text-brand-cream/75 leading-relaxed max-w-[60ch]">
            We use cookies to improve your experience. By continuing, you accept our{' '}
            <Link
              href="/cookies"
              className="text-brand-accent-on-light dark:text-brand-accent underline underline-offset-4 decoration-1 hover:text-brand-dark dark:hover:text-brand-cream transition-colors duration-200"
            >
              Cookie Policy
            </Link>
            .
          </p>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={handleDecline}
              className="font-sans font-medium text-[0.875rem] h-[40px] px-5 border border-black/[0.2] text-text-secondary hover:text-brand-dark hover:border-black/40 dark:border-[rgba(255,251,245,0.25)] dark:text-brand-cream/85 dark:hover:text-brand-cream dark:hover:border-brand-cream/55 transition-colors duration-200"
              style={{ borderRadius: 0 }}
            >
              Decline
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="font-sans font-semibold text-[0.875rem] h-[40px] px-5 bg-brand-dark text-brand-cream dark:bg-brand-accent dark:text-brand-dark hover:opacity-90 transition-opacity duration-200"
              style={{ borderRadius: 0 }}
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
