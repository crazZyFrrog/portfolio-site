import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import type { CaseStudy } from '../data/cases';
import Badge from './Badge';

interface CaseCardProps {
  caseStudy: CaseStudy;
  index: number;
}

export default function CaseCard({ caseStudy, index }: CaseCardProps) {
  const thumbnail = caseStudy.screenshots?.[0]?.src;
  const reverse = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="grid border-t border-ink-800 py-8 last:border-b sm:py-12 lg:grid-cols-12 lg:gap-10"
    >
      <Link
        to={`/cases/${caseStudy.slug}`}
        className={`image-treatment group aspect-[16/10] border border-ink-800 lg:col-span-7 ${
          reverse ? 'lg:order-2' : ''
        }`}
      >
        {thumbnail && (
          <img
            src={thumbnail}
            alt={caseStudy.name}
            loading="lazy"
            className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.025]"
          />
        )}
        <div className="absolute bottom-5 right-5 z-10 grid h-12 w-12 place-items-center border border-white/30 bg-black/70 text-white backdrop-blur transition group-hover:border-accent group-hover:text-accent">
          <ArrowRight className="h-4 w-4" />
        </div>
      </Link>

      <div
        className={`flex flex-col justify-between pt-8 lg:col-span-5 lg:pt-0 ${
          reverse ? 'lg:order-1' : ''
        }`}
      >
        <div>
          <div className="mb-8 flex items-center justify-between">
            <span className="font-display text-3xl text-ink-500">0{index + 1}</span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-ink-500">
              {caseStudy.badge === 'real' ? 'Production' : 'Concept / MVP'}
            </span>
          </div>
          <div className="mb-5">
            <Badge type={caseStudy.badge} label={caseStudy.badgeLabel} />
          </div>
          <h3 className="mb-5 font-display text-4xl leading-none text-ink-100 sm:text-5xl">
            {caseStudy.name}
          </h3>
          <p className="mb-7 text-sm leading-relaxed text-ink-400">{caseStudy.oneLiner}</p>
          <div className="mb-10 flex flex-wrap gap-x-4 gap-y-2">
            {caseStudy.stack.slice(0, 5).map((item) => (
              <span key={item} className="text-[9px] uppercase tracking-[0.14em] text-ink-500">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-5 border-t border-ink-800 pt-5 text-xs">
          <Link
            to={`/cases/${caseStudy.slug}`}
            className="group inline-flex items-center gap-2 font-semibold uppercase tracking-[0.14em] text-accent transition hover:text-accent-light"
          >
            Смотреть кейс
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
          </Link>
          <a
            href={caseStudy.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-ink-500 transition hover:text-ink-100"
          >
            Live
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}
