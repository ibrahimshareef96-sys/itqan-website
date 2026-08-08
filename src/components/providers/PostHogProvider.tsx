'use client';

import { Suspense, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { CONSENT_EVENT, hasAccepted } from '@/lib/consent';

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

/*
 * Consent is read through `@/lib/consent`, NOT a local copy of the parser. There
 * used to be a duplicate here whose `decodeURIComponent` was unguarded, while the
 * banner's copy had a try/catch. A malformed consent cookie therefore threw out of
 * this provider — which wraps the entire app — and took every route down with it.
 */

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
    /*
     * Consume the first render BEFORE the load check. When it came after,
     * a visitor who had not yet consented ran this effect with
     * `posthog.__loaded === false` and returned early WITHOUT consuming it —
     * consent-triggered init does not re-render this component — so the first
     * route they navigated to after accepting was swallowed as "the initial
     * render" and never captured.
     */
    const wasFirst = isFirstRender.current;
    isFirstRender.current = false;

    // posthog.init() captures the pageview for the route it loaded on.
    if (!posthog.__loaded || wasFirst) return;

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
