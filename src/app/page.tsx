import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { ThreePillars } from '@/components/home/ThreePillars';
import { WhyRebrandsFail } from '@/components/home/WhyRebrandsFail';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { Guarantee } from '@/components/home/Guarantee';
import { FounderOS } from '@/components/home/FounderOS';
import { Industries } from '@/components/home/Industries';
import { WhoFor } from '@/components/home/WhoFor';
import { Portrait } from '@/components/home/Portrait';
import { PartnerHalo } from '@/components/home/PartnerHalo';
import { CTABanner } from '@/components/home/CTABanner';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      {/* Stakes + certainty + pedigree */}
      <Hero />
      {/* The spine — the three criteria senior buyers decide on */}
      <ThreePillars />
      {/* The most important section for a CEO — why rebrands fail, and how we remove each */}
      <WhyRebrandsFail />
      {/* Evidence — real outcomes, stakes-first captions */}
      <FeaturedWork />
      {/* Certainty + honesty — phase-gated, we guarantee what we build */}
      <Guarantee />
      {/* The method (demoted tactical detail — reachable, deeper on /services) */}
      <FounderOS />
      {/* World-class thinking, regional fluency */}
      <Industries />
      {/* Who this is for — founders, CEOs, owners, boards, investors */}
      <WhoFor />
      {/* The team in the room — senior hands, no juniors, no hand-offs */}
      <Portrait />
      {/* Gated named-partner halo slot — renders nothing until NEXT_PUBLIC_PARTNER_HALO=1 */}
      <PartnerHalo />
      {/* A private, senior conversation */}
      <CTABanner />
    </>
  );
}
