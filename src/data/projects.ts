export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  coverImage: string;
  /** Optional cover video used by listing cards. coverImage acts as the poster + fallback. */
  coverVideo?: string;
  mockups: string[];
  description: string;
  behanceUrl?: string;
  tags: string[];
  filters: string[];
}

export const projects: Project[] = [
  {
    id: 'mutqin',
    title: 'Mutqin',
    subtitle: 'AI Startup Companion',
    category: 'Application Development',
    coverImage: '/images/portfolio/mutqin/hero.webp',
    mockups: [
      '/images/portfolio/mutqin/wizard.webp',
      '/images/portfolio/mutqin/portal.webp',
      '/images/portfolio/mutqin/mobile.webp',
    ],
    description:
      'An AI startup companion that turns one onboarding chat into a living company portal — coaching, investor-grade documents, and a readiness score. Designed, branded and engineered end to end at Itqan on React, TypeScript, Supabase and Claude. Live at mutqin.xyz.',
    tags: ['Application Development', 'Product Design', 'AI'],
    filters: ['Application Development', 'Brand & Identity', 'UI/UX Design'],
  },
  {
    id: 'shareefico',
    title: 'Shareefico',
    subtitle: 'Personal Brand & Custom CMS',
    category: 'branding',
    coverImage: '/images/portfolio/shareefico/cover-poster.jpg',
    coverVideo: '/videos/shareefico-cover.mp4',
    mockups: [
      '/images/portfolio/shareefico/website.png',
      '/images/portfolio/shareefico/tokens.png',
      '/images/portfolio/shareefico/SHRFCO-CMS-MKP.png',
    ],
    description: 'A cohesive personal brand identity built from the ground up.',
    behanceUrl: 'https://www.behance.net/gallery/238575625/Shareefico-Personal-Brand',
    tags: ['Branding', 'Identity', 'Strategy'],
    filters: ['Brand & Identity'],
  },
  {
    id: 'project-you',
    title: 'Project You',
    subtitle: 'A calm life-OS that begins at first light',
    category: 'Application Development',
    coverImage: '/images/portfolio/project-you/dawn.webp',
    mockups: [
      '/images/portfolio/project-you/today.webp',
      '/images/portfolio/project-you/quran.webp',
      '/images/portfolio/project-you/habits.webp',
    ],
    description:
      "A calm life-operating-system with a faith soul — goals, habits, projects, journal, focus, health, finance and a verse-by-verse Qur'an companion in one gentle place that begins each day at first light. Rebranded from 'Aurora' to 'Noor' and built end to end at Itqan on React, TypeScript, Supabase and Claude. Live at projectyou.app.",
    tags: ['Product Design', 'Brand & Identity', 'Application Development'],
    filters: ['Application Development', 'Brand & Identity', 'UI/UX Design'],
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
];
