'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES, BRAND } from './data';

gsap.registerPlugin(ScrollTrigger);

function usePriceCounter(target: number, inView: boolean, duration = 1000) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setDisplay(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, inView, duration]);
  return display;
}

export default function ServicesSection() {
  return (
    <section id="services" className="relative overflow-hidden">
      <ServiceFullBleed service={SERVICES[0]} index={0} />
      <ServiceFullBleedReverse service={SERVICES[1]} index={1} />
      <ServiceCinematic service={SERVICES[2]} index={2} />
      <ServiceGiantBanner service={SERVICES[3]} index={3} />
    </section>
  );
}

/* Full-bleed image, text overlay bottom-left */
function ServiceFullBleed({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const price = usePriceCounter(Number(service.price), isInView);

  return (
    <motion.div
      ref={ref}
      className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
    >
      <motion.img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.2 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-12 md:px-16 md:pb-16 lg:px-24 lg:pb-20">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg"
        >
          <span className="font-mono text-[10px] tracking-[0.4em] text-white/15 uppercase block mb-3">0{index + 1}</span>
          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white/85 tracking-tight leading-tight mb-2">{service.title}</h3>
          <p className="font-sans text-[11px] tracking-[0.2em] text-white/25 uppercase mb-4">{service.subtitle}</p>
          <p className="font-sans text-xs text-white/35 leading-relaxed max-w-sm mb-6">{service.description}</p>
          <div className="flex items-center gap-6">
            <span className="font-serif text-2xl md:text-3xl text-gold-gradient">${price}</span>
            <span className="font-sans text-[10px] tracking-[0.2em] text-white/20 border border-white/[0.06] px-3 py-1">{service.duration}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* Full-bleed with text top-right */
function ServiceFullBleedReverse({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const price = usePriceCounter(Number(service.price), isInView);

  return (
    <motion.div
      ref={ref}
      className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
    >
      <motion.img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.2 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />

      <div className="absolute top-0 right-0 left-0 z-10 px-6 pt-12 md:px-16 md:pt-16 lg:px-24 lg:pt-20">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg ml-auto text-right"
        >
          <span className="font-mono text-[10px] tracking-[0.4em] text-white/15 uppercase block mb-3">0{index + 1}</span>
          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white/85 tracking-tight leading-tight mb-2">{service.title}</h3>
          <p className="font-sans text-[11px] tracking-[0.2em] text-white/25 uppercase mb-4">{service.subtitle}</p>
          <p className="font-sans text-xs text-white/35 leading-relaxed max-w-sm ml-auto mb-6">{service.description}</p>
          <div className="flex items-center justify-end gap-6">
            <span className="font-sans text-[10px] tracking-[0.2em] text-white/20 border border-white/[0.06] px-3 py-1">{service.duration}</span>
            <span className="font-serif text-2xl md:text-3xl text-gold-gradient">${price}</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* Cinematic 21:9 letterbox */
function ServiceCinematic({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const price = usePriceCounter(Number(service.price), isInView);

  return (
    <motion.div ref={ref} className="relative w-full overflow-hidden" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 1 }}>
      <div className="relative mx-4 md:mx-12 lg:mx-20 my-8 md:my-12">
        <div className="absolute top-0 left-0 right-0 h-[15%] bg-[#0a0a0a] z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-[#0a0a0a] z-10" />
        <div className="relative aspect-[21/9] overflow-hidden">
          <motion.img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.15 }} animate={isInView ? { scale: 1 } : {}} transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }} />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-center px-8">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="text-center">
            <span className="font-mono text-[10px] tracking-[0.4em] text-white/15 uppercase block mb-2">0{index + 1}</span>
            <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl text-white/85 tracking-tight mb-1">{service.title}</h3>
            <p className="font-sans text-[10px] tracking-[0.25em] text-white/25 uppercase mb-3">{service.subtitle}</p>
            <p className="font-sans text-[11px] text-white/30 leading-relaxed max-w-md mx-auto mb-5">{service.description}</p>
            <div className="flex items-center justify-center gap-6">
              <span className="font-serif text-xl md:text-2xl text-gold-gradient">${price}</span>
              <div className="h-4 w-px bg-white/[0.06]" />
              <span className="font-sans text-[10px] tracking-[0.2em] text-white/20">{service.duration}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* Giant full-viewport banner */
function ServiceGiantBanner({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const price = usePriceCounter(Number(service.price), isInView, 1500);

  return (
    <motion.div ref={ref} className="relative w-full h-screen overflow-hidden" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 1 }}>
      <motion.img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.2 }} animate={isInView ? { scale: 1 } : {}} transition={{ duration: 2 }} />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70" />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6">
        <motion.div initial={{ y: 20, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.4 }}>
          <span className="font-sans text-[9px] tracking-[0.5em] text-black/80 bg-gold-gradient px-5 py-1.5">EN POPÜLER</span>
        </motion.div>
        <motion.span initial={{ y: 20, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.5 }}
          className="font-mono text-[10px] tracking-[0.4em] text-white/15 uppercase mt-6 mb-3">0{index + 1}</motion.span>
        <motion.h3 initial={{ y: 30, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="heading-display text-[clamp(2rem,6vw,6rem)] text-gold-gradient mb-2">{service.title}</motion.h3>
        <motion.p initial={{ y: 20, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.7 }}
          className="font-sans text-[10px] tracking-[0.3em] text-white/25 uppercase mb-3">{service.subtitle}</motion.p>
        <motion.p initial={{ y: 20, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.8 }}
          className="font-sans text-[11px] text-white/25 leading-relaxed max-w-sm text-center mb-8">{service.description}</motion.p>
        <motion.div initial={{ y: 20, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center gap-8">
          <div className="flex flex-col items-center">
            <span className="font-sans text-[9px] tracking-[0.4em] text-white/15 uppercase">Başlangıç</span>
            <span className="font-serif text-4xl md:text-5xl lg:text-6xl text-gold-gradient leading-none">${price}</span>
          </div>
          <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />
          <div className="flex flex-col items-center">
            <span className="font-sans text-[9px] tracking-[0.4em] text-white/15 uppercase">Süre</span>
            <span className="font-serif text-xl md:text-2xl text-white/60 leading-none">{service.duration}</span>
          </div>
        </motion.div>
        <motion.a initial={{ y: 20, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.6, delay: 1.1 }}
          href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Merhaba NOIR BARBER, randevu almak istiyorum.')}`}
          target="_blank" rel="noopener noreferrer"
          className="mt-10 inline-block border border-white/15 bg-white/[0.06] px-8 py-3 text-[10px] font-medium uppercase tracking-[0.3em] text-white/50 hover:text-gold hover:border-gold/30 transition-all duration-500">
          WhatsApp ile Randevu Al
        </motion.a>
      </div>
    </motion.div>
  );
}
