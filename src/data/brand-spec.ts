/**
 * The Itqan Studio brand system, as data.
 *
 * Single source of truth for every spec page in the portal. Values are READ
 * FROM the live system (tailwind.config.ts + globals.css) rather than restated
 * from memory, and contrast ratios are measured, not estimated — a brand portal
 * that disagrees with the product it documents is worse than no portal.
 *
 * When a token changes in tailwind.config.ts, change it here in the same commit.
 */

export interface Swatch {
  name: string;
  hex: string;
  token: string;
  role: string;
  /**
   * The approved text colour ON this swatch.
   *
   * Data, not styling: the colour page renders each swatch as a full-bleed band
   * with real type on it, so the page demonstrates the pairing instead of
   * asserting it in a table. Every value here is measured — the lowest is
   * 5.57:1 and the rest clear 7:1.
   */
  fg: string;
  on?: { name: string; ratio: number };
}

const CREAM = '#fffbf5';
const PLUM = '#2f1c2c';

export const CORE_COLOURS: Swatch[] = [
  {
    name: 'Plum',
    hex: '#2f1c2c',
    token: 'brand-dark',
    fg: CREAM,
    role: 'The dark ground. Every dark section, the hero, the closing call to action.',
  },
  {
    name: 'Cream',
    hex: '#fffbf5',
    token: 'brand-cream',
    fg: PLUM,
    role: 'The light ground, and all text on plum. Warm, never pure white.',
    on: { name: 'Plum', ratio: 15.39 },
  },
  {
    name: 'Mauve',
    hex: '#cca4c2',
    token: 'brand-accent',
    fg: PLUM,
    role: 'The accent — but ONLY on dark. This is the colour people recognise.',
    on: { name: 'Plum', ratio: 7.3 },
  },
  {
    name: 'Deep Mauve',
    hex: '#6d4a66',
    token: 'brand-accent-on-light',
    fg: CREAM,
    role: 'The same accent role on cream. Not a variation for taste — a legibility requirement.',
    on: { name: 'Cream', ratio: 7.22 },
  },
  {
    name: 'Sand',
    hex: '#d1c2a5',
    token: 'brand-accent-secondary',
    fg: PLUM,
    role: 'Secondary accent. Rules, quiet labels, supporting detail on dark.',
    on: { name: 'Plum', ratio: 9.05 },
  },
];

export const TEXT_COLOURS: Swatch[] = [
  {
    name: 'Text Primary',
    hex: '#1a1a1a',
    token: 'text-primary',
    fg: CREAM,
    role: 'Body copy on cream and white.',
    on: { name: 'Cream', ratio: 16.88 },
  },
  {
    name: 'Text Secondary',
    hex: '#666666',
    token: 'text-secondary',
    fg: CREAM,
    role: 'Supporting copy on light surfaces.',
    on: { name: 'Cream', ratio: 5.57 },
  },
  {
    name: 'Text on Dark',
    hex: '#fffbf5',
    token: 'text-light',
    fg: PLUM,
    role: 'All copy on plum.',
    on: { name: 'Plum', ratio: 15.39 },
  },
];

export interface Pairing {
  fg: string;
  bg: string;
  label: string;
  ratio: number;
  verdict: 'aaa' | 'aa' | 'large-only' | 'never';
  note: string;
}

export const PAIRINGS: Pairing[] = [
  {
    fg: '#fffbf5',
    bg: '#2f1c2c',
    label: 'Cream on Plum',
    ratio: 15.39,
    verdict: 'aaa',
    note: 'The default on every dark section.',
  },
  {
    fg: '#2f1c2c',
    bg: '#fffbf5',
    label: 'Plum on Cream',
    ratio: 15.39,
    verdict: 'aaa',
    note: 'The default on every light section.',
  },
  {
    fg: '#d1c2a5',
    bg: '#2f1c2c',
    label: 'Sand on Plum',
    ratio: 9.05,
    verdict: 'aaa',
    note: 'The quiet accent on dark. Good for rules and small labels.',
  },
  {
    fg: '#cca4c2',
    bg: '#2f1c2c',
    label: 'Mauve on Plum',
    ratio: 7.3,
    verdict: 'aaa',
    note: 'The accent pairing. Italic phrases, section labels, icons on dark.',
  },
  {
    fg: '#6d4a66',
    bg: '#fffbf5',
    label: 'Deep Mauve on Cream',
    ratio: 7.22,
    verdict: 'aaa',
    note: 'The accent on light. Use this everywhere Mauve would have gone on cream.',
  },
  {
    fg: '#2f1c2c',
    bg: '#cca4c2',
    label: 'Plum on Mauve',
    ratio: 7.3,
    verdict: 'aaa',
    note: 'The only approved way to put text on a mauve fill.',
  },
  {
    fg: '#666666',
    bg: '#fffbf5',
    label: 'Text Secondary on Cream',
    ratio: 5.57,
    verdict: 'aa',
    note: 'Fine for supporting copy. Not for anything below 14px.',
  },
  {
    fg: '#cca4c2',
    bg: '#fffbf5',
    label: 'Mauve on Cream',
    ratio: 2.11,
    verdict: 'never',
    note: 'This is why Deep Mauve exists. Mauve on a light surface is unreadable — the single most common mistake in this system.',
  },
  {
    fg: '#fffbf5',
    bg: '#cca4c2',
    label: 'Cream on Mauve',
    ratio: 2.11,
    verdict: 'never',
    note: 'Light text on a mauve fill. If you see it, it is a bug.',
  },
];

export interface TypeRole {
  role: string;
  face: string;
  spec: string;
  use: string;
}

export const TYPE_ROLES: TypeRole[] = [
  { role: 'Hero', face: 'Manrope Bold', spec: '64px, 700, -0.02em', use: 'The opening headline. One per page.' },
  { role: 'Section heading', face: 'Manrope Bold', spec: '40–44px, 700, -0.02em', use: 'The heading that opens a section.' },
  { role: 'Editorial accent', face: 'Playfair Display Italic', spec: 'matches its heading, 400, italic', use: 'One highlighted phrase inside a headline. Never a whole sentence.' },
  { role: 'Body', face: 'Manrope Regular', spec: '16px, 400, 1.7', use: 'Everything you actually read. Short sentences, no filler.' },
  { role: 'UI & navigation', face: 'Manrope Medium', spec: '14–16px, 500', use: 'Buttons, nav links, form labels.' },
  { role: 'Label', face: 'Manrope Bold', spec: '10–12px, 700, 0.18em, uppercase', use: 'The small label above a heading.' },
];

export const MOTION_TOKENS: Array<[string, string, string]> = [
  ['Enter / settle', 'cubic-bezier(0.22, 1, 0.36, 1)', '--ease-enter'],
  ['Hover / press', 'cubic-bezier(0.32, 0.72, 0, 1)', '--ease-hover'],
  ['Hover', '200ms', 'fast'],
  ['Scroll reveal', '400ms', 'base'],
  ['Ceiling', 'under 400ms', 'elegant, not flashy'],
];

export const RADII: Array<[string, string, string]> = [
  ['Card', '8–12px', 'rounded-lg / rounded-xl'],
  ['Button', '8px', 'rounded-lg'],
  ['Pill', '9999px', 'rounded-full'],
];
