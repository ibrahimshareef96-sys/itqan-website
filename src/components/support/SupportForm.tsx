'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from '@phosphor-icons/react';
import { SPRING_SNAPPY } from '@/lib/motion';

/**
 * Support request form. Unlike ContactForm (which emails an inbox via
 * /api/contact), this posts CROSS-ORIGIN into the CRM at
 * portal.itqanstudio.com/api/tickets/intake, which creates a tracked ticket and
 * emails the requester a private link to follow it.
 *
 * There is no local /api route on purpose: adding one would mean this
 * marketing site needed the CRM's credentials. The CRM owns the ticket; this
 * site only hands it the request. The CRM's CORS allowlist names this origin.
 */

type FormValues = {
  name: string;
  email: string;
  company: string;
  subject: string;
  requestType: string;
  deviceType: string;
  message: string;
  /**
   * Honeypot. Named hp_ref rather than something plausible like
   * "companyWebsite" precisely so browser autofill and password managers do
   * NOT fill it — an autofilled honeypot silently discards a real person's
   * request and neither side ever finds out.
   */
  hp_ref: string;
};

const inputClass =
  'w-full bg-[rgba(255,251,245,0.04)] border border-[rgba(255,251,245,0.15)] rounded-xl px-4 py-3 text-sm text-[#fffbf5] placeholder:text-[rgba(255,251,245,0.4)] focus:outline-none focus:border-[rgba(255,251,245,0.35)] focus:ring-2 focus:ring-[rgba(255,251,245,0.1)] transition-all duration-300';

const labelClass = 'block text-xs font-semibold text-[rgba(255,251,245,0.75)] tracking-wide mb-2';

const errorClass = 'text-red-400 text-xs mt-1.5';

const CRM_ORIGIN = (
  process.env.NEXT_PUBLIC_CRM_ORIGIN || 'https://portal.itqanstudio.com'
).replace(/\/+$/, '');

export function SupportForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onValid = async (values: FormValues) => {
    setSubmitError(null);
    try {
      const res = await fetch(`${CRM_ORIGIN}/api/tickets/intake`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (res.ok && data.ok) {
        // `reference` is absent when the honeypot fired — the response is
        // deliberately indistinguishable from success, so never render it blind.
        setReference(typeof data.reference === 'string' ? data.reference : null);
        setDone(true);
      } else {
        setSubmitError(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitError('Network error. Please try again, or email info@itqanstudio.com.');
    }
  };

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SPRING_SNAPPY}
        className="rounded-xl border border-[rgba(255,251,245,0.15)] bg-[rgba(255,251,245,0.04)] p-8 text-center"
      >
        <CheckCircle size={32} weight="light" className="mx-auto mb-4 text-[#fffbf5]" />
        <h2 className="text-xl text-[#fffbf5]">We have your request</h2>
        {reference && (
          <p className="mt-2 text-sm text-[rgba(255,251,245,0.75)]">
            Your reference is <span className="font-mono">{reference}</span>.
          </p>
        )}
        <p className="mt-3 text-sm text-[rgba(255,251,245,0.6)]">
          Check your email for a private link. You can read our replies and answer there, or just
          reply to the email.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onValid)} noValidate className="space-y-5">
      <div>
        <label htmlFor="sup-name" className={labelClass}>
          Your name
        </label>
        <input
          id="sup-name"
          className={inputClass}
          placeholder="Sara Haddad"
          {...register('name', { required: 'Please tell us your name.', maxLength: 120 })}
        />
        {errors.name && <p className={errorClass}>{errors.name.message}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="sup-email" className={labelClass}>
            Email
          </label>
          <input
            id="sup-email"
            type="email"
            className={inputClass}
            placeholder="you@company.com"
            {...register('email', {
              required: 'We need an email to reply to.',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'That email looks off.' },
            })}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="sup-company" className={labelClass}>
            Company <span className="font-normal opacity-60">(optional)</span>
          </label>
          <input
            id="sup-company"
            className={inputClass}
            placeholder="Acme"
            {...register('company', { maxLength: 160 })}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="sup-request-type" className={labelClass}>
            Request type
          </label>
          <select
            id="sup-request-type"
            className={inputClass}
            defaultValue=""
            {...register('requestType', { required: 'Pick what this is about.' })}
          >
            <option value="" disabled>
              Choose one…
            </option>
            <option value="issue">Something is broken</option>
            <option value="question">A question</option>
            <option value="billing">Billing</option>
            <option value="feature">A request / idea</option>
            <option value="other">Something else</option>
          </select>
          {errors.requestType && <p className={errorClass}>{errors.requestType.message}</p>}
        </div>

        <div>
          <label htmlFor="sup-device-type" className={labelClass}>
            Device <span className="font-normal opacity-60">(optional)</span>
          </label>
          <select id="sup-device-type" className={inputClass} defaultValue="" {...register('deviceType')}>
            <option value="">Not device-specific</option>
            <option value="web">Web / browser</option>
            <option value="mobile">Mobile</option>
            <option value="desktop">Desktop</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="sup-subject" className={labelClass}>
          What is this about?
        </label>
        <input
          id="sup-subject"
          className={inputClass}
          placeholder="Cannot log in to the portal"
          {...register('subject', { required: 'A short subject helps us route it.', maxLength: 200 })}
        />
        {errors.subject && <p className={errorClass}>{errors.subject.message}</p>}
      </div>

      <div>
        <label htmlFor="sup-message" className={labelClass}>
          Tell us what is happening
        </label>
        <textarea
          id="sup-message"
          rows={6}
          className={inputClass}
          placeholder="What you expected, what happened instead, and anything you have already tried."
          {...register('message', { required: 'Please describe the problem.', maxLength: 8000 })}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      {/* Honeypot. Hidden from people and from assistive tech; bots fill it. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="hp_ref">Leave this field empty</label>
        <input id="hp_ref" tabIndex={-1} autoComplete="off" {...register('hp_ref')} />
      </div>

      {submitError && <p className={errorClass}>{submitError}</p>}

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileTap={{ scale: 0.98 }}
        transition={SPRING_SNAPPY}
        className="inline-flex items-center gap-2 rounded-xl bg-[#fffbf5] px-6 py-3 text-sm font-semibold text-[#0a0a0a] transition-opacity disabled:opacity-60"
      >
        {isSubmitting ? 'Sending…' : 'Send request'}
        {!isSubmitting && <ArrowRight size={16} weight="bold" />}
      </motion.button>
    </form>
  );
}
