export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export const team: TeamMember[] = [
  {
    id: 'ibrahim',
    name: 'Ibrahim Shareef',
    role: 'CEO & Co-founder',
    image: '/images/team/ibrahim-shareef.png',
  },
  {
    id: 'bisma',
    name: 'Bisma Aslam',
    role: 'Chief of Design & Co-founder',
    image: '/images/team/bisma-aslam.png',
  },
  {
    id: 'jonny',
    name: 'Jonny Olejak',
    role: 'Chief of Growth & Co-founder',
    image: '/images/team/jonny-olejak.png',
  },
];

// Languages are a COLLECTIVE team capability, not assigned to individuals
export const teamLanguages: string[] = [
  'Arabic', 'English', 'Spanish', 'German', 'Urdu', 'Swedish', 'Norwegian', 'Bosnian',
];
