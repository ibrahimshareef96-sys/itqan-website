'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FadeUp } from '@/components/ui/FadeUp';
import { CoverMedia } from '@/components/ui/CoverMedia';
import type { Project } from '@/data/projects';

const FILTERS = ['All', 'Brand & Identity', 'UI/UX Design', 'Application Development'] as const;
type Filter = (typeof FILTERS)[number];

interface WorkGridProps {
  projects: Project[];
}

export function WorkGrid({ projects }: WorkGridProps) {
  const [active, setActive] = useState<Filter>('All');

  const visible =
    active === 'All' ? projects : projects.filter((p) => p.filters.includes(active));

  return (
    <>
      {/* Filter tabs */}
      <div className="mb-12 flex flex-wrap gap-x-6 gap-y-3 md:gap-x-8">
        {FILTERS.map((filter) => {
          const isActive = active === filter;
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={isActive}
              className={`font-sans font-medium text-sm pb-1 border-b transition-colors duration-200 ${
                isActive
                  ? 'text-brand-accent border-brand-accent'
                  : 'text-[rgba(255,251,245,0.6)] border-transparent hover:text-brand-cream'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {visible.map((project, i) => (
          <FadeUp key={project.id} delay={i * 0.08}>
            <Link
              href={`/work/${project.id}`}
              className="group relative block overflow-hidden rounded-[12px] aspect-[4/3]"
            >
              <CoverMedia
                src={project.coverImage}
                video={project.coverVideo}
                alt={project.title}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
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
    </>
  );
}
