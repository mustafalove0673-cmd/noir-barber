'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { IMAGES, BRAND } from './data';

/* ─── Varying aspect heights for polaroid feel ─── */
const POLAROID_HEIGHTS = [280, 220, 340, 260, 310, 240];

/* ─── Single Polaroid Card ─── */
function PolaroidCard({
  src,
  index,
  total,
}: {
  src: string;
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-40px' });
  const height = POLAROID_HEIGHTS[index % POLAROID_HEIGHTS.length];

  // Subtle rotation offsets for polaroid feel
  const rotations = [-1.2, 0.8, -0.5, 1.5, -1, 0.6];
  const rot = rotations[index % rotations.length];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24, rotate: rot * 0.5 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, rotate: rot }
          : {}
      }
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="mb-3 break-inside-avoid"
    >
      <div
        className="relative group overflow-hidden cursor-pointer"
        style={{
          height: `${height}px`,
          borderRadius: '8px',
          border: '1px solid rgba(201,169,110,0.06)',
          background: 'rgba(255,255,255,0.02)',
          padding: '6px',
          transform: `rotate(${rot}deg)`,
          transition:
            'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(201,169,110,0.3)';
          e.currentTarget.style.boxShadow =
            '0 0 24px rgba(201,169,110,0.1), 0 4px 20px rgba(0,0,0,0.3)';
          e.currentTarget.style.transform = `rotate(0deg) scale(1.02)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(201,169,110,0.06)';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.transform = `rotate(${rot}deg)`;
        }}
      >
        {/* Inner image frame */}
        <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: '4px' }}>
          <img
            src={src}
            alt={`${BRAND.name} Instagram ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-all duration-400 flex items-center justify-center">
            <Instagram
              className="text-white opacity-0 group-hover:opacity-100 transition-all duration-400 scale-50 group-hover:scale-100"
              size={22}
              strokeWidth={1.5}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════════════════ */
export default function InstagramSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-40px' });

  return (
    <section className="relative w-full py-10 md:py-14 overflow-hidden">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* ── Compact Header with Follow Button ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, x: -16 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8"
        >
          <div>
            <p className="text-muted-foreground font-sans text-[10px] tracking-[0.3em] uppercase mb-1.5">
              FOLLOW THE CRAFT
            </p>
            <h2 className="heading-display text-2xl md:text-3xl text-gold-gradient leading-none">
              {BRAND.instagram}
            </h2>
          </div>

          <a
            href={BRAND.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#c9a96e]/30 text-[#c9a96e] text-xs font-sans tracking-widest uppercase transition-all duration-400 hover:bg-[#c9a96e]/10 hover:border-[#c9a96e]/60 hover:shadow-gold btn-shine flex-shrink-0"
          >
            <Instagram size={14} strokeWidth={1.5} />
            <span>Follow</span>
          </a>
        </motion.div>

        {/* ── Polaroid Masonry via CSS Columns (3 on desktop) ── */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 [&>*]:mb-3">
          {IMAGES.instagram.map((src, i) => (
            <PolaroidCard
              key={i}
              src={src}
              index={i}
              total={IMAGES.instagram.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
