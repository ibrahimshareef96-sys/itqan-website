import type { Metadata } from 'next';
import { FadeUp } from '@/components/ui/FadeUp';
import { WorkGrid } from '@/components/work/WorkGrid';
import { projects } from '@/data/projects';
import { caseStudies } from '@/data/case-studies';
import { JsonLd } from '@/components/seo/JsonLd';
import { workCollectionLd, breadcrumbLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Our Work — Brand, Product & Automation Case Studies',
  description:
    'Case studies from Itqan Studio — brand identity, UI/UX, web and app development, and AI automation projects delivered for founders in Dubai and beyond.',
  alternates: { canonical: '/work' },
};

export default function WorkPage() {
  return (
    <>
      {/* ItemList is built from caseStudies — the same source /work/[id] uses — so
          it can never link to a slug without a detail page. */}
      <JsonLd data={workCollectionLd(caseStudies)} />
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/work' },
        ])}
      />
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
