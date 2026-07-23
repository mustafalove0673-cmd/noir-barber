'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineBars3, HiOutlineXMark } from 'react-icons/hi2';
import { RiWhatsappFill } from 'react-icons/ri';
import { NAV_LINKS, BRAND } from './data';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollToSection = useCallback((href: string) => {
    if (href.startsWith('/')) return; // handled by Link
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled ? 'glass-strong' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 md:h-20 max-w-[1800px] items-center justify-between px-4 md:px-8 lg:px-12">
          <Link
            href="/"
            className="font-serif text-xl md:text-2xl font-bold tracking-wider text-gold-gradient transition-opacity hover:opacity-80"
          >
            NOIR
          </Link>

          <ul className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                {link.href.startsWith('/') ? (
                  <Link
                    href={link.href}
                    className="group relative text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/60 transition-colors hover:text-gold"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-gold to-gold-light transition-all duration-300 group-hover:w-full" />
                  </Link>
                ) : (
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="group relative text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/60 transition-colors hover:text-gold"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-gold to-gold-light transition-all duration-300 group-hover:w-full" />
                  </button>
                )}
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${BRAND.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 text-foreground/50 transition-all duration-300 hover:bg-gold/10 hover:text-gold"
              aria-label="Contact via WhatsApp"
            >
              <RiWhatsappFill className="h-4 w-4 md:h-5 md:w-5" />
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-[60] flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full text-foreground/60 transition-colors hover:text-gold lg:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <HiOutlineXMark className="h-5 w-5 md:h-6 md:w-6" />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <HiOutlineBars3 className="h-5 w-5 md:h-6 md:w-6" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        <div
          className={`h-px w-full transition-opacity duration-700 ${scrolled ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: 'linear-gradient(90deg, transparent 0%, #c9a96e 20%, #d4af37 50%, #c9a96e 80%, transparent 100%)' }}
        />
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col items-center gap-5 overflow-y-auto max-h-[60vh] px-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  {link.href.startsWith('/') ? (
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-serif text-3xl md:text-4xl font-medium tracking-[0.15em] text-foreground/80 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="font-serif text-3xl md:text-4xl font-medium tracking-[0.15em] text-foreground/80 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </button>
                  )}
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-8 flex items-center gap-3"
            >
              <RiWhatsappFill className="h-4 w-4 text-gold" />
              <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-xs tracking-wider text-foreground/50 hover:text-gold transition-colors">
                {BRAND.phone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
