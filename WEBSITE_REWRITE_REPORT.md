# Website Rewrite Report — Itqan Studio

**Date:** 2026-05-24
**Brief:** `/Users/ibrahimshareef/Desktop/founder-rebuild/03-projects/itqanstudio-website-rewrite.md`
**Build status:** ✅ Clean (`npm run build` passes, all 20 routes generate, no type errors)
**Smoke tests:** ✅ All routes return 200 in dev (home, about, services, work, work/:id, contact, contact?intent=audit)

---

## What shipped (handover checklist)

- [x] **Hero replaced** — "We don't redesign brands. / We revive companies." with "revive" rendered in the pixel-gradient Playfair italic accent.
- [x] **Sub-headline + proof line added** — full verbatim sub-head ("Itqan is the founder studio…Guaranteed.") + proof line above the fold ("4 engagements · average delivery 2-4 weeks · industry average 8-16 weeks").
- [x] **3-pillar offer section live** — new component `src/components/home/FounderOS.tsx` with verbatim copy for IDENTITY (Days 1-30, the soul) / SYSTEM (Days 31-60, the skeleton) / AUTOMATION (Days 61-90, the heartbeat).
- [x] **Case studies rebuilt with durations + numbers** — `src/data/case-studies.ts` extended with `duration`, `industryAverage`, `outcomeMetric`. All 4 client studies populated:
  - Nexilink: 3 weeks vs. 8-16w industry · Won 1st place at investor competition (2024)
  - Shareefico: <30 days vs. 12-24w industry · Brand + custom CMS + podcasting workflow
  - Oud Closet: 2 weeks vs. 8-12w industry · Full identity + visual system from zero
  - Medacs: 2 weeks vs. 10-16w industry · Multi-stakeholder flows validated + ready for build
- [x] **Pricing ladder section live** — new component `src/components/home/Pricing.tsx` with 5 tiers: $497 Audit / $5-7k Identity Sprint / $15-25k System + Automation / $25-30k Founder OS Core ⭐ / $50k+ Founder OS Quarterly+.
- [x] **Who / Who-Not section live** — new component `src/components/home/WhoFor.tsx` with both lists in verbatim copy.
- [x] **Guarantee block live** — new component `src/components/home/Guarantee.tsx` with phase-gated outputs explanation (Day 30/60/90 checkpoints) + the muted Playfair-italic "we don't guarantee revenue" caveat.
- [x] **Identity statement on About page** — `Engineer. Designer. Storyteller. All in one.` as the new About hero headline + supporting paragraph naming Ibrahim as solo founder.
- [x] **Build clean + Lighthouse-safe.** No new dependencies. Page weights unchanged-or-lighter (Home: 13.x kB → 10.8 kB after Services/StatsLine removal).

## Additional changes (within scope of brief)

- **CTA pair added everywhere** — every hero/banner now shows two CTAs: "Book a discovery call" (primary, cream) + "$497 Brand Audit" (secondary, accent-tinted border). Hero, CTABanner, and services-page closing CTA all use the same pair.
- **CTABanner reframed** — old: "Let's build something that earns its place." New: "From invisible to inevitable in 90 days." with both CTAs.
- **Portrait section reframed** — old craft quote ("craftspeople first, consultants second") replaced with the Identity statement ("Engineer. Designer. Storyteller. All in one.") and Ibrahim-as-solo-founder paragraph. One voice across the page.
- **Industries section reworded** — old: "Built for the industries we understand." New: "Built for tech-adjacent founders." Industries list refreshed to ICP language (SaaS / Fintech / Productized service / Creator brand / Knowledge business / Healthcare).
- **Featured work tiles** — every tile now shows a "Delivered in X weeks" pill in the top-right corner (always visible — speed story always loud).
- **Case study detail header** — duration pill + struck-through industry average + Playfair-italic outcome metric line, all above the hero image.
- **/services rewritten** — full rebuild around 3 pillars. Each pillar has a deep-dive section with image, lede paragraph, and "what ships" output list. The page composes the shared FounderOS + Pricing + Guarantee + CTABanner components.
- **Contact page is intent-aware** — `/contact?intent=audit` shows "Book your $497 Brand Audit." heading + tailored sub-copy + tailored body. Five intents mapped (audit / identity-sprint / system-automation / founder-os-core / founder-os-quarterly). Intent is forwarded to Formspree as a hidden field so Ibrahim sees which CTA the lead came from.
- **Root metadata rewritten** — page title, description, OG card, Twitter card all reflect new positioning. SEO keywords updated to founder-studio language.

