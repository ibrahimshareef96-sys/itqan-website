#!/usr/bin/env node
/**
 * Build the downloadable brand packs.
 *
 * Runs at BUILD time (prebuild), not at authoring time, because the zips are
 * 100% derivable from assets that are already committed. Keeping ~130 MB of
 * regenerated archives out of git history matters more than saving a few
 * seconds of build.
 *
 * Inputs : src/data/brand-assets.json + the files it points at under public/
 * Outputs: public/brand/bundles/*.zip, and the `bundles` array written back
 *          into the manifest so the UI can show real counts and sizes.
 *
 * Safe to run repeatedly: output is byte-stable for unchanged inputs.
 */
import { mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve, sep } from 'node:path';
import { makeZip } from './lib/zip.mjs';

const REPO = resolve(new URL('..', import.meta.url).pathname);
const PUBLIC = join(REPO, 'public');
const BUNDLE_DIR = join(PUBLIC, 'brand', 'bundles');
const MANIFEST = join(REPO, 'src', 'data', 'brand-assets.json');

if (!existsSync(MANIFEST)) {
  console.error(`[brand-bundles] no manifest at ${MANIFEST} — run sync-brand-assets.mjs first`);
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(MANIFEST, 'utf8'));
const shippable = manifest.assets.filter((a) => a.src);

/**
 * Resolve a manifest `src` to a real path, refusing anything outside public/.
 *
 * The manifest is a committed JSON file, so its contents are only as
 * trustworthy as repo write access. `join(PUBLIC, "../../.env")` resolves
 * happily, and the bytes would then be zipped into a bundle that is served
 * publicly — an arbitrary-file-read into a download. Containment is checked
 * on the RESOLVED path, and the resolved path is what gets read.
 */
function resolveAsset(src) {
  const resolved = resolve(PUBLIC, `.${src.startsWith('/') ? src : `/${src}`}`);
  if (resolved !== PUBLIC && !resolved.startsWith(PUBLIC + sep)) {
    console.error(`[brand-bundles] refusing path outside public/: ${src}`);
    process.exit(1);
  }
  return resolved;
}

// A manifest that points at a file which is not in the repo means the sync
// step and the commit disagreed. Fail loudly — a half-empty download is worse
// than a failed build.
const missing = shippable.filter((a) => !existsSync(resolveAsset(a.src)));
if (missing.length > 0) {
  console.error(`[brand-bundles] ${missing.length} manifest entries have no file on disk:`);
  for (const a of missing.slice(0, 10)) console.error(`  - ${a.id} → ${a.src}`);
  process.exit(1);
}

rmSync(BUNDLE_DIR, { recursive: true, force: true });
mkdirSync(BUNDLE_DIR, { recursive: true });

const bundles = [];
const brands = [...new Set(shippable.map((a) => a.brand))].sort();

for (const brand of brands) {
  const forBrand = shippable.filter((a) => a.brand === brand);
  const categories = [...new Set(forBrand.map((a) => a.category))].sort();

  for (const category of [...categories, '__all__']) {
    const picked =
      category === '__all__' ? forBrand : forBrand.filter((a) => a.category === category);
    if (picked.length === 0) continue;

    // Foldered by category so an unzipped pack is navigable, and so two
    // categories sharing a slug cannot collide inside the full brand pack.
    const entries = picked
      .map((a) => ({
        name: `${brand}/${a.category}/${a.slug}.${a.format}`,
        data: readFileSync(resolveAsset(a.src)),
      }))
      .sort((x, y) => x.name.localeCompare(y.name));

    const file = category === '__all__' ? `${brand}-brand-pack.zip` : `${brand}-${category}.zip`;
    const zip = makeZip(entries);
    writeFileSync(join(BUNDLE_DIR, file), zip);

    bundles.push({
      brand,
      category: category === '__all__' ? 'all' : category,
      href: `/brand/bundles/${file}`,
      count: picked.length,
      bytes: zip.length,
    });
  }
}

writeFileSync(MANIFEST, `${JSON.stringify({ ...manifest, bundles }, null, 2)}\n`);

const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`;
console.log(`[brand-bundles] ${bundles.length} bundles from ${shippable.length} assets`);
for (const b of bundles) {
  console.log(`  ${b.href.padEnd(46)} ${String(b.count).padStart(3)} files  ${mb(b.bytes)}`);
}
