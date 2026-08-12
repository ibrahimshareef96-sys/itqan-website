/**
 * Brand portals — data for the hub (/brands) and the per-brand portals served
 * at brands.itqanstudio.com and brands.shareefi.co (host-routed in
 * src/middleware.ts; the same pages also answer at /brands/[slug]).
 *
 * The model is brand.uber.com's: one brand, deep chapters — Overview, Logo,
 * Colour, Typography, Composition, Iconography/Imagery, Motion, Voice,
 * Products, Assets — with Airbnb-style self-serve packs. Chapters are
 * optional per brand because real systems differ: Itqan documents iconography,
 * Shareefico documents imagery and its product line.
 *
 * Every fact traces to a source document — BRAND.md and globals.css for Itqan
 * Studio; shareefi.co's theme tokens, voice-guide.md and its video brand laws
 * for Shareefico. Nothing here is invented. Sources first, portal second.
 */

export interface BrandColor {
  name: string;
  hex: string;
  usage: string;
  /** Readable text colour on this swatch. */
  on: string;
}

export interface BrandPairing {
  label: string;
  fg: string;
  bg: string;
  ok: boolean;
  note: string;
}

export interface BrandTypeStyle {
  role: string;
  family: string;
  spec: string;
  sample: string;
  css: { fontFamily: string; fontWeight?: number; fontStyle?: string; letterSpacing?: string };
}

