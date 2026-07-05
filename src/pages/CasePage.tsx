import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Mail } from 'lucide-react';
import { getCaseBySlug } from '../data/cases';
import { mailtoHref } from '../data/profile';
import Badge from '../components/Badge';
import BeforeAfter from '../components/BeforeAfter';
import { CaseScreenshotGrid, CaseVideo } from '../components/CaseMedia';
import MediaPlaceholder from '../components/MediaPlaceholder';
import Section, { BulletList, TagList } from '../components/Section';
import ScrollReveal from '../components/ScrollReveal';
import GlowCard from '../components/GlowCard';
import NotFoundPage from './NotFoundPage';

export default function CasePage() {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = slug ? getCaseBySlug(slug) : undefined;

  if (!caseStudy) {
    return <NotFoundPage />;
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        to="/#cases"
        className="mb-8 inline-flex items-center gap-2 text-sm text-ink-500 transition hover:text-ink-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Все кейсы
      </Link>

      <header className="mb-10">
        <ScrollReveal delay={0}>
          <div className="mb-4">
            <Badge type={caseStudy.badge} label={caseStudy.badgeLabel} />
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl">{caseStudy.name}</h1>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <p className="mb-6 text-lg leading-relaxed text-ink-300">{caseStudy.oneLiner}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <a
            href={caseStudy.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-light hover:shadow-lg hover:shadow-accent/25"
          >
            Открыть сайт
            <ExternalLink className="h-4 w-4" />
          </a>
        </ScrollReveal>
      </header>

      <ScrollReveal>
        <div className="mb-10">
          {caseStudy.videoSrc ? (
            <CaseVideo src={caseStudy.videoSrc} title={caseStudy.name} />
          ) : (
            <MediaPlaceholder label="Product Tour — видео-демо" type="video" />
          )}
        </div>
      </ScrollReveal>

      <div className="space-y-12">
        {caseStudy.miniResearch && (
          <Section title="Мини-исследование">
            <p className="text-sm leading-relaxed text-ink-300">{caseStudy.miniResearch}</p>
          </Section>
        )}

        <Section title="Для кого сделан">
          <p className="text-sm leading-relaxed text-ink-300">{caseStudy.madeFor}</p>
          {caseStudy.targetAudience && (
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ink-500">
                Кому подходит
              </p>
              <BulletList items={caseStudy.targetAudience} />
            </div>
          )}
        </Section>

        <Section title="Какую проблему решает">
          <p className="text-sm leading-relaxed text-ink-300">{caseStudy.problem}</p>
        </Section>

        <Section title="Как было до">
          <BulletList items={caseStudy.before} />
        </Section>

        <Section title="Было / Стало">
          <BeforeAfter rows={caseStudy.beforeAfter} />
        </Section>

        <Section title="Что сделал">
          <BulletList items={caseStudy.whatIDid} />
        </Section>

        <Section title="Что получилось">
          <BulletList items={caseStudy.result} />
        </Section>

        {caseStudy.timeSavings && (
          <Section title="Экономия времени">
            <BulletList items={caseStudy.timeSavings} />
          </Section>
        )}

        {caseStudy.moneySavings && (
          <Section title="Экономия денег">
            <BulletList items={caseStudy.moneySavings} />
          </Section>
        )}

        {caseStudy.limitations && (
          <Section title="Ограничения MVP">
            <BulletList items={caseStudy.limitations} />
          </Section>
        )}

        <Section title="Скриншоты">
          <CaseScreenshotGrid
            screenshots={caseStudy.screenshots}
            placeholderLabels={caseStudy.screenshotLabels}
          />
        </Section>

        <Section title="Стек">
          <TagList items={caseStudy.stack} />
        </Section>

        <Section title="Моя роль">
          <TagList items={caseStudy.role} />
        </Section>

        {caseStudy.showTestimonial && (
          <Section title="Отзыв заказчика">
            <blockquote className="glass rounded-xl p-6 text-sm italic text-ink-300">
              Отзыв будет добавлен
            </blockquote>
          </Section>
        )}
      </div>

      <ScrollReveal>
        <div className="mt-16">
          <GlowCard className="glass rounded-2xl p-8 text-center">
            <h2 className="mb-2 text-lg font-semibold text-white">Похожая задача?</h2>
            <p className="mb-6 text-sm text-ink-300">Обсудим ваш проект — от идеи до запуска.</p>
            <a
              href={mailtoHref(`Кейс: ${caseStudy.name}`)}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-light hover:shadow-lg hover:shadow-accent/25"
            >
              <Mail className="h-4 w-4" />
              Написать
            </a>
          </GlowCard>
        </div>
      </ScrollReveal>
    </article>
  );
}