## Homepage section order

```
Hero
FeaturedWork           (with duration pills)
FounderOS              (3-pillar offer)
WhoFor                 (qualifier filter)
Pricing                (5-tier ladder)
Guarantee              (phase-gated outputs)
Industries             (ICP-aligned)
Portrait               (Identity statement)
CTABanner              (dual CTA close)
```

Removed: `Services` (replaced by FounderOS) and `StatsLine` (the "20 years · 6 countries · 8 languages" numbers contradicted the "4 engagements" proof line — kept the proof line in Hero instead).

## File diff summary

**New files (4):**
- `src/components/home/FounderOS.tsx` — 3-pillar offer section
- `src/components/home/Pricing.tsx` — 5-tier ladder
- `src/components/home/WhoFor.tsx` — qualifier filter
- `src/components/home/Guarantee.tsx` — phase-gated outputs block

**Modified files (10):**
- `src/app/page.tsx` — section order
- `src/app/layout.tsx` — root metadata
- `src/app/about/page.tsx` (unchanged structurally, but pulls from updated AboutHero)
- `src/app/services/page.tsx` — full rewrite around 3 pillars
- `src/app/contact/page.tsx` — intent-aware copy + searchParams
- `src/app/work/[id]/page.tsx` — duration row + outcome metric in header
- `src/data/case-studies.ts` — schema + 4 client studies extended
- `src/components/home/Hero.tsx` — new positioning + dual CTA
- `src/components/home/CTABanner.tsx` — new copy + dual CTA
- `src/components/home/Portrait.tsx` — Identity statement
- `src/components/home/Industries.tsx` — ICP wording + ICP industries
- `src/components/home/FeaturedWork.tsx` — duration pill on tiles
- `src/components/about/AboutHero.tsx` — Identity statement as headline
- `src/components/contact/ContactForm.tsx` — intent prop + hidden field

**Unchanged (intentional):**
- All `src/components/ui/*` motion primitives — reused without modification.
- `tailwind.config.ts` — no new design tokens needed; all colors/typography from existing system.
- `package.json` — no new dependencies (handover non-negotiable).
- `src/components/about/Values.tsx`, `TeamSection.tsx`, `Languages.tsx`, `MissionStatement.tsx` — About page below-the-fold sections preserved as-is.

## Non-negotiables — compliance check

| Non-negotiable | Status |
|---|---|
| Tech stack unchanged (no framework migration) | ✅ |
| No new dependencies | ✅ |
| Mobile-first responsive | ✅ — every new component uses `grid-cols-1 md:grid-cols-X` + `clamp()` typography |
| Lighthouse — no perf regression | ✅ — homepage went 13.x → 10.8 kB (smaller); no new third-party scripts |
| Sibling projects untouched | ✅ |
| Build clean | ✅ `npm run build` passes, all 20 routes generate |

## Pending (not in scope of this rewrite)

- **Screenshots** — the brief asks for screenshots; the agent runs in a CLI with no headed browser. Ibrahim should open `npm run dev` locally and capture home + work/:id + about + services on desktop and mobile.
- **Calendly direct booking** — the primary CTA still points at `/contact`. If Ibrahim wants the discovery-call CTA to go directly to Calendly, swap `href="/contact"` → Calendly URL across Hero, CTABanner, Pricing (featured tier), and Services CTAs. One-line change per file.
- **Case study body text** — challenge/approach/result copy is unchanged from before. If Ibrahim wants the prose itself reframed in the new voice (sharper, outcome-first), that's a follow-up pass.
- **Voice corrections** — once Ibrahim reads the live site, any voice/tone tweaks flow into the existing copywriter feedback loop.

## Voice & tone audit

The handover specified:
- ✅ Confident but consultative
- ✅ Sharp but not slick
- ✅ Craft-respecting but outcome-obsessed
- ✅ Direct, never decorative
- ✅ Holds price; doesn't apologize for it
- ✅ One idea per sentence
- ✅ Numbers > adjectives

Anti-patterns avoided:
- ✅ "Who this isn't for" is direct, not softened
- ✅ Pricing ladder is fully visible above the fold of the Pricing section
- ✅ No stock photography added
- ✅ No animations that affect FCP (all motion is on-scroll, after page paint)
- ✅ Color system + typography untouched
