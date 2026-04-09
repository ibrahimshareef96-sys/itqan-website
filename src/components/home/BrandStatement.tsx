'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { TestimonialCarousel } from '@/components/ui/TestimonialCarousel';
import { testimonials } from '@/data/testimonials';

const clients = [
  { name: 'Nexilink', src: '/images/clients/nexilink.png' },
  { name: 'Shareefico', src: '/images/clients/shareefico.png' },
  { name: 'Oud Closet', src: '/images/clients/oud-closet.png' },
  { name: 'Avidnote', src: '/images/clients/avidnote.png' },
  { name: 'Shadowfly', src: '/images/clients/Shadowfly.png' },
];

export function BrandStatement() {
  return (
    <section className="bg-brand-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — slides in from left */}
          <div>
            <ScrollReveal direction="left" distance={32}>
              <h2 className="font-sans font-bold text-[1.75rem] sm:text-3xl md:text-[2.75rem] text-brand-dark leading-tight tracking-tight">
                Your Brand, Engineered for Performance.
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="left" distance={32} delay={0.1}>
              <p className="mt-5 text-text-secondary text-base leading-relaxed max-w-[54ch]">
                Your brand deserves a digital experience engineered with excellence.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="left" distance={32} delay={0.18}>
              <div className="mt-8">
                <MagneticButton strength={0.15}>
                  <motion.div whileTap={{ scale: 0.96 }}>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 bg-brand-dark text-brand-cream px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity duration-200"
                    >
                      Book a meeting
                      <ArrowRight size={14} weight="bold" />
                    </Link>
                  </motion.div>
                </MagneticButton>
              </div>
            </ScrollReveal>

            {/* Client logos */}
            <ScrollReveal direction="up" delay={0.28}>
              <div className="mt-12">
                <p className="text-[10px] font-bold tracking-[0.22em] text-text-secondary uppercase mb-5">
                  Trusted by Leading Brands:
                </p>
                <div className="flex items-center gap-4 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {clients.map(({ name, src }) => (
                    <div
                      key={name}
                      className="relative h-6 w-14 sm:h-8 sm:w-20 flex-shrink-0 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
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
            </ScrollReveal>
          </div>

          {/* Right — testimonial slides in from right */}
          <ScrollReveal direction="right" distance={32} delay={0.12} className="lg:pt-2">
            <TestimonialCarousel testimonials={testimonials} variant="inline" />
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
