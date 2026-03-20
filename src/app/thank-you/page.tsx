import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Message Received',
  description: "We've received your message and will be in touch within 48 hours.",
};

export default function ThankYouPage() {
  return (
    <section className="bg-brand-cream min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="flex justify-center mb-8">
          <CheckCircle size={56} weight="fill" className="text-brand-accent-on-light" />
        </div>

        <h1 className="font-sans font-bold text-4xl md:text-5xl text-brand-dark leading-tight tracking-tight">
          Message received!
        </h1>
        <p className="font-serif italic text-4xl md:text-5xl text-brand-accent-on-light leading-tight tracking-tight mt-2">
          We&apos;ll be in touch soon.
        </p>

        <p className="mt-7 text-text-secondary text-base leading-relaxed">
          Thank you for reaching out. We&apos;ll review your message and get back to you within
          48 hours. Looking forward to working together.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-brand-dark text-brand-cream px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity duration-200"
          >
            Back to home
            <ArrowRight size={14} weight="bold" />
          </Link>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 border border-brand-dark/25 text-brand-dark px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-dark hover:text-brand-cream transition-colors duration-200"
          >
            View our work
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
}
