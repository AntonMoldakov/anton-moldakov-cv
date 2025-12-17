import fs from 'node:fs/promises';
import path from 'node:path';

import { Locale } from '@/constants/locales';

export interface PortfolioPost {
  slug: string;
  createdAt: string;

  image: string;
  locales: Record<
    Locale,
    { title: string; shortDescription: string; content: string; tags: string[] }
  >;
}

export async function getPosts(): Promise<PortfolioPost[]> {
  const filePath = path.join(
    process.cwd(),
    'src',
    'data',
    'portfolio-posts.json'
  );
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw) as PortfolioPost[];
}
