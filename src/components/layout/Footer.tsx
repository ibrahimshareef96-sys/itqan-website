import Image from 'next/image';
import { InstagramLogo, LinkedinLogo, PaperPlaneTilt } from '@phosphor-icons/react/dist/ssr';

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
            <div className="flex items-center gap-2.5">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/[0.07] border border-white/[0.13] rounded-full px-4 py-2.5 text-sm text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-accent/50 transition-colors"
              />
              <button
                className="w-10 h-10 flex-shrink-0 bg-brand-accent rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-accent/80 transition-colors"
                aria-label="Subscribe to newsletter"
              >
                <PaperPlaneTilt size={15} weight="fill" />
              </button>
            </div>
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
