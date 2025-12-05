'use client';

export function PrintButton({ isRu }: { isRu: boolean }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== 'undefined') {
          window.print();
        }
      }}
      className="rounded-full border border-zinc-300 px-3 py-1 font-medium uppercase tracking-wide shadow-sm transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
    >
      {isRu ? 'Распечатать' : 'Print'}
    </button>
  );
}
