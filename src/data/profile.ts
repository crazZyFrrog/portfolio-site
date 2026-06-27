export const profile = {
  name: 'Владислав Левоненко',
  title: 'вайбкодер',
  tagline:
    'Сайты и автоматизация для малого бизнеса — лендинги, онлайн-запись, уведомления',
  about: [
    'Владислав Левоненко, вайбкодер — full-stack разработчик сайтов и цифровых продуктов для малого бизнеса.',
    'Создаю продающие лендинги, системы онлайн-записи, автоматические уведомления в Telegram и VK, а также админ-панели для персонала.',
    'В портфолио — реальные внедрения для заказчиков и MVP-проекты с деплоем в production.',
    'Беру задачи под ключ: от постановки задачи до запуска на хостинге.',
  ],
  email: 'vladislavlevonenko@gmail.com',
  contactSubject: 'Обсуждение проекта — портфолио',
};

export function mailtoHref(subject?: string): string {
  const s = encodeURIComponent(subject ?? profile.contactSubject);
  return `mailto:${profile.email}?subject=${s}`;
}
