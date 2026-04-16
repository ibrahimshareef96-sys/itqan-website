'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Palette, Lightning, PencilSimpleLine, Code } from '@phosphor-icons/react';
import { FadeUp } from '@/components/ui/FadeUp';
import { TextReveal } from '@/components/ui/TextReveal';
import { SpringCard } from '@/components/ui/SpringCard';
import { StaggerContainer, StaggerItem } from '@/components/ui/StaggerContainer';
import { SectionLabel } from '@/components/ui/SectionLabel';

const services = [
  {
    Icon: Palette,
    title: 'Brand Identity & Strategy',
    description:
      'We don\'t decorate brands. We engineer them — identities built to outlast trends and outperform competitors.',
    images: [
      '/images/portfolio/shareefico/cover.png',
      '/images/portfolio/oud-closet/cover.png',
    ],
  },
  {
    Icon: Lightning,
    title: 'Automation & Systems',
    description:
      'Your operations should run without you watching. We build the workflows, integrations, and platforms that make that possible.',
    images: ['/images/portfolio/nexilink/cover.png'],
  },
  {
    Icon: PencilSimpleLine,
    title: 'UI/UX Design & Research',
    description:
      'Interfaces your users understand the first time. Research-driven, tested, and designed to convert — not just look good.',
    images: ['/images/portfolio/medacs/cover.png'],
  },
  {
    Icon: Code,
    title: 'Systems & Development',
    description:
      'Custom-built products that feel like your brand, not a template. Web apps, CRMs, and native tools — designed and developed in-house.',
    images: ['/images/itqan-crm.png'],
  },
];

/* Capability tags removed — they read like a resume, not a pitch.
   Full capability list lives on the /services page. */

export function Services() {
  return (
    <section className="bg-brand-accent/[0.18] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <FadeUp>
          <SectionLabel icon={<Palette size={13} />} label="Services" />
        </FadeUp>

        <TextReveal direction="left" delay={0.08} className="mt-6">
          <h2 className="font-sans font-bold text-3xl md:text-[2.5rem] text-brand-dark leading-tight tracking-tight">
            What we do.
            <br />
            <span className="font-serif font-normal italic text-brand-accent-on-light">
              And why it works.
            </span>
          </h2>
        </TextReveal>

        <FadeUp delay={0.16} className="mt-5">
          <p className="text-text-secondary text-base leading-relaxed max-w-[62ch]">
            Four disciplines. One team. Every project gets senior-level thinking from strategy through delivery.
          </p>
        </FadeUp>

        {/* Service cards */}
        <StaggerContainer stagger={0.1} delay={0.1} className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {services.map(({ Icon, title, description, images }) => (
            <StaggerItem key={title} className="h-full">
              <SpringCard className="h-full">
                <div className="bg-brand-cream rounded-2xl p-8 flex flex-col h-full border border-brand-accent/15 shadow-[0_4px_24px_rgba(47,28,44,0.04)] overflow-hidden">
                  <Icon size={22} className="text-brand-accent mb-5" />
                  <h3 className="font-sans font-semibold text-xl text-brand-dark leading-snug mb-4">
                    {title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{description}</p>

                  {/* Portfolio mockup thumbnails */}
                  <div className="mt-7 flex gap-2.5">
                    {images.map((src, j) => (
                      <div
                        key={j}
                        className="relative flex-1 aspect-[4/3] rounded-xl overflow-hidden"
                      >
                        <Image
                          src={src}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 15vw"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-7">
                    <Link
                      href="/services"
                      className="inline-flex items-center gap-1.5 text-brand-dark text-sm font-semibold group hover:opacity-70 transition-opacity duration-200"
                    >
                      What we do
                      <ArrowRight
                        size={14}
                        weight="bold"
                        className="group-hover:translate-x-1 transition-transform duration-200"
                      />
                    </Link>
                  </div>
                </div>
              </SpringCard>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Full capabilities on /services page */}

      </div>
    </section>
  );
}
