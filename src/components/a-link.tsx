'use client';

import { useMetrica } from 'next-yandex-metrica';
import { FC, AnchorHTMLAttributes } from 'react';

interface ALink extends AnchorHTMLAttributes<HTMLAnchorElement> {}

export const ALink: FC<ALink> = ({ ...props }) => {
  const { ymEvent } = useMetrica();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (props.href) {
      ymEvent('extLink', props.href);
    }
    props.onClick?.(e);
  };

  return <a {...props} onClick={handleClick} />;
};
