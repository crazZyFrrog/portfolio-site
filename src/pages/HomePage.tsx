import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarCheck,
  Code2,
  Layers3,
  Mail,
  Workflow,
} from 'lucide-react';
import { profile, mailtoHref } from '../data/profile';
import { getSortedCases } from '../data/cases';
import CaseCard from '../components/CaseCard';
import PageMetadata from '../components/PageMetadata';

const services = [
  {
    number: '01',
    title: 'Лендинги',
    text: 'Выразительные сайты с понятной структурой, сильным оффером и адаптивным интерфейсом.',
    icon: Code2,
  },
  {
    number: '02',
    title: 'Онлайн-запись',
    text: 'Сценарии бронирования, расписание специалистов и удобный путь клиента без звонков.',
    icon: CalendarCheck,
  },
  {
    number: '03',
    title: 'Автоматизация',
    text: 'Уведомления, интеграции и процессы, которые снимают ручную работу с команды.',
    icon: Workflow,
  },
  {
    number: '04',
    title: 'Админ-панели',
    text: 'Рабочие интерфейсы для управления контентом, заявками, слотами и клиентами.',
    icon: Layers3,
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Исследование',
    text: 'Разбираю контекст, ограничения и реальный путь пользователя.',
    image: '/images/portfolio/process-research.jpg',
    position: 'center',
  },
  {
    number: '02',
    title: 'Проектирование',
    text: 'Собираю структуру, интерфейс и техническую архитектуру продукта.',
    image: '/images/portfolio/process-design.jpg',
    position: 'center',
  },
  {
    number: '03',
    title: 'Запуск',
    text: 'Тестирую сценарии, разворачиваю production и проверяю результат.',
    image: '/images/portfolio/process-launch.jpg',
    position: 'center',
  },
];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: string;
  priority?: boolean;
}

