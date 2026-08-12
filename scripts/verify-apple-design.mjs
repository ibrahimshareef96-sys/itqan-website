#!/usr/bin/env node
/**
 * Regression coverage for the Apple-design interaction work (2026-08-07).
 *
 * Two layers:
 *   1. Pure unit assertions for the gesture maths in src/lib/motion.ts. These
 *      always run and need nothing else.
 *   2. Behavioural checks driven through a real browser. These need a server:
 *
 *        npm run build && npx next start -p 3011
 *        node scripts/verify-apple-design.mjs            # defaults to :3011
 *        node scripts/verify-apple-design.mjs http://localhost:3000
 *
 * These assert BEHAVIOUR, not the presence of CSS strings. That distinction
 * caught a real defect: an earlier version of the carousel passed a
 * "does it advance on swipe" check while the drag itself was pure elastic —
 * a 150px drag moved the rail 27px — because the track measured the same width
 * as its viewport and Framer computed zero drag constraints. Assert the
 * in-flight gesture, not just the resting state.
 */

const args = process.argv.slice(2);
/**
 * Browser checks are the point of this script. Skipping them is only acceptable
 * when the caller asked for unit assertions explicitly — otherwise the run exits
 * non-zero, so CI can never report a clean design verification while every
 * behavioural regression went untested.
 */
const UNITS_ONLY = args.includes('--units-only');
const BASE = args.find((a) => !a.startsWith('--')) ?? 'http://localhost:3011';

const results = [];
let inBrowserPhase = false;
const check = (name, pass, detail) => {
  results.push({ name, pass: !!pass, browser: inBrowserPhase });
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`);
};
const near = (a, b, tol) => Math.abs(a - b) <= tol;

/* ── 1. Pure gesture maths ─────────────────────────────────────────────── */

// Mirrors src/lib/motion.ts. Kept inline so this script has no build step and
// can run against a plain node install.
const projectMomentum = (velocity, deceleration = 0.998) =>
  ((velocity / 1000) * deceleration) / (1 - deceleration);

check('projectMomentum(0) is 0', projectMomentum(0) === 0);
check(
  'projectMomentum is sign-preserving',
  projectMomentum(500) > 0 && projectMomentum(-500) < 0,
  `+500 → ${projectMomentum(500).toFixed(1)}px, -500 → ${projectMomentum(-500).toFixed(1)}px`,
);
check(
  'projectMomentum is symmetric about zero',
  near(projectMomentum(800), -projectMomentum(-800), 1e-9),
);
check(
  'projectMomentum is monotonic in velocity',
  projectMomentum(1200) > projectMomentum(600) && projectMomentum(600) > projectMomentum(100),
);
check(
  'a snappier deceleration projects a SHORTER throw',
  projectMomentum(1000, 0.99) < projectMomentum(1000, 0.998),
  `0.99 → ${projectMomentum(1000, 0.99).toFixed(0)}px vs 0.998 → ${projectMomentum(1000, 0.998).toFixed(0)}px`,
);
// Apple's published example: 1000px/s at 0.998 decays to ~499px of further travel.
check(
  'projectMomentum matches the exponential-decay reference value',
  near(projectMomentum(1000, 0.998), 499, 1),
  `${projectMomentum(1000, 0.998).toFixed(1)}px`,
);

/* ── 2. Behavioural checks ─────────────────────────────────────────────── */

let chromium;
if (!UNITS_ONLY) {
  try {
    const pw = await import('playwright');
    chromium = pw.chromium ?? pw.default?.chromium;
  } catch {
    console.log('\nSKIP  browser checks — playwright not installed');
  }
}

/**
 * The pinned playwright build often wants a browser revision that isn't in the
 * local cache (`npx playwright install` fixes it, but that is a 150MB download
 * nobody expects from a verify script). Fall back to any Chrome-for-Testing
 * already sitting in the cache before giving up.
 */
async function launch() {
  try {
    return await chromium.launch();
  } catch (err) {
    const { homedir } = await import('node:os');
    const { readdirSync, existsSync } = await import('node:fs');
    const root = `${homedir()}/Library/Caches/ms-playwright`;
    if (!existsSync(root)) throw err;
    for (const dir of readdirSync(root).filter((d) => d.startsWith('chromium-')).sort().reverse()) {
      const exe = `${root}/${dir}/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`;
      if (existsSync(exe)) {
        console.log(`      (using cached browser: ${dir})`);
        return chromium.launch({ executablePath: exe });
      }
    }
    throw err;
  }
}

let reachable = false;
if (chromium && !UNITS_ONLY) {
  try {
    const res = await fetch(BASE, { signal: AbortSignal.timeout(4000) });
    reachable = res.ok;
  } catch {
    reachable = false;
  }
  if (!reachable) {
    console.log(`\nSKIP  browser checks — nothing serving ${BASE} (run \`npx next start -p 3011\`)`);
  }
}

