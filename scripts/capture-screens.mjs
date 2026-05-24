#!/usr/bin/env node
/**
 * Capture full-page screenshots of key routes at desktop + mobile.
 * Outputs PNGs to /tmp/itqan-screens/.
 * Usage: node scripts/capture-screens.mjs
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const OUT_DIR = '/tmp/itqan-screens';
const BASE = 'http://localhost:3001';

const routes = [
  { name: 'home', path: '/' },
  { name: 'work', path: '/work' },
  { name: 'work-nexilink', path: '/work/nexilink' },
  { name: 'work-shareefico', path: '/work/shareefico' },
  { name: 'work-oud-closet', path: '/work/oud-closet' },
  { name: 'work-medacs', path: '/work/medacs' },
  { name: 'work-itqan-crm', path: '/work/itqan-crm' },
  { name: 'work-project-you', path: '/work/project-you' },
  { name: 'about', path: '/about' },
  { name: 'services', path: '/services' },
  { name: 'contact-audit', path: '/contact?intent=audit' },
];

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });

for (const viewport of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce', // Force animations to skip
  });
  const page = await ctx.newPage();

  for (const route of routes) {
    const url = BASE + route.path;
    const out = join(OUT_DIR, `${route.name}_${viewport.name}.png`);
    console.log(`[${viewport.name}] ${url} -> ${out}`);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      // Scroll through the page to trigger all framer-motion useInView watchers,
      // then return to top before the fullPage screenshot.
      await page.evaluate(async () => {
        const docH = document.documentElement.scrollHeight;
        const step = Math.max(window.innerHeight * 0.6, 400);
        for (let y = 0; y < docH; y += step) {
          window.scrollTo({ top: y, behavior: 'instant' });
          await new Promise((r) => setTimeout(r, 80));
        }
        // Force all framer-motion elements to fully visible just in case
        document.querySelectorAll('[style*="opacity"]').forEach((el) => {
          if (parseFloat(getComputedStyle(el).opacity) < 1) {
            el.style.opacity = '1';
            el.style.transform = 'none';
          }
        });
        window.scrollTo({ top: 0, behavior: 'instant' });
        await new Promise((r) => setTimeout(r, 200));
      });
      // Final settle wait
      await page.waitForTimeout(600);
      await page.screenshot({ path: out, fullPage: true });
    } catch (err) {
      console.error(`  ERR: ${err.message}`);
    }
  }

  await ctx.close();
}

await browser.close();
console.log(`\nDone. Screenshots in ${OUT_DIR}/`);
