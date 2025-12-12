import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import portfolioEn from '@/locales/en/portfolio.json';
import portfolioRu from '@/locales/ru/portfolio.json';
import { HTMLRenderComponent } from '@/components/html-render-component';
import { PostImage } from '@/components/post-image';
import { APP_URL } from '@/constants/config';
import { getPosts } from '@/lib/posts';
import { APP_ROUTES } from '@/constants/app-routes';
import { createLocalePath } from '@/lib/paths';
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
  const imageUrl = post.image.startsWith('http')
    ? post.image
    : `${siteUrl}${post.image}`;

  return {
    title: `${postContent.title} | Portfolio`,
    description: postContent.shortDescription,
    keywords: ['portfolio', 'projects', ...post.tags],
    authors: [{ name: 'Anton Moldakov' }],
    openGraph: {
      title: postContent.title,
      description: postContent.shortDescription,
      url: pageUrl,
      siteName: 'Anton Moldakov',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: postContent.title,
        },
      ],
      locale: locale,
      type: 'article',
      publishedTime: post.createdAt,
      modifiedTime: post.createdAt,
      tags: post.tags,
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        en: locale === 'en' ? undefined : `/en/portfolio/${slug}`,
        ru: locale === 'ru' ? undefined : `/ru/portfolio/${slug}`,
      },
    },
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

  return (
    <article className="space-y-6">
      <a
        href={createLocalePath(locale, APP_ROUTES.PORTFOLIO)}
        className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        &larr; {t.post.back}
      </a>

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
            {post.tags.map((tag) => (
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
        className="rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
        imgClassName="h-64 w-full"
      />

      <HTMLRenderComponent html={postContent.content} />
    </article>
  );
}
