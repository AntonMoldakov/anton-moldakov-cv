import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ThemeToggle } from '../../components/theme-toggle';
import { LangSwitcher } from '../../components/lang-switcher';
import { PrintButton } from '../../components/print-button';
import { CvAvatar } from '../../components/cv-avatar';
import { ALink } from '@/components/a-link';

const LOCALES = ['ru', 'en'] as const;

type Locale = (typeof LOCALES)[number];

type CvBlock = {
  id: string;
  label: string;
};

type CvData = {
  name: string;
  title: string;
  location: string;
  birthDate: string;
  contacts: {
    email: string;
    telegram: string;
    linkedin: string;
    github: string;
    gitlab: string;
  };
  desiredPosition: string;
  summary: string;
  skills: {
    frontend: string;
    mobile: string;
    backend: string;
    architecture: string;
    tools: string;
    soft: string;
    web3: string;
  };
  experience: {
    company: string;
    period: string;
    roles: string[];
  }[];
  entrepreneurship: string;
  education: string;
  languages: string;
  articles: string;
  hobbies: string;
  portfolio: string;
};

const cvData: Record<Locale, CvData> = {
  ru: {
    name: 'Антон Молдаков',
    title: 'CTO / Teamlead / Frontend & Mobile developer',
    location: 'Тюмень, Россия',
    birthDate: '27 апреля 2001',
    contacts: {
      telegram: 'https://t.me/Anton_Moldakov',
      email: 'anton.moldakov@gmail.com',
      linkedin:
        'https://www.linkedin.com/in/%D0%B0%D0%BD%D1%82%D0%BE%D0%BD%D0%BC%D0%BE%D0%BB%D0%B4%D0%B0%D0%BA%D0%BE%D0%B2-62a68428a',
      github: 'https://github.com/AntonMoldakov',
      gitlab: 'https://gitlab.com/AntonMoldakov',
    },
    desiredPosition:
      'CTO / Руководитель разработки / Teamlead (полная/частичная/проектная занятость, гибкий график/удалённо/офис)',
    summary:
      'CTO с опытом построения команд, архитектуры и поставки и реализации сложных веб и мобильных продуктов на React, Next.js и React Native.',
    skills: {
      frontend:
        'React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Redux, GraphQL, React Admin',
      mobile:
        'React Native (публикация, анимации, нативные модули и компоненты, новая архитектура, Expo), Flutter',
      backend: 'Node.js, NestJS, PostgreSQL, Docker',
      architecture:
        'Feature Sliced Design, чистая и модульная архитектура, микрофронтенды, монорепозитории',
      tools:
        'Git, Figma, CI/CD (Vercel, Coolify, AWS, Yandex Cloud, Fastlane, AppCenter)',
      soft: 'Управление командами, Event Storming, менторство, собеседования, развитие разработчиков',
      web3: 'Multichan Wallet, криптосети: BTC, ETH (в целом EVM сети), TON, TRX, SOL, POL, Wallet Connect. Транзакции, расчет газа, работа с провайдерами',
    },
    experience: [
      {
        company: 'Purweb',
        period: 'Сентябрь 2024 — настоящее время',
        roles: [
          'CTO в аутсорс-компании: разработка и внедрение грейдинг системы, ресерч и внедрение новых инструментов и подходов в управлении и разработке проектов, стратегическое планирование и управление техническими ресурсами, оптимизация процессов разработки, работа с рекрутментом и стратегиями найма.',
        ],
      },
      {
        company: 'Purweb',
        period: 'Сентябрь 2022 — Сентябрь 2024 (2 года)',
        roles: [
          'Ведущий разработчик / Teamlead: руководство командой из 14+ разработчиков (веб и мобильные проекты), внедрение архитектуры Feature Sliced Design, ведение 10+ проектов от начала до релиза или перехода в поддержку, проектирование через Event Storming, ресерч, составление карты рисков, построение схем и диаграмм архитектуры системы.',
        ],
      },
      {
        company: 'Purweb',
        period: 'Июнь 2021 — Сентябрь 2024 (3 года 4 месяца)',
        roles: [
          'Frontend Developer & Mobile Developer: комплексные приложения на Next.js 15+ со streaming, lazy loading, SSR/SSG/ISR/CSR, middleware, AppRouter/PagesRouter; CI/CD (AWS, Yandex Cloud, Vercel, self-hosted Coolify); сложные архитектуры (монорепозитории, микрофронты); доступные веб-страницы; WYSIWYG; платёжные системы (Stripe, CloudPayments, Apple/Google Pay, web3-кошельки); высоконагруженные чаты (WebSocket, Pusher, Socket.IO); медиасервисы (видеостриминг, псевдостриминг, кастомные аудио- и видеоплееры, сжатие медиа); React Native (разработка с нуля, публикация в Google Play, App Store, RuStore, нативные модули и компоненты, новая архитектура, Expo, сложные анимации, Drag&Drop, фоторедакторы, настройка CI/CD: fastlane, AppCenter, CodePush).',
        ],
      },
      {
        company: 'Самозанятый',
        period: 'Февраль 2020 — Сейчас',
        roles: [
          'Разработка веб и мобильных приложений, лендинговые страницы, Telegram-боты.',
        ],
      },
    ],
    entrepreneurship:
      'Самозанятый (Февраль 2020 — Сейчас): разработка веб и мобильных приложений, лендинговые страницы, Telegram-боты.',
    education:
      'Омский государственный технический университет, Бакалавр, Информатика и вычислительная техника (2019–2023).',
    languages: 'Русский (родной), Английский (B2), Испанский (A1)',
    articles:
      'Статьи на Хабре: habr.com/ru/users/AntonMoldakov, воркшоп по Next.js: gitlab.com/AntonMoldakov/nextjs-workshop',
    hobbies: 'Изучение новых технологий, менторство, участие в IT-сообществах.',
    portfolio:
      'Полное портфолио: github.com/AntonMoldakov, gitlab.com/AntonMoldakov',
  },
  en: {
    name: 'Anton Moldakov',
    title: 'CTO / Team Lead / Frontend & Mobile Engineer',
    location: 'Kazakhstan',
    birthDate: '27 April 2001',
    contacts: {
      telegram: 'https://t.me/Anton_Moldakov',
      email: 'anton.moldakov@gmail.com',
      linkedin:
        'https://www.linkedin.com/in/%D0%B0%D0%BD%D1%82%D0%BE%D0%BD%D0%BC%D0%BE%D0%BB%D0%B4%D0%B0%D0%BA%D0%BE%D0%B2-62a68428a',
      github: 'https://github.com/AntonMoldakov',
      gitlab: 'https://gitlab.com/AntonMoldakov',
    },
    desiredPosition:
      'CTO / Head of Engineering / Team Lead (full-time/part-time/contract, remote/flexible/on-site)',
    summary:
      'CTO with experience building teams, architecture and delivering complex web and mobile products with React, Next.js and React Native.',
    skills: {
      frontend:
        'React, Next.js, TypeScript, JavaScript, HTML5, CSS3, Redux, GraphQL, React Admin',
      mobile:
        'React Native (publishing, animations, native modules and components, new architecture, Expo), Flutter',
      backend: 'Node.js, NestJS, PostgreSQL, Docker',
      architecture:
        'Feature Sliced Design, clean and modular architecture, micro frontends, monorepositories',
      tools:
        'Git, Figma, CI/CD (Vercel, Coolify, AWS, Yandex Cloud, Fastlane, AppCenter)',
      soft: 'Team management, Event Storming, mentoring, interviewing, team development',
      web3: 'BTC, ETH (EVM networks in general), TON, TRX, SOL, POL, Wallet Connect, transactions, gas calculation, provider integration',
    },
    experience: [
      {
        company: 'Purweb',
        period: 'Sep 2024 — present',
        roles: [
          'CTO in an outsource company: grading system, rollout of new tools and practices, strategic planning and technical resource management, development process optimization, hiring and recruitment strategy.',
        ],
      },
      {
        company: 'Purweb',
        period: 'Sep 2022 — Sep 2024 (2 years)',
        roles: [
          'Lead Developer / Team Lead: leading a team of 14+ engineers (web & mobile), introducing Feature Sliced Design, running 10+ projects from discovery to launch and support, architecture design via Event Storming and system diagrams.',
        ],
      },
      {
        company: 'Purweb',
        period: 'Jun 2021 — Sep 2024 (3 years 4 months)',
        roles: [
          'Frontend & Mobile Engineer: complex apps on Next.js 15+ (streaming, lazy loading, SSR/SSG/ISR/CSR, middleware, App Router/Pages Router), CI/CD (AWS, Yandex Cloud, Vercel, self-hosted Coolify), monorepos and micro frontends, accessible web pages, WYSIWYG, payment systems (Stripe, CloudPayments, Apple/Google Pay, web3 wallets), high-load chats (WebSocket, Pusher, Socket.IO), media services (video streaming, pseudo-streaming, custom players, media compression), React Native (apps from scratch, publishing to Google Play / App Store / RuStore, native modules & components, new architecture, Expo, advanced animations, drag & drop, photo editors, CI/CD with fastlane, AppCenter, CodePush).',
        ],
      },
      {
        company: 'Self-employed',
        period: 'Feb 2020 — Present',
        roles: [
          'Development of web and mobile applications, landing pages, Telegram bots.',
        ],
      },
    ],
    entrepreneurship:
      'Self-employed (Feb 2020 — Present): development of web and mobile applications, landing pages, Telegram bots.',
    education:
      'Omsk State Technical University, BSc in Computer Science and Engineering (2019–2023).',
    languages: 'Russian (native), English (B2), Spanish (A1)',
    articles:
      'Articles on Habr: habr.com/ru/users/AntonMoldakov, Next.js workshop: gitlab.com/AntonMoldakov/nextjs-workshop',
    hobbies: 'Exploring new technologies, mentoring, IT communities.',
    portfolio:
      'Full portfolio: github.com/AntonMoldakov, gitlab.com/AntonMoldakov',
  },
};

