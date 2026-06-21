/**
 * Centralized SEO + structured-data configuration.
 *
 * One source of truth for the canonical URL, business NAP (name / address /
 * phone-or-contact), social profiles, and the service taxonomy — consumed by
 * page metadata, the sitemap, robots, the web manifest, and every JSON-LD
 * entity node. Keeping these here guarantees NAP consistency (a real local-SEO
 * ranking factor) and a single connected entity graph for Google + LLMs.
 *
 * Schema note: schema.org deprecated `ProfessionalService` (confused with
 * `Service`). We model the studio as `Organization` + discrete `Service`
 * nodes, linked by stable `@id`, rather than the deprecated type.
 */
import type { CaseStudy } from '@/data/case-studies';

export const SITE_URL = 'https://itqanstudio.com';
export const SITE_NAME = 'Itqan Studio';
export const LEGAL_NAME = 'Itqan Studio FZ LLC';
export const SITE_TAGLINE = 'Your brand has potential. We give it direction.';

/** The 5 head terms we target, plus brand. Reused in metadata keywords + llms.txt. */
export const TARGET_KEYWORDS: readonly string[] = [
  'design agency Dubai',
  'AI agency Dubai',
  'automation agency Dubai',
  'AI automation agency Dubai',
  'branding agency Dubai',
  'web design agency Dubai',
  'UI UX design Dubai',
  'brand identity Dubai',
  'agentic automation',
  'founder studio',
  'Itqan Studio',
];

export const BUSINESS = {
  legalName: LEGAL_NAME,
  name: SITE_NAME,
  email: 'info@itqanstudio.com',
  city: 'Dubai',
  region: 'Dubai',
  country: 'AE',
  countryName: 'United Arab Emirates',
  logo: `${SITE_URL}/images/brand/dark-logo.svg`,
  /** Real, live social profiles (must match the footer exactly for NAP consistency). */
  sameAs: [
    'https://www.instagram.com/madebyitqan/',
    'https://www.linkedin.com/company/110338926/',
  ],
  founder: {
    name: 'Ibrahim Shareef',
    // "Co-founder" matches the on-page copy (Portrait + AboutHero) exactly — entity
    // consistency for E-E-A-T. The site was deliberately reframed off "solo founder".
    jobTitle: 'Co-founder',
  },
  /** Dubai-based, serves UAE → GCC → globally. Expressed as areaServed. */
  areaServed: ['Dubai', 'United Arab Emirates', 'GCC', 'Worldwide'],
} as const;

/** Topics the org demonstrably knows about — feeds Organization.knowsAbout (entity understanding for Google + LLMs). */
export const KNOWS_ABOUT: readonly string[] = [
  'Brand strategy',
  'Brand identity design',
  'UI/UX design',
  'Web design',
  'Web application development',
  'AI automation',
  'Agentic AI systems',
  'Creative direction',
];

export interface ServiceDef {
  name: string;
  serviceType: string;
  description: string;
}

/** Keyword-bearing service taxonomy. Powers Service JSON-LD + the FAQ + (future) per-service pages. */
export const SERVICES: readonly ServiceDef[] = [
  {
    name: 'Brand Identity & Strategy',
    serviceType: 'Brand design',
    description:
      'Brand strategy, naming, positioning and a full visual identity system — the foundation every later asset compounds from.',
  },
  {
    name: 'UI/UX & Web Design',
    serviceType: 'UI/UX design',
    description:
      'Research-led UI/UX and web design for marketing sites, products and platforms, built to convert and scale.',
  },
  {
    name: 'Web & App Development',
    serviceType: 'Web development',
    description:
      'Custom, full-stack web and application development — design and engineering shipped as one system, not bolted together.',
  },
  {
    name: 'AI & Agentic Automation',
    serviceType: 'AI automation',
    description:
      'Agentic automation engines that run your operations — lead capture, content and reporting — controllable from Telegram.',
  },
];

