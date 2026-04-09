'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, FolderOpen } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { FadeUp } from '@/components/ui/FadeUp';
import { SplitText } from '@/components/ui/SplitText';
import { ScaleReveal } from '@/components/ui/ScaleReveal';
import { Parallax } from '@/components/ui/Parallax';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SPRING_SNAPPY } from '@/lib/motion';
import { projects } from '@/data/projects';

export function PortfolioPreview() {
  const [featured, ...rest] = projects;
  const supporting = rest.slice(0, 2);

  return (
    <section className="bg-brand-accent/[0.18] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <FadeUp>
          <SectionLabel icon={<FolderOpen size={13} />} label="Work" />
        </FadeUp>

        <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="font-sans font-bold text-4xl md:text-[2.75rem] text-brand-dark leading-tight tracking-tight">
              <SplitText text="A Collection of Projects" stagger={0.04} delay={0.08} />
              {' '}
              <span className="font-serif font-normal italic text-brand-accent-on-light">
                <SplitText text="We've Worked On." stagger={0.04} delay={0.3} />
              </span>
            </h2>
          </div>

          <FadeUp delay={0.16}>
            <MagneticButton strength={0.15}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING_SNAPPY}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-brand-dark text-brand-cream px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity duration-200 whitespace-nowrap"
                >
                  Book a meeting
                  <ArrowRight size={14} weight="bold" />
                </Link>
              </motion.div>
            </MagneticButton>
          </FadeUp>
        </div>

        {/* Portfolio grid — 1 large left + 2 stacked right */}
        <div className="mt-14 flex flex-col lg:flex-row gap-6">

          {/* Featured large card */}
          <FadeUp delay={0.12} className="lg:w-[55%]">
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative rounded-2xl overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-full min-h-[420px] group"
            >
              <Parallax speed={0.08} className="absolute inset-0">
                <Image
                  src={featured.coverImage}
                alt={`${featured.title} — ${featured.subtitle}`}
                fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </Parallax>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent" />

              {/* Cover link */}
              <Link
                href={`/work/${featured.id}`}
                className="absolute inset-0 z-10"
                aria-label={`View ${featured.title} case study`}
              />

              <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none">
                <span className="inline-block text-[10px] font-bold tracking-[0.2em] text-brand-accent uppercase mb-2">
                  {featured.category}
                </span>
                <h3 className="font-sans font-semibold text-2xl text-brand-cream">{featured.title}</h3>
                <p className="text-brand-cream/60 text-sm mt-1">{featured.subtitle}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-brand-cream/10 border border-brand-cream/15 text-[10px] font-medium text-brand-cream/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Behance link — sits above cover link */}
              {featured.behanceUrl && (
                <a
                  href={featured.behanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-brand-cream/15 backdrop-blur-sm border border-brand-cream/20 flex items-center justify-center text-brand-cream opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  aria-label={`View ${featured.title} on Behance`}
                >
                  <ArrowUpRight size={15} weight="bold" />
                </a>
              )}
            </motion.div>
          </FadeUp>

          {/* Two supporting cards stacked */}
          <div className="lg:w-[45%] flex flex-col gap-6">
            {supporting.map((project, i) => (
              <ScaleReveal key={project.id} delay={0.2 + i * 0.1} className="flex-1">
                <motion.div
                  whileHover={{ scale: 1.015 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="relative rounded-2xl overflow-hidden min-h-[200px] h-full group"
                >
                  <Image
                    src={project.coverImage}
                    alt={`${project.title} — ${project.subtitle}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/75 via-brand-dark/15 to-transparent" />

                  {/* Cover link */}
                  <Link
                    href={`/work/${project.id}`}
                    className="absolute inset-0 z-10"
                    aria-label={`View ${project.title} case study`}
                  />

                  <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
                    <span className="inline-block text-[10px] font-bold tracking-[0.2em] text-brand-accent uppercase mb-1.5">
                      {project.category}
                    </span>
                    <h3 className="font-sans font-semibold text-lg text-brand-cream">{project.title}</h3>
                    <p className="text-brand-cream/55 text-sm mt-0.5">{project.subtitle}</p>
                  </div>
                </motion.div>
              </ScaleReveal>
            ))}
          </div>

        </div>

        <FadeUp delay={0.4} className="mt-10 flex justify-center">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={SPRING_SNAPPY}
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2 border border-brand-dark/30 text-brand-dark px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-dark hover:text-brand-cream transition-colors duration-300"
            >
              View All Projects
              <ArrowRight size={14} weight="bold" />
            </Link>
          </motion.div>
        </FadeUp>

      </div>
    </section>
  );
}
