#!/usr/bin/env node
/**
 * Capture viewport-sized screenshots of Hero + Portrait sections.
 * No fullPage — keeps natural resolution for design review.
 */
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

await page.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500); // let video first-frame paint

// 1. Hero viewport
await page.screenshot({ path: `${OUT}/hero_v3-new-video.png` });

// 2. Portrait section — find by aria-labelledby + scroll to it
await page.evaluate(() => {
  const el = document.querySelector('[aria-labelledby="portrait-statement"]');
  if (el) el.scrollIntoView({ block: 'start' });
});
await page.waitForTimeout(1500);
await page.screenshot({ path: `${OUT}/portrait_v3-new-video.png` });

await browser.close();
console.log('Done');
