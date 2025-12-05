'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SUPPORTED_LOCALES = ['ru', 'en'] as const;

function getToggledPath(pathname: string, targetLocale: string) {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 0) return `/${targetLocale}`;

  // Replace leading locale segment if present
  if (
    SUPPORTED_LOCALES.includes(
      segments[0] as (typeof SUPPORTED_LOCALES)[number]
    )
  ) {
    segments[0] = targetLocale;
  } else {
    segments.unshift(targetLocale);
  }

  return `/${segments.join('/')}`;
}

export function LangSwitcher({ locale }: { locale: 'ru' | 'en' }) {
  const pathname = usePathname();
  const targetLocale = locale === 'ru' ? 'en' : 'ru';

  const href = getToggledPath(pathname ?? '/', targetLocale);

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide shadow-sm transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
    >
      <span>{locale === 'ru' ? 'RU' : 'EN'}</span>
    </Link>
  );
}
