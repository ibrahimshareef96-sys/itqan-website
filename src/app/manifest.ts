import type { MetadataRoute } from 'next';
import { SITE_NAME } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Itqan Studio — Design, Automation & AI Agency in Dubai',
    short_name: SITE_NAME,
    description:
      'Dubai design, automation and AI agency. Brand, system and agentic automation for ambitious founders.',
    start_url: '/',
    display: 'standalone',
    background_color: '#130a14',
    theme_color: '#1f1420',
    icons: [
      {
        src: '/images/brand/dark-icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  };
}
