#!/usr/bin/env node
/** Capture each italic-accent surface so the gradient swap is visible. */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const OUT = '/tmp/itqan-screens';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

const captures = [
  { url: 'http://localhost:3001/', sel: 'h1', out: 'accent-hero.png' },
  { url: 'http://localhost:3001/', sel: '[aria-labelledby="founder-os-heading"]', out: 'accent-founderos.png' },
  { url: 'http://localhost:3001/', sel: '[aria-labelledby="who-for-heading"]', out: 'accent-whofor.png' },
  { url: 'http://localhost:3001/', sel: '[aria-labelledby="guarantee-heading"]', out: 'accent-guarantee.png' },
  { url: 'http://localhost:3001/', sel: '#cta-banner', out: 'accent-ctabanner.png' },
  { url: 'http://localhost:3001/about', sel: 'h1', out: 'accent-abouthero.png' },
  { url: 'http://localhost:3001/about', sel: '[aria-labelledby="team-heading"]', out: 'accent-team.png' },
  { url: 'http://localhost:3001/services', sel: 'h1', out: 'accent-services-hero.png' },
  { url: 'http://localhost:3001/work/nexilink', sel: '[aria-labelledby="phase-arc-heading"]', out: 'accent-case-bridge.png' },
  { url: 'http://localhost:3001/work/nexilink', sel: '[aria-labelledby="after-heading"]', out: 'accent-case-after.png' },
];

const seenUrls = new Set();
for (const c of captures) {
  if (!seenUrls.has(c.url)) {
    await page.goto(c.url, { waitUntil: 'networkidle' });
    // trigger framer-motion useInView watchers by paging the page once
    await page.evaluate(async () => {
      const docH = document.documentElement.scrollHeight;
      const step = window.innerHeight * 0.6;
      for (let y = 0; y < docH; y += step) {
        window.scrollTo({ top: y, behavior: 'instant' });
        await new Promise((r) => setTimeout(r, 80));
      }
      // force visible
      document.querySelectorAll('[style*="opacity"]').forEach((el) => {
        if (parseFloat(getComputedStyle(el).opacity) < 1) {
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      });
      window.scrollTo({ top: 0, behavior: 'instant' });
      await new Promise((r) => setTimeout(r, 200));
    });
    seenUrls.add(c.url);
  }
  await page.evaluate((sel) => {
    document.querySelector(sel)?.scrollIntoView({ block: 'center' });
  }, c.sel);
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/${c.out}` });
  console.log(`[${c.url}] ${c.sel} -> ${c.out}`);
}

await browser.close();
console.log('Done.');
