import { buildSrcSet, getImageEntry } from '@/lib/images';

type Props = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Responsive `sizes` hint for the srcset selection. */
  sizes?: string;
  /** Eager-load the image (use for the hero image of a page). */
  priority?: boolean;
};

export function PostImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  sizes = '(max-width: 768px) 100vw, 768px',
  priority = false,
}: Props) {
  const image = getImageEntry(src);
  const loading = priority ? 'eager' : 'lazy';
  const fetchPriority = priority ? 'high' : 'auto';

  if (!image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          className={`relative z-10 object-contain object-center ${imgClassName}`}
        />
      </div>
    );
  }

  const avifSrcSet = buildSrcSet(image.variants.avif);
  const webpSrcSet = buildSrcSet(image.variants.webp);
  const fallback = image.variants.webp[image.variants.webp.length - 1].url;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        aria-hidden
        className="absolute inset-0 scale-110 bg-cover bg-center opacity-60 blur-sm"
        style={{ backgroundImage: `url(${image.blur})` }}
      />
      <picture>
        <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
        <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
        <img
          src={fallback}
          srcSet={webpSrcSet}
          sizes={sizes}
          width={image.width}
          height={image.height}
          alt={alt}
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          className={`relative z-10 object-contain object-center ${imgClassName}`}
        />
      </picture>
    </div>
  );
}
