import { handleContactSubmission } from '../server/contact';

interface ApiRequest {
  method?: string;
  body?: unknown;
}

interface ApiResponse {
  status: (code: number) => ApiResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
}

export default async function contactHandler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    response.status(405).json({ error: 'Метод не поддерживается.' });
    return;
  }

  const result = await handleContactSubmission(request.body, {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
    WEB3FORMS_ACCESS_KEY: process.env.WEB3FORMS_ACCESS_KEY,
  });

  response.status(result.status).json(result.body);
}
