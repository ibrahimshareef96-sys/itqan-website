import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { FadeUp } from '@/components/ui/FadeUp';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Services — Brand Design, UI/UX, AI, Web Development & Growth',
  description:
    'Itqan Studio offers branding, UI/UX design, AI implementation, application development, and content strategy. Built for ambitious companies across the GCC and beyond.',
};

const services = [
  {
    name: 'Branding',
    outcome: 'Positioning, naming, and identity systems built to survive a decade, not a campaign.',
    image: '/images/founder-render.png',
  },
  {
    name: 'UI/UX',
    outcome: 'Interfaces grounded in research, shaped by craft, tested on the people who\u2019ll actually use them.',
    image: '/images/app-hand-v2-render.png',
  },
  {
    name: 'AI Implementation',
    outcome: 'AI-native systems, assistants, and agents built into your product and your operations \u2014 not bolted on.',
    image: '/images/close-app-render.png',
  },
  {
    name: 'Application Development',
    outcome: 'Web and internal apps built to replace spreadsheets, scale with the team, and survive real use.',
    image: '/images/itqan-crm.png',
  },
  {
    name: 'Content & Growth',
    outcome: 'Copy, SEO, and social design that carry the brand\u2019s voice into every channel without diluting it.',
    image: '/images/content-creation.png',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16" aria-label="Services page header">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8">
          <FadeUp>
            <h1
              className="font-sans font-semibold text-brand-cream leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
            >
              Our Services
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* Services list — each as a two-column row */}
      <section className="pb-32" aria-label="Services offered">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8">
          {services.map((service, i) => (
            <ScrollReveal key={service.name} direction="up" distance={32} delay={i * 0.06}>
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-16 ${
                  i > 0 ? 'border-t border-[rgba(255,251,245,0.08)]' : ''
                }`}
              >
                {/* Image — alternates sides on desktop */}
                <div className={`relative aspect-[4/3] rounded-[12px] overflow-hidden ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    priority={i === 0}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Text */}
                <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                  <h2
                    className="font-sans font-semibold text-brand-cream leading-[1.1] tracking-[-0.015em]"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
                  >
                    {service.name}
                  </h2>
                  <p className="mt-4 text-[rgba(255,251,245,0.65)] text-base leading-[1.6] max-w-[40ch]">
                    {service.outcome}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-8 inline-flex items-center gap-2 font-sans font-medium text-[0.875rem] text-[rgba(255,251,245,0.6)] hover:text-brand-cream border border-[rgba(255,251,245,0.08)] hover:border-[rgba(255,251,245,0.15)] rounded-[10px] px-5 h-[40px] transition-all duration-200"
                  >
                    Book a discovery call
                    <ArrowRight size={14} weight="bold" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
