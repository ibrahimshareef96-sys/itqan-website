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
 * The TypeScript source is stripped to JS on the fly (types only, no
 * transforms) so there is nothing to keep in sync.
 */
import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import assert from 'node:assert/strict';

const REPO = resolve(new URL('..', import.meta.url).pathname);
const SRC = join(REPO, 'src', 'lib', 'brand-routing.ts');

/* Strip the TS-only syntax used in this file: type aliases, annotations and
   `export type`. Deliberately narrow — it only has to handle this one file. */
const ts = readFileSync(SRC, 'utf8');
const js = ts
  .replace(/export type BrandRoute =[\s\S]*?\| \{ kind: 'pass' \};/, '')
  .replace(/: Record<string, string>/g, '')
  .replace(/rawHost: string \| null,/, 'rawHost,')
  .replace(/pathname: string,/, 'pathname,')
  .replace(/search = '',\n\): BrandRoute \{/, "search = '') {");

const mod = await import(`data:text/javascript,${encodeURIComponent(js)}`);
const { resolveBrandRoute, SHAREEFICO_PORTAL } = mod;

const cases = [
  // [host, pathname, search, expected]
  ['brands.shareefi.co', '/', '', { kind: 'redirect-external', to: SHAREEFICO_PORTAL }],
  // The bug this table exists to prevent: without host-first routing on every
  // path, this would have served Itqan's portal under Shareefico's domain.
  [
    'brands.shareefi.co',
    '/brand/logo/clear-space',
    '',
    { kind: 'redirect-external', to: 'https://shareefi.co/brand/logo/clear-space' },
  ],
  ['brands.shareefi.co', '/work', '', { kind: 'redirect-external', to: SHAREEFICO_PORTAL }],
  ['brands.shareefi.co', '/brands', '', { kind: 'redirect-external', to: SHAREEFICO_PORTAL }],
  ['BRANDS.SHAREEFI.CO:443', '/', '', { kind: 'redirect-external', to: SHAREEFICO_PORTAL }],

  ['brands.itqanstudio.com', '/', '', { kind: 'rewrite', path: '/brand' }],
  ['brands.itqanstudio.com', '/brand/colour', '', { kind: 'pass' }],
  ['brands.itqanstudio.com', '/brands', '', { kind: 'redirect-internal', path: '/brand' }],

  ['itqanstudio.com', '/brands', '', { kind: 'redirect-internal', path: '/brand' }],
  ['itqanstudio.com', '/brands', '?x=1', { kind: 'redirect-internal', path: '/brand?x=1' }],
  ['itqanstudio.com', '/brands/itqan-studio', '', { kind: 'redirect-internal', path: '/brand' }],
  [
    'itqanstudio.com',
    '/brands/shareefico',
    '',
    { kind: 'redirect-external', to: SHAREEFICO_PORTAL },
  ],
  ['itqanstudio.com', '/brand', '', { kind: 'pass' }],
  ['itqanstudio.com', '/work', '', { kind: 'pass' }],
  ['itqanstudio.com', '/', '', { kind: 'pass' }],
  [null, '/', '', { kind: 'pass' }],
  // An unknown /brands/* child is not in the table and must not be invented.
  ['itqanstudio.com', '/brands/nope', '', { kind: 'pass' }],
];

let failed = 0;
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

console.log(`\n${cases.length - failed}/${cases.length} passed`);
process.exit(failed === 0 ? 0 : 1);
