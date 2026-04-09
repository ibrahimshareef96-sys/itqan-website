'use client';

import Image from 'next/image';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SpringCard } from '@/components/ui/SpringCard';
import { StaggerContainer, StaggerItem } from '@/components/ui/StaggerContainer';
import { team } from '@/data/team';

export function TeamSection() {
  return (
    <section className="bg-brand-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <ScrollReveal direction="up">
          <h2 className="font-serif italic text-4xl md:text-5xl text-brand-dark leading-tight">
            Meet the Team
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <p className="mt-4 text-text-secondary text-base leading-relaxed max-w-[54ch]">
            At Itqan Studio, our team blends industry expertise with genuine human connection.
          </p>
        </ScrollReveal>

        <StaggerContainer stagger={0.1} delay={0.1} className="mt-14 grid md:grid-cols-3 gap-8">
          {team.map(({ id, name, role, image }) => (
            <StaggerItem key={id}>
              <SpringCard>
                <div className="group overflow-hidden rounded-2xl border border-brand-accent/15 shadow-[0_4px_24px_rgba(47,28,44,0.05)]">
                  {/* Photo */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-brand-accent/10">
                    <Image
                      src={image}
                      alt={`${name}, ${role} at Itqan Studio`}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  {/* Name banner */}
                  <div className="bg-brand-accent px-6 py-5">
                    <p className="font-sans font-semibold text-brand-dark text-base">{name}</p>
                    <p className="text-brand-dark/65 text-sm mt-0.5">{role}</p>
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
