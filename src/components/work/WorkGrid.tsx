'use client';

import { useState } from 'react';
import { Link } from 'next-view-transitions';
import { ArrowRight } from '@phosphor-icons/react';
import { FadeUp } from '@/components/ui/FadeUp';
import { CoverMedia } from '@/components/ui/CoverMedia';
import type { Project } from '@/data/projects';

const FILTERS = ['All', 'Brand & Identity', 'UI/UX Design', 'Application Development'] as const;
type Filter = (typeof FILTERS)[number];

interface WorkGridProps {
  projects: Project[];
}

/** Expanding hover chip: circle grows into a labeled pill (Axion case-card pattern). */
function HoverChip() {
  return (
    <span
      className="absolute bottom-4 left-4 z-10 flex items-center gap-2 h-9 w-9 group-hover:w-[168px] rounded-full overflow-hidden pl-[11px] bg-white text-text-primary transition-all duration-300 ease-in-out"
      aria-hidden="true"
    >
      <ArrowRight
        size={14}
        weight="bold"
        className="flex-shrink-0 -rotate-45 group-hover:rotate-0 transition-transform duration-300 ease-in-out"
      />
      <span className="text-[0.8125rem] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
        View case study
      </span>
    </span>
  );
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
                  ? 'text-brand-accent-on-light border-brand-accent-on-light dark:text-brand-accent dark:border-brand-accent'
                  : 'text-text-secondary/70 border-transparent hover:text-text-primary dark:text-brand-cream/60 dark:hover:text-brand-cream'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8">
        {visible.map((project, i) => (
          <FadeUp key={project.id} delay={i * 0.08}>
            <Link href={`/work/${project.id}`} className="group block cursor-pointer">
              <div
                className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-brand-dark/10 dark:bg-brand-cream/[0.06]"
                style={{ viewTransitionName: `case-cover-${project.id}` }}
              >
                <CoverMedia
                  src={project.coverImage}
                  video={project.coverVideo}
                  alt={project.title}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <HoverChip />
              </div>

              {/* Caption below the media — theme-aware. Suppressed for self-titled
                  covers exactly as before (coverHasTitle bakes the title into art). */}
              {!project.coverHasTitle && (
                <div className="mt-4">
                  <h2 className="font-sans font-semibold text-[1.0625rem] text-text-primary dark:text-brand-cream leading-snug">
                    {project.title}
                  </h2>
                  <p className="mt-1 text-[0.875rem] text-text-secondary dark:text-brand-cream/60">
                    {project.subtitle}
                  </p>
                </div>
              )}
            </Link>
          </FadeUp>
        ))}
      </div>
    </>
  );
}
