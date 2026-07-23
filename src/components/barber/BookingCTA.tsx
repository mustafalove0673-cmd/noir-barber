'use client';

import { motion } from 'framer-motion';
import { RiWhatsappFill, RiPhoneFill } from 'react-icons/ri';
import { BRAND } from './data';

export function MarqueeDivider() {
  const text = 'NOIR BARBER  •  LUXURY GROOMING  •  NEW YORK  •  PRECISION  •  ARTISTRY  •  EXCELLENCE  •  ';

  return (
    <div className="relative w-full overflow-hidden py-3 bg-[#0a0a0a]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="flex whitespace-nowrap">
        <span className="animate-marquee inline-block text-gold/15 text-[10px] md:text-xs font-sans tracking-[0.35em] uppercase select-none">
          {text}{text}{text}{text}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </div>
  );
}

export function FloatingBookingPrompt() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center justify-center gap-4"
    >
      <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-gold/20" />
      <span className="font-sans text-[10px] tracking-[0.4em] text-white/20 uppercase">
        Walk-ins welcome · Appointments preferred
      </span>
      <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-gold/20" />
    </motion.div>
  );
}

export default function BookingCTA() {
  return (
    <section id="booking-cta" className="relative w-full overflow-hidden">
      <MarqueeDivider />

      {/* Full-bleed image background */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0a]">
          <img
            src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1920&q=80&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover opacity-15"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-[#0a0a0a]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]" />

        {/* Centered content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="heading-display text-[clamp(1.5rem,4vw,3rem)] text-gold-gradient mb-3"
          >
            SONRAKİ BÖLÜMÜN BURADA BAŞLıyor
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-sans text-[11px] text-white/25 tracking-wider mb-8"
          >
            Öncelikli planlama için WhatsApp'tan bize ulaşın
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <a
              href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Merhaba NOIR BARBER, randevu almak istiyorum.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3 bg-gold text-background font-sans text-[10px] font-semibold tracking-[0.25em] uppercase btn-shine transition-all duration-300 hover:shadow-gold"
            >
              <RiWhatsappFill className="w-4 h-4" />
              <span>WHATSAPP İLE RANDEVU AL</span>
            </a>

            <a
              href={`tel:${BRAND.phone}`}
              className="inline-flex items-center gap-2.5 px-7 py-3 border border-white/12 text-white/50 font-sans text-[10px] font-semibold tracking-[0.25em] uppercase transition-all duration-300 hover:text-gold hover:border-gold/30"
            >
              <RiPhoneFill className="w-4 h-4" />
              <span>BİZİ ARA</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
