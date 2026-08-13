import Image from 'next/image';
import Link from 'next/link';
import { CORE_COLOURS } from '@/data/brand-spec';

/**
 * The four ways into the portal.
 *
 * Each card previews the thing itself — the real mark, the real palette, the
 * real faces — rather than a photograph standing in for it. Borrowing a
 * picture of client work to illustrate "Colour" is how a brand portal ends up
 * showing another brand's palette on its own colour page.
 */
export function EntryCards({ markSrc, assetCount }: { markSrc: string; assetCount: number }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      <Card
        href="/brand/logo"
        label="Logo"
        note="Four cuts, clear space, and the eight things never to do to it."
      >
        <div className="flex h-full items-center justify-center p-10" style={{ backgroundColor: '#2f1c2c' }}>
          <Image
            src={markSrc}
            alt=""
            width={280}
            height={84}
            className="h-auto w-[min(240px,70%)]"
          />
        </div>
      </Card>

      <Card
        href="/brand/colour"
        label="Colour"
        note="A plum ground, warm cream, and one accent with two cuts."
      >
        <div className="flex h-full">
          {CORE_COLOURS.map((c) => (
            <div key={c.token} className="flex-1" style={{ backgroundColor: c.hex }} />
          ))}
        </div>
      </Card>

      <Card
        href="/brand/typography"
        label="Typography"
        note="Manrope does the work. Playfair marks one phrase."
      >
        <div
          className="flex h-full flex-col items-start justify-center gap-1 p-10"
          style={{ backgroundColor: '#fffbf5', color: '#2f1c2c' }}
        >
          <span className="font-sans text-[3.5rem] font-bold leading-none tracking-[-0.03em]">
            Aa
          </span>
          <span
            className="text-[2.25rem] leading-none"
            style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: '#6d4a66' }}
          >
            excellence
          </span>
        </div>
      </Card>

      <Card
        href="/brand/assets"
        label="Asset library"
        note={`${assetCount} files, generated from the working library.`}
      >
        <div
          className="flex h-full items-center justify-center p-8"
          style={{ backgroundColor: '#3a2437' }}
        >
          <div className="grid w-full max-w-[280px] grid-cols-4 gap-2.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="aspect-square rounded-md"
                style={{
                  backgroundColor: i % 3 === 0 ? '#cca4c2' : '#2f1c2c',
                  opacity: 0.35 + (i % 4) * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </Card>
    </ul>
  );
}

function Card({
  href,
  label,
  note,
  children,
}: {
  href: string;
  label: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group block overflow-hidden rounded-2xl border border-[var(--color-border)] transition-colors duration-200 hover:border-[var(--color-border-hover)]"
      >
        <div className="aspect-[16/10] overflow-hidden">{children}</div>
        <div className="p-6">
          <p className="font-[family-name:var(--font-display)] text-[1.25rem] font-semibold tracking-[-0.01em] group-hover:text-[var(--color-accent)]">
            {label}
          </p>
          <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--color-text-secondary)]">
            {note}
          </p>
        </div>
      </Link>
    </li>
  );
}
