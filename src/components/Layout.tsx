import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ArrowUpRight, Mail } from 'lucide-react';
import { profile } from '../data/profile';
import { ContactModalProvider } from './ContactModal';
import { useContactModal } from './ContactModalContext';

export default function Layout() {
  return (
    <ContactModalProvider>
      <LayoutContent />
    </ContactModalProvider>
  );
}

function LayoutContent() {
  const location = useLocation();
  const { openContactModal } = useContactModal();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    requestAnimationFrame(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    });
  }, [location.pathname, location.hash]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-ink-800/80 bg-ink-950/90 backdrop-blur-xl">
        <div className="section-shell flex h-16 items-center justify-between">
          <Link
            to="/"
            aria-label="На главную"
            className="font-display text-2xl font-semibold tracking-[-0.08em] text-ink-100 transition hover:text-accent"
          >
            VL<span className="text-accent">.</span>
          </Link>

          <nav className="flex items-center gap-5 sm:gap-8">
            <Link
              to="/#cases"
              className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400 transition hover:text-accent sm:inline"
            >
              Проекты
            </Link>
            <Link
              to="/#about"
              className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400 transition hover:text-accent sm:inline"
            >
              О себе
            </Link>
            <button
              type="button"
              onClick={() => openContactModal('Шапка сайта')}
              className="inline-flex items-center gap-2 border border-ink-100 bg-ink-100 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-950 transition hover:border-accent hover:bg-accent sm:px-4"
            >
              <span>Обсудить проект</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-ink-800 py-8">
        <div className="section-shell flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 font-display text-3xl text-ink-100">VL<span className="text-accent">.</span></p>
            <p className="max-w-sm text-xs leading-relaxed text-ink-500">
              Цифровые продукты и автоматизация — от идеи до production.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-left sm:text-right">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 text-xs text-ink-300 transition hover:text-accent sm:justify-end"
            >
              <Mail className="h-3.5 w-3.5" />
              {profile.email}
            </a>
            <p className="text-[10px] uppercase tracking-[0.14em] text-ink-500">
              © {new Date().getFullYear()} {profile.name}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
