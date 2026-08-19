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

Production: **https://vladislav-levonenko.vercel.app**

1. Импортируйте корневой репозиторий в Vercel.
2. Укажите **Project Name**: `vladislav-levonenko`.
3. Выберите Framework Preset `Vite`.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Install Command: `npm ci`.

`vercel.json` содержит SPA fallback для React Router и базовые security headers. На Vercel
задана переменная `VITE_SITE_URL=https://vladislav-levonenko.vercel.app` — она используется
для canonical URL, `robots.txt` и `sitemap.xml`. Для собственного домена замените значение
без завершающего `/`.

### Форма «Обсудить проект»

Форма отправляет заявку в Telegram через Vercel Function `/api/contact` и дублирует её
на email из браузера через Web3Forms. Токен бота остаётся только на сервере. Ключ
Web3Forms специально публичный: их API на бесплатном плане блокирует вызовы с сервера.

1. Создайте бота через [@BotFather](https://t.me/BotFather), откройте нового бота и нажмите
   **Start**. Сохраните токен бота.
2. Получите `chat.id`: после сообщения боту вызовите метод Telegram Bot API `getUpdates`
   с токеном и найдите `message.chat.id` в ответе.
3. Создайте access key на [Web3Forms](https://web3forms.com/) для
   `vladislavlevonenko@gmail.com` и подтвердите адрес из письма.
4. В Vercel откройте **Project Settings → Environment Variables** и добавьте:
   `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `VITE_WEB3FORMS_ACCESS_KEY`.
5. Выполните Redeploy, чтобы сайт и функция получили новые переменные.

Для локальной проверки скопируйте `.env.example` в `.env`, замените заглушки реальными
значениями и запустите `npm run dev`. Файл `.env` исключён из git. Не добавляйте
`TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` с префиксом `VITE_`.

После деплоя проверьте:

- прямой вход и обновление `/cases/salon-lt` и `/cases/investment-academy`;
- клиентскую 404 на неизвестном URL;
- локальное видео, Loom, изображения, форму заявки и прямую `mailto:` ссылку;
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
