#!/usr/bin/env node
/**
 * Brand asset pipeline.
 *
 * Source artwork lives OUTSIDE the repo (Ibrahim's Desktop/Documents). This
 * script copies the shippable subset into `public/brand/`, normalises names,
 * reads real dimensions, dedupes by content hash, and emits a manifest the
 * portal renders from. Download packs are built separately, at build time, by
 * scripts/build-brand-bundles.mjs (invoked at the end of a real run).
 *
 * The portal NEVER hardcodes an asset list — it reads the manifest, so what the
 * site shows is exactly what shipped. Re-run after adding artwork:
 *
 *     npm run brand:sync            # sync + manifest + zips
 *     npm run brand:sync -- --dry   # report only, write nothing
 *
 * Source files that cannot ship to the web (PSD/AI) are recorded in the
 * manifest as `sourceOnly` so the portal can say "layered source available on
 * request" instead of silently hiding them.
 */
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
  copyFileSync,
} from 'node:fs';
import { basename, extname, join, resolve } from 'node:path';

const DRY = process.argv.includes('--dry');
const REPO = resolve(new URL('..', import.meta.url).pathname);
const OUT_DIR = join(REPO, 'public', 'brand');
const MANIFEST = join(REPO, 'src', 'data', 'brand-assets.json');

/** Formats we are willing to serve directly. */
const WEB_FORMATS = new Set(['.svg', '.png', '.jpg', '.jpeg', '.webp', '.mp4', '.pdf']);
/** Layered sources: catalogued, never copied into public/. */
const SOURCE_FORMATS = new Set(['.psd', '.ai', '.sketch', '.fig']);

/* ── helpers ──────────────────────────────────────────────────────────── */

