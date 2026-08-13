export interface Metric {
  value: string;
  label: string;
}

export const profile = {
  name: 'Vladislav Levonenko',
  title: 'вайбкодер',
  tagline:
    'Сайты и цифровые продукты — лендинги, онлайн-запись, уведомления',
  about: [
    'Vladislav Levonenko, вайбкодер — full-stack разработчик сайтов и цифровых продуктов для бизнеса и образовательных проектов.',
    'Создаю продающие лендинги, образовательные интерфейсы, системы онлайн-записи, автоматические уведомления и админ-панели.',
    'В портфолио — реальные внедрения для заказчиков и MVP-проекты с деплоем в production.',
    'Беру задачи под ключ: от постановки задачи до запуска на хостинге.',
  ],
  email: 'vladislavlevonenko@gmail.com',
  contactSubject: 'Обсуждение проекта — портфолио',
  metrics: [
    { value: '2', label: 'проекта в production' },
    { value: '8+', label: 'экранов и сценариев' },
    { value: '5', label: 'интеграций (API, боты)' },
    { value: 'Full-stack', label: 'от идеи до деплоя' },
  ] as Metric[],
};

export function mailtoHref(subject?: string): string {
  const s = encodeURIComponent(subject ?? profile.contactSubject);
  return `mailto:${profile.email}?subject=${s}`;
}
