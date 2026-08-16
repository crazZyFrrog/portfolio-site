import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

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
    ],
    server: {
      host: '127.0.0.1',
      port: 5173,
    },
  };
});
