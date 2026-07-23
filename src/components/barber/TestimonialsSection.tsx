'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';
import { TESTIMONIALS, IMAGES, BRAND } from './data';

function TestimonialCard3D({ t, index }: { t: (typeof TESTIMONIALS)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-40px' });
  const bgImage = IMAGES.testimonials[index % IMAGES.testimonials.length];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, rotateY: index % 2 === 0 ? -60 : 60, scale: 0.85, z: -50 }}
      animate={isInView ? { opacity: 1, rotateY: 0, scale: 1, z: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="flex-shrink-0 w-[320px] sm:w-[360px] snap-center"
      style={{ perspective: '1200px' }}
    >
      <div className="relative overflow-hidden border border-white/[0.06] h-full" style={{ transformStyle: 'preserve-3d' }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={bgImage} alt="" className="w-full h-full object-cover opacity-15" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between h-full min-h-[280px]">
          {/* Stars */}
          <div className="flex gap-0.5 mb-4">
            {Array.from({ length: t.rating }).map((_, si) => (
              <Star key={si} className="text-gold/70 fill-gold/70" size={12} strokeWidth={1.5} />
            ))}
          </div>

          {/* Quote */}
          <p className="font-serif italic text-white/50 text-sm leading-[1.8] flex-grow">
            &ldquo;{t.text}&rdquo;
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-white/[0.06] via-gold/20 to-white/[0.06] my-4" />

          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-gold/20 overflow-hidden flex-shrink-0">
              <img src={bgImage} alt={t.name} className="w-full h-full object-cover opacity-60" loading="lazy" />
            </div>
            <div>
              <p className="font-sans text-xs text-white/60 tracking-wide">{t.name}</p>
              <p className="font-sans text-[9px] tracking-[0.2em] text-white/20 uppercase mt-0.5">{t.role}</p>
            </div>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/10" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/10" />
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
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
      el.scrollLeft += 0.4;
    }
  }, [isPaused]);

  useEffect(() => {
    let raf: number;
    const loop = () => { scroll(); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [scroll]);

  return (
    <section id="testimonials" className="relative w-full overflow-hidden">
      {/* Background with image */}
      <div className="relative h-[65vh] md:h-[75vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1585747860019-8e8ef8b7d904?w=1920&q=80&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover opacity-15"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[#0a0a0a]/40" />

        {/* Section label */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, x: -20 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex items-center gap-3 px-6 md:px-12 lg:px-20 pt-12 md:pt-16"
        >
          <span className="font-mono text-[10px] tracking-[0.4em] text-white/10 uppercase">03</span>
          <h2 className="heading-display text-lg md:text-xl text-gold-gradient leading-none">SESLER</h2>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-white/[0.06] to-transparent" />
        </motion.div>

        {/* 3D Card Carousel */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative z-10 flex gap-5 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 lg:px-20 pt-10 pb-4 scrollbar-hide"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <TestimonialCard3D key={`trip-${i}`} t={t} index={i % TESTIMONIALS.length} />
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center mt-8 px-6"
        >
          <p className="font-serif text-base md:text-lg text-gold-gradient/50 leading-snug">
            &ldquo;Mükemmellik bir yetenek değil. Bir tutumdur.&rdquo;
          </p>
          <p className="font-sans text-[9px] tracking-[0.3em] text-white/12 uppercase mt-2">— Ralph Marston</p>
        </motion.div>
      </div>
    </section>
  );
}
