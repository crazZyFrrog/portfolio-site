import { ImageIcon } from 'lucide-react';

interface MediaPlaceholderProps {
  label: string;
  type?: 'screenshot' | 'video';
}

export default function MediaPlaceholder({ label, type = 'screenshot' }: MediaPlaceholderProps) {
  return (
    <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-ink-800 bg-ink-950 px-4 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-800">
        <ImageIcon className="h-4 w-4 text-ink-500" />
      </div>
      <p className="text-sm text-ink-500">
        {type === 'video' ? 'Видео-демо будет добавлено' : 'Скриншот будет добавлен'}
      </p>
      <p className="max-w-xs text-xs text-ink-500">{label}</p>
    </div>
  );
}
