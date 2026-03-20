import type { Project } from './projects';

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  industry: string;
  category: string;
  coverImage: string;
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
      'The client started from zero—with no prior product, branding, or UX experience—making early decision-making complex and time-intensive. With no existing direction, references, or mood boards, the entire strategic, creative, and experiential foundation had to be defined from scratch.',
    approach:
      'Nexilink partnered with Itqan to build an investor-ready recruitment platform from the ground up—combining brand strategy, creative direction, UX research, and UI/UX design to create a clear, credible product experience for recruiters and companies.',
    result:
      'We delivered a fully articulated brand, product strategy, and user experience rooted in deep research, user personas, and usability testing. The outcome was a compelling, market-ready platform and brand identity that helped Nexilink win first place at a major investor competition in 2024, unlocking their next stage of growth.',
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
  },
  {
    id: 'shareefico',
    title: 'Shareefico',
    subtitle: 'Personal Brand',
    industry: 'Personal Brand',
    category: 'Branding',
    coverImage: '/images/portfolio/shareefico/cover.png',
    mockups: [
      '/images/portfolio/shareefico/mockup-1.png',
      '/images/portfolio/shareefico/mockup-2.png',
      '/images/portfolio/shareefico/mockup-3.png',
    ],
    challenge:
      'The project began as a single podcast concept but rapidly evolved into a full personal brand. With no prior experience running a brand at this scale, the journey involved multiple pivots and strategic re-alignments. The key challenge was maintaining clarity, coherence, and long-term direction while deliberately avoiding scope creep during a highly exploratory phase.',
    approach:
      "To build a timeless, authentic personal brand that reflects Ibrahim Shareef's identity, values, and voice—while remaining professional, scalable, and suitable for a global audience and future production studio.",
    result:
      'Shareefico emerged as a clearly positioned, scalable personal brand with a strong strategic foundation, consistent creative direction, and room for long-term growth. The brand now functions as a platform for content, thought leadership, and future media production—while remaining deeply authentic to its founder.',
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
      "The challenge was striking the right balance between tradition and modernity. Oud carries deep cultural significance, and the brand needed to communicate authenticity without appearing dated, while also standing out in a saturated luxury fragrance market.",
    approach:
      "To build a refined and timeless luxury brand that authentically represents the heritage of 'oud' while appealing to a contemporary market seeking quality, meaning, and sophistication.",
    result:
      "We delivered a cohesive brand identity and creative direction that elevated Oud Closet's presence and clarified its positioning in the luxury space. The brand now communicates confidence, heritage, and premium craftsmanship, allowing it to connect more deeply with its audience and stand out with clarity and distinction.",
    services: ['Brand Identity & Strategy', 'Creative Direction'],
    testimonialQuote:
      'Itqan understood the essence of our brand from the very beginning. They treated our product with respect for its heritage while giving it a modern, premium presence. The outcome felt intentional, refined, and truly representative of who we are.',
    testimonialName: 'Oud Closet',
    testimonialCompany: 'Oud Closet',
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
      'Medacs operates in a highly complex environment that combines healthcare, policy, and technology across emerging markets. The challenge was designing intuitive user experiences for multiple stakeholders—patients, providers, and administrators—while ensuring the platform remained accessible, scalable, and aligned with real-world healthcare workflows.',
    approach:
      'To design a clear, efficient, and user-friendly healthcare platform that connects public and private healthcare providers, enabling seamless booking, scheduling, and care coordination in a growing digital health ecosystem.',
    result:
      'Through in-depth UX research, usability testing, and iterative prototyping, we delivered validated user flows and interface concepts that simplified complex healthcare processes. The outcome was a more intuitive, efficient platform experience, helping Medacs move forward with confidence in both product direction and stakeholder alignment.',
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
