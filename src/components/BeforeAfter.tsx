import type { BeforeAfterRow } from '../data/cases';

interface BeforeAfterProps {
  rows: BeforeAfterRow[];
}

export default function BeforeAfter({ rows }: BeforeAfterProps) {
  return (
    <div className="border border-ink-800">
      <div className="grid grid-cols-2 border-b border-ink-800 bg-ink-900 text-[9px] font-semibold uppercase tracking-[0.18em] text-ink-500">
        <div className="border-r border-ink-800 px-4 py-3">Было</div>
        <div className="px-4 py-3 text-accent">Стало</div>
      </div>
      {rows.map((row, i) => (
        <div
          key={i}
          className={`grid grid-cols-2 bg-ink-950/50 ${i < rows.length - 1 ? 'border-b border-ink-800' : ''}`}
        >
          <div className="border-r border-ink-800 px-4 py-4 text-xs leading-relaxed text-ink-500">
            {row.before}
          </div>
          <div className="px-4 py-4 text-xs leading-relaxed text-ink-100">{row.after}</div>
        </div>
      ))}
    </div>
  );
}
