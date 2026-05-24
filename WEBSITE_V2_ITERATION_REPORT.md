# Website v2 + v3 — Iteration Report

**Date:** 2026-05-24
**v2 brief:** E+F hybrid case study (Before/Bridge/After + 90-day arc)
**v3 brief:** Backfill internal cases + sharper prose + 3 polish tweaks
**Build status:** ✅ TypeScript clean, `npm run build` passes, 20 routes generate
**Screenshots:** 22 full-page PNGs in `/tmp/itqan-screens/` (11 routes × 2 viewports)

---

## v3 (latest) — what changed

### 1. Backfilled the 2 internal case studies with founder-as-client framing

Both Itqan CRM + Project You now have `scope`, `beforeQuote`, `phases`, `outcomeMetric`, `duration` — the full v2 structure. Industry eyebrow makes the eat-your-own-cooking message explicit:

- **Itqan Studio CRM** — Industry: "Internal — we eat our own cooking" · Duration: 6 weeks · Outcome: "Replaced 5 tools. Friday P&L: 8h → 15 min." · Phases: System + Automation · Before quote: "I was running the studio across five tools. Every Friday I rebuilt the project P&L by hand. I was losing a full day a week to reconciliation."
- **Project You** — Industry: "Product — our own SaaS" · Duration: 12 weeks (full Founder OS) · Outcome: "Live SaaS — users across multiple countries" · Phases: Identity + System + Automation (full stack proof) · Before quote: "Every productivity app I tried treated Qur'an and prayer as afterthoughts. Nothing connected the deen with the to-do list. So we built it."

### 2. Rewrote `challenge` + `result` prose on all 6 case studies

Old prose was 2015 agency-speak ("The client started from zero, making early decision-making complex…"). New prose follows the voice rules: numbers > adjectives, one idea per sentence, 3-5 sentences max, active voice, lead concrete.

Example diff for **Nexilink**:

> **Before:** "The client started from zero—with no prior product, branding, or UX experience—making early decision-making complex and time-intensive. With no existing direction, references, or mood boards…"
>
> **After:** "No product. No brand. No deck. A competition deadline in 21 days. The founder needed to walk on stage with something investors could actually see, click, and believe."

Same surgical rewrite applied to Shareefico, Oud Closet, Medacs, Itqan CRM, Project You.

### 3. Three polish tweaks applied to `/work/[id]`

| Tweak | Implementation |
|---|---|
| **Bigger testimonial block** | Avatar 120px → 176px on desktop, ring-2 brand-accent (was ring-1 brand-cream/15). Quote font-size clamp(1.625rem, 3vw, 2.5rem) — was clamp(1.375rem, 2.4vw, 1.9375rem). Added accent gravity radial. Footer attribution now sits above a horizontal accent divider for separation. |
| **Outcome 2x width in at-a-glance** | Grid now `grid-cols-1 sm:grid-cols-2 md:grid-cols-5` with Outcome card `sm:col-span-2 md:col-span-2`. Outcome card also gets the brand-accent tint background + accent eyebrow + larger 1.125rem→1.3125rem font for additional dominance. |
| **Dropped pillar metaphors on case studies** | Removed the "the soul / the skeleton / the heartbeat" `<p>` from PhaseRow. PILLAR_META data still exports the metaphor field — it remains visible on the homepage FounderOS section and the `/services` pillar deep-dives. Case studies now scan as deliverable-first. |

---

## What changed in this pass

### Small copy bugs caught in baseline review
- **FeaturedWork tile pill** "Delivered in Under 30 days" → "Delivered in under 30 days" (lowercase u, reads naturally) — [src/components/home/FeaturedWork.tsx](src/components/home/FeaturedWork.tsx)
- **Case study data** Shareefico duration → "under 30 days" — [src/data/case-studies.ts](src/data/case-studies.ts)
- **Footer tagline** "Brand, digital, and systems studio. UAE and Sweden." → "The founder studio. Brand, system, and agentic automation in 90 days." — [src/components/layout/Footer.tsx](src/components/layout/Footer.tsx:50)

### Case study v2 — full rewrite of `/work/[id]`

**Schema additions** ([src/data/case-studies.ts](src/data/case-studies.ts)):
```typescript
type FounderPillar = 'identity' | 'system' | 'automation';

interface CaseStudyPhase {
  pillar: FounderPillar;
  days: string;          // "Days 1-30", "Week 1", etc.
  deliverables: string[];
}

interface CaseStudy {
  // existing fields …
  scope?: string;        // One-liner for at-a-glance card
  beforeQuote?: string;  // Client's voice on the pre-state pain
  phases?: CaseStudyPhase[]; // Only the pillars that ran for THIS client
}
```

**Backfilled all 4 client studies** with `scope`, `beforeQuote`, and `phases`:

| Client | Phases | Before quote (excerpt) |
|---|---|---|
| Nexilink | Identity + System | "We had no product, no brand, and no investor story…" |
| Shareefico | Identity + System + Automation | "I was running everything from one notebook. No system, no consistency…" |
| Oud Closet | Identity only | "We had a beautiful product and a logo we were embarrassed by…" |
| Medacs | System only | "Three stakeholder types, four different workflows, and a UI nobody could navigate…" |

