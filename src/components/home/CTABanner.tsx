import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { FadeUp } from '@/components/ui/FadeUp';

export function CTABanner() {
  return (
    <section className="relative py-28 lg:py-40 overflow-hidden">
      {/* Background — hero image with heavy overlay for texture */}
      <Image
        src="/images/hero/hero-main.png"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-brand-dark/82" />
      {/* Subtle radial accent glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_60%_50%,rgba(204,164,194,0.12),transparent)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl">
          <FadeUp delay={0.1}>
            <h2 className="font-sans font-bold text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl text-brand-cream leading-tight tracking-tight">
              Partner with Us and Elevate Your Business to New Heights!
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mt-5 text-brand-cream/60 text-base leading-relaxed max-w-[54ch]">
              Suited for businesses seeking strategic design &amp; ideas, paired with the
              expertise of a senior designer.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand-accent text-brand-dark px-6 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-200"
              >
                Book a meeting
                <ArrowRight size={14} weight="bold" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-brand-cream/30 text-brand-cream px-6 py-3.5 rounded-full text-sm font-semibold hover:bg-brand-cream/10 transition-colors duration-200"
              >
                Learn about us
                <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
