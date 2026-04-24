import Link from 'next/link';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';
import type { ReactNode } from 'react';

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <section className="bg-brand-dark min-h-[100dvh] pt-28 pb-24">
      <div className="max-w-[920px] mx-auto px-5 md:px-8">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-brand-cream/55 hover:text-brand-cream text-sm font-medium transition-colors duration-200 mb-12"
        >
          <ArrowLeft size={14} />
          Back to home
        </Link>

        {/* Page title */}
        <h1 className="font-sans font-medium text-[2rem] sm:text-4xl md:text-[2.75rem] text-brand-cream leading-tight tracking-tight">
          {title}
        </h1>
        <p className="mt-3 text-brand-cream/45 text-sm">
          Last updated: {lastUpdated}
        </p>

        {/* Content — Manrope 400, cream-tinted */}
        <div className="mt-12 font-sans font-normal text-brand-cream/75 text-[0.9375rem] leading-[1.7] space-y-6 legal-prose">
          {children}
        </div>

      </div>
    </section>
  );
}
