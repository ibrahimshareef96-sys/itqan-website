'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Star } from '@phosphor-icons/react';

type FormValues = {
  name: string;
  company: string;
  role: string;
  email: string;
  built: string;
  changed: string;
  quote: string;
  improve: string;
  publishOk: boolean;
  website: string; // honeypot
};

// Same field language as ContactForm so both forms read as one system.
const inputClass =
  'w-full bg-white dark:bg-[rgba(255,251,245,0.04)] border border-black/[0.12] dark:border-[rgba(255,251,245,0.15)] rounded-xl px-4 py-3 text-sm text-[#1a1a1a] dark:text-[#fffbf5] placeholder:text-[#9a9a9a] dark:placeholder:text-[rgba(255,251,245,0.4)] transition-colors duration-300';
const labelClass =
  'block text-xs font-semibold text-text-secondary dark:text-[rgba(255,251,245,0.75)] tracking-wide mb-2';
const errorClass = 'text-red-500 dark:text-red-400 text-xs mt-1.5';

interface FeedbackFormProps {
  /** Project slug from ?p= — travels with the submission so Ibrahim knows which engagement. */
  project?: string;
}

export function FeedbackForm({ project }: FeedbackFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [ratingError, setRatingError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onValid = async (values: FormValues) => {
    if (rating === 0) {
      setRatingError(true);
      return;
    }
    setSubmitError(null);
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, rating, project }),
      });
      const data = await res.json();
      if (res.ok && data.ok) setDone(true);
      else setSubmitError(data.error || 'Something went wrong. Please try again.');
    } catch {
      setSubmitError('Network error. Please try again.');
    }
  };

  if (done) {
    return (
      <div className="text-center py-16" role="status" aria-live="polite">
        <p className="font-display text-3xl md:text-4xl font-semibold text-text-primary dark:text-brand-cream">
          Thank you. Truly.
        </p>
        <p className="mt-4 text-text-secondary dark:text-[rgba(255,251,245,0.7)] max-w-md mx-auto leading-relaxed">
          Your words mean a lot to a small studio. If we publish them, we will show you
          exactly how they appear first.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onValid)} className="space-y-7" noValidate>
      {/* Rating first — one tap, sets the tone, feels effortless. */}
      <div>
        <label className={labelClass}>How was working with us?</label>
        <div className="flex gap-2" role="radiogroup" aria-label="Rating from 1 to 5 stars">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={rating === n}
              aria-label={`${n} of 5 stars`}
              onClick={() => {
                setRating(n);
                setRatingError(false);
              }}
              onMouseEnter={() => setHovered(n)}
              onMouseLeave={() => setHovered(0)}
              className="p-1 -m-1 transition-transform duration-150 hover:scale-110"
            >
              <Star
                size={38}
                weight={(hovered || rating) >= n ? 'fill' : 'regular'}
                className={
                  (hovered || rating) >= n
                    ? 'text-brand-accent-on-light dark:text-brand-accent'
                    : 'text-black/25 dark:text-[rgba(255,251,245,0.3)]'
                }
              />
            </button>
          ))}
        </div>
        {ratingError && <p className={errorClass}>Please pick a rating.</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fb-name" className={labelClass}>Your name *</label>
          <input
            id="fb-name"
            className={inputClass}
            autoComplete="name"
            {...register('name', { required: 'Please add your name' })}
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="fb-company" className={labelClass}>Company & role</label>
          <input
            id="fb-company"
            className={inputClass}
            placeholder="e.g. Founder, Lemon Garden"
            {...register('company')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="fb-quote" className={labelClass}>
          What would you tell someone thinking about working with Itqan? *
        </label>
        <textarea
          id="fb-quote"
          rows={4}
          className={inputClass}
          placeholder="Write it the way you would say it. A few honest sentences beat a polished paragraph."
          {...register('quote', { required: 'This is the one we really need' })}
        />
        {errors.quote && <p className={errorClass}>{errors.quote.message}</p>}
      </div>

      <div>
        <label htmlFor="fb-changed" className={labelClass}>
          What changed for you since we shipped?
        </label>
        <textarea
          id="fb-changed"
          rows={3}
          className={inputClass}
          placeholder="Before vs after — time saved, calls that stopped, things that just work now…"
          {...register('changed')}
        />
      </div>

      <div>
        <label htmlFor="fb-improve" className={labelClass}>
          Anything we should do better?
        </label>
        <textarea
          id="fb-improve"
          rows={2}
          className={inputClass}
          placeholder="Straight talk welcome — this one is just for us."
          {...register('improve')}
        />
      </div>

      <div>
        <label htmlFor="fb-email" className={labelClass}>Your email (optional)</label>
        <input
          id="fb-email"
          type="email"
          className={inputClass}
          autoComplete="email"
          placeholder="Only so we can say thank you"
          {...register('email')}
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer text-sm text-text-secondary dark:text-[rgba(255,251,245,0.75)] leading-relaxed">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 accent-current"
          {...register('publishOk')}
        />
        <span>
          Itqan Studio may publish my words with my name and company on their website and
          portfolio. (Leave unticked and your feedback stays private to the team.)
        </span>
      </label>

      {/* Honeypot — humans never see it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="fb-website">Leave empty</label>
        <input id="fb-website" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      {submitError && <p className={errorClass} role="alert">{submitError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-[#1a1a1a] dark:bg-brand-cream text-white dark:text-[#1a1a1a] font-semibold py-4 text-sm tracking-wide transition-opacity disabled:opacity-60"
      >
        {isSubmitting ? 'Sending…' : 'Send my feedback'}
      </button>

      <p className="text-xs text-center text-text-secondary/70 dark:text-[rgba(255,251,245,0.5)]">
        Takes about two minutes. Thank you for making the studio better.
      </p>
    </form>
  );
}
