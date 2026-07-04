'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PaperPlaneTilt } from '@phosphor-icons/react';
import { SPRING_SNAPPY } from '@/lib/motion';

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
      <p className="text-text-secondary dark:text-brand-cream/60 text-sm py-2.5">
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
          className="flex-1 bg-black/[0.04] border border-black/[0.12] text-[#1a1a1a] placeholder:text-[#9a9a9a] dark:bg-white/[0.07] dark:border-white/[0.13] dark:text-brand-cream dark:placeholder:text-brand-cream/30 rounded-full px-4 py-2.5 text-sm transition-colors"
        />
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-10 h-10 flex-shrink-0 bg-brand-dark text-brand-cream dark:bg-brand-accent dark:text-brand-dark rounded-full flex items-center justify-center hover:opacity-80 transition-opacity disabled:opacity-60"
          aria-label="Subscribe to newsletter"
          whileTap={{ scale: 0.93 }}
          transition={SPRING_SNAPPY}
        >
          <PaperPlaneTilt size={15} weight="fill" />
        </motion.button>
      </form>
      {status === 'error' && (
        <p className="text-red-500 dark:text-red-400 text-xs mt-2">Something went wrong. Please try again.</p>
      )}
    </>
  );
}
