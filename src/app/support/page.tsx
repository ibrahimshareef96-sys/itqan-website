import type { Metadata } from 'next';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { SupportForm } from '@/components/support/SupportForm';
import { FadeUp } from '@/components/ui/FadeUp';
import { LifebuoyIcon } from '@phosphor-icons/react/dist/ssr';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Support — Get Help From Itqan Studio',
  description:
    'Already working with Itqan Studio and something needs fixing? Send a support request and track it from a private link.',
  alternates: { canonical: '/support' },
};

/**
 * /support — for EXISTING clients with a problem.
 *
 * Kept separate from /contact on purpose. Contact is for new business and its
 * copy sells; someone whose site is down does not want to read about a Brand
 * Audit. This page does one thing.
 */
export default function SupportPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Support', path: '/support' },
        ])}
      />

      <section className="mx-auto max-w-2xl px-6 py-24 sm:py-32">
        <FadeUp>
          <SectionLabel icon={<LifebuoyIcon size={13} />} label="Support" />
          <h1 className="mt-4 text-3xl text-[#fffbf5] sm:text-4xl">Something not working?</h1>
          <p className="mt-4 text-base leading-relaxed text-[rgba(255,251,245,0.7)]">
            Tell us what is going on. You will get a private link to follow the request, see our
            replies, and answer without digging through your inbox.
          </p>
          <p className="mt-2 text-sm text-[rgba(255,251,245,0.5)]">
            Prefer email? Write to{' '}
            <a
              href="mailto:info@itqanstudio.com"
              className="underline underline-offset-4 hover:text-[#fffbf5]"
            >
              info@itqanstudio.com
            </a>
            . Looking to start a project instead?{' '}
            <a href="/contact" className="underline underline-offset-4 hover:text-[#fffbf5]">
              Book a call
            </a>
            .
          </p>
        </FadeUp>

        <div className="mt-12">
          <SupportForm />
        </div>
      </section>
    </>
  );
}
