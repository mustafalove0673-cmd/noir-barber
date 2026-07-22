'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES, BRAND } from './data';
import { RiArrowRightLine } from 'react-icons/ri';

gsap.registerPlugin(ScrollTrigger);

/* ─── Price Counter Hook ─── */
function usePriceCounter(target: number, inView: boolean, duration = 1200) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, inView, duration]);

  return display;
}

/* ─── Animated Gold Line ─── */
function GoldLine() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
        },
      }
    );
  }, []);

  return (
    <div ref={ref} className="h-px w-full max-w-xs origin-left bg-gradient-to-r from-[#c9a96e] via-[#d4af37] to-transparent" />
  );
}

/* ─── Service 1: Signature Cut — Full Width Feature ─── */
function ServiceBlock1() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const price = usePriceCounter(85, isInView);
  const service = SERVICES[0];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="relative grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-0 mb-20 lg:mb-32"
    >
      {/* Image — 60% left, slight overflow */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative lg:col-span-3 -ml-4 sm:ml-0"
      >
        <div className="relative img-zoom light-reflection aspect-[4/5] lg:aspect-[16/10] lg:-mr-16">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          {/* Gold gradient edge overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#0a0a0a]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-transparent" />
          </div>
        </div>
      </motion.div>

      {/* Content — right */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative lg:col-span-2 flex flex-col justify-center lg:pl-8 z-10 py-8 lg:py-0"
      >
        <span className="font-sans text-xs tracking-[0.3em] text-[#c9a96e] mb-4">01</span>
        <h3 className="heading-editorial text-3xl sm:text-4xl lg:text-5xl text-[#f5f0e8] mb-2">
          {service.title}
        </h3>
        <p className="font-sans text-sm tracking-widest text-[#c9a96e]/70 uppercase mb-6">
          {service.subtitle}
        </p>
        <p className="font-sans text-sm text-[#888888] leading-relaxed mb-8 max-w-md">
          {service.description}
        </p>
        <div className="flex items-end gap-6">
          <div>
            <span className="font-serif text-4xl lg:text-5xl text-gold-gradient">
              ${price}
            </span>
          </div>
          <span className="font-sans text-xs tracking-[0.2em] text-[#888888] border border-[#888888]/30 px-3 py-1">
            {service.duration}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Service 2: Royal Shave — Reversed Editorial ─── */
function ServiceBlock2() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const price = usePriceCounter(65, isInView);
  const service = SERVICES[1];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="relative grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-0 mb-20 lg:mb-32"
    >
      {/* Content — left */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative lg:col-span-2 flex flex-col justify-center lg:pr-8 z-10 order-2 lg:order-1 py-8 lg:py-0"
      >
        <span className="font-sans text-xs tracking-[0.3em] text-[#c9a96e] mb-4">02</span>
        <h3 className="heading-editorial text-3xl sm:text-4xl lg:text-5xl text-[#f5f0e8] mb-2">
          {service.title}
        </h3>
        <p className="font-sans text-sm tracking-widest text-[#c9a96e]/70 uppercase mb-6">
          {service.subtitle}
        </p>
        <p className="font-sans text-sm text-[#888888] leading-relaxed mb-8 max-w-md">
          {service.description}
        </p>
        <div className="flex items-end gap-6">
          <div>
            <span className="font-serif text-4xl lg:text-5xl text-gold-gradient">
              ${price}
            </span>
          </div>
          <span className="font-sans text-xs tracking-[0.2em] text-[#888888] border border-[#888888]/30 px-3 py-1">
            {service.duration}
          </span>
        </div>
      </motion.div>

      {/* Image — right, rotated with clip-path & gold border frame */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative lg:col-span-3 lg:-ml-16 order-1 lg:order-2"
      >
        <div className="relative -mr-4 sm:mr-0">
          {/* Decorative gold border frame */}
          <div className="absolute -inset-3 border border-[#c9a96e]/30 rotate-1 lg:rotate-2 transition-all duration-500 hover:border-[#c9a96e]/60" />
          <div
            className="relative img-zoom light-reflection aspect-[4/5] lg:aspect-[16/10] rotate-1 lg:rotate-2 transition-transform duration-700 hover:rotate-0"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)' }}
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 via-transparent to-transparent" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Service 3: Beard Sculpture — Overlapping Cards ─── */
function ServiceBlock3() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const price = usePriceCounter(55, isInView);
  const service = SERVICES[2];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="relative mb-20 lg:mb-32"
    >
      {/* Background image with offset */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative w-full aspect-[16/9] lg:aspect-[21/9] img-zoom light-reflection translate-y-8"
      >
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0a0a0a]/50" />
      </motion.div>

      {/* Glass card overlapping the image */}
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute bottom-0 left-4 sm:left-8 lg:left-16 right-4 sm:right-8 lg:right-24 lg:bottom-[-60px]"
      >
        <div className="glass-strong p-6 sm:p-8 lg:p-10 relative overflow-hidden">
          {/* Large watermark number */}
          <span className="absolute -right-4 -bottom-8 font-serif text-[10rem] lg:text-[14rem] text-[#c9a96e]/[0.04] leading-none select-none pointer-events-none">
            03
          </span>

          <div className="relative z-10">
            <span className="font-sans text-xs tracking-[0.3em] text-[#c9a96e] mb-3 block">03</span>
            <h3 className="heading-editorial text-2xl sm:text-3xl lg:text-4xl text-[#f5f0e8] mb-1">
              {service.title}
            </h3>
            <p className="font-sans text-sm tracking-widest text-[#c9a96e]/70 uppercase mb-4">
              {service.subtitle}
            </p>
            <p className="font-sans text-sm text-[#888888] leading-relaxed mb-6 max-w-lg">
              {service.description}
            </p>
            <div className="flex items-center gap-6">
              <span className="font-serif text-3xl lg:text-4xl text-gold-gradient">
                ${price}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#c9a96e]/30 to-transparent" />
              <span className="font-sans text-xs tracking-[0.2em] text-[#888888]">
                {service.duration}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Service 4: Gentleman's Ritual — Cinematic Banner ─── */
function ServiceBlock4() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const price = usePriceCounter(165, isInView, 1600);
  const service = SERVICES[3];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="relative mb-20 lg:mb-32"
    >
      <div className="relative overflow-hidden letterbox">
        {/* Background image */}
        <motion.div
          initial={{ scale: 1.15 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 img-zoom"
        >
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0a0a0a]/70" />
        </motion.div>

        {/* Centered content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24 sm:py-32 lg:py-40">
          {/* MOST POPULAR badge */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="inline-block font-sans text-[10px] sm:text-xs tracking-[0.4em] text-[#0a0a0a] bg-gradient-to-r from-[#c9a96e] via-[#d4af37] to-[#c9a96e] px-6 py-2 mb-8">
              MOST POPULAR
            </span>
          </motion.div>

          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="font-sans text-xs tracking-[0.3em] text-[#c9a96e] mb-4"
          >
            04
          </motion.span>

          <motion.h3
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="heading-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gold-gradient mb-4"
          >
            {service.title}
          </motion.h3>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="font-sans text-sm tracking-widest text-[#c9a96e]/70 uppercase mb-6"
          >
            {service.subtitle}
          </motion.p>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="font-sans text-sm sm:text-base text-[#888888] leading-relaxed max-w-xl mb-10"
          >
            {service.description}
          </motion.p>

          {/* Premium pricing display */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex items-center gap-8"
          >
            <div className="flex flex-col items-center">
              <span className="font-sans text-[10px] tracking-[0.3em] text-[#888888] mb-1">FROM</span>
              <span className="font-serif text-5xl sm:text-6xl lg:text-7xl text-gold-gradient leading-none">
                ${price}
              </span>
            </div>
            <div className="h-12 w-px bg-gradient-to-b from-transparent via-[#c9a96e]/40 to-transparent" />
            <div className="flex flex-col items-center">
              <span className="font-sans text-[10px] tracking-[0.3em] text-[#888888] mb-1">DURATION</span>
              <span className="font-serif text-2xl sm:text-3xl text-[#f5f0e8] leading-none">
                {service.duration}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Booking CTA ─── */
function BookingCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const whatsappUrl = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
    'Hello NOIR BARBER — I would like to book an appointment.'
  )}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="text-center"
    >
      {/* Divider text */}
      <div className="flex items-center gap-6 mb-16">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#c9a96e]/30" />
        <span className="font-sans text-[10px] sm:text-xs tracking-[0.5em] text-[#c9a96e]/60 uppercase">
          Hall of Craft
        </span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#c9a96e]/30" />
      </div>

      <h3 className="heading-editorial text-2xl sm:text-3xl lg:text-4xl text-[#f5f0e8] mb-4">
        Ready to experience the difference?
      </h3>
      <p className="font-sans text-sm text-[#888888] mb-10 max-w-md mx-auto">
        Book your appointment and step into a world where grooming becomes artistry.
      </p>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 bg-gradient-to-r from-[#c9a96e] via-[#d4af37] to-[#c9a96e] text-[#0a0a0a] font-sans text-sm tracking-widest uppercase px-8 py-4 btn-shine shadow-gold hover:shadow-glow transition-shadow duration-500 group"
      >
        Book via WhatsApp
        <RiArrowRightLine className="text-lg transition-transform duration-300 group-hover:translate-x-1" />
      </a>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN SECTION EXPORT
   ═══════════════════════════════════════════════════════ */
export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // GSAP scroll-triggered gold line width animation for the section header
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.service-hover-line').forEach((el) => {
        gsap.to(el, {
          width: '100%',
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el.parentElement,
            start: 'top 90%',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header (left-aligned, editorial) ── */}
        <div className="mb-20 lg:mb-28">
          <span className="font-sans text-xs tracking-[0.4em] text-[#c9a96e] block mb-4">
            01
          </span>
          <h2 className="heading-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-gold-gradient mb-6">
            OUR CRAFT
          </h2>
          <GoldLine />
          <p className="font-sans text-sm sm:text-base text-[#888888] leading-relaxed mt-8 max-w-lg">
            Every service is a ritual — a meticulous process where precision meets artistry.
          </p>
        </div>

        {/* ── Service Blocks ── */}
        <ServiceBlock1 />
        <ServiceBlock2 />
        <div className="mt-32 lg:mt-48"> {/* extra space for overlapping card */}
          <ServiceBlock3 />
        </div>
        <ServiceBlock4 />

        {/* ── Booking CTA ── */}
        <BookingCTA />
      </div>
    </section>
  );
}