/** Resolve a path to an absolute URL on the canonical host. */
export function absoluteUrl(path = '/'): string {
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

// ────────────────────────────────────────────────────────────
// JSON-LD entity graph
// ────────────────────────────────────────────────────────────

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const FOUNDER_ID = `${SITE_URL}/#founder`;

type JsonLd = Record<string, unknown>;

/** The Organization node — the studio's stable identity, referenced by @id everywhere else. */
export function organizationNode(): JsonLd {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: BUSINESS.logo,
    },
    image: `${SITE_URL}/opengraph-image`,
    description:
      'Itqan Studio is a Dubai-based design, automation and AI agency. We build brand identity, UI/UX and web design, custom development and agentic automation systems for ambitious founders — from invisible to inevitable in 90 days.',
    slogan: SITE_TAGLINE,
    email: BUSINESS.email,
    foundingLocation: {
      '@type': 'Place',
      name: 'Dubai, United Arab Emirates',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      addressCountry: BUSINESS.country,
    },
    areaServed: BUSINESS.areaServed,
    knowsAbout: KNOWS_ABOUT,
    sameAs: BUSINESS.sameAs,
    founder: { '@id': FOUNDER_ID },
    contactPoint: {
      '@type': 'ContactPoint',
      email: BUSINESS.email,
      contactType: 'sales',
      areaServed: BUSINESS.areaServed,
      availableLanguage: ['English', 'Arabic'],
    },
    makesOffer: SERVICES.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.name,
        serviceType: s.serviceType,
      },
    })),
  };
}

/** The WebSite node. No SearchAction — the site has no on-site search endpoint. */
export function websiteNode(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description:
      'Dubai design, automation and AI agency — brand, system and agentic automation for founders.',
    inLanguage: 'en',
    publisher: { '@id': ORG_ID },
  };
}

/** The founder Person node — E-E-A-T signal, referenced by Organization.founder. */
export function founderNode(): JsonLd {
  return {
    '@type': 'Person',
    '@id': FOUNDER_ID,
    name: BUSINESS.founder.name,
    jobTitle: BUSINESS.founder.jobTitle,
    worksFor: { '@id': ORG_ID },
    url: `${SITE_URL}/about`,
  };
}

/** Site-wide graph injected on every page (root layout): Organization + WebSite + founder Person. */
export function siteGraphLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationNode(), websiteNode(), founderNode()],
  };
}

/** Discrete Service nodes (services page), each provided by the Organization. */
export function servicesGraphLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@graph': SERVICES.map((s) => ({
      '@type': 'Service',
      name: s.name,
      serviceType: s.serviceType,
      description: s.description,
      provider: { '@id': ORG_ID },
      areaServed: BUSINESS.areaServed,
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/** BreadcrumbList — still earns rich results; clarifies site structure for Google + LLMs. */
export function breadcrumbLd(items: readonly BreadcrumbItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * FAQPage — Google deprecated FAQ rich results (May 2026) but still PARSES this
 * schema to understand the page, and it remains a strong GEO/LLM-citation signal.
 * We ship it for understanding + AI answers, not for a SERP snippet.
 */
export function faqLd(items: readonly FaqItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export interface WorkItem {
  id: string;
  title: string;
}

/** The /work index as a CollectionPage with an ItemList of case studies. */
export function workCollectionLd(items: readonly WorkItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Our Work — Itqan Studio',
    description:
      'Selected brand, UI/UX, development and AI-automation case studies by Itqan Studio.',
    url: absoluteUrl('/work'),
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: absoluteUrl(`/work/${item.id}`),
        name: item.title,
      })),
    },
  };
}

/** A case study as a CreativeWork, authored + published by the Organization. */
export function caseStudyLd(cs: CaseStudy): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${cs.title} — ${cs.scope ?? cs.subtitle}`,
    headline: cs.title,
    description: cs.outcomeMetric ?? cs.result.slice(0, 200),
    url: absoluteUrl(`/work/${cs.id}`),
    image: absoluteUrl(cs.coverImage),
    about: cs.industry,
    keywords: cs.services.join(', '),
    inLanguage: 'en',
    creator: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    isPartOf: { '@id': WEBSITE_ID },
  };
}
