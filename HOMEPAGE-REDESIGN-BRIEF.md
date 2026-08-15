# ITQAN SITE — DARK REDESIGN (Benchmark: won.agency)
## Three Claude Code sessions. Homepage gets full editorial craft. Other routes get dark propagation.

---

## 0. CONTEXT

Itqan Studio is a UAE-based brand and digital agency (RAKEZ Free Zone). The name إتقان is Arabic for mastery of craft. The current itqanstudio.com is light-themed, safe, and does not reflect the brand. This sprint delivers a dark, editorial, work-forward redesign.

Benchmark: won.agency — dark, minimal, portfolio-forward, single conversion CTA, no homepage testimonial cards.

**Stack:** Next.js 14, TypeScript, Tailwind, Framer Motion, Netlify.
**Repo:** `itqanstudio/itqan-website`

Brand tokens live in `CLAUDE.md` at project root. Do not invent new colors. Do not introduce new fonts. If a section needs a token outside the palette, stop and ask.

---

## 1. PRE-FLIGHT (do before any code change)

1. `npm run dev` — confirm zero console errors.
2. `git checkout -b redesign/homepage-dark`
3. `git commit -am "Snapshot before dark redesign"`
4. Capture current homepage at 375px, 768px, 1440px → save to `/public/references/before/`.
5. Confirm these assets exist (already placed by Ibrahim):
   - `/public/images/app-hand-render.png`
   - `/public/images/app-hand-v2-render.png`
   - `/public/images/app-render.png`
   - `/public/images/close-app-render.png`
   - `/public/images/dashboards-render.png`
   - `/public/images/founder-render.png`
   - `/public/videos/phone-rotate.mp4`
   - `/public/videos/portrait-sill.mp4`
   - `/public/icons/Light_Icon.svg`
   - `/public/icons/Light_Logo.svg`
6. Confirm won.agency reference screenshots exist at `/public/references/won/`. If missing, stop.
7. Confirm client work images exist in `/public/images/portfolio/` with subfolders:
   - `/public/images/portfolio/nexilink/`
   - `/public/images/portfolio/shareefico/`
   - `/public/images/portfolio/oud-closet/`
   - `/public/images/portfolio/medacs/`
   If any folder is empty, stop and alert Ibrahim.
8. Confirm testimonials currently live on the homepage inside the existing SocialProof component. These MUST be extracted before deletion (see §6.5).

---

## 2. DO-NOT-TOUCH LIST

- Existing Itqan CRM components, routes, or utilities
- The magnetic CTA component behavior on hero — keep motion, restyle visuals only
- The background atmosphere layers in hero (radial glow + dot grid) — keep
- Sessions D+ targets: deep redesign of Work detail pages, Services detail pages, About page hero — out of scope

---

## 3. DESIGN PRINCIPLES

- **Editorial, not template.** Generous whitespace. Typography carries weight.
- **Work-forward.** Case studies are the hero, not decoration.
- **Dark is the canvas, not the gimmick.** `#2f1c2c` is the set, not the subject.
- **Accent is a spice.** `#cca4c2` appears in Playfair Display Italic moments only — never as body text, never as CTA fill, never in UI surfaces.
- **Motion serves meaning.** Scroll reveals earned, not decorative. Spring physics, not `ease-in-out`.
- **Sharp, not soft — but never cold.** No drop shadows. No pastel fills. Subtle 8–12px radius only on media (project thumbnails, video frames). Structural sections are edge-to-edge with no card wrappers.

---

## 4. GLOBAL RULES (apply across every page, every session)

- **Background everywhere:** `#2f1c2c`. No light sections anywhere.
- **Primary text:** `#fffbf5` (cream).
- **Secondary text:** `rgba(255,251,245,0.65)`.
- **Muted text:** `rgba(255,251,245,0.35)`.
- **Accent (Playfair italic moments only):** `#cca4c2`.
- **Borders when used:** `rgba(255,251,245,0.08)` default, `rgba(255,251,245,0.15)` hover.
- **No drop shadows anywhere.** Use border + background contrast for depth.
- **Fonts:** Manrope (400, 500, 600, 700) + Playfair Display (Italic 400, 500). Nothing else.
- **Cursor:** default. No custom cursors.
- **Scroll:** smooth. No scroll-jacking.

