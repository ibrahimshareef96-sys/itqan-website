import { Hero } from '@/components/home/Hero';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { Services } from '@/components/home/Services';
import { Industries } from '@/components/home/Industries';
import { StatsLine } from '@/components/home/StatsLine';
import { Portrait } from '@/components/home/Portrait';
import { CTABanner } from '@/components/home/CTABanner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <Services />
      <Industries />
      <StatsLine />
      <Portrait />
      <CTABanner />
    </>
  );
}
