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
    role: 'Founder',
    image: '/images/team/ibrahim-shareef.png',
  },
  {
    id: 'bisma',
    name: 'Bisma Aslam',
    role: 'Design collaborator',
    image: '/images/team/bisma-aslam.png',
    objectPosition: '50% 31%',
  },
  {
    id: 'jonny',
    name: 'Jonny Olejak',
    role: 'Growth collaborator',
    image: '/images/team/jonny-olejak.png',
    objectPosition: '50% 16%',
  },
];

// Languages spoken across the founder + collaborator network.
export const teamLanguages: string[] = [
  'Arabic', 'English', 'Spanish', 'German', 'Urdu', 'Swedish', 'Norwegian', 'Bosnian',
];
