import { FadeUp } from '@/components/ui/FadeUp';

export function MissionStatement() {
  return (
    <section className="bg-brand-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <FadeUp>
          <p className="font-sans text-3xl md:text-4xl lg:text-5xl text-brand-dark font-bold leading-tight tracking-tight max-w-3xl">
            Itqan comes from the Arabic word meaning Excellence.
          </p>
        </FadeUp>
        <FadeUp delay={0.14}>
          <p className="font-serif italic text-3xl md:text-4xl lg:text-5xl text-brand-accent-on-light leading-tight tracking-tight mt-4 max-w-3xl">
            And Excellence is defined by the values that shape it.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
