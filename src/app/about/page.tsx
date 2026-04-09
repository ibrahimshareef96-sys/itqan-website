import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { MissionStatement } from '@/components/about/MissionStatement';
import { Values } from '@/components/about/Values';
import { TeamSection } from '@/components/about/TeamSection';
import { Languages } from '@/components/about/Languages';
import { CTABanner } from '@/components/home/CTABanner';

export const metadata: Metadata = {
  title: 'About Us — Our Team, Mission & Values',
  description:
    'Meet the team behind Itqan Studio. We are a Dubai-based brand design and digital agency driven by excellence, precision, and purpose-led strategy for ambitious businesses.',
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
