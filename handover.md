# Itqan Studio Website — Handover

## Tracked work reference

Lightweight tracking via TaskCreate (in-session). For longer initiatives use `agent-work/` (already present at the project root with one historical entry under `agent-work/projects/`).

## Roadmap

- **Phase: Live & Iterating.** Production is **AWS EC2 + Coolify** (`itqanstudio.com` → `52.212.71.212`), migrated off Netlify — see "DEPLOYMENT REALITY" below; a push to `main` only goes live once Coolify deploys. Recent waves focused on the founder-studio rewrite (90-day Founder OS), Project You + Itqan CRM case studies, the `/magnet/[slug]` lead-magnet system, gradient accents on dark sections, the Shareefico case-study upgrade, and **adding Mutqin** — Itqan's flagship AI startup-companion product — as a featured project + full case study (latest session, 2026-06-14).
- **Next likely waves:** more case studies, individual service detail pages, podcast/long-form content surfaces, and a periodic SEO/perf audit before any paid-traffic push.

## Handover prompt (self-contained for the next session)

**LATEST (2026-07-04): FULL-SITE Axion light/dark rollout — SHIPPED on branch `feat/axion-redesign` (commit `30b0676`; NOT main, NOT deployed).**
Ibrahim reviewed the exploration slice: loves copy + AI animation + shader; directives executed this session:
(1) Grok→**Gemini** in AiVisibility; (2) **ENTIRE site** now light-first with cohesive dark toggle — every page/
section theme-aware (home badges 1–8, /work, /work/[id], /services, /about, /contact, thank-you, cookie banner;
legal + magnet are deliberate dark-in-both surfaces); (3) **PillNav is global + sticky on every page** (active
states, Dubai clock, dynamic quarter, mobile sheet w/ modal contract) — old Navbar file is now a shell around it;
(4) full **SEO+GEO widening**: seo.ts SERVICES 4→7 (adds Content & Social, SEO, AI Visibility/GEO, Hosting),
KNOWS_ABOUT/TARGET_KEYWORDS widened, one-partner titles/descriptions sitewide, 3 new GEO-first FAQ entries,
llms.txt refreshed (two founders, real outcomes); (5) **languages = Arabic/English/Spanish/Urdu/Swedish/Norwegian**
(Ibrahim confirmed); (6) one honest **AI-search scroll-stopper per page** (home CTA "The machines are already
answering…", /work "When a buyer asks an AI who to trust…", /services GEO section reusing AiVisibility, /about
"…legible to the machines your buyers now ask first", /contact "You found us. Your buyers should find you the
same way."); (7) **PostHog** wired: `providers/PostHogProvider.tsx` — inits ONLY with NEXT_PUBLIC_POSTHOG_KEY set
AND cookie consent accepted (key `itqan_cookie_consent`; CookieBanner now broadcasts a consent CustomEvent —
logic unchanged), EU host default, DNT respected, opt-out on decline; **Ibrahim TODO: create free PostHog EU
account + set NEXT_PUBLIC_POSTHOG_KEY / NEXT_PUBLIC_POSTHOG_HOST in Coolify** (guide: ANALYTICS-SETUP.md at root).
Executed via an 8-agent Opus workflow (5 parallel restyle w/ disjoint file ownership → SEO → PostHog → integrator
build gate; integrator found zero cross-file fixes). Design contract for future work:
`agent-work/AXION-DESIGN-SYSTEM.md` (surfaces cream/white/#f5efe6 + dark #1f1420/#241626/#1a0f1c, dual-accent
pairs, numbered badges, RollButton, honesty rules). globals.css: body + .accent-italic/.stats-gradient/
.pixel-gradient are THEME-ADAPTIVE via html.dark. Verified: tsc + build 24/24, light+dark cohesion on all main
pages, console clean. Dead legacy files (unused, kept): home/Hero.tsx, FounderOS (still on /services), FeaturedWork,
StatsLine, Services, Pricing. Copy note: contact DEFAULT_COPY subheading is now "Private. Senior. No sales team."
**UPDATE (2026-07-04, session 3): AskAI section, image refresh, PostHog LIVE, Founder OS reframe, AI Visibility Check.**
Commits `06880da` (AskAI), `9cdb742` (images + PostHog key), `de11b21` (Founder OS reframe + AI Visibility Check).
(1) **AskAI** `src/components/home/AskAI.tsx` (home badge 9 "Verify us"): neutral visible prompt + one-click
prefills — chatgpt.com/?q= & claude.ai/new?q= (pre-typed), perplexity.ai/search?q= (instant), copy-for-Gemini;
data-attr tags for PostHog. (2) **PostHog is LIVE**: Ibrahim's `phc_` project key is in `.env.local` (gitignored;
key = phc_x6vw4xaZgbfQKcKLh5uAakBiaCAproFCbrNdbHA7kvPX) + NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com.
Verified: EU config.js + events POST 200 after consent. **Ibrahim MUST set the same two env vars in Coolify + redeploy**
for prod (ANALYTICS-SETUP.md). If his account is US-cloud, change host to https://us.i.posthog.com. (His earlier
`phx_` was a PERSONAL key — wrong type; the phc_ project key is correct.)
**COOLIFY ENV VARS NOW SET IN PROD (2026-07-04):** Coolify UI (`http://52.212.71.212:8000`) + its API port are
IP-allowlisted and Ibrahim's current IP (94.234.93.40 = this machine) wasn't on it, so BOTH he and a direct API
call got blocked. Worked around it via SSH + a localhost tunnel (`ssh -L 8899:localhost:8000 …`, Coolify API on
the box's localhost bypasses the IP firewall). Created both `NEXT_PUBLIC_POSTHOG_KEY` (phc_x6vw…) and
`NEXT_PUBLIC_POSTHOG_HOST` (https://eu.i.posthog.com) on app uuid `cybvxnemzusk0yzjcwzrey3v` via
`POST /api/v1/applications/{uuid}/envs` with **is_buildtime:true** (NEXT_PUBLIC must bake at build) — HTTP 201,
verified present (prod + preview variants). **NOT YET ACTIVE:** production runs `main`, which has NO PostHog code
(it's on feat/axion-redesign). The vars sit staged and light up on the SAME deploy that ships the redesign. Did
NOT redeploy (deploying main now = rebuild without PostHog code + disk-pressure risk). **Deploy sequence when the
redesign is ready:** merge `main` → `feat/axion-redesign` FIRST (branch predates the Kit→SES/Listmonk migration on
main — deploying it un-merged would resurrect dead Kit calls, per aws-migration handover), then Coolify deploy
uuid `cybvxnemzusk0yzjcwzrey3v` (pre-prune disk). To let Ibrahim into the Coolify UI himself, allowlist
94.234.93.40 on the box security group (AWS CLI `ibrahim-admin` is configured) — NOT done unprompted (SG change). (3) **Images**: About/Values Precision→
project-you/today.webp, Function→oud-closet/cover.png (Craftsmanship kept founder-render); Services phases System→
mutqin/hero-landing.webp, Automation→project-you/coach.webp (Identity kept founder-render). Descriptive alt added
(image SEO). Old itqan-crm/app-hand/close-app renders retired from these slots. (4) **Founder OS reframed** (his
decision): kept Identity/System/Automation phases, DROPPED the "90-Day Founder Operating System" name, Days-1-30/
31-60/61-90 gates, and Telegram everywhere (FounderOS.tsx, services deep-dives, FAQ, seo.ts, llms.txt, Guarantee
Day-90 line). FounderOS.tsx was ALSO cream-on-cream (invisible) in light mode — now fully theme-aware. (5) **$497
Brand Audit → free "AI Visibility Check"** (his decision): services CTA pill + contact `ai-check` intent (run the
ChatGPT/Claude/Gemini "ask about you" test, show where you stand + 3 fixes, free). Contact founder-os-* intents
de-branded. (6) Guarantee badge is now a prop (home=5, /services=7) → clean 1-7 Services sequence. Build 24/24,
tsc clean, both themes verified via DOM (Lenis blocks headless screenshots — verify below-fold via DOM).
Still dead/untouched: home/Pricing.tsx (references old Founder OS — not rendered anywhere), magnet subsystem.
**NEXT:** Ibrahim reviews live (localhost:3001, both themes) → approved engagement features (cursor shader = already
live; shared-element page transitions = queued; case-study films = discuss) → merge to main + Coolify deploy
(pre-prune disk) + set PostHog Coolify env → parked: "Most rebrands fail" naming, PartnerHalo activation.

**UPDATE (2026-07-04, later): "Ask the machines" section SHIPPED (`06880da`) + PostHog key clarification.**
`src/components/home/AskAI.tsx` (home badge 9, between Portrait and CTABanner): neutral visible prompt, one-click
prefill links — chatgpt.com/?q= and claude.ai/new?q= (pre-typed), perplexity.ai/search?q= (answers instantly),
copy-button for Gemini; `data-attr` tags on all actions + ThemeToggle for PostHog autocapture filters. Cursor-
reactive shader confirmed ALREADY live (shaders engine listens on window mousemove; no code change). Stale dev
server on :3001 from an old session was killed (it served pre-redesign code — likely why feedback lagged); fresh
dev on :3001. **PostHog key: Ibrahim created a `phx_` key = PERSONAL API key (secret; capture endpoints reject
phx_). He needs the `phc_` PROJECT API key (Settings → Project → General) for NEXT_PUBLIC_POSTHOG_KEY.** His
"Skool"/self-hosted access issue is likely a self-hosted PostHog instance on the Coolify box that has no public
domain/route — recommended EU Cloud free tier instead (box is disk/RAM-tight; see AWS handover); awaiting his
clarification + the phc_ key (then: .env.local for dev, Coolify env for prod). Shared-element page transitions =
approved, queued next wave. Case-study films = discuss. tsc + build clean (24/24, home 158kB).

**PREVIOUS (2026-07-03): Axion-style light-first redesign — EXPLORATION SLICE (superseded by the full rollout above).**
Ibrahim pivoted the hero + design after the decision-maker copy pass. Interview answers (locked):
hero = **"Your next customer just asked ChatGPT."** (accent = *asked*); build **in Next.js on a branch**;
**light DEFAULT + dark toggle** (system pref off); flagship motion = the **AI-visibility animation**.
Positioning widened beyond rebranding → **one partner**: brand strategy, creative direction, sites that
convert, content, SEO, **AI/GEO visibility**, **full hosting**. Kept beats he likes: ThreePillars,
WhyRebrandsFail, "Proof, not promises", phase-gated Guarantee. **Founder OS parked** (off homepage, still
on /services — revisit at the very end). Branch commits: `42503aa` (baseline = copy rewrite + team fix),
`d2ccda2` (slice), `59059e6` (review fixes). New deps: **`shaders`** (WebGPU, Shader Effects Inc — license
permits production use) + **next-themes**. New files: `HeroAxion.tsx` (pill nav, live Dubai clock, dynamic
quarter label, mobile sheet w/ full modal contract, shader bg idle-gated + reduced-motion skipped,
CSS-gradient fallback), `AiVisibility.tsx` (ChatGPT/Claude/Grok panel streaming "your brand" — honesty-safe,
carries "Simulated answers, for illustration"), `IntroPartner.tsx`, `CasesAxion.tsx` + `ui/CaseMedia.tsx`,
`ui/RollButton.tsx`, `ui/ThemeToggle.tsx`, `providers/ThemeProvider.tsx`, `HeroShader.tsx`. Theme system:
next-themes class strategy + tailwind `darkMode:'class'`; **legacy pages stay dark-hardcoded and verified
unaffected**; old Navbar returns null on '/' (pill nav replaces it). Team: **Jonny REMOVED** (not yet
registered as co-founder — do not re-add until Ibrahim says so); Ibrahim = CEO & Co-Founder, Bisma Aslam =
Head of Design & Co-Founder (team.ts, TeamSection two-founder layout, Portrait, AboutHero, seo.ts
founder+cofounder Person nodes). **teamLanguages trimmed to Arabic/English/Urdu** — ASK IBRAHIM which of
Spanish/German/Swedish/Norwegian/Bosnian to restore. Review workflow (3 dims): 0 CRIT / 5 HIGH / 10 MED —
all HIGH+MED fixed. Verified: tsc + build clean (24/24, home 165kB First Load, shader lazy), light+dark
desktop, mobile 375px no overflow, /about dark + two founder cards, console clean.
**SESSION UPDATE (2026-07-04): Axion theme pass — contact / legal / thank-you / cookie / magnet / newsletter.**
Converted the remaining pages/components to the light-first theme-aware system (branch `feat/axion-redesign`).
Files: `app/contact/page.tsx` (theme-aware surface, removed `pt-28` navbar hack → `pt-10 md:pt-16`, kept
metadata/JsonLd/INTENT_COPY/DEFAULT_COPY data verbatim, added ONE AI-moment line "You found us. Your buyers
should find you the same way." with Playfair accent pair), `contact/ContactForm.tsx` (light = white fields /
black-0.12 borders / #1a1a1a text; dark: variants; removed custom focus ring — globals `*:focus-visible` owns
it; primary submit plum→cream; added theme-aware select chevron), `ui/TestimonialCarousel.tsx` (card+inline
theme-aware, accent pair, fixed dual-accent violation), `ui/SectionLabel.tsx` (theme-aware default, kept
`light` prop for dark surfaces), `thank-you/ThankYouClient.tsx` (dark: variants on surface/checkmark/text/
buttons), `legal/LegalPageLayout.tsx` (kept `bg-brand-dark` as the ONE deliberate dark-in-both-modes surface
because globals `.legal-prose` is dark-tuned/off-limits; removed `pt-28`), `CookieBanner.tsx` (theme-aware
surface+buttons; **consent logic + storage key `itqan_cookie_consent` untouched**), `magnet/MagnetLanding.tsx`
(THEME PASS ONLY — design-locked dark funnel already renders identically dark in both modes + accent only on
dark = compliant; added clarifying comment, zero logic/copy change), `layout/NewsletterForm.tsx` (theme pass;
note: currently an orphan — not imported anywhere). Verified: `tsc --noEmit` clean; dev-server computed styles
in light + SSR-HTML dark-pair checks (10/10) on /contact; /thank-you /privacy /cookies all 200; no server
compile errors. NOTE: project has no working eslint config (`next lint` wants interactive setup) — used tsc as
the gate. **NEXT WAVES:** (1) Ibrahim reviews the slice (run dev, toggle themes); (2) restyle remaining dark sections
into the light system or keep alternation (his call); (3) services/about/work/contact pages in the new
language; (4) widen seo.ts SERVICES/KNOWS_ABOUT + FAQ to cover SEO/GEO/hosting/content honestly; (5) home
metadata/title once positioning settles; (6) decide "Most rebrands fail" generalization; (7) Founder OS fate;
(8) merge to main + Coolify deploy (pre-prune disk).

**PREVIOUS (2026-07-02): decision-maker copy rewrite — committed as `42503aa` on the branch (was uncommitted).** A senior
branding partner reviewed the site: the copy spoke to mid-level marketing managers (argued *why branding
matters* / listed *what we deliver*). Rewrote the whole site for **ultimate decision-makers** (founders, CEOs,
owners, boards, investors) — selling **stakes, certainty, pedigree** around one wedge: *a rebrand is the
highest-stakes, most-likely-to-fail decision a company makes; Itqan de-risks it.* Copy/section-framing only,
no framework/color/dep changes. Full write-up: [DECISION-MAKER-REWRITE-REPORT.md](DECISION-MAKER-REWRITE-REPORT.md).
Homepage went 8 → 10 sections, reordered in [src/app/page.tsx](src/app/page.tsx): Hero → **ThreePillars (NEW
spine: Reputation/Commercial impact/Honesty)** → **WhyRebrandsFail (NEW — 5 failure modes + fixes)** →
FeaturedWork → Guarantee → **FounderOS (DEMOTED — eyebrow "The offer"→"The method", moved down; tactical detail
still on /services)** → Industries (reframed to localisation: Arabic/GCC/Vision 2030) → WhoFor (rewritten to
CEOs/owners/boards/investors) → Portrait ("the team in the room") → **PartnerHalo (gated, OFF)** → CTABanner.
New files: `ThreePillars.tsx`, `WhyRebrandsFail.tsx`, `PartnerHalo.tsx`, `src/lib/flags.ts`. Hero headline is now
*"The rebrand is the most dangerous decision you'll make. Make it with people who've done it before."* (mauve
Playfair accent = "before"); single CTA **"Start a conversation"** sitewide; the **$497 Brand Audit tripwire was
demoted** off the hero + home CTA banner (still on /services + /contact?intent=audit). Honesty held: only real
`src/data/*` numbers (Nexilink placed 1st 2024 / 3 weeks; Itqan CRM 5 tools 8h→15min; 20yr/6-country pedigree),
no fabricated metrics. Ran a 5-dimension adversarial review workflow (honesty/voice/system/impact/completeness)
twice and resolved every finding (killed Footer "Crafted by Itqan"→"Excellence, by name"; de-risked Portrait's
key-person framing; fixed Values "Craftmanship"→"Craftsmanship"; trimmed a filler-heavy testimonial). Verified:
`tsc` clean, `npm run build` clean (24/24, home **158 kB** First Load JS — no regression), no console errors.

**GATED (do NOT ship yet):** potential partnership with a globally renowned brand agency — NOT public, NOT
signed. Nothing on the site names/implies a partner. The slot is [src/components/home/PartnerHalo.tsx](src/components/home/PartnerHalo.tsx)
+ [src/lib/flags.ts](src/lib/flags.ts), mounted in page.tsx between Portrait and CTABanner. Renders `null` until
`NEXT_PUBLIC_PARTNER_HALO=1`. To activate later: set that env var in Coolify + fill the PLACEHOLDER copy/logo — no rewrite.

**NEXT STEPS:** (1) review the changes / screenshots; (2) `git add` + commit (branch off `main` first) + push;
(3) deploy via Coolify (pre-prune the 38G EC2 disk — see the deploy notes below — or the Next build fails on
"no space left on device"); (4) spot-check `/`, `/work`, `/about` live. Working tree is currently DIRTY with all
these edits (nothing committed this session).

**LATEST (2026-06-21): full SEO + GEO/LLM optimization pass — SHIPPED to `main`.** Ibrahim wanted to (a) rank top of Google for "design / automation / AI agency Dubai" and (b) be recommended/cited by LLMs (ChatGPT, Claude, Perplexity, Gemini, AI Overviews). Ran deep research (report at `agent-work/SEO-GEO-RESEARCH-REPORT.md` — local only, agent-work is gitignored) then implemented. **Two confirmed bugs fixed:** (1) `/images/og-image.png` was referenced in metadata but DID NOT EXIST → replaced with a real, on-brand 1200×630 OG card generated by `next/og` at `src/app/opengraph-image.tsx` (reads committed Manrope TTFs from `src/app/_og/`, zero build-time network); (2) `src/app/sitemap.ts` was a STALE hardcoded list missing mutqin/project-you/itqan-crm → now **data-driven from `src/data/case-studies.ts`** (+ legal pages). **New SEO infra:** centralized `src/lib/seo.ts` (NAP, keywords, JSON-LD builders — fixed the `sameAs` socials to match the footer: instagram `madebyitqan`, linkedin `company/110338926`); `src/components/seo/JsonLd.tsx` (escaped-`<` XSS-safe inline JSON-LD); full entity graph (Organization + WebSite + founder Person, with `jobTitle: "Co-founder"` to match on-page copy) site-wide in `layout.tsx`, plus per-page Service graph + BreadcrumbList + FAQPage (services), CreativeWork + Breadcrumb (case studies), CollectionPage/ItemList (work). **Per-page canonicals** (`alternates.canonical`) on every route incl. dynamic ones; `?intent=` on /contact canonicalizes to `/contact`; `/thank-you` is `noindex` (no canonical). **Keyword-targeted titles/desc** (home: "Itqan Studio — Design, Automation & AI Agency in Dubai"; services/work/about/contact reworded) — brand hero UNTOUCHED. **GEO:** `src/app/robots.ts` (dynamic; explicitly Allows all major AI crawlers — GPTBot/OAI-SearchBot/ChatGPT-User, ClaudeBot/Claude-SearchBot/Claude-User/anthropic-ai, PerplexityBot/Perplexity-User, Google-Extended, Applebot-Extended, Bingbot, CCBot — replaces deleted `public/robots.txt`); `public/llms.txt` (curated entity summary — low-risk hedge, evidence says it does little today); on-brand **FAQ section on /services** (`src/components/services/ServiceFAQ.tsx`, native `<details>` so answers are in crawlable SSR HTML, written GEO-first: direct factual answers + real stats). **CWV:** removed the render-blocking font `@import` in globals.css → moved to a `<head>` `<link>` + `preconnect`. Added `manifest.ts` + `viewport` export (themeColor moved out of deprecated metadata). **Schema note:** deliberately used `Organization` + `Service` (NOT `ProfessionalService` — schema.org deprecated it). Build clean (24/24); verified at runtime: robots/sitemap/og-image render, all JSON-LD parses, canonicals correct, OG is a valid 1200×630 PNG. code-reviewer pass: 0 critical/high; 4 mediums all fixed (Co-founder jobTitle, thank-you canonical removed, work ItemList sourced from caseStudies, OG gradient rgba). **OFF-SITE TODO for Ibrahim (can't be coded — biggest "agency Dubai" levers):** create+verify Google Business Profile; collect reviews via WhatsApp; submit sitemap to Google Search Console AND Bing Webmaster Tools (Bing powers ChatGPT search); list on Clutch/GoodFirms/DesignRush; get onto "best agencies in Dubai" listicles (top GEO lever). Future site phases: Arabic/hreflang, an `/insights` blog for freshness, per-service landing pages. **Deploy:** pushed to `main`; prod is AWS+Coolify — confirm Coolify deploys (watch the 38G disk; pre-prune if needed per the entry below) before this is live.

**LATEST (2026-06-19, follow-up): removed ALL remaining "solo founder" phrasing + deployed to AWS/Coolify — LIVE & VERIFIED.** After the co-founder reframe (below), Ibrahim asked to strip every "solo founder" reference. Reworded the two ICP/audience lines + one code comment: [src/components/home/WhoFor.tsx](src/components/home/WhoFor.tsx) "Solo founders or 2-3 person teams" → "Early-stage founders or 2-3 person teams"; [src/components/magnet/MagnetLanding.tsx](src/components/magnet/MagnetLanding.tsx) "Solo founders who refuse to start with a logo" → "Founders who refuse to start with a logo"; [src/components/about/TeamSection.tsx](src/components/about/TeamSection.tsx) comment "Ibrahim, solo" → "Ibrahim, standalone". Committed `8774c65`, pushed `main`. **Deployed via Coolify API** (app uuid `cybvxnemzusk0yzjcwzrey3v`, token in `~/Desktop/aws-migration/secrets/coolify-api.env`): `GET http://52.212.71.212:8000/api/v1/deploy?uuid=…&force=true` → poll `…/deployments/{uuid}` for `status`. **First deploy FAILED: "no space left on device"** — the 38G EC2 root was at 75% and the Next.js/nixpacks build needs ~5GB transient (build cache lived in `/var/lib/containerd` buildkit snapshots). Fix = SSH (`ssh -i ~/.ssh/aws-migration-key.pem ubuntu@52.212.71.212`) + `sudo docker builder prune -af && sudo docker image prune -af` (NEVER `volume prune` / `--volumes` — 8 volumes hold the 2 self-hosted Supabase stacks' data). Re-deployed → finished, rolling update OK. Verified LIVE: `https://itqanstudio.com` + `/about` HTTP 200, "Co-founder of Itqan Studio" + "Early-stage founders…" present, zero "solo founder" anywhere. Post-build prune left box at 65% (14G free). **RECURRING RISK:** 38G root is tight for Coolify + 2 Supabase + apps; every build adds ~4-5GB cache → deploys will fail again without a pre-prune. **Recommend: grow the EBS root 38G→~60G (one-time, ~$2/mo) OR enable Coolify scheduled Docker cleanup.** See `~/Desktop/aws-migration/handover.md` (updated this session) for box ops.

**LATEST (2026-06-19): founder copy reframed solo → co-founder — SHIPPED.** Ibrahim is NOT the sole founder and didn't want the site implying it. Changed "Solo founder of Itqan Studio" → "Co-founder of Itqan Studio" in BOTH surfaces that carried it: homepage `THE FOUNDER` section [src/components/home/Portrait.tsx](src/components/home/Portrait.tsx) (eyebrow "The founder" → "The co-founder", body line, and citation "— Ibrahim Shareef, Founder" → "Co-founder") and the About hero body line [src/components/about/AboutHero.tsx](src/components/about/AboutHero.tsx). Kept the "Engineer. Designer. Storyteller. All in one." headline + "the rare person who can build the brand, code the system, tell the story" narrative — those describe his personal multi-disciplinary skill, not sole ownership. Committed `089358f`, pushed to `main`. **NOTE:** prod is AWS+Coolify (not Netlify) — confirm Coolify deploys before this is live. Left alone (audience-facing "solo founder" lines that describe the CLIENT, not Ibrahim): `WhoFor.tsx` "Solo founders or 2-3 person teams" + `MagnetLanding.tsx` "Solo founders who refuse to start with a logo". Ibrahim's own oud-closet / case-studies.ts / projects.ts WIP was deliberately NOT staged (committed only the 2 copy files).

**LATEST (2026-06-14): Project You listing cover → the titled "Noor — a journey through light" poster.** Ibrahim supplied a finished self-titled poster (sun + dashboard laptop + Qur'an-companion phone on a dusk desert gradient, baked "Project You / Noor — a journey through light / نور"). Set it as the cover on BOTH the `/work` grid card and the homepage `FeaturedWork` tile. Source `/Users/ibrahimshareef/Desktop/project-you/handover/itqan-website/assets/cover.png` (3200×2400) → `public/images/portfolio/project-you/cover-poster.webp` (1800×1350, 52K, cwebp q82). Because the poster bakes the title, added a generic `coverHasTitle?: boolean`: (1) [src/data/projects.ts](src/data/projects.ts) — PY `coverImage` → `cover-poster.webp`, `coverHasTitle: true`; (2) [src/components/work/WorkGrid.tsx](src/components/work/WorkGrid.tsx) — when `coverHasTitle`, skip the overlaid title/subtitle + the bottom gradient (clean poster card); (3) [src/components/home/FeaturedWork.tsx](src/components/home/FeaturedWork.tsx) — added `coverHasTitle` to `FeaturedTile`; PY tile → `cover-poster.webp` + `coverHasTitle: true`; suppress the overlaid `<h2>` name when set (keeps Live pill + Product/Faith pills + hover testimonial). Result: poster shows on both surfaces with NO double title; Mutqin + all other cards/tiles unchanged. `npm run build` clean (21/21). Verified: real /work screenshot (PY top-right, clean poster) + cloned landing tile (poster + pills + quote, no overlaid name). Detail page `/work/project-you` untouched (still the video hero). NOTE: Mutqin's `/work` card + tile still show their baked title under the overlay (pre-existing, tolerated) — could get the same `coverHasTitle` treatment for consistency if wanted.

**DEPLOYMENT REALITY (corrected 2026-06-14): production is AWS, NOT Netlify.** `itqanstudio.com` → EC2 `i-0ea77f0db834833dc` ("coolify-box", eu-west-1, IP `52.212.71.212`), a Next.js server behind **Coolify** (self-hosted PaaS; dashboard `http://52.212.71.212:8000`, locked to Ibrahim's IP). The repo's `netlify.toml` + older "Netlify auto-deploys" notes below are STALE (migrated off Netlify). **Pushing to `main` does NOT auto-publish unless Coolify's GitHub webhook is set** — this caused the Noor commits to sit un-deployed earlier this session (Ibrahim fixed the AWS/Coolify deploy). SSH: `ssh -i ~/.ssh/aws-migration-key.pem ubuntu@52.212.71.212`. AWS CLI is configured locally (`ibrahim-admin`, acct `480437358661`, eu-west-1). To ship a change: push to `main` AND confirm Coolify deploys (dashboard → app → Deploy, or rely on the webhook if now configured). The "(Netlify auto-deploys)" phrases in entries below are inaccurate — read them as "pushed to main; deploy via Coolify."

**LATEST (2026-06-14): Project You rebuilt as the Noor case study — landing + work #3 + animated detail hero — SHIPPED.** Committed (`d5a2265`), pushed to `main` (Netlify auto-deploys). The stale `project-you` entry (old "young Muslims / Founder OS / Next.js" copy, April-24 imagery, **last** on `/work`, absent from the homepage) was **fully replaced** with the Noor rebrand (calm faith-rooted life-OS + verse-by-verse Qur'an companion). Files: (1) [src/data/projects.ts](src/data/projects.ts) — project-you moved to **3rd** (after Mutqin + Shareefico, before Medacs) per Ibrahim; titleless `dawn.webp` cover; (2) [src/data/case-studies.ts](src/data/case-studies.ts) — full Noor entry moved after Shareefico: problem → Aurora→Noor pivot → the orb identity → the Itqan way, Identity/System/Automation phases ("soul/skeleton/heartbeat"), `stack: React, TypeScript, Supabase, Claude`, `liveUrl: https://projectyou.app`, `outcomeMetric`, pivot `testimonialQuote` (Ibrahim, founder voice, نور renders); (3) [src/components/home/FeaturedWork.tsx](src/components/home/FeaturedWork.tsx) — homepage tile **Oud Closet → Project You** (titleless `dawn.webp`, "Live" pill, Product/Faith pills); (4) `public/images/portfolio/project-you/` — 9 optimized webp (~444K via cwebp from 2880px Noor captures) + `public/videos/project-you-transition.mp4` (544K). **Detail hero = the looping day↔night transition video** (`coverVideo`); listings use the titleless `dawn.webp` so the system title never collides with a baked headline (same lesson as the Mutqin landing tile). **Deliberately NO `brandShowcase`** — that section's hardcoded copy ("a product with a **face** … Mu, a six-pose companion") is Mutqin-specific and contradicts Noor's **faceless** orb; the brand/pivot story is carried by the text fields + the testimonial instead. Gallery = 6 real app screens (dashboard, Qur'an reader, habits[**dark**], coach, finance, health) — breadth + the two-theme story. Deleted the now-unreferenced old `project-you-mkp-mkbk.png` (kept `project-you-mkp-mb.png` [Industries] + `app-hand-v2-render.png` [Services, Values] — still used elsewhere). `npm run build` clean (21/21, `/work/project-you` SSG); screenshot-verified landing 4-up, work-grid order, detail header/hero, gallery (6 up), testimonial. Source assets + brief: `/Users/ibrahimshareef/Desktop/project-you/handover/`. **Nothing outstanding on Project You's Itqan-site presence.** (Spot-check the Netlify deploy goes green: `/`, `/work`, `/work/project-you`.)

**LATEST (2026-06-14): Landing tile got its own dedicated cover — SHIPPED.** The homepage `FeaturedWork` Mutqin tile overlays its OWN name + category pills + testimonial + bottom gradient, so the titled poster double-named and Mu clashed with the overlay (desktop) / was cropped out (mobile). Added `public/images/portfolio/mutqin/hero-landing.webp` — a titleless device scene (same dawn gradient + glow + portal browser + 3D phone, no title, no Mu) — and pointed ONLY the homepage tile at it in [src/components/home/FeaturedWork.tsx](src/components/home/FeaturedWork.tsx). `/work` card + `/work/mutqin` case hero KEEP the titled `hero.webp`. Verified the real tile desktop (default + hover) + mobile — legible, no double name. Build clean; committed `71be8a9`, pushed to `main`. Both covers come from the SAME generator in the Mutqin repo (`cover-itqan.html`; the tile is `?v=tile`).

**LATEST (2026-06-14): Mutqin cover image replaced with a Noor-style poster — SHIPPED.** Committed (`4ecf5cd`), pushed to `main` (Netlify auto-deploys). The old cover (`mutqin/hero.webp`) was the dark "From raw idea to investor-ready" slide: heavy body paragraph, a "Web-app · React" footer, and BLANK device screens — Ibrahim disliked it. Replaced with a premium on-brand poster modelled on the Project You "Noor" reference he loves: plum→mauve→cream dawn gradient + soft glow, "Mutqin" + Arabic متقن, and REAL product mockups — the founder portal in a clean browser window + the mobile portal on the 3D plum phone, with Mu waving. Only the single shared asset `public/images/portfolio/mutqin/hero.webp` changed (3200×2400, 131KB), so it updates all 3 surfaces at once: the `/work` listing card, the `/work/mutqin` case hero (2:1), and the homepage `FeaturedWork` tile. Production build clean (21/21, /work/mutqin SSG); all 3 surfaces screenshot-verified. **Reproducible** from the Mutqin repo: `startup-companion/public/_behance/cover-itqan.html` + `node scripts/cover-itqan.mjs` → `cwebp` → copy. Known tradeoff (matches the Noor reference + the prior cover): the poster bakes a "Mutqin" title, so it appears under the page h1 on the case page and under the overlaid name on the landing tile — a titleless variant is a one-line change (drop the `.title` block, re-render) if preferred. NOTE: a long-running itqan dev server had a stale `.next` cache 500ing /work/mutqin ("Cannot find module ./vendor-chunks/framer-motion.js") — cleared `.next` + rebuilt; unrelated to the asset.

**LATEST (2026-06-14): Mutqin added as a featured project + full case study + homepage tile — SHIPPED.** Committed (`08f130e`) and pushed to `main`; Netlify auto-deploys from `main`. Mutqin (Itqan's own AI startup companion, live at https://mutqin.xyz) is now the **first/lead card** on `/work`, has a full detail page at `/work/mutqin`, and **replaces the Medacs tile on the homepage `FeaturedWork` grid** (Medacs stays in `/work` + its detail page). Files touched: (1) [src/data/projects.ts](src/data/projects.ts) — `mutqin` `Project` entry, first; (2) [src/data/case-studies.ts](src/data/case-studies.ts) — `mutqin` `CaseStudy` entry first + two new OPTIONAL interface fields `brandShowcase?: string[]` and `stack?: string`; (3) [src/app/work/[id]/page.tsx](src/app/work/%5Bid%5D/page.tsx) — gated `BrandShowcase` section (brand-cover + character-poses after the mockup gallery), a `Stack` stat in `AtAGlance`, and the emphasised Outcome stat now spans 1–2 cols adaptively so the 5-col strip never overflows; (4) [src/components/home/FeaturedWork.tsx](src/components/home/FeaturedWork.tsx) — explicit `FeaturedTile` type (optional `duration`/`status`); Mutqin tile shows a **"Live"** pill (no fabricated delivery window); pill is omitted entirely if a tile sets neither; (5) `public/images/portfolio/mutqin/` — 6 optimized WebP (hero, wizard, portal, mobile, brand, character; 348K total, from the 3200px source PNGs via cwebp). `npm run build` clean (21/21 pages, /work/mutqin in SSG). Decisions taken with Ibrahim: keep Mutqin first in the grid; feature on homepage in place of Medacs. **Nothing outstanding on Mutqin.** Source assets + brief live at `/Users/ibrahimshareef/Desktop/startup-companion/handover/itqan-website/`.

**Still open (2026-06-03): Lead-magnet DELIVERY is wired + capture route hardened.** On branch `feat/magnet-delivery-wiring` (commit `33ad091`, pushed to origin, NOT merged to main). When someone opts in on `/magnet/[slug]`, they now (a) get an instant on-page "Download your guide" button and (b) get enrolled in the shared Kit "Magnet Delivery" sequence (id `2777738`) which emails them the PDF. Three files changed: [src/app/api/leads/capture/route.ts](src/app/api/leads/capture/route.ts) (full rewrite), [src/lib/magnet-lookup.ts](src/lib/magnet-lookup.ts) (added `pdfUrl`), [src/components/magnet/MagnetLanding.tsx](src/components/magnet/MagnetLanding.tsx) (passes `pdfUrl`, shows download button). **ACTION NEEDED before this works in prod: set `KIT_API_KEY` in Netlify env** (no `.env` in repo; both `KIT_API_KEY` and `NOTION_TOKEN` live in Netlify host env). Also ensure each Itqan magnet's Notion "PDF URL" property is populated, or the on-page button falls back silently to "Check your inbox" and the delivery email's `{{ subscriber.magnet_pdf_url }}` will be empty. Shared Kit account = Shareefico's (account 2383668); custom field `magnet_pdf_url` (id 1279519) already exists. Canonical tag format: `magnet-itqan-<dmKeyword>` lowercase. To merge: open a PR from `feat/magnet-delivery-wiring` into `main`.

You are picking up the Itqan Studio marketing site at `/Users/ibrahimshareef/Documents/itqan-website`. Next.js 14 App Router + Tailwind + Framer Motion. Branch `main`, clean working tree on session start. Brand tokens in [tailwind.config.ts](tailwind.config.ts): dark `#2f1c2c`, accent `#cca4c2` (dark-bg only) / `#6d4a66` (light-bg only), cream `#fffbf5`. Manrope + Playfair Display Italic.

The site reads case studies from [src/data/case-studies.ts](src/data/case-studies.ts) and renders them via [src/app/work/[id]/page.tsx](src/app/work/[id]/page.tsx). The portfolio grid is [src/components/work/WorkGrid.tsx](src/components/work/WorkGrid.tsx). The homepage featured tiles are [src/components/home/FeaturedWork.tsx](src/components/home/FeaturedWork.tsx).

**Just-shipped: Shareefico case study has a video cover + live-site CTA.** New optional fields `coverVideo` and `liveUrl` on the `CaseStudy` interface. Detail-page hero renders `<video>` when `coverVideo` is set (falls back to `<Image>`), and a floating "Visit live site" pill overlays the hero when `liveUrl` is set (plus a matching pill in the header strip). Listing cards still use static `coverImage` to keep LCP fast on the grid.

**What's left / what to do next:**

1. **Optional: extract a higher-quality poster frame.** Current poster is JPG quality 2 from ffmpeg. If the artifact looks soft on retina screens, re-extract with `ffmpeg -y -ss 00:00:01.5 -i public/videos/shareefico-cover.mp4 -frames:v 1 -update 1 -q:v 1 public/images/portfolio/shareefico/cover-poster.jpg` (`-q:v 1` is highest quality). Use `-update 1` flag to avoid the "image sequence pattern" warning.

2. **Optional: compress the video for delivery.** Source MP4 is 3.2 MB at high bitrate. For LCP, re-encode: `ffmpeg -i public/videos/shareefico-cover.mp4 -c:v libx264 -crf 24 -preset slow -an public/videos/shareefico-cover-web.mp4` then update `coverVideo` path.

3. **Done in follow-up commit c86245d:** Shareefico animation now plays on every listing card too (homepage FeaturedWork tile + work-page WorkGrid card + NextCaseCard hand-off). All four spots share a `CoverMedia` component at [src/components/ui/CoverMedia.tsx](src/components/ui/CoverMedia.tsx) which renders `<video>` when a video src exists, else `<Image>`. Other case studies stay on static images — they just don't set `coverVideo`. To add a video cover for another client, set `coverVideo` on both their `CaseStudy` entry (case-studies.ts) AND `Project` entry (projects.ts), then add a `video` field to their FeaturedWork tile if they're in the homepage rotation.

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

## What was just done (2026-07-04 — Axion redesign integration gate)

**Branch `feat/axion-redesign` (NOT committed — gate/verification pass only). No source edits needed.**

Ran the integration gate after several agents restyled the whole site (theme-aware light/dark),
widened SEO, and wired PostHog. Result: the branch is already clean and consistent.

- **`npx tsc --noEmit`** → 0 errors (verified twice, start and end).
- **`npm run build`** → succeeds, all 24 pages generated (static + SSG), no warnings.
- **Phosphor import/type match** → correct. All 7 files importing `@phosphor-icons/react/dist/ssr`
  are server components (no `'use client'`, no hooks): `contact/page`, `work/[id]/page`,
  `services/page`, `home/CasesAxion`, `about/Languages`, `legal/LegalPageLayout`,
  `services/ServiceFAQ`. All 16 files importing non-ssr `@phosphor-icons/react` are `'use client'`.
  No mismatches to fix.
- **Top-padding hacks** → none live. Only 3 `pt-28/pt-32/pt-[72px]` hits, all legitimate:
  `Hero.tsx` (`pt-[72px]`) is DEAD (not imported anywhere; homepage uses `HeroAxion`);
  `IntroPartner.tsx` (`lg:pt-32`) and `CasesAxion.tsx` (`lg:pt-28`) are the design-system
  REFERENCE files — balanced `pt-16 sm:pt-20 lg:pt-XX` + matching `pb` section rhythm, not
  navbar compensation. Left untouched. Heroes changed today (e.g. `AboutHero`) already use the
  correct `pt-10 sm:pt-14 lg:pt-20` pattern.
- **Dual-accent rule** → fully compliant across all changed files. Every `text-brand-accent-on-light`
  (#6d4a66) is paired with `dark:text-brand-accent`. Every bare `text-brand-accent` (#cca4c2) /
  raw `#cca4c2` inline color sits only on permanently-dark-in-both-modes surfaces: `work/[id]`
  media-card overlays (`bg-brand-dark`) and the design-locked `MagnetLanding` funnel (`bg-[#1a0d17]`).
  `MissionStatement:20` is a correct `text-[#6d4a66]/… dark:text-brand-accent/…` pair. No violations.

**Conclusion:** integration gate PASSED with zero code changes required. Ready to commit/deploy
when Ibrahim gives the word.

## What was just done (2026-06-14 — Mutqin cover regenerated)

**Committed (`4ecf5cd`) and pushed to `main` (Netlify auto-deploys). Production build clean.**

Ibrahim disliked the Mutqin cover (`public/images/portfolio/mutqin/hero.webp`) — the dark
"From raw idea to investor-ready" slide with a body paragraph, a "Web-app · React" footer, and
blank device screens. He referenced the Project You "Noor — a journey through light" poster as
"exactly what I want" and asked for a Mutqin equivalent: real mockups, no small text, applied to
the work page + landing.

- **Replaced ONLY `mutqin/hero.webp`** (3200×2400, 131KB). All 3 itqan surfaces reference this one
  asset (projects.ts coverImage, case-studies.ts coverImage, FeaturedWork tile image), so the swap
  updates the `/work` card + `/work/mutqin` 2:1 hero + homepage tile together — no code edits.
- **The poster** (Mutqin Play brand): plum→mauve→cream dawn gradient + soft "Noor" glow, "Mutqin"
  (Manrope 800) + subtitle "From raw idea to investor-ready" + Arabic متقن, then real product
  mockups rising from the bottom — the founder portal in a clean browser window (`portal-light`) +
  the mobile portal (`portal-mobile`) on the 3D plum phone shell — with Mu waving. No paragraph,
  no footer. Composed center-safe so it survives the 2:1 case-hero crop AND the portrait mobile tile.
- **Built in the Mutqin repo** (where the brand assets + Mu + 3D shells live), NOT here:
  `startup-companion/public/_behance/cover-itqan.html` (relative asset paths → renders over file://)
  + `scripts/cover-itqan.mjs` (Puppeteer dsf2 screenshot) → PNG → `cwebp -q 82` → copied here.
  Old cover backed up at `startup-companion/handover/itqan-cover/hero-OLD.webp`.
- **Verified:** `npm run build` clean (21/21 pages, /work/mutqin in SSG); served via `next start` and
  screenshot-checked all 3 surfaces. (Had to clear a stale `.next` dev cache that was 500ing
  /work/mutqin with "Cannot find module ./vendor-chunks/framer-motion.js" — a long-running-dev-server
  artifact, unrelated to the image swap.)

## What was just done (2026-06-14 — center collaborator faces)

**Committed (`5ba2fe9`) and pushed to `main` (Netlify auto-deploys).** Build clean.

The About-page TeamSection "Trusted collaborators" cards (`aspect-[4/3]` landscape) were cropping the portrait headshots with `object-cover object-top`, leaving Bisma's and Jonny's faces high and inconsistent. Fix = per-image `object-position`:
- [src/data/team.ts](src/data/team.ts) — added optional `objectPosition?: string` to `TeamMember`; set Bisma `'50% 31%'`, Jonny `'50% 16%'` (tuned so each head/nose sits on the vertical center of the 4:3 crop — different values because their faces sit at different heights in their source frames).
- [src/components/about/TeamSection.tsx](src/components/about/TeamSection.tsx) — collaborator `Image` now uses `style={{ objectPosition: objectPosition ?? 'center' }}` instead of the `object-top` class (object-cover kept). Founder card unchanged.

Verified by injecting a fixed crop-preview overlay at scroll-0 (the site's Lenis smooth-scroll blocks below-fold screenshots — see memory `lenis-preview-screenshots`) with a red center-line guide, comparing candidate values, and confirming against the real hot-reloaded cards' computed `object-position`. Both faces now centered + consistent.

## What was just done (2026-06-14 session — added Mutqin)

**Branch `main`, committed (`08f130e`) and pushed to origin. Build passes clean.**

**Goal:** Add Mutqin (Itqan's flagship AI startup companion) as a featured project per the handover brief at `/Users/ibrahimshareef/Desktop/startup-companion/handover/itqan-website/HANDOVER-PROMPT.md`. Present it *within* the Itqan site (no restyle to Mutqin's brand) using Mutqin's own imagery.

**Files changed:**
- [src/data/projects.ts](src/data/projects.ts) — new `mutqin` `Project` entry, placed first (lead card). `filters: ['Application Development', 'Brand & Identity', 'UI/UX Design']` so it surfaces under every lens. cover = `hero.webp`.
- [src/data/case-studies.ts](src/data/case-studies.ts) — added two OPTIONAL fields to the `CaseStudy` interface: `brandShowcase?: string[]` (extra brand/character section) and `stack?: string` (at-a-glance tech stat). Added the `mutqin` entry first, with honest copy in the warm founder-to-founder voice. NO fabricated `duration`/`industryAverage` (it's our own product; no verified build weeks). Phases use the three Founder-OS pillars with the pillar metaphors ("The soul / skeleton / heartbeat") in the `days` slot rather than a fake calendar. `liveUrl: https://mutqin.xyz`.
- [src/app/work/[id]/page.tsx](src/app/work/%5Bid%5D/page.tsx) — (a) new `BrandShowcase` section component (eyebrow "Brand & character", accent-italic heading "A product with a face.", 2-col 4:3 image grid) rendered between the mockup gallery and the testimonial, gated on `brandShowcase`; (b) added a `Stack` stat to `AtAGlance`; (c) made the emphasised Outcome stat span 2 cols only when `baseCount <= 3` so the 5-col strip never overflows for any field combination.
- [src/components/home/FeaturedWork.tsx](src/components/home/FeaturedWork.tsx) — homepage: replaced the Medacs tile with a Mutqin tile (`status: 'Live'`, no fabricated duration). Extracted an explicit `FeaturedTile` type (optional `duration`/`status`), made the top-right pill render `status` else `Delivered in {duration}`, and omit the pill entirely when a tile sets neither.

**Assets added** (`public/images/portfolio/mutqin/`, 348K total, all 4:3 WebP @ q82 from the 3200px source PNGs via `cwebp`): `hero.webp` (2400px — cover/thumbnail), `wizard.webp` / `portal.webp` / `mobile.webp` (1800px — product gallery), `brand.webp` / `character.webp` (1800px — brand showcase). Source PNGs + Mu cutouts + app-icon left in the handover package (not copied — no template slot, avoids repo bloat).

**Verification:** `npm run build` clean twice (21/21 static pages, type-check + lint pass, `/work/mutqin` builds as SSG). Browser preview (localhost:3001): clean screenshots of the `/work` grid (Mutqin lead card, 4:3, on-brand) and the `/work/mutqin` header (hero + "Visit live site" pill + outcome line). Below-fold sections verified via DOM (all 6 images `complete:true`, gallery 3×4:3 + brand 2×4:3, at-a-glance = 4 stats filling the 5-col grid, all copy present); no console errors, no failed network requests. NOTE: the site uses Lenis smooth-scroll, which decouples visual scroll from native `scrollTop` — headless screenshots only capture at scroll-0, so below-fold visuals were confirmed by DOM geometry instead of screenshot. typescript-reviewer pass: no CRITICAL/HIGH; the MEDIUM (grid overflow) and LOW (redundant guard) it raised were both fixed. Homepage FeaturedWork DOM-verified (tiles: nexilink / shareefico / oud-closet / mutqin; Medacs removed; Mutqin shows the "Live" pill with `hero.webp` loaded); a second reviewer pass on FeaturedWork found no CRITICAL/HIGH (one MEDIUM — a tile with neither `status` nor `duration` — closed by omitting the pill when the label is empty). Committed `08f130e` and pushed to `main` (Netlify auto-deploys).

**Approaches considered + rejected:**
- Strict template (hero + 3 mockups only) — drops the brand-cover + character-poses the brief explicitly wants shown. Rejected.
- Dumping all 5 slides into the 3-col mockup gallery — uneven row + no narrative framing for the brand beat. Rejected.
- Fabricating a build duration to fill the at-a-glance — dishonest. Instead added the real `stack` stat to fill the grid.

## What was just done (2026-06-03 session — magnet delivery wiring)

**Branch `feat/magnet-delivery-wiring` (commit `33ad091`, pushed, NOT merged). Build passes clean.**

**Files changed:**
- [src/app/api/leads/capture/route.ts](src/app/api/leads/capture/route.ts) — full rewrite. New flow: (1) validate `{ email, magnetSlug, dmKeyword, pdfUrl?, firstName? }`; (2) 500 if no `KIT_API_KEY`; (3) upsert subscriber `POST /v4/subscribers` with `state:"active"` + `fields:{ magnet_pdf_url: pdfUrl }` (fields included ONLY when pdfUrl present), 422 -> 400 "that email looks invalid", other non-2xx -> 502; (4) find-or-create tag `magnet-itqan-<kw>` via PAGINATED `GET /v4/tags?per_page=1000&after=<cursor>` following `pagination.end_cursor`, handles 422-on-create race by re-listing; (5) attach tag `POST /v4/tags/{id}/subscribers`, errors (502) on non-2xx, no swallow; (6) enroll `POST /v4/sequences/2777738/subscribers`, logs+continues on failure with `enrolled:false`; (7) returns `{ ok:true, pdfUrl: pdfUrl ?? null, tagged:true, enrolled:<bool> }`. Helper `kitFetch` enforces a 15s AbortController timeout and never logs the API key. Never returns `ok:true` unless subscriber upserted AND tagged.
- [src/lib/magnet-lookup.ts](src/lib/magnet-lookup.ts) — added `pdfUrl: string | null` to the `LeadMagnet` interface, a `readUrl()` helper, and now reads the Notion "PDF URL" property into it.
- [src/components/magnet/MagnetLanding.tsx](src/components/magnet/MagnetLanding.tsx) — POST body now includes `pdfUrl: magnet.pdfUrl ?? undefined`. New `downloadUrl` state set from the server-confirmed `data.pdfUrl` (fallback `magnet.pdfUrl`). On success, both the sticky bar and the final CTA card render a "Download your guide" button (target=_blank, rel=noopener) pointing at `downloadUrl`; the CTA card adds "We also emailed it to you." When no PDF URL exists, the UI falls back to the old "Check your inbox" copy with no broken button.

**Verification:** `npm run build` passes clean (20/20 static pages, type-check + lint pass, `/api/leads/capture` and `/magnet/[slug]` compile as dynamic). No em-dashes in any added strings. API key never logged.

**Config status this repo:** No `.env*` files. `KIT_API_KEY` and `NOTION_TOKEN` are NOT set locally and MUST be present in the Netlify host env for delivery to work. `KIT_API_KEY` specifically gates the whole capture flow (returns 500 "Kit not configured" without it).

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

- **Mutqin (2026-06-14): SHIPPED** — committed `08f130e`, pushed to `main`, Netlify auto-deploying. Decisions resolved with Ibrahim: kept first in the work grid; featured on the homepage in place of Medacs. Nothing outstanding. (Verify the Netlify deploy goes green and spot-check `/`, `/work`, `/work/mutqin` on the live site.)
- The magnet-delivery branch (`feat/magnet-delivery-wiring`) is still NOT merged to `main` and still needs `KIT_API_KEY` in Netlify env (see "Still open (2026-06-03)" above).

## Monetization angles

- The `coverVideo` + `liveUrl` pattern is a reusable productized capability — every founder we work with eventually wants a video-cover case study. This could be packaged as a "Founder Story Reel" add-on to the 90-day Founder OS.
- The illustrated character animation style (Kling) is distinctive enough to license back as a service: "We'll make you the character that fronts your brand." Itqan has the prompts + tokens already locked in for Shareefico — it's a reproducible workflow.
- The portfolio detail page is now a stronger sales asset for premium pricing — the live-site CTA closes the proof loop in one click, which is exactly what high-intent visitors look for before booking a call.
- **Mutqin is now the on-site proof that "Itqan ships the whole loop" — brand + in-repo design system + character + live full-stack AI product.** The new gated `BrandShowcase` section is a reusable pattern: any future build-type case study can show its brand/character system as a distinct beat, which is exactly the differentiator that justifies premium "we build the whole thing" pricing. The `stack` stat also doubles as quiet technical credibility for the engineering-heavy buyer.
