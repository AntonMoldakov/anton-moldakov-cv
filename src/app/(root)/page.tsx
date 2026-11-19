import type { Metadata } from 'next';
import Link from 'next/link';

import { APP_URL } from '@/constants/config';

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

/**
 * Static, JS-free redirect to the default locale. React 19 hoists the
 * `<meta http-equiv="refresh">` into `<head>`.
 */
export default function HomePage() {
  return (
    <>
      <meta httpEquiv="refresh" content="0; url=/ru/cv" />
      <link rel="canonical" href={`${APP_URL}/ru/cv`} />
      <p>
        <Link href="/ru/cv">Антон Молдаков — CV и портфолио</Link>
      </p>
    </>
  );
}
