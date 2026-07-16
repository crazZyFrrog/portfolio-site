import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <h1 className="mb-4 text-4xl font-bold text-ink-100">404</h1>
      <p className="mb-8 text-ink-300">Страница не найдена</p>
      <Link
        to="/"
        className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition hover:bg-accent-light"
      >
        На главную
      </Link>
    </div>
  );
}
