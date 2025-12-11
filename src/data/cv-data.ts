import { Locale } from '@/constants/locales';

export type CvBlock = {
  id: string;
  label: string;
};

type CvTranslations = Record<string, CvBlock>;

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
  titleSuffix: string;
  description: string;
  translations: CvTranslations;
};

export const cvData: Record<Locale, CvData> = {
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
    titleSuffix: '— CV и портфолио',
    description:
      'CV и портфолио Антона Молдакова: CTO, Teamlead, Frontend & Mobile developer (React, Next.js, React Native, архитектура, DevOps).',
    translations: {
      position: { id: 'position', label: 'Желаемая должность' },
      skills: { id: 'skills', label: 'Ключевые навыки' },
      experience: { id: 'experience', label: 'Опыт работы' },
      education: { id: 'education', label: 'Образование' },
      extra: { id: 'extra', label: 'Дополнительно' },
    },
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
    titleSuffix: '— CV & Portfolio',
    description:
      'CV and portfolio of Anton Moldakov: CTO, Team Lead, Frontend & Mobile Engineer (React, Next.js, React Native, architecture, DevOps).',
    translations: {
      position: { id: 'position', label: 'Desired position' },
      skills: { id: 'skills', label: 'Key skills' },
      experience: { id: 'experience', label: 'Experience' },
      education: { id: 'education', label: 'Education' },
      extra: { id: 'extra', label: 'Additional' },
    },
  },
};
