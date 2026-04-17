# Testimonials — Extracted from live homepage + case studies

Extracted 2026-04-16 before SocialProof component deletion (§6.5).

---

## Source A: Homepage SocialProof component (`src/data/testimonials.ts`)

These three quotes were rendered on the homepage via the SocialProof component:

### Medac & ShadowFly
> "Itqan transformed our complex systems into clean, intuitive designs that finally make sense. Fast, clear and genuinely impressive work."
> — Adel Habib · Medac & ShadowFly

### Avidnote
> "Itqan brought fresh ideas, flawless execution and real ownership to every task. The improvements to our user experience were immediate."
> — Abderisak Adam · Avidnote

### Nexilink
> "Itqan rebuilt our entire product design with speed and precision. The result is functional, beautiful and perfectly aligned with our goals."
> — Abdi Mohamud · Nexilink

---

## Source B: Case study testimonials (`src/data/case-studies.ts`)

These are longer quotes used on individual case study detail pages. The Featured Work section (§6.5) will use these for inline testimonials.

### Nexilink
> "We brought Itqan in to solve major challenges in our UI and UX, and the results exceeded expectations. They didn't just redesign the product. They rebuilt it into a clean, functional and user-focused experience that perfectly matched our direction. Their ability to listen, analyse and execute quickly made a huge difference for us. Itqan is a partner we trust for both speed and quality."
> — Abdi Mohamud · Nexilink

### Shareefico
> "Itqan built the entire Shareefico brand experience with precision and intention. They created a clear identity, visual direction and digital presence that all work together seamlessly. Every detail feels thoughtfully crafted, and the final result elevated the brand far beyond what we imagined at the start. A thorough and highly professional execution."
> — Ibrahim Shareef · Shareefico

### Oud Closet
> "Itqan understood the essence of our brand from the very beginning. They treated our product with respect for its heritage while giving it a modern, premium presence. The outcome felt intentional, refined, and truly representative of who we are."
> — Oud Closet · Oud Closet

---

## Mismatch flag

The homepage SocialProof had quotes from **Medac/ShadowFly, Avidnote, and Nexilink** — but the Featured Work section (§6.5) calls for **Nexilink, Shareefico, and Oud Closet**. Only Nexilink overlaps. The Shareefico and Oud Closet quotes come from the case-studies data, not the homepage component. The Medac/ShadowFly and Avidnote quotes are preserved above but will not appear in the new Featured Work section unless requested.
