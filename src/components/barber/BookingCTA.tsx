'use client'

import { motion } from 'framer-motion'
import { MessageCircle, Phone } from 'lucide-react'
import { BRAND } from './data'

/* ─── Marquee Divider ─── */
function MarqueeDivider() {
  const text =
    'NOIR BARBER  •  LUXURY GROOMING  •  NEW YORK  •  PRECISION  •  ARTISTRY  •  EXCELLENCE  •  '

  return (
    <div className="relative w-full overflow-hidden py-6">
      {/* Gold lines above and below */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="flex whitespace-nowrap">
        <span className="animate-marquee inline-block text-gold/25 text-sm md:text-base font-sans tracking-[0.3em] uppercase select-none">
          {/* Duplicate for seamless loop */}
          {text}
          {text}
          {text}
          {text}
        </span>
      </div>
    </div>
  )
}

/* ─── Floating Booking Prompt ─── */
export function FloatingBookingPrompt() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Pulsing gold accent dot */}
      <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gold animate-pulse-glow" />

      <div
        className="glass-strong rounded-2xl p-6 md:p-8 animate-pulse-glow"
        style={{
          borderColor: 'rgba(201,169,110,0.2)',
        }}
      >
        <h3 className="heading-display text-xl md:text-2xl text-gold-gradient mb-2">
          RESERVE YOUR SEAT
        </h3>
        <p className="text-muted-foreground font-sans text-sm mb-6 max-w-xs">
          Walk-ins welcome, appointments preferred
        </p>
        <a
          href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
            `Hello NOIR BARBER, I'd like to book an appointment.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gold text-background font-sans text-sm font-semibold tracking-wide uppercase btn-shine transition-all duration-300 hover:shadow-gold hover:scale-105"
        >
          <MessageCircle size={16} />
          <span>Book via WhatsApp</span>
        </a>
      </div>
    </motion.div>
  )
}

/* ─── Main Booking Banner ─── */
export default function BookingCTA() {
  return (
    <section id="contact" className="relative w-full">
      {/* ── Marquee Divider ── */}
      <MarqueeDivider />

      {/* ── Main CTA Banner ── */}
      <div className="relative overflow-hidden py-24 md:py-32">
        {/* Diagonal gold line pattern background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 40px,
              #c9a96e 40px,
              #c9a96e 41px
            )`,
          }}
        />

        {/* Radial gold glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 80%, rgba(201,169,110,0.06) 0%, transparent 60%)',
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="heading-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gold-gradient mb-6"
          >
            YOUR NEXT CHAPTER
            <br />
            BEGINS HERE
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-muted-foreground font-sans text-sm md:text-base tracking-wider mb-12"
          >
            Book through WhatsApp for priority scheduling
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* WhatsApp CTA */}
            <motion.a
              href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
                `Hello NOIR BARBER, I'd like to book an appointment.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold text-background font-sans text-sm font-semibold tracking-wider uppercase btn-shine transition-shadow duration-300 hover:shadow-gold"
            >
              <MessageCircle size={18} />
              <span>BOOK VIA WHATSAPP</span>
            </motion.a>

            {/* Call CTA */}
            <motion.a
              href={`tel:${BRAND.phone}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-gold/50 text-gold font-sans text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-gold/10 hover:border-gold hover:shadow-gold"
            >
              <Phone size={18} strokeWidth={1.5} />
              <span>CALL US</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
