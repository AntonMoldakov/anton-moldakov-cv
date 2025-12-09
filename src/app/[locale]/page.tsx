import { LOCALES } from '@/constants/locales';
import { redirect } from 'next/navigation';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function LocaleHome() {
  console.log('LocaleHome rendered');
  // Redirect root to default locale (Russian)
  redirect('/ru/cv');
}
