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
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, inView, duration]);
  return display;
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="services" className="relative overflow-hidden">
      {/* ── Service 1: Full-bleed image, text overlay bottom-left ── */}
      <ServiceFullBleed service={SERVICES[0]} index={0} />

      {/* ── Service 2: Full-bleed image, text overlay top-right ── */}
      <ServiceFullBleedReverse service={SERVICES[1]} index={1} />

      {/* ── Service 3: Cinematic banner, text overlay center ── */}
      <ServiceCinematic service={SERVICES[2]} index={2} />

      {/* ── Service 4: Giant full-bleed with centered overlay ── */}
      <ServiceGiantBanner service={SERVICES[3]} index={3} />
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   BLOCK 1: Full-bleed with text bottom-left
   ═══════════════════════════════════════════════════════ */
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
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Full-bleed image — edge to edge */}
      <motion.img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.2 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      {/* Text — small, gray, overlaid on image */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-12 md:px-16 md:pb-16 lg:px-24 lg:pb-20">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg"
        >
          <span className="font-mono text-[10px] tracking-[0.4em] text-white/20 uppercase block mb-3">
            0{index + 1}
          </span>
          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white/90 tracking-tight leading-tight mb-2">
            {service.title}
          </h3>
          <p className="font-sans text-[11px] tracking-[0.2em] text-white/30 uppercase mb-4">
            {service.subtitle}
          </p>
          <p className="font-sans text-xs text-white/40 leading-relaxed max-w-sm mb-6">
            {service.description}
          </p>
          <div className="flex items-center gap-6">
            <span className="font-serif text-2xl md:text-3xl text-gold-gradient">
              ${price}
            </span>
            <span className="font-sans text-[10px] tracking-[0.2em] text-white/25 border border-white/10 px-3 py-1">
              {service.duration}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   BLOCK 2: Full-bleed with text top-right
   ═══════════════════════════════════════════════════════ */
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
      transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.img
        src={service.image}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.2 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Gradient — heavy top-right */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-l from-black/40 to-transparent" />

      {/* Text — top-right, small gray */}
      <div className="absolute top-0 right-0 left-0 z-10 px-6 pt-12 md:px-16 md:pt-16 lg:px-24 lg:pt-20">
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-lg ml-auto text-right"
        >
          <span className="font-mono text-[10px] tracking-[0.4em] text-white/20 uppercase block mb-3">
            0{index + 1}
          </span>
          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white/90 tracking-tight leading-tight mb-2">
            {service.title}
          </h3>
          <p className="font-sans text-[11px] tracking-[0.2em] text-white/30 uppercase mb-4">
            {service.subtitle}
          </p>
          <p className="font-sans text-xs text-white/40 leading-relaxed max-w-sm ml-auto mb-6">
            {service.description}
          </p>
          <div className="flex items-center justify-end gap-6">
            <span className="font-sans text-[10px] tracking-[0.2em] text-white/25 border border-white/10 px-3 py-1">
              {service.duration}
            </span>
            <span className="font-serif text-2xl md:text-3xl text-gold-gradient">
              ${price}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   BLOCK 3: Cinematic 21:9 letterbox with text overlay
   ═══════════════════════════════════════════════════════ */
function ServiceCinematic({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const price = usePriceCounter(Number(service.price), isInView);

  return (
    <motion.div
      ref={ref}
      className="relative w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 1 }}
    >
      {/* Ultra-wide letterbox frame */}
      <div className="relative mx-4 md:mx-12 lg:mx-20 my-8 md:my-12">
        {/* Top & bottom black bars */}
        <div className="absolute top-0 left-0 right-0 h-[15%] bg-[#0a0a0a] z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-[15%] bg-[#0a0a0a] z-10" />

        {/* Image container with 21:9 aspect */}
        <div className="relative aspect-[21/9] overflow-hidden">
          <motion.img
            src={service.image}
            alt={service.title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.15 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        </div>

        {/* Overlay text — center */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <span className="font-mono text-[10px] tracking-[0.4em] text-white/20 uppercase block mb-2">
              0{index + 1}
            </span>
            <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl text-white/90 tracking-tight mb-1">
              {service.title}
            </h3>
            <p className="font-sans text-[10px] tracking-[0.25em] text-white/30 uppercase mb-3">
              {service.subtitle}
            </p>
            <p className="font-sans text-[11px] text-white/35 leading-relaxed max-w-md mx-auto mb-5">
              {service.description}
            </p>
            <div className="flex items-center justify-center gap-6">
              <span className="font-serif text-xl md:text-2xl text-gold-gradient">${price}</span>
              <div className="h-4 w-px bg-white/10" />
              <span className="font-sans text-[10px] tracking-[0.2em] text-white/25">{service.duration}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   BLOCK 4: Giant full-viewport with dramatic centered text
   ═══════════════════════════════════════════════════════ */
function ServiceGiantBanner({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const price = usePriceCounter(Number(service.price), isInView, 1500);

  return (
    <motion.div
      ref={ref}
      className="relative w-full h-screen overflow-hidden"
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
        transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Heavy vignette */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/70" />

      {/* MOST POPULAR badge */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6"
        >
          <span className="font-sans text-[9px] tracking-[0.5em] text-black/80 bg-gold-gradient px-5 py-1.5">
            MOST POPULAR
          </span>
        </motion.div>

        <motion.span
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-mono text-[10px] tracking-[0.4em] text-white/20 uppercase mb-3"
        >
          0{index + 1}
        </motion.span>

        <motion.h3
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="heading-display text-[clamp(2rem,6vw,6rem)] text-gold-gradient mb-2"
        >
          {service.title}
        </motion.h3>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-sans text-[10px] tracking-[0.3em] text-white/30 uppercase mb-3"
        >
          {service.subtitle}
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="font-sans text-[11px] text-white/30 leading-relaxed max-w-sm text-center mb-8"
        >
          {service.description}
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex items-center gap-8"
        >
          <div className="flex flex-col items-center">
            <span className="font-sans text-[9px] tracking-[0.4em] text-white/20 uppercase">FROM</span>
            <span className="font-serif text-4xl md:text-5xl lg:text-6xl text-gold-gradient leading-none">
              ${price}
            </span>
          </div>
          <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          <div className="flex flex-col items-center">
            <span className="font-sans text-[9px] tracking-[0.4em] text-white/20 uppercase">Duration</span>
            <span className="font-serif text-xl md:text-2xl text-white/70 leading-none">{service.duration}</span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.a
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
          href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Hello NOIR BARBER, I would like to book an appointment.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block border border-white/15 bg-white/[0.06] px-8 py-3 text-[10px] font-medium uppercase tracking-[0.3em] text-white/60 hover:text-gold hover:border-gold/30 transition-all duration-500"
        >
          Book via WhatsApp
        </motion.a>
      </div>
    </motion.div>
  );
}
