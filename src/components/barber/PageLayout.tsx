'use client';

import { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SmoothScroll from "./SmoothScroll";
import Navigation from "./Navigation";
import StickyButtons from "./StickyButtons";
import Footer from "./Footer";

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
        {/* Cinematic Page Hero */}
        <section className="relative h-40 md:h-52 flex items-end overflow-hidden">
          {/* Gold diagonal pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 20px, #c9a96e 20px, #c9a96e 21px)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />

          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 pb-6 md:pb-8">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-3 md:mb-4"
              aria-label="Breadcrumb"
            >
              <ol className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase font-sans">
                <li>
                  <Link href="/" className="text-muted-foreground/50 hover:text-gold transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li className="text-gold/30">/</li>
                <li className="text-gold/70">{title}</li>
              </ol>
            </motion.nav>

            <div className="flex items-end gap-4 md:gap-6">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-gold/10 leading-none select-none"
              >
                {number}
              </motion.span>
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="heading-display text-2xl md:text-3xl lg:text-4xl text-foreground tracking-wide"
                >
                  {title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="font-sans text-[11px] md:text-xs tracking-[0.25em] text-gold/50 uppercase mt-1"
                >
                  {subtitle}
                </motion.p>
              </div>
            </div>
          </div>

          {/* Gold gradient line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, #c9a96e 20%, #d4af37 50%, #c9a96e 80%, transparent)",
            }}
          />
        </section>

        {children}
      </main>
      <Footer />
    </SmoothScroll>
  );
}
