import type { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  label: string;
  /**
   * Force the cream-on-dark treatment regardless of theme — for surfaces that
   * are intentionally dark in BOTH light and dark mode (e.g. the magnet funnel).
   * Default is theme-aware: dark text on light surfaces, cream text in dark mode.
   */
  light?: boolean;
}

export function SectionLabel({ icon, label, light = false }: Props) {
  const color = light
    ? 'text-brand-cream/50'
    : 'text-text-secondary dark:text-brand-cream/50';
  const lineColor = light
    ? 'bg-brand-cream/20'
    : 'bg-text-secondary/25 dark:bg-brand-cream/20';

  return (
    <div className={`inline-flex items-center gap-3 ${color}`}>
      <span>{icon}</span>
      <span className="text-[10px] font-bold tracking-[0.22em] uppercase">{label}</span>
      <div className={`w-8 h-px ${lineColor}`} />
    </div>
  );
}
