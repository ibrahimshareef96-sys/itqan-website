import type { Metadata } from 'next';
import { HeroAxion } from '@/components/home/HeroAxion';
import { IntroPartner } from '@/components/home/IntroPartner';
import { CasesAxion } from '@/components/home/CasesAxion';
import { ThreePillars } from '@/components/home/ThreePillars';
import { WhyRebrandsFail } from '@/components/home/WhyRebrandsFail';
import { Guarantee } from '@/components/home/Guarantee';
import { Industries } from '@/components/home/Industries';
import { WhoFor } from '@/components/home/WhoFor';
import { Portrait } from '@/components/home/Portrait';
import { PartnerHalo } from '@/components/home/PartnerHalo';
import { CTABanner } from '@/components/home/CTABanner';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

/**
 * Axion-style structure (light-first, dark-aware) up top; the kept decision-maker
 * beats (dark sections) follow — dark/light alternation is the brand rhythm.
 * FounderOS is parked off the homepage (Ibrahim: revisit at the very end; still on /services).
 */
export default function HomePage() {
  return (
    <>
      {/* 0 — Stakes + AI-visibility demo (light, shader) */}
      <HeroAxion />
      {/* 1 — One partner: every piece that turns traffic into buyers (light) */}
      <IntroPartner />
      {/* 2 — Selected work, expanding-chip cases (light) */}
      <CasesAxion />
      {/* The spine — the three criteria senior buyers decide on (dark) */}
      <ThreePillars />
      {/* Why rebrands fail — the CEO de-risking section (dark) */}
      <WhyRebrandsFail />
      {/* Certainty + honesty — phase-gated, we guarantee what we build (dark) */}
      <Guarantee />
      {/* World-class thinking, regional fluency (dark) */}
      <Industries />
      {/* Who this is for (dark) */}
      <WhoFor />
      {/* The team in the room (dark) */}
      <Portrait />
      {/* Gated named-partner halo slot — renders nothing until NEXT_PUBLIC_PARTNER_HALO=1 */}
      <PartnerHalo />
      {/* A private, senior conversation (dark) */}
      <CTABanner />
    </>
  );
}
