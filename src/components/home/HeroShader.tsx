'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Shader, Swirl, ChromaFlow, FlutedGlass, FilmGrain } from 'shaders/react';

/**
 * Axion-style animated hero background, recolored to Itqan tokens.
 * - Light: cream base swirl + mauve chroma flow under fluted glass + grain.
 * - Dark: plum base + mauve flow (same stack, brand-dark palette).
 * Client-only (WebGPU); the parent renders a CSS gradient behind this layer as the
 * no-JS / no-WebGPU / reduced-motion fallback. Loaded via next/dynamic (ssr: false).
 */
export default function HeroShader() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  // Respect reduced motion: skip the animated shader entirely (CSS fallback shows).
  if (!mounted || reduced) return null;

  const dark = resolvedTheme === 'dark';

  return (
    <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden="true">
      <Shader className="w-full h-full">
        <Swirl
          colorA={dark ? '#2f1c2c' : '#ffffff'}
          colorB={dark ? '#1f1420' : '#f0e9e0'}
          detail={1.7}
        />
        <ChromaFlow
          baseColor={dark ? '#1f1420' : '#fffbf5'}
          downColor="#cca4c2"
          leftColor="#cca4c2"
          rightColor="#d1c2a5"
          upColor="#cca4c2"
          momentum={13}
          radius={3.5}
          opacity={dark ? 0.5 : 0.65}
        />
        <FlutedGlass
          aberration={0.61}
          angle={31}
          frequency={8}
          highlight={0.12}
          highlightSoftness={0}
          lightAngle={-90}
          refraction={4}
          shape="rounded"
          softness={1}
          speed={0.15}
        />
        <FilmGrain strength={0.05} />
      </Shader>
    </div>
  );
}
