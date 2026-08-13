interface SectionProps {
  id?: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({ id, title, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`grid scroll-mt-24 gap-6 border-t border-ink-800 py-10 sm:py-12 lg:grid-cols-12 lg:gap-10 ${className}`}
    >
      <div className="lg:col-span-3">
        <h2 className="font-display text-2xl leading-none text-ink-100 sm:text-3xl">{title}</h2>
      </div>
      <div className="lg:col-span-8 lg:col-start-5">{children}</div>
    </section>
  );
}

interface BulletListProps {
  items: string[];
}

export function BulletList({ items }: BulletListProps) {
  return (
    <ul className="divide-y divide-ink-800 border-y border-ink-800">
      {items.map((item, i) => (
        <li key={i} className="flex gap-5 py-4 text-sm leading-relaxed text-ink-300">
          <span className="pt-0.5 font-display text-lg text-accent">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span>{item}</span>
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
          className="border border-ink-700 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-ink-300"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
