'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight } from '@phosphor-icons/react';

type FormValues = {
  name: string;
  email: string;
  company: string;
  website: string;
  budget: string;
  phone: string;
  message: string;
};

const inputClass =
  'w-full bg-white border border-brand-accent/20 rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-brand-accent/60 transition-colors';

const labelClass = 'block text-xs font-semibold text-text-primary tracking-wide mb-2';

const errorClass = 'text-red-500 text-xs mt-1.5';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch('https://formspree.io/f/xlgpqnjl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="py-12 text-center space-y-3">
        <p className="text-2xl font-bold text-text-primary">Thank you!</p>
        <p className="text-text-secondary">We'll be in touch within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {status === 'error' && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          Something went wrong. Please try again or email us at{' '}
          <a href="mailto:info@itqanstudio.com" className="underline">
            info@itqanstudio.com
          </a>
          .
        </p>
      )}

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>Name</label>
          <input
            id="name"
            type="text"
            placeholder="Your name"
            className={inputClass}
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Email</label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            className={inputClass}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' },
            })}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="company" className={labelClass}>Company</label>
          <input
            id="company"
            type="text"
            placeholder="Company name"
            className={inputClass}
            {...register('company')}
          />
        </div>
        <div>
          <label htmlFor="website" className={labelClass}>Website</label>
          <input
            id="website"
            type="text"
            placeholder="yoursite.com"
            className={inputClass}
            {...register('website')}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="budget" className={labelClass}>Budget</label>
          <select
            id="budget"
            className={`${inputClass} appearance-none cursor-pointer`}
            {...register('budget')}
          >
            <option value="">Select Budget...</option>
            <option value="1k-5k">$1,000 – $5,000</option>
            <option value="5k-10k">$5,000 – $10,000</option>
            <option value="10k-25k">$10,000 – $25,000</option>
            <option value="25k+">$25,000+</option>
          </select>
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>Phone</label>
          <input
            id="phone"
            type="tel"
            placeholder="+1 (000) 000-0000"
            className={inputClass}
            {...register('phone')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>Message</label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us about your project..."
          className={`${inputClass} resize-none`}
          {...register('message', { required: 'Message is required' })}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 bg-brand-dark text-brand-cream py-4 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity duration-200 disabled:opacity-60"
      >
        {isSubmitting ? 'Sending…' : 'Send Message'}
        <ArrowRight size={15} weight="bold" />
      </button>
    </form>
  );
}
