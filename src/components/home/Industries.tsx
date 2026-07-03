'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FadeUp } from '@/components/ui/FadeUp';

const industries = [
  {
    name: 'SaaS',
    image: '/images/portfolio/project-you-mkp-mb.png',
  },
  {
    name: 'Fintech',
    image: '/images/portfolio/ITQAN-CRM-MKP-MCBK2.png',
  },
  {
    name: 'Productized service',
    image: '/images/portfolio/nexilink/cover.png',
  },
  {
    name: 'Creator brand',
    image: '/images/portfolio/shareefico/cover.png',
  },
  {
    name: 'Knowledge business',
    image: '/images/founder-render.png',
  },
  {
    name: 'Healthcare',
    image: '/images/portfolio/medacs/cover.png',
  },
];

const cellVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export function Industries() {
  return (
    <section className="py-32" aria-labelledby="industries-heading">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8">
        {/* Eyebrow */}
        <FadeUp>
          <p
            className="font-sans font-medium text-[0.75rem] uppercase text-brand-accent"
            style={{ letterSpacing: '0.22em' }}
          >
            Built for the region
          </p>
        </FadeUp>

        {/* Heading */}
        <FadeUp delay={0.05}>
          <h2
            id="industries-heading"
            className="mt-6 font-sans font-semibold text-brand-cream leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.25rem)', maxWidth: '22ch' }}
          >
            World-class thinking. Regional{' '}
            <span className="accent-italic">fluency</span>.
          </h2>
        </FadeUp>

        {/* Supporting line */}
        <FadeUp delay={0.1}>
          <p
            className="mt-6 text-brand-cream/65 leading-[1.55]"
            style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)', maxWidth: '60ch' }}
          >
            Global brand standards, read through the Gulf. We work in Arabic and English,
            design for Khaleeji taste, and build for a market moving on Vision 2030 &mdash;
            across SaaS, fintech, commerce and beyond.
          </p>
        </FadeUp>

        {/* Grid */}
        <motion.ul
          role="list"
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {industries.map((industry, i) => (
            <motion.li
              key={industry.name}
              role="listitem"
              custom={i}
              variants={cellVariants}
              className="group relative overflow-hidden border border-[rgba(255,251,245,0.08)] hover:border-[rgba(255,251,245,0.2)] transition-[border-color] duration-[400ms] ease-out aspect-[4/3] sm:aspect-[3/4]"
            >
              {/* Background image */}
              <div className="absolute inset-0">
                <Image
                  src={industry.image}
                  alt=""
                  fill
                  className="object-cover brightness-[0.55] contrast-[0.95] grayscale group-hover:grayscale-0 group-hover:brightness-[1.05] group-hover:contrast-[1.05] transition-[filter] duration-[400ms] ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Dark overlay — softens on hover */}
              <div className="absolute inset-0 pointer-events-none industry-overlay transition-opacity duration-[400ms] ease-out" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-sans font-medium text-[1.5rem] text-brand-cream">
                  {industry.name}
                </h3>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
