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
    <section className="py-40" aria-labelledby="portrait-statement">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-12">

          {/* Left column — video (55% on desktop) */}
          <motion.div
            className="w-full md:w-[55%] flex justify-center"
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

          {/* Right column — brand statement (45% on desktop) */}
          <div className="w-full md:w-[45%] flex flex-col justify-center">
            {/* Outer motion.div controls opacity for gradient text fade-in */}
            <motion.div {...fadeUpStatement(0.1)}>
              <blockquote id="portrait-statement">
                <p
                  className="stats-gradient font-sans font-bold leading-[1.2] tracking-[-0.02em]"
                  style={{
                    fontSize: 'clamp(1.875rem, 3.2vw, 3rem)',
                    maxWidth: 'min(100%, 32ch)',
                  }}
                >
                  We&rsquo;re craftspeople first, consultants second. Every project earns our full attention or it doesn&rsquo;t earn a place on the page.
                </p>
              </blockquote>
            </motion.div>

            <motion.p
              className="mt-8 font-sans font-medium text-[0.875rem] text-[rgba(255,251,245,0.55)]"
              style={{ letterSpacing: '0.02em' }}
              {...fadeUpStatement(0.2)}
            >
              &mdash; Ibrahim Shareef, Founder
            </motion.p>
          </div>

        </div>
      </div>
    </section>
  );
}
