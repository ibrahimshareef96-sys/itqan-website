import { NextRequest, NextResponse } from 'next/server';

/**
 * Brand-portal subdomains — the brand.uber.com model. Each brand's portal is
 * served from this app, host-routed:
 *
 *   brands.itqanstudio.com  →  /brands/itqan-studio
 *   brands.shareefi.co      →  /brands/shareefico
 *
 * Only the root path is rewritten; assets, downloads and _next resolve on
 * their normal paths from the same deployment. The path routes keep working
 * on the main host, so the portals are reachable before DNS even lands.
 */
const BRAND_HOSTS: Record<string, string> = {
  'brands.itqanstudio.com': '/brands/itqan-studio',
  'brands.shareefi.co': '/brands/shareefico',
};

export function middleware(req: NextRequest) {
  const host = (req.headers.get('host') ?? '').toLowerCase().split(':')[0];
  const target = BRAND_HOSTS[host];
  if (!target) return NextResponse.next();

  const { pathname } = req.nextUrl;
  if (pathname === '/' || pathname === '') {
    const url = req.nextUrl.clone();
    url.pathname = target;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  // Root only — everything else (assets, /_next, /brands/*) passes through.
  matcher: ['/'],
};
