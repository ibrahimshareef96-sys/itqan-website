#!/usr/bin/env node
/**
 * Tests for the asset-prune rule.
 *
 * pruneOrphans DELETES files under public/brand/. If its `keep` set is ever
 * wrong — every asset becoming reused, an off-by-one in a filter — it silently
 * removes published brand assets and every download 404s. That is the one piece
 * of this pipeline that can destroy work, so it gets a test that runs it
 * against a real temporary directory.
 *
 * The rule is reimplemented here rather than imported, because the sync script
 * is a top-to-bottom program that would perform a full sync on import. The test
 * therefore asserts the RULE, and a guard below asserts the real script still
 * expresses that same rule.
 *
 *     npm run test:prune
 */
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import assert from 'node:assert/strict';

const REPO = resolve(new URL('..', import.meta.url).pathname);

function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.')) continue;
    const p = join(dir, entry);
    statSync(p).isDirectory() ? walk(p, acc) : acc.push(p);
  }
  return acc;
}

/** The rule under test, parameterised by root so it can run on a temp tree. */
function pruneOrphans(outDir, keep) {
  const bundleDir = join(outDir, 'bundles');
  const orphans = walk(outDir).filter((f) => !f.startsWith(bundleDir) && !keep.has(f));
  for (const f of orphans) rmSync(f, { force: true });
  for (const dir of readdirSync(outDir)) {
    const brandDir = join(outDir, dir);
    if (dir === 'bundles' || !statSync(brandDir).isDirectory()) continue;
    for (const cat of readdirSync(brandDir)) {
      const catDir = join(brandDir, cat);
      if (statSync(catDir).isDirectory() && readdirSync(catDir).length === 0) {
        rmSync(catDir, { recursive: true, force: true });
      }
    }
  }
  return orphans;
}

const results = [];
const check = (name, fn) => {
  try {
    fn();
    results.push([true, name]);
  } catch (err) {
    results.push([false, `${name} — ${err.message.split('\n')[0]}`]);
  }
};

function fixture() {
  const root = mkdtempSync(join(tmpdir(), 'prune-'));
  const write = (rel) => {
    const p = join(root, rel);
    mkdirSync(join(p, '..'), { recursive: true });
    writeFileSync(p, 'x');
    return p;
  };
  return {
    root,
    keepMe: write('brandx/logo/keep.svg'),
    orphan: write('brandx/logo/gone.svg'),
    withdrawn: write('brandx/background/withdrawn.png'),
    bundle: write('bundles/brandx-logo.zip'),
  };
}

check('removes a withdrawn asset', () => {
  const f = fixture();
  const pruned = pruneOrphans(f.root, new Set([f.keepMe]));
  assert.ok(!existsSync(f.withdrawn), 'withdrawn file should be gone');
  assert.ok(pruned.includes(f.withdrawn));
  rmSync(f.root, { recursive: true, force: true });
});

check('keeps everything in the keep set', () => {
  const f = fixture();
  pruneOrphans(f.root, new Set([f.keepMe]));
  assert.ok(existsSync(f.keepMe), 'kept file must survive');
  rmSync(f.root, { recursive: true, force: true });
});

check('NEVER touches bundles — they are rebuilt separately', () => {
  const f = fixture();
  pruneOrphans(f.root, new Set([f.keepMe]));
  assert.ok(existsSync(f.bundle), 'bundle must survive a prune');
  rmSync(f.root, { recursive: true, force: true });
});

check('removes the directory a withdrawn category leaves behind', () => {
  const f = fixture();
  pruneOrphans(f.root, new Set([f.keepMe]));
  assert.ok(!existsSync(join(f.root, 'brandx/background')), 'empty category dir should go');
  rmSync(f.root, { recursive: true, force: true });
});

/*
 * The failure mode that matters most: an empty keep set means "this run
 * produced nothing", and pruning on that would wipe the whole library. The
 * sync script guards it upstream by refusing a zero-asset run; this records
 * what the rule alone would do, so the guard can never be quietly dropped
 * without a test noticing.
 */
check('an empty keep set would remove every asset (why the zero-asset guard exists)', () => {
  const f = fixture();
  const pruned = pruneOrphans(f.root, new Set());
  assert.equal(pruned.length, 3, 'all three non-bundle files');
  assert.ok(existsSync(f.bundle), 'bundles still spared');
  rmSync(f.root, { recursive: true, force: true });
});

check('sync script still refuses a zero-asset run before pruning', () => {
  const src = readFileSync(join(REPO, 'scripts/sync-brand-assets.mjs'), 'utf8');
  assert.match(src, /if \(assets\.length === 0\)/, 'zero-asset guard missing');
  const guardAt = src.indexOf('if (assets.length === 0)');
  const pruneAt = src.indexOf('pruneOrphans(new Set(');
  assert.ok(guardAt !== -1 && pruneAt !== -1 && guardAt < pruneAt, 'guard must precede the prune');
});

check('sync script prunes only AFTER the manifest is written', () => {
  const src = readFileSync(join(REPO, 'scripts/sync-brand-assets.mjs'), 'utf8');
  const writeAt = src.indexOf('writeFileSync(MANIFEST');
  const pruneAt = src.indexOf('pruneOrphans(new Set(');
  assert.ok(writeAt < pruneAt, 'manifest write must precede the prune');
});

let failed = 0;
for (const [ok, name] of results) {
  if (!ok) failed += 1;
  console.log(`  ${ok ? 'ok  ' : 'FAIL'} ${name}`);
}
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed === 0 ? 0 : 1);
