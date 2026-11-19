import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { YandexMetricaProvider } from 'next-yandex-metrica';

import { LangSwitcher } from '@/components/lang-switcher';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { APP_URL, YANDEX_METRICA_TAG_ID } from '@/constants/config';
import { Locale, LOCALES } from '@/constants/locales';
import { createLocalePath } from '@/lib/paths';
import {
  DEFAULT_OG_IMAGE,
  HTML_LANGS,
  OG_LOCALES,
} from '@/lib/seo';
import ruCv from '@/locales/ru/cv.json';
import enCv from '@/locales/en/cv.json';
import '../../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'cyrillic'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale as Locale) || 'ru';
  const t = locale === 'ru' ? ruCv : enCv;
  const siteName = `${t.meta.name} ${t.meta.titleSuffix}`;

  return {
    metadataBase: new URL(APP_URL),
    title: {
      default: siteName,
      template: `%s — ${t.meta.name}`,
    },
    description: t.meta.description,
    applicationName: siteName,
    authors: [{ name: t.meta.name, url: `${APP_URL}/${locale}/cv` }],
    creator: t.meta.name,
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [{ url: '/apple-touch-icon.png' }],
      other: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          url: '/android-chrome-192x192.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '512x512',
          url: '/android-chrome-512x512.png',
        },
      ],
    },
    manifest: '/site.webmanifest',
    openGraph: {
      type: 'website',
      siteName,
      locale: OG_LOCALES[locale],
      alternateLocale: locale === 'ru' ? ['en_US'] : ['ru_RU'],
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: siteName,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteName,
      description: t.meta.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

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
    <html
      lang={HTML_LANGS[typedLocale]}
      suppressHydrationWarning
      style={
        {
          WebkitTextSizeAdjust: '100%',
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
        } as React.CSSProperties
      }
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <YandexMetricaProvider
          tagID={YANDEX_METRICA_TAG_ID}
          initParameters={{
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true,
          }}
          router="app"
        >
          <ThemeProvider>
            <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 px-4 py-6 text-zinc-900 dark:from-black dark:to-zinc-950 dark:text-zinc-50">
              <main className="mx-auto flex w-full max-w-4xl flex-col gap-4 rounded-2xl bg-white/80 p-4 shadow-lg ring-1 ring-zinc-200 backdrop-blur-md dark:bg-zinc-950/80 dark:ring-zinc-800 sm:p-6 lg:p-8">
                <header className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-zinc-200 pb-3 text-sm dark:border-zinc-800">
                  <nav className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                    <Link
                      href={createLocalePath(typedLocale, 'cv')}
                      className="rounded-full border border-transparent px-3 py-1 transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                    >
                      {t.nav.cv}
                    </Link>
                    <Link
                      href={createLocalePath(typedLocale, 'portfolio')}
                      className="rounded-full border border-transparent px-3 py-1 transition hover:border-zinc-300 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
                    >
                      {t.nav.portfolio}
                    </Link>
                  </nav>

                  <div className="flex items-center gap-2">
                    <LangSwitcher locale={typedLocale} />
                    <ThemeToggle />
                  </div>
                </header>

                {children}
              </main>
            </div>
          </ThemeProvider>
        </YandexMetricaProvider>
      </body>
    </html>
  );
}
