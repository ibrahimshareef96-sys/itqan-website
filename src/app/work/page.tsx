import type { Metadata } from 'next';
import { FadeUp } from '@/components/ui/FadeUp';
import { WorkGrid } from '@/components/work/WorkGrid';
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
      <section className="pt-32 pb-16" aria-label="Work page header">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8">
          <FadeUp>
            <h1
              className="font-sans font-semibold text-brand-cream leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}
            >
              Our Work
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* Filter + Project grid */}
      <section className="pb-32" aria-label="Project portfolio">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8">
          <WorkGrid projects={projects} />
        </div>
      </section>
    </>
  );
}
