import type { Metadata, Viewport } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ViewTransitions } from 'next-view-transitions';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { PostHogProvider } from '@/components/providers/PostHogProvider';
import { CookieBanner } from '@/components/CookieBanner';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_URL, SITE_NAME, TARGET_KEYWORDS, siteGraphLd } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Itqan Studio — Design, AI Visibility & Web Agency in Dubai',
    template: '%s | Itqan Studio',
  },
  description:
    'Itqan Studio is a Dubai design and AI agency. One partner for brand, websites that convert, content, SEO, AI visibility (GEO), hosting and automation — built and run by the same senior team.',
  keywords: [...TARGET_KEYWORDS],
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: 'Itqan Studio FZ LLC',
  publisher: 'Itqan Studio FZ LLC',
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    alternateLocale: ['ar_AE'],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: 'Itqan Studio — Design, AI Visibility & Web Agency in Dubai',
    description:
      'One Dubai partner for brand, websites that convert, content, SEO, AI visibility (GEO), hosting and automation — one senior team, start to live.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Itqan Studio — Design, AI Visibility & Web Agency in Dubai',
    description:
      'One Dubai partner for brand, sites that convert, content, SEO, AI visibility (GEO) and hosting — built and run by one senior team.',
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Light-first: browser chrome matches the default cream homepage; dark for dark-scheme UAs.
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fffbf5' },
    { media: '(prefers-color-scheme: dark)', color: '#1f1420' },
  ],
  colorScheme: 'light dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: next-themes mutates <html> class before hydration.
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Speed up the critical Google Fonts request (LCP): warm the connection,
            then load the stylesheet from <head> (earlier than a CSS @import). */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,400;1,500&display=swap"
        />
        {/* Site-wide entity graph: Organization + WebSite + founder Person */}
        <JsonLd data={siteGraphLd()} />
      </head>
      <body>
        {/* ViewTransitions (next-view-transitions) drives the App-Router page
            transitions via the native View Transitions API — a root crossfade for
            every navigation + a shared-element morph from a work-card cover into
            the case-study hero. Replaces the old framer-motion PageTransition. */}
        <ViewTransitions>
          <ThemeProvider>
            <SmoothScrollProvider>
              <PostHogProvider>
                <Navbar />
                <main>{children}</main>
                <Footer />
                <CookieBanner />
              </PostHogProvider>
            </SmoothScrollProvider>
          </ThemeProvider>
        </ViewTransitions>
      </body>
    </html>
  );
}
