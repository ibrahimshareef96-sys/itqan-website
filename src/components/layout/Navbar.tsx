'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X } from '@phosphor-icons/react';
import { EASE_SMOOTH } from '@/lib/motion';

const navLinks = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHomepage = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    // Set initial state
    setScrolled(window.scrollY > 80);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // On non-homepage routes, navbar is always solid
  const showSolid = !isHomepage || scrolled;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: showSolid ? '#1f1420' : 'transparent',
          backdropFilter: showSolid ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: showSolid ? 'blur(12px)' : 'none',
          borderBottom: showSolid
            ? '1px solid rgba(255,251,245,0.08)'
            : '1px solid transparent',
        }}
      >
        <motion.nav
          initial={{ y: -72, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE_SMOOTH, delay: 0.1 }}
          aria-label="Main navigation"
          className="max-w-[1440px] mx-auto h-[72px] flex items-center justify-between px-5 md:px-8"
        >
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label="Itqan Studio — home">
            <Image
              src="/images/brand/light-icon.svg"
              alt="Itqan Studio"
              width={28}
              height={28}
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => {
              const isActive = pathname === l.href || pathname.startsWith(l.href + '/');
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative text-[0.9375rem] font-medium transition-opacity duration-200 ${
                    isActive
                      ? 'nav-active-gradient'
                      : 'text-brand-cream/75 hover:text-brand-cream hover:opacity-100'
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block flex-shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center h-[42px] px-6 rounded-[10px] border border-brand-cream text-brand-cream text-sm font-semibold hover:bg-brand-cream hover:text-brand-dark transition-colors duration-200"
            >
              Book a discovery call
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-1.5 -mr-1 text-brand-cream"
            aria-label="Open navigation menu"
          >
            <List size={22} />
          </button>
        </motion.nav>
      </header>

      {/* Mobile full-screen overlay — UNCHANGED */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-brand-dark flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="px-5 h-[72px] flex items-center justify-between">
              <Image
                src="/images/brand/light-icon.svg"
                alt="Itqan Studio"
                width={28}
                height={28}
              />
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 text-brand-cream"
                aria-label="Close navigation menu"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-col items-center justify-center flex-1 gap-9" aria-label="Mobile navigation">
              {navLinks.map((l, i) => {
                const isActive = pathname === l.href || pathname.startsWith(l.href + '/');
                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.07 + i * 0.06, ease: EASE_SMOOTH }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`text-2xl font-semibold tracking-wide uppercase transition-colors ${
                        isActive
                          ? 'text-brand-cream'
                          : 'text-brand-cream/75 hover:text-brand-cream'
                      }`}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, ease: EASE_SMOOTH }}
              >
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center h-[56px] px-8 rounded-[10px] border border-brand-cream text-brand-cream text-sm font-semibold hover:bg-brand-cream hover:text-brand-dark transition-colors duration-200"
                >
                  Book a discovery call
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
