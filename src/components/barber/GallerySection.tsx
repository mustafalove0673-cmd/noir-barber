'use client';

import { useRef, useMemo, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from './data';

gsap.registerPlugin(ScrollTrigger);

function getCardHeight(w: number, h: number) {
  return Math.round(Math.max(220, Math.min(560, (h / w) * 300)));
}

function MasonryCard({ item, index }: { item: (typeof IMAGES.gallery)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const cardHeight = useMemo(() => getCardHeight(item.w, item.h), [item.w, item.h]);

  useEffect(() => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const fromX = index % 2 === 0 ? -150 : 150;
    const toX = 0;

    // Scroll DOWN: enter from side to center
    gsap.fromTo(card,
      { x: fromX, opacity: 0, scale: 0.92 },
      {
        x: toX,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 90%',
          end: 'top 50%',
          scrub: 0.8,
        },
      }
    );

    // Scroll UP: exit to opposite side
    gsap.to(card, {
      x: index % 2 === 0 ? 150 : -150,
      opacity: 0,
      scale: 0.92,
      ease: 'power2.in',
      scrollTrigger: {
        trigger: card,
        start: 'bottom 60%',
        end: 'bottom 20%',
        scrub: 0.8,
      },
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="mb-px break-inside-avoid opacity-0"
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
    </div>
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
            <h2 className="heading-display text-lg md:text-xl text-orange-gradient leading-none">GALERİ</h2>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
