import { Hero } from '@/components/home/Hero';
import { BrandStatement } from '@/components/home/BrandStatement';
import { Services } from '@/components/home/Services';
import { ProcessSteps } from '@/components/home/ProcessSteps';
import { Benefits } from '@/components/home/Benefits';
import { PortfolioPreview } from '@/components/home/PortfolioPreview';
import { CTABanner } from '@/components/home/CTABanner';
import { FAQ } from '@/components/home/FAQ';

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStatement />
      <Services />
      <ProcessSteps />
      <Benefits />
      <PortfolioPreview />
      <CTABanner />
      <FAQ />
    </>
  );
}
