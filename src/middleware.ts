import { NextRequest, NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/seo';
import { resolveBrandRoute } from '@/lib/brand-routing';
import { PORTAL_HEADER, isPortalRequest } from '@/lib/portal-chrome';

/**
 * Brand-portal host routing — the brand.uber.com model.
 *
 *   brands.itqanstudio.com  →  /brand            (rewritten, served here)
 *   brands.shareefi.co      →  shareefi.co/brand (redirected, served elsewhere)
 *
 * All decisions live in `@/lib/brand-routing` so they can be tested without a
 * mocked NextRequest (`npm run test:routing`). This file only turns a decision
 * into a response.
 */
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const route = resolveBrandRoute(req.headers.get('host'), pathname, search);

  switch (route.kind) {
    case 'redirect-external':
      return NextResponse.redirect(route.to, 308);

    /*
     * Internal redirects are built against a PINNED origin, never `req.nextUrl`.
     *
     * `nextUrl` derives its origin from the Host header. Echoing that back into
     * a 308 means a spoofed Host (a default vhost, or a path-keyed cache in
     * front) yields a permanent, browser-cacheable redirect from a trusted path
     * to an attacker's origin — and 308 makes that stick.
     */
    case 'redirect-internal':
      return NextResponse.redirect(new URL(route.path, SITE_URL), 308);

    case 'rewrite': {
      // Safe to clone: a rewrite is resolved server-side and never sends an
      // origin back to the client.
      const url = req.nextUrl.clone();
      url.pathname = route.path;
      // Flag it as a portal request. This is the ONLY place the portal host is
      // still visible — after the rewrite the client sees "/positioning" and
      // cannot tell it is on the portal. See lib/portal-chrome.ts.
      return NextResponse.rewrite(url, { request: { headers: portalHeaders(req) } });
    }

    default:
      // `/brand` and below on the apex is also the portal, reached from the
      // site nav rather than the subdomain. Flag it too, so one signal covers
      // both entry points and the layout needs only one check.
      if (isPortalRequest(req.headers.get('host'), pathname)) {
        return NextResponse.next({ request: { headers: portalHeaders(req) } });
      }
      return NextResponse.next();
  }
}

/** Clone the request headers with the portal flag set. */
function portalHeaders(req: NextRequest): Headers {
  const headers = new Headers(req.headers);
  headers.set(PORTAL_HEADER, '1');
  return headers;
}

export const config = {
  /*
   * Everything except framework internals and static files. Host routing has to
   * see every path (see brand-routing), which a path-scoped matcher cannot do.
   */
  matcher: ['/((?!_next/static|_next/image|api/|favicon.ico|.*\\.[\\w]+$).*)'],
};
