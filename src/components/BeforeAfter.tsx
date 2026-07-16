import type { BeforeAfterRow } from '../data/cases';

interface BeforeAfterProps {
  rows: BeforeAfterRow[];
}

export default function BeforeAfter({ rows }: BeforeAfterProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-ink-800">
      <div className="grid grid-cols-2 border-b border-ink-800 bg-ink-950 text-center text-xs font-medium uppercase tracking-wide text-ink-500">
        <div className="border-r border-ink-800 px-4 py-2.5">Было</div>
        <div className="px-4 py-2.5">Стало</div>
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