---

## 5. TYPOGRAPHY SCALE (clamp-based, do not deviate)

- **Hero headline:** `clamp(3.5rem, 8vw, 6.5rem)` / line-height 0.95 / tracking -0.02em / Manrope 600
- **Section headline:** `clamp(2.25rem, 5vw, 4rem)` / line-height 1.05 / tracking -0.015em / Manrope 600
- **Editorial accent (Playfair Italic):** `clamp(1.75rem, 3.5vw, 2.75rem)` / line-height 1.3 / `#cca4c2`
- **Stats line (Playfair Italic, hero-adjacent):** `clamp(1.5rem, 3vw, 2.25rem)` / line-height 1.3 / `#fffbf5`
- **Inline testimonial quote (Playfair Italic, small):** `clamp(1.125rem, 1.5vw, 1.375rem)` / line-height 1.5 / `#fffbf5` at 0.8 opacity
- **Body lead:** `clamp(1.125rem, 1.5vw, 1.375rem)` / line-height 1.55 / Manrope 400
- **Body:** `1rem` / line-height 1.65 / Manrope 400
- **Eyebrow labels:** `0.75rem` / letter-spacing 0.12em / uppercase / Manrope 500

Playfair Italic appears **once per section maximum** as a signature line. Never in dense UI. Never stacked.

---

## 6. HOMEPAGE SECTION-BY-SECTION SPEC (Sessions A + B)

### 6.1 Navbar
- Solid `#2f1c2c`. No transparent variant.
- Logo left: `Light_Icon.svg` at 28px.
- Links right: Work / Services / About / Contact. Manrope 500, 0.9375rem, cream at 0.75 opacity, hovers to full.
- Primary CTA far right: `Book a discovery call` — 1px `#fffbf5` border, cream text, no fill. Hover: cream fill, dark text. 10px radius.
- Height: 72px. Padding: 32px horizontal desktop, 20px mobile.
- Sticky. Subtle bottom border `rgba(255,251,245,0.08)` fades in after 40px scroll.

### 6.2 Hero — refine (don't rebuild)
- **Keep** magnetic CTA behavior.
- **Keep** background atmosphere layers (radial glow + dot grid).
- **Headline — LOCKED:** `Precision. Built into every pixel.`
  - Two lines. Line 1: "Precision." · Line 2: "Built into every pixel."
  - Hero-headline typography scale (§5). Left-aligned. Tracking -0.02em.
  - The period after "Precision" is intentional editorial punctuation. Keep it.
- **Tagline below headline — Playfair Italic, `#cca4c2`:** Default first pass → `Crafted by إتقان.`
- **Lead paragraph:** 2 lines max, body-lead scale, `#fffbf5` at 0.75 opacity. Placeholder copy: "We build brand identities, digital products, and internal systems for ambitious companies across the GCC and beyond."
- **Primary CTA:** `Book a discovery call` — solid cream fill, dark text, 10px radius, Manrope 600, 56px height.
- **Secondary text-link:** `See the work →` with 4px arrow slide on hover (200ms ease-out).
- Strip any remaining light-background or cream-card variants.

### 6.3 Work Marquee [⭐ HIGH-CRAFT — reference won.agency screenshots] (NEW)
- Directly under hero. Horizontal auto-scroll strip.
- Pull 6–10 thumbnails across the four portfolio folders:
  - `/public/images/portfolio/nexilink/`
  - `/public/images/portfolio/shareefico/`
  - `/public/images/portfolio/oud-closet/`
  - `/public/images/portfolio/medacs/`
- Prioritize images that work as thumbnails (4:3 or 3:2 ratio, strong composition). Skip hero images already used in §6.5 — marquee should show DIFFERENT angles of the same work. Mix clients evenly (roughly 2–3 per client across the strip).
- Loop at 40s per full cycle.
- Each thumb: 420px × 280px desktop / 280px × 200px mobile. 12px radius. Full-bleed image fill.
- Hover: scale to 1.02, dark gradient overlay fades in, client name appears bottom-left in Manrope 600 cream.
- Pause-on-hover anywhere in strip. Resume on mouse leave.
- No heading. Silent transition between hero statement and proof.
- Pure CSS `transform: translateX` + `animation: marquee 40s linear infinite`. `animation-play-state: paused` on hover. No JS for core scroll.

