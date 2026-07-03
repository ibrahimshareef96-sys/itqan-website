export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  /**
   * CSS object-position for the card image. Tuned per-photo so the face stays
   * centered when a portrait source is cropped into a landscape card. Defaults
   * to 'center' when omitted.
   */
  objectPosition?: string;
}

export const team: TeamMember[] = [
  {
    id: 'ibrahim',
    name: 'Ibrahim Shareef',
    role: 'CEO & Co-Founder',
    image: '/images/team/ibrahim-shareef.png',
  },
  {
    id: 'bisma',
    name: 'Bisma Aslam',
    role: 'Head of Design & Co-Founder',
    image: '/images/team/bisma-aslam.png',
    objectPosition: '50% 31%',
  },
];

// Languages spoken by the two founders. Trimmed to the CONFIRMED set after Jonny's
// removal (honesty rule: an accurate short list beats an impressive wrong one).
// TODO(ibrahim): re-add any of Spanish / German / Swedish / Norwegian / Bosnian
// that someone on the page actually speaks.
export const teamLanguages: string[] = ['Arabic', 'English', 'Urdu'];
