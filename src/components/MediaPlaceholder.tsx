import { ImageIcon } from 'lucide-react';

interface MediaPlaceholderProps {
  label: string;
  type?: 'screenshot' | 'video';
}

export default function MediaPlaceholder({ label, type = 'screenshot' }: MediaPlaceholderProps) {
  return (
    <div className="flex aspect-video flex-col items-center justify-center gap-3 border border-dashed border-ink-700 bg-ink-900 px-4 text-center">
      <div className="flex h-10 w-10 items-center justify-center border border-ink-700">
        <ImageIcon className="h-4 w-4 text-accent" />
      </div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-400">
        {type === 'video' ? 'Видео-демо будет добавлено' : 'Скриншот будет добавлен'}
      </p>
      <p className="max-w-xs text-xs text-ink-500">{label}</p>
    </div>
  );
}
