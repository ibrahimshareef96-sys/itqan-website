/**
 * Build-time feature flags.
 *
 * `NEXT_PUBLIC_*` env vars are inlined by Next at build time, so these constants
 * are safe to read from both server and client components. When a var is unset,
 * the comparison is `undefined === '1'` -> `false`, i.e. the feature is OFF.
 */

/**
 * PARTNER_HALO — gates the named-partner proof block (see components/home/PartnerHalo.tsx).
 *
 * There is a potential partnership with a globally renowned brand agency. It is
 * NOT public and NOT signed. Until it is, this MUST stay off. When the time
 * comes, set `NEXT_PUBLIC_PARTNER_HALO=1` in the deploy environment and fill in
 * the placeholder copy/logo in PartnerHalo.tsx — no structural rewrite needed.
 *
 * Default: OFF (renders nothing).
 */
export const PARTNER_HALO_ENABLED = process.env.NEXT_PUBLIC_PARTNER_HALO === '1';