function ParallaxImage({
  src,
  alt,
  className = '',
  objectPosition = 'center',
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-22, 22]);
  const priorityAttribute = priority ? { fetchpriority: 'high' } : {};

  return (
    <div ref={ref} className={`image-treatment overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        {...priorityAttribute}
        style={{ y, objectPosition }}
        className="parallax-image -my-[5%] h-[110%] w-full object-cover transition duration-700 group-hover:scale-[1.025]"
      />
    </div>
  );
}

export default function HomePage() {
  const caseList = getSortedCases();

  return (
    <>
      <PageMetadata
        title="Vladislav Levonenko — full-stack разработчик"
        description="Сайты, цифровые продукты и автоматизация от идеи до production."
        path="/"
      />
      <section className="relative overflow-hidden border-b border-ink-800">
        <div className="section-shell grid min-h-[calc(100svh-4rem)] items-stretch lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col justify-between border-ink-800 py-14 lg:col-span-7 lg:border-r lg:py-20 lg:pr-10"
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-accent" />
              <p className="eyebrow">Full-stack / Creative development</p>
            </div>

            <div className="py-16 lg:py-10">
              <p className="mb-5 text-xs uppercase tracking-[0.22em] text-ink-500">
                {profile.name} · Creative technologist
              </p>
              <h1 className="display-title text-[clamp(4.1rem,8.6vw,8.6rem)]">
                Digital products
                <span className="block text-accent">& smart systems</span>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-300 sm:text-lg">
                {profile.tagline}. Проектирую опыт, автоматизирую процессы и довожу продукт до
                запуска.
              </p>
            </div>

            <div className="flex flex-col gap-6 border-t border-ink-800 pt-6 sm:flex-row sm:items-center">
              <a href={mailtoHref()} className="btn-primary">
                Обсудить проект
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href="#cases" className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-ink-400 transition hover:text-ink-100">
                Смотреть работы
                <ArrowDownRight className="h-4 w-4 text-accent transition group-hover:translate-x-1 group-hover:translate-y-1" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="relative min-h-[34rem] lg:col-span-5 lg:min-h-0"
          >
            <ParallaxImage
              src="/images/portfolio/hero-workspace.jpg"
              alt="Настоящее рабочее пространство с клавиатурой и инструментами"
              className="absolute inset-0 -mx-5 sm:-mx-8 lg:mx-0 lg:ml-10"
              objectPosition="58% center"
              priority
            />
            <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-6 lg:left-10">
              <div>
                <p className="eyebrow mb-2">Selected direction</p>
                <p className="font-display text-2xl uppercase text-white">Digital craft</p>
              </div>
              <span className="font-display text-5xl text-white/70">01</span>
            </div>
          </motion.div>
        </div>
      </section>

      <motion.section id="about" {...reveal} className="section-shell scroll-mt-24 py-24 sm:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-5">01 — Обо мне</p>
            <h2 className="font-display text-5xl leading-[0.95] text-ink-100 sm:text-6xl">
              Между идеей
              <span className="block text-accent">и работающим продуктом.</span>
            </h2>
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true, amount: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="group mt-10 aspect-[4/5] overflow-hidden border border-ink-800"
            >
              <ParallaxImage
                src="/images/portfolio/about-hands.jpg"
                alt="Руки человека, работающего за ноутбуком"
                className="h-full"
                objectPosition="center"
              />
            </motion.div>
          </div>
          <div className="lg:col-span-5 lg:col-start-7">
            <div className="space-y-5 border-l border-ink-800 pl-6 sm:pl-8">
              {profile.about.map((paragraph, i) => (
                <p key={i} className={i === 0 ? 'text-lg leading-relaxed text-ink-100' : 'text-sm leading-relaxed text-ink-400'}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-10 grid grid-cols-2 gap-px border border-ink-800 bg-ink-800">
              {['Product design', 'Frontend', 'Backend', 'Deployment'].map((skill) => (
                <div key={skill} className="bg-ink-950 px-4 py-4 text-[10px] uppercase tracking-[0.16em] text-ink-400">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <section className="border-y border-ink-100 bg-accent">
        <div className="section-shell">
          <div className="flex items-end justify-between border-b border-ink-100/30 py-8">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-ink-100">
                02 — Возможности
              </p>
              <h2 className="font-display text-4xl text-ink-100 sm:text-5xl">Что я создаю</h2>
            </div>
            <p className="hidden max-w-sm text-right text-xs leading-relaxed text-ink-100/70 md:block">
              Не просто интерфейсы — связанные цифровые системы для реальных задач.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: index * 0.08 }}
                  className="group border-b border-ink-100/25 px-0 py-8 md:px-6 lg:border-b-0 lg:border-r lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
                >
                  <div className="mb-12 flex items-center justify-between">
                    <span className="font-display text-xl text-ink-100/60">{service.number}</span>
                    <Icon className="h-5 w-5 text-ink-100 transition group-hover:scale-110" />
                  </div>
                  <h3 className="mb-3 font-display text-3xl text-ink-100">{service.title}</h3>
                  <p className="text-xs leading-relaxed text-ink-100/70">{service.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-shell py-24 sm:py-32">
        <motion.div
          {...reveal}
          className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="eyebrow mb-3">03 — Процесс</p>
            <h2 className="font-display text-5xl leading-none text-ink-100 sm:text-6xl">
              От задачи
              <span className="text-accent"> к запуску.</span>
            </h2>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-ink-500 sm:text-right">
            Последовательная работа без магии: понять, спроектировать, реализовать.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {processSteps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: index * 0.1 }}
              className="group"
            >
              <div className="aspect-[4/3] overflow-hidden border border-ink-800">
                <ParallaxImage
                  src={step.image}
                  alt={step.title}
                  className="h-full"
                  objectPosition={step.position}
                />
              </div>
              <div className="grid grid-cols-[auto_1fr_auto] items-start gap-4 border-b border-ink-800 py-5">
                <span className="font-display text-3xl text-accent">{step.number}</span>
                <div>
                  <h3 className="mb-1 font-display text-2xl text-ink-100">{step.title}</h3>
                  <p className="text-[10px] leading-relaxed text-ink-500">{step.text}</p>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 text-ink-500 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="border-b border-ink-800">
        <div className="section-shell grid grid-cols-2 bg-ink-800 lg:grid-cols-4">
          {profile.metrics.map((metric) => (
            <div key={metric.label} className="bg-ink-950 px-5 py-9 text-center sm:py-12">
              <p className="mb-2 font-display text-4xl text-accent sm:text-5xl">{metric.value}</p>
              <p className="text-[9px] uppercase tracking-[0.16em] text-ink-500">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="cases" className="scroll-mt-24 py-24 sm:py-32">
        <div className="section-shell">
          <motion.div {...reveal} className="mb-14 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-4">04 — Избранные проекты</p>
              <h2 className="font-display text-6xl leading-none text-ink-100 sm:text-7xl">Работы</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ink-400 sm:text-right">
              Реальные внедрения и продуктовые концепты. В каждом кейсе — контекст, решение и
              измеримый результат.
            </p>
          </motion.div>
          <div>
            {caseList.map((c, index) => (
              <CaseCard key={c.slug} caseStudy={c} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pb-10 sm:pb-16">
        <motion.div
          {...reveal}
          className="grid overflow-hidden border border-ink-100 lg:min-h-[31rem] lg:grid-cols-12"
        >
          <div className="relative flex min-h-[29rem] flex-col justify-between overflow-hidden bg-accent p-7 sm:p-10 lg:col-span-7 lg:min-h-full lg:p-14">
            <img
              src="/images/portfolio/contact-still-life.jpg"
              alt="Серебристые наушники на тёплом оранжевом фоне"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/5 to-black/70" />

            <div className="relative z-10 flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white">
                05 — Следующий проект
              </p>
              <span className="grid h-8 w-8 place-items-center border border-white/80 text-lg text-white">
                +
              </span>
            </div>

            <div className="relative z-10">
              <h2 className="font-display text-[clamp(3.5rem,6.4vw,6.4rem)] font-bold uppercase leading-[0.98] tracking-[-0.04em] text-white">
                От идеи
                <span className="block">к запуску.</span>
              </h2>
              <div className="mt-8 flex items-end justify-between border-t border-white/45 pt-5">
                <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/75">
                  Let&apos;s build together
                </span>
                <span className="font-display text-6xl font-bold leading-none text-white">VL.</span>
              </div>
            </div>
          </div>

          <div className="flex min-h-[25rem] flex-col justify-between bg-ink-100 p-7 text-ink-950 sm:p-10 lg:col-span-5 lg:min-h-full lg:p-14">
            <div className="flex items-start justify-between border-b border-ink-950/25 pb-6">
              <div>
                <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-accent">
                  Available for projects
                </p>
                <p className="text-xs uppercase tracking-[0.12em] text-ink-950/60">
                  Калуга · Работаю удалённо
                </p>
              </div>
              <span className="font-display text-4xl font-bold">VL.</span>
            </div>

            <div>
              <p className="mb-8 max-w-md text-base leading-relaxed text-ink-950/70">
                Лендинг, онлайн-запись, автоматизация или внутренний инструмент — обсудим задачу
                и определим сильный первый шаг.
              </p>
              <a
                href={mailtoHref()}
                className="inline-flex items-center gap-3 border border-ink-950/30 bg-ink-950 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-100 transition hover:border-accent hover:bg-accent"
              >
                <Mail className="h-4 w-4" />
                Написать мне
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <a
              href={`mailto:${profile.email}`}
              className="mt-8 break-all border-t border-ink-950/25 pt-5 text-[10px] uppercase tracking-[0.12em] text-ink-950/60 transition hover:text-accent"
            >
              {profile.email}
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
