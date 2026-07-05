import { Mail, ArrowDown } from 'lucide-react';
import { profile, mailtoHref } from '../data/profile';
import { getSortedCases } from '../data/cases';
import CaseCard from '../components/CaseCard';
import ScrollReveal from '../components/ScrollReveal';
import GlowCard from '../components/GlowCard';

export default function HomePage() {
  const caseList = getSortedCases();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-ink-800">
        {/* Animated gradient orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 -top-32 h-[500px] w-[500px] animate-orb-1 rounded-full bg-accent/20 blur-[120px]" />
          <div className="absolute -bottom-24 -right-24 h-[400px] w-[400px] animate-orb-2 rounded-full bg-purple-600/15 blur-[120px]" />
        </div>

        {/* Subtle dot grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
          <ScrollReveal delay={0}>
            <p className="mb-3 text-sm font-medium text-accent-light">{profile.title}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="gradient-text">{profile.name}</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mb-8 max-w-2xl text-lg text-ink-300">{profile.tagline}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <div className="flex flex-wrap gap-4">
              <a
                href={mailtoHref()}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-light hover:shadow-lg hover:shadow-accent/25"
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
          </ScrollReveal>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
        <ScrollReveal>
          <h2 className="mb-6 text-2xl font-bold text-white">О себе</h2>
        </ScrollReveal>
        <div className="max-w-3xl space-y-4">
          {profile.about.map((paragraph, i) => (
            <ScrollReveal key={i} delay={0.1 * (i + 1)}>
              <p className="leading-relaxed text-ink-300">
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
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Metrics ── */}
      <section className="border-t border-ink-800 bg-ink-900/20">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-4 py-12 sm:px-6 md:grid-cols-4">
          {profile.metrics.map((metric, i) => (
            <ScrollReveal key={metric.label} delay={0.1 * i}>
              <div className="glass rounded-xl px-5 py-6 text-center transition hover:border-ink-700">
                <p className="mb-1 text-2xl font-bold text-white sm:text-3xl">{metric.value}</p>
                <p className="text-xs text-ink-400 sm:text-sm">{metric.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Cases ── */}
      <section id="cases" className="border-t border-ink-800">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <ScrollReveal>
            <h2 className="mb-2 text-2xl font-bold text-white">Кейсы</h2>
            <p className="mb-10 max-w-2xl text-ink-300">
              Реальные проекты для бизнеса и MVP с production-деплоем. Каждый кейс — задача,
              решение и результат.
            </p>
          </ScrollReveal>
          <div className="grid gap-6 md:grid-cols-2">
            {caseList.map((c, i) => (
              <ScrollReveal key={c.slug} delay={0.15 * i}>
                <CaseCard caseStudy={c} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="border-t border-ink-800">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <ScrollReveal>
            <GlowCard className="glass rounded-2xl p-8 text-center sm:p-12">
              <h2 className="mb-4 text-2xl font-bold text-white">Есть задача?</h2>
              <p className="mx-auto mb-8 max-w-lg text-ink-300">
                Лендинг, онлайн-запись, уведомления, админка — обсудим ваш проект и найдём решение.
              </p>
              <a
                href={mailtoHref()}
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-accent-light hover:shadow-lg hover:shadow-accent/25"
              >
                <Mail className="h-4 w-4" />
                {profile.email}
              </a>
            </GlowCard>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
