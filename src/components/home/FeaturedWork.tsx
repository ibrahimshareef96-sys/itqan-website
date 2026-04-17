'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeUp } from '@/components/ui/FadeUp';

const tiles = [
  {
    slug: 'nexilink',
    name: 'Nexilink',
    categories: ['Brand', 'Digital'],
    image: '/images/portfolio/nexilink/cover.png',
    quote: 'Itqan rebuilt our entire product design with speed and precision. The result is functional, beautiful and perfectly aligned with our goals.',
    attribution: 'Abdi Mohamud',
    company: 'Nexilink',
  },
  {
    slug: 'shareefico',
    name: 'Shareefico',
    categories: ['Brand', 'Content'],
    image: '/images/portfolio/shareefico/cover.png',
    quote: 'Every detail feels thoughtfully crafted, and the final result elevated the brand far beyond what we imagined at the start.',
    attribution: 'Ibrahim Shareef',
    company: 'Shareefico',
  },
  {
    slug: 'oud-closet',
    name: 'Oud Closet',
    categories: ['Brand', 'Strategy'],
    image: '/images/portfolio/oud-closet/cover.png',
    quote: 'Itqan understood the essence of our brand from the very beginning. The outcome felt intentional, refined, and truly representative of who we are.',
    attribution: 'Oud Closet',
    company: 'Oud Closet',
  },
  {
    slug: 'medacs',
    name: 'Medacs',
    categories: ['UI/UX', 'Research'],
    image: '/images/portfolio/medacs/cover.png',
    quote: 'Itqan transformed our complex systems into clean, intuitive designs that finally make sense. Fast, clear and genuinely impressive work.',
    attribution: 'Adel Habib',
    company: 'Medacs',
  },
];

const EASING: [number, number, number, number] = [0.22, 1, 0.36, 1];

function Tile({
  slug,
  name,
  categories,
  image,
  quote,
  attribution,
  company,
  className,
  priority,
}: (typeof tiles)[number] & { className?: string; priority?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  // Measure how far to translate: cardHeight - groupHeight - (top padding + bottom padding)
  useEffect(() => {
    function measure() {
      const card = cardRef.current;
      const group = groupRef.current;
      if (!card || !group) return;
      const cardH = card.clientHeight;
      const groupH = group.clientHeight;
      // 2rem padding top + 2rem padding bottom = 4rem = 64px
      setTravel(cardH - groupH - 64);
    }
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <Link
      ref={cardRef}
      href={`/work/${slug}`}
      className={`featured-card group relative block overflow-hidden rounded-[12px] ${className ?? ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image with hover scale */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: hovered ? 1.03 : 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={image}
          alt={name}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </motion.div>

      {/* Default gradient overlay — stronger on mobile for always-visible testimonial readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 md:from-black/60 via-black/25 md:via-black/10 to-transparent pointer-events-none" />

      {/* Hover gradient overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(25,15,25,0.35) 0%, rgba(25,15,25,0.92) 100%)',
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease: EASING }}
      />

      {/* Content layer: covers card, flex-end pushes group to bottom */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-8">
        {/* Content group: translates up on hover */}
        <motion.div
          ref={groupRef}
          animate={{ y: hovered ? -travel : 0 }}
          transition={{ duration: 0.45, ease: EASING }}
        >
          {/* Category badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((cat) => (
              <span
                key={cat}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-[0.75rem] font-medium text-[rgba(255,251,245,0.95)]"
                style={{
                  background: 'rgba(255, 251, 245, 0.12)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 251, 245, 0.2)',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                }}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Case name */}
          <h2
            className="font-sans font-semibold text-brand-cream leading-[1.05] tracking-[-0.015em]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            {name}
          </h2>

          {/* Mobile: always-visible testimonial */}
          <div className="block md:hidden mt-4">
            <p className="font-sans font-normal text-[0.875rem] text-[rgba(255,251,245,0.85)] leading-[1.5]">
              &ldquo;{quote}&rdquo;
            </p>
            <p className="mt-2 font-sans font-medium text-[0.6875rem] text-[rgba(255,251,245,0.55)]">
              &mdash; {attribution}, {company}
            </p>
          </div>

          {/* Desktop: hover-revealed testimonial */}
          <motion.div
            className="hidden md:block"
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 12 }}
            transition={{ duration: 0.45, ease: EASING }}
          >
            <p
              className="mt-6 font-sans font-normal text-[rgba(255,251,245,0.95)] leading-[1.5]"
              style={{
                fontSize: 'clamp(1rem, 1.4vw, 1.125rem)',
                maxWidth: 'min(90%, 36ch)',
              }}
            >
              &ldquo;{quote}&rdquo;
            </p>
            <p className="mt-3 font-sans font-medium text-[0.75rem] text-[rgba(255,251,245,0.55)]">
              &mdash; {attribution}, {company}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </Link>
  );
}

export function FeaturedWork() {
  return (
    <section className="py-[80px] md:py-[120px]" aria-label="Featured case studies">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8">
        <FadeUp>
          <div className="featured-grid grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-4 md:gap-5">
            <Tile {...tiles[0]} className="min-h-[480px] md:min-h-[520px]" priority />
            <Tile {...tiles[1]} className="min-h-[480px] md:min-h-[520px]" priority />
          </div>
        </FadeUp>
        <FadeUp delay={0.08}>
          <div className="featured-grid grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4 md:gap-5 mt-4 md:mt-5">
            <Tile {...tiles[2]} className="min-h-[480px] md:min-h-[440px]" />
            <Tile {...tiles[3]} className="min-h-[480px] md:min-h-[440px]" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
