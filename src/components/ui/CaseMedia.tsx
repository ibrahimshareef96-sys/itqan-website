'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDecorativeVideo } from '@/lib/use-decorative-video';

interface CaseMediaProps {
  video?: string;
  image: string;
  alt: string;
  sizes?: string;
}

/**
 * Case-card media: autoplaying loop video with a reduced-motion gate (renders the
 * poster image instead — WCAG 2.2.2), or a hover-scaling image. The `muted` DOM
 * property is set imperatively because React doesn't serialize it into SSR HTML
 * (facebook/react#10389), which otherwise blocks autoplay in Chrome/Safari.
 */
export function CaseMedia({ video, image, alt, sizes }: CaseMediaProps) {
  const [reduced, setReduced] = useState(false);
  const videoRef = useDecorativeVideo<HTMLVideoElement>();

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  if (video && !reduced) {
    return (
      /*
       * No `autoPlay`, and no imperative `.play()` on the ref. The attribute is
       * present in SSR HTML, so the browser began playing during parse — before
       * hydration could decide whether the visitor wanted motion at all — and it
       * played offscreen for every card in the grid. `useDecorativeVideo` starts
       * playback only while the card is actually in view, and never under
       * reduced motion.
       */
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        poster={image}
        aria-label={alt}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={video} type="video/mp4" />
      </video>
    );
  }

  return (
    <Image
      src={image}
      alt={alt}
      fill
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
      sizes={sizes ?? '(max-width: 768px) 100vw, 50vw'}
    />
  );
}
