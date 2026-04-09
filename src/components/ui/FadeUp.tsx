'use client';

import { type ReactNode } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Backward-compatible fade-up animation wrapper.
 * Delegates to ScrollReveal with direction="up" and the original defaults.
 */
export function FadeUp({ children, delay = 0, className }: Props) {
  return (
    <ScrollReveal direction="up" distance={24} delay={delay} className={className}>
      {children}
    </ScrollReveal>
  );
}
