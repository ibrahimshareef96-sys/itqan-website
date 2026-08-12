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
    provider: 'Gemini',
    q: 'Who actually delivers here?',
    a: 'Top answer: your brand — consistent signals across every source I checked.',
  },
];

const HOLD_MS = 2600;
const Q_CHAR_MS = 34;
const A_WORD_MS = 90;

// The tallest question + answer across the script. Rendered as invisible "ghosts"
// so each bubble is ALWAYS sized to its largest possible content — the panel never
// grows while text streams, nor resizes between exchanges. This is the fix for the
// hero's CLS (the panel used to reflow every keystroke + every cycle).
const LONGEST_Q = SCRIPT.reduce((m, s) => (s.q.length > m.length ? s.q : m), '');
const LONGEST_A = SCRIPT.reduce((m, s) => (s.a.length > m.length ? s.a : m), '');

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
          schedule(() => playExchange((i + 1) % SCRIPT.length), HOLD_MS);
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

  /*
   * The answer bubble reserves the tallest answer's height from the very first
   * frame (that ghost is what holds hero CLS at ~0), so between exchanges it used
   * to sit on screen as a large EMPTY grey slab — it read as a skeleton that
   * failed to load rather than as a chat waiting for a reply.
   *
   * Two paint-only states fix that, and neither can move layout because the
   * streaming text is absolutely positioned inside the already-sized bubble:
   *   quiet    — the buyer is still typing, so there is nothing to answer yet;
   *              the bubble's fill drops away and the space reads as empty room.
   *   thinking — the question has landed and the reply has not started; the fill
   *              returns with a typing indicator, which is what a chat does.
   * Under reduced motion the cycle never runs, so neither state is ever reached.
   */
  const awaitingAnswer = animating && aWords === 0;
  const thinking = awaitingAnswer && qChars >= ex.q.length;
  const quiet = awaitingAnswer && !thinking;

  return (
    <div className={className}>
      {/* Panel */}
      <div
        /* `material-chrome` (not a bare `backdrop-blur-*`) so the
           prefers-reduced-transparency and prefers-contrast fallbacks in
           globals.css actually reach this panel — it is the largest translucent
           surface on the hero. */
        className="material-chrome rounded-2xl border border-black/[0.08] bg-white/80 dark:border-brand-cream/[0.12] dark:bg-[#2a1a28]/85 overflow-hidden"
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
                  : 'text-text-secondary dark:text-brand-cream/60 border border-black/[0.07] dark:border-brand-cream/[0.12]'
              }`}
            >
              {s.provider}
            </span>
          ))}
        </div>

        {/* Chat. Each bubble reserves the tallest exchange's height via an invisible
            ghost + an absolutely-positioned streaming overlay → zero layout shift. */}
        <div className="px-4 pb-5 pt-4 space-y-3" aria-live="off">
          {/* Buyer question */}
          <div className="flex justify-end">
            <p className="relative max-w-[85%] rounded-2xl rounded-br-md bg-brand-dark text-brand-cream dark:bg-brand-cream/[0.1] dark:text-brand-cream px-4 py-2.5 text-[0.8125rem] leading-[1.5]">
              <span className="invisible" aria-hidden="true">{LONGEST_Q}</span>
              <span className="absolute inset-0 px-4 py-2.5">
                {visibleQ}
                {qChars < ex.q.length && <Caret />}
              </span>
            </p>
          </div>

          {/* AI answer */}
          <div className="flex justify-start">
            <p
              className={`relative max-w-[90%] rounded-2xl rounded-bl-md text-text-primary dark:text-brand-cream/90 px-4 py-2.5 text-[0.8125rem] leading-[1.55] transition-colors duration-300 ${
                quiet
                  ? 'bg-transparent dark:bg-transparent'
                  : 'bg-black/[0.045] dark:bg-brand-cream/[0.05]'
              }`}
            >
              <span className="invisible" aria-hidden="true">{LONGEST_A}</span>
              <span className="absolute inset-0 px-4 py-2.5">
                {thinking && <Thinking />}
                {aWords > 0 && <AnswerText text={visibleA} />}
                {aWords > 0 && animating && <Caret />}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Caption — describes the service aim (not a guaranteed outcome) + simulation disclosure */}
      <p className="mt-3 px-1 text-[0.75rem] font-medium tracking-[0.01em] text-[#4a4a4a] dark:text-brand-cream/60">
        AI visibility &mdash; getting{' '}
        <span className="text-brand-accent-on-light dark:text-brand-accent font-semibold">your name</span>{' '}
        into the answers buyers see.
      </p>
      {/* The honesty disclaimer must be the LAST thing that is hard to read.
          `/40` on dark fell under 4.5:1, and the light value's alpha made the
          ratio depend on which band of the hero gradient sat behind it. */}
      <p className="mt-1 px-1 text-[0.6875rem] text-[#5c5c5c] dark:text-brand-cream/60">
        Simulated answers, for illustration.
      </p>
    </div>
  );
}

/** Typing indicator for the gap between the question landing and the reply. */
function Thinking() {
  return (
    <span className="inline-flex items-center gap-[5px] align-middle" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="ai-thinking-dot inline-block w-[6px] h-[6px] rounded-full bg-brand-accent-on-light dark:bg-brand-accent"
          style={{ animationDelay: `${i * 160}ms` }}
        />
      ))}
    </span>
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
