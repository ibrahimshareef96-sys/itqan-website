/**
 * Portal information architecture — Itqan Studio.
 *
 * Modelled on brand.uber.com (a Frontify STYLEGUIDE): a three-level tree —
 * CATEGORY → section → page — where every topic owns a URL instead of being an
 * anchor in one long scroll. The sidebar, the search index and the sitemap all
 * derive from this one structure, so they can never disagree.
 *
 * Structurally identical to the Shareefico portal in shareefico-website. The
 * two differ only in this file (the tree and the chrome) and in the token
 * bindings under `.brand-portal` in globals.css.
 */

export interface PortalPage {
  href: string;
  label: string;
  /** One line describing the page — used by search and by section indexes. */
  summary: string;
  children?: PortalPage[];
}

export interface PortalCategory {
  label: string;
  items: PortalPage[];
}

/** Chrome shown in the portal top bar. The one place the two portals diverge. */
export const PORTAL_BRAND = {
  markSrc: '/brand/itqan-studio/logo/white-logo.svg',
  siteUrl: 'https://itqanstudio.com',
  siteLabel: 'itqanstudio.com',
} as const;

export const PORTAL_NAV: PortalCategory[] = [
  {
    label: 'Foundations',
    items: [
      { href: '/brand', label: 'Overview', summary: 'What the Itqan Studio brand is, and how to use this portal.' },
      { href: '/brand/story', label: 'Story & principles', summary: 'What itqan means, and the four principles the brand protects.' },
      { href: '/brand/positioning', label: 'Positioning', summary: 'Who Itqan Studio is for, and what it refuses to be.' },
    ],
  },
  {
    label: 'Identity',
    items: [
      {
        href: '/brand/logo',
        label: 'Logo',
        summary: 'The mark and the wordmark: which version goes where.',
        children: [
          { href: '/brand/logo/library', label: 'Logo library', summary: 'Every approved mark, downloadable in each format.' },
          { href: '/brand/logo/clear-space', label: 'Clear space & sizing', summary: 'Minimum sizes and the space the mark needs.' },
          { href: '/brand/logo/misuse', label: 'Misuse', summary: 'The things never to do to the mark.' },
        ],
      },
      {
        href: '/brand/colour',
        label: 'Colour',
        summary: 'The plum ground, the two accents, and when each one applies.',
        children: [
          { href: '/brand/colour/pairings', label: 'Pairings & contrast', summary: 'Approved combinations with measured contrast, and the banned ones.' },
        ],
      },
      {
        href: '/brand/typography',
        label: 'Typography',
        summary: 'Manrope for everything, Playfair italic for one phrase.',
        children: [
          { href: '/brand/typography/specimens', label: 'Specimens', summary: 'Live specimens of every role in the scale.' },
        ],
      },
    ],
  },
  {
    label: 'Expression',
    items: [
      { href: '/brand/composition', label: 'Composition', summary: 'Alternating light and dark sections, and the rhythm between them.' },
      { href: '/brand/imagery', label: 'Imagery', summary: 'Client work, process shots, and what the pictures are for.' },
      { href: '/brand/motion', label: 'Motion', summary: 'How things move, and the specs that keep it consistent.' },
      {
        href: '/brand/voice',
        label: 'Voice',
        summary: 'Confident and premium, never corporate. How Itqan writes.',
        children: [
          { href: '/brand/voice/library', label: 'Copy library', summary: 'Approved lines: boilerplate, taglines, service descriptions.' },
        ],
      },
    ],
  },
  {
    label: 'Resources',
    items: [
      { href: '/brand/assets', label: 'Asset library', summary: 'Every downloadable asset, filterable by type and format.' },
      { href: '/brand/assets/stickers', label: 'Stickers & merch', summary: 'The sticker programme and print-ready sheets.' },
      { href: '/brand/assets/signatures', label: 'Email signatures', summary: 'Hosted signature templates for the team.' },
      { href: '/brand/assets/backgrounds', label: 'Call backgrounds', summary: 'Branded backgrounds for video calls.' },
      { href: '/brand/press', label: 'Press & media', summary: 'Boilerplate, logos and how to reach us.' },
      { href: '/brand/updates', label: 'Brand updates', summary: 'What changed in the brand system, and when.' },
    ],
  },
];

/** Flattened, in sidebar order — the canonical page list. */
export const PORTAL_PAGES: PortalPage[] = PORTAL_NAV.flatMap((c) =>
  c.items.flatMap((p) => [p, ...(p.children ?? [])]),
);

export function portalPage(href: string): PortalPage | undefined {
  return PORTAL_PAGES.find((p) => p.href === href);
}

export function portalCategoryOf(href: string): string | undefined {
  return PORTAL_NAV.find((c) =>
    c.items.some((p) => p.href === href || p.children?.some((k) => k.href === href)),
  )?.label;
}
