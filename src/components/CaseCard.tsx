import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import type { CaseStudy } from '../data/cases';
import Badge from './Badge';

interface CaseCardProps {
  caseStudy: CaseStudy;
}

export default function CaseCard({ caseStudy }: CaseCardProps) {
  return (
    <article className="group flex flex-col rounded-2xl border border-ink-800 bg-ink-900/50 p-6 transition hover:border-ink-700 hover:bg-ink-900">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Badge type={caseStudy.badge} label={caseStudy.badgeLabel} />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-white">{caseStudy.name}</h3>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-ink-300">{caseStudy.oneLiner}</p>
      <div className="flex flex-wrap items-center gap-4">
        <Link
          to={`/cases/${caseStudy.slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-accent-light transition group-hover:text-white"
        >
          Смотреть кейс
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </Link>
        <a
          href={caseStudy.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-ink-500 transition hover:text-ink-300"
        >
          Live
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
