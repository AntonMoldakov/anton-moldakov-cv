'use client';

import { usePathname } from 'next/navigation';

import { Locale, LOCALES } from '@/constants/locales';

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
