'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from './data';

/* ─── Single Testimonial Card (narrow, vertical) ─── */
function TestimonialCard({
  t,
  index,
}: {
  t: (typeof TESTIMONIALS)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="flex-shrink-0 w-[280px] sm:w-[300px] snap-start"
    >
      <div
        className="relative glass-strong rounded-xl p-6 pb-7 h-full flex flex-col cursor-default group"
        style={{
          borderColor: 'rgba(201,169,110,0.12)',
          transition: 'border-color 0.5s ease, box-shadow 0.5s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(201,169,110,0.35)';
          e.currentTarget.style.boxShadow =
            '0 0 40px rgba(201,169,110,0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(201,169,110,0.12)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Decorative watermark quote */}
        <Quote
          className="absolute top-4 right-4 text-[#c9a96e]/[0.07] pointer-events-none select-none"
          size={56}
          strokeWidth={1}
        />

        {/* Star rating */}
        <div className="flex gap-0.5 mb-5">
          {Array.from({ length: t.rating }).map((_, si) => (
            <Star
              key={si}
              className="text-[#c9a96e] fill-[#c9a96e]"
              size={13}
              strokeWidth={1.5}
            />
          ))}
        </div>

        {/* Testimonial text */}
        <p className="font-serif italic text-foreground/85 text-sm sm:text-[15px] leading-[1.7] flex-grow">
          &ldquo;{t.text}&rdquo;
        </p>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-[#c9a96e]/20 via-[#c9a96e]/10 to-transparent my-5" />

        {/* Name & Role */}
        <div>
          <p className="font-serif text-[#c9a96e] text-base tracking-wide leading-tight">
            {t.name}
          </p>
          <p className="text-muted-foreground text-[10px] tracking-[0.2em] uppercase font-sans mt-1">
            {t.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════════════════ */
export default function TestimonialsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-40px' });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = useCallback(() => {
    if (!scrollRef.current || isPaused) return;
    const el = scrollRef.current;
    // Scroll 0.6px per frame for smooth slow movement
    if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
      el.scrollLeft = 0;
    } else {
      el.scrollLeft += 0.6;
    }
  }, [isPaused]);

  useEffect(() => {
    let raf: number;
    const loop = () => {
      scroll();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [scroll]);

  return (
    <section
      id="about"
      className="relative w-full py-12 md:py-16 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at center, rgba(201,169,110,0.03) 0%, transparent 70%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Minimal Header ── */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, x: -20 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-end gap-4 mb-8 md:mb-10"
        >
          <span className="text-xs tracking-[0.4em] text-[#c9a96e]/50 font-sans">
            03
          </span>
          <h2 className="heading-display text-2xl md:text-3xl lg:text-4xl text-gold-gradient leading-none">
            VOICES
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-[#c9a96e]/20 to-transparent" />
        </motion.div>

        {/* ── Horizontal Scroll Carousel ── */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
          style={{
            // Custom scrollbar hide
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* Duplicate set for seamless loop */}
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <TestimonialCard key={`dup-${i}`} t={t} index={i % TESTIMONIALS.length} />
          ))}
        </div>

        {/* ── Editorial Quote ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 md:mt-14 text-center"
        >
          <p className="heading-editorial text-lg sm:text-xl md:text-2xl text-gold-gradient leading-snug">
            &ldquo;Excellence is not a skill. It&rsquo;s an attitude.&rdquo;
          </p>
          <p className="text-muted-foreground font-sans text-[10px] tracking-[0.3em] uppercase mt-2.5">
            — Ralph Marston
          </p>
        </motion.div>
      </div>
    </section>
  );
}
