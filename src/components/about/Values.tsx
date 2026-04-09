'use client';

import Image from 'next/image';
import { Palette, Lightning, PencilSimpleLine } from '@phosphor-icons/react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SpringCard } from '@/components/ui/SpringCard';
import { StaggerContainer, StaggerItem } from '@/components/ui/StaggerContainer';

const values = [
  {
    Icon: Palette,
    title: 'Excellence in Craftmanship',
    description:
      'We transform your vision into a cohesive, unforgettable digital identity architected from the ground up and built to scale.',
    images: [
      '/images/portfolio/shareefico/cover.png',
      '/images/portfolio/oud-closet/cover.png',
    ],
  },
  {
    Icon: Lightning,
    title: 'Excellence in Precision',
    description:
      'We create seamless workflows, automation systems, and integrated platforms that save time, reduce friction, and scale your operations. From CRM setups to content dashboards to custom workflows, your business becomes effortlessly efficient.',
    images: ['/images/itqan-crm.png'],
  },
  {
    Icon: PencilSimpleLine,
    title: 'Excellence in Function',
    description:
      'We design user-centered digital experiences rooted in research, clarity, and usability. From wireframes to high-fidelity prototypes, every decision is informed by user behavior and crafted to deliver frictionless interaction.',
    images: ['/images/portfolio/medacs/cover.png'],
  },
];

const directions: Array<'left' | 'up' | 'right'> = ['left', 'up', 'right'];

const tags = [
  'Web Development', 'Integrations', 'Prototyping', 'Design System',
  'UI & UX Strategy', 'Copywriting', 'Branding', 'SEO',
  'Content Creation Strategy', 'Funnel Architecture', 'Automation',
];

export function Values() {
  return (
    <section className="bg-brand-accent/[0.18] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="mt-0 grid md:grid-cols-3 gap-6">
          {values.map(({ Icon, title, description, images }, i) => (
            <ScrollReveal key={title} direction={directions[i]} distance={28} delay={0.08 + i * 0.09}>
              <SpringCard className="h-full">
                <div className="bg-brand-cream rounded-2xl p-8 flex flex-col border border-brand-accent/15 shadow-[0_4px_24px_rgba(47,28,44,0.04)] overflow-hidden h-full">
                  <Icon size={22} className="text-brand-accent mb-5" />
                  <h3 className="font-sans font-semibold text-xl text-brand-dark leading-snug mb-4">
                    {title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">{description}</p>
                  {images.length > 0 && (
                    <div className="mt-7 flex gap-2.5">
                      {images.map((src, j) => (
                        <div key={j} className="relative flex-1 aspect-[4/3] rounded-xl overflow-hidden">
                          <Image src={src} alt="" fill className="object-cover" sizes="15vw" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </SpringCard>
            </ScrollReveal>
          ))}
        </div>

        <StaggerContainer stagger={0.03} delay={0.1} className="mt-12 flex flex-wrap gap-2.5">
          {tags.map((tag) => (
            <StaggerItem key={tag}>
              <span className="px-4 py-2 rounded-full border border-brand-dark/18 bg-brand-cream/50 text-[11px] font-medium text-brand-dark tracking-wide hover:bg-brand-cream hover:border-brand-dark/30 transition-colors duration-200">
                {tag}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
