'use client';

import SmoothScroll from '@/components/barber/SmoothScroll';
import Navigation from '@/components/barber/Navigation';
import Footer from '@/components/barber/Footer';
import StickyButtons from '@/components/barber/StickyButtons';
import { motion } from 'framer-motion';
import { BRAND, IMAGES } from '@/components/barber/data';

const STATS = [
  { value: BRAND.googleReviews, label: 'Google Yorum' },
  { value: BRAND.googleRating, label: 'Yıldız Puanı' },
  { value: '7+', label: 'Yıllık Deneyim' },
  { value: '500+', label: 'Mutlu Müşteri' },
];

export default function AboutPage() {
  return (
    <SmoothScroll>
      <Navigation />
      <StickyButtons />
      <main className="min-h-screen bg-[#0a0a0a] text-foreground overflow-x-hidden">
        {/* Hero */}
        <section className="relative min-h-[60vh] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <img src={IMAGES.about} alt="" className="w-full h-full object-cover opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/70 to-[#0a0a0a]" />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 lg:px-20 py-32">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="font-mono text-[10px] tracking-[0.5em] text-orange/30 uppercase block mb-3">Hikayemiz</span>
              <h1 className="heading-display text-[clamp(3rem,8vw,7rem)] text-orange-gradient mb-4">HAKKIMIZDA</h1>
              <p className="font-sans text-sm text-white/25 tracking-wider max-w-lg">İstanbul Kartal&apos;da premium erkek kuaför deneyimi</p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-white/[0.04]">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4">
            {STATS.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="py-10 text-center border-r border-white/[0.04] last:border-0">
                <span className="block font-serif text-3xl text-orange-gradient mb-1">{s.value}</span>
                <span className="block font-sans text-[9px] tracking-[0.3em] text-white/15 uppercase">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6">
            <p className="font-sans text-sm text-white/30 leading-relaxed">
              Batuhan Taşcı Men&apos;s Hair, İstanbul Kartal&apos;da hizmet veren premium erkek kuaför atölyesidir. 2018 yılından bu yana müşterilerimize en üst düzey hizmet sunmaktan gurur duyuyoruz.
            </p>
            <p className="font-sans text-sm text-white/30 leading-relaxed">
              Felsefemiz basit: her müşteriye özel, kişiye odaklı bir deneyim sunmak. Modern kesim tekniklerini klasik berberlik geleneğiyle birleştirerek, her ziyareti unutulmaz kılmayı hedefliyoruz.
            </p>
            <p className="font-sans text-sm text-white/30 leading-relaxed">
              Atölyemizde kullandığımız tüm ürünler — Reuzel, Uppercut Deluxe, American Crew — premium kalitededir. Her detay, müşteri memnuniyeti için özenle seçilmiştir.
            </p>
          </motion.div>
        </section>

        {/* Image */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
          <div className="grid grid-cols-2 gap-2">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[3/4] overflow-hidden">
              <img src={IMAGES.hero} alt="Atölye" className="w-full h-full object-cover opacity-80" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[3/4] overflow-hidden mt-8">
              <img src={IMAGES.heroAlt} alt="Çalışma" className="w-full h-full object-cover opacity-80" />
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-16 border-t border-white/[0.04]">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <a href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Merhaba Batuhan, size danışmak istiyorum.')}`} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-orange text-background font-sans text-[10px] font-semibold tracking-[0.25em] uppercase btn-shine hover:shadow-orange transition-all">
              Randevu Al
            </a>
          </motion.div>
        </section>
        <Footer />
      </main>
    </SmoothScroll>
  );
}
