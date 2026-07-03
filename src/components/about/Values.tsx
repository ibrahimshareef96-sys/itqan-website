'use client';

import Image from 'next/image';
import { Palette, Lightning, PencilSimpleLine } from '@phosphor-icons/react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SpringCard } from '@/components/ui/SpringCard';
import { StaggerContainer, StaggerItem } from '@/components/ui/StaggerContainer';

const values = [
  {
    Icon: Palette,
    title: 'Excellence in Craftsmanship',
    description:
      'The brand still looks deliberate at 200 touchpoints and two years out. We build identities that compound instead of dating — a system, not a logo.',
    image: '/images/founder-render.png',
  },
  {
    Icon: Lightning,
    title: 'Excellence in Precision',
    description:
      'Automation, workflows and platforms that take manual work off your plate. From CRM to content operations, the business runs without you holding it together.',
    image: '/images/itqan-crm.png',
  },
  {
    Icon: PencilSimpleLine,
    title: 'Excellence in Function',
    description:
      'Every screen earns its place through research and testing, not taste. We design for how people actually behave, then prove it before we build.',
    image: '/images/app-hand-v2-render.png',
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
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="mt-0 grid md:grid-cols-3 gap-6">
          {values.map(({ Icon, title, description, image }, i) => (
            <ScrollReveal key={title} direction={directions[i]} distance={28} delay={0.08 + i * 0.09}>
              <SpringCard className="h-full">
                <div className="rounded-2xl p-8 flex flex-col border border-[rgba(255,251,245,0.08)] bg-[rgba(255,251,245,0.03)] overflow-hidden h-full">
                  <Icon size={22} className="text-brand-accent mb-5" />
                  <h3 className="font-sans font-semibold text-xl text-brand-cream leading-snug mb-4">
                    {title}
                  </h3>
                  <p className="text-[rgba(255,251,245,0.65)] text-sm leading-relaxed flex-1">{description}</p>
                  <div className="mt-7 relative aspect-[4/3] rounded-xl overflow-hidden">
                    <Image src={image} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
                  </div>
                </div>
              </SpringCard>
            </ScrollReveal>
          ))}
        </div>

        <StaggerContainer stagger={0.03} delay={0.1} className="mt-12 flex flex-wrap gap-2.5">
          {tags.map((tag) => (
            <StaggerItem key={tag}>
              <span
                className="px-4 py-2 rounded-full text-[11px] font-medium text-[rgba(255,251,245,0.95)] tracking-wide transition-colors duration-200"
                style={{
                  background: 'rgba(255, 251, 245, 0.12)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 251, 245, 0.2)',
                }}
              >
                {tag}
              </span>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
