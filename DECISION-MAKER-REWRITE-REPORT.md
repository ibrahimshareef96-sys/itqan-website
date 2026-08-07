# Decision-Maker Copy Rewrite — Report

**Site:** itqanstudio.com · **Scope:** copy + section framing only (no framework, color-system, or dependency changes) · **Date:** 2026-07

## The problem, and the fix

The old copy argued *why branding matters* and listed *what we deliver* — written for mid-level
marketing managers. This pass rewrites the site for **ultimate decision-makers** (founders, CEOs,
owners, boards, investors) who already believe in branding and are asking *"who do I trust with the
one asset I can't afford to break?"*

The site now sells **stakes, certainty, and pedigree** around one wedge: *a rebrand is the
highest-stakes, most-likely-to-fail decision a company makes — Itqan exists to make sure it doesn't.*
De-risking, not decorating.

## Verification

- `npx tsc --noEmit` — clean.
- `npm run build` — clean, 24/24 static pages. Home First Load JS **158 kB** (unchanged from before
  the rewrite → no Lighthouse regression; no new dependencies, no heavy client JS).
- No console errors. Every headline carries exactly **one** Playfair-italic mauve accent; no
  `accent-on-light` (#6d4a66) appears anywhere on the (all-dark) homepage.
- **Honesty:** every number traces to `src/data/*` (Nexilink 3 weeks / placed 1st 2024; Itqan CRM
  5 tools, 8h→15min; 20 years / 6 countries pedigree). No fabricated metrics; no promises of
  revenue, leads, or PR. Reviewed by a 5-dimension adversarial pass (honesty, brand-voice,
  brand-system/a11y, decision-maker impact, completeness) — all findings resolved.
- Screenshots captured: home hero (desktop + mobile), the new three-pillar spine (desktop),
  work (desktop), about (desktop). Below-fold home sections were DOM-verified (the site's Lenis
  smooth-scroll decouples headless screenshots from scroll position).

## Homepage structure — before → after

Was 8 sections; now 10. The decision-maker narrative is primary; tactical detail is **demoted, not
deleted** (Founder OS moved down + reframed; full detail still lives on `/services`).

| # | Before | After |
|---|--------|-------|
| 1 | Hero | Hero (stakes + certainty + pedigree) |
| 2 | FeaturedWork | **ThreePillars** — the new spine (NEW) |
| 3 | FounderOS | **WhyRebrandsFail** (NEW) |
| 4 | WhoFor | FeaturedWork (stakes-first captions) |
| 5 | Guarantee | Guarantee (kept) |
| 6 | Industries | FounderOS (demoted → "The method") |
| 7 | Portrait | Industries → Localisation + range |
| 8 | CTABanner | WhoFor (founders/CEOs/boards/investors) |
| 9 | — | Portrait → "the team in the room" |
| 10 | — | **PartnerHalo** (gated, off) → CTABanner |

## Headline before / after

**Hero**
- Before: *"We don't redesign brands. We `revive` companies."*
- After: *"The rebrand is the most dangerous decision you'll make. Make it with people who've done it `before`."*
- Sub before: *"Itqan is the founder studio that takes ambitious companies from invisible to inevitable in 90 days — with a brand, a system, and an agentic automation engine you can run from Telegram. Guaranteed."*
- Sub after: *"Twenty years of craft across six countries. We take on the one asset a company can't afford to break. A brand we built placed first at a 2024 investor competition."*
- Proof before: *"4 engagements · average delivery 2-4 weeks · industry average 8-16 weeks"*
- Proof after: *"Brand + product in 3 weeks · 5 tools replaced, 8h → 15 min · phase-gated, you approve every stage"*
- CTA before: *"Book a discovery call"* + *"$497 Brand Audit"* → After: single *"Start a conversation"*

**ThreePillars (NEW spine)** — eyebrow *"How the decision gets made"* → *"Three questions before you `commit`."*
Reputation · Commercial impact · Honesty. Closes with a first-class capability line naming social/content marketing.

**WhyRebrandsFail (NEW)** — *"Most rebrands fail. Here's `where`."* — 5 failure modes (No strategy · Design by
committee · Ego over evidence · No execution muscle · Cultural blind spots), each with *how we remove it*.

**FeaturedWork** — added eyebrow *"Selected work"* + *"Proof, not `promises`."* Each tile now leads with a
real stakes+outcome line (e.g. *"Investor-ready in 3 weeks. Placed first."*, *"Brand + content engine, live in
under 30 days."*).

**Guarantee** — kept verbatim (already embodies certainty + the honest "we don't guarantee revenue/leads/PR" caveat).

**FounderOS (demoted)** — eyebrow *"The offer"* → *"The method"*; lead reframed to execution certainty; the
System pillar now leads with *"Social-media marketing and a content engine…"*.

**Industries → Localisation** — *"Where we work / Built for tech-adjacent founders."* → *"Built for the region /
World-class thinking. Regional `fluency`."* (Arabic + English, Khaleeji taste, Vision 2030).

**WhoFor** — eyebrow *"Fit notes"* → *"Who we take on"*; list rewritten to founders/CEOs/owners/boards/investors;
honest "not for you" kept and sharpened.

**Portrait → the team in the room** — eyebrow *"The co-founder"* → *"The team in the room"*; headline
*"Engineer. Designer. Storyteller. `All in one.`"* → *"Senior hands. `No hand-offs.`"* (the capability list moved
into the body; key-person risk de-risked with a standing senior bench).

**CTABanner** — *"From invisible to inevitable in 90 days."* → *"Make the call you can't afford to get `wrong`."*
Single CTA; framed as a private, senior conversation.

**Contact** (default copy) — *"Let's Chat / Book a discovery call."* → *"Start a conversation." / "Private. Senior.
No sales team." / "You'll hear back from a principal — not a bot, not a junior — within 24 hours."*

**About · Values** — killed banned filler (*"seamless"*, *"transform your vision"*, *"effortlessly"*), rewrote
outcome-first, fixed *"Craftmanship"* → *"Craftsmanship"*.

**About · TeamSection** — eyebrow *"The founder"* → *"The team in the room"*; headline *"One operator. Three
crafts. No hand-offs."* → *"Senior hands. No juniors. `No hand-offs.`"*

**Footer** — *"Crafted by Itqan."* (banned "crafted" root) → *"Excellence, by name."*; description reframed to
the decision-maker.

**CTA language** — every primary CTA is now *"Start a conversation"* (Hero, CTABanner, Navbar, AboutHero,
Services, Contact).

## Decisions / trade-offs

- **$497 Brand Audit tripwire — demoted, not deleted.** Removed from the hero and the homepage CTA banner
  (a lead-funnel tripwire undercuts "a private, senior conversation"). It still lives on `/services` and via
  `/contact?intent=audit`, so the tactical funnel is reachable, just no longer the homepage's front door.
- **Localisation folded into the Industries section** (rather than a new section) — the verticals grid doubles
  as proof of range, keeping the homepage from bloating.
- **Social media marketing** is named as a first-class capability in three rendered places — a dedicated
  standalone line at the end of the ThreePillars spine (*"One team ships all of it — brand, product, web, and
  the social and content marketing…"*), the FounderOS "System" pillar (leads with it), and `/services`.
  Deliberately not a separate "what we deliver" menu (the brief bans that framing).
- **About hero kept "Engineer. Designer. Storyteller. All in one."** — appropriate as the founder's identity
  statement on the personal About page; the homepage Portrait leads with the de-risking line instead.
- **SEO metadata left intact** — the recent SEO/GEO win is keyword-tuned; this pass is copy/framing only.
- **`Services.tsx` / `Pricing.tsx` / `StatsLine.tsx` are dead** (imported nowhere) and were left untouched.

## GATED — Partner halo slot (ships OFF)

A potential partnership with a globally renowned brand agency is **not public and not signed**. Nothing on the
site names, implies, or references any partner. A clean, flag-gated slot is in place so a named-partner proof
block can drop in later **without a rewrite**.

- **Flag:** [`src/lib/flags.ts`](src/lib/flags.ts) → `PARTNER_HALO_ENABLED = process.env.NEXT_PUBLIC_PARTNER_HALO === '1'`.
  Unset → `false` → the component renders `null`.
- **Component:** [`src/components/home/PartnerHalo.tsx`](src/components/home/PartnerHalo.tsx) — returns `null`
  unless the flag is on; when on, renders an on-brand placeholder band (eyebrow, dashed logo slot, one
  Playfair-accent headline, proof line) with `PLACEHOLDER` copy and no partner name.
- **Mount point:** [`src/app/page.tsx`](src/app/page.tsx), between `<Portrait />` and `<CTABanner />` (the
  pedigree slot). Safe to leave mounted — it's invisible until the flag flips.

**To enable later (no code rewrite):**
1. Set `NEXT_PUBLIC_PARTNER_HALO=1` in the deploy environment (Coolify).
2. Replace the `PLACEHOLDER` eyebrow / headline / proof / logo slot in `PartnerHalo.tsx` with the real,
   signed partner content and drop the partner logo into the logo slot.
3. Rebuild + deploy.

## Files changed

New: `src/components/home/ThreePillars.tsx`, `src/components/home/WhyRebrandsFail.tsx`,
`src/components/home/PartnerHalo.tsx`, `src/lib/flags.ts`, this report.
Edited: `src/app/page.tsx`, `src/components/home/{Hero,FeaturedWork,FounderOS,Industries,WhoFor,Portrait,CTABanner}.tsx`,
`src/app/contact/page.tsx`, `src/app/services/page.tsx`, `src/components/layout/{Navbar,Footer}.tsx`,
`src/components/about/{AboutHero,Values,TeamSection}.tsx`.
Unchanged by design: `src/components/home/Guarantee.tsx`, all `src/data/*`, SEO/metadata, color tokens.
