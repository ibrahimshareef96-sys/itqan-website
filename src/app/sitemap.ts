import type { MetadataRoute } from 'next';

const baseUrl = 'https://itqanstudio.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { path: '', priority: 1.0 },
    { path: '/about', priority: 0.8 },
    { path: '/services', priority: 0.9 },
    { path: '/work', priority: 0.8 },
    { path: '/contact', priority: 0.7 },
  ];

  const caseStudies = ['nexilink', 'shareefico', 'oud-closet', 'medacs'];

  return [
    ...staticPages.map(({ path, priority }) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority,
    })),
    ...caseStudies.map((slug) => ({
      url: `${baseUrl}/work/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
