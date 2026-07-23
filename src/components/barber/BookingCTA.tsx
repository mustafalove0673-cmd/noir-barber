'use client'

import { motion } from 'framer-motion'
import { RiWhatsappFill, RiPhoneFill } from 'react-icons/ri'
import { BRAND } from './data'

/* ─── Marquee Divider (exported for reuse as section divider) ─── */
export function MarqueeDivider() {
  const text =
    'NOIR BARBER  •  LUXURY GROOMING  •  NEW YORK  •  PRECISION  •  ARTISTRY  •  EXCELLENCE  •  '

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="flex whitespace-nowrap">
        <span className="animate-marquee inline-block text-gold/25 text-sm md:text-base font-sans tracking-[0.3em] uppercase select-none">
          {text}
          {text}
          {text}
          {text}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
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
            "Hello NOIR BARBER, I'd like to book an appointment."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gold text-background font-sans text-sm font-semibold tracking-wide uppercase btn-shine transition-all duration-300 hover:shadow-gold hover:scale-105"
        >
          <RiWhatsappFill className="w-4 h-4" />
          <span>Book via WhatsApp</span>
        </a>
      </div>
    </motion.div>
  )
}

/* ─── Main Booking Banner ─── */
export default function BookingCTA() {
  return (
    <section id="booking-cta" className="relative w-full">
      <MarqueeDivider />

      <div className="relative overflow-hidden py-16 md:py-20">
        {/* Diagonal gold line pattern background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
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

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="heading-display text-2xl sm:text-3xl md:text-4xl text-gold-gradient mb-4"
          >
            YOUR NEXT CHAPTER BEGINS HERE
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-muted-foreground font-sans text-sm tracking-wider mb-10"
          >
            Book through WhatsApp for priority scheduling
          </motion.p>

          {/* CTA Buttons with angled / diamond-shaped edges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            {/* WhatsApp CTA — diamond-angled */}
            <motion.a
              href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
                "Hello NOIR BARBER, I'd like to book an appointment."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative inline-flex items-center gap-3 px-10 py-4 bg-gold text-background font-sans text-sm font-semibold tracking-wider uppercase btn-shine transition-shadow duration-300 hover:shadow-gold"
              style={{
                clipPath:
                  'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
              }}
            >
              <RiWhatsappFill className="w-5 h-5" />
              <span>BOOK VIA WHATSAPP</span>
            </motion.a>

            {/* Call CTA — diamond-angled outline */}
            <motion.a
              href={`tel:${BRAND.phone}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="relative inline-flex items-center gap-3 px-10 py-4 text-gold font-sans text-sm font-semibold tracking-wider uppercase transition-all duration-300 hover:shadow-gold"
              style={{
                clipPath:
                  'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
              }}
            >
              {/* Background layer for the border effect */}
              <span
                className="absolute inset-0 bg-gold/50"
                style={{
                  clipPath:
                    'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                }}
              />
              <span
                className="absolute inset-[1.5px] bg-[#0a0a0a]"
                style={{
                  clipPath:
                    'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                }}
              />
              <span className="relative z-10 flex items-center gap-3">
                <RiPhoneFill className="w-5 h-5" />
                <span>CALL US</span>
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
