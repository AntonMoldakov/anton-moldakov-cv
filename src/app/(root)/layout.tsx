import type { ReactNode } from 'react';

/**
 * Second root layout (route groups) for the site root redirect, so `/` works
 * both in `next dev` and in the static export.
 */
export default function RootRedirectLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
