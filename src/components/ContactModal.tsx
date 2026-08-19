import {
  FormEvent,
  ReactNode,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { ArrowUpRight, Check, Mail, X } from 'lucide-react';
import { profile } from '../data/profile';
import { ContactModalContext } from './ContactModalContext';

const services = ['Лендинг', 'Онлайн-запись', 'Автоматизация', 'Админ-панель', 'Другое'];

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState('Сайт');

  const openContactModal = useCallback((nextSource = 'Сайт') => {
    setSource(nextSource);
    setIsOpen(true);
  }, []);
  const closeContactModal = useCallback(() => setIsOpen(false), []);

  return (
    <ContactModalContext.Provider value={{ openContactModal }}>
      {children}
      {isOpen && <ContactModal source={source} onClose={closeContactModal} />}
    </ContactModalContext.Provider>
  );
}

interface ContactModalProps {
  source: string;
  onClose: () => void;
}

function ContactModal({ source, onClose }: ContactModalProps) {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [onClose]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('submitting');
    setError('');

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, source }),
      });
      const raw = await response.text();
      let result: { error?: string } = {};

      try {
        result = raw ? (JSON.parse(raw) as { error?: string }) : {};
      } catch {
        throw new Error('Не удалось отправить заявку. Попробуйте ещё раз.');
      }

      if (!response.ok) {
        throw new Error(result.error || 'Не удалось отправить заявку.');
      }

      setStatus('success');
      event.currentTarget.reset();
    } catch (submitError) {
      setStatus('error');
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Не удалось отправить заявку. Попробуйте ещё раз.',
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink-950/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        className="relative max-h-[100svh] w-full overflow-y-auto border border-ink-700 bg-ink-950 p-6 shadow-2xl sm:max-w-2xl sm:p-10"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Закрыть форму"
          className="absolute right-5 top-5 grid h-10 w-10 place-items-center border border-ink-700 text-ink-400 transition hover:border-accent hover:text-accent"
        >
          <X className="h-5 w-5" />
        </button>

        {status === 'success' ? (
          <div className="flex min-h-[24rem] flex-col items-start justify-center">
            <span className="mb-7 grid h-14 w-14 place-items-center border border-accent text-accent">
              <Check className="h-7 w-7" />
            </span>
            <p className="eyebrow mb-4">Заявка отправлена</p>
            <h2 id={titleId} className="font-display text-5xl leading-none text-ink-100">
              Спасибо!
            </h2>
            <p id={descriptionId} className="mt-5 max-w-md text-sm leading-relaxed text-ink-400">
              Я получил ваши контакты и свяжусь с вами, чтобы обсудить задачу.
            </p>
            <button type="button" onClick={onClose} className="btn-primary mt-8">
              Закрыть
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow mb-4">Новый проект</p>
            <h2 id={titleId} className="pr-12 font-display text-5xl leading-none text-ink-100 sm:text-6xl">
              Обсудим задачу.
            </h2>
            <p id={descriptionId} className="mt-5 max-w-lg text-sm leading-relaxed text-ink-400">
              Оставьте контакты — я отвечу и предложу подходящий первый шаг.
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="mt-8 grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-400">
                  Имя *
                </span>
                <input
                  required
                  name="name"
                  autoComplete="name"
                  maxLength={80}
                  className="w-full border border-ink-700 bg-ink-900 px-4 py-3 text-sm text-ink-100 outline-none transition placeholder:text-ink-500 focus:border-accent"
                  placeholder="Как к вам обращаться"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-400">
                  Телефон *
                </span>
                <input
                  required
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  maxLength={40}
                  className="w-full border border-ink-700 bg-ink-900 px-4 py-3 text-sm text-ink-100 outline-none transition placeholder:text-ink-500 focus:border-accent"
                  placeholder="+7 999 000-00-00"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-400">
                  Услуга *
                </span>
                <select
                  required
                  name="service"
                  defaultValue=""
                  className="w-full border border-ink-700 bg-ink-900 px-4 py-3 text-sm text-ink-100 outline-none transition focus:border-accent"
                >
                  <option value="" disabled>
                    Выберите услугу
                  </option>
                  {services.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-400">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  maxLength={120}
                  className="w-full border border-ink-700 bg-ink-900 px-4 py-3 text-sm text-ink-100 outline-none transition placeholder:text-ink-500 focus:border-accent"
                  placeholder="name@example.com"
                />
              </label>

              <label className="absolute -left-[9999px]" aria-hidden="true">
                Сайт
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>

              <div className="sm:col-span-2">
                {status === 'error' && (
                  <p role="alert" className="mb-4 border-l-2 border-accent pl-3 text-xs text-ink-300">
                    {error}{' '}
                    <a href={`mailto:${profile.email}`} className="text-accent underline">
                      Написать напрямую
                    </a>
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-primary w-full disabled:cursor-wait disabled:opacity-60 sm:w-auto"
                >
                  {status === 'submitting' ? 'Отправляем…' : 'Отправить заявку'}
                  {status !== 'submitting' && <ArrowUpRight className="h-4 w-4" />}
                </button>
                <p className="mt-4 flex items-center gap-2 text-[10px] leading-relaxed text-ink-500">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  Заявка придёт мне в Telegram и на почту
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
