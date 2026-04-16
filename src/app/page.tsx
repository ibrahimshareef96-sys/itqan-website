import { Hero } from '@/components/home/Hero';
import { SocialProof } from '@/components/home/SocialProof';
import { Services } from '@/components/home/Services';
import { PortfolioPreview } from '@/components/home/PortfolioPreview';
import { CTABanner } from '@/components/home/CTABanner';

export default function HomePage() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Services />
      <PortfolioPreview />
      <CTABanner />
    </>
  );
}