### 6.4 Showreel Moment (NEW — atmospheric fallback)
- Full-bleed dark section. 120px top + 120px bottom padding on desktop.
- Eyebrow line above video, centered: `The work, in motion.` — Playfair Italic, accent color, editorial-accent scale.
- Video container below: 16:9 frame, max-width 1280px, centered, 12px radius, 1px border `rgba(255,251,245,0.08)`.
- **Asset:** `/public/videos/phone-rotate.mp4` looping muted, `autoplay playsinline loop muted` attributes. Object-fit cover. Apply 60% opacity + subtle radial vignette mask (darker edges, clearer center).
- No play button overlay (this is atmospheric, not a feature piece).
- Below video, centered line in Manrope 500, `0.9375rem`, `#fffbf5` at 0.6 opacity: `— Ibrahim Shareef, Founder · Bisma Aslam, Chief of Design`

### 6.5 Featured Work [⭐ HIGH-CRAFT — reference won.agency screenshots] (REPLACES SocialProof)

**EXECUTION ORDER (hard rule — do not deviate):**

**STEP 1** — Before touching any other file, open the existing SocialProof/Testimonials component. Identify the three testimonial quotes and attributions currently rendered live on the homepage.

**STEP 2** — Create a new file `TESTIMONIALS.md` at repo root:
```
### Nexilink
> "Quote verbatim from existing site."
> — Name · Company

### Shareefico
> "Quote verbatim from existing site."
> — Name · Company

### Oud Closet
> "Quote verbatim from existing site."
> — Name · Company
```
If the live site only has three quotes but they don't map 1:1 to these three clients, match each quote to the closest case study and flag any mismatch in the final report.

**STEP 3** — Verify `TESTIMONIALS.md` exists and content is correct. Only then proceed.

**STEP 4** — Delete the SocialProof component and all references. Grep `SocialProof` returns zero.

**STEP 5** — Build the Featured Work section:

- Three featured case studies, stacked vertically, full-width, big.
- For each case study, use the hero image from `/public/images/portfolio/{client-slug}/` — pick the most hero-shaped image in the folder (largest, most editorial, most representative).
- Each block contains, in this stacking order:
  - Full-bleed image (600px min-height desktop, 400px mobile), 12px radius
  - Eyebrow label above name (e.g. `BRAND + DIGITAL`) — eyebrow scale, `#cca4c2`
  - Client name in Manrope 600, section-headline scale, `#fffbf5`
  - One-line outcome in Manrope 400, body-lead scale, `#fffbf5` at 0.75 opacity
  - **Inline testimonial quote** from `TESTIMONIALS.md` — Playfair Italic, inline-testimonial scale (§5), max-width 48ch, `#fffbf5` at 0.8 opacity. Format: `"Quote text."` then attribution on next line in Manrope 500 0.8125rem at 0.6 opacity: `— First Last · Company`
  - Ghost link at bottom: `Read the case study →` with 6px arrow slide on hover
- Entire block wraps in an `<a>` link to the case study page.
- Hover: image scales to 1.03 over 600ms cubic-bezier(0.16, 1, 0.3, 1), eyebrow shifts to cream.
- Spacing between blocks: 160px desktop, 80px mobile.
- Three case studies in order: **Nexilink, Shareefico, Oud Closet.**

### 6.6 Stats Line (NEW — editorial credibility moment)
- Full-bleed dark section. 120px top + 120px bottom padding desktop / 80px mobile.
- Single centered editorial line, Playfair Italic, stats-line scale (§5), `#fffbf5`: `20 years of craft. 6 countries. 8 languages.`
- No heading, no sub-copy, no grid, no icons. Just the line.
- Width max 72ch, centered, left-aligned text at mobile (not centered) for readability.
- Scroll-triggered reveal: fade up 24px, 800ms, slow editorial pace.

