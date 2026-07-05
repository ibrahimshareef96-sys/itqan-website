# Phase C — Case-Study Films (brief for sign-off)

**Goal:** short, cinematic, silent loops that play on the case-study **hero** (like the
Shareefico cover video), so the work *moves* instead of sitting as a static image.

## Why this is low-risk
The site **already supports it.** Case studies have an optional `coverVideo` field
(`src/data/case-studies.ts`) rendered by `CoverMedia` / `CaseStudyHero`. Shareefico
already uses it. Phase C = produce films for the other cases and set `coverVideo` on each.
No new system, no new deps.

**Rule we keep:** film plays on the **hero only** (full-bleed). Grid/listing cards keep a
static poster (the existing `coverImage`). Reason: multiple autoplaying videos on a grid
hurt LCP + battery (a decision already locked in the handover). The new shared-element
transition still morphs the poster → hero, then the hero film starts.

## Candidates (real cases, real assets to work from)
| Case | Source material | Natural film idea |
|---|---|---|
| **Mutqin** | 3D brand + Mu character + portal UI | Mu waves; the onboarding chat types; portal numbers count up. Character-led. |
| **Project You (Noor)** | dawn→dusk theme, orb, app screens | The day/night gradient breathes; the orb glows; screens cross-dissolve. Atmospheric. |
| **Oud Closet** | luxury editorial photography + storefront | Slow push-in on the editorial shot; the PDP scrolls. Fashion-film mood. |
| **Nexilink** | brand + product UI | Logo resolve → dashboard populates. Product-motion. |
| **Medacs / Itqan CRM** | dashboards | Optional, later — UI motion. |

## 3 decisions I need from you
1. **Priority + how many now.** My rec: start with **Mutqin + Project You + Oud Closet**
   (the most visually rich), ship, then decide on the rest. Or all six?
2. **Style per film — pick a lane** (I can mix):
   - **Product-motion** (the real UI animating — most honest, "we build the thing").
   - **Atmospheric/brand-mood** (gradients, light, texture — most premium).
   - **Character-led** (Mutqin's Mu — most distinctive, only fits Mutqin/PJY).
   My rec: product-motion for Mutqin/Nexilink, atmospheric for Project You/Oud Closet.
3. **Tool + budget.** I have generation access (Higgsfield/Kling-class image+video). These
   are credit-based. Rough: ~2–4 short clips per case × a few seconds. I'll produce,
   optimize (`libx264 -crf 24`, muted, ~1–3 MB each), and wire them. Any per-case
   look you want to lock (colorway, motion speed) — tell me and I'll match the brand.

## What I'll deliver once you pick
- Per case: a 4–8s seamless loop (poster frame extracted for `coverImage` fallback),
  compressed for web, wired to `coverVideo`, reduced-motion respected (poster shown).
- Screenshot/preview of each hero before it goes live; then deploy.

**Honesty note:** films are brand/atmosphere or *our own* product UI — never fabricated
client metrics or fake screens. Real work only.
