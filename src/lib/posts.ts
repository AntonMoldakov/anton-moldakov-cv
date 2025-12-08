import fs from 'node:fs/promises';
import path from 'node:path';

const LOCALES = ['ru', 'en'] as const;
type Locale = (typeof LOCALES)[number];

export interface PortfolioPost {
  slug: string;
  locale: Locale;
  title: string;
  shortDescription: string;
  createdAt: string;
  tags: string[];
  image: string;
  content: string;
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
