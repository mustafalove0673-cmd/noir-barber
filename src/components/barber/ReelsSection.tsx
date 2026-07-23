'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Instagram, Play } from 'lucide-react';
import { INSTAGRAM_REELS, BRAND } from './data';

function ReelCard({ reel, index }: { reel: typeof INSTAGRAM_REELS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex-shrink-0 w-[260px] sm:w-[280px] md:w-[300px] snap-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <a
        href={reel.url}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block overflow-hidden border border-white/[0.06] rounded-sm transition-all duration-500 hover:border-orange/30 group"
        style={{ aspectRatio: '9/16' }}
      >
        {/* Embedded reel iframe */}
        <iframe
          src={reel.embedUrl}
          className="w-full h-full object-cover"
          allowFullScreen
          loading="lazy"
          title={reel.caption}
          style={{ pointerEvents: hovered ? 'auto' : 'none' }}
        />

        {/* Overlay when not hovered */}
        <div className={`absolute inset-0 bg-black/40 flex flex-col items-center justify-center transition-opacity duration-500 ${hovered ? 'opacity-0' : 'opacity-100'}`}>
          <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
            <Play className="text-white/60 ml-0.5" size={20} fill="currentColor" />
          </div>
          <p className="font-sans text-[10px] tracking-[0.2em] text-white/30 uppercase">{reel.caption}</p>
        </div>

        {/* Caption at bottom */}
        <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-500 ${hovered ? 'opacity-0' : 'opacity-100'}`}>
          <p className="font-sans text-[9px] tracking-[0.15em] text-white/40 uppercase">{reel.caption}</p>
        </div>
      </a>
    </motion.div>
  );
}

export default function ReelsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-30px' });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = useCallback(() => {
    if (!scrollRef.current || isPaused) return;
    const el = scrollRef.current;
    if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
      el.scrollLeft = 0;
    } else {
      el.scrollLeft += 0.3;
    }
  }, [isPaused]);

  useEffect(() => {
    let raf: number;
    const loop = () => { scroll(); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [scroll]);

  return (
    <section id="videos" className="relative w-full overflow-hidden">
      {/* Header */}
      <div className="px-6 md:px-12 lg:px-20 pt-16 pb-8">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, x: -20 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4"
        >
          <div className="h-8 w-px bg-orange/30" />
          <div>
            <span className="font-mono text-[10px] tracking-[0.4em] text-white/10 uppercase block mb-1">05</span>
            <h2 className="heading-display text-2xl md:text-3xl text-orange-gradient leading-none">VİDEOLAR</h2>
          </div>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-white/[0.06] to-transparent" />
        </motion.div>
      </div>

      {/* Reels Carousel */}
      <div
        ref={scrollRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 lg:px-20 pb-8 scrollbar-hide"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {[...INSTAGRAM_REELS, ...INSTAGRAM_REELS, ...INSTAGRAM_REELS].map((reel, i) => (
          <ReelCard key={`reel-${i}`} reel={reel} index={i % INSTAGRAM_REELS.length} />
        ))}
      </div>

      {/* Bottom follow CTA */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-4 px-6 pb-12 pt-4"
      >
        <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-orange/20" />
        <p className="font-sans text-[10px] text-white/20 tracking-wider">
          Daha fazla video için
        </p>
        <a
          href={BRAND.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-serif text-sm text-orange/60 hover:text-orange transition-colors duration-300"
        >
          {BRAND.instagram}
        </a>
        <Instagram size={13} strokeWidth={1.5} className="text-orange/20" />
        <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-orange/20" />
      </motion.div>
    </section>
  );
}
