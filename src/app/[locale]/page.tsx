import { redirect } from 'next/navigation';

const LOCALES = ['ru', 'en'] as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function LocaleHome() {
  console.log('LocaleHome rendered');
  // Redirect root to default locale (Russian)
  redirect('/ru/cv');
}
