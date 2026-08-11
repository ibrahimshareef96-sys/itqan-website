/**
 * The Brands hub — data for /brands and /brands/[slug].
 *
 * Modeled on the three references Ibrahim picked (2026-08-11):
 *   brand.uber.com                      → chaptered guidelines, austere spec pages
 *   news.airbnb.com/media-assets        → downloadable, self-serve asset packs
 *   partnermarketinghub.withgoogle.com  → one hub, many brands, each with an
 *                                         overview + rules + assets
 *
 * Everything here is sourced from the real brand documents — BRAND.md for
 * Itqan Studio, the shareefi.co theme tokens + voice-guide.md for Shareefico.
 * Nothing is invented; if a brand gains a rule, it lands in those sources
 * first and here second.
 */

export interface BrandColor {
  name: string;
  hex: string;
  /** Where this colour may be used — the rule, not a vibe. */
  usage: string;
  /** Text colour that stays readable on this swatch. */
  on: string;
}

export interface BrandTypeStyle {
  role: string;
  family: string;
  spec: string;
  sample: string;
  /** CSS for the specimen row (font stacks the site already loads or falls back). */
  css: { fontFamily: string; fontWeight?: number; fontStyle?: string; letterSpacing?: string };
}

export interface BrandLogoVariant {
  name: string;
  src: string;
  /** Tile background behind the mark — a hex, applied as an inline style
   * (arbitrary Tailwind classes composed in a data file are not reliably
   * picked up by the content scanner, and these values ARE data). */
  bg: string;
  note: string;
}

export interface BrandPrinciple {
  title: string;
  body: string;
}

export interface BrandRule {
  kind: "do" | "dont";
  text: string;
}

export interface SubBrand {
  name: string;
  tagline: string;
  body: string;
  image?: { src: string; alt: string };
}

export interface Brand {
  slug: string;
  name: string;
  /** One-line essence under the hub card + page hero. */
  essence: string;
  /** Hero support line. */
  intro: string;
  /** Hub card tile styling (each brand shows its own skin as CONTENT). */
  tile: { bg: string; fg: string; accent: string };
  logos: BrandLogoVariant[];
  logoRules: BrandRule[];
  colors: BrandColor[];
  colorNote: string;
  type: BrandTypeStyle[];
  typeNote: string;
  voiceIntro: string;
  voice: BrandPrinciple[];
  subBrand?: SubBrand;
  download: { label: string; href: string; contents: string };
  site: { label: string; href: string };
}

