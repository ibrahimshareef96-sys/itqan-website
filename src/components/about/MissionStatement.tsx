'use client';

import { TextReveal } from '@/components/ui/TextReveal';

export function MissionStatement() {
  return (
    <section className="relative bg-brand-dark py-24 lg:py-32 overflow-hidden">

      {/* Islamic geometric pattern watermark — pure decorative SVG, right-positioned */}
      <div className="absolute right-0 top-0 bottom-0 w-[60%] pointer-events-none select-none opacity-[0.06]" aria-hidden="true">
        <svg
          viewBox="0 0 400 600"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          fill="none"
        >
          {/* 8-pointed star tessellation inspired by traditional Islamic geometric art */}
          <defs>
            <pattern id="islamic-star" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              {/* Central 8-pointed star */}
              <polygon
                points="50,10 58.5,35 85,27 68,48 85,70 58.5,62 50,88 41.5,62 15,70 32,48 15,27 41.5,35"
                fill="#cca4c2"
              />
              {/* Corner quarter-stars for seamless tessellation */}
              <polygon
                points="0,0 8.5,25 35,17 18,38"
                fill="#cca4c2"
              />
              <polygon
                points="100,0 91.5,25 65,17 82,38"
                fill="#cca4c2"
              />
              <polygon
                points="0,100 8.5,75 35,83 18,62"
                fill="#cca4c2"
              />
              <polygon
                points="100,100 91.5,75 65,83 82,62"
                fill="#cca4c2"
              />
              {/* Connecting diamond shapes */}
              <polygon points="50,0 58.5,17 50,35 41.5,17" fill="#cca4c2" />
              <polygon points="50,65 58.5,83 50,100 41.5,83" fill="#cca4c2" />
              <polygon points="0,50 17,41.5 35,50 17,58.5" fill="#cca4c2" />
              <polygon points="65,50 83,41.5 100,50 83,58.5" fill="#cca4c2" />
            </pattern>
          </defs>
          <rect width="400" height="600" fill="url(#islamic-star)" />
        </svg>
      </div>

      {/* Subtle radial accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_50%,rgba(204,164,194,0.08),transparent)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <TextReveal direction="left" delay={0}>
          <p className="font-sans text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl text-brand-cream font-bold leading-tight tracking-tight max-w-3xl">
            Itqan comes from the Arabic word meaning Excellence.
          </p>
        </TextReveal>
        <TextReveal direction="right" delay={0.14}>
          <p className="font-serif italic text-[1.75rem] sm:text-3xl md:text-4xl lg:text-5xl text-brand-accent leading-tight tracking-tight mt-4 max-w-3xl">
            And Excellence is defined by the values that shape it.
          </p>
        </TextReveal>
      </div>
    </section>
  );
}
