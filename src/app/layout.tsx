import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import './globals.css';

const siteUrl = 'https://itqanstudio.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Itqan Studio — Brand Design & Digital Agency in Dubai',
    template: '%s | Itqan Studio',
  },
  description:
    'Itqan Studio is a premium brand design and digital agency in Dubai. We craft brand identities, UI/UX design, custom web applications, and automation systems for ambitious businesses.',
  keywords: [
    'brand design agency Dubai',
    'UI UX design studio',
    'brand identity design',
    'web development agency',
    'custom CRM development',
    'digital agency Dubai',
    'brand strategy',
    'Itqan Studio',
  ],
  authors: [{ name: 'Itqan Studio', url: siteUrl }],
  creator: 'Itqan Studio FZ LLC',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Itqan Studio',
    title: 'Itqan Studio — Brand Design & Digital Agency in Dubai',
    description:
      'We craft brand identities, UI/UX design, custom web applications, and automation systems for ambitious businesses.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Itqan Studio — Your brand has potential. We give it direction.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Itqan Studio — Brand Design & Digital Agency in Dubai',
    description:
      'We craft brand identities, UI/UX design, custom web applications, and automation systems for ambitious businesses.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/images/brand/dark-icon.svg',
        media: '(prefers-color-scheme: light)',
        type: 'image/svg+xml',
      },
      {
        url: '/images/brand/light-icon.svg',
        media: '(prefers-color-scheme: dark)',
        type: 'image/svg+xml',
      },
    ],
  },
};

const organizationJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Itqan Studio FZ LLC',
  url: siteUrl,
  logo: `${siteUrl}/images/brand/dark-logo.svg`,
  description:
    'Premium brand design and digital agency crafting brand identities, UI/UX design, custom web applications, and automation systems.',
  sameAs: [
    'https://www.instagram.com/itqanstudio',
    'https://www.linkedin.com/company/itqanstudio',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dubai',
    addressCountry: 'AE',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'info@itqanstudio.com',
    contactType: 'sales',
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: organizationJsonLd }}
        />
      </head>
      <body>
        <Navbar />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
