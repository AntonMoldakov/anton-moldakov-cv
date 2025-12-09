'use client';

import * as React from 'react';
import { ALink } from '@/components/a-link';
import { useLocalePaths } from '@/hooks/use-locale-paths';

import type portfolioEn from '@/locales/en/portfolio.json';
import { APP_ROUTES } from '@/constants/app-routes';
import { Locale } from '@/constants/locales';

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

type Props = {
  locale: Locale;
  messages: PortfolioMessages;
  posts: PortfolioPost[];
};

export function PortfolioList({ locale, messages: t, posts }: Props) {
  const [query, setQuery] = React.useState('');
  const [sort, setSort] = React.useState<'asc' | 'desc'>('desc');

  const { createPath } = useLocalePaths();

  const filtered = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const byQuery = posts.filter((post) => {
      if (!normalizedQuery) return true;

      const haystack = [post.title, post.shortDescription, ...post.tags]
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });

    return byQuery.sort((a, b) => {
      const aTime = new Date(a.createdAt).getTime();
      const bTime = new Date(b.createdAt).getTime();

      if (sort === 'asc') return aTime - bTime;
      return bTime - aTime;
    });
  }, [posts, query, sort]);

  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-zinc-200 pb-4 text-sm dark:border-zinc-800">
        <h1 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {t.title}
        </h1>

        <form
          className="flex flex-wrap items-center gap-3 text-xs"
          onSubmit={(e) => e.preventDefault()}
        >
          <label className="flex items-center gap-2">
            <span className="sr-only">{t.search.label}</span>
            <input
              type="search"
              name="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.search.placeholder}
              className="w-52 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-900 shadow-sm outline-none transition focus:border-zinc-400 focus:bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-500"
            />
          </label>

          <label className="flex items-center gap-2">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
              {t.sort.label}
            </span>
            <select
              name="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as 'asc' | 'desc')}
              className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-900 shadow-sm outline-none transition focus:border-zinc-400 focus:bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-500"
            >
              <option value="desc">{t.sort.desc}</option>
              <option value="asc">{t.sort.asc}</option>
            </select>
          </label>
        </form>
      </header>

      {filtered.length === 0 ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {t.list.empty}
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {filtered.map((post) => (
            <li
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white/80 shadow-sm ring-1 ring-zinc-100 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-zinc-200 dark:border-zinc-800 dark:bg-zinc-950/80 dark:ring-zinc-900 dark:hover:ring-zinc-700"
            >
              <ALink
                href={createPath(APP_ROUTES.PORTFOLIO_ITEM(post.slug))}
                className="flex flex-1 flex-col"
              >
                <div className="relative h-40 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-contain object-center transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-2 p-4">
                  <div className="flex items-center justify-between gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                    <time dateTime={post.createdAt}>
                      {t.list.createdAt}:{' '}
                      {new Date(post.createdAt).toLocaleDateString(
                        locale === 'ru' ? 'ru-RU' : 'en-US',
                        {
                          year: 'numeric',
                          month: 'short',
                          day: '2-digit',
                        }
                      )}
                    </time>
                  </div>

                  <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    {post.title}
                  </h2>

                  <p className="line-clamp-3 text-xs text-zinc-600 dark:text-zinc-300">
                    {post.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-600 group-hover:bg-zinc-900 group-hover:text-zinc-50 dark:bg-zinc-900 dark:text-zinc-300 dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-900"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ALink>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
