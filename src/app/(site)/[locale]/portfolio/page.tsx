import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLd } from '@/components/json-ld';
import { PortfolioList } from '@/components/portfolio-list';
import { getPosts } from '@/lib/posts';
import {
  buildAlternates,
  DEFAULT_OG_IMAGE,
  localeUrl,
  OG_LOCALES,
  SITE_NAMES,
} from '@/lib/seo';
import { Locale, LOCALES } from '@/constants/locales';
import portfolioEn from '@/locales/en/portfolio.json';
import portfolioRu from '@/locales/ru/portfolio.json';

type PortfolioMessages = typeof portfolioEn;

type PortfolioPost = {
  slug: string;
  locale: Locale;
  title: string;
  shortDescription: string;
  createdAt: string;
  tags: string[];
  image: string;
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

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;

  if (!LOCALES.includes(locale)) {
    return {};
  }

  const t = getMessages(locale);
  const url = localeUrl(locale, '/portfolio');

  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: buildAlternates('/portfolio', locale),
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url,
      siteName: SITE_NAMES[locale],
      type: 'website',
      locale: OG_LOCALES[locale],
      alternateLocale: locale === 'ru' ? ['en_US'] : ['ru_RU'],
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: t.meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function PortfolioPage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale as Locale) || 'ru';

  if (!LOCALES.includes(locale)) {
    notFound();
  }

  const posts = await getPostsLocalList(locale);
  const t = getMessages(locale);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t.meta.title,
    description: t.meta.description,
    url: localeUrl(locale, '/portfolio'),
    inLanguage: locale,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((post, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: localeUrl(locale, `/portfolio/${post.slug}`),
        name: post.title,
      })),
    },
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <PortfolioList locale={locale} messages={t} posts={posts} />
    </>
  );
}
