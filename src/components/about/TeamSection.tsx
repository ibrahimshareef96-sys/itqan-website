'use client';

import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SpringCard } from '@/components/ui/SpringCard';
import { StaggerContainer, StaggerItem } from '@/components/ui/StaggerContainer';
import { team } from '@/data/team';

export function TeamSection() {
  return (
    <section className="py-24 lg:py-32" aria-labelledby="team-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Heading block */}
        <ScrollReveal direction="up">
          <p
            className="font-sans font-medium text-[0.6875rem] uppercase text-brand-accent"
            style={{ letterSpacing: '0.22em' }}
          >
            The founders
          </p>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.06}>
          <h2
            id="team-heading"
            className="mt-6 font-sans font-semibold text-brand-cream leading-[1.05] tracking-[-0.015em]"
            style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)' }}
          >
            Senior hands. No juniors.{' '}
            <span className="accent-italic">No hand-offs.</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.12}>
          <p
            className="mt-6 text-brand-cream/75 leading-[1.65] max-w-[58ch]"
            style={{ fontSize: 'clamp(1rem, 1.2vw, 1.0625rem)' }}
          >
            Itqan is run by its two co-founders. The people who pitch your work are
            the people who build it &mdash; strategy, design, engineering and story,
            with a senior bench behind them when a project calls for more hands.
          </p>
        </ScrollReveal>

        {/* Founder cards — the two co-founders, equal weight */}
        <StaggerContainer stagger={0.1} delay={0.18} className="mt-12 lg:mt-16 grid sm:grid-cols-2 gap-6 md:gap-8 max-w-[760px]">
          {team.map(({ id, name, role, image, objectPosition }) => (
            <StaggerItem key={id}>
              <SpringCard>
                <div className="group overflow-hidden rounded-2xl border border-[rgba(255,251,245,0.08)]">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={image}
                      alt={`${name}, ${role} at Itqan Studio`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      style={{ objectPosition: objectPosition ?? 'top' }}
                      sizes="(max-width: 640px) 100vw, 380px"
                    />
                  </div>
                  <div className="px-6 py-5 border-t border-[rgba(255,251,245,0.08)]">
                    <p className="font-sans font-semibold text-brand-cream text-base">
                      {name}
                    </p>
                    <p className="text-[rgba(255,251,245,0.55)] text-sm mt-0.5">
                      {role}
                    </p>
                  </div>
                </div>
              </SpringCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
