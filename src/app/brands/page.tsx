import type { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { FadeUp } from '@/components/ui/FadeUp';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbLd } from '@/lib/seo';
import { brands } from '@/data/brands';

export const metadata: Metadata = {
  title: 'Brands — Guidelines & Assets for Itqan Studio and Shareefico',
  description:
    'The brand systems we run in public: logos, colour, typography, voice and downloadable asset packs for Itqan Studio and Shareefico. The same discipline we apply to client brands, applied to our own.',
  alternates: { canonical: '/brands' },
};

/**
 * /brands — the hub. One page, many brands (the Google partner-hub pattern),
 * each opening a chaptered guideline page (the Uber pattern) with self-serve
 * asset packs (the Airbnb pattern).
 */
export default function BrandsPage() {
  return (
    <main className="bg-brand-dark">
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Brands', path: '/brands' },
        ])}
      />

      {/* Hero */}
      <section className="pt-36 sm:pt-44 pb-16 sm:pb-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <p className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-brand-accent mb-5">
              Brand systems
            </p>
            <h1 className="font-sans font-bold text-brand-cream text-[2.75rem] sm:text-[4rem] leading-[1.04] tracking-tight max-w-3xl">
              Brands.{' '}
              <em className="font-serif italic font-normal text-brand-accent">Run in public.</em>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-cream/75">
              Guidelines, assets and the rules behind them. This is how we hold our own brands
              to the standard we sell. Everything here is downloadable and current.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Brand tiles */}
      <section className="pb-24 sm:pb-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 grid md:grid-cols-2 gap-5 sm:gap-6">
          {brands.map((brand) => (
            <FadeUp key={brand.slug}>
              <Link
                href={`/brands/${brand.slug}`}
                className="group block rounded-2xl overflow-hidden border border-brand-cream/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              >
                {/* Each brand's tile wears its own skin — the identity IS the preview. */}
                <div
                  className="aspect-[16/10] p-8 sm:p-10 flex flex-col justify-between transition-transform duration-300 group-hover:scale-[1.01]"
                  style={{ backgroundColor: brand.tile.bg, color: brand.tile.fg }}
                >
                  <p
                    className="text-[0.6875rem] font-bold uppercase tracking-[0.22em]"
                    style={{ color: brand.tile.accent }}
                  >
                    Brand system
                  </p>
                  <div>
                    <h2 className="font-sans font-bold text-[2rem] sm:text-[2.5rem] leading-tight tracking-tight">
                      {brand.name}
                    </h2>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed opacity-80 max-w-md">{brand.essence}</p>
                  </div>
                </div>
                <div className="bg-brand-cream/[0.04] px-8 sm:px-10 py-5 flex items-center justify-between">
                  <span className="text-sm text-brand-cream/80">Guidelines, voice and asset pack</span>
                  <ArrowRight
                    size={18}
                    className="text-brand-accent group-hover:translate-x-1 transition-transform duration-200"
                  />
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>
    </main>
  );
}
