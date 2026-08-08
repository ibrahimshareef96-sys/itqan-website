'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDecorativeVideo } from '@/lib/use-decorative-video';

interface CoverMediaProps {
  src: string;
  video?: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  /** Applied to the rendered <img> or <video>. Used to forward hover/scale animations. */
  className?: string;
  /**
   * Adds a slow Ken Burns drift to the still cover (Phase C — cinematic case
   * heroes). Applied to the image only, never the video; disabled under
   * prefers-reduced-motion by the `.case-kenburns` rule in globals.css.
   */
  cinematic?: boolean;
}

/**
 * Renders a video cover (autoplay/muted/loop, poster = src) when `video` is provided,
 * else a Next/Image cover. Both variants fill their nearest positioned ancestor and
 * use object-cover, so the call site can swap from image-only to video without
 * touching layout. The poster gives the same instant paint Next/Image provides.
 *
 * Reduced-motion users get the still poster image instead of the looping video
 * (WCAG 2.2.2), matching the CaseMedia gate. The `muted` DOM property is set
 * imperatively because React doesn't serialize it into SSR HTML (facebook/react#10389),
 * which otherwise blocks autoplay in Chrome/Safari.
 */
export function CoverMedia({
  src,
  video,
  alt,
  priority,
  sizes,
  className,
  cinematic,
}: CoverMediaProps) {
  const [reduced, setReduced] = useState(false);
  const videoRef = useDecorativeVideo<HTMLVideoElement>();

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  if (video && !reduced) {
    return (
      /* No `autoPlay`: the attribute is in SSR HTML, so playback began during
         parse — before hydration could honour a motion preference — and ran
         offscreen. `useDecorativeVideo` gates on visibility and reduced motion. */
      <video
        ref={videoRef}
        poster={src}
        muted
        loop
        playsInline
        preload={priority ? 'auto' : 'metadata'}
        aria-label={alt}
        className={`absolute inset-0 w-full h-full object-cover ${className ?? ''}`.trim()}
      >
        <source src={video} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={`object-cover ${cinematic ? 'case-kenburns ' : ''}${className ?? ''}`.trim()}
    />
  );
}
