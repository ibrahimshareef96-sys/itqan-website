'use client';

import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react';

const EASE = 'cubic-bezier(0.25, 0.1, 0.25, 1)';

interface RollButtonProps {
  href: string;
  label: string;
  /**
   * 'primary' — plum pill on light surfaces (flips to cream-on-plum in dark mode).
   * 'onDark'  — cream pill for dark surfaces.
   */
  variant?: 'primary' | 'onDark';
  className?: string;
}

/**
 * Axion-style CTA: pill button whose label rolls up on hover (duplicated text in an
 * overflow-hidden column) while the arrow chip rotates from -45° to 0°.
 */
export function RollButton({ href, label, variant = 'primary', className }: RollButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 rounded-full pl-5 sm:pl-6 pr-2 py-2 text-[0.8125rem] sm:text-[0.875rem] font-semibold transition-colors duration-300 ${
        isPrimary
          ? 'bg-brand-dark text-brand-cream hover:bg-[#241323] dark:bg-brand-cream dark:text-brand-dark dark:hover:bg-brand-cream/90'
          : 'bg-brand-cream text-brand-dark hover:bg-brand-cream/90'
      } ${className ?? ''}`}
    >
      {/* Text roll: duplicated label slides up 50% on hover */}
      <span className="overflow-hidden h-[20px]" aria-hidden="false">
        <span
          className="flex flex-col transition-transform duration-500 group-hover:-translate-y-1/2"
          style={{ transitionTimingFunction: EASE }}
        >
          <span className="h-[20px] leading-[20px]">{label}</span>
          <span className="h-[20px] leading-[20px]" aria-hidden="true">
            {label}
          </span>
        </span>
      </span>

      {/* Arrow chip: rotates -45° → 0° on hover */}
      <span
        className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-transform duration-500 -rotate-45 group-hover:rotate-0 ${
          isPrimary
            ? 'bg-brand-cream text-brand-dark dark:bg-brand-dark dark:text-brand-cream'
            : 'bg-brand-dark text-brand-cream'
        }`}
        style={{ transitionTimingFunction: EASE }}
        aria-hidden="true"
      >
        <ArrowRight size={14} weight="bold" />
      </span>
    </Link>
  );
}
