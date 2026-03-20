export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  coverImage: string;
  mockups: string[];
  description: string;
  behanceUrl?: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 'shareefico',
    title: 'Shareefico',
    subtitle: 'Personal Brand',
    category: 'branding',
    coverImage: '/images/portfolio/shareefico/cover.png',
    mockups: [
      '/images/portfolio/shareefico/mockup-1.png',
      '/images/portfolio/shareefico/mockup-2.png',
      '/images/portfolio/shareefico/mockup-3.png',
    ],
    description: 'A cohesive personal brand identity built from the ground up.',
    behanceUrl: 'https://www.behance.net/gallery/238575625/Shareefico-Personal-Brand',
    tags: ['Branding', 'Identity', 'Strategy'],
  },
  {
    id: 'medacs',
    title: 'Medacs',
    subtitle: 'Healthcare Platform',
    category: 'ui-ux',
    coverImage: '/images/portfolio/medacs/cover.png',
    mockups: [
      '/images/portfolio/medacs/mockup-1.png',
      '/images/portfolio/medacs/mockup-2.png',
      '/images/portfolio/medacs/mockup-3.png',
    ],
    description: 'A modern healthcare platform designed for clarity and ease of use.',
    tags: ['UI/UX', 'Web Design', 'Healthcare'],
  },
  {
    id: 'nexilink',
    title: 'Nexilink',
    subtitle: 'Digital Platform',
    category: 'ui-ux',
    coverImage: '/images/portfolio/nexilink/cover.png',
    mockups: [
      '/images/portfolio/nexilink/mockup-1.png',
      '/images/portfolio/nexilink/mockup-2.png',
      '/images/portfolio/nexilink/mockup-3.png',
    ],
    description: 'A seamless digital platform connecting users with essential services.',
    tags: ['UI/UX', 'Web Design', 'Platform'],
  },
  {
    id: 'oud-closet',
    title: 'Oud Closet',
    subtitle: 'E-commerce Brand',
    category: 'branding',
    coverImage: '/images/portfolio/oud-closet/cover.png',
    mockups: [
      '/images/portfolio/oud-closet/mockup-1.png',
      '/images/portfolio/oud-closet/mockup-2.png',
      '/images/portfolio/oud-closet/mockup-3.png',
    ],
    description: 'A luxury e-commerce brand identity for premium oud products.',
    tags: ['Branding', 'E-commerce', 'Luxury'],
  },
];
