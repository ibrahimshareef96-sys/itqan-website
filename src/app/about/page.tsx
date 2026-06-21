import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { MissionStatement } from '@/components/about/MissionStatement';
import { Values } from '@/components/about/Values';
import { TeamSection } from '@/components/about/TeamSection';
import { Languages } from '@/components/about/Languages';
import { CTABanner } from '@/components/home/CTABanner';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'About — A Dubai Design, AI & Automation Studio',
  description:
    'Meet the team behind Itqan Studio — a Dubai-based design, automation and AI studio driven by itqan (excellence), precision, and purpose-led strategy for ambitious founders.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <AboutHero />
      <MissionStatement />
      <Values />
      <TeamSection />
      <Languages />
      <CTABanner />
    </>
  );
}
