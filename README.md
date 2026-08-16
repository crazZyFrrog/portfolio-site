# Портфолио — Vladislav Levonenko

Сайт-портфолио вайбкодера: кейсы salonlt.ru и Investment Academy.

## Требования

- Node.js 20.19+ (рекомендуется актуальная LTS)
- npm

## Запуск

```bash
npm ci
npm run dev
```

Откройте http://localhost:5173

## Сборка

```bash
npm run lint
npm run typecheck
npm run build
npm run preview
```

Сборка создаётся в `dist/`. Каталог генерируется заново и не хранится в git.

## Деплой на Vercel

1. Импортируйте корневой репозиторий в Vercel.
2. Выберите Framework Preset `Vite`.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Install Command: `npm ci`.

`vercel.json` содержит SPA fallback для React Router и базовые security headers. Vercel
автоматически передаёт production-домен в `VERCEL_PROJECT_PRODUCTION_URL`; он используется
для canonical URL, `robots.txt` и `sitemap.xml`. Для собственного домена задайте переменную
`VITE_SITE_URL=https://example.com` без завершающего `/`.

После деплоя проверьте:

- прямой вход и обновление `/cases/salon-lt` и `/cases/investment-academy`;
- клиентскую 404 на неизвестном URL;
- локальное видео, Loom, изображения и `mailto:` ссылки;
- `/robots.txt`, `/sitemap.xml`, social preview и response security headers;
- Lighthouse на desktop и mobile.

## Структура

- `/` — главная (о себе, кейсы, контакт)
- `/cases/salon-lt` — кейс салона красоты
- `/cases/investment-academy` — кейс MVP образовательной платформы

Контент: `src/data/profile.ts`, `src/data/cases.ts`

## TODO (контент)

- [ ] Отзыв заказчицы салона

## Фото

Editorial-фотографии на главной — Pexels, free to use:

- [Justin Rieta — workspace](https://www.pexels.com/photo/moody-workspace-with-keyboard-and-gadgets-34110027/)
- [Sora Shimazaki — hands and laptop](https://www.pexels.com/photo/crop-faceless-person-typing-on-laptop-keyboard-in-darkness-5926370/)
- [Mikhail Nilov — technology research](https://www.pexels.com/photo/a-man-looking-at-a-computer-screen-with-data-6963944/)
- [Mikhail Fesenko — development](https://www.pexels.com/photo/person-in-brown-long-sleeve-shirt-typing-on-a-keyboard-9553909/)
- [Akhil Yerabati — orange headphones still life](https://unsplash.com/photos/white-and-orange-headphones-on-orange-surface-QK80_FLhjTE)
