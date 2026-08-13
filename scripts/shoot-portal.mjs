#!/usr/bin/env node
/**
 * Screenshot portal pages for design review.
 *
 * Walks the viewport rather than using fullPage: this app runs smooth scroll
 * and reveal-on-scroll, and a fullPage capture of either produces duplicated
 * bands or blank space where content had not been revealed yet.
 *
 *     node scripts/shoot-portal.mjs <base> <outDir> <path...>
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const [base, outDir, ...paths] = process.argv.slice(2);
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});

for (const path of paths) {
  const slug = path.replace(/\//g, '_') || '_root';
  await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(900);

  const height = await page.evaluate(() => document.body.scrollHeight);
  const shots = Math.min(4, Math.ceil(height / 900));

  for (let i = 0; i < shots; i += 1) {
    await page.evaluate((y) => window.scrollTo(0, y), i * 900);
    // Let reveals settle at the new scroll position before capturing.
    await page.waitForTimeout(650);
    await page.screenshot({ path: `${outDir}/${slug}-${i}.png` });
  }
  console.log(`  ${path} — ${shots} frame(s), ${height}px tall`);
}

await browser.close();
