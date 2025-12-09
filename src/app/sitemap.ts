import { APP_URL } from '@/constants/config';
import { LOCALES } from '@/constants/locales';
import { getPosts, type PortfolioPost } from '@/lib/posts';

export const dynamic = 'force-static';

export default async function sitemap() {
  const posts = await getPosts();

  const postEntries = posts.flatMap((post: PortfolioPost) =>
    Object.keys(post.locales).map((locale) => ({
      url: `${APP_URL}/${locale}/portfolio/${post.slug}`,
      lastModified: new Date(post.createdAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  // Add other static pages
  const staticPages = LOCALES.flatMap((locale) => [
    {
      url: `${APP_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${APP_URL}/${locale}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]);

  return [...staticPages, ...postEntries];
}
