'use client';

import { useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { IMAGES } from './data';

/* ─── Height calculator from natural aspect ratio ─── */
function getCardHeight(w: number, h: number): number {
  const ratio = h / w;
  // Clamp between 200px and 520px for visual rhythm
  return Math.round(Math.max(200, Math.min(520, ratio * 280)));
}

/* ─── Single Masonry Card ─── */
function MasonryCard({
  item,
  index,
}: {
  item: (typeof IMAGES.gallery)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-40px' });

  const cardHeight = useMemo(() => getCardHeight(item.w, item.h), [item.w, item.h]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="mb-3 break-inside-avoid"
    >
      <div
        className="relative group overflow-hidden img-zoom cursor-pointer"
        style={{
          height: `${cardHeight}px`,
          borderRadius: '10px',
          border: '1px solid rgba(201,169,110,0.08)',
          transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(201,169,110,0.35)';
          e.currentTarget.style.boxShadow =
            '0 0 30px rgba(201,169,110,0.12), 0 8px 32px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(201,169,110,0.08)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Image */}
        <img
          src={item.src}
          alt={item.alt}
          className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06]"
          loading="lazy"
        />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/45 transition-all duration-500" />

        {/* Caption slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]">
          <div className="px-4 pb-4 pt-10 bg-gradient-to-t from-black/70 to-transparent">
            <p className="font-serif text-sm md:text-base text-[#f5f0e8] leading-snug">
              {item.alt}
            </p>
            <p className="font-sans text-[9px] tracking-[0.35em] text-[#c9a96e]/60 mt-1.5 uppercase">
              NOIR BARBER
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════════════════ */
export default function GallerySection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-40px' });

  return (
    <section
      id="gallery"
      className="relative py-12 md:py-16 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Minimal Inline Header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, x: 20 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-end gap-4 mb-8 md:mb-10"
        >
          <span className="text-xs tracking-[0.4em] text-[#c9a96e]/50 font-sans">
            02
          </span>
          <h2 className="heading-display text-2xl md:text-3xl lg:text-4xl text-gold-gradient leading-none">
            THE GALLERY
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-[#c9a96e]/20 to-transparent" />
        </motion.div>

        {/* ── Pinterest-style Masonry via CSS Columns ── */}
        <div
          className="columns-1 sm:columns-2 lg:columns-4 gap-3 [&>*]:mb-3"
        >
          {IMAGES.gallery.map((item, i) => (
            <MasonryCard key={`${item.alt}-${i}`} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
