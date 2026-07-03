import Image from 'next/image';
import { FadeUp } from '@/components/ui/FadeUp';
import { RollButton } from '@/components/ui/RollButton';

/**
 * Axion "Section 2" adapted: the widened one-partner positioning — every piece
 * that turns traffic into buyers, from one senior team. Light-first, dark-aware.
 */
export function IntroPartner() {
  return (
    <section
      className="bg-white dark:bg-[#241626] pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden"
      aria-labelledby="intro-partner-heading"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Numbered badge row */}
        <FadeUp>
          <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
            <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand-dark text-brand-cream dark:bg-brand-cream dark:text-brand-dark text-[0.6875rem] sm:text-[0.75rem] font-semibold">
              1
            </span>
            <span className="text-[0.75rem] sm:text-[0.8125rem] font-medium text-text-primary dark:text-brand-cream border border-black/[0.12] dark:border-brand-cream/[0.18] rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
              One partner
            </span>
          </div>
        </FadeUp>

        {/* Heading */}
        <FadeUp delay={0.06}>
          <h2
            id="intro-partner-heading"
            className="px-5 sm:px-8 lg:px-12 font-sans font-semibold text-text-primary dark:text-brand-cream leading-[1.12] tracking-[-0.02em] mb-12 sm:mb-16 lg:mb-24"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 3.2rem)', maxWidth: '26ch' }}
          >
            Every piece that turns traffic into{' '}
            <span
              className="text-brand-accent-on-light dark:text-brand-accent"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 500 }}
            >
              buyers
            </span>
            . One team.
          </h2>
        </FadeUp>

        {/* Content: paragraph + CTA + two real-work images */}
        <div className="px-5 sm:px-8 lg:px-12">
          {/* Mobile / tablet: stacked */}
          <div className="lg:hidden space-y-8">
            <FadeUp>
              <p className="text-[0.9375rem] sm:text-[1.0625rem] leading-[1.6] font-medium text-text-primary dark:text-brand-cream/85 max-w-[46ch]">
                Strategy, design, content, SEO, AI visibility and hosting &mdash; built
                and run by the same senior team.
              </p>
            </FadeUp>
            <FadeUp delay={0.06}>
              <RollButton href="/about" label="About the studio" />
            </FadeUp>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
              <FadeUp className="sm:w-[45%]">
                <div className="relative aspect-[438/346] rounded-xl sm:rounded-2xl overflow-hidden">
                  <Image
                    src="/images/portfolio/oud-closet/cover.png"
                    alt="Oud Closet — luxury modest fashion brand by Itqan Studio"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 45vw"
                  />
                </div>
              </FadeUp>
              <FadeUp delay={0.08} className="sm:w-[55%]">
                <div className="relative aspect-[900/600] rounded-xl sm:rounded-2xl overflow-hidden">
                  <Image
                    src="/images/portfolio/mutqin/hero-landing.webp"
                    alt="Mutqin — AI startup companion built by Itqan Studio"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 55vw"
                  />
                </div>
              </FadeUp>
            </div>
          </div>

          {/* Desktop: 3-column editorial grid */}
          <div className="hidden lg:grid grid-cols-[26%_1fr_48%] items-end gap-6 xl:gap-8">
            <FadeUp className="self-end">
              <div className="relative aspect-[438/346] rounded-2xl overflow-hidden">
                <Image
                  src="/images/portfolio/oud-closet/cover.png"
                  alt="Oud Closet — luxury modest fashion brand by Itqan Studio"
                  fill
                  className="object-cover"
                  sizes="26vw"
                />
              </div>
            </FadeUp>

            <FadeUp delay={0.06} className="self-start">
              <div className="flex flex-col items-start gap-8">
                <p className="text-[1rem] xl:text-[1.125rem] leading-[1.65] font-medium text-text-primary dark:text-brand-cream/85">
                  Strategy, design, content, SEO,
                  <br />
                  AI visibility and hosting &mdash; built
                  <br />
                  and run by the same senior team.
                </p>
                <RollButton href="/about" label="About the studio" />
              </div>
            </FadeUp>

            <FadeUp delay={0.1} className="self-end">
              <div className="relative aspect-[3/2] rounded-2xl overflow-hidden">
                <Image
                  src="/images/portfolio/mutqin/hero-landing.webp"
                  alt="Mutqin — AI startup companion built by Itqan Studio"
                  fill
                  className="object-cover"
                  sizes="48vw"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
