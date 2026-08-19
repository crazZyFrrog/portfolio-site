const allowedServices = new Set([
  'Лендинг',
  'Онлайн-запись',
  'Автоматизация',
  'Админ-панель',
  'Другое',
]);

export interface ContactEnvironment {
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
}

export interface ContactResult {
  status: number;
  body: { success?: true; error?: string };
}

interface ContactData {
  name: string;
  phone: string;
  service: string;
  email: string;
  source: string;
}

function getString(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function escapeHtml(value: string) {
  return value.replace(/[&<>]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
    };
    return entities[character];
  });
}

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, '');

  if (digits.length === 11 && digits.startsWith('8')) {
    return `7${digits.slice(1)}`;
  }

  if (digits.length === 10 && digits.startsWith('9')) {
    return `7${digits}`;
  }

  return digits;
}

function parseContactData(input: unknown): ContactData | string {
  if (!input || typeof input !== 'object') {
    return 'Некорректные данные формы.';
  }

  const payload = input as Record<string, unknown>;
  const name = getString(payload.name, 80);
  const phone = getString(payload.phone, 40);
  const service = getString(payload.service, 40);
  const email = getString(payload.email, 120);
  const source = getString(payload.source, 120) || 'Сайт';

  if (name.length < 2) {
    return 'Укажите имя.';
  }

  if ((phone.match(/\d/g) ?? []).length < 6) {
    return 'Укажите корректный номер телефона.';
  }

  if (!allowedServices.has(service)) {
    return 'Выберите услугу из списка.';
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Укажите корректный email.';
  }

  return { name, phone, service, email, source };
}

async function sendTelegram(data: ContactData, env: ContactEnvironment) {
  const token = env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) {
    throw new Error('Telegram environment variables are not configured');
  }

  const submittedAt = new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'short',
    timeStyle: 'short',
    timeZone: 'Europe/Moscow',
  }).format(new Date());
  const whatsappPhone = normalizePhone(data.phone);
  const lines = [
    '<b>Новая заявка с портфолио</b>',
    '',
    `<b>Имя:</b> ${escapeHtml(data.name)}`,
    `<b>Телефон:</b> ${escapeHtml(data.phone)}`,
    `<b>Услуга:</b> ${escapeHtml(data.service)}`,
    `<b>Email:</b> ${escapeHtml(data.email || 'не указан')}`,
    `<b>Источник:</b> ${escapeHtml(data.source)}`,
    `<b>Получена:</b> ${submittedAt} МСК`,
  ];

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join('\n'),
      parse_mode: 'HTML',
      disable_web_page_preview: true,
      reply_markup:
        whatsappPhone.length >= 10
          ? {
              inline_keyboard: [
                [
                  {
                    text: 'Написать в WhatsApp',
                    url: `https://wa.me/${whatsappPhone}`,
                  },
                ],
              ],
            }
          : undefined,
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Telegram returned ${response.status}: ${details}`);
  }
}

export async function handleContactSubmission(
  input: unknown,
  env: ContactEnvironment,
): Promise<ContactResult> {
  if (input && typeof input === 'object' && getString((input as Record<string, unknown>).website, 200)) {
    return { status: 200, body: { success: true } };
  }

  const data = parseContactData(input);
  if (typeof data === 'string') {
    return { status: 400, body: { error: data } };
  }

  try {
    await sendTelegram(data, env);
    return { status: 200, body: { success: true } };
  } catch (error) {
    console.error('Contact delivery failed:', error);
    return {
      status: 502,
      body: { error: 'Не удалось доставить заявку. Напишите мне напрямую по email.' },
    };
  }
}

function envFromProcess(): ContactEnvironment {
  return {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
  };
}

async function readJsonBody(request: Request): Promise<unknown> {
  const text = await request.text();
  if (!text) {
    return null;
  }

  return JSON.parse(text) as unknown;
}

type NodeLikeRequest = Request & {
  method?: string;
  body?: unknown;
};

interface NodeLikeResponse {
  status: (code: number) => { json: (body: unknown) => void };
}

async function resolvePayload(request: NodeLikeRequest) {
  if (request.body !== undefined && typeof request.json !== 'function') {
    return request.body;
  }

  if (typeof request.json === 'function' || typeof request.text === 'function') {
    return readJsonBody(request);
  }

  return request.body ?? null;
}

export async function POST(request: Request) {
  try {
    const payload = await resolvePayload(request);
    const result = await handleContactSubmission(payload, envFromProcess());
    return Response.json(result.body, { status: result.status });
  } catch (error) {
    console.error('Contact function failed:', error);
    return Response.json(
      { error: 'Не удалось отправить заявку. Попробуйте ещё раз.' },
      { status: 500 },
    );
  }
}

export default async function handler(request: NodeLikeRequest, response?: NodeLikeResponse) {
  if (response && typeof response.status === 'function') {
    try {
      if (request.method !== 'POST') {
        response.status(405).json({ error: 'Метод не поддерживается.' });
        return;
      }

      const payload = await resolvePayload(request);
      const result = await handleContactSubmission(payload, envFromProcess());
      response.status(result.status).json(result.body);
    } catch (error) {
      console.error('Contact function failed:', error);
      response.status(500).json({ error: 'Не удалось отправить заявку. Попробуйте ещё раз.' });
    }
    return;
  }

  if (request.method && request.method !== 'POST') {
    return Response.json({ error: 'Метод не поддерживается.' }, { status: 405 });
  }

  return POST(request);
}

export const runtime = 'nodejs';
