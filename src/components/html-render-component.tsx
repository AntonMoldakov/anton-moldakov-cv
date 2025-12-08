import React from 'react';

type Props = {
  html: string;
  className?: string;
};

export function HTMLRenderComponent({ html, className }: Props) {
  const baseClassName = ['html-render', className || ''].join(' ').trim();

  return (
    <section
      className={baseClassName}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
