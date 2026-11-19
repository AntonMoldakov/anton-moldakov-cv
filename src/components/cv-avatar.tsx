'use client';

import { useState } from 'react';
import { Modal } from './ui/modal';
import { useMetrica } from 'next-yandex-metrica';
import { buildSrcSet, getImageEntry } from '@/lib/images';

type CvAvatarProps = {
  openAria: string;
  alt: string;
};

const AVATAR_SRC = '/avatar.jpg';

export function CvAvatar({ openAria, alt }: CvAvatarProps) {
  const { reachGoal } = useMetrica();
  const [open, setOpen] = useState(false);
  const image = getImageEntry(AVATAR_SRC);
  const avifSrcSet = image ? buildSrcSet(image.variants.avif) : undefined;
  const webpSrcSet = image ? buildSrcSet(image.variants.webp) : undefined;
  const fallback = image
    ? image.variants.webp[image.variants.webp.length - 1].url
    : '/images/avatar-640.webp';

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
        aria-label={openAria}
      >
        <picture>
          {avifSrcSet && (
            <source type="image/avif" srcSet={avifSrcSet} sizes="64px" />
          )}
          {webpSrcSet && (
            <source type="image/webp" srcSet={webpSrcSet} sizes="64px" />
          )}
          <img
            src={fallback}
            srcSet={webpSrcSet}
            sizes="64px"
            alt={alt}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </picture>
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <picture>
          {avifSrcSet && (
            <source
              type="image/avif"
              srcSet={avifSrcSet}
              sizes="(max-width: 768px) 100vw, 640px"
            />
          )}
          {webpSrcSet && (
            <source
              type="image/webp"
              srcSet={webpSrcSet}
              sizes="(max-width: 768px) 100vw, 640px"
            />
          )}
          <img
            src={fallback}
            srcSet={webpSrcSet}
            sizes="(max-width: 768px) 100vw, 640px"
            alt={alt}
            width={image?.width ?? 640}
            height={image?.height ?? 640}
            className="h-auto max-h-[100vh] w-full rounded-xl object-contain shadow-2xl"
          />
        </picture>
      </Modal>
    </>
  );
}
