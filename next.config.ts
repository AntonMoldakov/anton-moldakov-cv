import type { NextConfig } from 'next';

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Static export so the site can be hosted on GitHub Pages
  output: 'export',
  // In production (GitHub Pages) project is served from /anton-moldakov-cv,
  // in dev it lives at root so that /ru and /en work without 404.
  basePath: isProd ? '/anton-moldakov-cv' : undefined,
  assetPrefix: isProd ? '/anton-moldakov-cv/' : undefined,

  images: {
    unoptimized: true,
    path: '/anton-moldakov-cv',
  },
};

export default nextConfig;