### 6.7 Services [⭐ HIGH-CRAFT — reference won.agency screenshots]
- Section headline: `What we build.` (Manrope 600, section scale, left-aligned).
- Playfair Italic signature below: `Every discipline, held to the same standard.`
- Five services, one per row, full-width:
  1. **Brand Identity & Strategy** — *Positioning, naming, and identity systems built to survive a decade, not a campaign.* — thumbnail: `/public/images/founder-render.png`
  2. **UI/UX Design & Research** — *Interfaces grounded in research, shaped by craft, tested on the people who'll use them.* — thumbnail: `/public/images/app-render.png`
  3. **Web Development & Integrations** — *Sites built in Next.js and Webflow — fast, accessible, indistinguishable from the design.* — thumbnail: `/public/images/app-hand-render.png`
  4. **Systems & Applications** — *CRMs, internal tools, and AI-powered systems that replace spreadsheets and survive scale.* — thumbnail: `/public/images/dashboards-render.png`
  5. **Content & Growth** — *Copy, SEO, and social design that carry the brand's voice into every channel.* — thumbnail: `/public/images/close-app-render.png`
- Each row layout:
  - Left 65% width: service name (section-headline scale) + one-line outcome below (body-lead scale, 0.75 opacity)
  - Right 35% width: thumbnail, 200px × 200px, 12px radius, object-fit cover
- Divider between rows: 1px `rgba(255,251,245,0.08)`, full width.
- Row vertical padding: 48px top + 48px bottom.
- Hover: service name brightens, right-side thumbnail scales to 1.02 over 300ms.
- Row ends with ghost link far right: `Explore →` — Manrope 500, cream at 0.6 opacity, full on hover.

### 6.8 Industries / Areas of Focus [⭐ HIGH-CRAFT — reference won.agency screenshots] (NEW)
- Section headline: `Who we build for.`
- Playfair Italic signature below: `Ambition has no industry.`
- 4-column grid desktop, 2-column tablet, 1-column mobile:
  - Technology
  - Commerce & Retail
  - Consumer & Fragrance
  - Healthcare
- Each cell: 320px × 280px desktop. Dark background. 1px border `rgba(255,251,245,0.08)`.
  - Industry name centered, Manrope 600, `clamp(1.5rem, 2.5vw, 2rem)`.
  - Small portfolio image behind at 15% opacity, full cell (object-fit cover).
  - Hover: border brightens to 0.15 opacity, image opacity lifts to 30%, 200ms transition.

### 6.9 Portrait / Brand Statement (NEW)
- Full-bleed split section. Two columns desktop, stacked mobile.
- **Left column (40% desktop):** `/public/videos/portrait-sill.mp4` looping muted at 60% opacity, vignette mask, object-fit cover. Poster frame: `/public/images/founder-render.png`.
- **Right column (60% desktop):**
  - Playfair Italic signature quote, editorial-accent scale, `#fffbf5`: `إتقان — the word is the work.`
  - 40px below: paragraph in Manrope 400, body-lead scale, `#fffbf5` at 0.75 opacity. Copy: "Itqan is a Swedish-founded, UAE-based studio. Two senior co-founders. One standard: nothing leaves until it earns the name."
  - 32px below paragraph: ghost link `Meet the studio →` linking to `/about`.

### 6.10 CTA Banner
- Full-bleed dark. Center-aligned. 180px top + 180px bottom desktop / 120px mobile.
- Huge Playfair Italic headline at hero-headline scale (not accent scale — this is the close), `#fffbf5`: `Ready to build something that lasts?`
- Below in Manrope 400, body-lead scale, `#fffbf5` at 0.75 opacity: `We work with a small number of ambitious brands each quarter.`
- Single CTA: `Book a discovery call` — solid cream fill, dark text, 10px radius, Manrope 600, 56px height, 32px horizontal padding.
- No secondary CTA. This is the close.

### 6.11 Footer
- Dark `#2f1c2c`. Top border 1px `rgba(255,251,245,0.08)`.
- Four-column grid desktop, stacked mobile:
  - Left: `Light_Logo.svg` at 120px wide + eyebrow `Itqan Studio FZ-LLC · RAKEZ, UAE` in Manrope 500 at 0.5 opacity
  - Center (two cols): sitemap (Work / Services / About / Contact / Insights) in Manrope 500, 0.9375rem, 0.75 opacity, hovers full
  - Right: mailto `info@itqanstudio.com` + LinkedIn icon link
