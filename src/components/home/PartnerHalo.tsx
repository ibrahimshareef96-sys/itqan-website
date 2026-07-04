import { FadeUp } from '@/components/ui/FadeUp';
import { PARTNER_HALO_ENABLED } from '@/lib/flags';

/**
 * PARTNER_HALO — gated named-partner proof slot.
 * ---------------------------------------------------------------------------
 * A potential partnership with a globally renowned brand agency exists but is
 * NOT public and NOT signed. Nothing here names, implies, or references any
 * partner today. The component renders NOTHING unless the flag is on, so it is
 * safe to mount on the live homepage right now (default: OFF -> returns null).
 *
 * TO ACTIVATE LATER (once the partnership is public + signed), with NO rewrite:
 *   1. Set `NEXT_PUBLIC_PARTNER_HALO=1` in the deploy environment (Coolify).
 *   2. Replace the PLACEHOLDER copy below (eyebrow, headline, proof, attribution)
 *      with the real partner halo, and drop the partner logo into the logo slot.
 *
 * Keep it on-brand: light-first + dark-aware surface, Manrope-bold headline,
 * ONE Playfair-italic mauve accent word (`.accent-italic`, theme-adaptive), and
 * only claims that are true and signed.
 * ---------------------------------------------------------------------------
 */
export function PartnerHalo() {
  if (!PARTNER_HALO_ENABLED) return null;

  return (
    <section
      className="relative bg-brand-cream dark:bg-[#1f1420] py-24 md:py-32 overflow-hidden"
      aria-labelledby="partner-halo-heading"
    >
      {/* Accent ambient — low on light, richer on dark */}
      <div
        className="absolute inset-0 pointer-events-none dark:hidden"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(109,74,102,0.05), transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none hidden dark:block"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(204,164,194,0.08), transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-[1000px] mx-auto px-5 md:px-8 text-center">
        {/* Eyebrow — PLACEHOLDER */}
        <FadeUp>
          <p
            className="font-sans font-medium text-[0.75rem] uppercase text-brand-accent-on-light dark:text-brand-accent"
            style={{ letterSpacing: '0.22em' }}
          >
            In partnership
          </p>
        </FadeUp>

        {/* Logo slot — PLACEHOLDER. Drop the partner mark here (next/image). */}
        <FadeUp delay={0.05}>
          <div
            className="mx-auto mt-8 h-14 w-40 rounded-[10px] border border-dashed border-black/20 dark:border-brand-cream/20 flex items-center justify-center text-[0.625rem] uppercase tracking-[0.2em] text-text-secondary/60 dark:text-brand-cream/30"
            aria-hidden="true"
          >
            Partner logo
          </div>
        </FadeUp>

        {/* Headline — PLACEHOLDER (one accent-italic word) */}
        <FadeUp delay={0.1}>
          <h2
            id="partner-halo-heading"
            className="mt-10 mx-auto font-sans font-semibold text-text-primary dark:text-brand-cream leading-[1.1] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', maxWidth: '22ch' }}
          >
            Standing beside a name you already{' '}
            <span className="accent-italic">trust</span>.
          </h2>
        </FadeUp>

        {/* Proof line — PLACEHOLDER */}
        <FadeUp delay={0.16}>
          <p
            className="mt-7 mx-auto text-text-secondary dark:text-brand-cream/70 leading-[1.6]"
            style={{ fontSize: 'clamp(1rem, 1.25vw, 1.125rem)', maxWidth: '52ch' }}
          >
            {/* Replace with the real, signed partnership proof. */}
            Placeholder proof line for the named-partner halo.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
