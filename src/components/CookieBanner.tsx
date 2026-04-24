'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const CONSENT_KEY = 'itqan_cookie_consent';
const ACCEPT_DAYS = 365;
const DECLINE_DAYS = 30;

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
      <div
        className="w-full border-t pointer-events-auto"
        style={{
          backgroundColor: '#1a0e18',
          borderTopColor: 'rgba(255,251,245,0.08)',
        }}
      >
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-sans font-normal text-[0.875rem] text-brand-cream/75 leading-relaxed max-w-[60ch]">
            We use cookies to improve your experience. By continuing, you accept our{' '}
            <Link
              href="/cookies"
              className="text-brand-accent underline underline-offset-4 decoration-1 hover:text-brand-cream transition-colors duration-200"
            >
              Cookie Policy
            </Link>
            .
          </p>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              type="button"
              onClick={handleDecline}
              className="font-sans font-medium text-[0.875rem] h-[40px] px-5 border border-[rgba(255,251,245,0.25)] text-brand-cream/85 hover:text-brand-cream hover:border-brand-cream/55 transition-colors duration-200"
              style={{ borderRadius: 0 }}
            >
              Decline
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="font-sans font-semibold text-[0.875rem] h-[40px] px-5 bg-brand-accent text-brand-dark hover:opacity-90 transition-opacity duration-200"
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
