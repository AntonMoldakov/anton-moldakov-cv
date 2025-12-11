'use client';

import { useMetrica } from 'next-yandex-metrica';

export function PrintButton({ label }: { label: string }) {
  const { reachGoal } = useMetrica();

  const handleClick = () => {
    reachGoal('print_cv_click');
  };

  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== 'undefined') {
          handleClick();
          window.print();
        }
      }}
      className="rounded-full border border-zinc-300 px-3 py-1 font-medium uppercase tracking-wide shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
    >
      {label}
    </button>
  );
}
