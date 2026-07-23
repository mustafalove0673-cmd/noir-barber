'use client';

import { motion } from 'framer-motion';
import {
  RiInstagramLine,
  RiFacebookLine,
  RiTwitterXLine,
  RiWhatsappFill,
  RiPhoneFill,
} from 'react-icons/ri';
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineClock,
} from 'react-icons/hi2';
import { BRAND, FOOTER_LINKS } from './data';

export default function Footer() {
  return (
    <footer className="relative bg-[#050505]">
      {/* Animated background text */}
      <div className="relative w-full overflow-hidden py-3 bg-[#050505]">
        <div className="absolute inset-0 pointer-events-none">
          <span className="inline-block text-[clamp(3rem,10vw,8rem)] font-serif font-bold text-white/[0.02] uppercase leading-none whitespace-nowrap bg-text-flow">
            BATUHAN TAŞCI HAIR ARTIST KARTAL İSTANBUL &nbsp;&nbsp;&nbsp; BATUHAN TAŞCI HAIR ARTIST KARTAL İSTANBUL &nbsp;&nbsp;&nbsp; BATUHAN TAŞCI HAIR ARTIST KARTAL İSTANBUL &nbsp;&nbsp;&nbsp; BATUHAN TAŞCI HAIR ARTIST KARTAL İSTANBUL &nbsp;&nbsp;&nbsp;
          </span>
        </div>

        {/* Marquee on top of bg text */}
        <div className="relative w-full overflow-hidden">
          <div className="flex whitespace-nowrap">
            <span className="animate-marquee inline-block text-orange/10 text-[9px] font-sans tracking-[0.4em] uppercase select-none">
              BATUHAN TAŞCI  •  MEN&apos;S HAIR  •  KARTAL/İSTANBUL  •  5.0 YILDIZ  •{' '}
              BATUHAN TAŞCI  •  MEN&apos;S HAIR  •  KARTAL/İSTANBUL  •  5.0 YILDIZ  •{' '}
              BATUHAN TAŞCI  •  MEN&apos;S HAIR  •  KARTAL/İSTANBUL  •  5.0 YILDIZ  •{' '}
              BATUHAN TAŞCI  •  MEN&apos;S HAIR  •  KARTAL/İSTANBUL  •  5.0 YILDIZ  •{' '}
            </span>
          </div>
        </div>

        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/20 to-transparent" />
      </div>

      {/* Promo/Ad Banner */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1585747860019-8e8ef8b7d904?w=1920&q=80&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover opacity-[0.08]"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-[#050505]/80" />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 px-6 py-5"
        >
          <span className="font-sans text-[10px] tracking-[0.2em] text-orange/50 uppercase font-medium">Special Offer</span>
          <span className="hidden sm:block h-3 w-px bg-orange/20" />
          <p className="font-serif text-sm text-white/40 text-center">
            İlk ziyaretinize özel <span className="text-orange-gradient font-semibold">%20 indirim</span> — WhatsApp&apos;tan belirtin
          </p>
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Merhaba Batuhan, ilk ziyaretim için %20 indirim kampanyasından faydalanmak istiyorum.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-orange/10 border border-orange/20 text-orange/70 text-[9px] tracking-[0.2em] uppercase hover:bg-orange/20 hover:text-orange transition-all duration-300"
          >
            <RiWhatsappFill className="w-3 h-3" />
            <span>Hemen</span>
          </a>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
        >
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            {/* Logo with blur effect */}
            <div className="relative mb-4">
              <img
                src="/logo.png"
                alt="Batuhan Taşcı"
                className="w-12 h-12 rounded-full object-cover opacity-80"
                style={{ filter: 'drop-shadow(0 0 8px rgba(255, 107, 0, 0.2))' }}
              />
            </div>
            <h3 className="font-serif text-xl tracking-wide text-orange-gradient mb-1">Batuhan Taşcı</h3>
            <p className="font-sans text-[9px] tracking-[0.3em] text-white/15 uppercase mb-4">{BRAND.tagline}</p>
            <div className="flex gap-2">
              <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#25D366]/30 text-[#25D366]/60 text-[9px] tracking-wider uppercase hover:border-[#25D366]/60 hover:text-[#25D366] transition-all duration-300">
                <RiWhatsappFill className="w-3 h-3" />
                <span>Chat</span>
              </a>
              <a href={`tel:${BRAND.phone}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-orange/20 text-orange/40 text-[9px] tracking-wider uppercase hover:border-orange/50 hover:text-orange transition-all duration-300">
                <RiPhoneFill className="w-3 h-3" />
                <span>Ara</span>
              </a>
            </div>
          </div>

          {/* Sayfalar */}
          <div>
            <h4 className="font-sans text-[9px] tracking-[0.3em] text-white/10 uppercase mb-3">Sayfalar</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}
                    className="font-sans text-[10px] text-white/20 tracking-wider uppercase hover:text-orange transition-colors duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="font-sans text-[9px] tracking-[0.3em] text-white/10 uppercase mb-3">İletişim</h4>
            <ul className="space-y-2.5">
              <li>
                <a href={`https://maps.google.com/?q=${encodeURIComponent(BRAND.address)}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-2 text-[10px] text-white/20 hover:text-white/40 transition-colors">
                  <HiOutlineMapPin className="w-3 h-3 mt-0.5 flex-shrink-0 text-white/10" />
                  <span>{BRAND.address}</span>
                </a>
              </li>
              <li>
                <a href={`tel:${BRAND.phone}`}
                  className="flex items-center gap-2 text-[10px] text-white/20 hover:text-white/40 transition-colors">
                  <HiOutlinePhone className="w-3 h-3 flex-shrink-0 text-white/10" />
                  <span>{BRAND.phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`}
                  className="flex items-center gap-2 text-[10px] text-white/20 hover:text-white/40 transition-colors">
                  <HiOutlineEnvelope className="w-3 h-3 flex-shrink-0 text-white/10" />
                  <span>{BRAND.email}</span>
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-[10px] text-white/20">
                  <HiOutlineClock className="w-3 h-3 flex-shrink-0 text-white/10" />
                  <span>{BRAND.hours}</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Sosyal Medya */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-sans text-[9px] tracking-[0.3em] text-white/10 uppercase mb-3">Sosyal Medya</h4>
            <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 py-2 border-b border-white/[0.04] group">
              <RiInstagramLine className="w-3.5 h-3.5 text-white/15 group-hover:text-orange/60 transition-colors" />
              <div>
                <span className="block font-sans text-[11px] text-white/40 group-hover:text-white/60 transition-colors">{BRAND.instagram}</span>
              </div>
            </a>
            {/* Google Rating */}
            <div className="mt-3 glass px-3 py-2 flex items-center gap-2">
              <span className="text-orange text-xs">★</span>
              <span className="font-sans text-[10px] text-white/40">{BRAND.googleRating}</span>
              <span className="font-sans text-[9px] text-white/15">Google — {BRAND.googleReviews} Yorum</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="relative">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-orange/20 to-transparent" />
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-1">
          <p className="font-sans text-[10px] text-white/15">
            &copy; {new Date().getFullYear()} {BRAND.name}. Tüm hakları saklıdır.
          </p>
          <p className="font-sans text-[9px] tracking-[0.2em] text-white/10 uppercase">
            Hassasiyetle tasarlandı — Kartal, İstanbul
          </p>
        </div>
      </div>
    </footer>
  );
}
