import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeUp } from '@/components/ui/FadeUp';
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

      {/* Project grid — 3 columns desktop, 2 tablet, 1 mobile */}
      <section className="pb-32" aria-label="Project portfolio">
        <div className="max-w-[1440px] mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project, i) => (
              <FadeUp key={project.id} delay={i * 0.08}>
                <Link
                  href={`/work/${project.id}`}
                  className="group relative block overflow-hidden rounded-[12px] aspect-[4/3]"
                >
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent pointer-events-none" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <h2 className="font-sans font-semibold text-xl text-brand-cream leading-snug">
                      {project.title}
                    </h2>
                    <p className="text-[rgba(255,251,245,0.6)] text-sm mt-1">
                      {project.subtitle}
                    </p>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
