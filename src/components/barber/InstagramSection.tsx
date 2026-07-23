'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { IMAGES, BRAND } from './data';

const HEIGHTS = [320, 240, 400, 280, 360, 260];

function InstaCard({ src, index }: { src: string; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-30px' });
  const height = HEIGHTS[index % HEIGHTS.length];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mb-px break-inside-avoid"
    >
      <div
        className="relative group overflow-hidden cursor-pointer"
        style={{ height: `${height}px` }}
      >
        <img
          src={src}
          alt={`${BRAND.name} Instagram ${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-400 flex items-center justify-center">
          <Instagram className="text-white opacity-0 group-hover:opacity-80 transition-all duration-400 scale-75 group-hover:scale-100" size={24} strokeWidth={1.5} />
        </div>
      </div>
    </motion.div>
  );
}

export default function InstagramSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-30px' });

  return (
    <section className="relative w-full overflow-hidden">
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-0 [&>*]:mb-px">
        {IMAGES.instagram.map((src, i) => (
          <InstaCard key={i} src={src} index={i} />
        ))}
      </div>

      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center justify-center gap-4 py-8 bg-[#0a0a0a]"
      >
        <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-orange/20" />
        <span className="font-sans text-[10px] tracking-[0.3em] text-white/20 uppercase">Takip Et</span>
        <a
          href={BRAND.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-serif text-sm text-white/60 hover:text-orange transition-colors duration-300"
        >
          {BRAND.instagram}
        </a>
        <Instagram size={13} strokeWidth={1.5} className="text-orange/20" />
        <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-orange/20" />
      </motion.div>
    </section>
  );
}
