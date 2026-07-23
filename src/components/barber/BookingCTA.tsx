'use client';

import { motion } from 'framer-motion';
import { RiWhatsappFill, RiPhoneFill } from 'react-icons/ri';
import { BRAND } from './data';

export function MarqueeDivider() {
  const text = 'BATUHAN TAŞCI  •  MEN\'S HAIR  •  KARTAL/İSTANBUL  •  5.0 YILDIZ  •  ';

  return (
    <div className="relative w-full overflow-hidden py-2 bg-[#0a0a0a]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/20 to-transparent" />
      <div className="flex whitespace-nowrap">
        <span className="animate-marquee inline-block text-orange/12 text-[9px] md:text-[10px] font-sans tracking-[0.35em] uppercase select-none">
          {text}{text}{text}{text}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/20 to-transparent" />
    </div>
  );
}

export default function BookingCTA() {
  return (
    <section id="booking-cta" className="relative w-full overflow-hidden">
      <MarqueeDivider />

      {/* Thinner CTA */}
      <div className="relative py-16 md:py-20 lg:py-24 overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1920&q=80&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover opacity-[0.06]"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]" />
        <div className="absolute inset-0 pattern-dots" />

        {/* Centered content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="heading-display text-[clamp(1.5rem,4vw,2.8rem)] text-orange-gradient mb-3"
          >
            SONRAKİ RANDEVUNU AL
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans text-[11px] text-white/20 tracking-wider mb-8"
          >
            WhatsApp veya telefon ile kolayca randevu
          </motion.p>

          {/* CTAs — slim buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <a
              href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent("Merhaba Batuhan, randevu almak istiyorum.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange text-background font-sans text-[10px] font-semibold tracking-[0.25em] uppercase btn-shine transition-all duration-300 hover:shadow-orange"
            >
              <RiWhatsappFill className="w-3.5 h-3.5" />
              <span>WHATSAPP</span>
            </a>

            <a
              href={`tel:${BRAND.phone}`}
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-white/12 text-white/50 font-sans text-[10px] font-semibold tracking-[0.25em] uppercase transition-all duration-300 hover:text-orange hover:border-orange/30"
            >
              <RiPhoneFill className="w-3.5 h-3.5" />
              <span>ARA</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
