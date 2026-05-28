import Image from 'next/image';

interface CoverMediaProps {
  src: string;
  video?: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  /** Applied to the rendered <img> or <video>. Used to forward hover/scale animations. */
  className?: string;
}

/**
 * Renders a video cover (autoplay/muted/loop, poster = src) when `video` is provided,
 * else a Next/Image cover. Both variants fill their nearest positioned ancestor and
 * use object-cover, so the call site can swap from image-only to video without
 * touching layout. The poster gives the same instant paint Next/Image provides.
 */
export function CoverMedia({
  src,
  video,
  alt,
  priority,
  sizes,
  className,
}: CoverMediaProps) {
  if (video) {
    return (
      <video
        src={video}
        poster={src}
        autoPlay
        muted
        loop
        playsInline
        preload={priority ? 'auto' : 'metadata'}
        aria-label={alt}
        className={`absolute inset-0 w-full h-full object-cover ${className ?? ''}`.trim()}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={`object-cover ${className ?? ''}`.trim()}
    />
  );
}
