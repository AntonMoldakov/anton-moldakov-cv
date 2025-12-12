'use client';

import * as React from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  backgroundClassName?: string;
};

export function PostImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  backgroundClassName = '',
}: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        aria-hidden
        className={`absolute inset-0 scale-110 bg-cover bg-center opacity-60 blur-sm ${backgroundClassName}`}
        style={{ backgroundImage: `url(${src})` }}
      />
      <img
        src={src}
        alt={alt}
        className={`relative z-10 object-contain object-center ${imgClassName}`}
      />
    </div>
  );
}
