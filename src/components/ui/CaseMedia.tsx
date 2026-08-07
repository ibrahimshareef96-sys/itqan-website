'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

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

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  if (video && !reduced) {
    return (
      <video
        ref={(el) => {
          if (el) {
            el.muted = true;
            el.play().catch(() => {});
          }
        }}
        autoPlay
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
