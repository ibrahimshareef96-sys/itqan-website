import { Globe } from '@phosphor-icons/react/dist/ssr';
import { FadeUp } from '@/components/ui/FadeUp';
import { teamLanguages } from '@/data/team';

export function Languages() {
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <FadeUp>
          <h2 className="font-sans font-semibold text-4xl md:text-5xl text-brand-cream leading-tight">
            We may speak your language!
          </h2>
        </FadeUp>

        <FadeUp delay={0.14} className="mt-10">
          <div className="flex flex-wrap gap-3">
            {teamLanguages.map((lang) => (
              <span
                key={lang}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-[rgba(255,251,245,0.95)]"
                style={{
                  background: 'rgba(255, 251, 245, 0.12)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 251, 245, 0.2)',
                }}
              >
                <Globe size={14} className="text-brand-accent flex-shrink-0" />
                {lang}
              </span>
            ))}
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
