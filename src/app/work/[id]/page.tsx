import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { FadeUp } from '@/components/ui/FadeUp';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ScaleReveal } from '@/components/ui/ScaleReveal';
import { StaggerContainer, StaggerItem } from '@/components/ui/StaggerContainer';
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
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <Image
          src={cs.coverImage}
          alt={cs.title}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/40 to-brand-dark/20" />

        {/* Back link */}
        <div className="absolute top-0 left-0 right-0 z-10 pt-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-brand-cream/70 hover:text-brand-cream text-sm font-medium transition-colors"
            >
              <ArrowLeft size={14} />
              Back to all projects
            </Link>
          </div>
        </div>

        {/* Hero info */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pb-14">
          <span className="inline-block text-[10px] font-bold tracking-[0.22em] text-brand-accent uppercase mb-3">
            {cs.industry}
          </span>
          <h1 className="font-sans font-bold text-5xl md:text-6xl text-brand-cream leading-tight tracking-tight">
            {cs.title}
          </h1>
          <p className="text-brand-cream/60 text-lg mt-2">{cs.subtitle}</p>
        </div>
      </section>

      {/* ── Content ────────────────────────────────────────── */}
      <section className="bg-brand-cream py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">

          {/* Services tags */}
          <StaggerContainer stagger={0.04} className="flex flex-wrap gap-2.5 mb-16">
            {cs.services.map((s) => (
              <StaggerItem key={s}>
                <span className="px-4 py-2 rounded-full border border-brand-dark/18 bg-brand-accent/10 text-[11px] font-medium text-brand-dark tracking-wide">
                  {s}
                </span>
              </StaggerItem>
            ))}
            {cs.behanceUrl && (
              <StaggerItem>
                <a
                  href={cs.behanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-dark text-brand-cream text-[11px] font-semibold tracking-wide hover:opacity-90 transition-opacity"
                >
                  View on Behance
                  <ArrowUpRight size={12} weight="bold" />
                </a>
              </StaggerItem>
            )}
          </StaggerContainer>

          {/* Challenge / Approach / Result */}
          <div className="grid md:grid-cols-3 gap-10">
            {([
              { heading: 'The Challenge', body: cs.challenge, dir: 'left' as const },
              { heading: 'Our Approach', body: cs.approach, dir: 'up' as const },
              { heading: 'The Result', body: cs.result, dir: 'right' as const },
            ]).map(({ heading, body, dir }, i) => (
              <ScrollReveal key={heading} direction={dir} distance={24} delay={0.08 + i * 0.1}>
                <div>
                  <h2 className="font-sans font-semibold text-xl text-brand-dark mb-4">
                    {heading}
                  </h2>
                  <p className="text-text-secondary text-sm leading-relaxed">{body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* ── Mockup gallery ─────────────────────────────────── */}
      <section className="bg-brand-accent/[0.18] py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeUp>
            <h2 className="font-sans font-bold text-3xl text-brand-dark mb-12 tracking-tight">
              Project Gallery
            </h2>
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-6">
            {cs.mockups.map((src, i) => (
              <ScaleReveal key={src} delay={0.08 + i * 0.09}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                  <Image
                    src={src}
                    alt={`${cs.title} mockup ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </ScaleReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial ────────────────────────────────────── */}
      <section className="bg-brand-cream py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <FadeUp>
            <div className="bg-brand-dark rounded-2xl p-10 md:p-14 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_60%_40%,rgba(204,164,194,0.1),transparent)]" />
              <div className="relative z-10">
                <p className="font-serif italic text-2xl md:text-3xl text-brand-cream leading-relaxed mb-8">
                  &ldquo;{cs.testimonialQuote}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  {cs.testimonialImage && (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-brand-accent/40">
                      <Image
                        src={cs.testimonialImage}
                        alt={cs.testimonialName}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-brand-cream text-sm">{cs.testimonialName}</p>
                    <p className="text-brand-cream/50 text-xs mt-0.5">{cs.testimonialCompany}</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Prev / Next navigation ─────────────────────────── */}
      <section className="bg-brand-cream border-t border-brand-accent/15 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
          {prev ? (
            <Link
              href={`/work/${prev.id}`}
              className="inline-flex items-center gap-2 text-text-secondary hover:text-brand-dark text-sm font-medium transition-colors"
            >
              <ArrowLeft size={14} />
              <span>
                <span className="block text-[10px] tracking-widest uppercase text-text-secondary/60 mb-0.5">Previous</span>
                {prev.title}
              </span>
            </Link>
          ) : <div />}

          {next ? (
            <Link
              href={`/work/${next.id}`}
              className="inline-flex items-center gap-2 text-text-secondary hover:text-brand-dark text-sm font-medium transition-colors text-right"
            >
              <span>
                <span className="block text-[10px] tracking-widest uppercase text-text-secondary/60 mb-0.5">Next</span>
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
