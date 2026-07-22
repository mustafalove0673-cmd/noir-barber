'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from './data';
import { RiArrowRightUpLine } from 'react-icons/ri';

gsap.registerPlugin(ScrollTrigger);

/* ─── Layout Config for Each Image ─── */
interface GalleryItem {
  src: string;
  alt: string;
  colSpan: number;
  rowSpan: number;
}

const GALLERY_LAYOUT: GalleryItem[] = [
  { ...IMAGES.gallery[0], colSpan: 2, rowSpan: 2 },
  { ...IMAGES.gallery[1], colSpan: 1, rowSpan: 1 },
  { ...IMAGES.gallery[2], colSpan: 1, rowSpan: 1 },
  { ...IMAGES.gallery[3], colSpan: 1, rowSpan: 1 },
  { ...IMAGES.gallery[4], colSpan: 1, rowSpan: 2 },
  { ...IMAGES.gallery[5], colSpan: 1, rowSpan: 1 },
  { ...IMAGES.gallery[6], colSpan: 1, rowSpan: 1 },
  { ...IMAGES.gallery[7], colSpan: 1, rowSpan: 1 },
];

/* ─── Single Gallery Image Card ─── */
function GalleryCard({ item, index }: { item: GalleryItem; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-60px' });

  // Parallax-like scroll effect via GSAP
  useEffect(() => {
    if (!cardRef.current) return;
    const speed = index % 2 === 0 ? -12 : 12;

    gsap.to(cardRef.current, {
      y: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === cardRef.current) t.kill();
      });
    };
  }, [index]);

  // Gold corner accents stagger
  const cornerVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: 0.8 + i * 0.1, duration: 0.4 },
    }),
  };

  const heightClass = item.rowSpan === 2 ? 'aspect-[3/4] sm:aspect-auto sm:h-full' : 'aspect-[4/3] sm:aspect-auto sm:h-full';

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`relative ${heightClass} overflow-visible`}
    >
      <div className="relative w-full h-full group overflow-hidden img-zoom light-reflection cursor-pointer">
        <motion.img
          src={item.src}
          alt={item.alt}
          className="w-full h-full object-cover"
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-[#0a0a0a]/0 transition-all duration-500 group-hover:bg-[#0a0a0a]/50" />

        {/* Gold border that appears on hover */}
        <div className="absolute inset-0 border border-transparent transition-all duration-500 group-hover:border-[#c9a96e]/40" />

        {/* Gold corner accents */}
        <motion.div
          custom={0}
          variants={cornerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#c9a96e]/0 group-hover:border-[#c9a96e]/70 transition-colors duration-500"
        />
        <motion.div
          custom={1}
          variants={cornerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#c9a96e]/0 group-hover:border-[#c9a96e]/70 transition-colors duration-500"
        />
        <motion.div
          custom={2}
          variants={cornerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#c9a96e]/0 group-hover:border-[#c9a96e]/70 transition-colors duration-500"
        />
        <motion.div
          custom={3}
          variants={cornerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#c9a96e]/0 group-hover:border-[#c9a96e]/70 transition-colors duration-500"
        />

        {/* Caption sliding up on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-serif text-base sm:text-lg text-[#f5f0e8] leading-tight">
                {item.alt}
              </p>
              <p className="font-sans text-[10px] tracking-[0.3em] text-[#c9a96e]/70 mt-1 uppercase">
                NOIR BARBER
              </p>
            </div>
            <RiArrowRightUpLine className="text-[#c9a96e] text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN SECTION EXPORT
   ═══════════════════════════════════════════════════════ */
export default function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header (right-aligned) ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, x: 40 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-right mb-16 lg:mb-24"
        >
          <span className="font-sans text-xs tracking-[0.4em] text-[#c9a96e] block mb-4">
            02
          </span>
          <h2 className="heading-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-gold-gradient mb-6">
            THE GALLERY
          </h2>
          <div className="ml-auto h-px w-full max-w-xs bg-gradient-to-l from-[#c9a96e] via-[#d4af37] to-transparent" />
          <p className="font-sans text-sm sm:text-base text-[#888888] leading-relaxed mt-8 ml-auto max-w-md">
            A curated collection of our finest work
          </p>
        </motion.div>

        {/* ── Asymmetrical Masonry Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[200px] sm:auto-rows-[220px] lg:auto-rows-[240px] gap-3 sm:gap-4">
          {GALLERY_LAYOUT.map((item, i) => (
            <div
              key={`${item.alt}-${i}`}
              className={item.colSpan === 2 ? 'sm:col-span-2' : 'col-span-1'}
              style={{ gridRow: item.rowSpan === 2 ? 'span 2' : 'span 1' }}
            >
              <GalleryCard item={item} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
