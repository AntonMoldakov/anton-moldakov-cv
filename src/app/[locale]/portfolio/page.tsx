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

  type Fn<A, B> = (x: A) => B;

  const pipe =
    <A, B, C, D>(fn1: Fn<A, B>, fn2: Fn<B, C>, fn3: Fn<C, D>): Fn<A, D> =>
    (x: A): D => {
      return fn3(fn2(fn1(x)));
    };

  const sum = (a: number) => (b: number) => a + b;
  const mul = (a: number) => (b: number) => a * b;
  const stringify = (a: number) => true;

  const composed = pipe(sum(1), mul(2), stringify);

  const result = composed(3);

  const posts = await getPostsLocalList(locale);
  const t = getMessages(locale);

  return <PortfolioList locale={locale} messages={t} posts={posts} />;
}