- Bottom row: `© 2026 Itqan Studio FZ-LLC` + privacy + terms. 0.8125rem Manrope 400 at 0.5 opacity.

---

## 7. MOTION SPEC

- Framer Motion spring physics: `{ type: 'spring', stiffness: 180, damping: 22 }`.
- Scroll-triggered fade-ups: 24px offset, 600ms, triggered at 85% viewport intersection.
- Stagger children: 0.08s per grid item, 0.12s per hero cascade item, 0.3s for Stats line (slow editorial).
- Marquee: CSS `transform: translateX`, 40s linear infinite. Paused via `animation-play-state`.
- Image hover scales: 600ms cubic-bezier(0.16, 1, 0.3, 1).
- No `ease-in-out`. No `linear` on content animations.
- `prefers-reduced-motion: reduce` → disable all transform/opacity transitions. Marquee becomes static strip of first 4 thumbs.

---

## 8. RESPONSIVE BREAKPOINTS

- Mobile `< 768px`: single column. Marquee thumb 280×200.
- Tablet `768–1024px`: services stays 1-col, industries 2-col.
- Desktop `> 1024px`: full layout.
- `min-h-[100dvh]` not `h-screen`.
- Zero horizontal overflow at 375px, 768px, 1024px, 1440px, 1920px.

---

## 9. ACCESSIBILITY

- `#fffbf5` on `#2f1c2c` → WCAG AA ✅
- `#cca4c2` on `#2f1c2c` → AA large-text only. Use ONLY in Playfair Italic accent at editorial-accent scale or larger. Never body, never small label, never button.
- Focus state: 2px `#fffbf5` ring, 4px offset on every interactive.
- Meaningful `alt` text on content images. Decorative: `alt=""`.
- Video: `aria-label`. No auto-play with sound. Atmospheric loops autoplay muted.
- Keyboard tab order = visual order. Skip-to-content link at top.
- Lighthouse accessibility ≥ 95 on homepage.

---

## 10. SESSIONS

### SESSION A — Homepage structural overhaul (run first, sign-off required)
1. Pre-flight (§1)
2. Update `CLAUDE.md` only if new design tokens introduced
3. Navbar restyle (§6.1)
4. Hero refine — typography + locked headline only, do not touch layout or magnetic CTA (§6.2)
5. Extract testimonials from SocialProof → `TESTIMONIALS.md` (§6.5 Steps 1–3)
6. Delete SocialProof component + all references (§6.5 Step 4)
7. Build Work Marquee (§6.3)
8. Build Featured Work with inline testimonials (§6.5 Step 5)
9. Build Showreel Moment (§6.4)
10. Build Stats Line (§6.6)
11. Services restyle (§6.7)

**Stop. Commit. Ibrahim reviews visually. Do not start Session B without sign-off.**

### SESSION B — Homepage polish + finish (only after A approved)
12. Build Industries (§6.8)
13. Build Portrait / Brand Statement (§6.9)
14. CTA Banner restyle (§6.10)
15. Footer restyle (§6.11)
16. Mobile pass — walk every section at 375px, fix overflow and spacing
17. Motion pass — scroll reveals, marquee pause-on-hover, reduced-motion guard
18. Accessibility pass — focus states, alt text, Lighthouse
19. Run acceptance criteria (§11)

**Stop. Do not commit to main. Ibrahim reviews visually before merge.**

### SESSION C — Global dark propagation (only after B merged)
Scope: apply dark tokens, navbar, footer, and global typography scale to every other route. NOT a layout redesign.

20. Update global styles / Tailwind config / `theme.css` so `#2f1c2c` background and `#fffbf5` text are the defaults across the app
21. Replace the existing navbar and footer components site-wide with the versions built in Session A
22. Walk every non-homepage route (Work listing, Services listing, About, Contact, Insights). For each:
    - Confirm background is `#2f1c2c`
    - Confirm typography uses the clamp scale (§5) for hero/section headlines where obvious
    - Confirm no light cards, drop shadows, or pastel fills remain
    - Confirm CTAs reading "Start a conversation" or "Book a meeting" are updated to contextual dark-theme CTAs (see §13)
    - Do NOT restructure layouts. Do NOT redesign page hierarchy. If a page layout looks broken in dark mode, log it and move on — that's a Session D+ task.
