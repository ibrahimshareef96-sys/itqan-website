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
  BrandLogoVariant,
  BrandPrinciple,
  BrandRule,
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
