'use client';

import { usePathname } from 'next/navigation';

const LOCALES = ['ru', 'en'] as const;
type Locale = (typeof LOCALES)[number];

export function useLocalePaths() {
  const pathname = usePathname() ?? '/';

  // Extract locale from pathname and validate it
  const rawLocale = pathname.split('/')[1];
  const locale = (
    LOCALES.includes(rawLocale as Locale) ? rawLocale : 'ru'
  ) as Locale;

  const createPath = (path: string) => {
    return `/${locale}${path.startsWith('/') ? '' : '/'}${path}`;
  };

  return {
    locale,
    createPath,
    paths: {
      home: createPath(''),
      portfolio: createPath('portfolio'),
      cv: createPath(''),
    },
  };
}
