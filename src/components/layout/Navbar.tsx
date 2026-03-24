'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X, ArrowRight } from '@phosphor-icons/react';

const navLinks = [
  { href: '/work', label: 'OUR WORK' },
  { href: '/services', label: 'SERVICES' },
  { href: '/about', label: 'ABOUT US' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      {/* Floating pill wrapper */}
      <div className="fixed top-4 left-0 right-0 z-50 px-3 sm:px-4 md:px-6">
        <motion.div
          initial={{ y: -72, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="max-w-5xl mx-auto"
        >
          <nav
            className={`bg-[#fffbf5]/85 backdrop-blur-xl rounded-full border px-4 md:px-5 h-14 flex items-center justify-between gap-4 transition-all duration-300 ${
              scrolled
                ? 'border-brand-accent/50 shadow-[0_8px_40px_rgba(47,28,44,0.18),inset_0_1px_0_rgba(255,255,255,0.6),0_0_0_1px_rgba(204,164,194,0.12)]'
                : 'border-brand-accent/35 shadow-[0_4px_20px_rgba(47,28,44,0.08),inset_0_1px_0_rgba(255,255,255,0.4)]'
            }`}
          >
            <Link href="/" className="flex-shrink-0" aria-label="Itqan Studio — home">
              <Image
                src="/images/brand/dark-logo.svg"
                alt="Itqan Studio"
                width={108}
                height={30}
                priority
              />
            </Link>

            <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[11px] font-medium tracking-[0.18em] text-text-primary hover:text-brand-dark transition-colors duration-200 uppercase"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:block flex-shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-brand-dark text-brand-cream px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-200"
              >
                Book a meeting
                <ArrowRight size={14} weight="bold" />
              </Link>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-1.5 -mr-1 text-brand-dark"
              aria-label="Open navigation menu"
            >
              <List size={22} />
            </button>
          </nav>
        </motion.div>
      </div>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-brand-dark flex flex-col"
          >
            <div className="px-5 h-16 flex items-center justify-between">
              <Image
                src="/images/brand/white-logo.svg"
                alt="Itqan Studio"
                width={108}
                height={30}
              />
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 text-brand-cream"
                aria-label="Close navigation menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 gap-9">
              {navLinks.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.07 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-2xl font-semibold text-brand-cream hover:text-brand-accent transition-colors tracking-widest"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-2 bg-brand-cream text-brand-dark px-8 py-3.5 rounded-full text-sm font-semibold hover:opacity-90 active:scale-[0.97] transition-all duration-200"
                >
                  Book a meeting
                  <ArrowRight size={14} weight="bold" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
