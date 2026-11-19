import manifest from '@/data/image-manifest.json';

export type ImageVariant = {
  width: number;
  url: string;
};

export type ImageEntry = {
  width: number;
  height: number;
  blur: string;
  og: string | null;
  variants: {
    avif: ImageVariant[];
    webp: ImageVariant[];
  };
};

const images = manifest as Record<string, ImageEntry>;

/**
 * Resolve an image by the logical path stored in content
 * (e.g. `/web-workers-practice.png`). Returns `null` for external URLs or
 * images that were not processed by `scripts/optimize-images.mjs`.
 */
export function getImageEntry(src: string): ImageEntry | null {
  return images[src] ?? null;
}

export function getOgImage(src: string): string | null {
  return getImageEntry(src)?.og ?? null;
}

export function buildSrcSet(variants: ImageVariant[]): string {
  return variants.map((variant) => `${variant.url} ${variant.width}w`).join(', ');
}

function largest(variants: ImageVariant[]): ImageVariant {
  return variants[variants.length - 1];
}

const IMG_TAG_RE = /<img\b([^>]*)>/gi;
const LOCAL_SRC_RE = /\bsrc="(\/[^"]+)"/i;

function stripAttribute(attributes: string, name: string): string {
  return attributes.replace(
    new RegExp(`\\s+${name}(?:="[^"]*")?`, 'gi'),
    ''
  );
}

/**
 * Rewrites `<img>` tags inside trusted content HTML so that local images use
 * the generated AVIF/WebP variants, responsive srcset and native lazy loading.
 */
export function optimizeContentHtml(html: string): string {
  if (!html) return html;

  return html.replace(IMG_TAG_RE, (tag, attributes: string) => {
    const srcMatch = attributes.match(LOCAL_SRC_RE);

    if (!srcMatch) {
      // External images cannot be re-encoded; only make them lazy.
      let next = attributes;
      if (!/\bloading=/i.test(next)) next += ' loading="lazy"';
      if (!/\bdecoding=/i.test(next)) next += ' decoding="async"';
      return `<img${next}>`;
    }

    const entry = getImageEntry(srcMatch[1]);
    if (!entry) return tag;

    let next = stripAttribute(attributes, 'src');
    next = stripAttribute(next, 'srcset');
    next = stripAttribute(next, 'sizes');
    next = stripAttribute(next, 'width');
    next = stripAttribute(next, 'height');
    next = stripAttribute(next, 'loading');
    next = stripAttribute(next, 'decoding');

    const avifSrcSet = buildSrcSet(entry.variants.avif);
    const webpSrcSet = buildSrcSet(entry.variants.webp);
    const sizes = '(max-width: 768px) 100vw, 768px';

    return [
      '<picture>',
      `<source type="image/avif" srcset="${avifSrcSet}" sizes="${sizes}" />`,
      `<source type="image/webp" srcset="${webpSrcSet}" sizes="${sizes}" />`,
      `<img${next} src="${largest(entry.variants.webp).url}" srcset="${webpSrcSet}" sizes="${sizes}" width="${entry.width}" height="${entry.height}" loading="lazy" decoding="async">`,
      '</picture>',
    ].join('');
  });
}
