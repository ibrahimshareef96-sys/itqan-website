'use client';

import { useState } from 'react';
import { PaperPlaneTilt } from '@phosphor-icons/react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // ConvertKit integration will be connected later
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <p className="text-brand-cream/60 text-sm py-2.5">
        Thank you for subscribing!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2.5">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-1 bg-white/[0.07] border border-white/[0.13] rounded-full px-4 py-2.5 text-sm text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-accent/50 transition-colors"
      />
      <button
        type="submit"
        className="w-10 h-10 flex-shrink-0 bg-brand-accent rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-accent/80 transition-colors"
        aria-label="Subscribe to newsletter"
      >
        <PaperPlaneTilt size={15} weight="fill" />
      </button>
    </form>
  );
}
