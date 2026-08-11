'use client';

/**
 * Section components for /brands/[slug] — the Uber-chapter treatment in Itqan's
 * own language: austere spec blocks, generous air, dark/cream rhythm. Client
 * component only for the copy-hex interaction; everything else is static.
 */
import { useState } from 'react';
import Image from 'next/image';
import { Check, Copy, DownloadSimple, ArrowUpRight, X } from '@phosphor-icons/react/dist/ssr';
import { FadeUp } from '@/components/ui/FadeUp';
import type {
  Brand,
  BrandColor,
  BrandImage,
  BrandLogoVariant,
  BrandMisuse,
  BrandPairing,
  BrandPrinciple,
  BrandProduct,
  BrandRule,
  BrandSpec,
  BrandTypeStyle,
} from '@/data/brands';

/* ── chapter scaffolding ────────────────────────────────────────────────── */

export function Chapter({
  id,
  n,
  label,
  title,
  accent,
  dark,
  children,
}: {
  id: string;
  n: string;
  label: string;
  title: string;
  /** Playfair accent line inside the title, coloured per surface. */
  accent?: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={
        dark
          ? 'bg-brand-dark text-brand-cream py-20 sm:py-28'
          : 'bg-brand-cream text-text-primary py-20 sm:py-28'
      }
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <FadeUp>
          <p
            className={`text-[0.6875rem] font-bold uppercase tracking-[0.22em] mb-4 ${
              dark ? 'text-brand-accent' : 'text-brand-accent-on-light'
            }`}
          >
            {n} · {label}
          </p>
          <h2 className="font-sans font-bold text-[2rem] sm:text-[2.75rem] leading-[1.08] tracking-tight max-w-3xl">
            {title}
            {accent && (
              <>
                {' '}
                <em
                  className={`font-serif italic font-normal ${
                    dark ? 'text-brand-accent' : 'text-brand-accent-on-light'
                  }`}
                >
                  {accent}
                </em>
              </>
            )}
          </h2>
        </FadeUp>
        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  );
}

/* ── logo ───────────────────────────────────────────────────────────────── */

