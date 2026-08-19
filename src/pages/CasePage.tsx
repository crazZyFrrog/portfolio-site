import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, ExternalLink, Mail } from 'lucide-react';
import { getCaseBySlug } from '../data/cases';
import Badge from '../components/Badge';
import BeforeAfter from '../components/BeforeAfter';
import { CaseScreenshotGrid, CaseVideo } from '../components/CaseMedia';
import { useContactModal } from '../components/ContactModalContext';
import MediaPlaceholder from '../components/MediaPlaceholder';
import PageMetadata from '../components/PageMetadata';
import Section, { BulletList, TagList } from '../components/Section';
import NotFoundPage from './NotFoundPage';

export default function CasePage() {
  const { slug } = useParams<{ slug: string }>();
  const { openContactModal } = useContactModal();
  const caseStudy = slug ? getCaseBySlug(slug) : undefined;

  if (!caseStudy) {
    return <NotFoundPage />;
  }

  return (
    <article>
      <PageMetadata
        title={`${caseStudy.name} — кейс Vladislav Levonenko`}
        description={caseStudy.oneLiner}
        path={`/cases/${caseStudy.slug}`}
      />
      <div className="section-shell py-10 sm:py-14">
        <Link
          to="/#cases"
          className="mb-10 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-500 transition hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Все проекты
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-10 border-b border-ink-800 pb-12 lg:grid-cols-12 lg:pb-16"
        >
          <div className="lg:col-span-8">
            <p className="eyebrow mb-6">Case study / {String(caseStudy.order).padStart(2, '0')}</p>
            <h1 className="display-title mb-7 text-6xl sm:text-7xl lg:text-8xl">
              {caseStudy.name}
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-ink-300 sm:text-lg">
              {caseStudy.oneLiner}
            </p>
          </div>
          <div className="flex flex-col justify-between border-l border-ink-800 pl-6 lg:col-span-4 lg:pl-8">
            <div>
              <div className="mb-7">
                <Badge type={caseStudy.badge} label={caseStudy.badgeLabel} />
              </div>
              <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-ink-500">
                Моя роль
              </p>
              <p className="mb-8 text-sm leading-relaxed text-ink-300">
                {caseStudy.role.slice(0, 3).join(' · ')}
              </p>
            </div>
            <a
              href={caseStudy.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary self-start"
            >
              Открыть сайт
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </motion.header>

        <motion.section
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7 }}
          className="border-b border-ink-800 py-10 sm:py-14"
        >
          <div className="mb-5 flex items-center justify-between">
            <p className="eyebrow">Product tour</p>
            <p className="text-[9px] uppercase tracking-[0.14em] text-ink-500">Видео-демо</p>
          </div>
          {caseStudy.videoSrc || caseStudy.videoEmbedUrl ? (
            <CaseVideo
              src={caseStudy.videoSrc}
              poster={caseStudy.videoPoster}
              embedUrl={caseStudy.videoEmbedUrl}
              title={caseStudy.name}
              caption={caseStudy.videoCaption}
            />
          ) : (
            <MediaPlaceholder label="Product Tour — видео-демо" type="video" />
          )}
        </motion.section>

        <div>
          {caseStudy.miniResearch && (
            <Section title="Мини-исследование">
              <p className="text-sm leading-relaxed text-ink-300">{caseStudy.miniResearch}</p>
            </Section>
          )}

          <Section title="Для кого сделан">
            <p className="text-sm leading-relaxed text-ink-300">{caseStudy.madeFor}</p>
            {caseStudy.targetAudience && (
              <div className="mt-7">
                <p className="eyebrow mb-3">Кому подходит</p>
                <BulletList items={caseStudy.targetAudience} />
              </div>
            )}
          </Section>

          <Section title="Задача">
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

          <Section title="Результат">
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

          <Section title="Интерфейс">
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
              <blockquote className="border-l border-accent bg-ink-900 p-6 font-display text-2xl italic text-ink-300">
                Отзыв будет добавлен
              </blockquote>
            </Section>
          )}
        </div>

        <div className="my-12 grid gap-8 border border-ink-800 bg-ink-900 p-7 sm:p-10 lg:grid-cols-12 lg:p-12">
          <div className="lg:col-span-8">
            <p className="eyebrow mb-4">Следующий шаг</p>
            <h2 className="font-display text-4xl leading-none text-ink-100 sm:text-5xl">
              Похожая задача?
              <span className="block text-accent">Обсудим решение.</span>
            </h2>
          </div>
          <div className="flex items-end lg:col-span-4 lg:justify-end">
            <button
              type="button"
              onClick={() => openContactModal(`Кейс: ${caseStudy.name}`)}
              className="btn-primary"
            >
              <Mail className="h-4 w-4" />
              Написать
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
