import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../components/theme-provider';
import { YandexMetricaProvider } from 'next-yandex-metrica';
import { YANDEX_METRICA_TAG_ID } from '@/constants/config';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Anton Moldakov — CV & Portfolio',
  description:
    'CV и портфолио Антона Молдакова: CTO, Teamlead, Frontend & Mobile developer (React, Next.js, React Native, архитектура, DevOps).',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
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
          <ThemeProvider>{children}</ThemeProvider>
        </YandexMetricaProvider>
      </body>
    </html>
  );
}
