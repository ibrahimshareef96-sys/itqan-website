import type { Project } from './projects';

export type FounderPillar = 'identity' | 'system' | 'automation';

export interface CaseStudyPhase {
  pillar: FounderPillar;
  /** e.g. "Days 1-30" or "Week 1-2" — string, not enum, so older shorter engagements can describe their own cadence */
  days: string;
  /** What actually shipped in this phase */
  deliverables: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  industry: string;
  category: string;
  coverImage: string;
  /** Optional cover video that replaces coverImage on the detail-page hero. coverImage stays the poster + the fallback for listing cards. */
  coverVideo?: string;
  mockups: string[];
  challenge: string;
  approach: string;
  result: string;
  services: string[];
  testimonialQuote: string;
  testimonialName: string;
  testimonialCompany: string;
  testimonialImage?: string;
  behanceUrl?: string;
  /** Public-facing live URL for the shipped work, e.g. https://shareefi.co. Surfaces as a "Visit live site" CTA. */
  liveUrl?: string;
  /** Real duration string, e.g. "3 weeks", "<30 days" */
  duration?: string;
  /** Industry average for comparable scope, e.g. "8-16 weeks" */
  industryAverage?: string;
  /** Quantified outcome — headline stat. e.g. "Won 1st place at investor competition" */
  outcomeMetric?: string;
  /** One-liner scope summary for the at-a-glance strip. e.g. "Brand + product UX redesign" */
  scope?: string;
  /** Client's voice about the pain that triggered the engagement */
  beforeQuote?: string;
  /** Phases of the 90-Day Founder OS that ran for this client. Only the ones in scope. */
  phases?: CaseStudyPhase[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'nexilink',
    title: 'Nexilink',
    subtitle: 'Digital Platform',
    industry: 'Recruitment & Talent',
    category: 'UI/UX',
    coverImage: '/images/portfolio/nexilink/cover.png',
    mockups: [
      '/images/portfolio/nexilink/mockup-1.png',
      '/images/portfolio/nexilink/mockup-2.png',
      '/images/portfolio/nexilink/mockup-3.png',
    ],
    challenge:
      'No product. No brand. No deck. A competition deadline in 21 days. The founder needed to walk on stage with something investors could actually see, click, and believe.',
    approach:
      'We compressed a 4-month engagement into 3 weeks. Brand strategy + identity in Week 1. UX research with real recruiters + employers in Week 2. Full UI design + tested prototype in Week 3. No phase ran past its deadline.',
    result:
      "Nexilink walked into the 2024 investor competition with a brand investors couldn't ignore and a product they could click through. They placed first. The full identity + UX system became the foundation for the next phase of growth.",
    services: [
      'Brand Strategy & Identity',
      'UX Research',
      'Creative Direction',
      'Market Research & Analysis',
    ],
    testimonialQuote:
      "We brought Itqan in to solve major challenges in our UI and UX, and the results exceeded expectations. They didn't just redesign the product. They rebuilt it into a clean, functional and user-focused experience that perfectly matched our direction. Their ability to listen, analyse and execute quickly made a huge difference for us. Itqan is a partner we trust for both speed and quality.",
    testimonialName: 'Abdi Mohamud',
    testimonialCompany: 'Nexilink',
    testimonialImage: '/images/testimonials/abdi-mohamud.jpeg',
    duration: '3 weeks',
    industryAverage: '8-16 weeks',
    outcomeMetric: 'Won 1st place at investor competition (2024)',
    scope: 'Brand + investor-ready product UX',
    beforeQuote:
      "We had no product, no brand, and no investor story. We needed it all — and we needed it before the competition.",
    phases: [
      {
        pillar: 'identity',
        days: 'Week 1',
        deliverables: [
          'Brand strategy + naming validation',
          'Positioning brief + investor narrative',
          'Visual identity system (logo, type, color)',
        ],
      },
      {
        pillar: 'system',
        days: 'Weeks 2-3',
        deliverables: [
          'UX research with recruiters + employers',
          'User personas + journey mapping',
          'Full product UI design (web + dashboard)',
          'Usability-tested prototype ready for build',
        ],
      },
    ],
  },
  {
    id: 'shareefico',
    title: 'Shareefico',
    subtitle: 'Personal Brand & Custom CMS',
    industry: 'Personal Brand',
    category: 'Branding',
    coverImage: '/images/portfolio/shareefico/cover-poster.jpg',
    coverVideo: '/videos/shareefico-cover.mp4',
    liveUrl: 'https://shareefi.co',
    mockups: [
      '/images/portfolio/shareefico/website.png',
      '/images/portfolio/shareefico/tokens.png',
      '/images/portfolio/shareefico/SHRFCO-CMS-MKP.png',
    ],
    challenge:
      'One founder, two podcasts, zero infrastructure. Every episode rebuilt from scratch in a notebook. Every clip lost in a folder. Shareefico needed a brand and a system before it became a content operation it could no longer scale.',
    approach:
      "We ran all three pillars in 30 days. Week 1 — brand identity for Shareefico + Barakah Blueprint as two coexisting marks. Weeks 2-3 — custom CMS covering idea → script → episode → clip → publish. Week 4 — automation layer that distributes across platforms without manual touchpoints.",
    result:
      "Shareefico runs as a productized content engine, not a founder's pile of notebooks. Two brands ship 4+ pieces per week from one CMS. The hand-off docs mean the next hire can run it without rebuilding the playbook.",
    services: [
      'Brand Identity & Strategy',
      'Creative Direction',
      'Content Creation Ecosystem',
      'Automation & CRM Workflow',
    ],
    testimonialQuote:
      'Itqan built the entire Shareefico brand experience with precision and intention. They created a clear identity, visual direction and digital presence that all work together seamlessly. Every detail feels thoughtfully crafted, and the final result elevated the brand far beyond what we imagined at the start. A thorough and highly professional execution.',
    testimonialName: 'Ibrahim Shareef',
    testimonialCompany: 'Shareefico',
    testimonialImage: '/images/testimonials/ibrahim-shareef.png',
    behanceUrl: 'https://www.behance.net/gallery/238575625/Shareefico-Personal-Brand',
    duration: 'under 30 days',
    industryAverage: '12-24 weeks',
    outcomeMetric: 'Brand + custom CMS + podcasting workflow shipped end-to-end',
    scope: 'Personal brand + custom CMS + content engine',
    beforeQuote:
      "I was running everything from one notebook. No system, no consistency. Every episode took twice as long as it should have.",
    phases: [
      {
        pillar: 'identity',
        days: 'Week 1',
        deliverables: [
          'Personal brand strategy + voice guidelines',
          'Visual identity system + creative direction',
          'Two-brand architecture (Shareefico + Barakah Blueprint)',
        ],
      },
      {
        pillar: 'system',
        days: 'Weeks 2-3',
        deliverables: [
          'Custom CMS for idea → script → episode → clip workflow',
          'Episode management + clip tracking modules',
          'Content distribution pipeline across both brands',
        ],
      },
      {
        pillar: 'automation',
        days: 'Week 4',
        deliverables: [
          'Automated content scheduling + cross-platform repurposing',
          'CRM workflow integration',
          'Hand-off documentation so future hires can run it',
        ],
      },
    ],
  },
  {
    id: 'oud-closet',
    title: 'Oud Closet',
    subtitle: 'E-commerce Brand',
    industry: 'Modest Fashion & Luxury',
    category: 'Branding',
    coverImage: '/images/portfolio/oud-closet/cover.png',
    mockups: [
      '/images/portfolio/oud-closet/mockup-1.png',
      '/images/portfolio/oud-closet/mockup-2.png',
      '/images/portfolio/oud-closet/mockup-3.png',
    ],
    challenge:
      "A heritage product sitting behind a logo the founders were embarrassed to show. In a luxury fragrance market drowning in look-alike branding, Oud Closet needed to look as old as the oud and as sharp as the price point. Two weeks. No prior brand to evolve.",
    approach:
      "We treated the identity as a positioning problem, not a logo problem. Brand strategy first — what 'oud' means to this audience, and what it absolutely cannot look like. Then the visual system: type, color, motif, photography guidelines. Brand guidelines doc so the team can hold the line after we leave.",
    result:
      "Oud Closet now reads as a luxury brand at every touchpoint — packaging, web, social, retail. The identity carries the heritage without looking dated. The team has the guidelines to scale every new SKU and campaign without diluting what we built.",
    services: ['Brand Identity & Strategy', 'Creative Direction'],
    testimonialQuote:
      'Itqan understood the essence of our brand from the very beginning. They treated our product with respect for its heritage while giving it a modern, premium presence. The outcome felt intentional, refined, and truly representative of who we are.',
    testimonialName: 'Oud Closet',
    testimonialCompany: 'Oud Closet',
    duration: '2 weeks',
    industryAverage: '8-12 weeks',
    outcomeMetric: 'Full identity + visual system shipped from zero',
    scope: 'Brand identity + visual system',
    beforeQuote:
      "We had a beautiful product and a logo we were embarrassed by. The brand wasn't matching the heritage we were trying to sell.",
    phases: [
      {
        pillar: 'identity',
        days: 'Weeks 1-2',
        deliverables: [
          'Brand strategy + heritage positioning',
          'Visual identity system (logo, type, color, motif)',
          'Creative direction + photography guidelines',
          'Brand guidelines document',
        ],
      },
    ],
  },
  {
    id: 'medacs',
    title: 'Medacs',
    subtitle: 'Healthcare Platform',
    industry: 'HealthTech',
    category: 'UI/UX',
    coverImage: '/images/portfolio/medacs/cover.png',
    mockups: [
      '/images/portfolio/medacs/mockup-1.png',
      '/images/portfolio/medacs/mockup-2.png',
      '/images/portfolio/medacs/mockup-3.png',
    ],
    challenge:
      'Three user types — patients, providers, administrators. Four different workflows. One UI that none of them could navigate. Engineering was ready to build, but nobody was sure what to build. Two weeks to find out.',
    approach:
      'Research first — sat with each stakeholder type and watched them actually try to book, schedule, and coordinate care. Mapped the journeys until the friction points were obvious. Designed flows that respected each role without forking the codebase. Tested the prototype with real users before hand-off.',
    result:
      'Engineering unblocked. The product team walked into the build with validated flows for all three stakeholder types and a usability-tested prototype to reference. The 4-month UX phase that was originally scoped became a 2-week sprint.',
    services: [
      'UI/UX',
      'User Interface Design',
      'UX Research',
      'Usability Testing',
      'Prototyping',
    ],
    testimonialQuote:
      'Working with Itqan brought a level of clarity we needed for a complex healthcare product. Their UX research and design process helped us simplify difficult systems into intuitive user journeys. The collaboration was smooth, thoughtful, and highly professional, and the results made a real difference in how our platform functions.',
    testimonialName: 'Adel Habib',
    testimonialCompany: 'Medacs',
    testimonialImage: '/images/testimonials/adel-habib.jpeg',
    duration: '2 weeks',
    industryAverage: '10-16 weeks',
    outcomeMetric: 'Multi-stakeholder flows validated + dev-ready in 14 days',
    scope: 'Healthcare platform UX + UI',
    beforeQuote:
      "Three stakeholder types, four different workflows, and a UI nobody could navigate. We needed clarity before we could build.",
    phases: [
      {
        pillar: 'system',
        days: 'Weeks 1-2',
        deliverables: [
          'UX research with patients, providers, administrators',
          'Validated user journeys across all three stakeholder types',
          'Full UI design + usability-tested prototype',
          'Hand-off package for engineering',
        ],
      },
    ],
  },
  {
    id: 'itqan-crm',
    title: 'Itqan Studio CRM',
    subtitle: 'Internal operations platform',
    industry: 'Internal — we eat our own cooking',
    category: 'Application Development',
    coverImage: '/images/portfolio/ITQAN-CRM-MKP-MCBK2.png',
    mockups: [
      '/images/portfolio/ITQAN-CRM-MB-MKP.png',
      '/images/portfolio/ITQAN-CRM-MKP-MCBK2.png',
      '/images/portfolio/ITQAN-CRM-MB-MKP2.png',
    ],
    challenge:
      "We were running Itqan across five disconnected tools. Every Friday I rebuilt the project P&L by hand. Invoices lived in one place, expenses in another, project health in a third. A full day of every week disappeared into reconciliation.",
    approach:
      "We stopped duct-taping and built the system we wanted. One platform — projects, pipeline, tasks, invoices, expenses, financial reporting. UAE-compliant e-invoicing built in from day one, not bolted on. Every screen designed for how the studio actually runs.",
    result:
      "Friday reconciliation collapsed from 8 hours to 15 minutes. Every metric — pipeline value, project margin, cash position — live, on phone or laptop. The studio runs on one system instead of five, and the tool now ships as a product to other studios.",
    services: [
      'Application Development',
      'System Architecture',
      'UI/UX',
      'Internal Tools',
    ],
    testimonialQuote:
      "We didn't adapt our workflow to fit a tool. We built the tool to fit how we actually work. The difference is felt every single day.",
    testimonialName: 'Ibrahim Shareef',
    testimonialCompany: 'Founder, Itqan Studio',
    duration: '6 weeks',
    industryAverage: '4-6 months',
    outcomeMetric: 'Replaced 5 tools. Friday P&L: 8h → 15 min.',
    scope: 'Studio CRM, invoicing, financial reporting, e-invoicing',
    beforeQuote:
      "I was running the studio across five tools. Every Friday I rebuilt the project P&L by hand. I was losing a full day a week to reconciliation.",
    phases: [
      {
        pillar: 'system',
        days: 'Weeks 1-4',
        deliverables: [
          'Full data model — projects, pipeline, tasks, invoices, expenses',
          'Mobile + desktop UI built end-to-end',
          'Project P&L + studio cash position dashboards',
          'Migration from 5 legacy tools',
        ],
      },
      {
        pillar: 'automation',
        days: 'Weeks 5-6',
        deliverables: [
          'UAE-compliant e-invoicing built in (not bolted on)',
          'Automatic credit notes + expense categorization',
          'Real-time KPI digests piped to founder phone',
        ],
      },
    ],
  },
  {
    id: 'project-you',
    title: 'Project You',
    subtitle: 'Personal life OS for young Muslims',
    industry: 'Product — our own SaaS',
    category: 'Application Development',
    coverImage: '/images/portfolio/project-you-mkp-mkbk.png',
    mockups: [
      '/images/portfolio/project-you-mkp-mb.png',
      '/images/app-hand-v2-render.png',
    ],
    challenge:
      "Every productivity app treated faith as an afterthought. Qur'an memorisation in one app. Prayer tracking in another. Goals and habits in a third. Nothing connected the deen with the to-do list. For a generation of Muslims building serious lives, nothing fit.",
    approach:
      "We ran the full Founder OS on ourselves. Identity — positioning for the young Muslim segment, brand voice that respects both ambition and faith. System — full product UX across goals, habits, Qur'an, health, finance. Automation — onboarding, daily reminders, habit nudges.",
    result:
      "Project You is live at projectyou.app with users across multiple countries. The first life OS that treats the deen as a first-class citizen, not a side widget. Proof that the 90-day Founder OS works on our own products before we sell it.",
    services: [
      'Application Development',
      'Product Design',
      'UI/UX',
    ],
    testimonialQuote:
      'There was a gap in the market that nobody was filling. Young Muslims needed a platform that took both their productivity and their deen seriously. Project You is that platform — and we built it end to end on the same system we sell.',
    testimonialName: 'Ibrahim Shareef',
    testimonialCompany: 'Founder, Itqan Studio',
    duration: '12 weeks (full Founder OS)',
    industryAverage: '6-12 months',
    outcomeMetric: 'Live SaaS — users across multiple countries',
    scope: 'Consumer SaaS — identity + product + automation',
    beforeQuote:
      "Every productivity app I tried treated Qur'an and prayer as afterthoughts. Nothing connected the deen with the to-do list. So we built it.",
    phases: [
      {
        pillar: 'identity',
        days: 'Weeks 1-4',
        deliverables: [
          'Audience positioning — young Muslims building serious lives',
          'Brand strategy + voice that respects ambition AND faith',
          'Visual identity + product naming',
        ],
      },
      {
        pillar: 'system',
        days: 'Weeks 5-9',
        deliverables: [
          "Full product UX — goals, habits, Qur'an, health, finance modules",
          'Next.js + Supabase stack shipped to production at projectyou.app',
          'Onboarding flow tested with real users',
        ],
      },
      {
        pillar: 'automation',
        days: 'Weeks 10-12',
        deliverables: [
          'Daily habit nudges + prayer accountability automation',
          'Automated user onboarding sequence',
          'Cross-platform sync + push notifications',
        ],
      },
    ],
  },
];

export function getCaseStudy(id: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.id === id);
}

export function getAdjacentProjects(id: string): {
  prev: CaseStudy | null;
  next: CaseStudy | null;
} {
  const index = caseStudies.findIndex((cs) => cs.id === id);
  return {
    prev: index > 0 ? caseStudies[index - 1] : null,
    next: index < caseStudies.length - 1 ? caseStudies[index + 1] : null,
  };
}
