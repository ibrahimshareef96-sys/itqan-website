'use client';

import Image from 'next/image';
import { FadeUp } from '@/components/ui/FadeUp';
import { StaggerContainer, StaggerItem } from '@/components/ui/StaggerContainer';
import { testimonials } from '@/data/testimonials';

const clients = [
  { name: 'Nexilink', src: '/images/clients/nexilink.png' },
  { name: 'Shareefico', src: '/images/clients/shareefico.png' },
  { name: 'Oud Closet', src: '/images/clients/oud-closet.png' },
  { name: 'Avidnote', src: '/images/clients/avidnote.png' },
  { name: 'Shadowfly', src: '/images/clients/Shadowfly.png' },
];

export function SocialProof() {
  return (
    <section className="bg-brand-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Metric + client logos */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <FadeUp>
            <p className="font-sans font-bold text-5xl md:text-6xl text-brand-dark tracking-tight">
              4 countries.
            </p>
            <p className="mt-2 text-text-secondary text-base leading-relaxed max-w-[36ch]">
              Brands built for founders across the UAE, Sweden, UK, and the US.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div>
              <p className="text-[10px] font-bold tracking-[0.22em] text-text-secondary uppercase mb-4">
                Trusted by:
              </p>
              <div className="flex items-center gap-5">
                {clients.map(({ name, src }) => (
                  <div
                    key={name}
                    className="relative h-7 w-16 sm:h-8 sm:w-20 flex-shrink-0 grayscale hover:grayscale-0 opacity-55 hover:opacity-100 transition-all duration-300"
                  >
                    <Image
                      src={src}
                      alt={name}
                      fill
                      className="object-contain object-left"
                      sizes="80px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Testimonials — horizontal row */}
        <StaggerContainer stagger={0.08} className="mt-16 grid md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, company, image }) => (
            <StaggerItem key={name}>
              <div className="bg-white/60 border border-brand-accent/12 rounded-2xl p-7">
                <p className="text-text-primary text-sm leading-relaxed">
                  &ldquo;{quote}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  {image && (
                    <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover"
                        sizes="36px"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-brand-dark text-sm">{name}</p>
                    <p className="text-text-secondary text-xs">{company}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}
