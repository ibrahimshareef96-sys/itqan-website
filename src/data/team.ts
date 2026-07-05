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

export interface TeamLanguage {
  name: string;
  /** The language's own script/endonym, shown alongside the English name. */
  native: string;
}

// Languages spoken across the team. Confirmed by Ibrahim 2026-07-04
// (Spanish/Swedish/Norwegian still spoken in-house; German + Bosnian dropped).
export const teamLanguages: TeamLanguage[] = [
  { name: 'Arabic', native: 'العربية' },
  { name: 'English', native: 'English' },
  { name: 'Spanish', native: 'Español' },
  { name: 'Urdu', native: 'اردو' },
  { name: 'Swedish', native: 'Svenska' },
  { name: 'Norwegian', native: 'Norsk' },
];
