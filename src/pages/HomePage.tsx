import { Mail, ArrowDown } from 'lucide-react';
import { profile, mailtoHref } from '../data/profile';
import { getSortedCases } from '../data/cases';
import CaseCard from '../components/CaseCard';

export default function HomePage() {
  const caseList = getSortedCases();

  return (
    <>
      <section className="border-b border-ink-800">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
          <p className="mb-2 text-sm text-ink-500">{profile.title}</p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-ink-100 sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-ink-300">{profile.tagline}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={mailtoHref()}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-light"
            >
              <Mail className="h-4 w-4" />
              Обсудить проект
            </a>
            <a
              href="#cases"
              className="inline-flex items-center gap-2 rounded-md border border-ink-800 px-5 py-2.5 text-sm text-ink-300 transition hover:border-ink-700 hover:text-ink-100"
            >
              Смотреть кейсы
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="mb-6 text-xl font-semibold text-ink-100">О себе</h2>
        <div className="max-w-3xl space-y-4">
          {profile.about.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-ink-300">
              {i === 0 ? (
                <>
                  <span className="font-medium text-ink-100">{paragraph.split(',')[0]},</span>
                  {paragraph.slice(paragraph.indexOf(','))}
                </>
              ) : (
                paragraph
              )}
            </p>
          ))}
        </div>
      </section>

      <section className="border-t border-ink-800">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-px bg-ink-800 md:grid-cols-4">
          {profile.metrics.map((metric) => (
            <div key={metric.label} className="bg-ink-950 px-5 py-8 text-center">
              <p className="mb-1 text-2xl font-semibold text-ink-100">{metric.value}</p>
              <p className="text-xs text-ink-500">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="cases" className="border-t border-ink-800">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="mb-2 text-xl font-semibold text-ink-100">Кейсы</h2>
          <p className="mb-10 max-w-2xl text-ink-300">
            Реальные проекты для бизнеса и MVP с production-деплоем. Каждый кейс — задача,
            решение и результат.
          </p>
          <div className="grid gap-8 md:grid-cols-2">
            {caseList.map((c) => (
              <CaseCard key={c.slug} caseStudy={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-800">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="max-w-lg">
            <h2 className="mb-3 text-xl font-semibold text-ink-100">Есть задача?</h2>
            <p className="mb-6 text-ink-300">
              Лендинг, онлайн-запись, уведомления, админка — обсудим ваш проект и найдём решение.
            </p>
            <a
              href={mailtoHref()}
              className="inline-flex items-center gap-2 text-sm font-medium text-accent underline underline-offset-4 transition hover:text-accent-light"
            >
              <Mail className="h-4 w-4" />
              {profile.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
