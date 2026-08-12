import { NextRequest, NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/seo';
import { resolveBrandRoute } from '@/lib/brand-routing';

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
      return NextResponse.rewrite(url);
    }

    default:
      return NextResponse.next();
  }
}

export const config = {
  /*
   * Everything except framework internals and static files. Host routing has to
   * see every path (see brand-routing), which a path-scoped matcher cannot do.
   */
  matcher: ['/((?!_next/static|_next/image|api/|favicon.ico|.*\\.[\\w]+$).*)'],
};
