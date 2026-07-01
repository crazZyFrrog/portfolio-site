import type { CaseScreenshot } from '../data/cases';
import MediaPlaceholder from './MediaPlaceholder';

interface CaseVideoProps {
  src: string;
  title: string;
}

export function CaseVideo({ src, title }: CaseVideoProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-ink-800 bg-ink-900">
      <video
        src={src}
        controls
        playsInline
        preload="metadata"
        className="aspect-video w-full bg-black"
        title={title}
      >
        Ваш браузер не поддерживает воспроизведение видео.
      </video>
      <p className="border-t border-ink-800 px-4 py-2 text-xs text-ink-500">
        Product Tour — запись на сайте и уведомления мастерам
      </p>
    </div>
  );
}

interface CaseScreenshotGridProps {
  screenshots?: CaseScreenshot[];
  placeholderLabels?: string[];
}

export function CaseScreenshotGrid({ screenshots, placeholderLabels }: CaseScreenshotGridProps) {
  if (screenshots && screenshots.length > 0) {
    return (
      <div className="grid gap-6">
        {screenshots.map((shot) => (
          <figure key={shot.src} className="overflow-hidden rounded-xl border border-ink-800 bg-ink-900/40">
            <img
              src={shot.src}
              alt={shot.label}
              loading="lazy"
              className="w-full object-cover object-top"
            />
            <figcaption className="border-t border-ink-800 px-4 py-3 text-sm text-ink-300">
              {shot.label}
            </figcaption>
          </figure>
        ))}
      </div>
    );
  }

  if (placeholderLabels && placeholderLabels.length > 0) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {placeholderLabels.map((label) => (
          <MediaPlaceholder key={label} label={label} />
        ))}
      </div>
    );
  }

  return null;
}
