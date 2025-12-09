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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: 'Anton Moldakov — CV & Portfolio',
  description:
    'CV и портфолио Антона Молдакова: CTO, Teamlead, Frontend & Mobile developer (React, Next.js, React Native, архитектура, DevOps).',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      style={
        {
          WebkitTextSizeAdjust: '100%',
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
        } as React.CSSProperties
      }
    >
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
