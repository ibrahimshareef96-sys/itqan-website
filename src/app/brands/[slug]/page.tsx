import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Link } from 'next-view-transitions';
import { CaretLeft } from '@phosphor-icons/react/dist/ssr';
import { FadeUp } from '@/components/ui/FadeUp';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbLd } from '@/lib/seo';
import { brands, getBrand } from '@/data/brands';
import {
  Chapter,
  ColorGrid,
  DownloadBlock,
  LogoShowcase,
  TypeSpecimen,
  VoicePrinciples,
} from '@/components/brands/BrandSections';
// (ColorGrid renders its own white spec footers, so it needs only a `dark`
// flag for the closing note — no wrapper component.)

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const brand = getBrand(params.slug);
  if (!brand) return {};
  return {
    title: `${brand.name} Brand Guidelines — Logo, Colour, Type & Voice`,
    description: `${brand.essence} Official guidelines and downloadable assets for ${brand.name}: logo usage, colour system, typography and voice.`,
    alternates: { canonical: `/brands/${brand.slug}` },
  };
}

/**
 * /brands/[slug] — one brand, chaptered like brand.uber.com: Logo → Colour →
 * Typography → Voice → (sub-brand) → Assets, alternating dark/cream per the
 * Itqan section rhythm. The page chrome stays Itqan; the brand's own identity
 * appears as content (tiles, swatches, specimens) — the Google-hub pattern.
 */
export default function BrandPage({ params }: { params: { slug: string } }) {
  const brand = getBrand(params.slug);
  if (!brand) notFound();

  return (
    <main>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Brands', path: '/brands' },
          { name: brand.name, path: `/brands/${brand.slug}` },
        ])}
      />

      {/* Hero — the brand wears its own skin here, full bleed. */}
      <section
        className="pt-36 sm:pt-44 pb-16 sm:pb-24"
        style={{ backgroundColor: brand.tile.bg, color: brand.tile.fg }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <FadeUp>
            <Link
              href="/brands"
              className="inline-flex items-center gap-1.5 text-sm opacity-70 hover:opacity-100 transition-opacity duration-200"
              style={{ color: brand.tile.fg }}
            >
              <CaretLeft size={14} weight="bold" />
              Brands
            </Link>
            <p
              className="text-[0.6875rem] font-bold uppercase tracking-[0.22em] mt-8 mb-5"
              style={{ color: brand.tile.accent }}
            >
              Brand guidelines
            </p>
            <h1 className="font-sans font-bold text-[2.75rem] sm:text-[4rem] leading-[1.04] tracking-tight">
              {brand.name}
            </h1>
            <p className="mt-4 text-xl sm:text-2xl" style={{ color: brand.tile.accent }}>
              <em className="font-serif italic font-normal">{brand.essence}</em>
            </p>
            <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed opacity-80">{brand.intro}</p>
          </FadeUp>
        </div>
      </section>

      <Chapter id="logo" n="01" label="Logo" title="The mark," accent="and how it survives contact.">
        <LogoShowcase logos={brand.logos} rules={brand.logoRules} />
      </Chapter>

      <Chapter id="colour" n="02" label="Colour" title="A palette is a set of" accent="decisions." dark>
        <ColorGrid colors={brand.colors} note={brand.colorNote} dark />
      </Chapter>

      <Chapter id="type" n="03" label="Typography" title="Type does the" accent="talking.">
        <TypeSpecimen styles={brand.type} note={brand.typeNote} />
      </Chapter>

      <Chapter id="voice" n="04" label="Voice" title="Written rules, not" accent="vibes." dark>
        <div className="text-brand-cream">
          <VoicePrinciples intro={brand.voiceIntro} principles={brand.voice} dark />
        </div>
      </Chapter>

      {brand.subBrand && (
        <Chapter id="sub-brand" n="05" label="Sub-brand" title={brand.subBrand.name + ','} accent={brand.subBrand.tagline}>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            {brand.subBrand.image && (
              <FadeUp>
                <div className="rounded-2xl overflow-hidden border border-black/[0.08]">
                  <Image
                    src={brand.subBrand.image.src}
                    alt={brand.subBrand.image.alt}
                    width={1600}
                    height={900}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="w-full h-auto"
                  />
                </div>
              </FadeUp>
            )}
            <FadeUp>
              <p className="text-[1.0625rem] leading-relaxed text-text-primary/85 max-w-xl">{brand.subBrand.body}</p>
            </FadeUp>
          </div>
        </Chapter>
      )}

      <Chapter
        id="assets"
        n={brand.subBrand ? '06' : '05'}
        label="Assets"
        title="Take what you"
        accent="need."
        dark
      >
        <DownloadBlock brand={brand} />
      </Chapter>
    </main>
  );
}
