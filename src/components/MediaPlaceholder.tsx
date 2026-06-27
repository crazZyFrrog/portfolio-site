import { ImageIcon } from 'lucide-react';

interface MediaPlaceholderProps {
  label: string;
  type?: 'screenshot' | 'video';
}

export default function MediaPlaceholder({ label, type = 'screenshot' }: MediaPlaceholderProps) {
  return (
    <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-ink-700 bg-ink-900/40 px-4 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ink-800">
        <ImageIcon className="h-5 w-5 text-ink-500" />
      </div>
      <p className="text-sm text-ink-500">
        {type === 'video' ? 'Видео-демо будет добавлено' : 'Скриншот будет добавлен'}
      </p>
      <p className="max-w-xs text-xs text-ink-700">{label}</p>
    </div>
  );
}
