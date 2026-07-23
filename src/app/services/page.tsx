'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SmoothScroll from '@/components/barber/SmoothScroll';
import Navigation from '@/components/barber/Navigation';
import Footer from '@/components/barber/Footer';
import StickyButtons from '@/components/barber/StickyButtons';
import { ALL_SERVICES, BRAND } from '@/components/barber/data';

const cats = [
  { key: 'all', label: 'Tümü' },
  { key: 'cut', label: 'Kesim' },
  { key: 'shave', label: 'Tıraş' },
  { key: 'care', label: 'Bakım' },
  { key: 'special', label: 'Özel' },
];

function getCat(id: number) {
  if (id <= 1 || id === 6) return 'cut';
  if (id === 2) return 'shave';
  if (id === 3 || id === 5) return 'care';
  return 'special';
}

export default function ServicesPage() {
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? ALL_SERVICES : ALL_SERVICES.filter(s => getCat(s.id) === active);

  return (
    <SmoothScroll>
      <Navigation />
      <StickyButtons />
      <main className="min-h-screen bg-[#0a0a0a] text-foreground overflow-x-hidden">
        {/* Hero */}
        <section className="px-6 md:px-12 lg:px-20 pt-32 pb-10">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="font-mono text-[10px] tracking-[0.5em] text-orange/30 uppercase block mb-3">Ne Sunuyoruz</span>
              <h1 className="heading-display text-[clamp(3rem,8vw,7rem)] text-orange-gradient mb-3">HİZMETLER</h1>
              <p className="font-sans text-sm text-white/20 tracking-wider max-w-md">Premium erkek bakım deneyimi</p>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <section className="px-6 md:px-12 lg:px-20 mb-10">
          <div className="max-w-5xl mx-auto flex flex-wrap gap-2">
            {cats.map(cat => (
              <button key={cat.key} onClick={() => setActive(cat.key)} className={`relative px-5 py-2 rounded-full text-[11px] uppercase tracking-[0.15em] font-medium transition-all duration-300 ${active === cat.key ? 'text-background' : 'text-white/40 hover:text-white/60'}`}>
                {active === cat.key && <motion.span layoutId="svcFilter" className="absolute inset-0 rounded-full bg-orange" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Grid */}
        <section className="px-6 md:px-12 lg:px-20 pb-20">
          <div className="max-w-5xl mx-auto space-y-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((s, i) => (
                <motion.div key={s.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4, delay: i * 0.05 }} className="glass p-6 group hover:border-orange/20 transition-all duration-500">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <img src={s.image} alt={s.title} className="w-20 h-20 md:w-24 md:h-24 object-cover border border-white/[0.06]" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] text-orange/20">{String(s.id).padStart(2, '0')}</span>
                        <h3 className="font-serif text-lg text-white/70">{s.title}</h3>
                      </div>
                      <p className="font-sans text-[10px] text-orange/30 uppercase tracking-wider mb-2">{s.subtitle}</p>
                      <p className="font-sans text-[12px] text-white/20 leading-relaxed mb-4">{s.description}</p>
                      <div className="flex items-center gap-4">
                        <span className="font-serif text-xl text-orange-gradient">₺{s.price}</span>
                        <span className="font-mono text-[10px] text-white/15 border border-white/[0.06] px-2 py-0.5">{s.duration}</span>
                        <a href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Merhaba, ${s.title} için randevu almak istiyorum.`)}`} target="_blank" rel="noopener noreferrer" className="ml-auto text-[10px] text-orange/50 hover:text-orange border border-orange/20 px-4 py-1.5 uppercase tracking-wider transition-all">
                          Randevu
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
        <Footer />
      </main>
    </SmoothScroll>
  );
}
