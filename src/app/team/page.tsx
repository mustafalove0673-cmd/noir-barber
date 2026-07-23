'use client';

import SmoothScroll from '@/components/barber/SmoothScroll';
import Navigation from '@/components/barber/Navigation';
import Footer from '@/components/barber/Footer';
import StickyButtons from '@/components/barber/StickyButtons';
import { motion } from 'framer-motion';
import { Star, Scissors, Palette, Award, Clock, Gem, Shield, Zap } from 'lucide-react';
import { BRAND, IMAGES } from '@/components/barber/data';

const SKILLS = [
  { name: 'Fade & Taper', level: 98 },
  { name: 'Sakal Şekillendirme', level: 95 },
  { name: 'Klasik Tıraş', level: 92 },
  { name: 'Renk & Karışım', level: 88 },
  { name: 'Saç Derisi Tedavisi', level: 90 },
  { name: 'Modern Stiller', level: 96 },
];

const EXPERTISE = [
  { icon: Scissors, title: 'Kesim Ustası', desc: 'Her saç tipine uygun özel kesim teknikleri' },
  { icon: Palette, title: 'Renk Sanatçısı', desc: 'Doğal ve algılanamaz renk karıştırma' },
  { icon: Gem, title: 'Premium Bakım', desc: 'Luxury ürünlerle derin bakım ritüeli' },
  { icon: Zap, title: 'Hızlı & Hassas', desc: 'Zamanında, kusursuz sonuç garantisi' },
];

const AWARDS = [
  { year: '2024', title: 'Google 5.0 Yıldız', desc: '350+ doğrulanmış müşteri yorumu', icon: Star },
  { year: '2023', title: 'En İyi Berber — Kartal', desc: 'Yerel topluluk ödülü', icon: Award },
  { year: '2022', title: 'Premium Atölye', desc: 'Luxury grooming sertifikası', icon: Shield },
  { year: '2020', title: 'Usta Berber', desc: '7+ yıllık profesyonel deneyim', icon: Clock },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex justify-between mb-1.5">
        <span className="font-sans text-[11px] text-white/40 tracking-wider">{name}</span>
        <span className="font-mono text-[10px] text-orange/60">{level}%</span>
      </div>
      <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-gradient-to-r from-orange/80 to-orange rounded-full"
        />
      </div>
    </motion.div>
  );
}

export default function TeamPage() {
  return (
    <SmoothScroll>
      <Navigation />
      <StickyButtons />
      <main className="min-h-screen bg-[#0a0a0a] text-foreground overflow-x-hidden">
        {/* Hero */}
        <section className="relative min-h-[70vh] md:min-h-[80vh] overflow-hidden">
          <div className="absolute inset-0">
            <img src={IMAGES.about} alt="" className="w-full h-full object-cover opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]/30" />
            <div className="absolute inset-0 pattern-stripes" />
          </div>
          <div className="relative z-10 min-h-[70vh] md:min-h-[80vh] flex items-center">
            <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Photo */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative aspect-[3/4] max-w-sm overflow-hidden border border-white/[0.06]" style={{ clipPath: 'polygon(3% 0%, 100% 0%, 97% 100%, 0% 100%)' }}>
                  <img src={IMAGES.hero} alt="Batuhan Taşcı" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="text-orange text-xs">★</span>
                    <span className="font-sans text-[10px] text-white/40">{BRAND.googleRating} Google Puanı</span>
                  </div>
                </div>
              </motion.div>

              {/* Bio */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="font-mono text-[10px] tracking-[0.5em] text-orange/30 uppercase block mb-3">HAIR ARTIST</span>
                <h1 className="heading-display text-[clamp(3rem,8vw,7rem)] text-orange-gradient leading-none mb-2">BATUHAN</h1>
                <h2 className="font-serif text-[clamp(1.5rem,4vw,3rem)] text-white/60 tracking-wide mb-4">TAŞCI</h2>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 60 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="h-px bg-orange/30 mb-6"
                />
                <p className="font-sans text-sm text-white/35 leading-relaxed mb-4">
                  İstanbul Kartal&apos;da bulunan premium erkek kuaför atölyesinin kurucusu ve saç sanatçısı. Hassasiyet, yaratıcılık ve müşteri memnuniyeti odaklı yaklaşımıyla tanınır.
                </p>
                <p className="font-sans text-sm text-white/35 leading-relaxed mb-8">
                  7 yılı aşkın deneyimi ile her müşteriye özel bir deneyim sunar. Modern kesim teknikleri, klasik tıraş ritüelleri ve premium bakım hizmetleriyle mükemmelliği hedefler.
                </p>
                <div className="flex gap-3">
                  <a
                    href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Merhaba Batuhan, randevu almak istiyorum.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-orange text-background font-sans text-[10px] font-semibold tracking-[0.25em] uppercase btn-shine hover:shadow-orange transition-all"
                  >
                    Randevu Al
                  </a>
                  <a
                    href={BRAND.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 border border-white/12 text-white/50 font-sans text-[10px] font-semibold tracking-[0.25em] uppercase hover:text-orange hover:border-orange/30 transition-all"
                  >
                    Instagram
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-16 md:py-24 border-t border-white/[0.04]">
          <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="font-mono text-[10px] tracking-[0.4em] text-white/10 uppercase block mb-2">Yetkinlikler</span>
              <h2 className="heading-display text-2xl md:text-3xl text-orange-gradient">UZMANLIK ALANLARI</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {SKILLS.map((skill, i) => (
                <SkillBar key={skill.name} {...skill} delay={i * 0.08} />
              ))}
            </div>
          </div>
        </section>

        {/* Expertise Cards */}
        <section className="py-16 md:py-24 border-t border-white/[0.04]">
          <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="font-mono text-[10px] tracking-[0.4em] text-white/10 uppercase block mb-2">Neler Sunuyoruz</span>
              <h2 className="heading-display text-2xl md:text-3xl text-orange-gradient">ÖZEL HİZMETLER</h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {EXPERTISE.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glass p-6 hover:border-orange/20 transition-all duration-500 group"
                >
                  <item.icon className="w-5 h-5 text-orange/40 group-hover:text-orange/70 transition-colors mb-4" />
                  <h3 className="font-sans text-sm text-white/60 tracking-wide mb-2">{item.title}</h3>
                  <p className="font-sans text-[11px] text-white/25 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Awards */}
        <section className="py-16 md:py-24 border-t border-white/[0.04]">
          <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <span className="font-mono text-[10px] tracking-[0.4em] text-white/10 uppercase block mb-2">Başarılar</span>
              <h2 className="heading-display text-2xl md:text-3xl text-orange-gradient">ÖDÜLLER & SERTİFİKALAR</h2>
            </motion.div>
            <div className="space-y-0">
              {AWARDS.map((award, i) => (
                <motion.div
                  key={award.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-center gap-6 py-6 border-t border-white/[0.04] group"
                >
                  <span className="font-mono text-[10px] text-orange/40 w-12 flex-shrink-0">{award.year}</span>
                  <award.icon className="w-4 h-4 text-orange/30 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-sans text-sm text-white/50 group-hover:text-white/70 transition-colors">{award.title}</h3>
                    <p className="font-sans text-[10px] text-white/20 mt-0.5">{award.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
