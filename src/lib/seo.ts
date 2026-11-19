import { APP_URL } from '@/constants/config';
import { LOCALES, type Locale } from '@/constants/locales';

export const OG_LOCALES: Record<Locale, string> = {
  ru: 'ru_RU',
  en: 'en_US',
};

export const HTML_LANGS: Record<Locale, string> = {
  ru: 'ru',
  en: 'en',
};

export const SITE_NAMES: Record<Locale, string> = {
  ru: 'Антон Молдаков',
  en: 'Anton Moldakov',
};

export const DEFAULT_OG_IMAGE = '/images/og-default.jpg';

/** Absolute URL for a locale-scoped path, e.g. `localeUrl('ru', '/cv')`. */
export function localeUrl(locale: Locale, path = ''): string {
  const normalized = path && path !== '/' ? path : '';
  return `${APP_URL}/${locale}${normalized}`;
}

/**
 * Canonical URL plus hreflang alternates (including `x-default`) for a path
 * that is identical across locales (`/cv`, `/portfolio`, `/portfolio/<slug>`).
 */
export function buildAlternates(path: string, locale: Locale) {
  const languages = Object.fromEntries(
    LOCALES.map((item) => [item, localeUrl(item, path)])
  ) as Record<Locale, string>;

  return {
    canonical: localeUrl(locale, path),
    languages: {
      ...languages,
      'x-default': localeUrl('ru', path),
    },
  };
}

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${APP_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

export function truncate(text: string, max = 160): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, max - 1).trimEnd()}…`;
}
