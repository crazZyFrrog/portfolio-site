import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import type { CaseStudy } from '../data/cases';
import Badge from './Badge';

interface CaseCardProps {
  caseStudy: CaseStudy;
}

export default function CaseCard({ caseStudy }: CaseCardProps) {
  const thumbnail = caseStudy.screenshots?.[0]?.src;

  return (
    <article className="card-solid overflow-hidden">
      {thumbnail && (
        <div className="aspect-video overflow-hidden border-b border-ink-800">
          <img
            src={thumbnail}
            alt={caseStudy.name}
            loading="lazy"
            className="h-full w-full object-cover object-top"
          />
        </div>
      )}

      <div className="p-5">
        <div className="mb-3">
          <Badge type={caseStudy.badge} label={caseStudy.badgeLabel} />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-ink-100">{caseStudy.name}</h3>
        <p className="mb-5 text-sm leading-relaxed text-ink-300">{caseStudy.oneLiner}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link
            to={`/cases/${caseStudy.slug}`}
            className="inline-flex items-center gap-1.5 font-medium text-accent underline underline-offset-4 transition hover:text-accent-light"
          >
            Смотреть кейс
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <a
            href={caseStudy.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-ink-500 transition hover:text-ink-300"
          >
            Live
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </article>
  );
}
