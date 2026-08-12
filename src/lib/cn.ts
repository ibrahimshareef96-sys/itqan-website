/**
 * Join conditional class names.
 *
 * Deliberately NOT tailwind-merge. Every call site in this repo passes a base
 * string plus mutually exclusive branches, so there are no conflicting
 * utilities to resolve — and pulling in clsx + tailwind-merge to concatenate
 * strings would be two dependencies for nothing.
 *
 * If a future call site ever needs real conflict resolution (an override
 * arriving from a `className` prop), add tailwind-merge then, and register the
 * custom scales in the same commit — an unregistered custom scale makes
 * twMerge silently DROP classes it does not recognise as related.
 */
export type ClassValue = string | number | null | undefined | false;

export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(' ');
}
