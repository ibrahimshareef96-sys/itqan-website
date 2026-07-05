import { Globe } from '@phosphor-icons/react/dist/ssr';
import { FadeUp } from '@/components/ui/FadeUp';
import { teamLanguages } from '@/data/team';

export function Languages() {
  return (
    <section
      className="bg-[#f5efe6] dark:bg-[#1a0f1c] py-20 sm:py-24 lg:py-32"
      aria-labelledby="languages-heading"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Numbered badge row */}
        <FadeUp>
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <span className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand-dark text-brand-cream dark:bg-brand-cream dark:text-brand-dark text-[0.6875rem] sm:text-[0.75rem] font-semibold">
              5
            </span>
            <span className="text-[0.75rem] sm:text-[0.8125rem] font-medium text-text-primary dark:text-brand-cream border border-black/[0.12] dark:border-brand-cream/[0.18] rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
              Languages
            </span>
          </div>
        </FadeUp>

        <FadeUp delay={0.06}>
          <h2
            id="languages-heading"
            className="font-sans font-semibold text-text-primary dark:text-brand-cream leading-[1.1] tracking-[-0.02em] max-w-[18ch]"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3.2rem)' }}
          >
            We may speak your{' '}
            <span
              className="text-brand-accent-on-light dark:text-brand-accent"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 500 }}
            >
              language
            </span>
            .
          </h2>
        </FadeUp>

        <FadeUp delay={0.14} className="mt-10">
          <div className="flex flex-wrap gap-3">
            {teamLanguages.map(({ name, native }) => (
              <span
                key={name}
                className="inline-flex items-baseline gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium text-text-primary dark:text-brand-cream border border-black/[0.1] bg-white dark:border-brand-cream/[0.15] dark:bg-brand-cream/[0.06] shadow-[0_2px_12px_rgba(47,28,44,0.06)]"
              >
                <Globe size={14} className="text-brand-accent-on-light dark:text-brand-accent flex-shrink-0 self-center" />
                <span className="text-[1.0625rem] leading-none">{native}</span>
                {native !== name && (
                  <span className="text-[0.75rem] text-text-secondary dark:text-brand-cream/50">{name}</span>
                )}
              </span>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
