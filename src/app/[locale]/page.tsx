import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ThemeToggle } from '../../components/theme-toggle';
import { LangSwitcher } from '../../components/lang-switcher';
import { PrintButton } from '../../components/print-button';

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
    phone: string;
    email: string;
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
    location: 'Омск, Россия',
    birthDate: '27 апреля 2001',
    contacts: {
      phone: '+7 (950) 953-66-75',
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
        period: 'Июнь 2021 — настоящее время',
        roles: [
          'CTO в аутсорс-компании: грейдинг системы, внедрение новых инструментов и практик, стратегическое планирование и управление техническими ресурсами, оптимизация процессов разработки, участие в найме.',
          'Ведущий разработчик / Teamlead: руководство командой 14+ разработчиков, внедрение Feature Sliced Design, ведение 10+ проектов от идеи до релиза и поддержки, проектирование через Event Storming и построение архитектурных схем.',
          'Frontend & Mobile developer: комплексные приложения на Next.js 15+, работа со streaming, SSR/SSG/ISR/CSR, middleware, сложные архитектуры (монорепы, микрофронты), высоконагруженные чаты, медиасервисы, платёжные системы, публикация и поддержка React Native приложений.',
        ],
      },
    ],
    entrepreneurship:
      'ИП (Февраль 2020 — Май 2021): верстка лендингов на React/Next.js, участие в разработке сайта для промышленного завода.',
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
    location: 'Omsk, Russia',
    birthDate: '27 April 2001',
    contacts: {
      phone: '+7 (950) 953-66-75',
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
        period: 'June 2021 — present',
        roles: [
          'CTO in an outsource company: grading system, rollout of new tools and practices, strategic planning, technical resource management, development processes optimization, hiring.',
          'Lead Developer / Team Lead: leading a team of 14+ engineers, introducing Feature Sliced Design, running 10+ projects from discovery to launch and maintenance, architecture design using Event Storming.',
          'Frontend & Mobile Engineer: complex apps on Next.js 15+, streaming, SSR/SSG/ISR/CSR, middleware, advanced architectures (monorepos, micro frontends), high-load chats, media services, payment systems, React Native apps publishing and support.',
        ],
      },
    ],
    entrepreneurship:
      'Self-employed (Feb 2020 — May 2021): landing pages with React/Next.js, participation in a factory website development.',
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
      <a
        key={`${url}-${start}`}
        href={href}
        target="_blank"
        className="underline decoration-dotted underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-50"
      >
        {url}
      </a>
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

  const baseUrl = 'https://antonmoldakov.github.io'; // adjust if needed

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
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 px-4 py-6 text-zinc-900 dark:from-black dark:to-zinc-950 dark:text-zinc-50">
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 rounded-2xl bg-white/80 p-5 shadow-lg ring-1 ring-zinc-200 backdrop-blur-md dark:bg-zinc-950/80 dark:ring-zinc-800 sm:p-8 lg:p-10">
        <header className="flex flex-col gap-4 border-b border-dashed border-zinc-200 pb-5 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {data.name}
            </h1>
            <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {data.title}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {data.location} • {data.birthDate}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <LangSwitcher locale={locale} />
            <ThemeToggle />
          </div>
        </header>

        <section
          aria-labelledby="contacts-heading"
          className="grid gap-4 text-sm sm:grid-cols-[2fr,3fr] sm:gap-6"
        >
          <div className="space-y-2">
            <h2
              id="contacts-heading"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400"
            >
              {isRu ? 'Контакты' : 'Contacts'}
            </h2>
            <dl className="space-y-1 text-sm">
              <div className="flex gap-2">
                <dt className="w-16 text-zinc-500 dark:text-zinc-400">
                  {isRu ? 'Телефон' : 'Phone'}
                </dt>
                <dd>{data.contacts.phone}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-16 text-zinc-500 dark:text-zinc-400">Email</dt>
                <dd>
                  <a
                    href={`mailto:${data.contacts.email}`}
                    className="underline decoration-dotted underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-50"
                  >
                    {data.contacts.email}
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-16 text-zinc-500 dark:text-zinc-400">
                  LinkedIn
                </dt>
                <dd>
                  <a
                    href={data.contacts.linkedin}
                    className="break-all underline decoration-dotted underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-50"
                  >
                    linkedin.com/in/antonmoldakov
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-16 text-zinc-500 dark:text-zinc-400">
                  GitHub
                </dt>
                <dd>
                  <a
                    href={data.contacts.github}
                    className="break-all underline decoration-dotted underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-50"
                  >
                    github.com/AntonMoldakov
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-16 text-zinc-500 dark:text-zinc-400">
                  GitLab
                </dt>
                <dd>
                  <a
                    href={data.contacts.gitlab}
                    className="break-all underline decoration-dotted underline-offset-2 hover:text-zinc-900 dark:hover:text-zinc-50"
                  >
                    gitlab.com/AntonMoldakov
                  </a>
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

        <section
          aria-labelledby={t.experience.id}
          className="space-y-4 text-sm"
        >
          <h2
            id={t.experience.id}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400"
          >
            {t.experience.label}
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <article
                key={exp.company}
                className="rounded-lg border border-zinc-200 bg-zinc-50/60 p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-dashed border-zinc-200 pb-2 dark:border-zinc-800">
                  <h3 className="font-semibold">{exp.company}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {exp.period}
                  </p>
                </div>
                <ul className="mt-2 space-y-1 list-disc pl-4 text-zinc-700 dark:text-zinc-300">
                  {exp.roles.map((role) => (
                    <li key={role}>{role}</li>
                  ))}
                </ul>
              </article>
            ))}
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
      </main>
    </div>
  );
}