function renderTextWithLinks(text: string) {
  const urlRegex =
    /(https?:\/\/[^\s]+|(?:[\w-]+\.)+[a-z]{2,}(?:\/[\w\-./?%&=]*)?)/gi;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = urlRegex.exec(text)) !== null) {
    const url = match[0];
    const start = match.index;

    if (start > lastIndex) {
      parts.push(text.slice(lastIndex, start));
    }

    const hasProtocol = url.startsWith('http://') || url.startsWith('https://');
    const href = hasProtocol ? url : `https://${url}`;

    parts.push(
      <ALink
        key={`${url}-${start}`}
        href={href}
        target="_blank"
        className="underline decoration-dotted underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-50"
      >
        {url}
      </ALink>
    );

    lastIndex = start + url.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
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

  const data = cvData[locale];

  const titleSuffix = locale === 'ru' ? '— CV и портфолио' : '— CV & Portfolio';

  const description =
    locale === 'ru'
      ? 'CV и портфолио Антона Молдакова: CTO, Teamlead, Frontend & Mobile developer (React, Next.js, React Native, архитектура, DevOps).'
      : 'CV and portfolio of Anton Moldakov: CTO, Team Lead, Frontend & Mobile Engineer (React, Next.js, React Native, architecture, DevOps).';

  const baseUrl = 'https://antonmoldakov.github.io/anton-moldakov-cv';

  return {
    title: `${data.name} ${titleSuffix}`,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        ru: `${baseUrl}/ru`,
        en: `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: `${data.name} ${titleSuffix}`,
      description,
      url: `${baseUrl}/${locale}`,
      type: 'profile',
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
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

  const data = cvData[locale];

  const t: Record<string, CvBlock> =
    locale === 'ru'
      ? {
          position: { id: 'position', label: 'Желаемая должность' },
          skills: { id: 'skills', label: 'Ключевые навыки' },
          experience: { id: 'experience', label: 'Опыт работы' },
          education: { id: 'education', label: 'Образование' },
          extra: { id: 'extra', label: 'Дополнительно' },
        }
      : {
          position: { id: 'position', label: 'Desired position' },
          skills: { id: 'skills', label: 'Key skills' },
          experience: { id: 'experience', label: 'Experience' },
          education: { id: 'education', label: 'Education' },
          extra: { id: 'extra', label: 'Additional' },
        };

  const isRu = locale === 'ru';
  return (
    <>
      <section
        aria-labelledby="contacts-heading"
        className="grid gap-4 text-sm sm:grid-cols-[2fr,3fr] sm:gap-6"
      >
        <div className="space-y-2">
          <CvAvatar isRu={isRu} />
          <h2
            id="contacts-heading"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400"
          >
            {isRu ? 'Контакты' : 'Contacts'}
          </h2>
          <dl className="space-y-1 text-sm">
            <div className="flex gap-2">
              <dt className="w-16 text-zinc-500 dark:text-zinc-400">
                Telegram
              </dt>
              <dd>
                <ALink
                  target="_blank"
                  href={data.contacts.telegram}
                  className="break-all underline decoration-dotted underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-50"
                >
                  @Anton_Moldakov
                </ALink>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 text-zinc-500 dark:text-zinc-400">Email</dt>
              <dd>
                <ALink
                  href={`mailto:${data.contacts.email}`}
                  target="_blank"
                  className="underline decoration-dotted underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-50"
                >
                  {data.contacts.email}
                </ALink>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 text-zinc-500 dark:text-zinc-400">
                LinkedIn
              </dt>
              <dd>
                <ALink
                  href={data.contacts.linkedin}
                  target="_blank"
                  className="break-all underline decoration-dotted underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-50"
                >
                  linkedin.com/in/antonmoldakov
                </ALink>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 text-zinc-500 dark:text-zinc-400">GitHub</dt>
              <dd>
                <ALink
                  href={data.contacts.github}
                  target="_blank"
                  className="break-all underline decoration-dotted underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-50"
                >
                  github.com/AntonMoldakov
                </ALink>
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-16 text-zinc-500 dark:text-zinc-400">GitLab</dt>
              <dd>
                <ALink
                  href={data.contacts.gitlab}
                  target="_blank"
                  className="break-all underline decoration-dotted underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-50"
                >
                  gitlab.com/AntonMoldakov
                </ALink>
              </dd>
            </div>
          </dl>
        </div>

        <div className="space-y-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          <h2
            id={t.position.id}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400"
          >
            {t.position.label}
          </h2>
          <p className="font-medium">{data.desiredPosition}</p>
          <p>{data.summary}</p>
        </div>
      </section>

      <section
        aria-labelledby={t.skills.id}
        className="grid gap-4 border-y border-dashed border-zinc-200 py-5 text-sm dark:border-zinc-800 sm:grid-cols-2 sm:gap-6"
      >
        <div className="space-y-2">
          <h2
            id={t.skills.id}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400"
          >
            {t.skills.label}
          </h2>
          <ul className="space-y-1">
            <li>
              <span className="font-semibold">
                {isRu ? 'Frontend:' : 'Frontend:'}
              </span>{' '}
              {data.skills.frontend}
            </li>
            <li>
              <span className="font-semibold">
                {isRu ? 'Mobile:' : 'Mobile:'}
              </span>{' '}
              {data.skills.mobile}
            </li>
            <li>
              <span className="font-semibold">Backend:</span>{' '}
              {data.skills.backend}
            </li>
            <li>
              <span className="font-semibold">
                {isRu ? 'Архитектура:' : 'Architecture:'}
              </span>{' '}
              {data.skills.architecture}
            </li>
            <li>
              <span className="font-semibold">CI/CD & Tools:</span>{' '}
              {data.skills.tools}
            </li>
            <li>
              <span className="font-semibold">Web3:</span> {data.skills.web3}
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {isRu ? 'Soft Skills' : 'Soft skills'}
          </h3>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {data.skills.soft}
          </p>
        </div>
      </section>

      <section aria-labelledby={t.experience.id} className="space-y-4 text-sm">
        <h2
          id={t.experience.id}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400"
        >
          {t.experience.label}
        </h2>
        <div className="relative mt-3 space-y-6">
          <div
            className="absolute left-[5.5px] inset-y-0 w-px bg-gradient-to-b from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800"
            aria-hidden="true"
          />
          {data.experience.map((exp, index) => {
            const isCurrent = index === 0;

            return (
              <article
                key={`${exp.company}-${exp.period}`}
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
                    <h3 className="font-semibold tracking-tight">
                      {exp.company}
                    </h3>
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                        {exp.period}
                      </p>
                      {isCurrent && (
                        <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-400/60 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/60">
                          {isRu ? 'Сейчас' : 'Current'}
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
        aria-labelledby={t.education.id}
        className="grid gap-4 border-y border-dashed border-zinc-200 py-5 text-sm dark:border-zinc-800 sm:grid-cols-2 sm:gap-6"
      >
        <div className="space-y-2">
          <h2
            id={t.education.id}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400"
          >
            {t.education.label}
          </h2>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {data.education}
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {isRu ? 'Предпринимательство' : 'Entrepreneurship'}
          </h3>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {data.entrepreneurship}
          </p>
        </div>
      </section>

      <section
        aria-labelledby={t.extra.id}
        className="grid gap-4 text-sm sm:grid-cols-2 sm:gap-6"
      >
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {isRu ? 'Языки' : 'Languages'}
          </h3>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {data.languages}
          </p>

          <h3 className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {isRu ? 'Статьи и публикации' : 'Articles'}
          </h3>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {renderTextWithLinks(data.articles)}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {isRu ? 'Портфолио' : 'Portfolio'}
          </h3>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {renderTextWithLinks(data.portfolio)}
          </p>

          <h3 className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {isRu ? 'Хобби' : 'Hobbies'}
          </h3>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {data.hobbies}
          </p>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-zinc-200 pt-4 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <p>
          {isRu
            ? 'Готов выслать дополнительные материалы и примеры кода по запросу.'
            : 'Happy to share additional materials and code samples on request.'}
        </p>
        <PrintButton isRu={isRu} />
      </div>
    </>
  );
}
