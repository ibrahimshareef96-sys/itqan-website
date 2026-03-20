import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { MissionStatement } from '@/components/about/MissionStatement';
import { Values } from '@/components/about/Values';
import { TeamSection } from '@/components/about/TeamSection';
import { Languages } from '@/components/about/Languages';
import { CTABanner } from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Itqan Studio — our mission, values, team, and the excellence that drives everything we do.',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionStatement />
      <Values />
      <TeamSection />
      <Languages />
      <CTABanner />
    </>
  );
}
