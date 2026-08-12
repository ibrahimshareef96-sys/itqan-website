import { NextResponse } from 'next/server';

/**
 * Public, non-secret Umami tracker config.
 *
 * WHY THIS ROUTE EXISTS AT ALL
 * ----------------------------
 * Most of this site is statically generated at BUILD time. A `NEXT_PUBLIC_*`
 * variable is inlined into the bundle during that build, so if the value is
 * absent when the image is built, the tracker is baked in as "absent" and stays
 * absent for the life of that deploy — restarting with the variable set changes
 * nothing. That is exactly the trap documented in ANALYTICS-SETUP.md for the
 * PostHog key ("after setting them you must rebuild, not just restart").
 *
 * `force-dynamic` makes this one tiny handler read the environment at REQUEST
 * time instead. The client loader fetches it and injects the script tag, so
 * turning analytics on or off is an env change plus a restart — no rebuild, no
 * redeploy of the app image.
 *
 * NOT SECRET: a Umami website id is a public identifier that ships in the page
 * source of every site using it, exactly like a Google Analytics measurement id.
 * There is nothing here an attacker could not read from the rendered HTML.
 *
 * Returns `{}` when unconfigured (local dev, CI, and any environment before the
 * Umami instance exists) — the loader then does nothing and makes zero network
 * calls beyond this one.
 */
export const dynamic = 'force-dynamic';

export function GET(): NextResponse {
  const scriptUrl = process.env.UMAMI_SCRIPT_URL;
  const websiteId = process.env.UMAMI_WEBSITE_ID;

  const body = scriptUrl && websiteId ? { scriptUrl, websiteId } : {};

  return NextResponse.json(body, {
    // Cached 5 minutes at the CDN edge and in the browser, so this adds
    // essentially nothing per page view. The trade-off is that toggling
    // analytics takes up to 5 minutes to reach every visitor, which is the
    // right side of the trade for a config that changes ~never.
    headers: { 'Cache-Control': 'public, max-age=300, s-maxage=300' },
  });
}
