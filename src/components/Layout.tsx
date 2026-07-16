import { Link, Outlet } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { profile, mailtoHref } from '../data/profile';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-ink-800 bg-ink-950">
        <div className="mx-auto flex max-w-5xl items-center justify-end px-4 py-4 sm:px-6">
          <nav className="flex items-center gap-5 sm:gap-6">
            <Link
              to="/#cases"
              className="hidden text-sm text-ink-300 transition hover:text-ink-100 sm:inline"
            >
              Кейсы
            </Link>
            <Link
              to="/#about"
              className="hidden text-sm text-ink-300 transition hover:text-ink-100 sm:inline"
            >
              О себе
            </Link>
            <a
              href={mailtoHref()}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-medium text-white transition hover:bg-accent-light sm:px-4"
            >
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Связаться</span>
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-ink-800 py-8">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:px-6 sm:text-left">
          <p className="text-sm text-ink-500">
            © {new Date().getFullYear()} {profile.name} · {profile.title}
          </p>
          <a
            href={mailtoHref()}
            className="text-sm text-ink-300 underline underline-offset-4 transition hover:text-accent"
          >
            {profile.email}
          </a>
        </div>
      </footer>
    </div>
  );
}
