/**
 * Brand-portal routing decisions, as a pure function.
 *
 * Kept free of `next/server` so it can be reasoned about — and tested — without
 * a bundler or a mocked NextRequest. `src/middleware.ts` is a thin adapter that
 * turns these decisions into NextResponse calls.
 *
 * The precedence between external redirect, legacy redirect and rewrite is not
 * obvious, which is exactly why it lives in one testable place.
 */

export const SHAREEFICO_PORTAL = 'https://shareefi.co/brand';

/** Hosts served by rewriting to a route in this app. */
const BRAND_HOSTS: Record<string, string> = {
  'brands.itqanstudio.com': '/brand',
};

/** Hosts that belong to another deployment entirely. */
const REDIRECT_HOSTS: Record<string, string> = {
  'brands.shareefi.co': SHAREEFICO_PORTAL,
};

/** Superseded paths from the previous single-scroll brands hub. */
const LEGACY_PATHS: Record<string, string> = {
  '/brands': '/brand',
  '/brands/itqan-studio': '/brand',
  '/brands/shareefico': SHAREEFICO_PORTAL,
};

export type BrandRoute =
  /** Send the client to another origin. `to` is always absolute. */
  | { kind: 'redirect-external'; to: string }
  /** Send the client to a path on THIS site. The origin is pinned by the caller. */
  | { kind: 'redirect-internal'; path: string }
  /** Serve a different route without changing the URL. */
  | { kind: 'rewrite'; path: string }
  | { kind: 'pass' };

export function resolveBrandRoute(
  rawHost: string | null,
  pathname: string,
  search = '',
): BrandRoute {
  const host = (rawHost ?? '').toLowerCase().split(':')[0];

  /*
   * Host routing runs FIRST and on every path. If it only ran on the legacy
   * paths, brands.shareefi.co/brand/logo would fall through and be served
   * Itqan's portal under Shareefico's domain.
   *
   * Only /brand* paths carry over: that host has only ever served the portal,
   * so any other path would land on a URL that does not exist at the
   * destination. Everything else goes to the portal root.
   */
  const redirectHost = REDIRECT_HOSTS[host];
  if (redirectHost) {
    // Exact `/brand` or a `/brand/` child — NOT a bare `startsWith`, which also
    // matches the legacy `/brands` and would send people to a URL that does not
    // exist at the destination.
    const isPortalPath = pathname === '/brand' || pathname.startsWith('/brand/');
    const to = isPortalPath
      ? new URL(`${pathname}${search}`, redirectHost).toString()
      : redirectHost;
    return { kind: 'redirect-external', to };
  }

  const legacy = LEGACY_PATHS[pathname];
  if (legacy) {
    return legacy.startsWith('http')
      ? { kind: 'redirect-external', to: legacy }
      : { kind: 'redirect-internal', path: `${legacy}${search}` };
  }

  const target = BRAND_HOSTS[host];
  if (target && (pathname === '/' || pathname === '')) {
    return { kind: 'rewrite', path: target };
  }

  return { kind: 'pass' };
}
