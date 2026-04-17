import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { FadeUp } from '@/components/ui/FadeUp';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { caseStudies, getCaseStudy, getAdjacentProjects } from '@/data/case-studies';

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ id: cs.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cs = getCaseStudy(params.id);
  if (!cs) return { title: 'Project Not Found' };
  return {
    title: cs.title,
    description: cs.result.slice(0, 155),
  };
}

export default function CaseStudyPage({ params }: Props) {
  const cs = getCaseStudy(params.id);
  if (!cs) notFound();

  const { prev, next } = getAdjacentProjects(params.id);

  return (
    <>
      {/* ── Header — centered, editorial ── */}
      <section className="pt-32 pb-12" aria-label="Case study header">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 text-center">
          {/* Category tags */}
          <FadeUp>
            <div className="flex justify-center gap-4 mb-6">
              {cs.services.slice(0, 3).map((s) => (
                <span
                  key={s}
                  className="font-sans font-normal text-[0.875rem] text-[rgba(255,251,245,0.6)]"
                >
                  {s}
                </span>
              ))}
            </div>
          </FadeUp>

          {/* Client name — large, centered */}
          <FadeUp delay={0.08}>
            <h1
              className="font-sans font-semibold text-brand-cream leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
            >
              {cs.title}
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* ── Hero image — full-width ── */}
      <section className="pb-20" aria-label="Case study hero image">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8">
          <FadeUp delay={0.16}>
            <div className="relative w-full aspect-[16/9] md:aspect-[2/1] rounded-[12px] overflow-hidden">
              <Image
                src={cs.coverImage}
                alt={`${cs.title} — ${cs.subtitle}`}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Challenge / Approach / Result ── */}
      <section className="py-20" aria-label="Case study details">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            {([
              { heading: 'The Challenge', body: cs.challenge },
              { heading: 'Our Approach', body: cs.approach },
              { heading: 'The Result', body: cs.result },
            ] as const).map(({ heading, body }, i) => (
              <ScrollReveal key={heading} direction="up" distance={24} delay={i * 0.1}>
                <div>
                  <p className="font-sans font-medium text-[0.75rem] uppercase text-[rgba(255,251,245,0.45)] mb-4" style={{ letterSpacing: '0.15em' }}>
                    {heading}
                  </p>
                  <p className="text-[rgba(255,251,245,0.75)] text-base leading-[1.65]">
                    {body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mockup gallery ── */}
      <section className="py-20" aria-label="Project gallery">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-3 gap-5">
            {cs.mockups.map((src, i) => (
              <FadeUp key={src} delay={0.08 + i * 0.08}>
                <div className="relative aspect-[4/3] rounded-[12px] overflow-hidden">
                  <Image
                    src={src}
                    alt={`${cs.title} mockup ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ── */}
      <section className="py-20" aria-label="Client testimonial">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <FadeUp>
            <blockquote>
              <p className="font-sans font-normal text-brand-cream leading-[1.55]" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}>
                &ldquo;{cs.testimonialQuote}&rdquo;
              </p>
              <footer className="mt-6 flex items-center gap-4">
                {cs.testimonialImage && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={cs.testimonialImage}
                      alt={cs.testimonialName}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                )}
                <div>
                  <p className="font-sans font-medium text-brand-cream text-sm">{cs.testimonialName}</p>
                  <p className="text-[rgba(255,251,245,0.55)] text-xs mt-0.5">{cs.testimonialCompany}</p>
                </div>
              </footer>
            </blockquote>
          </FadeUp>
        </div>
      </section>

      {/* ── Prev / Next navigation ── */}
      <section className="py-12 border-t border-[rgba(255,251,245,0.08)]" aria-label="Project navigation">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8 flex items-center justify-between">
          {prev ? (
            <Link
              href={`/work/${prev.id}`}
              className="inline-flex items-center gap-2 text-[rgba(255,251,245,0.6)] hover:text-brand-cream text-sm font-medium transition-colors duration-200"
            >
              <ArrowLeft size={14} />
              <span>
                <span className="block text-[10px] tracking-widest uppercase text-[rgba(255,251,245,0.4)] mb-0.5">Previous</span>
                {prev.title}
              </span>
            </Link>
          ) : <div />}

          {next ? (
            <Link
              href={`/work/${next.id}`}
              className="inline-flex items-center gap-2 text-[rgba(255,251,245,0.6)] hover:text-brand-cream text-sm font-medium transition-colors duration-200 text-right"
            >
              <span>
                <span className="block text-[10px] tracking-widest uppercase text-[rgba(255,251,245,0.4)] mb-0.5">Next</span>
                {next.title}
              </span>
              <ArrowRight size={14} />
            </Link>
          ) : <div />}
        </div>
      </section>
    </>
  );
}
