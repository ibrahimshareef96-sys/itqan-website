import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { FadeUp } from '@/components/ui/FadeUp';

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero/hero-main.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Asymmetric gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/92 via-brand-dark/65 to-brand-dark/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent" />

      {/* Premium inset frame */}
      <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.09)] pointer-events-none z-20" />

      {/* Content — left-aligned */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-24 pb-16">
        <div className="max-w-[820px]">
          <FadeUp delay={0.25}>
            {/* Line 1: Manrope Bold */}
            <h1 className="font-sans font-bold text-[2.5rem] md:text-[3.25rem] lg:text-[4rem] text-brand-cream leading-tight tracking-tight whitespace-nowrap">
              Your brand has potential.
            </h1>
            {/* Line 2: Playfair Display Italic, accent color */}
            <p className="font-serif italic text-[2.5rem] md:text-[3.25rem] lg:text-[4rem] text-brand-accent leading-tight tracking-tight mt-1 whitespace-nowrap">
              We give it direction.
            </p>
          </FadeUp>

          <FadeUp delay={0.42}>
            <p className="mt-7 text-brand-cream/65 text-base md:text-lg leading-relaxed max-w-[46ch]">
              Strategic brand design and digital execution, crafted for founders who value
              detail, direction, and distinction.
            </p>
          </FadeUp>

          <FadeUp delay={0.55}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 bg-brand-cream text-brand-dark px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-brand-cream/90 transition-colors duration-200"
              >
                Book a meeting
                <ArrowRight size={15} weight="bold" />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-2.5 border border-brand-cream/35 text-brand-cream px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-brand-cream/10 transition-colors duration-200"
              >
                View our work
                <ArrowRight size={15} weight="bold" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
