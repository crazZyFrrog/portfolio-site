import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { handleContactSubmission } from './server/contact.ts';

const routes = ['/', '/cases/salon-lt', '/cases/investment-academy'];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const vercelHost = env.VERCEL_PROJECT_PRODUCTION_URL || env.VERCEL_URL;
  const siteUrl = (env.VITE_SITE_URL || (vercelHost ? `https://${vercelHost}` : 'http://localhost:4173')).replace(
    /\/+$/,
    '',
  );

  return {
    plugins: [
      react(),
      {
        name: 'site-metadata',
        transformIndexHtml(html) {
          return html.replaceAll('__SITE_URL__', siteUrl);
        },
        generateBundle() {
          const urls = routes
            .map((route) => `  <url><loc>${siteUrl}${route}</loc></url>`)
            .join('\n');

          this.emitFile({
            type: 'asset',
            fileName: 'sitemap.xml',
            source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
          });
          this.emitFile({
            type: 'asset',
            fileName: 'robots.txt',
            source: `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
          });
        },
      },
      {
        name: 'local-contact-api',
        configureServer(server) {
          server.middlewares.use('/api/contact', async (request, response) => {
            response.setHeader('Content-Type', 'application/json; charset=utf-8');

            if (request.method !== 'POST') {
              response.statusCode = 405;
              response.setHeader('Allow', 'POST');
              response.end(JSON.stringify({ error: 'Метод не поддерживается.' }));
              return;
            }

            try {
              const chunks: Buffer[] = [];
              let size = 0;

              for await (const chunk of request) {
                const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
                size += buffer.length;
                if (size > 16_384) {
                  response.statusCode = 413;
                  response.end(JSON.stringify({ error: 'Слишком большой запрос.' }));
                  return;
                }
                chunks.push(buffer);
              }

              const payload = JSON.parse(Buffer.concat(chunks).toString('utf8')) as unknown;
              const result = await handleContactSubmission(payload, env);
              response.statusCode = result.status;
              response.end(JSON.stringify(result.body));
            } catch {
              response.statusCode = 400;
              response.end(JSON.stringify({ error: 'Некорректные данные формы.' }));
            }
          });
        },
      },
    ],
    server: {
      host: '127.0.0.1',
      port: 5173,
    },
  };
});
