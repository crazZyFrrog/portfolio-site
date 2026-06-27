import type { BeforeAfterRow } from '../data/cases';

interface BeforeAfterProps {
  rows: BeforeAfterRow[];
}

export default function BeforeAfter({ rows }: BeforeAfterProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-ink-800">
      <div className="grid grid-cols-2 border-b border-ink-800 bg-ink-900/80 text-center text-xs font-semibold uppercase tracking-wide">
        <div className="border-r border-ink-800 px-4 py-3 text-red-400/90">Было</div>
        <div className="px-4 py-3 text-emerald-400/90">Стало</div>
      </div>
      {rows.map((row, i) => (
        <div
          key={i}
          className={`grid grid-cols-2 ${i < rows.length - 1 ? 'border-b border-ink-800' : ''}`}
        >
          <div className="border-r border-ink-800 px-4 py-3 text-sm text-ink-300">{row.before}</div>
          <div className="px-4 py-3 text-sm text-ink-100">{row.after}</div>
        </div>
      ))}
    </div>
  );
}
