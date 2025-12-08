import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { LangSwitcher } from '../../components/lang-switcher';
import { ThemeToggle } from '../../components/theme-toggle';
import ruCv from '../../locales/ru/cv.json';
import enCv from '../../locales/en/cv.json';

const LOCALES = ['ru', 'en'] as const;

type Locale = (typeof LOCALES)[number];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;

  if (!LOCALES.includes(typedLocale)) {
    notFound();
  }

  const t = typedLocale === 'ru' ? ruCv : enCv;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 px-4 py-6 text-zinc-900 dark:from-black dark:to-zinc-950 dark:text-zinc-50">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-4 rounded-2xl bg-white/80 p-4 shadow-lg ring-1 ring-zinc-200 backdrop-blur-md dark:bg-zinc-950/80 dark:ring-zinc-800 sm:p-6 lg:p-8">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-zinc-200 pb-3 text-sm dark:border-zinc-800">
          <nav className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
            <a
              href={`/${typedLocale}`}
              className="rounded-full border border-transparent px-3 py-1 transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
            >
              {t.nav.cv}
            </a>
            <a
              href={`/${typedLocale}/portfolio`}
              className="rounded-full border border-transparent px-3 py-1 transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
            >
              {t.nav.portfolio}
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <LangSwitcher locale={typedLocale} />
            <ThemeToggle />
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
