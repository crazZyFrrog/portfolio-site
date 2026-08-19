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
  WEB3FORMS_ACCESS_KEY?: string;
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
  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error('Telegram environment variables are not configured');
  }

  const lines = [
    'Новая заявка с портфолио',
    '',
    `Имя: ${data.name}`,
    `Телефон: ${data.phone}`,
    `Услуга: ${data.service}`,
    `Email: ${data.email || 'не указан'}`,
    `Источник: ${data.source}`,
  ];

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines.join('\n'),
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`Telegram returned ${response.status}`);
  }
}

async function sendEmail(data: ContactData, env: ContactEnvironment) {
  if (!env.WEB3FORMS_ACCESS_KEY) {
    throw new Error('Web3Forms environment variable is not configured');
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: env.WEB3FORMS_ACCESS_KEY,
      subject: `Новая заявка: ${data.service}`,
      from_name: 'Портфолио Vladislav Levonenko',
      name: data.name,
      phone: data.phone,
      service: data.service,
      email: data.email || undefined,
      source: data.source,
    }),
  });

  if (!response.ok) {
    throw new Error(`Web3Forms returned ${response.status}`);
  }

  const result = (await response.json()) as { success?: boolean };
  if (!result.success) {
    throw new Error('Web3Forms rejected the request');
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
    await Promise.all([sendTelegram(data, env), sendEmail(data, env)]);
    return { status: 200, body: { success: true } };
  } catch (error) {
    console.error('Contact delivery failed:', error);
    return {
      status: 502,
      body: { error: 'Не удалось доставить заявку. Напишите мне напрямую по email.' },
    };
  }
}
