import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, FolderOpen } from '@phosphor-icons/react/dist/ssr';
import { FadeUp } from '@/components/ui/FadeUp';
import { StaggerContainer, StaggerItem } from '@/components/ui/StaggerContainer';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Our Work — Brand Identity, UI/UX & Web Development Projects',
  description:
    'Explore the Itqan Studio portfolio. See how we deliver brand identity design, UI/UX systems, custom web applications, and digital platforms for clients across industries.',
};

export default function WorkPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-brand-cream pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <FadeUp>
            <SectionLabel icon={<FolderOpen size={13} />} label="Work" />
          </FadeUp>

          <FadeUp delay={0.08} className="mt-6">
            <h1 className="font-sans font-bold text-[1.875rem] sm:text-4xl md:text-5xl lg:text-6xl text-brand-dark leading-tight tracking-tight">
              A Collection of Projects{' '}
              <span className="font-serif font-normal italic text-brand-accent-on-light">
                We&apos;ve Worked On.
              </span>
            </h1>
          </FadeUp>

          <FadeUp delay={0.16} className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-dark text-brand-cream px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-200"
            >
              Book a meeting
              <ArrowRight size={14} weight="bold" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 border border-brand-dark/25 text-brand-dark px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-dark hover:text-brand-cream transition-colors duration-200"
            >
              View our services
              <ArrowRight size={14} weight="bold" />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Project grid */}
      <section className="bg-brand-cream pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <StaggerContainer stagger={0.08} className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <StaggerItem key={project.id}>
                <div className="relative rounded-2xl overflow-hidden group aspect-[4/3]">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                  {/* Cover link */}
                  <Link
                    href={`/work/${project.id}`}
                    className="absolute inset-0 z-10"
                    aria-label={`View ${project.title} case study`}
                  />

                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-7 pointer-events-none">
                    <span className="inline-block text-[10px] font-bold tracking-[0.22em] text-brand-accent uppercase mb-2">
                      {project.category}
                    </span>
                    <h2 className="font-sans font-semibold text-2xl text-brand-cream leading-snug">
                      {project.title}
                    </h2>
                    <p className="text-brand-cream/60 text-sm mt-1">{project.subtitle}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-brand-cream/10 border border-brand-cream/15 text-[10px] font-medium text-brand-cream/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Hover CTA */}
                    <div className="flex items-center gap-1.5 mt-5 text-brand-cream text-sm font-semibold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      View Case Study
                      <ArrowRight size={14} weight="bold" />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </>
  );
}
