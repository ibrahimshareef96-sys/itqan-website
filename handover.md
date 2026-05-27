# Itqan Studio Website — Handover

## Tracked work reference

Lightweight tracking via TaskCreate (in-session). For longer initiatives use `agent-work/` (already present at the project root with one historical entry under `agent-work/projects/`).

## Roadmap

- **Phase: Live & Iterating.** Site is deployed to Netlify from `main`. Recent waves focused on the founder-studio rewrite (90-day Founder OS), Project You + Itqan CRM case studies, the `/magnet/[slug]` lead-magnet system, gradient accents on dark sections, and the Shareefico case-study upgrade (this session).
- **Next likely waves:** more case studies, individual service detail pages, podcast/long-form content surfaces, and a periodic SEO/perf audit before any paid-traffic push.

## Handover prompt (self-contained for the next session)

You are picking up the Itqan Studio marketing site at `/Users/ibrahimshareef/Documents/itqan-website`. Next.js 14 App Router + Tailwind + Framer Motion. Branch `main`, clean working tree on session start. Brand tokens in [tailwind.config.ts](tailwind.config.ts): dark `#2f1c2c`, accent `#cca4c2` (dark-bg only) / `#6d4a66` (light-bg only), cream `#fffbf5`. Manrope + Playfair Display Italic.

The site reads case studies from [src/data/case-studies.ts](src/data/case-studies.ts) and renders them via [src/app/work/[id]/page.tsx](src/app/work/[id]/page.tsx). The portfolio grid is [src/components/work/WorkGrid.tsx](src/components/work/WorkGrid.tsx). The homepage featured tiles are [src/components/home/FeaturedWork.tsx](src/components/home/FeaturedWork.tsx).

**Just-shipped: Shareefico case study has a video cover + live-site CTA.** New optional fields `coverVideo` and `liveUrl` on the `CaseStudy` interface. Detail-page hero renders `<video>` when `coverVideo` is set (falls back to `<Image>`), and a floating "Visit live site" pill overlays the hero when `liveUrl` is set (plus a matching pill in the header strip). Listing cards still use static `coverImage` to keep LCP fast on the grid.

**What's left / what to do next:**

1. **Optional: extract a higher-quality poster frame.** Current poster is JPG quality 2 from ffmpeg. If the artifact looks soft on retina screens, re-extract with `ffmpeg -y -ss 00:00:01.5 -i public/videos/shareefico-cover.mp4 -frames:v 1 -update 1 -q:v 1 public/images/portfolio/shareefico/cover-poster.jpg` (`-q:v 1` is highest quality). Use `-update 1` flag to avoid the "image sequence pattern" warning.

2. **Optional: compress the video for delivery.** Source MP4 is 3.2 MB at high bitrate. For LCP, re-encode: `ffmpeg -i public/videos/shareefico-cover.mp4 -c:v libx264 -crf 24 -preset slow -an public/videos/shareefico-cover-web.mp4` then update `coverVideo` path.

3. **Consider: video preview on listing cards.** Currently the WorkGrid and FeaturedWork tiles show only `coverImage`. If we want the Shareefico tile to show the animation too, add a hover-trigger `<video>` with `preload="none"` to avoid LCP hit. Out of scope for this turn — discussed and deferred.

4. **Watch out for:** Next/Image with very large source PNGs (the mockups in `public/images/portfolio/` are 5–30 MB each — they get optimized down by Next, but they bloat the repo). Consider running them through `cwebp -q 80` and switching to .webp sources at some point.

**Project-specific rules:**

- The brand has a **dual-accent system** (CLAUDE.md): `#cca4c2` ONLY on dark backgrounds, `#6d4a66` ONLY on light/cream backgrounds. Don't break that.
- All animations under 400ms.
- Mobile-first responsive.
- Target Lighthouse 90+ — don't add heavy client-side JS or unbounded autoplay-video grids.
- Dark sections alternate with light sections.

**Approaches considered + rejected this session:**

- **Polymorphic `coverImage` field** (string | object). Rejected: ripples into 4 components and the other case studies' types.
- **Special-casing the Shareefico ID in the page component**. Rejected: anti-pattern, doesn't scale.
- **Auto-playing the video inside listing cards.** Rejected: 4 autoplay videos on a grid is bad for LCP and battery; the animation deserves a full-bleed stage.
- **Wrapping the entire hero in `<a>` to make the whole cover clickable.** Rejected: surprising UX (people don't expect case-study heroes to be clickable). Used a clearly visible CTA chip instead.

**Pivots:** Nothing structural this session — this is a polish/asset upgrade on an existing case study, not a redesign.

## What was just done (2026-05-27 session)

**Files changed:**
- [src/data/case-studies.ts](src/data/case-studies.ts) — added optional `coverVideo` and `liveUrl` fields to `CaseStudy` interface; updated the Shareefico entry with `coverVideo: '/videos/shareefico-cover.mp4'`, `liveUrl: 'https://shareefi.co'`, swapped mockups to `[website.png, tokens.png, SHRFCO-CMS-MKP.png]`, and changed `coverImage` to the new poster `/images/portfolio/shareefico/cover-poster.jpg`.
- [src/app/work/[id]/page.tsx](src/app/work/[id]/page.tsx) — extracted hero into `CaseStudyHero` component that renders `<video>` when `coverVideo` is set (else `<Image>` fallback), with a floating "Visit live site ↗" pill overlay when `liveUrl` is set. Added a matching pill to the header strip next to the duration. Imported `ArrowUpRight` from phosphor.
- [.claude/launch.json](.claude/launch.json) — switched to `npx next dev` with `autoPort: true` so the preview server picks a free port when 3001 is busy.

**Assets added:**
- `public/videos/shareefico-cover.mp4` (3.2 MB, 6s loop, 1896×1092)
- `public/images/portfolio/shareefico/cover-poster.jpg` (108 KB, extracted at t=1.5s)
- `public/images/portfolio/shareefico/website.png` (1.2 MB, iPad mockup of shareefi.co hero)
- `public/images/portfolio/shareefico/tokens.png` (1.6 MB, brand token sheet)
- `public/images/portfolio/shareefico/mark-lime.png` (45 KB, brand mark — kept for future use)

**Verification (localhost:51515 preview):**
- TypeScript: `npx tsc --noEmit` passes clean.
- Video element renders with correct src + poster; plays (currentTime advanced 2.001s/sec).
- Both "Visit live site" links resolve to `https://shareefi.co/`, `target="_blank"`, `rel="noopener noreferrer"`.
- All 3 gallery images serve 200 OK with valid dimensions.
- No console errors, no server errors, no failed network requests.

## Open questions / blockers

None. Ready to commit if Ibrahim approves.

## Monetization angles

- The `coverVideo` + `liveUrl` pattern is a reusable productized capability — every founder we work with eventually wants a video-cover case study. This could be packaged as a "Founder Story Reel" add-on to the 90-day Founder OS.
- The illustrated character animation style (Kling) is distinctive enough to license back as a service: "We'll make you the character that fronts your brand." Itqan has the prompts + tokens already locked in for Shareefico — it's a reproducible workflow.
- The portfolio detail page is now a stronger sales asset for premium pricing — the live-site CTA closes the proof loop in one click, which is exactly what high-intent visitors look for before booking a call.
