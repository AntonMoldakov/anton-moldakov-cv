import type { NextConfig } from 'next';

// const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Static export so the site can be hosted on GitHub Pages
  output: 'export',

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
