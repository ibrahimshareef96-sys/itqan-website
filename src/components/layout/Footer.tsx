'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { InstagramLogo, LinkedinLogo } from '@phosphor-icons/react';
import { NewsletterForm } from './NewsletterForm';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { FadeUp } from '@/components/ui/FadeUp';
import { StaggerContainer, StaggerItem } from '@/components/ui/StaggerContainer';
import { EASE_OUT_EXPO, SPRING_BOUNCY } from '@/lib/motion';

export function Footer() {
  return (
    <footer className="bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">

        {/* Top row */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-12">
          <ScrollReveal direction="left" distance={20}>
            <div className="flex-shrink-0">
              <Image
                src="/images/brand/light-logo.svg"
                alt="Itqan Studio"
                width={128}
                height={36}
              />
              <p className="mt-5 text-brand-cream/45 text-sm leading-relaxed max-w-[220px]">
                Your brand has potential.<br />
                We give it direction.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" distance={20} delay={0.1}>
            <div className="lg:max-w-[380px] w-full">
              <p className="text-brand-cream text-sm font-semibold mb-3.5 tracking-wide">
                Subscribe to Our Newsletter
              </p>
              <NewsletterForm />
            </div>
          </ScrollReveal>
        </div>

        {/* Animated divider */}
        <motion.div
          className="h-px bg-white/[0.1] mb-8 origin-left"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-48px 0px' as `${number}px` }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <FadeUp delay={0.1}>
            <p className="text-brand-cream/40 text-sm">
              Copyright &copy; 2026 &mdash; Itqan Studio FZ LLC
            </p>
          </FadeUp>
          <StaggerContainer stagger={0.08} delay={0.15} className="flex items-center gap-4">
            <StaggerItem>
              <motion.a
                href="https://www.instagram.com/madebyitqan/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-brand-cream/45 hover:text-brand-cream transition-colors duration-200"
                whileHover={{ scale: 1.15, y: -2 }}
                transition={SPRING_BOUNCY}
              >
                <InstagramLogo size={18} />
              </motion.a>
            </StaggerItem>
            <StaggerItem>
              <motion.a
                href="https://www.linkedin.com/company/110338926/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B07ZgNyX0RYqqdIn%2FtdL06w%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-brand-cream/45 hover:text-brand-cream transition-colors duration-200"
                whileHover={{ scale: 1.15, y: -2 }}
                transition={SPRING_BOUNCY}
              >
                <LinkedinLogo size={18} />
              </motion.a>
            </StaggerItem>
          </StaggerContainer>
        </div>

        <FadeUp delay={0.2}>
          <p className="mt-4 text-brand-cream/20 text-xs">
            Made with &#9829; by The Itqan Team
          </p>
        </FadeUp>
      </div>
    </footer>
  );
}
