import type { Metadata } from 'next';
import Link from 'next/link';

import { LOCALES, type Locale } from '@/constants/locales';
import { localeUrl } from '@/lib/seo';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

/**
 * `/{locale}` is a permanent entry point that redirects to the CV page.
 * A `<meta http-equiv="refresh">` keeps the redirect static and JS-free
 * (React 19 hoists the tag into `<head>`), unlike `redirect()` which
 * degrades to a client-side error shell under `output: 'export'`.
 */
export default async function LocaleRedirectPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale as Locale) || 'ru';
  const target = `/${locale}/cv`;

  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <link rel="canonical" href={localeUrl(locale, '/cv')} />
      <p className="text-sm">
        <Link
          href={target}
          className="underline decoration-dotted underline-offset-2"
        >
          {target}
        </Link>
      </p>
    </>
  );
}
