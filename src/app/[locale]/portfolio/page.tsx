import fs from 'node:fs/promises';
import path from 'node:path';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import portfolioEn from '@/locales/en/portfolio.json';
import portfolioRu from '@/locales/ru/portfolio.json';
import { PortfolioList } from '@/components/portfolio-list';

const LOCALES = ['ru', 'en'] as const;

type Locale = (typeof LOCALES)[number];

type PortfolioMessages = typeof portfolioEn;

type PortfolioPost = {
  slug: string;
  locale: Locale;
  title: string;
  shortDescription: string;
  createdAt: string;
  tags: string[];
  image: string;
  content: string;
};

async function getPosts(locale: Locale): Promise<PortfolioPost[]> {
  const filePath = path.join(
    process.cwd(),
    'src',
    'data',
    'portfolio-posts.json'
  );
  const raw = await fs.readFile(filePath, 'utf-8');
  const allPosts = JSON.parse(raw) as PortfolioPost[];

  return allPosts.filter((post) => post.locale === locale);
}

function getMessages(locale: Locale): PortfolioMessages {
  return locale === 'ru' ? portfolioRu : portfolioEn;
}

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: 'Portfolio',
};

export default async function PortfolioPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale as Locale) || 'ru';

  if (!LOCALES.includes(locale)) {
    notFound();
  }

  const posts = await getPosts(locale);
  const t = getMessages(locale);

  return <PortfolioList locale={locale} messages={t} posts={posts} />;
}
