'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useMetrica } from 'next-yandex-metrica';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { reachGoal } = useMetrica();

  const handleClick = () => {
    reachGoal('theme_toggle');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Until mounted, avoid rendering theme-dependent text/aria-label
  const isDark = mounted && theme === 'dark';

  const label = !mounted
    ? 'Toggle color mode'
    : isDark
    ? 'Switch to light mode'
    : 'Switch to dark mode';

  const text = !mounted ? '' : isDark ? 'Dark' : 'Light';

  return (
    <button
      type="button"
      onClick={() => {
        handleClick();
        setTheme(isDark ? 'light' : 'dark');
      }}
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide shadow-sm transition hover:bg-zinc-100 dark:hover:bg-zinc-800"
      aria-label={label}
    >
      <span className="h-2 w-2 rounded-full bg-yellow-400 dark:bg-zinc-400" />
      <span className="hidden sm:inline">{text}</span>
    </button>
  );
}
