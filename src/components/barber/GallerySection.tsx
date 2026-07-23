'use client';

import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { IMAGES } from './data';

function getCardHeight(w: number, h: number) {
  return Math.round(Math.max(220, Math.min(560, (h / w) * 300)));
}

function MasonryCard({ item, index }: { item: (typeof IMAGES.gallery)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-30px' });
  const cardHeight = useMemo(() => getCardHeight(item.w, item.h), [item.w, item.h]);

  // Alternating entry: even = from left, odd = from right
  const fromX = index % 2 === 0 ? -120 : 120;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: fromX, scale: 0.9 }}
      animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="mb-px break-inside-avoid"
    >
      <div
        className="relative group overflow-hidden cursor-pointer"
        style={{ height: `${cardHeight}px` }}
      >
        <img
          src={item.src}
          alt={item.alt}
          className="w-full h-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.05]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500" />
        <div className="absolute bottom-0 left-0 right-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]">
          <div className="px-4 pb-3 pt-8">
            <p className="font-sans text-[11px] text-white/50 tracking-wider uppercase">{item.alt}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function GallerySection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-30px' });

  return (
    <section id="gallery" className="relative overflow-hidden">
      <div className="columns-1 sm:columns-2 lg:columns-4 gap-0 [&>*]:mb-px">
        {IMAGES.gallery.map((item, i) => (
          <MasonryCard key={`${item.alt}-${i}`} item={item} index={i} />
        ))}
      </div>

      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, x: -30 }}
        animate={headerInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative -mt-16 z-10 pointer-events-none"
      >
        <div className="px-6 md:px-12 lg:px-20">
          <div className="inline-flex items-center gap-3 bg-[#0a0a0a]/80 backdrop-blur-sm px-4 py-2 pointer-events-auto">
            <span className="font-mono text-[10px] tracking-[0.4em] text-white/10 uppercase">02</span>
            <h2 className="heading-display text-lg md:text-xl text-gold-gradient leading-none">GALERİ</h2>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
