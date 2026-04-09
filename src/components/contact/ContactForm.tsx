'use client';

import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ArrowRight } from '@phosphor-icons/react';
import { SPRING_SNAPPY } from '@/lib/motion';

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
  'w-full bg-white border border-brand-accent/20 rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-brand-accent-on-light/50 focus:ring-2 focus:ring-brand-accent/20 focus:shadow-[0_0_0_3px_rgba(109,74,102,0.1)] transition-all duration-300';

const labelClass = 'block text-xs font-semibold text-text-primary tracking-wide mb-2';

const errorClass = 'text-red-500 text-xs mt-1.5';

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  // handleSubmit runs validation; on success the form submits naturally to Formspree
  const onValid = () => {
    const form = document.getElementById('contact-form') as HTMLFormElement;
    form.submit();
  };

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit(onValid)}
      action="https://formspree.io/f/xlgpqnjl"
      method="POST"
      className="space-y-5"
      noValidate
    >
      <input type="hidden" name="_next" value="https://itqanstudio.com/thank-you" />
      <input type="hidden" name="_subject" value="New inquiry from Itqan Studio website" />

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

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full inline-flex items-center justify-center gap-2 bg-brand-dark text-brand-cream py-4 rounded-xl text-sm font-semibold hover:opacity-90 transition-all duration-200 disabled:opacity-60"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={SPRING_SNAPPY}
      >
        {isSubmitting ? 'Sending…' : 'Send Message'}
        <ArrowRight size={15} weight="bold" />
      </motion.button>
    </form>
  );
}