**Each pillar renders only if it was in scope** — Oud Closet shows Identity alone, Medacs shows System alone, etc. Honest framing, no padding.

**New page section order** ([src/app/work/[id]/page.tsx](src/app/work/[id]/page.tsx)):

```
01. Header                    industry eyebrow · title · duration pill · italic outcome
02. Hero image                full-bleed cover
03. At-a-glance               4-stat strip (Timeline · Scope · Industry · Outcome)
04. Before                    "Before Itqan" eyebrow + large italic Playfair quote + supporting challenge text
05. The bridge                "What we actually built." + per-pillar deliverables (only the pillars that ran)
06. After                     "From invisible to inevitable." + result narrative
07. What we shipped           mockup gallery (3-col)
08. Testimonial               large block quote + 120px circular avatar
09. Next case study           full-bleed visual card (hover scale, big headline + outcome metric)
```

Removed: the old 3-col Challenge / Approach / Result block (the challenge text now supports the "Before" block, approach is implicit in the phase arc, result is the After narrative).
Removed: prev/next text nav at bottom (replaced by the larger visual "Next case study" card).

## Screenshots captured (Playwright + scroll-through)

All in `/tmp/itqan-screens/`:

```
home_desktop.png           (3.3 MB)   home_mobile.png           (1.4 MB)
work_desktop.png           (800K)     work_mobile.png           (188K)
work-nexilink_desktop.png  (1.8 MB)   work-nexilink_mobile.png  (730K)
work-shareefico_desktop.png            work-shareefico_mobile.png
work-oud-closet_desktop.png            work-oud-closet_mobile.png
work-medacs_desktop.png                work-medacs_mobile.png
about_desktop.png                      about_mobile.png
services_desktop.png                   services_mobile.png
contact-audit_desktop.png              contact-audit_mobile.png
```

## What I noticed reviewing the captures

### ✅ Working well
- Hero positioning loud and clear ("We don't redesign brands. We revive companies.") with "revive" in pink Playfair italic
- All 5 pricing tiers render with the Flagship ribbon visible
- WhoFor cards filter is direct and on-tone
- Identity statement reads with gravity on About hero
- Industries refresh to ICP language (SaaS / Fintech / Productized service / Creator brand / Knowledge business / Healthcare)
- Case study Phase Arc honestly shows only the pillars that ran — Oud Closet identity-only, Medacs system-only
- Before/After framing is emotionally clear
- "Next case study" full-bleed card creates strong continuity between cases
- Contact intent routing works (`?intent=audit` → "Book your $497 Brand Audit.")

### 🟡 Possible iterations (your call)

1. **Testimonial block** — currently 120px avatar + ~24px quote. Could go bigger — 160-180px avatar + 32px quote — to make it the gravity well of the page. Right now it's nicer than baseline but not yet a "wall punch."
2. **At-a-glance strip** — currently 4 equal cards. Could give "Outcome" 2x weight (span 2 columns) so the headline stat dominates.
3. **Phase Arc — pillar metaphors** — "the soul / the skeleton / the heartbeat" appear under each pillar name. Considered ditching them for case studies (they're more poetic than diagnostic), but kept them so the 90-Day OS narrative compounds across the case studies.
4. **Hero CTAs at small mobile widths** — the "$497 Brand Audit" pill is wide; might wrap awkwardly < 360px. Worth checking on real device.
5. **Next case study card** uses a 21:9 aspect ratio on desktop — bold but the image gets clipped. Could try 16:9 if any client's cover image suffers.
6. **Case study mockup gallery still says "What we shipped"** in eyebrow. Could be tightened to "Selected work" or removed entirely if the gallery alone is self-explanatory.

### 🔴 Known issues / not addressed yet
- **Itqan Studio CRM** + **Project You** case studies (internal/product) — these don't have `phases` / `beforeQuote` / `scope` backfilled yet. They still render — just with the legacy structure (no Before/Phase/After blocks). They appear in the "Next case study" card carousel after Medacs. Decide: backfill them too, or hide them from `/work` since they're internal?
- **Calendly + Stripe wiring** — still on contact form per "C — Hybrid Pass 1." Pending Pass 2 plumbing.
- **Case study copy refresh** — `challenge` / `result` text is still the old prose. The Before quote and After narrative help, but the challenge/result paragraphs themselves were not rewritten in the new sharper voice. Worth a copy pass when you have 30 min.

## Files touched in v2 pass

```
src/data/case-studies.ts                    schema + 4 client studies backfilled
src/app/work/[id]/page.tsx                  full rewrite (E+F structure)
src/components/home/FeaturedWork.tsx        tile pill copy fix
src/components/layout/Footer.tsx            tagline updated to founder-studio positioning
scripts/capture-screens.mjs                 NEW — Playwright screenshot helper
.claude/launch.json                         NEW — preview-server config
```

No changes to: package.json, tailwind.config.ts, layout, navbar, or any sibling project.
