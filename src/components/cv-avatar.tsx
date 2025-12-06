'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Modal } from './ui/modal';
import { useMetrica } from 'next-yandex-metrica';

type CvAvatarProps = {
  isRu: boolean;
};

export function CvAvatar({ isRu }: CvAvatarProps) {
  const { reachGoal } = useMetrica();
  const [open, setOpen] = useState(false);
  const avatarSrc = `avatar.jpg`;

  const handleOpen = () => {
    setOpen(true);
    reachGoal('avatar_open');
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="group relative inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-zinc-200 bg-zinc-50 shadow-sm ring-2 ring-zinc-100 transition hover:-translate-y-0.5 hover:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900 dark:ring-zinc-900 hover:dark:ring-zinc-600"
        aria-label={
          isRu
            ? 'Открыть фотографию Антона Молдакова'
            : 'Open photo of Anton Moldakov'
        }
      >
        <Image
          src={avatarSrc}
          alt={isRu ? 'Фотография Антона Молдакова' : 'Photo of Anton Moldakov'}
          fill
          sizes="64px"
          className="object-cover"
        />
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Image
          src={avatarSrc}
          alt={isRu ? 'Фотография Антона Молдакова' : 'Photo of Anton Moldakov'}
          width={1200}
          height={1200}
          className="h-auto max-h-[100vh] w-full rounded-xl object-contain shadow-2xl"
          priority
        />
      </Modal>
    </>
  );
}
