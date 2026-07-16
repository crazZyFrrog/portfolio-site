import type { CaseBadge } from '../data/cases';

interface BadgeProps {
  type: CaseBadge;
  label: string;
}

export default function Badge({ type, label }: BadgeProps) {
  const styles =
    type === 'real'
      ? 'border border-ink-800 text-ink-300'
      : 'border border-ink-800 text-ink-500';

  return (
    <span className={`inline-flex rounded px-2 py-0.5 text-xs ${styles}`}>{label}</span>
  );
}
