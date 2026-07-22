'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { TESTIMONIALS } from './data'

const cardVariants = [
  {
    hidden: { opacity: 0, x: -60, rotate: 0 },
    visible: { opacity: 1, x: 0, rotate: 0 },
  },
  {
    hidden: { opacity: 0, y: 50, rotate: 0 },
    visible: { opacity: 1, y: 0, rotate: 0 },
  },
  {
    hidden: { opacity: 0, x: 60, rotate: 0 },
    visible: { opacity: 1, x: 0, rotate: 0 },
  },
]

const cardClasses = [
  'lg:translate-y-0 lg:-rotate-1',
  'lg:translate-y-8 lg:rotate-0',
  'lg:translate-y-4 lg:rotate-1',
]

export default function TestimonialsSection() {
  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-32 overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at center, rgba(201,169,110,0.04) 0%, transparent 70%)',
      }}
    >
      {/* ── Section Header ── */}
      <div className="max-w-6xl mx-auto px-6 text-center mb-16 md:mb-20">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="block text-gold text-sm font-sans tracking-[0.3em] mb-4"
        >
          03
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="heading-display text-3xl sm:text-4xl md:text-5xl text-gold-gradient mb-4"
        >
          WHAT THEY SAY
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground font-sans text-sm tracking-widest uppercase"
        >
          Voices of the distinguished
        </motion.p>
      </div>

      {/* ── Testimonial Cards ── */}
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-8 md:gap-10">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.id}
            variants={cardVariants[i]}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
            className={`relative ${cardClasses[i]}`}
          >
            <motion.div
              whileHover={{
                y: -8,
                transition: { duration: 0.35, ease: 'easeOut' },
              }}
              className="glass-strong rounded-2xl p-8 md:p-10 transition-shadow duration-500 hover:shadow-glow group cursor-default"
              style={{
                borderColor: 'rgba(201,169,110,0.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201,169,110,0.15)'
              }}
            >
              {/* Decorative quote mark */}
              <motion.div
                animate={{ opacity: [0.2, 0.35, 0.2] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.5,
                }}
                className="absolute top-6 right-8 md:right-10 pointer-events-none select-none"
              >
                <Quote
                  className="text-gold heading-display"
                  size={64}
                  strokeWidth={1}
                />
              </motion.div>

              {/* Star rating */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star
                    key={si}
                    className="text-gold fill-gold"
                    size={16}
                    strokeWidth={1.5}
                  />
                ))}
              </div>

              {/* Testimonial text */}
              <p className="font-serif italic text-foreground/90 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Name & Role */}
              <div className="flex items-center gap-3">
                <span className="font-serif text-gold text-lg tracking-wide">
                  {t.name}
                </span>
                <span className="text-muted-foreground text-xs tracking-[0.2em] uppercase font-sans">
                  {t.role}
                </span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* ── Editorial Quote ── */}
      <div className="max-w-5xl mx-auto px-6 mt-24 md:mt-32">
        <motion.blockquote
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="heading-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gold-gradient leading-tight">
            &ldquo;Excellence is not a skill.
            <br className="hidden sm:block" />
            It&rsquo;s an attitude.&rdquo;
          </p>
          <footer className="mt-6 text-muted-foreground font-sans text-sm tracking-widest uppercase">
            — Ralph Marston
          </footer>
        </motion.blockquote>
      </div>
    </section>
  )
}
