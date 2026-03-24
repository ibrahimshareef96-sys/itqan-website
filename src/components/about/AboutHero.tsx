import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { FadeUp } from '@/components/ui/FadeUp';

export function AboutHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center bg-brand-dark overflow-hidden">
      {/* Subtle radial gradient accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_60%,rgba(204,164,194,0.12),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_20%,rgba(209,194,165,0.06),transparent)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-28 pb-20">
        <FadeUp delay={0.15}>
          <p className="text-[10px] font-bold tracking-[0.22em] text-brand-accent uppercase mb-6">
            About Itqan Studio
          </p>
          <h1 className="font-sans font-bold text-[2.25rem] sm:text-5xl md:text-6xl lg:text-7xl text-brand-cream leading-tight tracking-tight max-w-2xl">
            About Itqan
          </h1>
          <p className="mt-5 text-brand-cream/55 text-lg leading-relaxed max-w-[44ch]">
            What made Itqan into Excellence.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brand-accent text-brand-dark px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-200"
            >
              Book a meeting
              <ArrowRight size={14} weight="bold" />
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
