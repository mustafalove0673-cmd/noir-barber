'use client'

import { motion } from 'framer-motion'
import { Instagram, ExternalLink, Users } from 'lucide-react'
import { IMAGES, BRAND } from './data'

const instagramImages = IMAGES.instagram

const cardStyles: { span: string; translateY: string; translateX: string; rotate: string; floatDelay: string }[] = [
  { span: 'md:col-span-7', translateY: 'md:translate-y-0', translateX: 'md:translate-x-0', rotate: 'md:-rotate-1', floatDelay: '0s' },
  { span: 'md:col-span-5', translateY: 'md:translate-y-12', translateX: 'md:-translate-x-4', rotate: 'md:rotate-0', floatDelay: '1s' },
  { span: 'md:col-span-4', translateY: 'md:translate-y-6', translateX: 'md:translate-x-2', rotate: 'md:rotate-1', floatDelay: '2s' },
  { span: 'md:col-span-4', translateY: 'md:translate-y-16', translateX: 'md:-translate-x-2', rotate: 'md:-rotate-0.5', floatDelay: '0.5s' },
  { span: 'md:col-span-4', translateY: 'md:translate-y-0', translateX: 'md:translate-x-0', rotate: 'md:rotate-0.5', floatDelay: '1.5s' },
  { span: 'md:col-span-6', translateY: 'md:translate-y-10', translateX: 'md:-translate-x-6', rotate: 'md:-rotate-1', floatDelay: '2.5s' },
]

export default function InstagramSection() {
  return (
    <section id="gallery" className="relative w-full py-24 md:py-32">
      {/* ── Section Header — Left Aligned ── */}
      <div className="max-w-6xl mx-auto px-6 mb-14 md:mb-20">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-muted-foreground font-sans text-xs tracking-[0.3em] uppercase mb-3"
        >
          FOLLOW THE CRAFT
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="heading-display text-3xl sm:text-4xl md:text-5xl text-gold-gradient mb-4"
        >
          {BRAND.instagram}
        </motion.h2>

        <motion.a
          href={BRAND.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-2 text-gold/70 hover:text-gold transition-colors duration-300 text-sm font-sans"
        >
          <ExternalLink size={14} />
          <span>Follow on Instagram</span>
        </motion.a>
      </div>

      {/* ── Floating Cards Layout ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4">
          {instagramImages.map((src, i) => {
            const style = cardStyles[i]
            const isFirstTwo = i < 2

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`${style.span} ${style.translateY} ${style.translateX} ${style.rotate} relative group`}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -6 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={`relative rounded-2xl overflow-hidden img-zoom cursor-pointer ${
                    isFirstTwo ? 'aspect-[4/3]' : 'aspect-square'
                  }`}
                  style={{
                    border: '1px solid rgba(201,169,110,0.1)',
                    animation: `float 6s ease-in-out ${style.floatDelay} infinite`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(201,169,110,0.4)'
                    e.currentTarget.style.boxShadow =
                      '0 0 60px rgba(201,169,110,0.15), 0 0 120px rgba(201,169,110,0.08)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(201,169,110,0.1)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Image */}
                  <img
                    src={src}
                    alt={`${BRAND.name} Instagram post ${i + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
                    <Instagram
                      className="text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100"
                      size={28}
                    />
                  </div>
                </motion.div>

                {/* Overlap offset — negative margin for neighboring overlap */}
                {i > 0 && (
                  <style>{`
                    @media (min-width: 768px) {
                      .group:nth-child(${i + 1}) {
                        margin-top: ${i === 1 ? '-1.5rem' : i === 3 ? '-2rem' : '0'};
                      }
                    }
                  `}</style>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* ── CTA Below ── */}
      <div className="max-w-6xl mx-auto px-6 mt-16 md:mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 text-center"
        >
          <div className="flex items-center gap-3">
            <Users className="text-gold" size={20} strokeWidth={1.5} />
            <span className="text-foreground/80 font-sans text-sm">
              Join our community
            </span>
          </div>

          <a
            href={BRAND.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-gold/40 text-gold text-sm font-sans tracking-wider uppercase transition-all duration-400 hover:bg-gold/10 hover:border-gold hover:shadow-gold"
          >
            <Instagram size={16} />
            <span>Follow</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
