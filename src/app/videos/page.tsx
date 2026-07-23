'use client';

import SmoothScroll from '@/components/barber/SmoothScroll';
import Navigation from '@/components/barber/Navigation';
import Footer from '@/components/barber/Footer';
import StickyButtons from '@/components/barber/StickyButtons';
import { motion } from 'framer-motion';
import { Play, Instagram, Star } from 'lucide-react';
import { BRAND, INSTAGRAM_REELS, IMAGES } from '@/components/barber/data';

const STATS = [
  { value: BRAND.googleReviews, label: 'Google Yorum', icon: '★' },
  { value: '5.0', label: 'Yıldız Puanı', icon: '★' },
  { value: '500+', label: 'Mutlu Müşteri', icon: '✦' },
  { value: '7+', label: 'Yıllık Deneyim', icon: '◆' },
];

export default function VideosPage() {
  return (
    <SmoothScroll>
      <Navigation />
      <StickyButtons />
      <main className="min-h-screen bg-[#0a0a0a] text-foreground overflow-x-hidden">
        {/* Hero */}
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
          <div className="absolute inset-0">
            <img src={IMAGES.hero} alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]/40" />
            <div className="absolute inset-0 pattern-stripes" />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <span className="font-mono text-[10px] tracking-[0.5em] text-orange/30 uppercase block mb-4">PORTFOLYO</span>
              <h1 className="heading-display text-[clamp(3rem,10vw,8rem)] text-orange-gradient mb-4">VİDEOLAR</h1>
              <p className="font-sans text-[12px] text-white/25 tracking-[0.3em] uppercase max-w-lg mx-auto">
                Instagram&apos;daki en iyi saç transformasyon videolarımız
              </p>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-px bg-orange/40 mx-auto mt-6"
              />
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-white/[0.04]">
          <div className="max-w-5xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="py-10 md:py-14 text-center border-r border-white/[0.04] last:border-0"
              >
                <span className="text-orange/60 text-xs mb-2 block">{stat.icon}</span>
                <span className="block font-serif text-3xl md:text-4xl text-orange-gradient leading-none mb-2">{stat.value}</span>
                <span className="block font-sans text-[9px] tracking-[0.3em] text-white/20 uppercase">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Videos Grid */}
        <section className="py-16 md:py-24">
          <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {INSTAGRAM_REELS.map((reel, i) => (
                <motion.div
                  key={reel.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  <a
                    href={reel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative block overflow-hidden border border-white/[0.06] rounded-sm group hover:border-orange/30 transition-all duration-500"
                    style={{ aspectRatio: '9/16' }}
                  >
                    <iframe
                      src={reel.embedUrl}
                      className="w-full h-full object-cover"
                      allowFullScreen
                      loading="lazy"
                      title={reel.caption}
                    />
                    <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                      <div className="w-16 h-16 rounded-full border-2 border-orange/40 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-orange">
                        <Play className="text-orange ml-0.5" size={22} fill="currentColor" />
                      </div>
                      <p className="font-sans text-[10px] tracking-[0.2em] text-white/40 uppercase">{reel.caption}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                      <p className="font-sans text-[10px] text-white/40">{reel.caption}</p>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0">
            <img src={IMAGES.heroAlt} alt="" className="w-full h-full object-cover opacity-[0.05]" />
            <div className="absolute inset-0 bg-[#0a0a0a]/90" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 text-center px-6"
          >
            <p className="font-serif text-lg text-orange-gradient/50 mb-2">&ldquo;İşimizi görüntüleyin, farkı hissedin.&rdquo;</p>
            <a
              href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Merhaba Batuhan, randevu almak istiyorum.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-8 py-3 bg-orange text-background font-sans text-[10px] font-semibold tracking-[0.25em] uppercase btn-shine hover:shadow-orange transition-all"
            >
              Randevu Al
            </a>
          </motion.div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
