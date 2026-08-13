import type { CaseBadge } from '../data/cases';

interface BadgeProps {
  type: CaseBadge;
  label: string;
}

export default function Badge({ type, label }: BadgeProps) {
  const styles =
    type === 'real'
      ? 'border-accent/60 bg-accent-muted text-accent-light'
      : 'border-ink-700 text-ink-400';

  return (
    <span
      className={`inline-flex border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] ${styles}`}
    >
      {label}
    </span>
  );
}
