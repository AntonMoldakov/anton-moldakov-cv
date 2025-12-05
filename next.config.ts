import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export so the site can be hosted on GitHub Pages
  output: 'export',
  // We keep i18n manual via route segment [locale] to have full control
  // over indexable /ru and /en paths.
};

export default nextConfig;
