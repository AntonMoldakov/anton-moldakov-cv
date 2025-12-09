export const LOCALES = ['ru', 'en'] as const;

export type Locale = (typeof LOCALES)[number];
