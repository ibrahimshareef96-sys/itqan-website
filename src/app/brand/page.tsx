import Link from 'next/link';
import type { Metadata } from 'next';
import { PORTAL_NAV } from '@/data/brand-portal';
import { ALL_ASSETS } from '@/data/brand-library';
import { Callout, PortalPageBody, Section } from '@/components/brand/primitives';

export const metadata: Metadata = {
  /*
   * Absolute, not 'Overview'.
   *
   * A layout's title.template applies to CHILD segments, not to the page in
   * its own segment — so a bare title here would fall through to the site-wide
   * template and this page would read "Overview | Itqan Studio".
   */
  title: { absolute: 'Itqan Studio Brand Portal' },
  description:
    'The Itqan Studio brand portal: logo, colour, typography, motion, voice and every downloadable asset.',
};

const shippable = ALL_ASSETS.filter((a) => a.src).length;

export default function BrandOverviewPage() {
  return (
    <PortalPageBody href="/brand" title="The Itqan Studio brand">
      <Section>
        <p className="text-[1.0625rem] leading-relaxed text-[var(--color-text-secondary)]">
          Itqan means excellence in Arabic — specifically the kind that comes
          from doing a thing properly rather than quickly. The brand exists so
          that standard is visible before a client has read a word: in the
          restraint of the palette, the space around the work, and the refusal
          to oversell.
        </p>
        <p className="mt-5 text-[1.0625rem] leading-relaxed text-[var(--color-text-secondary)]">
          This portal is the reference. Everything in it is generated from the
          live design system and the real asset library, so what you see here is
          what actually ships.
        </p>
      </Section>

      <Section title="Start here">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { href: '/brand/logo', label: 'Logo', note: 'Marks, clear space, misuse' },
            { href: '/brand/colour', label: 'Colour', note: 'The dual-accent rule, measured' },
            { href: '/brand/typography', label: 'Typography', note: 'Manrope and one italic' },
            { href: '/brand/assets', label: 'Asset library', note: `${shippable} downloadable files` },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group rounded-xl border border-[var(--color-border)] p-5 transition-colors duration-150 hover:border-[var(--color-border-hover)]"
            >
              <p className="font-[family-name:var(--font-display)] text-[1.0625rem] font-semibold group-hover:text-[var(--color-accent)]">
                {c.label}
              </p>
              <p className="mt-1 text-[0.8125rem] text-[var(--color-text-secondary)]">{c.note}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Callout tone="warning" title="The rule people break first">
        Itqan has two accent colours, not one. Mauve{' '}
        <code className="font-[family-name:var(--font-mono)] text-[0.8125rem]">#cca4c2</code> is for
        dark surfaces only — on cream it measures 2.11:1 and is effectively
        unreadable. Light surfaces use Deep Mauve{' '}
        <code className="font-[family-name:var(--font-mono)] text-[0.8125rem]">#6d4a66</code>. This
        is the most common mistake in the system.
      </Callout>

      <Callout tone="tip" title="Looking for one thing">
        Search covers every page and every asset by name. Press{' '}
        <kbd className="rounded border border-[var(--color-border)] px-1 font-[family-name:var(--font-mono)] text-[0.75rem]">
          ⌘K
        </kbd>{' '}
        from anywhere in the portal.
      </Callout>

      <Section title="What is in here">
        <dl className="space-y-6">
          {PORTAL_NAV.map((cat) => (
            <div key={cat.label}>
              <dt className="t-eyebrow mb-2">{cat.label}</dt>
              <dd className="text-[0.9375rem] leading-relaxed text-[var(--color-text-secondary)]">
                {cat.items.map((s) => s.label).join(' · ')}
              </dd>
            </div>
          ))}
        </dl>
      </Section>
    </PortalPageBody>
  );
}
