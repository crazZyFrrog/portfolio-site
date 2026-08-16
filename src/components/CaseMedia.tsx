import type { CaseScreenshot } from '../data/cases';
import MediaPlaceholder from './MediaPlaceholder';

interface CaseVideoProps {
  src?: string;
  poster?: string;
  embedUrl?: string;
  title: string;
  caption?: string;
}

export function CaseVideo({ src, poster, embedUrl, title, caption }: CaseVideoProps) {
  return (
    <div className="overflow-hidden border border-ink-800 bg-ink-900">
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="aspect-video w-full border-0 bg-black"
        />
      ) : (
        <video
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          className="aspect-video w-full bg-black"
          title={title}
        >
          Ваш браузер не поддерживает воспроизведение видео.
        </video>
      )}
      <p className="border-t border-ink-800 px-4 py-3 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink-500">
        {caption ?? `Product Tour — ${title}`}
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
      <div className="grid gap-5">
        {screenshots.map((shot, index) => (
          <figure key={shot.src} className="group overflow-hidden border border-ink-800 bg-ink-900">
            <div className="overflow-hidden">
              <img
                src={shot.src}
                alt={shot.label}
                loading="lazy"
                className="w-full object-cover object-top transition duration-700 group-hover:scale-[1.01]"
              />
            </div>
            <figcaption className="flex items-center gap-4 border-t border-ink-800 px-4 py-3 text-xs text-ink-300">
              <span className="font-display text-lg text-accent">
                {String(index + 1).padStart(2, '0')}
              </span>
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
