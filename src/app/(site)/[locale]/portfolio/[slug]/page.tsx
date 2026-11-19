import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import portfolioEn from '@/locales/en/portfolio.json';
import portfolioRu from '@/locales/ru/portfolio.json';
import { HTMLRenderComponent } from '@/components/html-render-component';
import { JsonLd } from '@/components/json-ld';
import { PostImage } from '@/components/post-image';
import { APP_URL } from '@/constants/config';
import { getOgImage } from '@/lib/images';
import { getPosts } from '@/lib/posts';
import { APP_ROUTES } from '@/constants/app-routes';
import { createLocalePath } from '@/lib/paths';
import {
  buildAlternates,
  localeUrl,
  OG_LOCALES,
  SITE_NAMES,
} from '@/lib/seo';
import { Locale, LOCALES } from '@/constants/locales';

type PortfolioMessages = typeof portfolioEn;

function getMessages(locale: Locale): PortfolioMessages {
  return locale === 'ru' ? portfolioRu : portfolioEn;
}

export async function generateStaticParams() {
  const posts = await getPosts();

  const params = posts.flatMap((post) =>
    Object.keys(post.locales).map((locale) => ({
      locale,
      slug: post.slug,
    }))
  );

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = (rawLocale as Locale) || 'ru';
  const posts = await getPosts();
  const post = posts.find((p) => p.slug === slug);

  const postContent = post?.locales[locale];

  if (!post || !postContent) return {};

  const siteUrl = APP_URL;
  const pageUrl = `${siteUrl}/${locale}/portfolio/${slug}`;
  const ogImage = getOgImage(post.image);
  const imageUrl = post.image.startsWith('http')
    ? post.image
    : `${siteUrl}${ogImage ?? post.image}`;

  return {
    title: postContent.title,
    description: postContent.shortDescription,
    keywords: [...postContent.tags],
    authors: [{ name: SITE_NAMES[locale], url: `${APP_URL}/${locale}/cv` }],
    openGraph: {
      title: postContent.title,
      description: postContent.shortDescription,
      url: pageUrl,
      siteName: SITE_NAMES[locale],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: postContent.title,
        },
      ],
      locale: OG_LOCALES[locale],
      alternateLocale: locale === 'ru' ? ['en_US'] : ['ru_RU'],
      type: 'article',
      publishedTime: post.createdAt,
      modifiedTime: post.createdAt,
      tags: postContent.tags,
      authors: [SITE_NAMES[locale]],
    },
    twitter: {
      card: 'summary_large_image',
      title: postContent.title,
      description: postContent.shortDescription,
      images: [imageUrl],
    },
    alternates: buildAlternates(`/portfolio/${slug}`, locale),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function PortfolioPostPage({ params }: PageProps) {
  const { locale: rawLocale, slug } = await params;
  const locale = (rawLocale as Locale) || 'ru';

  if (!LOCALES.includes(locale)) {
    notFound();
  }

  const t = getMessages(locale);

  const posts = await getPosts();
  const post = posts.find((p) => p.slug === slug);
  const postContent = post?.locales[locale];

  if (!post || !postContent) {
    notFound();
  }

  const postUrl = localeUrl(locale, `/portfolio/${slug}`);
  const ogImage = getOgImage(post.image);
  const imageUrl = post.image.startsWith('http')
    ? post.image
    : `${APP_URL}${ogImage ?? post.image}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: postContent.title,
    description: postContent.shortDescription,
    image: [imageUrl],
    datePublished: post.createdAt,
    dateModified: post.createdAt,
    inLanguage: locale,
    keywords: postContent.tags.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    author: {
      '@type': 'Person',
      name: SITE_NAMES[locale],
      url: `${APP_URL}/${locale}/cv`,
    },
    publisher: {
      '@type': 'Person',
      name: SITE_NAMES[locale],
      url: APP_URL,
    },
  };

  const relatedPosts = posts
    .filter((item) => item.slug !== post.slug && item.locales[locale])
    .map((item) => ({
      slug: item.slug,
      title: item.locales[locale].title,
      createdAt: item.createdAt,
      score: item.locales[locale].tags.filter((tag) =>
        postContent.tags.includes(tag)
      ).length,
    }))
    .filter((item) => item.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: getMessages(locale).title,
        item: localeUrl(locale, '/portfolio'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: postContent.title,
        item: postUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <article className="space-y-6">
      <Link
        href={createLocalePath(locale, APP_ROUTES.PORTFOLIO)}
        className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        &larr; {t.post.back}
      </Link>

      <header className="space-y-3 border-b border-dashed border-zinc-200 pb-4 dark:border-zinc-800">
        <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
          <time dateTime={post.createdAt}>
            {new Date(post.createdAt).toLocaleDateString(
              locale === 'ru' ? 'ru-RU' : 'en-US',
              {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
              }
            )}
          </time>

          <div className="flex flex-wrap gap-1">
            {postContent.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {postContent.title}
        </h1>

        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          {postContent.shortDescription}
        </p>
      </header>

      <PostImage
        src={post.image}
        alt={postContent.title}
        priority
        sizes="(max-width: 768px) 100vw, 768px"
        className="rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
        imgClassName="h-64 w-full"
      />

      <HTMLRenderComponent html={postContent.content} />

      {relatedPosts.length > 0 && (
        <aside className="space-y-2 border-t border-dashed border-zinc-200 pt-4 dark:border-zinc-800">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {t.post.related}
          </h2>
          <ul className="space-y-1 text-sm">
            {relatedPosts.map((related) => (
              <li key={related.slug}>
                <Link
                  href={createLocalePath(
                    locale,
                    APP_ROUTES.PORTFOLIO_ITEM(related.slug)
                  )}
                  className="text-zinc-700 underline decoration-dotted underline-offset-2 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
                >
                  {related.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
      </article>
    </>
  );
}
