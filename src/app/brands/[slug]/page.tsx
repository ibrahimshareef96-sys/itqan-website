import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from 'next-view-transitions';
import { CaretLeft } from '@phosphor-icons/react/dist/ssr';
import { FadeUp } from '@/components/ui/FadeUp';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbLd } from '@/lib/seo';
import { brands, getBrand, type Brand } from '@/data/brands';
import {
  Chapter,
  ChapterNav,
  ColorGrid,
  DownloadBlock,
  IconographyBlock,
  ImageryGrid,
  LogoShowcase,
  MisuseGrid,
  MotionSpecs,
  PairingTable,
  ProductBlock,
  RuleList,
  StoryPrinciples,
  TypeSpecimen,
  VoicePrinciples,
} from '@/components/brands/BrandSections';

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const brand = getBrand(params.slug);
  if (!brand) return {};
  return {
    title: `${brand.name} Brand Guidelines — Logo, Colour, Type, Motion & Voice`,
    description: `${brand.essence} The complete ${brand.name} brand system: logo usage and misuse, colour and pairings, typography, composition, motion, voice and downloadable assets.`,
    alternates: { canonical: `/brands/${brand.slug}` },
  };
}

/** Chapter plan per brand — optional chapters (iconography, imagery, products)
 * appear only where the brand actually documents them, numbered dynamically. */
function chapterPlan(brand: Brand) {
  const plan: { id: string; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'logo', label: 'Logo' },
    { id: 'colour', label: 'Colour' },
    { id: 'type', label: 'Typography' },
    { id: 'composition', label: 'Composition' },
  ];
  if (brand.iconography) plan.push({ id: 'iconography', label: 'Iconography' });
  if (brand.imagery) plan.push({ id: 'imagery', label: 'Imagery' });
  plan.push({ id: 'motion', label: 'Motion' });
  plan.push({ id: 'voice', label: 'Voice' });
  if (brand.products?.length) plan.push({ id: 'products', label: 'Products' });
  plan.push({ id: 'assets', label: 'Assets' });
  return plan;
}

/**
 * The full brand portal — served at brands.<domain> via the host rewrite in
 * src/middleware.ts and at /brands/[slug] directly. Chaptered like
 * brand.uber.com; the host chrome stays Itqan while the brand's own identity
 * appears as content.
 */
export default function BrandPage({ params }: { params: { slug: string } }) {
  const brand = getBrand(params.slug);
  if (!brand) notFound();

  const plan = chapterPlan(brand);
  const num = (id: string) => {
    const i = plan.findIndex((c) => c.id === id);
    // A typo'd id would otherwise render as chapter "00". These pages are
    // statically generated, so throwing turns the mistake into a build failure.
    if (i === -1) throw new Error(`Unknown brand chapter id: ${id}`);
    return String(i + 1).padStart(2, '0');
  };

  return (
    <main>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Brands', path: '/brands' },
          { name: brand.name, path: `/brands/${brand.slug}` },
        ])}
      />

      {/* Hero — the brand wears its own skin, full bleed. */}
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
              {brand.domain}
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

      <ChapterNav chapters={plan} />

      <Chapter id="overview" n={num('overview')} label="Overview" title="What this brand" accent="protects.">
        <StoryPrinciples story={brand.story} principles={brand.principles} />
      </Chapter>

      <Chapter id="logo" n={num('logo')} label="Logo" title="The mark, and how it" accent="survives contact." dark>
        <div className="text-brand-cream">
          <LogoShowcase logos={brand.logos} rules={brand.logoRules} dark />
          <p className="mt-16 mb-6 text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-brand-accent">
            Misuse
          </p>
          <MisuseGrid misuse={brand.misuse} mark={brand.misuseMark} dark />
        </div>
      </Chapter>

      <Chapter id="colour" n={num('colour')} label="Colour" title="A palette is a set of" accent="decisions.">
        <ColorGrid colors={brand.colors} note={brand.colorNote} />
        <p className="mt-16 mb-6 text-[0.6875rem] font-bold uppercase tracking-[0.22em] text-brand-accent-on-light">
          Pairings
        </p>
        <PairingTable pairings={brand.pairings} />
      </Chapter>

      <Chapter id="type" n={num('type')} label="Typography" title="Type does the" accent="talking." dark>
        <div className="text-brand-cream">
          <TypeSpecimen styles={brand.type} note={brand.typeNote} dark />
        </div>
      </Chapter>

      <Chapter id="composition" n={num('composition')} label="Composition" title="Layout is" accent="rhythm.">
        <p className="max-w-2xl text-lg leading-relaxed text-text-primary/85 mb-10">{brand.composition.intro}</p>
        <RuleList rules={brand.composition.rules} />
      </Chapter>

      {brand.iconography && (
        <Chapter id="iconography" n={num('iconography')} label="Iconography" title="One family, one" accent="stroke." dark>
          <div className="text-brand-cream">
            <IconographyBlock intro={brand.iconography.intro} rules={brand.iconography.rules} dark />
          </div>
        </Chapter>
      )}

      {brand.imagery && (
        <Chapter id="imagery" n={num('imagery')} label="Imagery" title="A world, not a" accent="photo bank." dark>
          <div className="text-brand-cream">
            <ImageryGrid intro={brand.imagery.intro} images={brand.imagery.images} dark />
          </div>
        </Chapter>
      )}

      <Chapter id="motion" n={num('motion')} label="Motion" title="Felt, not" accent="watched.">
        <MotionSpecs intro={brand.motion.intro} specs={brand.motion.specs} />
      </Chapter>

      <Chapter id="voice" n={num('voice')} label="Voice" title="Written rules, not" accent="vibes." dark>
        <div className="text-brand-cream">
          <VoicePrinciples intro={brand.voiceIntro} principles={brand.voice} dark />
        </div>
      </Chapter>

      {brand.products && brand.products.length > 0 && (
        // ONE chapter for all products — a per-product Chapter map would mint
        // duplicate section ids and chapter numbers the moment a second
        // product ships (panel finding, all three blocking seats).
        <Chapter
          id="products"
          n={num('products')}
          label="Products"
          title={`${brand.products[0].name},`}
          accent={brand.products[0].tagline}
        >
          <div className="space-y-20">
            {brand.products.map((product, i) => (
              <div key={product.name}>
                {i > 0 && (
                  <h3 className="text-2xl font-bold tracking-tight mb-2">
                    {product.name}{' '}
                    <em className="font-serif italic font-normal text-brand-accent-on-light">{product.tagline}</em>
                  </h3>
                )}
                <ProductBlock product={product} />
              </div>
            ))}
          </div>
        </Chapter>
      )}

      <Chapter id="assets" n={num('assets')} label="Assets" title="Take what you" accent="need." dark>
        <DownloadBlock brand={brand} />
      </Chapter>
    </main>
  );
}
