'use client';

import SmoothScroll from '@/components/barber/SmoothScroll';
import Navigation from '@/components/barber/Navigation';
import Footer from '@/components/barber/Footer';
import StickyButtons from '@/components/barber/StickyButtons';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { BRAND, IMAGES } from '@/components/barber/data';

const STEPS = [
  {
    num: '01',
    title: 'GELİŞ',
    subtitle: 'Hoş Geldiniz',
    desc: 'Kartal\'daki atölyemize adım attığınız anda, günlük hayatın stresinden uzaklaşırsınız. Sıcak bir karşılama ve özel ilgiyle misafir edilirsiniz.',
    image: IMAGES.hero,
  },
  {
    num: '02',
    title: 'DANIŞMA',
    subtitle: 'Stil Analizi',
    desc: 'Yüz yapınızı, saç dokunuzu, yaşam tarzınızı ve tercihlerinizi detaylıca analiz ederiz. Birlikte size en uygun stili belirleriz.',
    image: IMAGES.services.signatureCut,
  },
  {
    num: '03',
    title: 'UZMANLIK',
    subtitle: 'Kesim & Tıraş',
    desc: 'Cerrahi hassasiyetle çalışırız. Her çizgi, her açı hesaplanmıştır. Premium aletler ve ürünlerle mükemmelliğe ulaşırız.',
    image: IMAGES.services.royalShave,
  },
  {
    num: '04',
    title: 'STYLING',
    subtitle: 'Son Dokunuşlar',
    desc: 'Saçınıza şekil verip, sakalınızı detaylandırıp, tarzınızı tamamlayan son dokunuşları yaparız. Mükemmelliğe dikkat ederiz.',
    image: IMAGES.services.grooming,
  },
  {
    num: '05',
    title: 'KONTROL',
    subtitle: 'Memnuniyet Garantisi',
    desc: 'Aynada kendinize baktığınızda %100 memnuniyet hissedene kadar çalışırız. Son kontrol, son ince ayar — Batuhan Taşcı standardı.',
    image: IMAGES.heroAlt,
  },
];

function StepSection({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const isEven = index % 2 === 0;

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        <motion.img
          src={step.image}
          alt={step.title}
          className="w-full h-full object-cover opacity-10"
          style={{ y: imgY }}
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/85" />
        <div className="absolute inset-0 pattern-dots" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className={`max-w-6xl mx-auto px-6 md:px-12 lg:px-20 w-full ${isEven ? '' : ''}`}>
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isEven ? '' : 'lg:direction-rtl'}`}>
            {/* Number + Title Side */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={isEven ? '' : 'lg:order-2'}
            >
              <span className="font-mono text-[clamp(3rem,8vw,6rem)] text-orange/10 block leading-none mb-2">{step.num}</span>
              <h2 className="heading-display text-[clamp(2.5rem,6vw,5rem)] text-orange-gradient leading-none mb-2">{step.title}</h2>
              <p className="font-sans text-[11px] tracking-[0.3em] text-white/20 uppercase mb-6">{step.subtitle}</p>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 60 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className={`h-px bg-orange/30 mb-6 ${isEven ? '' : 'lg:ml-auto'}`}
              />
              <p className="font-sans text-sm text-white/35 leading-relaxed max-w-md">{step.desc}</p>
            </motion.div>

            {/* Visual Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`${isEven ? '' : 'lg:order-1'}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden border border-white/[0.06]" style={{ clipPath: 'polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%)' }}>
                <img src={step.image} alt={step.title} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className="font-mono text-[10px] tracking-[0.4em] text-white/15 uppercase">Adım {step.num}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Side Progress */}
      <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2">
        {STEPS.map((s, i) => (
          <a
            key={s.num}
            href={`#step-${s.num}`}
            className="group flex items-center gap-2"
          >
            <span className={`font-mono text-[9px] tracking-wider transition-colors duration-300 ${i === index ? 'text-orange' : 'text-white/10 group-hover:text-white/25'}`}>
              {s.num}
            </span>
            <div className={`w-6 h-px transition-all duration-300 ${i === index ? 'bg-orange' : 'bg-white/[0.06]'}`} />
          </a>
        ))}
      </div>
    </section>
  );
}

export default function ExperiencePage() {
  return (
    <SmoothScroll>
      <Navigation />
      <StickyButtons />
      <main className="min-h-screen bg-[#0a0a0a] text-foreground overflow-x-hidden">
        {/* Hero */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 pattern-stripes" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center px-6 relative z-10"
          >
            <span className="font-mono text-[10px] tracking-[0.5em] text-orange/30 uppercase block mb-3">BATUHAN TAŞCI</span>
            <h1 className="heading-display text-[clamp(2.5rem,8vw,7rem)] text-orange-gradient mb-3">DENEYİM</h1>
            <p className="font-sans text-[11px] text-white/20 tracking-[0.3em] uppercase">Mükemmel bir saç deneyiminin 5 adımı</p>
          </motion.div>
        </section>

        {/* Steps */}
        {STEPS.map((step, i) => (
          <div key={step.num} id={`step-${step.num}`}>
            <StepSection step={step} index={i} />
          </div>
        ))}

        {/* CTA */}
        <section className="relative py-20 border-t border-white/[0.04]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center px-6"
          >
            <p className="font-serif text-lg text-orange-gradient/50 mb-6">&ldquo;Deneyimlemeye hazır mısınız?&rdquo;</p>
            <a
              href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Merhaba Batuhan, deneyiminizi yaşamak istiyorum. Randevu alabilir miyim?')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 bg-orange text-background font-sans text-[10px] font-semibold tracking-[0.25em] uppercase btn-shine hover:shadow-orange transition-all"
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
