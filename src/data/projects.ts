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
  filters: string[];
}

export const projects: Project[] = [
  {
    id: 'shareefico',
    title: 'Shareefico',
    subtitle: 'Personal Brand & Custom CMS',
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
    filters: ['Brand & Identity'],
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
    filters: ['Brand & Identity', 'UI/UX Design'],
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
    filters: ['Brand & Identity'],
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
    filters: ['Brand & Identity'],
  },
  {
    id: 'itqan-crm',
    title: 'Itqan Studio CRM',
    subtitle: 'Custom CRM & Operations Platform',
    category: 'Application Development',
    coverImage: '/images/portfolio/ITQAN-CRM-MKP-MCBK2.png',
    mockups: [
      '/images/portfolio/ITQAN-CRM-MKP-MCBK.png',
      '/images/portfolio/ITQAN-CRM-MB-MKP.png',
      '/images/portfolio/ITQAN-CRM-MB-MKP2.png',
    ],
    description:
      'A bespoke internal operations platform built for Itqan Studio — managing projects, pipeline, invoicing, expenses, and financial reporting in one unified system. Built with Next.js 14 and Supabase.',
    tags: ['Application Development', 'CRM', 'Platform'],
    filters: ['Application Development'],
  },
  {
    id: 'project-you',
    title: 'Project You',
    subtitle: 'Personal Life OS',
    category: 'Application Development',
    coverImage: '/images/portfolio/project-you-mkp-mb.png',
    mockups: [
      '/images/portfolio/project-you-mkp-mb.png',
    ],
    description:
      "A personal life operating system that applies real project management principles to how you live — goals, habits, projects, Qur'an tracking, health, and finance in one platform. Built with Next.js and Supabase. Live at projectyou.app.",
    tags: ['Application Development', 'Product', 'Platform'],
    filters: ['Application Development'],
  },
];
