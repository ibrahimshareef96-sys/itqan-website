import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

/**
 * Site-wide Open Graph / social-share image, generated on-brand at build time.
 * This file convention auto-populates `og:image` AND `twitter:image` for every
 * route (overridable per-route), which fixes the previous metadata that pointed
 * at a non-existent /images/og-image.png. Fonts are read from the repo (no
 * build-time network dependency) for deterministic output.
 */
export const alt = 'Itqan Studio — Design, Automation & AI Agency in Dubai';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const CREAM = '#fffbf5';
const ACCENT = '#cca4c2';

export default async function OpengraphImage() {
  const [extraBold, bold] = await Promise.all([
    readFile(join(process.cwd(), 'src/app/_og/Manrope-ExtraBold.ttf')),
    readFile(join(process.cwd(), 'src/app/_og/Manrope-Bold.ttf')),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '76px 80px',
          fontFamily: 'Manrope',
          color: CREAM,
          background:
            'linear-gradient(135deg, #2f1c2c 0%, rgba(37,19,34,0.25) 35%, #1a0f1c 70%, #130a14 100%)',
          position: 'relative',
        }}
      >
        {/* Soft mauve glow */}
        <div
          style={{
            position: 'absolute',
            top: '-160px',
            left: '-120px',
            width: '720px',
            height: '720px',
            background:
              'radial-gradient(circle, rgba(204,164,194,0.28) 0%, rgba(204,164,194,0) 62%)',
            display: 'flex',
          }}
        />

        {/* Top — wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              fontSize: '30px',
              fontWeight: 800,
              letterSpacing: '-0.01em',
              color: CREAM,
            }}
          >
            Itqan Studio
          </div>
          <div
            style={{
              fontSize: '20px',
              fontWeight: 700,
              letterSpacing: '0.22em',
              color: ACCENT,
            }}
          >
            DUBAI
          </div>
        </div>

        {/* Middle — headline */}
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '8px' }}>
          <div
            style={{
              fontSize: '29px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: ACCENT,
              marginBottom: '26px',
            }}
          >
            DESIGN / AUTOMATION / AI
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: '82px',
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: '-0.02em',
            }}
          >
            <span style={{ color: CREAM }}>From invisible</span>
            <span style={{ color: CREAM }}>
              to <span style={{ color: ACCENT }}>inevitable.</span>
            </span>
          </div>
        </div>

        {/* Bottom — supporting line */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: '26px',
            fontWeight: 700,
          }}
        >
          <span style={{ color: 'rgba(255,251,245,0.78)' }}>
            Brand / System / Agentic Automation
          </span>
          <span style={{ color: ACCENT }}>itqanstudio.com</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Manrope', data: extraBold, weight: 800, style: 'normal' },
        { name: 'Manrope', data: bold, weight: 700, style: 'normal' },
      ],
    }
  );
}
