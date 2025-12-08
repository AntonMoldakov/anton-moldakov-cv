export const APP_ROUTES = {
  HOME: '/',
  PORTFOLIO: '/portfolio',
  PORTFOLIO_ITEM: (slug: string) => `/portfolio/${slug}`,
} as const;