const sh = (cmd, args) => {
  try {
    return execFileSync(cmd, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
};

/** Real pixel dimensions. sips for raster; parse the SVG header for vectors. */
function dimensions(file) {
  const ext = extname(file).toLowerCase();
  if (ext === '.svg') {
    const head = readFileSync(file, 'utf8').slice(0, 2000);
    const vb = head.match(/viewBox=["']\s*[\d.-]+\s+[\d.-]+\s+([\d.]+)\s+([\d.]+)/i);
    if (vb) return { width: Math.round(+vb[1]), height: Math.round(+vb[2]) };
    const w = head.match(/\bwidth=["']([\d.]+)/i);
    const h = head.match(/\bheight=["']([\d.]+)/i);
    return w && h ? { width: Math.round(+w[1]), height: Math.round(+h[1]) } : {};
  }
  if (ext === '.mp4' || ext === '.pdf') return {};
  const out = sh('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', file]);
  const w = out.match(/pixelWidth:\s*(\d+)/);
  const h = out.match(/pixelHeight:\s*(\d+)/);
  return w && h ? { width: +w[1], height: +h[1] } : {};
}

/** "BRKH ALT@2x.png" → "brkh-alt". Stable, URL-safe, human-readable. */
function slugify(name) {
  return basename(name, extname(name))
    .replace(/@\d+x$/i, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

/** Filename → a readable label, since most source files are named by a human. */
function labelFrom(name) {
  const s = basename(name, extname(name)).replace(/@\d+x$/i, '').replace(/[-_]+/g, ' ');
  return s.replace(/\s+/g, ' ').trim().replace(/\b\w/g, (c) => c.toUpperCase());
}

function walk(dir, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const entry of readdirSync(dir)) {
    if (entry.startsWith('.')) continue;
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

/* ── config ───────────────────────────────────────────────────────────── */

/**
 * Each rule maps a source directory to a portal category. `match` narrows by
 * filename when a directory mixes categories. Order matters: the FIRST rule a
 * file matches wins, so specific rules precede broad ones.
 */
const HOME = process.env.HOME;
const RULES = [
  // ── Itqan Studio ────────────────────────────────────────────────────
  { dir: `${HOME}/Desktop/itqan-design/brand-assets/itqan`, brand: 'itqan-studio', category: 'logo' },
  { dir: `${HOME}/Desktop/brand-kits/itqan-studio/stickers`, brand: 'itqan-studio', category: 'sticker' },
  { dir: `${HOME}/Desktop/brand-kits/itqan-studio/signatures`, brand: 'itqan-studio', category: 'signature', skipDirs: ['_proof'] },
  { dir: `${HOME}/Desktop/brand-kits/itqan-studio/call-backgrounds`, brand: 'itqan-studio', category: 'background' },
];

/* ── run ──────────────────────────────────────────────────────────────── */

const hashOf = (file) =>
  createHash('sha1').update(readFileSync(file)).digest('hex').slice(0, 12);

/**
 * Files the site already ships (public/portraits/*, public/og/*, …) are
 * frequently the same bytes as a source asset. Copying them under
 * public/brand/ would double the repo for nothing, so index public/ once and
 * reuse the existing URL when the content matches.
 */
function indexExistingPublic() {
  const index = new Map();
  const root = join(REPO, 'public');
  if (!existsSync(root)) return index;
  for (const file of walk(root)) {
    if (file.startsWith(OUT_DIR)) continue; // our own output is not a source of truth
    if (!WEB_FORMATS.has(extname(file).toLowerCase())) continue;
    const rel = file.slice(root.length);
    // First path wins so repeated runs stay deterministic.
    const h = hashOf(file);
    if (!index.has(h)) index.set(h, rel);
  }
  return index;
}

const existingPublic = indexExistingPublic();
/** Copies staged during the scan, performed only after validation passes. */
const pendingCopies = [];
const seenHash = new Map();
const assets = [];
const skipped = [];
let reused = 0;

/**
 * Two different files can slugify to the same name inside one category
 * ("CHAR 01 WAVE.png" and "char-01-wave.png" both → char-01-wave). Left
 * unchecked the second copy overwrites the first on disk and both manifest
 * records point at the same URL, so one asset silently disappears. Suffix
 * instead.
 */
const usedSlugs = new Set();
function uniqueSlug(brand, category, base) {
  let slug = base;
  for (let n = 2; usedSlugs.has(`${brand}/${category}/${slug}`); n += 1) {
    slug = `${base}-${n}`;
  }
  usedSlugs.add(`${brand}/${category}/${slug}`);
  return slug;
}

for (const rule of RULES) {
  for (const file of walk(rule.dir)) {
    const name = basename(file);
    if (rule.match && !rule.match.test(name)) continue;
    if (rule.skipDirs?.some((d) => file.includes(`/${d}/`))) continue;

    const ext = extname(file).toLowerCase();
    const isSource = SOURCE_FORMATS.has(ext);
    if (!WEB_FORMATS.has(ext) && !isSource) {
      skipped.push({ file, reason: `unsupported format ${ext}` });
      continue;
    }

    const bytes = statSync(file).size;
    const hash = hashOf(file);

    // Content-level dedupe: the same artwork appears in several folders.
    const prior = seenHash.get(hash);
    if (prior) {
      skipped.push({ file, reason: `duplicate of ${prior}` });
      continue;
    }
    seenHash.set(hash, file);

    const slug = uniqueSlug(rule.brand, rule.category, slugify(name));
    const id = `${rule.brand}-${rule.category}-${slug}`;
    const existing = isSource ? undefined : existingPublic.get(hash);
    const rel = existing ?? `/brand/${rule.brand}/${rule.category}/${slug}${ext}`;
    const dest = join(OUT_DIR, rule.brand, rule.category, `${slug}${ext}`);
    if (existing) reused += 1;

    const record = {
      id,
      brand: rule.brand,
      category: rule.category,
      name: labelFrom(name),
      slug,
      format: ext.replace('.', ''),
      bytes,
      /*
       * Deliberately NOT the absolute source path.
       *
       * This manifest is committed AND imported by a client component, so an
       * absolute path would ship the workstation username and private
       * directory names (client names, unreleased projects) to every visitor.
       * The basename is enough to find the original by hand.
       */
      sourceName: basename(file),
      ...(isSource ? { sourceOnly: true } : { src: rel }),
      ...dimensions(file),
    };
    assets.push(record);

    // Staged, not performed: nothing touches the repo until the whole run has
    // been validated (see below).
    if (!isSource && !existing) pendingCopies.push([file, dest, join(OUT_DIR, rule.brand, rule.category)]);
  }
}

assets.sort((a, b) => a.id.localeCompare(b.id));

/*
 * Bundles are NOT built here.
 *
 * They are derived entirely from the assets this script just committed to
 * public/, so scripts/build-brand-bundles.mjs owns them and runs at build time
 * instead — which keeps ~130 MB of regenerable archives out of git history.
 * Running it now simply means the local dev server serves real downloads too.
 */
/*
 * Validate BEFORE writing anything.
 *
 * A missing HOME, a renamed source folder, or a rule that stops matching all
 * produce the same symptom: zero assets. If that ran through, it would
 * overwrite the manifest with an empty inventory and the bundle builder would
 * then delete every existing pack — destroying good generated state to report
 * that no inputs were found. Refuse instead, and leave the repo untouched.
 */
if (assets.length === 0) {
  console.error('[brand-sync] no assets matched any rule — refusing to overwrite the manifest.');
  console.error('[brand-sync] check that the source directories in RULES still exist:');
  for (const r of RULES) console.error(`  ${existsSync(r.dir) ? 'ok     ' : 'MISSING'} ${r.dir}`);
  process.exit(1);
}

const manifest = {
  generatedBy: 'scripts/sync-brand-assets.mjs',
  assets,
  bundles: [],
};

if (!DRY) {
  for (const [from, to, dir] of pendingCopies) {
    mkdirSync(dir, { recursive: true });
    copyFileSync(from, to);
  }
  mkdirSync(join(REPO, 'src', 'data'), { recursive: true });
  writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
  execFileSync(process.execPath, [join(REPO, 'scripts', 'build-brand-bundles.mjs')], {
    stdio: 'inherit',
  });
}

const bundles = DRY ? [] : JSON.parse(readFileSync(MANIFEST, 'utf8')).bundles;

/* ── report ───────────────────────────────────────────────────────────── */

const by = (key) =>
  assets.reduce((m, a) => ((m[a[key]] = (m[a[key]] ?? 0) + 1), m), {});
console.log(DRY ? '[dry run] nothing written\n' : `wrote ${MANIFEST}\n`);
console.log('assets by brand:   ', JSON.stringify(by('brand')));
console.log('assets by category:', JSON.stringify(by('category')));
console.log('source-only files: ', assets.filter((a) => a.sourceOnly).length);
console.log('reused from public:', reused);
console.log('bundles:           ', bundles.length);
console.log('skipped:           ', skipped.length);
for (const s of skipped.slice(0, 8)) console.log('   -', basename(s.file), '·', s.reason);
