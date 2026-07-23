'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import SmoothScroll from '@/components/barber/SmoothScroll';
import Navigation from '@/components/barber/Navigation';
import Footer from '@/components/barber/Footer';
import StickyButtons from '@/components/barber/StickyButtons';
import { TESTIMONIALS, IMAGES, BRAND } from '@/components/barber/data';

export default function ReviewsPage() {
  return (
    <SmoothScroll>
      <Navigation />
      <StickyButtons />
      <main className="min-h-screen bg-[#0a0a0a] text-foreground overflow-x-hidden">
        {/* Hero */}
        <section className="px-6 md:px-12 lg:px-20 pt-32 pb-6">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="font-mono text-[10px] tracking-[0.5em] text-orange/30 uppercase block mb-3">Müşteri Yorumları</span>
              <h1 className="heading-display text-[clamp(3rem,8vw,7rem)] text-orange-gradient mb-3">YORUMLAR</h1>
            </motion.div>
          </div>
        </section>

        {/* Google Badge */}
        <section className="px-6 md:px-12 lg:px-20 py-8">
          <div className="max-w-5xl mx-auto flex items-center gap-6 glass p-6">
            <div className="flex gap-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="text-orange fill-orange" size={20} />)}
            </div>
            <div>
              <p className="font-sans text-lg text-white/60">{BRAND.googleRating} Google Puanı</p>
              <p className="font-sans text-[11px] text-white/20">{BRAND.googleReviews} doğrulanmış yorum</p>
            </div>
            <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer" className="ml-auto text-[10px] text-orange/50 border border-orange/20 px-4 py-1.5 uppercase tracking-wider hover:text-orange hover:border-orange/40 transition-all">
              Google&apos;da Gör
            </a>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="px-6 md:px-12 lg:px-20 pb-20">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t, i) => {
              const img = IMAGES.testimonials[i % IMAGES.testimonials.length];
              return (
                <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="glass p-6 hover:border-orange/20 transition-all duration-500">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, si) => <Star key={si} className="text-orange fill-orange" size={11} />)}
                  </div>
                  <p className="font-serif italic text-white/40 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div className="h-px bg-gradient-to-r from-white/[0.06] via-orange/20 to-white/[0.06] mb-3" />
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full border border-orange/20 overflow-hidden">
                      <img src={img} alt={t.name} className="w-full h-full object-cover opacity-60" />
                    </div>
                    <div>
                      <p className="font-sans text-xs text-white/50">{t.name}</p>
                      <p className="font-sans text-[9px] text-white/15 uppercase tracking-wider">{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
        <Footer />
      </main>
    </SmoothScroll>
  );
}
