import type { CaseBadge } from '../data/cases';

interface BadgeProps {
  type: CaseBadge;
  label: string;
}

export default function Badge({ type, label }: BadgeProps) {
  const styles =
    type === 'real'
      ? 'bg-emerald-500/15 text-emerald-400 ring-emerald-500/30'
      : 'bg-accent-muted text-accent-light ring-accent/30';

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${styles}`}
    >
      {label}
    </span>
  );
}
