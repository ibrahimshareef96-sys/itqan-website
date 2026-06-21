import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from '@phosphor-icons/react/dist/ssr';
import { FadeUp } from '@/components/ui/FadeUp';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { FounderOS } from '@/components/home/FounderOS';
import { Guarantee } from '@/components/home/Guarantee';
import { CTABanner } from '@/components/home/CTABanner';
import { ServiceFAQ, SERVICE_FAQ } from '@/components/services/ServiceFAQ';
import { JsonLd } from '@/components/seo/JsonLd';
import { servicesGraphLd, breadcrumbLd, faqLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'AI Automation, Brand & Web Design — Dubai',
  description:
    'Brand identity, UI/UX and web design, custom development, and agentic AI automation — Itqan Studio’s 90-Day Founder Operating System. Dubai-based, serving the UAE and beyond.',
  alternates: { canonical: '/services' },
};

interface PillarDetail {
  number: string;
  name: string;
  days: string;
  metaphor: string;
  lede: string;
  image: string;
  outputs: string[];
}

const pillars: PillarDetail[] = [
  {
    number: '01',
    name: 'Identity',
    days: 'Days 1–30',
    metaphor: 'the soul',
    lede: 'Most founders confuse a logo for an identity. We build the soul of the company — the positioning, the visual system, the voice — so every later asset compounds instead of contradicts.',
    image: '/images/founder-render.png',
    outputs: [
      'Brand strategy & positioning brief',
      'Full visual identity system (logo, type, color, imagery)',
      'Content positioning + voice guidelines',
      '30-day content calendar to ship from Day 31',
    ],
  },
  {
    number: '02',
    name: 'System',
    days: 'Days 31–60',
    metaphor: 'the skeleton',
    lede: "An identity that doesn't ship is decoration. We assemble the skeleton — the tooling stack, the workflows, the cadence — so the founder stops being the bottleneck.",
    image: '/images/itqan-crm.png',
    outputs: [
      'Tooling stack chosen, configured, and connected',
      'Three documented workflows (content, sales, ops)',
      'Content engine producing 4+ pieces/week',
      'Hand-off docs so a future hire can run it',
    ],
  },
  {
    number: '03',
    name: 'Automation',
    days: 'Days 61–90',
    metaphor: 'the heartbeat',
    lede: 'Workflows still need someone clicking buttons. The heartbeat is the agentic layer that runs your operating system without you in the loop — Telegram-runnable, audit-trailed, founder-controlled.',
    image: '/images/close-app-render.png',
    outputs: [
      'Agentic Telegram-runnable operating layer',
      'Lead capture + qualification automation',
      'Content distribution + cross-platform repurposing',
      'Daily KPI digest so you always know the number',
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesGraphLd()} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
      />
      <JsonLd data={faqLd(SERVICE_FAQ)} />

      {/* ── Header — the offer ── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20" aria-label="Services header">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 15% 30%, rgba(204,164,194,0.08), transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 md:px-8">
          <FadeUp>
            <p
              className="font-sans font-medium text-[0.75rem] uppercase text-brand-accent"
              style={{ letterSpacing: '0.22em' }}
            >
              What we do
            </p>
          </FadeUp>

          <FadeUp delay={0.06}>
            <h1
              className="mt-6 font-sans font-semibold text-brand-cream leading-[1.02] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(3rem, 6.5vw, 5.75rem)', maxWidth: '20ch' }}
            >
              The 90-Day Founder{' '}
              <span className="accent-italic">Operating System.</span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.12}>
            <p
              className="mt-8 text-brand-cream/75 leading-[1.6] max-w-[62ch]"
              style={{ fontSize: 'clamp(1.0625rem, 1.35vw, 1.25rem)' }}
            >
              Three pillars. Ninety days. One founder. We build the brand, the system,
              and the agentic automation engine that lets ambitious companies look as
              big as they think.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── 3-pillar overview (shared with homepage) ── */}
      <FounderOS />

      {/* ── Pillar deep-dives ── */}
      <section className="py-16 md:py-24" aria-label="Pillar details">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8">
          {pillars.map((pillar, i) => (
            <ScrollReveal key={pillar.number} direction="up" distance={28} delay={0}>
              <article
                className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center py-16 md:py-20 ${
                  i > 0 ? 'border-t border-brand-cream/[0.08]' : ''
                }`}
              >
                {/* Image — alternates sides */}
                <div className={`relative aspect-[4/3] rounded-[14px] overflow-hidden ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <Image
                    src={pillar.image}
                    alt={pillar.name}
                    fill
                    className="object-cover"
                    priority={i === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Text */}
                <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                  <div className="flex items-baseline gap-4">
                    <span
                      className="font-sans font-medium text-brand-accent/45 tabular-nums leading-none"
                      style={{ fontSize: 'clamp(2rem, 3vw, 2.75rem)' }}
                    >
                      {pillar.number}
                    </span>
                    <span className="text-[0.6875rem] font-bold tracking-[0.22em] uppercase text-brand-cream/45">
                      {pillar.days}
                    </span>
                  </div>

                  <h2
                    className="mt-5 font-sans font-semibold text-brand-cream leading-[1.05] tracking-[-0.015em]"
                    style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.5rem)' }}
                  >
                    {pillar.name}
                  </h2>

                  <p
                    className="mt-2 text-brand-accent/85"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: 'italic',
                      fontSize: 'clamp(1.0625rem, 1.25vw, 1.25rem)',
                    }}
                  >
                    {pillar.metaphor}
                  </p>

                  <p
                    className="mt-6 text-brand-cream/75 leading-[1.6]"
                    style={{ fontSize: 'clamp(1rem, 1.2vw, 1.0625rem)', maxWidth: '50ch' }}
                  >
                    {pillar.lede}
                  </p>

                  {/* Outputs list */}
                  <p className="mt-8 text-[0.6875rem] font-bold tracking-[0.18em] uppercase text-brand-cream/45">
                    What ships
                  </p>
                  <ul role="list" className="mt-3 space-y-2.5">
                    {pillar.outputs.map((output) => (
                      <li
                        key={output}
                        className="flex items-start gap-2.5 text-brand-cream/85 text-[0.9375rem] leading-[1.55]"
                      >
                        <CheckCircle
                          size={16}
                          weight="fill"
                          className="text-brand-accent/80 mt-[0.2em] flex-shrink-0"
                        />
                        <span>{output}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </ScrollReveal>
          ))}

          {/* Closing CTA inside deep-dive section */}
          <FadeUp>
            <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/contact"
                className="btn-gloss inline-flex items-center justify-center h-[56px] px-8 rounded-[10px] bg-brand-cream text-brand-dark font-semibold text-base hover:bg-brand-cream/90 transition-colors duration-200"
              >
                Book a discovery call
              </Link>
              <Link
                href="/contact?intent=audit"
                className="inline-flex items-center justify-center gap-2 h-[56px] px-7 rounded-[10px] border border-brand-cream/30 bg-brand-cream/[0.04] text-brand-cream font-semibold text-[0.9375rem] hover:border-brand-cream/55 hover:bg-brand-cream/[0.08] transition-colors duration-200"
              >
                <span className="text-brand-accent">$497</span>
                <span>Brand Audit</span>
                <ArrowRight size={14} weight="bold" className="opacity-70" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FAQ — founder questions (GEO/AEO + on-page depth) ── */}
      <ServiceFAQ />

      {/* ── Guarantee (shared) ── */}
      <Guarantee />

      {/* ── Closing CTA (shared) ── */}
      <CTABanner />
    </>
  );
}
