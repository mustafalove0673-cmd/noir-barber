'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Navigation from '@/components/barber/Navigation';
import SmoothScroll from '@/components/barber/SmoothScroll';
import Footer from '@/components/barber/Footer';
import { BRAND } from '@/components/barber/data';

export default function NotFound() {
  return (
    <SmoothScroll>
      <Navigation />
      <main className="min-h-screen bg-background text-foreground overflow-hidden relative flex flex-col">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 20px, #c9a96e 20px, #c9a96e 21px)`,
          }}
        />

        {/* Content */}
        <div className="flex-1 flex items-center justify-center relative z-10 px-6">
          <div className="text-center max-w-lg">
            {/* Animated barber pole stripe */}
            <div className="relative w-24 h-48 mx-auto mb-8 overflow-hidden rounded-full">
              <motion.div
                animate={{ y: [0, -96, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0"
                style={{
                  background: `repeating-linear-gradient(
                    0deg,
                    #c9a96e 0px, #c9a96e 24px,
                    #0a0a0a 24px, #0a0a0a 32px,
                    #f5f0e8 32px, #f5f0e8 56px,
                    #0a0a0a 56px, #0a0a0a 64px
                  )`,
                }}
              />
              <div className="absolute inset-0 rounded-full border border-gold/20" />
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="heading-display text-7xl md:text-9xl text-gold-gradient mb-4"
            >
              404
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-sans text-sm text-foreground/50 mb-10"
            >
              Looks like you took a wrong turn. Let us guide you back.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold text-background font-sans text-[11px] font-semibold uppercase tracking-[0.2em] btn-shine transition-all hover:shadow-gold"
              >
                Back to Home
              </Link>

              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-gold/40 text-gold font-sans text-[11px] font-semibold uppercase tracking-[0.2em] transition-all hover:bg-gold/10 hover:border-gold"
              >
                Book a Visit
              </a>
            </motion.div>
          </div>
        </div>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
