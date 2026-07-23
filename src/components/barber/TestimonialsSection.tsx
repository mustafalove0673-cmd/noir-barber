'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS, BRAND } from './data';

function TestimonialCard({ t, index }: { t: (typeof TESTIMONIALS)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex-shrink-0 w-[300px] sm:w-[340px] snap-start"
    >
      <div className="p-6 border border-white/[0.06] bg-white/[0.02] h-full flex flex-col group hover:border-white/[0.12] transition-colors duration-500">
        <Quote className="text-white/[0.04] absolute top-3 right-4 pointer-events-none" size={40} strokeWidth={1} />

        <div className="flex gap-0.5 mb-4">
          {Array.from({ length: t.rating }).map((_, si) => (
            <Star key={si} className="text-gold/70 fill-gold/70" size={11} strokeWidth={1.5} />
          ))}
        </div>

        <p className="font-serif italic text-white/40 text-sm leading-[1.7] flex-grow">
          &ldquo;{t.text}&rdquo;
        </p>

        <div className="h-px bg-white/[0.06] my-4" />

        <div className="flex items-center justify-between">
          <div>
            <p className="font-sans text-xs text-white/60 tracking-wide">{t.name}</p>
            <p className="font-sans text-[9px] tracking-[0.2em] text-white/20 uppercase mt-0.5">{t.role}</p>
          </div>
        </div>
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
      el.scrollLeft += 0.5;
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
      {/* Full-bleed image background */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]">
          <img
            src="https://images.unsplash.com/photo-1585747860019-8e8ef8b7d904?w=1920&q=80&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover opacity-20"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[#0a0a0a]/50" />

        {/* Label */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, x: -16 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex items-center gap-3 px-6 md:px-12 lg:px-20 pt-12 md:pt-16"
        >
          <span className="font-mono text-[10px] tracking-[0.4em] text-white/15 uppercase">03</span>
          <h2 className="heading-display text-lg md:text-xl text-gold-gradient leading-none">VOICES</h2>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-white/[0.08] to-transparent" />
        </motion.div>

        {/* Horizontal scroll carousel */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative z-10 flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 lg:px-20 pt-8 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <TestimonialCard key={`dup-${i}`} t={t} index={i % TESTIMONIALS.length} />
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center mt-8 px-6"
        >
          <p className="font-serif text-base md:text-lg text-gold-gradient/60 leading-snug">
            &ldquo;Excellence is not a skill. It&rsquo;s an attitude.&rdquo;
          </p>
          <p className="font-sans text-[9px] tracking-[0.3em] text-white/15 uppercase mt-2">
            — Ralph Marston
          </p>
        </motion.div>
      </div>
    </section>
  );
}
