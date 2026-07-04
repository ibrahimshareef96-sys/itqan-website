'use client';

import { Suspense, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { CONSENT_EVENT, CONSENT_KEY } from '@/components/CookieBanner';

/**
 * Privacy-first PostHog wiring.
 *
 * Analytics load ONLY when both are true:
 *   1. NEXT_PUBLIC_POSTHOG_KEY is present (absent in local/dev by default → zero network).
 *   2. The visitor has ACCEPTED cookies via CookieBanner (GDPR-style opt-in).
 *
 * Consent is the same key CookieBanner writes (cookie first, then localStorage). We react
 * to consent changes without polling: the banner fires CONSENT_EVENT in the current tab,
 * and the 'storage' event covers other tabs. Do Not Track is respected at init.
 * EU cloud host by default keeps data in-region (GCC/EU residency).
 */

const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com';

/** Reads consent the same way CookieBanner does: cookie first, then localStorage. */
function readConsent(): string | null {
  if (typeof document !== 'undefined') {
    for (const cookie of document.cookie.split('; ')) {
      const [name, value] = cookie.split('=');
      if (name === CONSENT_KEY && value) return decodeURIComponent(value);
    }
  }
  if (typeof window !== 'undefined') {
    try {
      return window.localStorage.getItem(CONSENT_KEY);
    } catch {
      return null;
    }
  }
  return null;
}

function hasAccepted(): boolean {
  return readConsent() === 'accepted';
}

/** Idempotent: initialize the posthog-js singleton at most once, only after consent. */
function initPostHog(): void {
  if (!POSTHOG_KEY || posthog.__loaded) return;

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    // Auto-capture the first pageview on load; SPA route changes are captured manually below.
    capture_pageview: true,
    capture_pageleave: true,
    // Only reached after opt-in, so it is safe to persist across sessions.
    persistence: 'localStorage+cookie',
    // Honour the browser's Do Not Track signal even if the user accepted cookies.
    respect_dnt: true,
  });
}

/**
 * Captures SPA pageviews on client-side route changes. PostHog's own capture_pageview
 * already fired the initial load, so we skip the first render to avoid double-counting.
 *
 * Reads useSearchParams(), so it is rendered inside a <Suspense> boundary — otherwise
 * every page opts out of static rendering (Next.js App Router requirement).
 */
function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!posthog.__loaded) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    posthog.capture('$pageview', { $current_url: window.location.origin + url });
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  // No key → analytics fully disabled: no init, no listeners, no pageview tracker.
  const enabled = Boolean(POSTHOG_KEY);

  useEffect(() => {
    if (!enabled) return;

    // If consent was already given (returning visitor), load immediately.
    if (hasAccepted()) initPostHog();

    const handleConsentChange = (): void => {
      if (hasAccepted()) {
        initPostHog();
        // Re-opt-in in case the user previously declined then accepted.
        if (posthog.__loaded) posthog.opt_in_capturing();
      } else if (posthog.__loaded) {
        // Declined after loading → stop all capture and clear persisted data.
        posthog.opt_out_capturing();
      }
    };

    // Same-tab: custom event from CookieBanner. Cross-tab: native storage event.
    window.addEventListener(CONSENT_EVENT, handleConsentChange);
    window.addEventListener('storage', handleConsentChange);

    return () => {
      window.removeEventListener(CONSENT_EVENT, handleConsentChange);
      window.removeEventListener('storage', handleConsentChange);
    };
  }, [enabled]);

  return (
    <>
      {enabled && (
        <Suspense fallback={null}>
          <PostHogPageview />
        </Suspense>
      )}
      {children}
    </>
  );
}