export function LogoShowcase({ logos, rules, dark }: { logos: BrandLogoVariant[]; rules: BrandRule[]; dark?: boolean }) {
  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
        {logos.map((logo) => (
          <FadeUp key={logo.name}>
            <figure
              className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] aspect-[4/3] flex items-center justify-center p-8"
              style={{ backgroundColor: logo.bg }}
            >
              <Image
                src={logo.src}
                alt={`${logo.name} logo variant`}
                width={220}
                height={110}
                className="max-h-20 w-auto object-contain"
              />
            </figure>
            <figcaption className="mt-3">
              <p className="text-sm font-semibold">{logo.name}</p>
              <p className={`text-sm ${dark ? 'text-brand-cream/70' : 'text-text-secondary'}`}>{logo.note}</p>
            </figcaption>
          </FadeUp>
        ))}
      </div>

      <div className="mt-12 grid sm:grid-cols-2 gap-x-10 gap-y-4">
        {rules.map((rule) => (
          <div key={rule.text} className="flex items-start gap-3">
            {rule.kind === 'do' ? (
              <Check
                size={18}
                weight="bold"
                className={`mt-0.5 shrink-0 ${dark ? 'text-brand-accent' : 'text-brand-accent-on-light'}`}
              />
            ) : (
              <X size={18} weight="bold" className="mt-0.5 shrink-0 text-[#b3564d]" />
            )}
            <p className={`text-[0.9375rem] leading-relaxed ${dark ? 'text-brand-cream/85' : 'text-text-primary/85'}`}>
              {rule.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── colour ─────────────────────────────────────────────────────────────── */

function Swatch({ color }: { color: BrandColor }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(color.hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard denied — the hex is printed right there anyway */
    }
  };
  return (
    <FadeUp>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${color.name} ${color.hex}`}
        className="group w-full text-left rounded-xl overflow-hidden border border-black/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-on-light"
      >
        <div
          className="h-32 sm:h-40 flex items-end justify-between p-4 transition-transform duration-200 group-hover:scale-[1.01]"
          style={{ backgroundColor: color.hex, color: color.on }}
        >
          <span className="font-mono text-[0.8125rem] tracking-wide">{color.hex}</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {copied ? <Check size={16} weight="bold" /> : <Copy size={16} />}
          </span>
        </div>
        <div className="bg-white px-4 py-3">
          <p className="text-sm font-semibold text-text-primary">{color.name}</p>
          <p className="text-[0.8125rem] leading-snug text-text-secondary mt-0.5">{color.usage}</p>
        </div>
      </button>
    </FadeUp>
  );
}

export function ColorGrid({ colors, note, dark }: { colors: BrandColor[]; note: string; dark?: boolean }) {
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {colors.map((c) => (
          <Swatch key={c.hex} color={c} />
        ))}
      </div>
      <p
        className={`mt-10 max-w-2xl text-[0.9375rem] leading-relaxed ${
          dark ? 'text-brand-cream/70' : 'text-text-secondary'
        }`}
      >
        {note}
      </p>
    </div>
  );
}

/* ── typography ─────────────────────────────────────────────────────────── */

export function TypeSpecimen({ styles, note, dark }: { styles: BrandTypeStyle[]; note: string; dark?: boolean }) {
  return (
    <div>
      <div className={`divide-y ${dark ? 'divide-brand-cream/10' : 'divide-black/[0.08]'}`}>
        {styles.map((t) => (
          <FadeUp key={t.role}>
            <div className="py-8 first:pt-0 grid sm:grid-cols-[220px_1fr] gap-3 sm:gap-8 items-baseline">
              <div>
                <p className="text-sm font-semibold">{t.role}</p>
                <p className={`text-[0.8125rem] mt-1 ${dark ? 'text-brand-cream/60' : 'text-text-secondary'}`}>
                  {t.family}
                  <br />
                  {t.spec}
                </p>
              </div>
              <p className="text-[1.75rem] sm:text-[2.25rem] leading-[1.15] break-words" style={t.css}>
                {t.sample}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
      <p className={`mt-8 max-w-2xl text-[0.9375rem] leading-relaxed ${dark ? 'text-brand-cream/70' : 'text-text-secondary'}`}>
        {note}
      </p>
    </div>
  );
}

/* ── voice ──────────────────────────────────────────────────────────────── */

export function VoicePrinciples({ intro, principles, dark }: { intro: string; principles: BrandPrinciple[]; dark?: boolean }) {
  return (
    <div>
      <p className={`max-w-2xl text-lg leading-relaxed ${dark ? 'text-brand-cream/85' : 'text-text-primary/85'}`}>{intro}</p>
      <div className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-8">
        {principles.map((p, i) => (
          <FadeUp key={p.title}>
            <p className={`font-mono text-[0.75rem] mb-2 ${dark ? 'text-brand-accent' : 'text-brand-accent-on-light'}`}>
              {String(i + 1).padStart(2, '0')}
            </p>
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className={`mt-1.5 text-[0.9375rem] leading-relaxed ${dark ? 'text-brand-cream/70' : 'text-text-secondary'}`}>
              {p.body}
            </p>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}

/* ── downloads ──────────────────────────────────────────────────────────── */

export function DownloadBlock({ brand }: { brand: Brand }) {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      <a
        href={brand.download.href}
        download
        className="group flex items-start justify-between gap-4 rounded-xl border border-brand-cream/[0.16] bg-brand-cream/[0.04] p-6 hover:bg-brand-cream/[0.08] transition-colors duration-200"
      >
        <div>
          <p className="font-semibold text-brand-cream">{brand.download.label}</p>
          <p className="text-sm text-brand-cream/65 mt-1">{brand.download.contents}</p>
        </div>
        <DownloadSimple size={22} className="shrink-0 text-brand-accent group-hover:translate-y-0.5 transition-transform duration-200" />
      </a>
      <a
        href={brand.site.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start justify-between gap-4 rounded-xl border border-brand-cream/[0.16] bg-brand-cream/[0.04] p-6 hover:bg-brand-cream/[0.08] transition-colors duration-200"
      >
        <div>
          <p className="font-semibold text-brand-cream">See it live</p>
          <p className="text-sm text-brand-cream/65 mt-1">{brand.site.label}</p>
        </div>
        <ArrowUpRight size={22} className="shrink-0 text-brand-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
      </a>
    </div>
  );
}

/* ── shared rule list (do / don't) ──────────────────────────────────────── */

export function RuleList({ rules, dark }: { rules: BrandRule[]; dark?: boolean }) {
  return (
    <div className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
      {rules.map((rule) => (
        <div key={rule.text} className="flex items-start gap-3">
          {rule.kind === 'do' ? (
            <Check
              size={18}
              weight="bold"
              className={`mt-0.5 shrink-0 ${dark ? 'text-brand-accent' : 'text-brand-accent-on-light'}`}
            />
          ) : (
            <X size={18} weight="bold" className="mt-0.5 shrink-0 text-[#b3564d]" />
          )}
          <p className={`text-[0.9375rem] leading-relaxed ${dark ? 'text-brand-cream/85' : 'text-text-primary/85'}`}>
            {rule.text}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ── overview: story + principles ───────────────────────────────────────── */

export function StoryPrinciples({ story, principles, dark }: { story: string; principles: BrandPrinciple[]; dark?: boolean }) {
  return (
    <div>
      <p className={`max-w-2xl text-lg leading-relaxed ${dark ? 'text-brand-cream/85' : 'text-text-primary/85'}`}>{story}</p>
      <div className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-8">
        {principles.map((p, i) => (
          <FadeUp key={p.title}>
            <p className={`font-mono text-[0.75rem] mb-2 ${dark ? 'text-brand-accent' : 'text-brand-accent-on-light'}`}>
              {String(i + 1).padStart(2, '0')}
            </p>
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className={`mt-1.5 text-[0.9375rem] leading-relaxed ${dark ? 'text-brand-cream/70' : 'text-text-secondary'}`}>
              {p.body}
            </p>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}

/* ── logo misuse gallery — GENERATED from the real mark via CSS ─────────── */

const MISUSE_STYLE: Record<BrandMisuse['kind'], React.CSSProperties> = {
  stretch: { transform: 'scaleX(1.6)' },
  rotate: { transform: 'rotate(-14deg)' },
  recolour: { filter: 'hue-rotate(120deg) saturate(3)' },
  effects: { filter: 'drop-shadow(0 6px 4px rgba(0,0,0,0.9)) drop-shadow(0 0 10px rgba(255,255,255,0.7))' },
  crowd: {},
  lowcontrast: { opacity: 0.35 },
};

export function MisuseGrid({ misuse, mark, dark }: { misuse: BrandMisuse[]; mark: { src: string; bg: string }; dark?: boolean }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {misuse.map((m) => (
        <FadeUp key={m.kind}>
          <figure
            className="relative rounded-xl border border-black/[0.08] aspect-[4/3] flex items-center justify-center p-8 overflow-hidden"
            style={{ backgroundColor: m.kind === 'lowcontrast' ? '#5a4756' : mark.bg }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={mark.src}
              alt=""
              aria-hidden="true"
              className="max-h-14 w-auto object-contain"
              style={MISUSE_STYLE[m.kind]}
            />
            {m.kind === 'crowd' && (
              <p
                className="absolute inset-x-3 bottom-2 text-[0.625rem] leading-tight text-center"
                style={{ color: 'rgba(255,251,245,0.85)' }}
                aria-hidden="true"
              >
                Text pressed right up against the mark with no room to breathe at all
              </p>
            )}
            <span className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 rounded-full bg-[#b3564d]">
              <X size={13} weight="bold" className="text-white" />
            </span>
          </figure>
          <figcaption className={`mt-2.5 text-sm font-medium ${dark ? 'text-brand-cream/85' : 'text-text-primary/85'}`}>
            {m.label}
          </figcaption>
        </FadeUp>
      ))}
    </div>
  );
}

/* ── colour pairings — allowed and banned, shown live ───────────────────── */

export function PairingTable({ pairings, dark }: { pairings: BrandPairing[]; dark?: boolean }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
      {pairings.map((p) => (
        <FadeUp key={p.label}>
          <div className="rounded-xl overflow-hidden border border-black/[0.08]">
            <div className="h-20 flex items-center px-5" style={{ backgroundColor: p.bg }}>
              <span className="text-lg font-semibold" style={{ color: p.fg }}>
                Aa — {p.label.split(' on ')[0]}
              </span>
            </div>
            <div className="bg-white px-4 py-3 flex items-start gap-2.5">
              {p.ok ? (
                <Check size={16} weight="bold" className="mt-0.5 shrink-0 text-brand-accent-on-light" />
              ) : (
                <X size={16} weight="bold" className="mt-0.5 shrink-0 text-[#b3564d]" />
              )}
              <div>
                <p className="text-sm font-semibold text-text-primary">{p.label}</p>
                <p className="text-[0.8125rem] leading-snug text-text-secondary mt-0.5">{p.note}</p>
              </div>
            </div>
          </div>
        </FadeUp>
      ))}
    </div>
  );
}

/* ── motion specs ───────────────────────────────────────────────────────── */

export function MotionSpecs({ intro, specs, dark }: { intro: string; specs: BrandSpec[]; dark?: boolean }) {
  return (
    <div>
      <p className={`max-w-2xl text-lg leading-relaxed ${dark ? 'text-brand-cream/85' : 'text-text-primary/85'}`}>{intro}</p>
      <div className={`mt-10 divide-y ${dark ? 'divide-brand-cream/10' : 'divide-black/[0.08]'}`}>
        {specs.map((s) => (
          <div key={s.name} className="py-5 first:pt-0 grid sm:grid-cols-[220px_180px_1fr] gap-2 sm:gap-8 items-baseline">
            <p className="text-sm font-semibold">{s.name}</p>
            <p className={`font-mono text-[0.8125rem] ${dark ? 'text-brand-accent' : 'text-brand-accent-on-light'}`}>{s.value}</p>
            <p className={`text-[0.9375rem] leading-relaxed ${dark ? 'text-brand-cream/70' : 'text-text-secondary'}`}>{s.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── iconography ────────────────────────────────────────────────────────── */

export function IconographyBlock({ intro, rules, dark }: { intro: string; rules: string[]; dark?: boolean }) {
  return (
    <div>
      <p className={`max-w-2xl text-lg leading-relaxed ${dark ? 'text-brand-cream/85' : 'text-text-primary/85'}`}>{intro}</p>
      <div className={`mt-8 flex items-center gap-6 sm:gap-8 rounded-xl border px-6 py-5 w-fit ${dark ? 'border-brand-cream/[0.14]' : 'border-black/[0.08]'}`}>
        <Check size={22} />
        <Copy size={22} />
        <DownloadSimple size={22} />
        <ArrowUpRight size={22} />
        <X size={22} />
      </div>
      <ul className="mt-8 space-y-3 max-w-2xl">
        {rules.map((r) => (
          <li key={r} className="flex items-start gap-3">
            <Check size={18} weight="bold" className={`mt-0.5 shrink-0 ${dark ? 'text-brand-accent' : 'text-brand-accent-on-light'}`} />
            <p className={`text-[0.9375rem] leading-relaxed ${dark ? 'text-brand-cream/85' : 'text-text-primary/85'}`}>{r}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── imagery ────────────────────────────────────────────────────────────── */

export function ImageryGrid({ intro, images, dark }: { intro: string; images: BrandImage[]; dark?: boolean }) {
  return (
    <div>
      <p className={`max-w-2xl text-lg leading-relaxed ${dark ? 'text-brand-cream/85' : 'text-text-primary/85'}`}>{intro}</p>
      <div className="mt-10 grid sm:grid-cols-3 gap-4 sm:gap-5">
        {images.map((img) => (
          <FadeUp key={img.src}>
            <figure className="rounded-xl overflow-hidden border border-black/[0.08]">
              <Image src={img.src} alt={img.alt} width={800} height={800} className="w-full h-auto" />
            </figure>
            <figcaption className={`mt-2.5 text-sm leading-snug ${dark ? 'text-brand-cream/70' : 'text-text-secondary'}`}>
              {img.caption}
            </figcaption>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}

/* ── product (e.g. Barakah Blueprint within Shareefico) ─────────────────── */

export function ProductBlock({ product, dark }: { product: BrandProduct; dark?: boolean }) {
  return (
    <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
      {product.image && (
        <FadeUp>
          <div className="rounded-2xl overflow-hidden border border-black/[0.08]">
            <Image src={product.image.src} alt={product.image.alt} width={1600} height={900} sizes="(min-width: 768px) 50vw, 100vw" className="w-full h-auto" />
          </div>
        </FadeUp>
      )}
      <FadeUp>
        <p className={`text-[1.0625rem] leading-relaxed max-w-xl ${dark ? 'text-brand-cream/85' : 'text-text-primary/85'}`}>
          {product.body}
        </p>
        <ul className="mt-8 space-y-3">
          {product.rules.map((r) => (
            <li key={r} className="flex items-start gap-3">
              <Check size={18} weight="bold" className={`mt-0.5 shrink-0 ${dark ? 'text-brand-accent' : 'text-brand-accent-on-light'}`} />
              <p className={`text-[0.9375rem] leading-relaxed ${dark ? 'text-brand-cream/85' : 'text-text-primary/85'}`}>{r}</p>
            </li>
          ))}
        </ul>
      </FadeUp>
    </div>
  );
}

/* ── sticky chapter nav ─────────────────────────────────────────────────── */

export function ChapterNav({ chapters }: { chapters: { id: string; label: string }[] }) {
  return (
    <nav
      aria-label="Brand chapters"
      className="sticky top-0 z-30 bg-brand-dark/90 backdrop-blur-md border-b border-brand-cream/[0.10]"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-10 flex gap-5 sm:gap-7 overflow-x-auto scrollbar-none py-3.5">
        {chapters.map((c, i) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="shrink-0 text-[0.8125rem] text-brand-cream/70 hover:text-brand-cream transition-colors duration-200"
          >
            <span className="font-mono text-[0.6875rem] text-brand-accent mr-1.5">{String(i + 1).padStart(2, '0')}</span>
            {c.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
