'use client';

import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SpringCard } from '@/components/ui/SpringCard';
import { StaggerContainer, StaggerItem } from '@/components/ui/StaggerContainer';
import { team } from '@/data/team';

export function TeamSection() {
  const founder = team.find((m) => m.id === 'ibrahim');
  const collaborators = team.filter((m) => m.id !== 'ibrahim');

  return (
    <section className="py-24 lg:py-32" aria-labelledby="team-heading">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Founder block — Ibrahim, solo */}
        {founder && (
          <ScrollReveal direction="up">
            <div className="grid md:grid-cols-[280px_1fr] gap-10 md:gap-14 items-start">
              <SpringCard>
                <div className="group overflow-hidden rounded-2xl border border-[rgba(255,251,245,0.08)]">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={founder.image}
                      alt={`${founder.name}, ${founder.role} at Itqan Studio`}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 280px"
                    />
                  </div>
                  <div className="px-6 py-5 border-t border-[rgba(255,251,245,0.08)]">
                    <p className="font-sans font-semibold text-brand-cream text-base">
                      {founder.name}
                    </p>
                    <p className="text-[rgba(255,251,245,0.55)] text-sm mt-0.5">
                      {founder.role}
                    </p>
                  </div>
                </div>
              </SpringCard>

              <div className="md:pt-4">
                <p
                  className="font-sans font-medium text-[0.6875rem] uppercase text-brand-accent"
                  style={{ letterSpacing: '0.22em' }}
                >
                  The founder
                </p>
                <h2
                  id="team-heading"
                  className="mt-6 font-sans font-semibold text-brand-cream leading-[1.05] tracking-[-0.015em]"
                  style={{ fontSize: 'clamp(2rem, 3.6vw, 3rem)' }}
                >
                  One operator. Three crafts.{' '}
                  <span className="accent-italic">No hand-offs.</span>
                </h2>
                <p
                  className="mt-6 text-brand-cream/75 leading-[1.65] max-w-[58ch]"
                  style={{ fontSize: 'clamp(1rem, 1.2vw, 1.0625rem)' }}
                >
                  Itqan is run by Ibrahim &mdash; an engineer who builds, a designer
                  who ships, a storyteller who closes. Every brand, every screen, every
                  workflow comes through one head. That&apos;s how a 90-day Founder OS
                  ships in 12 weeks instead of 12 months.
                </p>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Trusted collaborators */}
        {collaborators.length > 0 && (
          <div className="mt-24 lg:mt-32 pt-16 border-t border-[rgba(255,251,245,0.08)]">
            <ScrollReveal direction="up">
              <p
                className="font-sans font-medium text-[0.6875rem] uppercase text-brand-accent"
                style={{ letterSpacing: '0.22em' }}
              >
                Trusted collaborators
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.06}>
              <h3
                className="mt-6 font-sans font-semibold text-brand-cream leading-[1.1] tracking-[-0.015em]"
                style={{ fontSize: 'clamp(1.625rem, 2.6vw, 2.25rem)', maxWidth: '24ch' }}
              >
                When a project needs extra capacity, this is the bench.
              </h3>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.12}>
              <p className="mt-5 text-[rgba(255,251,245,0.65)] text-base leading-[1.6] max-w-[58ch]">
                Independent designers and operators Ibrahim has worked with for years.
                Not full-time staff &mdash; specialists pulled in when an engagement
                calls for it. The brief stays the same: one founder accountable,
                end-to-end.
              </p>
            </ScrollReveal>

            <StaggerContainer stagger={0.1} delay={0.18} className="mt-12 grid sm:grid-cols-2 gap-6 md:gap-8 max-w-[760px]">
              {collaborators.map(({ id, name, role, image }) => (
                <StaggerItem key={id}>
                  <SpringCard>
                    <div className="group overflow-hidden rounded-2xl border border-[rgba(255,251,245,0.08)]">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={image}
                          alt={`${name}, ${role}`}
                          fill
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                          sizes="(max-width: 640px) 100vw, 50vw"
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
        )}

      </div>
    </section>
  );
}