23. Run `npm run build` + `npx tsc --noEmit` — zero warnings, zero errors.
24. Lighthouse accessibility ≥ 90 on every propagated route.

**Stop. Report which routes looked broken in dark mode. Those go to the future-sprints parking lot.**

---

## 11. ACCEPTANCE CRITERIA (walk with Ibrahim before merging each session)

Session A + B combined:
- [ ] Every homepage section has `#2f1c2c` background. Zero light leaks.
- [ ] No `#cca4c2` in body text or button fills anywhere.
- [ ] `TESTIMONIALS.md` exists at repo root with three verbatim quotes extracted from old SocialProof.
- [ ] Inline testimonial quotes appear inside each of the three case studies (§6.5).
- [ ] Stats line reads exactly: `20 years of craft. 6 countries. 8 languages.` (§6.6)
- [ ] SocialProof component deleted. Grep confirms zero references.
- [ ] Work marquee renders with 6–10 thumbnails from `/public/images/portfolio/`, pauses on hover.
- [ ] Industries grid renders with 4 cells.
- [ ] Portrait section uses `portrait-sill.mp4` at reduced opacity.
- [ ] Hero headline reads exactly: `Precision. Built into every pixel.` (two lines, period intact after "Precision").
- [ ] Primary CTA everywhere reads: `Book a discovery call`.
- [ ] No "Start a conversation" or "Book a meeting" anywhere on the homepage. Grep confirms.
- [ ] All typography uses the §5 clamp scale.
- [ ] No `box-shadow` in homepage components. Grep confirms.
- [ ] `npm run build` + `npx tsc --noEmit` both clean.
- [ ] No horizontal overflow at 375px.
- [ ] Lighthouse accessibility ≥ 95 on homepage.

Session C additional:
- [ ] Every non-homepage route renders with `#2f1c2c` background and `#fffbf5` text.
- [ ] Navbar and footer on every route match the homepage version exactly.
- [ ] Lighthouse accessibility ≥ 90 on every route.

---

## 12. ROLLBACK PLAN

- All work on `redesign/homepage-dark`. No merge to `main` until visual review per session.
- Section break mid-sprint → revert only that section, commit progress, continue.
- "Snapshot before dark redesign" commit is the rollback anchor.

---

## 13. CTA RULES (across entire site)

- **Primary conversion CTA (navbar right + final section):** `Book a discovery call`
- **Contextual secondary CTAs per section:**
  - Hero → `See the work →`
  - Each Featured Work case study → `Read the case study →`
  - Each Service row → `Explore →`
  - Portrait section → `Meet the studio →`
- **Forbidden strings:** `Start a conversation`, `Book a meeting`. Grep across entire repo. Replace all instances.

---

## 14. EXPLICITLY OUT OF SCOPE (do not bundle in this sprint)

- Bespoke redesign of Work detail pages (`/work/[slug]`)
- Bespoke redesign of Services detail pages (`/services/[slug]`)
- About, Contact, Insights page layout redesigns — dark propagation only, no restructure
- 4th service card integration (parked)
- CMS content changes
- SEO / metadata restructure
- New image/video generation — use existing assets
- New copy rewrites beyond specific strings called out

---

## 15. HIGH-CRAFT FLAGS (from Ibrahim's direct emphasis)

These four sections must match won.agency benchmark precisely. If Claude Code only nails four things on this page, it must nail these:

1. **Featured Work (§6.5)** — editorial case study blocks with inline quotes. No cards. No grids.
2. **Services (§6.7)** — row-per-service. No three-column card grid. Reference won.agency services page.
3. **Industries / Areas of Focus (§6.8)** — grid with portfolio image backdrops. Reference won.agency industries strip.
4. **Overall premium editorial feel** — generous whitespace, typography carrying weight, Playfair italic as restrained signature. If it feels like a SaaS template, start over.

If Chrome DevTools MCP is available in the Claude Code session, use it to inspect won.agency live for exact typography sizes, easing curves, and spacing values on these four elements.

---

## 16. IF ANYTHING IS AMBIGUOUS

Stop. Ask. Do not guess. Do not substitute.

The brand and benchmark are specific. Defaults will not serve.