export interface BrandLogoVariant {
  name: string;
  src: string;
  /** Tile background hex (inline style — these values are data). */
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

/** Misuse tiles are GENERATED from the primary mark with CSS — authentic
 * don't-do-this demos without fabricating new artwork. */
export type MisuseKind = "stretch" | "rotate" | "recolour" | "effects" | "crowd" | "lowcontrast";
export interface BrandMisuse {
  kind: MisuseKind;
  label: string;
}

export interface BrandSpec {
  name: string;
  value: string;
  note: string;
}

export interface BrandImage {
  src: string;
  alt: string;
  caption: string;
}

export interface BrandProduct {
  name: string;
  tagline: string;
  body: string;
  image?: { src: string; alt: string };
  rules: string[];
}

export interface Brand {
  slug: string;
  name: string;
  domain: string;
  essence: string;
  intro: string;
  tile: { bg: string; fg: string; accent: string };
  story: string;
  principles: BrandPrinciple[];
  logos: BrandLogoVariant[];
  logoRules: BrandRule[];
  misuse: BrandMisuse[];
  /** The mark used for the generated misuse tiles. */
  misuseMark: { src: string; bg: string };
  colors: BrandColor[];
  colorNote: string;
  pairings: BrandPairing[];
  type: BrandTypeStyle[];
  typeNote: string;
  composition: { intro: string; rules: BrandRule[] };
  iconography?: { intro: string; rules: string[] };
  motion: { intro: string; specs: BrandSpec[] };
  imagery?: { intro: string; images: BrandImage[] };
  voiceIntro: string;
  voice: BrandPrinciple[];
  products?: BrandProduct[];
  download: { label: string; href: string; contents: string };
  site: { label: string; href: string };
}

export const brands: Brand[] = [
  {
    slug: "itqan-studio",
    name: "Itqan Studio",
    domain: "brands.itqanstudio.com",
    essence: "Itqan is Arabic for excellence. The brand holds itself to the word.",
    intro:
      "The identity system for Itqan Studio FZ LLC. Espresso plum, mauve, warm sand and cream. Manrope for structure, Playfair for the editorial line. These are the rules we apply to our own brand before we apply them to yours.",
    tile: { bg: "#2f1c2c", fg: "#fffbf5", accent: "#cca4c2" },
    story:
      "Itqan Studio is named for a standard: doing a thing with the intention of mastering it. The identity keeps that promise quiet and visible at once. A dark, espresso-plum world with one warm accent, type that behaves, and rules written down so quality never depends on memory.",
    principles: [
      { title: "Precision over decoration", body: "Every element earns its place. If it does not carry meaning, it goes." },
      { title: "Warmth inside discipline", body: "Cream, sand and mauve keep a strict system human. Premium never means cold." },
      { title: "Rules in writing", body: "The system lives in documents, not in one designer's head. That is why it survives handoffs." },
      { title: "The work is the proof", body: "The brand never claims what the portfolio cannot show." },
    ],
    logos: [
      { name: "Primary on dark", src: "/images/brand/light-logo.svg", bg: "#2f1c2c", note: "Default. Cream mark on Espresso Plum." },
      { name: "Primary on light", src: "/images/brand/dark-logo.svg", bg: "#fffbf5", note: "For cream and white surfaces." },
      { name: "Mono white", src: "/images/brand/white-logo.svg", bg: "#1a1a1a", note: "Photography and video overlays only." },
      { name: "Icon on light", src: "/images/brand/dark-icon.svg", bg: "#fffbf5", note: "The mark alone — avatars, favicons, small spaces." },
      { name: "Icon on dark", src: "/images/brand/light-icon.svg", bg: "#2f1c2c", note: "Mark-only for dark UI surfaces." },
      { name: "BIMI", src: "/bimi/logo.svg", bg: "#fffbf5", note: "The email-sender indicator. Square, SVG Tiny P/S." },
    ],
    logoRules: [
      { kind: "do", text: "Keep clear space around the mark equal to the height of its letterform." },
      { kind: "do", text: "Use the variant built for the surface. Dark mark on light, light mark on dark." },
      { kind: "do", text: "Use the icon alone only where the full mark cannot breathe — favicons, avatars, app tiles." },
      { kind: "dont", text: "Recolour the mark outside the palette." },
      { kind: "dont", text: "Set the wordmark in any other typeface, ever." },
    ],
    misuse: [
      { kind: "stretch", label: "Don't stretch or compress" },
      { kind: "rotate", label: "Don't rotate" },
      { kind: "recolour", label: "Don't recolour" },
      { kind: "effects", label: "Don't add shadows or effects" },
      { kind: "crowd", label: "Don't crowd the clear space" },
      { kind: "lowcontrast", label: "Don't use low-contrast fills" },
    ],
    misuseMark: { src: "/images/brand/light-logo.svg", bg: "#2f1c2c" },
    colors: [
      { name: "Espresso Plum", hex: "#2f1c2c", usage: "Dark backgrounds, primary buttons, nav, footer.", on: "#fffbf5" },
      { name: "Mauve", hex: "#cca4c2", usage: "Accent on dark backgrounds only.", on: "#2f1c2c" },
      { name: "Deep Mauve", hex: "#6d4a66", usage: "The same accent role, on light backgrounds only.", on: "#fffbf5" },
      { name: "Warm Sand", hex: "#d1c2a5", usage: "Secondary accent. Borders and subtle highlights.", on: "#2f1c2c" },
      { name: "Cream", hex: "#fffbf5", usage: "Light backgrounds, cards, text on dark.", on: "#1a1a1a" },
      { name: "Ink", hex: "#1a1a1a", usage: "Body text on light surfaces.", on: "#fffbf5" },
      { name: "Ink Secondary", hex: "#666666", usage: "Supporting text and metadata on light surfaces.", on: "#fffbf5" },
    ],
    colorNote:
      "The dual-accent rule is the one people miss: mauve fails contrast on cream, so the accent swaps to Deep Mauve on every light surface. Same role, two values. Nothing else in the palette changes between surfaces.",
    pairings: [
      { label: "Mauve on Espresso", fg: "#cca4c2", bg: "#2f1c2c", ok: true, note: "The signature pairing. Accent headings on dark." },
      { label: "Mauve on Cream", fg: "#cca4c2", bg: "#fffbf5", ok: false, note: "Fails contrast. This is why Deep Mauve exists." },
      { label: "Deep Mauve on Cream", fg: "#6d4a66", bg: "#fffbf5", ok: true, note: "The accent role on light surfaces." },
      { label: "Cream on Espresso", fg: "#fffbf5", bg: "#2f1c2c", ok: true, note: "Primary text on dark." },
      { label: "Ink on Cream", fg: "#1a1a1a", bg: "#fffbf5", ok: true, note: "Primary text on light." },
      { label: "Sand on Espresso", fg: "#d1c2a5", bg: "#2f1c2c", ok: true, note: "Secondary accents and hairlines on dark." },
    ],
    type: [
      { role: "Headlines", family: "Manrope Bold", spec: "64px hero / 40 to 44px sections, tight tracking", sample: "Excellence is a standard, not a slogan.", css: { fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: 700, letterSpacing: "-0.02em" } },
      { role: "Editorial accent", family: "Playfair Display Italic", spec: "One italic line per headline, accent colour", sample: "Clarity, precision and results.", css: { fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontStyle: "italic", fontWeight: 400 } },
      { role: "Body", family: "Manrope Regular", spec: "16px, 400. Short sentences. No filler.", sample: "Every headline promises a result, not a process.", css: { fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: 400 } },
      { role: "UI & navigation", family: "Manrope Medium", spec: "14 to 16px, 500", sample: "Start a conversation", css: { fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: 500 } },
      { role: "Labels", family: "Manrope Bold", spec: "10 to 12px, uppercase, wide tracking", sample: "SELECTED WORK", css: { fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: 700, letterSpacing: "0.18em" } },
    ],
    typeNote:
      "Playfair is always italic, never upright, and never in body text, buttons or navigation. Maximum one Playfair line per headline. It carries the accent colour for its surface.",
    composition: {
      intro:
        "Layout is rhythm. Dark and light sections alternate down every page, cards stay softly rounded, and whitespace is treated as material, not leftover.",
      rules: [
        { kind: "do", text: "Alternate dark and light sections. Never two dark sections adjacent without a visual break." },
        { kind: "do", text: "Round cards 8 to 12px. Sharp enough to feel engineered, soft enough to feel warm." },
        { kind: "do", text: "Give work room. Generous whitespace around portfolio imagery is part of the brand." },
        { kind: "do", text: "One primary call to action per page: Start a conversation." },
        { kind: "dont", text: "Stack adjectives in headlines or crowd sections to fill space." },
        { kind: "dont", text: "Add a second accent colour to a section that already has one." },
      ],
    },
    iconography: {
      intro:
        "Icons come from one family — Phosphor — in its regular weight, so every glyph shares the same stroke logic. They support text; they never replace it in navigation.",
      rules: [
        "Phosphor, regular weight, across the entire site. No mixing icon sets.",
        "Icons take the text colour of their context, or the surface's accent for emphasis.",
        "16 to 24px in UI. Decorative icons cap at 32px.",
        "Never icon-only navigation. Labels always accompany.",
      ],
    },
    motion: {
      intro:
        "Motion is felt, not watched. Everything answers on pointer-down, settles fast, and respects reduced-motion by getting gentler rather than vanishing.",
      specs: [
        { name: "Standard transition", value: "300ms ease-out", note: "Colour, shadow and background changes." },
        { name: "Ceiling", value: "400ms", note: "No animation runs longer. Elegant, not flashy." },
        { name: "Press feedback", value: "on pointer-down", note: "Buttons respond when touched, not when released." },
        { name: "Reveals", value: "fade + rise", note: "Scroll-triggered, small offsets, opacity-led." },
        { name: "Hover on cards", value: "scale 1.02", note: "A lean-in, never a jump." },
        { name: "Reduced motion", value: "gentler, not silent", note: "Transitions simplify to opacity and colour. Nothing disappears." },
      ],
    },
    voiceIntro:
      "The voice sounds like someone who does not need to convince anyone. Outcome first, short sentences, zero filler.",
    voice: [
      { title: "Outcome-first", body: "Every headline promises a result, not a process. Your brand, built to close deals." },
      { title: "Confident, not boastful", body: "No qualifiers, no hedging. The work carries the claim." },
      { title: "One adjective per noun", body: "Adjective stacking is banned. Alliteration is not a substitute for meaning." },
      { title: "Short sentences win", body: "Five-word fragments beside fifteen-word sentences. Nothing past twenty-five." },
      { title: "Banned words", body: "Seamless, bespoke, elevate, leverage, tailored. Replaced with concrete language, every time." },
      { title: "Speak to the client's ambition", body: "Their result, not our capability. Fragments allowed in headlines: Clean. Intentional. Built to last." },
    ],
    download: {
      label: "Itqan Studio brand pack",
      href: "/brands/downloads/itqan-studio-brand-pack.zip",
      contents: "Full logo set + icons + BIMI (SVG), palette JSON, type spec, voice one-pager.",
    },
    site: { label: "itqanstudio.com", href: "https://itqanstudio.com" },
  },
  {
    slug: "shareefico",
    name: "Shareefico",
    domain: "brands.shareefi.co",
    essence: "Engineer. Designer. Storyteller. All in one.",
    intro:
      "The personal brand of Ibrahim Shareef, founder of Itqan Studio. Deep green and lime on near-black, Clash Display at hero scale, and a voice that talks like a practitioner, not a guru. Faith is the operating system, not the aesthetic.",
    tile: { bg: "#0d282b", fg: "#fffdf4", accent: "#d7fd64" },
    story:
      "Shareefico is one person doing three jobs on purpose: build the brand, code the system, tell the story. The identity is built around that claim — a dark green world lit by one lime accent, a single massive statement per page, and a 3D character who shows the work instead of posing with it.",
    principles: [
      { title: "Brand is execution", body: "The master thesis. Not graphic design. Every artifact demonstrates it or does not get published." },
      { title: "One accent sells", body: "Lime does the calls to action alone. When everything glows, nothing does." },
      { title: "The massive statement", body: "Each page earns exactly one huge line. Scale is spent, not sprinkled." },
      { title: "Faith as operating system", body: "Niyyah, barakah and itqan shape decisions before they shape sentences." },
    ],
    logos: [
      { name: "Wordmark", src: "/brands/shareefico/wordmark.png", bg: "#0d282b", note: "The written mark, off-white and lime on deep green." },
      { name: "Icon", src: "/brands/shareefico/icon-512.png", bg: "#061518", note: "App icon and avatar mark." },
      { name: "Favicon, lime", src: "/brands/shareefico/favicon-lime.png", bg: "#061518", note: "Small-size mark on dark surfaces." },
      { name: "Favicon, dark", src: "/brands/shareefico/favicon-dark.png", bg: "#d7fd64", note: "For lime and light surfaces." },
    ],
    logoRules: [
      { kind: "do", text: "Video watermark is the faded mark, bottom right." },
      { kind: "dont", text: "Never watermark video with the text wordmark." },
      { kind: "do", text: "Lime is the only CTA colour, everywhere the brand appears." },
      { kind: "dont", text: "Never use blue for anything a person is meant to click." },
    ],
    misuse: [
      { kind: "stretch", label: "Don't stretch or compress" },
      { kind: "rotate", label: "Don't rotate" },
      { kind: "recolour", label: "Don't recolour" },
      { kind: "effects", label: "Don't add glows or effects" },
      { kind: "crowd", label: "Don't crowd the clear space" },
      { kind: "lowcontrast", label: "Don't use low-contrast fills" },
    ],
    misuseMark: { src: "/brands/shareefico/wordmark.png", bg: "#0d282b" },
    colors: [
      { name: "Deep Green", hex: "#0d282b", usage: "Primary background.", on: "#fffdf4" },
      { name: "Abyss", hex: "#061518", usage: "Atmospheric backdrop behind the deep green.", on: "#fffdf4" },
      { name: "Void", hex: "#050706", usage: "Near-black canvas for the massive-statement moments.", on: "#fffdf4" },
      { name: "Off-white", hex: "#fffdf4", usage: "Primary foreground and text.", on: "#0d282b" },
      { name: "Lime", hex: "#d7fd64", usage: "Accent, CTA and italic emphasis. The only CTA colour.", on: "#050706" },
      { name: "Lime Hover", hex: "#c8f050", usage: "Hover state of the accent.", on: "#050706" },
      { name: "Shape Blue", hex: "#6289f0", usage: "3D shapes and character rim light only. Never a CTA.", on: "#050706" },
      { name: "HUD", hex: "#b9cdcf", usage: "Secondary interface text on the void.", on: "#050706" },
    ],
    colorNote:
      "One accent does the selling. Lime is reserved for calls to action and emphasis; the blue exists so the 3D scenes have a second temperature without competing for clicks.",
    pairings: [
      { label: "Lime on Void", fg: "#d7fd64", bg: "#050706", ok: true, note: "The signature pairing. CTAs and emphasis." },
      { label: "Off-white on Deep Green", fg: "#fffdf4", bg: "#0d282b", ok: true, note: "Primary reading pairing." },
      { label: "Void on Lime", fg: "#050706", bg: "#d7fd64", ok: true, note: "Button labels on the accent." },
      { label: "HUD on Void", fg: "#b9cdcf", bg: "#050706", ok: true, note: "Secondary text, lifted specifically to clear AA." },
      { label: "Blue as a CTA", fg: "#6289f0", bg: "#050706", ok: false, note: "Readable, but banned by role: blue never sells." },
    ],
    type: [
      { role: "Hero", family: "Clash Display", spec: "Massive single statement, one per page", sample: "Brand is execution.", css: { fontFamily: "'Clash Display', Poppins, sans-serif", fontWeight: 600, letterSpacing: "-0.02em" } },
      { role: "Display", family: "Poppins", spec: "Section headings", sample: "Faith and execution.", css: { fontFamily: "Poppins, sans-serif", fontWeight: 600 } },
      { role: "Italic accent", family: "Playfair Display Italic", spec: "Lime, sparingly", sample: "the blueprint", css: { fontFamily: "var(--font-playfair), 'Playfair Display', serif", fontStyle: "italic" } },
      { role: "Body", family: "Manrope", spec: "16px, plain and direct", sample: "I tried this. Here is what actually happened.", css: { fontFamily: "var(--font-manrope), Manrope, sans-serif", fontWeight: 400 } },
      { role: "Mono", family: "JetBrains Mono", spec: "Numbers, code, HUD details", sample: "40+ episodes", css: { fontFamily: "'JetBrains Mono', monospace", fontWeight: 400 } },
    ],
    typeNote:
      "Clash Display is for the one massive line a page earns. Poppins runs the sections, Manrope runs the reading, and the mono face handles numbers and interface details.",
    composition: {
      intro:
        "Pages are built around a single moment: one void-black scene, one massive line, one lime action. Everything else supports that hierarchy.",
      rules: [
        { kind: "do", text: "One massive statement per page, on the void, in Clash Display." },
        { kind: "do", text: "One lime CTA per screen. The rest of the page defers to it." },
        { kind: "do", text: "Let the 3D character do the showing — at work, mid-task, never posing." },
        { kind: "dont", text: "Spend hero scale twice on one page." },
        { kind: "dont", text: "Let blue touch anything interactive." },
      ],
    },
    motion: {
      intro:
        "Motion carries physicality: springs over curves, reveals that respect the reader, and nothing that traps the scroll.",
      specs: [
        { name: "Reveals", value: "fade + rise, spring-settled", note: "Content arrives; it does not perform." },
        { name: "Reveal floor", value: "always readable", note: "Nothing stays hidden if scripts or observers fail." },
        { name: "CTA hover", value: "lime → lime hover", note: "#d7fd64 to #c8f050, fast." },
        { name: "3D scenes", value: "slow drift", note: "Ambient movement in the character scenes, never in the reading column." },
        { name: "Reduced motion", value: "gentler, not silent", note: "Opacity-led equivalents, same information." },
      ],
    },
    imagery: {
      intro:
        "The imagery system is a 3D-illustrated world: Ibrahim's character in a deep-green studio, lit by lime, rimmed in blue. It exists to show work happening, not to decorate.",
      images: [
        { src: "/brands/shareefico/portraits/hero-home-portrait.png", alt: "Shareefico 3D character portrait", caption: "The character. Confident, at rest, green world, lime light." },
        { src: "/brands/shareefico/portraits/work-hands-keyboard.png", alt: "Hands on a keyboard, mid-build", caption: "Show the how. Hands in the work beats faces at the camera." },
        { src: "/brands/shareefico/portraits/podcast-page-hero.png", alt: "Podcast scene at the microphone", caption: "The Barakah Blueprint set: mic, headphones, green room, lime rim." },
      ],
    },
    voiceIntro:
      "Written rules, enforced in every caption, post and page. The shortest summary: practitioner, not guru.",
    voice: [
      { title: "Practitioner, not guru", body: "I tried this beats you should. Lived opinion over googleable information." },
      { title: "Brand is execution", body: "The master thesis. Not graphic design. Every artifact either demonstrates it or does not get published." },
      { title: "Faith out loud", body: "Niyyah, barakah, itqan named plainly when they are the right word. Operating system, not aesthetic." },
      { title: "Scars, not wounds", body: "A scar is a lived moment plus the lesson. Raw venting does not ship." },
      { title: "Show what it isn't first", body: "Lead with the inverse. The contrast is the hook." },
      { title: "No em dashes, no invented numbers", body: "Hard rules. Punctuation stays simple and every number is a verified one." },
    ],
    products: [
      {
        name: "Barakah Blueprint",
        tagline: "The flagship product. Faith and execution, forty-plus episodes deep.",
        body:
          "Barakah Blueprint is the product line within Shareefico: the podcast and everything built around it. It inherits the full system and leans hardest on lime-on-void, and it is the one surface where the faith framing leads instead of underpinning. Guests, show notes and clips all follow the same rules on this page.",
        image: { src: "/brands/shareefico/barakah-blueprint-poster.png", alt: "Barakah Blueprint podcast art" },
        rules: [
          "Episode art stays in the green studio world. No stock, no white backgrounds.",
          "Clips watermark with the faded mark, bottom right, never the wordmark.",
          "Titles are claims a practitioner can defend, not curiosity bait.",
          "Faith terms lead here. This surface is where barakah is said plainly.",
        ],
      },
    ],
    download: {
      label: "Shareefico brand pack",
      href: "/brands/downloads/shareefico-brand-pack.zip",
      contents: "Wordmark, icon set, imagery set, Barakah Blueprint art, palette JSON, voice one-pager.",
    },
    site: { label: "shareefi.co", href: "https://shareefi.co" },
  },
];

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}
