/**
 * Partner credibility strip. Itqan is a registered partner in the AWS and Shopify
 * partner programs — shown as accurate "Partner" badges (NOT "trusted by", which
 * would imply AWS/Shopify are clients/endorsers). Wordmarks are set as clean text
 * rather than the trademarked logos, so there is no brand-asset licensing issue.
 *
 * Server-safe (no hooks / no 'use client'); rendered inside the client HeroAxion.
 * Dual-accent compliant: deep mauve on light, soft mauve on dark.
 */

interface Partner {
  name: string;
  program: string;
}

const partners: Partner[] = [
  { name: 'AWS', program: 'Partner' },
  { name: 'Shopify', program: 'Partner' },
];

function SealCheck({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" className={className} fill="currentColor" aria-hidden="true">
      <path d="M225.86 102.82c-3.77-3.94-7.67-8-9.14-11.57-1.36-3.27-1.44-8.69-1.52-13.94-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52-3.57-1.47-7.63-5.37-11.57-9.14C146.28 23.51 138.44 16 128 16s-18.27 7.51-25.18 14.14c-3.94 3.77-8 7.67-11.57 9.14-3.27 1.36-8.69 1.44-13.94 1.52-9.76.15-20.82.31-28.51 8s-7.85 18.75-8 28.51c-.08 5.25-.16 10.67-1.52 13.94-1.47 3.57-5.37 7.63-9.14 11.57C23.51 109.72 16 117.56 16 128s7.51 18.27 14.14 25.18c3.77 3.94 7.67 8 9.14 11.57 1.36 3.27 1.44 8.69 1.52 13.94.15 9.76.31 20.82 8 28.51s18.75 7.85 28.51 8c5.25.08 10.67.16 13.94 1.52 3.57 1.47 7.63 5.37 11.57 9.14C109.72 232.49 117.56 240 128 240s18.27-7.51 25.18-14.14c3.94-3.77 8-7.67 11.57-9.14 3.27-1.36 8.69-1.44 13.94-1.52 9.76-.15 20.82-.31 28.51-8s7.85-18.75 8-28.51c.08-5.25.16-10.67 1.52-13.94 1.47-3.57 5.37-7.63 9.14-11.57C232.49 146.28 240 138.44 240 128s-7.51-18.28-14.14-25.18Zm-52.2 6.84-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32Z" />
    </svg>
  );
}

export function PartnerStrip() {
  return (
    <div className="mt-8 sm:mt-10 pt-6 sm:pt-7 border-t border-black/[0.08] dark:border-brand-cream/[0.12]">
      <p className="text-[0.6875rem] sm:text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-text-secondary dark:text-brand-cream/50 mb-3.5">
        Technology partners
      </p>
      <ul className="flex flex-wrap items-center gap-3">
        {partners.map(({ name, program }) => (
          <li
            key={name}
            className="inline-flex items-center gap-2 rounded-[8px] bg-white dark:bg-[#2a1a28] border border-black/[0.08] dark:border-brand-cream/[0.12] px-3.5 py-2 shadow-[0_1px_6px_rgba(47,28,44,0.06)]"
          >
            <SealCheck className="w-4 h-4 text-brand-accent-on-light dark:text-brand-accent flex-shrink-0" />
            <span className="text-[0.875rem] font-bold tracking-tight text-text-primary dark:text-brand-cream">
              {name}
            </span>
            <span className="text-[0.75rem] font-medium text-text-secondary dark:text-brand-cream/60">
              {program}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
