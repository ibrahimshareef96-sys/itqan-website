#!/usr/bin/env node
/**
 * Verify portal chrome AFTER hydration, in a real browser.
 *
 * The bug this guards against was invisible to curl: the server correctly
 * omitted the nav and footer, then React put them back on hydration because a
 * client-side `usePathname()` saw the un-rewritten browser URL. Only a real
 * browser, after JS runs, can tell the two states apart.
 *
 *     node scripts/check-portal-chrome.mjs <base-url> [hostHeader]
 */
import { chromium } from 'playwright';

const BASE = process.argv[2] ?? 'http://localhost:3222';
const HOST = process.argv[3];

/** [path, expectPortalChrome] */
const CASES = [
  ['/', Boolean(HOST)], // portal subdomain root is rewritten to /brand
  ['/brand', true],
  ['/brand/colour', true],
];

const browser = await chromium.launch();
const context = await browser.newContext(
  HOST ? { extraHTTPHeaders: { Host: HOST } } : {},
);
const page = await context.newPage();

const consoleErrors = [];
page.on('console', (m) => {
  if (m.type() === 'error') consoleErrors.push(m.text());
});

let failed = 0;
for (const [path, expectPortal] of CASES) {
  await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
  // Give hydration a beat to do the wrong thing, if it is going to.
  await page.waitForTimeout(700);

  const seen = await page.evaluate(() => ({
    siteNav: document.querySelectorAll('[aria-label="Primary navigation"], header.sticky.top-0.z-50').length,
    siteFooter: document.querySelectorAll('[aria-label="Site footer"], footer').length,
    portalSidebar: document.querySelectorAll('[aria-label="Brand portal contents"]').length,
    exitLink: document.querySelectorAll('a[href^="https://shareefi.co"], a[href^="https://itqanstudio.com"]').length,
  }));

  const ok = expectPortal
    ? seen.siteNav === 0 && seen.siteFooter === 0 && seen.portalSidebar > 0 && seen.exitLink > 0
    : seen.siteNav > 0;

  if (!ok) failed += 1;
  console.log(
    `  ${ok ? 'ok  ' : 'FAIL'} ${path.padEnd(16)} nav=${seen.siteNav} footer=${seen.siteFooter} sidebar=${seen.portalSidebar} exit=${seen.exitLink}`,
  );
}

// A hydration mismatch is the root cause of this whole class of bug, so treat
// one as a failure even when the rendered result happens to look right.
const hydrationErrors = consoleErrors.filter((e) => /hydrat|did not match/i.test(e));
if (hydrationErrors.length) {
  failed += 1;
  console.log(`  FAIL hydration mismatch: ${hydrationErrors[0].slice(0, 160)}`);
} else {
  console.log('  ok   no hydration mismatch');
}

await browser.close();
console.log(failed === 0 ? '\nchrome OK' : `\n${failed} failure(s)`);
process.exit(failed === 0 ? 0 : 1);
