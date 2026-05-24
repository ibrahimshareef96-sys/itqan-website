'use client';

import { motion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: EASE, delay },
});

const fadeUpStatement = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.8, ease: EASE, delay },
});

export function Portrait() {
  return (
    <section className="py-32 md:py-40" aria-labelledby="portrait-statement">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

          {/* Left column — video (50% on desktop) */}
          <motion.div
            className="w-full md:w-[50%] flex justify-center"
            {...fadeUp(0)}
          >
            <div
              className="portrait-video-wrapper relative w-full overflow-hidden rounded-[12px]"
              style={{
                maxWidth: 'min(100%, 620px)',
                backgroundColor: 'rgba(25,15,25,0.4)',
              }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/founder-render.png"
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/videos/portrait-sill.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>

          {/* Right column — Identity statement (50% on desktop) */}
          <div className="w-full md:w-[50%] flex flex-col justify-center">
            {/* Eyebrow */}
            <motion.p
              className="font-sans font-medium text-[0.6875rem] uppercase text-brand-accent"
              style={{ letterSpacing: '0.22em' }}
              {...fadeUpStatement(0)}
            >
              The founder
            </motion.p>

            {/* Identity statement */}
            <motion.div {...fadeUpStatement(0.1)}>
              <blockquote id="portrait-statement" className="mt-6">
                <p
                  className="stats-gradient font-sans font-bold leading-[1.1] tracking-[-0.02em]"
                  style={{
                    fontSize: 'clamp(2rem, 3.6vw, 3.25rem)',
                    maxWidth: 'min(100%, 18ch)',
                  }}
                >
                  Engineer. Designer. Storyteller.{' '}
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: 'italic',
                      fontWeight: 500,
                    }}
                  >
                    All in one.
                  </span>
                </p>
              </blockquote>
            </motion.div>

            {/* Supporting line */}
            <motion.p
              className="mt-7 font-sans font-normal text-brand-cream/70 leading-[1.6]"
              style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.125rem)',
                maxWidth: 'min(100%, 46ch)',
              }}
              {...fadeUpStatement(0.18)}
            >
              Ibrahim Shareef. Solo founder of Itqan Studio. The rare person who can
              build the brand, code the system, and tell the story &mdash; without
              handing it off three times.
            </motion.p>

            <motion.p
              className="mt-7 font-sans font-medium text-[0.8125rem] text-brand-cream/45"
              style={{ letterSpacing: '0.02em' }}
              {...fadeUpStatement(0.26)}
            >
              &mdash; Ibrahim Shareef, Founder
            </motion.p>
          </div>

        </div>
      </div>
    </section>
  );
}
