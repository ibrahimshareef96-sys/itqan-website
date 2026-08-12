/**
 * Single source of truth for cookie consent.
 *
 * This used to be two copies of the same parser — one in CookieBanner, one in
 * PostHogProvider — and they drifted: the banner's copy got a try/catch around
 * `decodeURIComponent` and the provider's did not. A malformed consent cookie
 * (hand-edited, truncated by a proxy, or a stray `%` from another writer on the
 * domain) therefore threw out of the provider, which wraps the whole app, and
 * took every route down with it. One parser, one guard.
 */

export const CONSENT_KEY = 'itqan_cookie_consent';

/**
 * Same-tab consent signal. localStorage's `storage` event only fires in OTHER
 * tabs, so the analytics provider listens for this custom event to react to
 * Accept/Decline in the current tab without polling.
 */
export const CONSENT_EVENT = 'itqan:cookie-consent';

export type ConsentValue = 'accepted' | 'declined';

export const ACCEPT_DAYS = 365;
export const DECLINE_DAYS = 30;

/**
 * Shape written to localStorage since 2026-08. Plain strings are the legacy form
 * and are treated as expired on read (see `readFromStorage`).
 */
interface StoredConsent {
  v: ConsentValue;
  exp: number;
}

function isConsentValue(v: unknown): v is ConsentValue {
  return v === 'accepted' || v === 'declined';
}

function readFromCookie(): ConsentValue | null {
  if (typeof document === 'undefined') return null;
  for (const cookie of document.cookie.split('; ')) {
    const [name, ...rest] = cookie.split('=');
    if (name !== CONSENT_KEY) continue;
    const raw = rest.join('=');
    if (!raw) continue;
    let decoded: string;
    try {
      decoded = decodeURIComponent(raw);
    } catch {
      // Malformed percent-encoding must never throw out of a render path.
      return null;
    }
    return isConsentValue(decoded) ? decoded : null;
  }
  return null;
}

function readFromStorage(): ConsentValue | null {
  if (typeof window === 'undefined') return null;
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(CONSENT_KEY);
  } catch {
    // Private mode / storage disabled.
    return null;
  }
  if (!raw) return null;

  const drop = (): null => {
    try {
      window.localStorage.removeItem(CONSENT_KEY);
    } catch {
      // Best effort — an unremovable entry is still treated as absent.
    }
    return null;
  };

  /*
   * A legacy plain-string entry (pre-TTL) carries no expiry, and this store is
   * only ever consulted when the COOKIE is already gone — which means the
   * 365/30-day window it was granted under has itself lapsed or the cookie was
   * blocked. Honouring it forever would make consent permanent, so it is treated
   * as expired: the visitor is asked once more. That is the conservative
   * direction for a consent record.
   */
  if (isConsentValue(raw)) return drop();

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return drop();
  }

  const record = parsed as Partial<StoredConsent> | null;
  if (!record || !isConsentValue(record.v)) return drop();

  // A missing, non-numeric, NaN or Infinity expiry must NOT read as "valid
  // forever" — an unbounded record is exactly the compliance failure the TTL
  // exists to prevent.
  if (!Number.isFinite(record.exp) || Date.now() > (record.exp as number)) return drop();

  return record.v;
}

/** Cookie first, then the localStorage fallback. Never throws. */
export function readConsent(): ConsentValue | null {
  return readFromCookie() ?? readFromStorage();
}

export function hasAccepted(): boolean {
  return readConsent() === 'accepted';
}

/**
 * Persist a choice to both stores and notify this tab. The localStorage copy
 * carries the same TTL as the cookie, so a cleared cookie cannot resurrect a
 * consent decision that should already have expired.
 */
export function writeConsent(value: ConsentValue, days: number): void {
  const maxAgeSeconds = days * 24 * 60 * 60;
  try {
    document.cookie = `${CONSENT_KEY}=${encodeURIComponent(
      value,
    )}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
  } catch {
    // Cookie write failed — the localStorage copy below is the fallback.
  }
  try {
    const payload: StoredConsent = { v: value, exp: Date.now() + days * 86400_000 };
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(payload));
  } catch {
    // localStorage unavailable (private mode) — the cookie is the fallback.
  }
  try {
    window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }));
  } catch {
    // CustomEvent unsupported — the provider still picks consent up on next mount.
  }
}
