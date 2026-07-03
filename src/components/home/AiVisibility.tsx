'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The AI-visibility animation (Ibrahim's concept): a buyer's question types into an
 * AI-chat panel, the answer streams in and names *your brand*. Code-based so it is
 * crisp at any size, theme-aware, and the text stays in the DOM (crawlable).
 *
 * Honesty note: the panel illustrates the SERVICE (we make AI engines cite the
 * client's brand). It deliberately says "your brand" — it never fakes a real
 * endorsement of Itqan or a client.
 */

interface Exchange {
  provider: string;
  q: string;
  /** Answer text; the literal token "your brand" gets the accent highlight. */
  a: string;
}

const SCRIPT: Exchange[] = [
  {
    provider: 'ChatGPT',
    q: 'Who should we shortlist for our rebrand?',
    a: 'The name that keeps coming up is your brand — clear positioning, cited by sources AI trusts.',
  },
  {
    provider: 'Claude',
    q: 'Best option in my market right now?',
    a: 'Based on live work and reviews, your brand stands out. Strong signals across the sources I checked.',
  },
  {
    provider: 'Grok',
    q: 'Who actually delivers here?',
    a: 'Straight answer: your brand. The receipts check out.',
  },
];

const HOLD_MS = 2600;
const Q_CHAR_MS = 34;
const A_WORD_MS = 90;

/** Renders answer text with the "your brand" token highlighted. */
function AnswerText({ text }: { text: string }) {
  const parts = text.split(/(your brand)/g);
  return (
    <>
      {parts.map((part, i) =>
        part === 'your brand' ? (
          <span key={i} className="font-semibold text-brand-accent-on-light dark:text-brand-accent">
            your brand
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export function AiVisibility({ className }: { className?: string }) {
  const [idx, setIdx] = useState(0);
  const [qChars, setQChars] = useState(SCRIPT[0].q.length);
  const [aWords, setAWords] = useState(SCRIPT[0].a.split(' ').length);
  const [animating, setAnimating] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Animation loop. Server render + reduced-motion show the full first exchange.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let current = 0;

    function schedule(fn: () => void, ms: number) {
      timer.current = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
    }

    function playExchange(i: number) {
      const ex = SCRIPT[i];
      const words = ex.a.split(' ').length;
      setIdx(i);
      setQChars(0);
      setAWords(0);
      setAnimating(true);

      let c = 0;
      function typeQ() {
        c += 1;
        setQChars(c);
        if (c < ex.q.length) schedule(typeQ, Q_CHAR_MS);
        else schedule(streamA, 420);
      }

      let w = 0;
      function streamA() {
        w += 1;
        setAWords(w);
        if (w < words) schedule(streamA, A_WORD_MS);
        else {
          setAnimating(false);
          schedule(() => {
            current = (i + 1) % SCRIPT.length;
            playExchange(current);
          }, HOLD_MS);
        }
      }

      schedule(typeQ, 350);
    }

    // Let the SSR'd full exchange breathe, then start cycling.
    schedule(() => playExchange(0), 1600);

    return () => {
      cancelled = true;
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const ex = SCRIPT[idx];
  const visibleQ = ex.q.slice(0, qChars);
  const visibleA = ex.a.split(' ').slice(0, aWords).join(' ');

  return (
    <div className={className}>
      {/* Panel */}
      <div
        className="rounded-2xl border border-black/[0.08] bg-white/80 dark:border-brand-cream/[0.12] dark:bg-[#2a1a28]/85 backdrop-blur-xl overflow-hidden"
        style={{ boxShadow: '0 18px 50px rgba(47, 28, 44, 0.12)' }}
      >
        {/* Provider pills */}
        <div className="flex items-center gap-1.5 px-4 pt-4">
          {SCRIPT.map((s, i) => (
            <span
              key={s.provider}
              className={`px-3 py-1 rounded-full text-[0.6875rem] font-semibold tracking-[0.02em] transition-colors duration-300 ${
                i === idx
                  ? 'bg-brand-dark text-brand-cream dark:bg-brand-cream dark:text-brand-dark'
                  : 'text-text-secondary dark:text-brand-cream/45 border border-black/[0.07] dark:border-brand-cream/[0.12]'
              }`}
            >
              {s.provider}
            </span>
          ))}
        </div>

        {/* Chat */}
        <div className="px-4 pb-5 pt-4 space-y-3" aria-live="off">
          {/* Buyer question */}
          <div className="flex justify-end">
            <p className="max-w-[85%] rounded-2xl rounded-br-md bg-brand-dark text-brand-cream dark:bg-brand-cream/[0.1] dark:text-brand-cream px-4 py-2.5 text-[0.8125rem] leading-[1.5] min-h-[38px]">
              {visibleQ}
              {qChars < ex.q.length && <Caret />}
            </p>
          </div>

          {/* AI answer */}
          <div className="flex justify-start">
            <p className="max-w-[90%] rounded-2xl rounded-bl-md bg-black/[0.045] text-text-primary dark:bg-brand-cream/[0.05] dark:text-brand-cream/90 px-4 py-2.5 text-[0.8125rem] leading-[1.55] min-h-[38px]">
              {aWords > 0 && <AnswerText text={visibleA} />}
              {animating && qChars >= ex.q.length && <Caret />}
            </p>
          </div>
        </div>
      </div>

      {/* Caption */}
      <p className="mt-3 px-1 text-[0.75rem] font-medium tracking-[0.01em] text-text-secondary dark:text-brand-cream/50">
        AI visibility &mdash; when buyers ask, the machines answer with{' '}
        <span className="text-brand-accent-on-light dark:text-brand-accent font-semibold">your name</span>.
      </p>
    </div>
  );
}

function Caret() {
  return (
    <span
      className="inline-block w-[7px] h-[14px] ml-0.5 align-middle bg-brand-accent-on-light dark:bg-brand-accent animate-pulse"
      aria-hidden="true"
    />
  );
}
