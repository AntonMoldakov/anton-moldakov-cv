import { APP_URL } from '@/config';
import { getPosts, type PortfolioPost } from '@/lib/posts';

const LOCALES = ['ru', 'en'] as const;

export default async function sitemap() {
  const posts = await getPosts();

  const postEntries = posts.map((post: PortfolioPost) => ({
    url: `${APP_URL}/${post.locale}/portfolio/${post.slug}`,
    lastModified: new Date(post.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

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
