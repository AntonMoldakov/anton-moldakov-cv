import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import portfolioEn from '@/locales/en/portfolio.json';
import portfolioRu from '@/locales/ru/portfolio.json';
import { PortfolioList } from '@/components/portfolio-list';
import { getPosts } from '@/lib/posts';
import { Locale, LOCALES } from '@/constants/locales';

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

async function getPostsLocalList(locale: Locale): Promise<PortfolioPost[]> {
  const posts = await getPosts();

  return posts
    .filter((post) => !!post.locales[locale])
    .map((post) => {
      return {
        createdAt: post.createdAt,
        image: post.image,
        locale: locale,
        slug: post.slug,
        tags: post.locales[locale].tags,
        title: post.locales[locale].title,
        shortDescription: post.locales[locale].shortDescription,
        content: post.locales[locale].content,
      };
    });
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

  const posts = await getPostsLocalList(locale);
  const t = getMessages(locale);

  return <PortfolioList locale={locale} messages={t} posts={posts} />;
}
