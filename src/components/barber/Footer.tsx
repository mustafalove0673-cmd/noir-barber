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
      {/* Top marquee */}
      <div className="relative w-full overflow-hidden py-2.5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="flex whitespace-nowrap">
          <span className="animate-marquee inline-block text-gold/12 text-[9px] font-sans tracking-[0.4em] uppercase select-none">
            NOIR BARBER  •  LUXURY GROOMING  •  NEW YORK  •  EXCELLENCE  •{' '}
            NOIR BARBER  •  LUXURY GROOMING  •  NEW YORK  •  EXCELLENCE  •{' '}
            NOIR BARBER  •  LUXURY GROOMING  •  NEW YORK  •  EXCELLENCE  •{' '}
            NOIR BARBER  •  LUXURY GROOMING  •  NEW YORK  •  EXCELLENCE  •{' '}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
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
            <h3 className="font-serif text-2xl tracking-wide text-gold-gradient mb-1">NOIR</h3>
            <p className="font-sans text-[9px] tracking-[0.3em] text-white/15 uppercase mb-4">{BRAND.tagline}</p>
            <div className="flex gap-2">
              <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#25D366]/30 text-[#25D366]/60 text-[9px] tracking-wider uppercase hover:border-[#25D366]/60 hover:text-[#25D366] transition-all duration-300">
                <RiWhatsappFill className="w-3 h-3" />
                <span>Chat</span>
              </a>
              <a href={`tel:${BRAND.phone}`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-gold/20 text-gold/40 text-[9px] tracking-wider uppercase hover:border-gold/50 hover:text-gold transition-all duration-300">
                <RiPhoneFill className="w-3 h-3" />
                <span>Call</span>
              </a>
            </div>
          </div>

          {/* Navigasyon */}
          <div>
            <h4 className="font-sans text-[9px] tracking-[0.3em] text-white/10 uppercase mb-3">Sayfalar</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href}
                    className="font-sans text-[10px] text-white/20 tracking-wider uppercase hover:text-gold transition-colors duration-300">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-[9px] tracking-[0.3em] text-white/10 uppercase mb-3">Contact</h4>
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

          {/* Bağlantı */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-sans text-[9px] tracking-[0.3em] text-white/10 uppercase mb-3">Sosyal</h4>
            <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2.5 py-2 border-b border-white/[0.04] group">
              <RiInstagramLine className="w-3.5 h-3.5 text-white/15 group-hover:text-gold/60 transition-colors" />
              <div>
                <span className="block font-sans text-[11px] text-white/40 group-hover:text-white/60 transition-colors">{BRAND.instagram}</span>
              </div>
            </a>
            <div className="flex items-center gap-2.5 mt-3">
              <a href={BRAND.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook"
                className="w-7 h-7 rounded-full border border-white/[0.06] flex items-center justify-center text-white/15 hover:text-gold/50 hover:border-white/10 transition-all duration-300">
                <RiFacebookLine className="w-3 h-3" />
              </a>
              <a href={BRAND.twitterUrl} target="_blank" rel="noopener noreferrer" aria-label="X"
                className="w-7 h-7 rounded-full border border-white/[0.06] flex items-center justify-center text-white/15 hover:text-gold/50 hover:border-white/10 transition-all duration-300">
                <RiTwitterXLine className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="relative">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-1">
          <p className="font-sans text-[10px] text-white/15">
            &copy; {new Date().getFullYear()} {BRAND.name}. Tüm hakları saklıdır.
          </p>
          <p className="font-sans text-[9px] tracking-[0.2em] text-white/10 uppercase">
            Hassasiyetle tasarlandı
          </p>
        </div>
      </div>
    </footer>
  );
}
