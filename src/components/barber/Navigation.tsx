'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineBars3, HiOutlineXMark } from 'react-icons/hi2';
import { RiWhatsappFill, RiArrowRightUpLine } from 'react-icons/ri';
import { NAV_LINKS, BRAND } from './data';

const NAV_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08', '09'];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopExpanded, setDesktopExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close expanded nav on scroll
  useEffect(() => {
    if (!desktopExpanded) return;
    const onScroll = () => setDesktopExpanded(false);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [desktopExpanded]);

  const scrollToSection = useCallback((href: string) => {
    if (href.startsWith('/')) return;
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
    setDesktopExpanded(false);
  }, []);

  return (
    <>
      {/* ── Floating Capsule ── */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-3 left-1/2 -translate-x-1/2 z-[100]"
      >
        <motion.nav
          className={`flex items-center gap-0 rounded-full px-1 pr-1.5 h-11 transition-all duration-500 ${
            scrolled || desktopExpanded
              ? 'glass-strong shadow-lg shadow-black/20'
              : 'bg-white/[0.04] backdrop-blur-sm'
          }`}
          onMouseEnter={() => setDesktopExpanded(true)}
          onMouseLeave={() => setDesktopExpanded(false)}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center justify-center w-11 h-11 rounded-full hover:bg-orange/10 transition-colors duration-300"
          >
            <img
              src="/logo.png"
              alt="Batuhan Taşcı"
              className="w-7 h-7 rounded-full object-cover"
            />
          </Link>

          {/* ── Desktop: Expanding Link Bar ── */}
          <div className="hidden lg:flex items-center">
            <AnimatePresence>
              {desktopExpanded && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden flex items-center"
                >
                  <div className="h-4 w-px bg-orange/20 mx-2" />
                  <div className="flex items-center gap-0.5 px-1">
                    {NAV_LINKS.map((link, i) => (
                      <motion.div
                        key={link.label}
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25, delay: i * 0.03 }}
                      >
                        {link.href === '/' ? (
                          <Link
                            href="/"
                            className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/40 hover:text-orange transition-colors duration-200"
                          >
                            {link.label}
                          </Link>
                        ) : link.href.startsWith('/') ? (
                          <Link
                            href={link.href}
                            className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/40 hover:text-orange transition-colors duration-200"
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <button
                            onClick={() => scrollToSection(link.href)}
                            className="px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/40 hover:text-orange transition-colors duration-200"
                          >
                            {link.label}
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Separator */}
          <div className="hidden lg:block h-4 w-px bg-orange/15 mx-1.5" />

          {/* WhatsApp micro button */}
          <a
            href={`https://wa.me/${BRAND.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded-full text-foreground/30 hover:text-[#25D366] transition-colors duration-300"
            aria-label="WhatsApp"
          >
            <RiWhatsappFill className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-[110] flex items-center justify-center w-8 h-8 rounded-full text-foreground/40 hover:text-orange transition-colors duration-300 lg:hidden"
            aria-label="Menü"
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <HiOutlineXMark className="w-4 h-4" />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <HiOutlineBars3 className="w-4 h-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.nav>
      </motion.header>

      {/* ── Mobile: Cinematic Fullscreen Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center lg:hidden"
          >
            {/* Dark backdrop */}
            <div className="absolute inset-0 bg-[#050505]/98 backdrop-blur-2xl" />

            {/* Decorative vertical lines */}
            <div className="absolute top-0 left-[20%] w-px h-full bg-gradient-to-b from-transparent via-orange/5 to-transparent" />
            <div className="absolute top-0 right-[20%] w-px h-full bg-gradient-to-b from-transparent via-orange/5 to-transparent" />

            {/* Links */}
            <nav className="relative z-10 flex flex-col items-center gap-1 px-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.95 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + i * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {link.href === '/' ? (
                    <Link
                      href="/"
                      onClick={() => setMobileOpen(false)}
                      className="group flex items-center gap-4 py-2"
                    >
                      <span className="font-sans text-[10px] tracking-[0.3em] text-orange/20 font-mono">
                        {NAV_NUMBERS[i]}
                      </span>
                      <span className="font-serif text-4xl md:text-5xl tracking-[0.08em] text-foreground/70 group-hover:text-orange transition-colors duration-400">
                        {link.label}
                      </span>
                      <RiArrowRightUpLine className="w-4 h-4 text-orange/0 group-hover:text-orange/60 transition-all duration-400 translate-x-0 group-hover:translate-x-1" />
                    </Link>
                  ) : link.href.startsWith('/') ? (
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="group flex items-center gap-4 py-2"
                    >
                      <span className="font-sans text-[10px] tracking-[0.3em] text-orange/20 font-mono">
                        {NAV_NUMBERS[i]}
                      </span>
                      <span className="font-serif text-4xl md:text-5xl tracking-[0.08em] text-foreground/70 group-hover:text-orange transition-colors duration-400">
                        {link.label}
                      </span>
                      <RiArrowRightUpLine className="w-4 h-4 text-orange/0 group-hover:text-orange/60 transition-all duration-400 translate-x-0 group-hover:translate-x-1" />
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="group flex items-center gap-4 py-2"
                    >
                      <span className="font-sans text-[10px] tracking-[0.3em] text-orange/20 font-mono">
                        {NAV_NUMBERS[i]}
                      </span>
                      <span className="font-serif text-4xl md:text-5xl tracking-[0.08em] text-foreground/70 group-hover:text-orange transition-colors duration-400">
                        {link.label}
                      </span>
                      <RiArrowRightUpLine className="w-4 h-4 text-orange/0 group-hover:text-orange/60 transition-all duration-400 translate-x-0 group-hover:translate-x-1" />
                    </button>
                  )}
                </motion.div>
              ))}
            </nav>

            {/* Bottom info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-3 px-6"
            >
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-orange/30 to-transparent" />
              <div className="flex items-center gap-3">
                <RiWhatsappFill className="w-3.5 h-3.5 text-[#25D366]/60" />
                <span className="font-sans text-[10px] tracking-[0.2em] text-foreground/30 uppercase">
                  {BRAND.phone}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
