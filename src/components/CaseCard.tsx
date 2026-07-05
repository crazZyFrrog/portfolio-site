import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import type { CaseStudy } from '../data/cases';
import Badge from './Badge';
import GlowCard from './GlowCard';

interface CaseCardProps {
  caseStudy: CaseStudy;
}

export default function CaseCard({ caseStudy }: CaseCardProps) {
  const thumbnail = caseStudy.screenshots?.[0]?.src;

  return (
    <GlowCard
      as="article"
      className="group flex h-full flex-col rounded-2xl glass transition duration-300 ease-out hover:scale-[1.02] hover:border-ink-700"
    >
      {thumbnail && (
        <div className="relative aspect-video overflow-hidden rounded-t-2xl">
          <img
            src={thumbnail}
            alt={caseStudy.name}
            loading="lazy"
            className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
        </div>
      )}

      <div className="relative z-10 flex flex-1 flex-col p-6">
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
      </div>
    </GlowCard>
  );
}
