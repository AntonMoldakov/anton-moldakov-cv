import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PrintButton } from '../../../../components/print-button';
import { CvAvatar } from '../../../../components/cv-avatar';
import { ALink } from '@/components/a-link';
import { JsonLd } from '@/components/json-ld';
import { Locale, LOCALES } from '@/constants/locales';
import { HTMLRenderComponent } from '@/components/html-render-component';
import {
  absoluteUrl,
  buildAlternates,
  DEFAULT_OG_IMAGE,
  localeUrl,
  OG_LOCALES,
} from '@/lib/seo';
import cvEn from '@/locales/en/cv.json';
import cvRu from '@/locales/ru/cv.json';

type CvMessages = typeof cvEn;

function getMessages(locale: Locale): CvMessages {
  return locale === 'ru' ? (cvRu as CvMessages) : (cvEn as CvMessages);
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale as Locale) || 'ru';
  if (!LOCALES.includes(locale)) {
    return {};
  }
  const t = getMessages(locale);
  const title = `${t.meta.name} ${t.meta.titleSuffix}`;

  return {
    title: { absolute: title },
    description: t.meta.description,
    alternates: buildAlternates('/cv', locale),
    openGraph: {
      title,
      description: t.meta.description,
      url: localeUrl(locale, '/cv'),
      siteName: t.meta.name,
      type: 'profile',
      locale: OG_LOCALES[locale],
      alternateLocale: locale === 'ru' ? ['en_US'] : ['ru_RU'],
      firstName: t.meta.name.split(' ')[0],
      lastName: t.meta.name.split(' ')[1],
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: t.meta.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (rawLocale as Locale) || 'ru';

  if (!LOCALES.includes(locale)) {
    notFound();
  }

  const t = getMessages(locale);

  const profileSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: t.meta.name,
      jobTitle: 'CTO / Teamlead / Frontend & Mobile developer',
      description: t.profile.summary,
      url: localeUrl(locale, '/cv'),
      image: absoluteUrl('/images/avatar-640.webp'),
      sameAs: [
        t.contactsLinks.github,
        t.contactsLinks.gitlab,
        t.contactsLinks.linkedin,
        t.contactsLinks.telegram,
      ],
      knowsAbout: [
        'React',
        'Next.js',
        'React Native',
        'TypeScript',
        'Software architecture',
        'DevOps',
      ],
    },
  };

  return (
    <>
      <JsonLd data={profileSchema} />

      <h1 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        {t.meta.name}
      </h1>

      <section
        aria-labelledby="contacts-heading"
        className="grid gap-4 text-sm sm:grid-cols-[2fr,3fr] sm:gap-6"
      >
        <div className="space-y-2">
          <CvAvatar openAria={t.avatar.openAria} alt={t.avatar.alt} />
          <h2
            id="contacts-heading"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400"
          >
            {t.sections.contacts}
          </h2>
          <dl className="space-y-1 text-sm">
            <div className="flex gap-2">
              <dt className="w-16 text-zinc-500 dark:text-zinc-400">
                {t.contacts.telegram}
              </dt>
              <dd>
                <ALink
                  target="_blank"
                  href={t.contactsLinks.telegram}
                  className="break-all underline decoration-dotted underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-50"
                >
                  {t.contactsDisplay?.telegram || t.contactsLinks.telegram}
                </ALink>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 text-zinc-500 dark:text-zinc-400">
                {t.contacts.email}
              </dt>
              <dd>
                <ALink
                  href={`mailto:${t.contactsLinks.email}`}
                  target="_blank"
                  className="underline decoration-dotted underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-50"
                >
                  {t.contactsDisplay?.email || t.contactsLinks.email}
                </ALink>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 text-zinc-500 dark:text-zinc-400">
                {t.contacts.linkedin}
              </dt>
              <dd>
                <ALink
                  href={t.contactsLinks.linkedin}
                  target="_blank"
                  className="break-all underline decoration-dotted underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-50"
                >
                  {t.contactsDisplay?.linkedin || t.contactsLinks.linkedin}
                </ALink>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 text-zinc-500 dark:text-zinc-400">
                {t.contacts.github}
              </dt>
              <dd>
                <ALink
                  href={t.contactsLinks.github}
                  target="_blank"
                  className="break-all underline decoration-dotted underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-50"
                >
                  {t.contactsDisplay?.github || t.contactsLinks.github}
                </ALink>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 text-zinc-500 dark:text-zinc-400">
                {t.contacts.gitlab}
              </dt>
              <dd>
                <ALink
                  href={t.contactsLinks.gitlab}
                  target="_blank"
                  className="break-all underline decoration-dotted underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-50"
                >
                  {t.contactsDisplay?.gitlab || t.contactsLinks.gitlab}
                </ALink>
              </dd>
            </div>
          </dl>
        </div>

        <div className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          <h2
            id="position"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400"
          >
            {t.sections.position}
          </h2>
          <p className="font-medium">{t.profile.desiredPosition}</p>
          <p>{t.profile.summary}</p>
        </div>
      </section>

      <section
        aria-labelledby="skills"
        className="grid gap-4 border-y border-dashed border-zinc-200 py-5 text-sm dark:border-zinc-800 sm:grid-cols-2 sm:gap-6"
      >
        <div className="space-y-2">
          <h2
            id="skills"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400"
          >
            {t.sections.skills}
          </h2>
          <ul className="space-y-1">
            <li>
              <span className="font-semibold">{t.skillsLabels.frontend}</span>{' '}
              {t.skills.frontend}
            </li>
            <li>
              <span className="font-semibold">{t.skillsLabels.mobile}</span>{' '}
              {t.skills.mobile}
            </li>
            <li>
              <span className="font-semibold">{t.skillsLabels.backend}</span>{' '}
              {t.skills.backend}
            </li>
            <li>
              <span className="font-semibold">
                {t.skillsLabels.architecture}
              </span>{' '}
              {t.skills.architecture}
            </li>
            <li>
              <span className="font-semibold">{t.skillsLabels.tools}</span>{' '}
              {t.skills.tools}
            </li>
            <li>
              <span className="font-semibold">{t.skillsLabels.web3}</span>{' '}
              {t.skills.web3}
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {t.sections.softSkills}
          </h3>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {t.skills.soft}
          </p>
        </div>
      </section>

      <section aria-labelledby="experience" className="space-y-4 text-sm">
        <h2
          id="experience"
          className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400"
        >
          {t.sections.experience}
        </h2>
        <div className="relative mt-3 space-y-6">
          <div
            className="absolute left-[5.5px] inset-y-0 w-px bg-gradient-to-b from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800"
            aria-hidden="true"
          />
          {t.experience.map((exp, index) => {
            const isCurrent = index === 0;

            return (
              <article
                key={`${exp.companyHtml}-${exp.period}`}
                className="relative flex gap-4 sm:gap-6"
              >
                <div className="relative mt-1 flex flex-col items-center">
                  <div
                    className={
                      isCurrent
                        ? 'h-3 w-3 rounded-full border border-emerald-500 bg-emerald-400 shadow-sm ring-4 ring-emerald-200/70 dark:border-emerald-400 dark:bg-emerald-500 dark:ring-emerald-500/30'
                        : 'h-3 w-3 rounded-full border border-zinc-300 bg-white shadow-sm ring-2 ring-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:ring-zinc-900'
                    }
                  />
                </div>
                <div
                  className={
                    isCurrent
                      ? 'flex-1 rounded-lg border border-emerald-300 bg-emerald-50/80 p-4 shadow-sm ring-1 ring-emerald-200/70 dark:border-emerald-500/60 dark:bg-emerald-950/40 dark:ring-emerald-500/40'
                      : 'flex-1 rounded-lg border border-zinc-200 bg-zinc-50/80 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80'
                  }
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-dashed border-zinc-200 pb-2 dark:border-zinc-800">
                    <h3
                      className="font-semibold tracking-tight"
                      dangerouslySetInnerHTML={{ __html: exp.companyHtml }}
                    />
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        {exp.period}
                      </p>
                      {isCurrent && (
                        <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-400/60 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/60">
                          {t.current}
                        </span>
                      )}
                    </div>
                  </div>
                  <ul className="mt-2 space-y-1 text-zinc-700 dark:text-zinc-300">
                    {exp.roles.map((role) => {
                      const [roleTitle, ...rest] = role.split(':');
                      const roleDescription = rest.join(':').trim();

                      return (
                        <li key={role} className="leading-relaxed">
                          <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                            {roleTitle}
                          </span>
                          {roleDescription && (
                            <span className="text-zinc-700 dark:text-zinc-300">
                              {`: ${roleDescription}`}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section
        aria-labelledby="education"
        className="grid gap-4 border-y border-dashed border-zinc-200 py-5 text-sm dark:border-zinc-800 sm:grid-cols-2 sm:gap-6"
      >
        <div className="space-y-2">
          <h2
            id="education"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400"
          >
            {t.sections.education}
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {t.education}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {t.sections.entrepreneurship}
          </h3>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {t.entrepreneurship}
          </p>
        </div>
      </section>

      <section
        aria-labelledby="extra"
        className="grid gap-4 text-sm sm:grid-cols-2 sm:gap-6"
      >
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {t.sections.languages}
          </h3>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {t.languages}
          </p>

          <h3 className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {t.sections.articles}
          </h3>
          <HTMLRenderComponent html={t.articlesHtml} />
        </div>

        <div className="space-y-2">
          <h3 className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {t.sections.hobbies}
          </h3>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {t.hobbies}
          </p>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-zinc-200 pt-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <p>{t.footer.note}</p>
        <PrintButton label={t.print} />
      </div>
    </>
  );
}
