import { Locale, LOCALES } from '@/constants/locales';

export function createLocalePath(locale: Locale, path: string) {
  return `/${locale}${path.startsWith('/') ? '' : '/'}${path}`;
}

export function getLocaleFromPath(path: string): Locale {
  const locale = path.split('/')[1] as Locale;
  return LOCALES.includes(locale) ? locale : 'ru';
}
