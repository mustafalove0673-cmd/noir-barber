'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SmoothScroll from './SmoothScroll';
import Navigation from './Navigation';
import StickyButtons from './StickyButtons';
import Footer from './Footer';

interface PageLayoutProps {
  title: string;
  subtitle: string;
  number: string;
  children: ReactNode;
}

export default function PageLayout({ title, subtitle, number, children }: PageLayoutProps) {
  return (
    <SmoothScroll>
      <Navigation />
      <StickyButtons />
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Compact page hero */}
        <section className="relative pt-24 pb-8 md:pt-28 md:pb-10 overflow-hidden">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mb-4"
              aria-label="Breadcrumb"
            >
              <ol className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase font-sans">
                <li>
                  <Link href="/" className="text-white/20 hover:text-gold transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li className="text-white/10">/</li>
                <li className="text-gold/40">{title}</li>
              </ol>
            </motion.nav>

            <div className="flex items-end gap-4">
              <motion.span
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono text-3xl md:text-4xl font-bold text-white/[0.06] leading-none select-none"
              >
                {number}
              </motion.span>
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="heading-display text-xl md:text-2xl lg:text-3xl text-foreground/80 tracking-wide"
                >
                  {title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="font-sans text-[10px] tracking-[0.25em] text-white/15 uppercase mt-1"
                >
                  {subtitle}
                </motion.p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        </section>

        {children}
      </main>
      <Footer />
    </SmoothScroll>
  );
}
