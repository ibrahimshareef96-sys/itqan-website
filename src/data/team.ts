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
    role: 'Founder',
    image: '/images/team/ibrahim-shareef.png',
  },
  {
    id: 'bisma',
    name: 'Bisma Aslam',
    role: 'Design collaborator',
    image: '/images/team/bisma-aslam.png',
  },
  {
    id: 'jonny',
    name: 'Jonny Olejak',
    role: 'Growth collaborator',
    image: '/images/team/jonny-olejak.png',
  },
];

// Languages spoken across the founder + collaborator network.
export const teamLanguages: string[] = [
  'Arabic', 'English', 'Spanish', 'German', 'Urdu', 'Swedish', 'Norwegian', 'Bosnian',
];
