#!/usr/bin/env node
/**
 * Tests for the brand-portal routing table.
 *
 * No test framework: this repo has none, and adding vitest to assert a lookup
 * table would be more machinery than the thing it guards. `resolveBrandRoute`
 * is pure and dependency-free, so plain assertions are enough.
 *
 *     npm run test:routing
 *
 * The module under test is imported as TypeScript; Node strips the types.
 */
import assert from 'node:assert/strict';

/*
 * Imported as TypeScript directly — Node strips the types itself.
 *
 * This used to hand-roll a regex stripper, which broke the moment the module
 * grew a function signature the regexes had not anticipated. A test harness
 * that fails on a change unrelated to what it tests is worse than no harness.
 */
const { resolveBrandRoute, SHAREEFICO_PORTAL } = await import(
  '../src/lib/brand-routing.ts'
);
// isPortalRequest lives with the chrome decision it feeds, not with the URL
// table — but it is tested here because it shares the host-matching rules.
const { isPortalRequest } = await import('../src/lib/portal-chrome.ts');

const ITQAN_PORTAL = 'https://brand.itqanstudio.com';

const cases = [
  // [host, pathname, search, expected]

  /* ── Shareefico's portal lives in another deployment ──────────────────── */
  ['brand.shareefi.co', '/', '', { kind: 'redirect-external', to: SHAREEFICO_PORTAL }],
  ['brands.shareefi.co', '/', '', { kind: 'redirect-external', to: SHAREEFICO_PORTAL }],
  // The bug this table exists to prevent: without host-first routing on every
  // path, this would have served Itqan's portal under Shareefico's domain.
  [
    'brand.shareefi.co',
    '/brand/logo/clear-space',
    '',
    { kind: 'redirect-external', to: 'https://shareefi.co/brand/logo/clear-space' },
  ],
  [
    'brands.shareefi.co',
    '/brand/logo/clear-space',
    '',
    { kind: 'redirect-external', to: 'https://shareefi.co/brand/logo/clear-space' },
  ],
  ['brands.shareefi.co', '/work', '', { kind: 'redirect-external', to: SHAREEFICO_PORTAL }],
  // `/brands` must NOT be treated as a portal path — /brands does not exist at
  // the destination, only /brand does.
  ['brands.shareefi.co', '/brands', '', { kind: 'redirect-external', to: SHAREEFICO_PORTAL }],
  ['BRANDS.SHAREEFI.CO:443', '/', '', { kind: 'redirect-external', to: SHAREEFICO_PORTAL }],

  /* ── The canonical Itqan portal host is SINGULAR ──────────────────────── */
  ['brand.itqanstudio.com', '/', '', { kind: 'rewrite', path: '/brand' }],
  ['brand.itqanstudio.com', '/brand/colour', '', { kind: 'pass' }],
  ['brand.itqanstudio.com', '/brands', '', { kind: 'redirect-internal', path: '/brand' }],
  ['BRAND.ITQANSTUDIO.COM:443', '/', '', { kind: 'rewrite', path: '/brand' }],

  /* ── The plural is superseded: 308 to the singular, path preserved ────── */
  ['brands.itqanstudio.com', '/', '', { kind: 'redirect-external', to: ITQAN_PORTAL }],
  [
    'brands.itqanstudio.com',
    '/brand/colour',
    '',
    { kind: 'redirect-external', to: `${ITQAN_PORTAL}/brand/colour` },
  ],
  ['brands.itqanstudio.com', '/brands', '', { kind: 'redirect-external', to: ITQAN_PORTAL }],

  ['itqanstudio.com', '/brands', '', { kind: 'redirect-internal', path: '/brand' }],
  ['itqanstudio.com', '/brands', '?x=1', { kind: 'redirect-internal', path: '/brand?x=1' }],
  ['itqanstudio.com', '/brands/itqan-studio', '', { kind: 'redirect-internal', path: '/brand' }],
  [
    'itqanstudio.com',
    '/brands/shareefico',
    '',
    { kind: 'redirect-external', to: SHAREEFICO_PORTAL },
  ],
  /* ── The client-testimonial form rides the same host-rewrite mechanism ── */
  ['feedback.itqanstudio.com', '/', '', { kind: 'rewrite', path: '/feedback' }],
  ['FEEDBACK.ITQANSTUDIO.COM:443', '/', '', { kind: 'rewrite', path: '/feedback' }],
  // Non-root paths on the feedback host pass through, same contract as the
  // brand host — only the root is rewritten.
  ['feedback.itqanstudio.com', '/feedback', '', { kind: 'pass' }],
  ['feedback.itqanstudio.com', '/work', '', { kind: 'pass' }],
  // The path also works on the apex, with chrome.
  ['itqanstudio.com', '/feedback', '', { kind: 'pass' }],

  ['itqanstudio.com', '/brand', '', { kind: 'pass' }],
  ['itqanstudio.com', '/work', '', { kind: 'pass' }],
  ['itqanstudio.com', '/', '', { kind: 'pass' }],
  [null, '/', '', { kind: 'pass' }],
  // An unknown /brands/* child is not in the table and must not be invented.
  ['itqanstudio.com', '/brands/nope', '', { kind: 'pass' }],
];

/*
 * isPortalRequest decides whether the root layout renders site chrome. Getting
 * it wrong shows the nav on the portal or strips it from the marketing site,
 * and neither failure is visible in resolveBrandRoute's output.
 */
const portalCases = [
  ['brand.itqanstudio.com', '/', true],
  ['brand.itqanstudio.com', '/anything', true],
  ['BRAND.ITQANSTUDIO.COM:443', '/', true],
  ['itqanstudio.com', '/brand', true],
  ['itqanstudio.com', '/brand/colour/pairings', true],
  ['itqanstudio.com', '/', false],
  ['itqanstudio.com', '/work', false],
  // `/brands` is the legacy hub, not the portal — it must not suppress chrome.
  ['itqanstudio.com', '/brands', false],
  ['itqanstudio.com', '/branding', false],
  [null, '/brand', true],
  [null, '/work', false],
];

let failed = 0;

for (const [host, pathname, expected] of portalCases) {
  const actual = isPortalRequest(host, pathname);
  if (actual === expected) {
    console.log(`  ok   isPortalRequest ${host ?? '(no host)'}${pathname} = ${expected}`);
  } else {
    failed += 1;
    console.error(
      `  FAIL isPortalRequest ${host ?? '(no host)'}${pathname} — expected ${expected}, got ${actual}`,
    );
  }
}

for (const [host, pathname, search, expected] of cases) {
  const actual = resolveBrandRoute(host, pathname, search);
  try {
    assert.deepEqual(actual, expected);
    console.log(`  ok   ${host ?? '(no host)'}${pathname}${search}`);
  } catch {
    failed += 1;
    console.error(`  FAIL ${host ?? '(no host)'}${pathname}${search}`);
    console.error(`       expected ${JSON.stringify(expected)}`);
    console.error(`       actual   ${JSON.stringify(actual)}`);
  }
}

const total = cases.length + portalCases.length;
console.log(`\n${total - failed}/${total} passed`);
process.exit(failed === 0 ? 0 : 1);
