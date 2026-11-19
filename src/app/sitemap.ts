import type { MetadataRoute } from 'next';

import { APP_URL } from '@/constants/config';
import { LOCALES } from '@/constants/locales';
import { getPosts } from '@/lib/posts';

export const dynamic = 'force-static';

function languageAlternates(path: string): Record<string, string> {
  const alternates = Object.fromEntries(
    LOCALES.map((locale) => [locale, `${APP_URL}/${locale}${path}`])
  );
  return { ...alternates, 'x-default': `${APP_URL}/ru${path}` };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  // Content-derived date: keeps the sitemap stable between builds instead of
  // claiming every page changed on every deploy.
  const latestUpdate = posts.reduce(
    (latest, post) => {
      const date = new Date(post.createdAt);
      return date > latest ? date : latest;
    },
    new Date(0)
  );

  const staticPages: MetadataRoute.Sitemap = LOCALES.flatMap((locale) => [
    {
      url: `${APP_URL}/${locale}/cv`,
      lastModified: latestUpdate,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages: languageAlternates('/cv') },
    },
    {
      url: `${APP_URL}/${locale}/portfolio`,
      lastModified: latestUpdate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: { languages: languageAlternates('/portfolio') },
    },
  ]);

  const postEntries: MetadataRoute.Sitemap = posts.flatMap((post) =>
    Object.keys(post.locales).map((locale) => ({
      url: `${APP_URL}/${locale}/portfolio/${post.slug}`,
      lastModified: new Date(post.createdAt),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
      alternates: {
        languages: languageAlternates(`/portfolio/${post.slug}`),
      },
    }))
  );

  return [...staticPages, ...postEntries];
}
