import { Mail, ArrowDown } from 'lucide-react';
import { profile, mailtoHref } from '../data/profile';
import { getSortedCases } from '../data/cases';
import CaseCard from '../components/CaseCard';

export default function HomePage() {
  const caseList = getSortedCases();

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-800">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.15)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="mb-3 text-sm font-medium text-accent-light">{profile.title}</p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-ink-300">{profile.tagline}</p>
          <div className="flex flex-wrap gap-4">
            <a
              href={mailtoHref()}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-light"
            >
              <Mail className="h-4 w-4" />
              Обсудить проект
            </a>
            <a
              href="#cases"
              className="inline-flex items-center gap-2 rounded-xl border border-ink-700 px-6 py-3 text-sm font-medium text-ink-300 transition hover:border-ink-500 hover:text-white"
            >
              Смотреть кейсы
              <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="mb-6 text-2xl font-bold text-white">О себе</h2>
        <div className="max-w-3xl space-y-4">
          {profile.about.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-ink-300">
              {i === 0 ? (
                <>
                  <span className="font-medium text-ink-100">
                    {paragraph.split(',')[0]},
                  </span>
                  {paragraph.slice(paragraph.indexOf(','))}
                </>
              ) : (
                paragraph
              )}
            </p>
          ))}
        </div>
      </section>

      <section id="cases" className="border-t border-ink-800 bg-ink-900/30">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="mb-2 text-2xl font-bold text-white">Кейсы</h2>
          <p className="mb-10 max-w-2xl text-ink-300">
            Реальные проекты для бизнеса и MVP с production-деплоем. Каждый кейс — задача,
            решение и результат.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {caseList.map((c) => (
              <CaseCard key={c.slug} caseStudy={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-800">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <h2 className="mb-4 text-2xl font-bold text-white">Есть задача?</h2>
          <p className="mx-auto mb-8 max-w-lg text-ink-300">
            Лендинг, онлайн-запись, уведомления, админка — обсудим ваш проект и найдём решение.
          </p>
          <a
            href={mailtoHref()}
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-accent-light"
          >
            <Mail className="h-4 w-4" />
            {profile.email}
          </a>
        </div>
      </section>
    </>
  );
}