export const brands: Brand[] = [
  {
    slug: "itqan-studio",
    name: "Itqan Studio",
    essence: "Itqan is Arabic for excellence. The brand holds itself to the word.",
    intro:
      "The identity system for Itqan Studio FZ LLC. Espresso plum, mauve, warm sand and cream. Manrope for structure, Playfair for the editorial line. These are the rules we apply to our own brand before we apply them to yours.",
    tile: { bg: "#2f1c2c", fg: "#fffbf5", accent: "#cca4c2" },
    logos: [
      {
        name: "Primary on dark",
        src: "/images/brand/light-logo.svg",
        bg: "#2f1c2c",
        note: "Default. Cream mark on Espresso Plum.",
      },
      {
        name: "Primary on light",
        src: "/images/brand/dark-logo.svg",
        bg: "#fffbf5",
        note: "For cream and white surfaces.",
      },
      {
        name: "Mono white",
        src: "/images/brand/white-logo.svg",
        bg: "#1a1a1a",
        note: "Photography and video overlays only.",
      },
    ],
    logoRules: [
      { kind: "do", text: "Keep clear space around the mark equal to the height of its letterform." },
      { kind: "do", text: "Use the variant built for the surface. Dark mark on light, light mark on dark." },
      { kind: "dont", text: "Recolour the mark outside the palette." },
      { kind: "dont", text: "Stretch, rotate, outline or add effects to the mark." },
    ],
    colors: [
      { name: "Espresso Plum", hex: "#2f1c2c", usage: "Dark backgrounds, primary buttons, nav, footer.", on: "#fffbf5" },
      { name: "Mauve", hex: "#cca4c2", usage: "Accent on dark backgrounds only.", on: "#2f1c2c" },
      { name: "Deep Mauve", hex: "#6d4a66", usage: "The same accent role, on light backgrounds only.", on: "#fffbf5" },
      { name: "Warm Sand", hex: "#d1c2a5", usage: "Secondary accent. Borders and subtle highlights.", on: "#2f1c2c" },
      { name: "Cream", hex: "#fffbf5", usage: "Light backgrounds, cards, text on dark.", on: "#1a1a1a" },
      { name: "Ink", hex: "#1a1a1a", usage: "Body text on light surfaces.", on: "#fffbf5" },
    ],
    colorNote:
      "The dual-accent rule is the one people miss: mauve fails contrast on cream, so the accent swaps to Deep Mauve on every light surface. Same role, two values. Sections alternate dark and light, never two dark sections adjacent.",
    type: [
      {
        role: "Headlines",
        family: "Manrope Bold",
        spec: "64px hero / 40 to 44px sections, tight tracking",
        sample: "Excellence is a standard, not a slogan.",
        css: { fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: 700, letterSpacing: "-0.02em" },
      },
      {
        role: "Editorial accent",
        family: "Playfair Display Italic",
        spec: "One italic line per headline, accent colour",
        sample: "Clarity, precision and results.",
        css: { fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontStyle: "italic", fontWeight: 400 },
      },
      {
        role: "Body",
        family: "Manrope Regular",
        spec: "16px, 400. Short sentences. No filler.",
        sample: "Every headline promises a result, not a process.",
        css: { fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: 400 },
      },
      {
        role: "Labels",
        family: "Manrope Bold",
        spec: "10 to 12px, uppercase, wide tracking",
        sample: "SELECTED WORK",
        css: { fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: 700, letterSpacing: "0.18em" },
      },
    ],
    typeNote:
      "Playfair is always italic, never upright, and never in body text, buttons or navigation. Maximum one Playfair line per headline. It carries the accent colour for its surface.",
    voiceIntro:
      "The voice sounds like someone who does not need to convince anyone. Outcome first, short sentences, zero filler.",
    voice: [
      { title: "Outcome-first", body: "Every headline promises a result, not a process. Your brand, built to close deals." },
      { title: "Confident, not boastful", body: "No qualifiers, no hedging. The work carries the claim." },
      { title: "One adjective per noun", body: "Adjective stacking is banned. Alliteration is not a substitute for meaning." },
      { title: "Short sentences win", body: "Five-word fragments beside fifteen-word sentences. Nothing past twenty-five." },
      { title: "Banned words", body: "Seamless, bespoke, elevate, leverage, tailored. Replaced with concrete language, every time." },
    ],
    download: {
      label: "Itqan Studio brand pack",
      href: "/brands/downloads/itqan-studio-brand-pack.zip",
      contents: "Logo set (SVG), palette (JSON + text), voice one-pager.",
    },
    site: { label: "itqanstudio.com", href: "https://itqanstudio.com" },
  },
  {
    slug: "shareefico",
    name: "Shareefico",
    essence: "Engineer. Designer. Storyteller. All in one.",
    intro:
      "The personal brand of Ibrahim Shareef, founder of Itqan Studio. Deep green and lime on near-black, Clash Display at hero scale, and a voice that talks like a practitioner, not a guru. Faith is the operating system, not the aesthetic.",
    tile: { bg: "#0d282b", fg: "#fffdf4", accent: "#d7fd64" },
    logos: [
      {
        name: "Wordmark",
        src: "/brands/shareefico/wordmark.png",
        bg: "#0d282b",
        note: "The written mark, off-white on deep green.",
      },
      {
        name: "Favicon, lime",
        src: "/brands/shareefico/favicon-lime.png",
        bg: "#061518",
        note: "Avatar and app-icon contexts.",
      },
      {
        name: "Favicon, dark",
        src: "/brands/shareefico/favicon-dark.png",
        bg: "#d7fd64",
        note: "For lime and light surfaces.",
      },
    ],
    logoRules: [
      { kind: "do", text: "Video watermark is the faded mark, bottom right." },
      { kind: "dont", text: "Never watermark video with the text wordmark." },
      { kind: "do", text: "Lime is the only CTA colour. Blue is for 3D shapes and rim light." },
      { kind: "dont", text: "Never put lime text on the deep-green mid surfaces without checking contrast." },
    ],
    colors: [
      { name: "Deep Green", hex: "#0d282b", usage: "Primary background.", on: "#fffdf4" },
      { name: "Abyss", hex: "#061518", usage: "Atmospheric backdrop behind the deep green.", on: "#fffdf4" },
      { name: "Void", hex: "#050706", usage: "Near-black canvas for the hero moments.", on: "#fffdf4" },
      { name: "Off-white", hex: "#fffdf4", usage: "Primary foreground and text.", on: "#0d282b" },
      { name: "Lime", hex: "#d7fd64", usage: "Accent, CTA and italic emphasis. The only CTA colour.", on: "#050706" },
      { name: "Shape Blue", hex: "#6289f0", usage: "3D shapes and character rim light only. Never a CTA.", on: "#050706" },
    ],
    colorNote:
      "One accent does the selling. Lime is reserved for calls to action and emphasis; the blue exists so the 3D scenes have a second temperature without competing for clicks.",
    type: [
      {
        role: "Hero",
        family: "Clash Display",
        spec: "Massive single statement, one per page",
        sample: "Brand is execution.",
        css: { fontFamily: "'Clash Display', Poppins, sans-serif", fontWeight: 600, letterSpacing: "-0.02em" },
      },
      {
        role: "Display",
        family: "Poppins",
        spec: "Section headings",
        sample: "Faith and execution.",
        css: { fontFamily: "Poppins, sans-serif", fontWeight: 600 },
      },
      {
        role: "Italic accent",
        family: "Playfair Display Italic",
        spec: "Lime, sparingly",
        sample: "the blueprint",
        css: { fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontStyle: "italic" },
      },
      {
        role: "Body",
        family: "Manrope",
        spec: "16px, plain and direct",
        sample: "I tried this. Here is what actually happened.",
        css: { fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: 400 },
      },
      {
        role: "Mono",
        family: "JetBrains Mono",
        spec: "Numbers, code, HUD details",
        sample: "40+ episodes",
        css: { fontFamily: "'JetBrains Mono', monospace", fontWeight: 400 },
      },
    ],
    typeNote:
      "Clash Display is for the one massive line a page earns. Poppins runs the sections, Manrope runs the reading, and the mono face handles numbers and interface details.",
    voiceIntro:
      "Written rules, enforced in every caption, post and page. The shortest summary: practitioner, not guru.",
    voice: [
      { title: "Practitioner, not guru", body: "I tried this beats you should. Lived opinion over googleable information." },
      { title: "Brand is execution", body: "The master thesis. Not graphic design. Every artifact either demonstrates it or does not get published." },
      { title: "Faith out loud", body: "Niyyah, barakah, itqan named plainly when they are the right word. Operating system, not aesthetic." },
      { title: "Scars, not wounds", body: "A scar is a lived moment plus the lesson. Raw venting does not ship." },
      { title: "No em dashes, no invented numbers", body: "Hard rules. Punctuation stays simple and every number is a verified one." },
    ],
    subBrand: {
      name: "Barakah Blueprint",
      tagline: "The podcast. Faith and execution, forty-plus episodes deep.",
      body:
        "Barakah Blueprint is the faith-forward surface of Shareefico: conversations on discipline, niyyah and building with barakah. It inherits the full Shareefico system, leans hardest on the lime-on-void pairing, and is the one surface where the faith framing leads instead of underpinning.",
      image: { src: "/brands/shareefico/barakah-blueprint-poster.png", alt: "Barakah Blueprint podcast art" },
    },
    download: {
      label: "Shareefico brand pack",
      href: "/brands/downloads/shareefico-brand-pack.zip",
      contents: "Wordmark, icon set, palette (JSON + text), voice one-pager.",
    },
    site: { label: "shareefi.co", href: "https://shareefi.co" },
  },
];

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}
