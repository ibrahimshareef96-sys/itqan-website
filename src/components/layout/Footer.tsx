import Image from 'next/image';
import { InstagramLogo, LinkedinLogo } from '@phosphor-icons/react/dist/ssr';
import { NewsletterForm } from './NewsletterForm';

export function Footer() {
  return (
    <footer className="bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-10">

        {/* Top row */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12 mb-12">
          <div className="flex-shrink-0">
            <Image
              src="/images/brand/light-logo.svg"
              alt="Itqan Studio"
              width={128}
              height={36}
            />
            <p className="mt-5 text-brand-cream/45 text-sm leading-relaxed max-w-[220px]">
              Your brand has potential.<br />
              We give it direction.
            </p>
          </div>

          <div className="lg:max-w-[380px] w-full">
            <p className="text-brand-cream text-sm font-semibold mb-3.5 tracking-wide">
              Subscribe to Our Newsletter
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.1] mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-brand-cream/40 text-sm">
            Copyright &copy; 2026 &mdash; Itqan Studio FZ LLC
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/madebyitqan/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-brand-cream/45 hover:text-brand-cream transition-colors duration-200"
            >
              <InstagramLogo size={18} />
            </a>
            <a
              href="https://www.linkedin.com/company/110338926/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3B07ZgNyX0RYqqdIn%2FtdL06w%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-brand-cream/45 hover:text-brand-cream transition-colors duration-200"
            >
              <LinkedinLogo size={18} />
            </a>
          </div>
        </div>

        <p className="mt-4 text-brand-cream/20 text-xs">
          Made with ♥ by The Itqan Team
        </p>
      </div>
    </footer>
  );
}
