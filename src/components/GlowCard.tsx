import { useCallback, useRef, type ReactNode, type MouseEvent } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article';
}

export default function GlowCard({ children, className = '', as: Tag = 'div' }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <Tag
      ref={ref as never}
      onMouseMove={handleMouseMove}
      className={`glow-card ${className}`}
    >
      {children}
    </Tag>
  );
}
