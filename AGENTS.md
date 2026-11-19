# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal CV/portfolio site of Anton Moldakov. Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4, `next-themes`, static export to GitHub Pages at https://moldakov-anton.ru. Two locales: `ru` (default) and `en`.

## Commands

```bash
yarn dev            # dev server on :3000 (root redirects to /ru/cv)
yarn build          # static export to ./out
yarn lint           # eslint (next/core-web-vitals + next/typescript)
yarn eslint <path>  # lint a single file/dir
npx tsc --noEmit    # typecheck (no dedicated script)
```

CI (`.github/workflows/nextjs.yml`) runs on push to `main` and deploys to GitHub Pages. It prefers `yarn` whenever `yarn.lock` exists, so use **yarn** for dependency changes; `package-lock.json` is also present, but CI never uses it — don't mix package managers.

There is no test runner or test script in this repo.

## Architecture

### Static export constraints

`next.config.ts` sets `output: 'export'` and `images.unoptimized: true`. There is no server runtime:

- Every dynamic route must provide `generateStaticParams`; data must be readable at build time (filesystem/`import`, not fetch-at-request).
- `next/image` works only because optimization is disabled.
- Domain is a custom domain (CNAME at repo root), so no `basePath` is configured. Adding one would require rewriting every absolute asset path and locale link.

### Routing

```
/                      → static redirect to /ru/cv      (public/index.html)
/[locale]              → static redirect to /{locale}/cv (public/{ru,en}/index.html)
/[locale]/cv           → CV page
/[locale]/portfolio    → list with client-side search/sort
/[locale]/portfolio/[slug] → post; static params generated only for locales present in each post
/[locale]/*            → wrapped by src/app/(site)/[locale]/layout.tsx (root layout: <html lang>, nav, LangSwitcher, ThemeToggle, 404 on unknown locale)
```

Locale redirects are plain HTML files in `public/` (meta refresh + canonical) rather than Next `redirect()`: with `output: 'export'` a `redirect()` page renders a JS-only error shell.

Locale helpers: `createLocalePath` (server, `src/lib/paths.ts`) and `useLocalePaths` (client hook, `src/hooks/use-locale-paths.ts`); route constants in `src/constants/app-routes.ts`.

### Content and i18n

- **`src/locales/{ru,en}/{cv,portfolio}.json` are the only translations actually used.** They are imported directly by server components (e.g. `import cvRu from '@/locales/ru/cv.json'`) and picked via `locale === 'ru' ? ... : ...` with `type X = typeof enJson` for typing.
- The root-level `locales/` directory is a stale duplicate (its `cv.json` differs) and is not imported anywhere. Edit only `src/locales/`.
- CV content is static JSON: `nav`, `sections`, `contacts*`, `profile`, `skills`, `skillsLabels`, `experience[]`, `education`, etc. Rich text is stored as HTML strings (`companyHtml`, `articlesHtml`) and rendered through `HTMLRenderComponent`; plain strings with links must be turned into HTML rather than parsed ad hoc.
- `src/data/portfolio-posts.json` holds all portfolio posts; `src/lib/posts.ts` reads it with `fs` from `process.cwd()` at build time. Each post has `slug`, `createdAt`, `image` (path under `/public`), and per-locale `{ title, shortDescription, content (HTML), tags }`. Only locales present in `post.locales` produce pages.
- Adding a locale requires: adding to `LOCALES` in `src/constants/locales.ts`, adding `src/locales/<locale>/*.json`, and updating per-page metadata alternates / date locales (currently hardcoded `ru-RU` / `en-US` in list and post pages).

### Rendering and styling

- Server components: pages, the root layout, `post-image`, `html-render-component` and `json-ld`. Interactive pieces are `'use client'`: `portfolio-list`, `lang-switcher`, `theme-toggle`, `a-link`, `cv-avatar`, `print-button`, `ui/modal`.
- Post/CV rich-text HTML relies on the `.html-render` class in `src/app/globals.css` (headings, links, code, tables, images, dark mode). Style new rich content there rather than adding wrappers.
- Tailwind v4 is configured in CSS (`@import 'tailwindcss'` + `@theme inline` in `globals.css`) — there is no `tailwind.config.*`. Theme switching is class-based (`next-themes`, `attribute="class"`), so use `dark:` variants.
- Print support is CSS-only: `@media print` rules in `globals.css` hide nav/buttons; `PrintButton` just calls `window.print()`.

### SEO and analytics

- `APP_URL` (`src/constants/config.ts`) is hardcoded into `metadataBase` and canonical URLs — update it alongside the CNAME if the domain changes.
- `src/lib/seo.ts` owns canonical/hreflang helpers (`buildAlternates`, `localeUrl`), locale-aware site names and OG locale mapping. Use it in every page's `generateMetadata` instead of hand-writing alternates.
- `src/app/sitemap.ts` builds the sitemap from `LOCALES` + `getPosts()` and derives `lastModified` from content dates (never `new Date()`), so deploys alone do not signal changes.
- Structured data (`Person`/`ProfilePage`, `BlogPosting`, `BreadcrumbList`, `CollectionPage`) lives next to the pages via `src/components/json-ld.tsx`.
- `YandexMetricaProvider` wraps the app in `src/app/(site)/[locale]/layout.tsx`; goal tracking uses `useMetrica()` (`reachGoal`/`ymEvent`) inside client components only.

### Images

- Raw images live in `assets/images/` (not `public/`) — the multi-megabyte originals must never be published.
- `scripts/optimize-images.mjs` (sharp) generates AVIF/WebP variants for width 400/800/1200, OG crops and blur placeholders into `public/images/`, and writes `src/data/image-manifest.json`. It runs automatically via `predev`/`prebuild`; `public/images/` is gitignored, the manifest is committed.
- Components resolve images through `src/lib/images.ts`: `PostImage` (server component, `<picture>` + srcset), `CvAvatar`, and `HTMLRenderComponent` (rewrites inline `<img>` in post HTML). Reference images by their logical path (`/my-image.png`) — that is the manifest key.

## Conventions / gotchas

- `types/routes.d.ts`, `types/cache-life.d.ts`, and `types/validator.ts` are generated by Next.js — do not edit; `types/validator.ts` is excluded from `tsconfig`.
- Path alias `@/*` → `./src/*`; relative imports are also used inside `src/app`.
- `src/app/(site)/[locale]/layout.tsx` is the root layout (it owns `<html lang>`), so there is intentionally no `src/app/layout.tsx`. Route groups allow per-locale `lang` with a static export; the canonical CV entry is `/[locale]/cv`.
- New posts: add an entry to `src/data/portfolio-posts.json` and put the cover in `assets/images/` using the same basename. The image pipeline fails the build if a referenced image is missing.