if (chromium && reachable) {
  inBrowserPhase = true;
  const browser = await launch();
  const tx = (page, sel) =>
    page.evaluate(
      (s) => new DOMMatrixReadOnly(getComputedStyle(document.querySelector(s)).transform).m41,
      sel,
    );
  const ty = (page, sel) =>
    page.evaluate(
      (s) => new DOMMatrixReadOnly(getComputedStyle(document.querySelector(s)).transform).m42,
      sel,
    );

  /* Nav is a material, and the scroll edge only paints once it has something to
     dissolve. */
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/work`, { waitUntil: 'networkidle' });
    const backdrop = await page.evaluate(() => {
      const cs = getComputedStyle(document.querySelector('header nav'));
      return cs.backdropFilter || cs.webkitBackdropFilter;
    });
    check('nav is a translucent material', /blur/.test(backdrop), backdrop);

    const top = await page.evaluate(() => getComputedStyle(document.querySelector('.scroll-edge')).opacity);
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(700);
    const scrolled = await page.evaluate(() => getComputedStyle(document.querySelector('.scroll-edge')).opacity);
    check('scroll edge appears only after scrolling', Number(top) === 0 && Number(scrolled) === 1);
    await ctx.close();
  }

  /* Tracking and leading are functions of size, not constants. */
  {
    const read = async (w) => {
      const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
      const page = await ctx.newPage();
      await page.goto(BASE, { waitUntil: 'networkidle' });
      const m = await page.evaluate(() => {
        const cs = getComputedStyle(document.querySelector('h1'));
        const fs = parseFloat(cs.fontSize);
        return { em: parseFloat(cs.letterSpacing) / fs, lead: parseFloat(cs.lineHeight) / fs };
      });
      await ctx.close();
      return m;
    };
    const mob = await read(390);
    const desk = await read(1440);
    check(
      'display tracking loosens at small sizes',
      mob.em > desk.em + 0.01,
      `390px ${mob.em.toFixed(4)}em vs 1440px ${desk.em.toFixed(4)}em`,
    );
    check('display leading tightens as size grows', mob.lead > desk.lead);
  }

  /* The consent card must never sit on top of the hero CTA. */
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(900);
    const r = await page.evaluate(() => {
      const cta = [...document.querySelectorAll('a')]
        .filter((a) => a.textContent.includes('Start a conversation'))
        .find((a) => a.getBoundingClientRect().width > 0);
      const card = document.querySelector('[aria-label="Cookie consent"] > div');
      if (!cta || !card) return null;
      const c = cta.getBoundingClientRect();
      const b = card.getBoundingClientRect();
      return { clash: c.bottom > b.top && c.top < b.bottom };
    });
    check('consent card clears the hero CTA at 390px', r && !r.clash);
    await ctx.close();
  }

  /* A returning visitor must not get an invisible click-catching strip.
     Regression guard: the card used to stay mounted at opacity 0 with
     `pointer-events: auto`, swallowing clicks on the bottom ~60px of every
     page — including the hero CTA this rewrite exists to clear. */
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    // Current storage format: a bounded record. A bare 'accepted' string is the
    // legacy unbounded form and is deliberately treated as expired now, so it
    // would re-prompt rather than reproduce the returning-visitor case.
    await page.evaluate(() =>
      localStorage.setItem(
        'itqan_cookie_consent',
        JSON.stringify({ v: 'accepted', exp: Date.now() + 1e7 })
      )
    );
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    const leftover = await page.evaluate(() => {
      const card = document.querySelector('[aria-label="Cookie consent"] > div');
      if (!card) return null;
      const r = card.getBoundingClientRect();
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return { intercepts: !!hit?.closest('[aria-label="Cookie consent"]') };
    });
    check(
      'consent card leaves no invisible hit target for returning visitors',
      leftover === null || !leftover.intercepts,
      leftover === null ? 'not rendered at all' : 'still intercepting clicks',
    );
    await ctx.close();
  }

  /* The sheet tracks the finger 1:1 and resists past its open position. */
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.click('button[aria-label="Open navigation menu"]');
    await page.waitForTimeout(900);
    const sel = '[role="dialog"] > div:nth-child(2)';
    const open = await ty(page, sel);
    const box = await page.locator(sel).boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + 12);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2, box.y + 82, { steps: 10 });
    await page.waitForTimeout(80);
    const down = await ty(page, sel);
    check('sheet tracks the pointer 1:1', near(down - open, 70, 8), `70px drag → ${(down - open).toFixed(1)}px`);

    await page.mouse.move(box.x + box.width / 2, box.y - 68, { steps: 10 });
    await page.waitForTimeout(80);
    const up = await ty(page, sel);
    check('sheet rubber-bands above its open position', up > -80 && up < 0, `-80px drag → ${up.toFixed(1)}px`);
    await page.mouse.up();
    await ctx.close();
  }

  /* The carousel rail is genuinely draggable, not just snappable. */
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/contact`, { waitUntil: 'networkidle' });
    const rail = page.locator('[aria-roledescription="carousel"]').first();
    await rail.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const dims = await page.evaluate(() => {
      const r = document.querySelector('[aria-roledescription="carousel"]');
      return { rail: r.clientWidth, track: r.firstElementChild.offsetWidth };
    });
    check(
      'carousel track is wider than its viewport (drag constraints exist)',
      dims.track > dims.rail * 1.5,
      `track ${dims.track}px vs rail ${dims.rail}px`,
    );

    const sel = '[aria-roledescription="carousel"] > div';
    const box = await rail.boundingBox();
    await page.mouse.move(box.x + box.width - 80, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width - 230, box.y + box.height / 2, { steps: 12 });
    await page.waitForTimeout(90);
    const during = await tx(page, sel);
    check('carousel drags 1:1 in flight', during < -130, `150px drag → ${during.toFixed(1)}px`);
    await page.mouse.up();
    await page.waitForTimeout(900);
    const settled = await tx(page, sel);
    check('carousel snaps to a card on release', near(settled % dims.rail, 0, 4), `x ${settled.toFixed(0)}`);

    // Autoplay must not move the card out from under someone reading it.
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    const held = await tx(page, sel);
    await page.waitForTimeout(6200);
    check('autoplay pauses while engaged', near(await tx(page, sel), held, 2));
    await ctx.close();
  }

  /* A tab that starts hidden must still get a consent surface. Regression guard:
     the entrance used rAF while the unmount used setTimeout, and a hidden
     document runs the timer but NOT the rAF — so the card deleted itself before
     it was ever seen, and never came back on client navigation. Simulated by
     deferring rAF callbacks, which is what a hidden document does. */
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.addInitScript(() => {
      const real = window.requestAnimationFrame.bind(window);
      const queued = [];
      window.requestAnimationFrame = (cb) => {
        queued.push(cb);
        return queued.length;
      };
      window.cancelAnimationFrame = () => {};
      // Release them well after the 360ms exit timer would have fired.
      setTimeout(() => {
        window.requestAnimationFrame = real;
        queued.forEach((cb) => real(cb));
      }, 2500);
    });
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(4500);
    const survived = await page.evaluate(
      () => !!document.querySelector('[aria-label="Cookie consent"]')
    );
    check('consent card survives a tab that starts hidden', survived);
    await ctx.close();
  }

  /* The consent card must not paint over the open mobile nav sheet. */
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(900);
    await page.click('button[aria-label="Open navigation menu"]');
    await page.waitForTimeout(900);
    const r = await page.evaluate(() => {
      const cta = [...document.querySelectorAll('[role="dialog"] a')].find((a) =>
        a.textContent.includes('Start a conversation')
      );
      if (!cta) return { ok: false, why: 'sheet CTA not found' };
      const b = cta.getBoundingClientRect();
      const hit = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2);
      return {
        ok: !!hit && !hit.closest('[aria-label="Cookie consent"]'),
        why: hit ? hit.className.toString().slice(0, 40) : 'nothing',
      };
    });
    check("consent card does not cover the sheet's primary CTA", r.ok, r.why);
    await ctx.close();
  }

  /* A malformed consent cookie must not take the app down. The provider used to
     hold its own unguarded decodeURIComponent, and it wraps every route. */
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.addCookies([
      { name: 'itqan_cookie_consent', value: '%E0%A4%A', domain: new URL(BASE).hostname, path: '/' },
    ]);
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push(e.message.split('\n')[0]));
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);
    const rendered = await page.evaluate(() => !!document.querySelector('h1'));
    check(
      'a malformed consent cookie does not crash the app',
      rendered && errs.length === 0,
      errs.length ? errs.join(' | ') : 'no page errors, h1 rendered'
    );
    await ctx.close();
  }

  /* The consent store, exercised through the REAL shipped module rather than a
     re-implementation of it (a second copy of this logic is what caused the
     app-wide crash in the first place). The banner's presence is the observable:
     absent means the stored consent was honoured, present means it was rejected
     and the visitor is being asked again.
     An unbounded or expired record MUST be rejected — a consent decision that
     never expires is the compliance failure the TTL exists to prevent. */
  {
    const host = new URL(BASE).hostname;
    const CASES = [
      ['a valid cookie is honoured', { cookie: 'accepted' }, false],
      ['an unrecognised cookie value is rejected', { cookie: 'maybe' }, true],
      ['an unexpired stored record is honoured', { ls: { v: 'accepted', exp: Date.now() + 1e7 } }, false],
      ['an expired stored record is rejected', { ls: { v: 'accepted', exp: Date.now() - 1 } }, true],
      ['a stored record with NO expiry is rejected', { ls: { v: 'accepted' } }, true],
      ['a stored record with a non-numeric expiry is rejected', { ls: { v: 'accepted', exp: 'soon' } }, true],
      ['a legacy unbounded string is treated as expired', { lsRaw: 'accepted' }, true],
      ['unparseable stored JSON is rejected', { lsRaw: '{not json' }, true],
    ];
    for (const [name, seed, expectBanner] of CASES) {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
      if (seed.cookie) {
        await ctx.addCookies([
          { name: 'itqan_cookie_consent', value: seed.cookie, domain: host, path: '/' },
        ]);
      }
      const page = await ctx.newPage();
      await page.goto(BASE, { waitUntil: 'domcontentloaded' });
      if (seed.ls || seed.lsRaw) {
        await page.evaluate(
          (v) => localStorage.setItem('itqan_cookie_consent', v),
          seed.lsRaw ?? JSON.stringify(seed.ls)
        );
        await page.reload({ waitUntil: 'networkidle' });
      }
      await page.waitForTimeout(1100);
      const shown = await page.evaluate(
        () => !!document.querySelector('[aria-label="Cookie consent"]')
      );
      check(`consent: ${name}`, shown === expectBanner, `banner ${shown ? 'shown' : 'absent'}`);
      await ctx.close();
    }
  }

  /* Keyboard focus must not deform rounded controls, and the gloss button must
     keep its focus halo. */
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const radius = await page.evaluate(() => {
      const el = document.querySelector('header nav a[aria-label]');
      if (!el) return null;
      el.focus();
      return getComputedStyle(el).borderRadius;
    });
    check(
      'focus does not square off rounded controls',
      radius !== null && !/^2px/.test(radius),
      `border-radius while focused: ${radius}`
    );

    // motion.div with whileTap silently gets tabIndex=0; these wrappers are layout.
    const phantom = await page.evaluate(
      () => [...document.querySelectorAll('div[tabindex="0"]')].length
    );
    check('no phantom tab stops from press-feedback wrappers', phantom === 0, `${phantom} found`);
    await ctx.close();
  }

  /* The sheet must be capped and internally scrollable, and Lenis must actually
     be stopped — body overflow alone does not stop it. */
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 500 } });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    await page.click('button[aria-label="Open navigation menu"]');
    await page.waitForTimeout(900);
    const geo = await page.evaluate(() => {
      const sheet = document.querySelector('[role="dialog"] > div:nth-child(2)');
      const closeBtn = document.querySelector('[aria-label="Close navigation menu"]');
      const scroller = document.querySelector('[role="dialog"] nav');
      const s = sheet?.getBoundingClientRect();
      const c = closeBtn?.getBoundingClientRect();
      return {
        fitsViewport: !!s && s.top >= -1 && s.bottom <= window.innerHeight + 1,
        closeOnScreen: !!c && c.top >= 0 && c.bottom <= window.innerHeight,
        scrolls: !!scroller && getComputedStyle(scroller).overflowY === 'auto',
      };
    });
    check(
      'sheet stays inside a short viewport with its Close reachable',
      geo.fitsViewport && geo.closeOnScreen && geo.scrolls,
      JSON.stringify(geo)
    );

    // Dragging inside the scrollable link list must scroll it, NOT drag the
    // sheet. That is why the gesture is bound to the grabber via dragControls.
    const nav = await page.locator('[role="dialog"] nav').boundingBox();
    const sheetSel = '[role="dialog"] > div:nth-child(2)';
    const beforeY = await ty(page, sheetSel);
    await page.mouse.move(nav.x + nav.width / 2, nav.y + 12);
    await page.mouse.down();
    await page.mouse.move(nav.x + nav.width / 2, nav.y + 72, { steps: 8 });
    await page.waitForTimeout(80);
    const afterY = await ty(page, sheetSel);
    await page.mouse.up();
    check(
      'dragging the link list does not drag the sheet',
      Math.abs(afterY - beforeY) < 4,
      `sheet moved ${(afterY - beforeY).toFixed(1)}px during a 60px in-list drag`
    );

    // The page behind must not scroll. `body { overflow: hidden }` does NOT stop
    // Lenis, which drives scroll from its own wheel listener.
    const scrolled = await page.evaluate(async () => {
      const start = window.scrollY;
      for (let i = 0; i < 6; i++) {
        window.dispatchEvent(new WheelEvent('wheel', { deltaY: 240, bubbles: true, cancelable: true }));
        document.body.dispatchEvent(
          new WheelEvent('wheel', { deltaY: 240, bubbles: true, cancelable: true })
        );
        await new Promise((r) => setTimeout(r, 90));
      }
      return Math.abs(window.scrollY - start);
    });
    check('page does not scroll behind the open sheet', scrolled < 4, `moved ${scrolled}px`);
    await ctx.close();
  }

  /* Reduced motion must keep the cross-fades that carry meaning. */
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const t = await page.evaluate(() => {
      const cs = getComputedStyle(document.querySelector('header nav a'));
      return { props: cs.transitionProperty, dur: parseFloat(cs.transitionDuration) };
    });
    check(
      'reduced motion keeps colour/opacity transitions',
      /opacity|color/.test(t.props) && t.dur > 0.05,
      `${t.dur}s`,
    );
    await ctx.close();
  }

  await browser.close();
}

const failed = results.filter((r) => !r.pass);
const ranBrowser = results.some((r) => r.browser);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
if (failed.length) {
  console.log('FAILING:', failed.map((f) => f.name).join(', '));
  process.exit(1);
}
if (!ranBrowser && !UNITS_ONLY) {
  console.log(
    'FAIL: browser checks did NOT run — unit assertions alone prove almost nothing.\n' +
      '      Start the app (`npx next start -p 3011`) or pass --units-only to accept this.'
  );
  process.exit(1);
}
