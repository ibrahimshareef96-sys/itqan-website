import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { FounderOS } from '@/components/home/FounderOS';
import { WhoFor } from '@/components/home/WhoFor';
import { Guarantee } from '@/components/home/Guarantee';
import { Industries } from '@/components/home/Industries';
import { Portrait } from '@/components/home/Portrait';
import { CTABanner } from '@/components/home/CTABanner';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <FounderOS />
      <WhoFor />
      <Guarantee />
      <Industries />
      <Portrait />
      <CTABanner />
    </>
  );
}
