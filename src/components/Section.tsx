interface SectionProps {
  id?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({ id, title, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`}>
      <h2 className="mb-4 text-lg font-semibold text-ink-100">{title}</h2>
      {children}
    </section>
  );
}

interface BulletListProps {
  items: string[];
}

export function BulletList({ items }: BulletListProps) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-300">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink-500" />
          {item}
        </li>
      ))}
    </ul>
  );
}

interface TagListProps {
  items: string[];
}

export function TagList({ items }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="rounded border border-ink-800 px-2.5 py-1 text-xs text-ink-300"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
