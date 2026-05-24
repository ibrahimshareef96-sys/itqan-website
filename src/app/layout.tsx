import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageTransition } from '@/components/layout/PageTransition';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { CookieBanner } from '@/components/CookieBanner';
import './globals.css';

const siteUrl = 'https://itqanstudio.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Itqan Studio — From invisible to inevitable in 90 days',
    template: '%s | Itqan Studio',
  },
  description:
    "Itqan is the founder studio that takes ambitious companies from invisible to inevitable in 90 days — with a brand, a system, and an agentic automation engine you can run from Telegram. Guaranteed.",
  keywords: [
    'founder studio',
    '90-day Founder OS',
    'brand identity Dubai',
    'brand strategy GCC',
    'agentic automation',
    'founder operating system',
    'UI UX design Dubai',
    'brand design agency Dubai',
    'Itqan Studio',
  ],
  authors: [{ name: 'Itqan Studio', url: siteUrl }],
  creator: 'Itqan Studio FZ LLC',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Itqan Studio',
    title: 'Itqan Studio — From invisible to inevitable in 90 days',
    description:
      "The founder studio that takes ambitious companies from invisible to inevitable in 90 days — with a brand, a system, and an agentic automation engine. Guaranteed.",
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Itqan Studio — From invisible to inevitable in 90 days.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Itqan Studio — From invisible to inevitable in 90 days',
    description:
      "The founder studio that takes ambitious companies from invisible to inevitable in 90 days. Brand. System. Automation. Guaranteed.",
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
        <SmoothScrollProvider>
          <Navbar />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <CookieBanner />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
