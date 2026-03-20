import type { ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  label: string;
  light?: boolean;
}

export function SectionLabel({ icon, label, light = false }: Props) {
  const color = light ? 'text-brand-cream/50' : 'text-text-secondary';
  const lineColor = light ? 'bg-brand-cream/20' : 'bg-text-secondary/25';

  return (
    <div className={`inline-flex items-center gap-3 ${color}`}>
      <span>{icon}</span>
      <span className="text-[10px] font-bold tracking-[0.22em] uppercase">{label}</span>
      <div className={`w-8 h-px ${lineColor}`} />
    </div>
  );
}
