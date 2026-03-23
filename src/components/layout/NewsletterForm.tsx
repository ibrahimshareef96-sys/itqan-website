'use client';

import { useState } from 'react';
import { PaperPlaneTilt } from '@phosphor-icons/react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('email_address', email);

      const res = await fetch('https://app.kit.com/forms/9240792/subscriptions', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'success') {
    return (
      <p className="text-brand-cream/60 text-sm py-2.5">
        Success! Check your email to confirm.
      </p>
    );
  }

  return (
    <>
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
          disabled={isSubmitting}
          className="w-10 h-10 flex-shrink-0 bg-brand-accent rounded-full flex items-center justify-center text-brand-dark hover:bg-brand-accent/80 transition-colors disabled:opacity-60"
          aria-label="Subscribe to newsletter"
        >
          <PaperPlaneTilt size={15} weight="fill" />
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-400 text-xs mt-2">Something went wrong. Please try again.</p>
      )}
    </>
  );
}
