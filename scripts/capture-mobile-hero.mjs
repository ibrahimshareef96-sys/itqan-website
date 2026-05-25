#!/usr/bin/env node
import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();

await page.goto('http://localhost:3001/', { waitUntil: 'networkidle' });
await page.waitForTimeout(2500);
await page.screenshot({ path: '/tmp/itqan-screens/hero_v3-mobile.png' });

await page.evaluate(() => {
  document.querySelector('[aria-labelledby="portrait-statement"]')
    ?.scrollIntoView({ block: 'start' });
});
await page.waitForTimeout(1500);
await page.screenshot({ path: '/tmp/itqan-screens/portrait_v3-mobile.png' });

await browser.close();
console.log('Done');
