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
} from 'react-icons/hi';
import { BRAND, FOOTER_LINKS } from './data';

const marqueeText =
  'NOIR BARBER  \u2022  LUXURY GROOMING  \u2022  NEW YORK  \u2022  EXCELLENCE  \u2022  ';

export default function Footer() {
  return (
    <footer className="relative bg-[#050505]">
      {/* \u2500\u2500 Top Marquee Bar \u2500\u2500 */}
      <div className="relative w-full overflow-hidden py-3">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="flex whitespace-nowrap">
          <span className="animate-marquee inline-block text-gold/30 text-[10px] md:text-xs font-sans tracking-[0.35em] uppercase select-none">
            {marqueeText}
            {marqueeText}
            {marqueeText}
            {marqueeText}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      </div>

      {/* \u2500\u2500 Main Footer Content \u2500\u2500 */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8"
        >
          {/* \u2500\u2500 Column 1: Brand \u2500\u2500 */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-serif text-3xl md:text-4xl tracking-wide text-gold-gradient mb-2">
              NOIR
            </h3>
            <p className="font-sans text-[10px] tracking-[0.3em] text-gold/60 uppercase mb-6">
              {BRAND.tagline}
            </p>
            <div className="flex gap-3">
              <motion.a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#25D366]/40 text-[#25D366] text-xs font-sans tracking-wider uppercase transition-all duration-300 hover:border-[#25D366] hover:bg-[#25D366]/10"
              >
                <RiWhatsappFill className="w-3.5 h-3.5" />
                <span>Chat</span>
              </motion.a>
              <motion.a
                href={`tel:${BRAND.phone}`}
                aria-label="Call"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gold/40 text-gold text-xs font-sans tracking-wider uppercase transition-all duration-300 hover:border-gold hover:bg-gold/10"
              >
                <RiPhoneFill className="w-3.5 h-3.5" />
                <span>Call</span>
              </motion.a>
            </div>
          </div>

          {/* \u2500\u2500 Column 2: Navigate \u2500\u2500 */}
          <div>
            <h4 className="font-sans text-[11px] tracking-[0.3em] text-gold/50 uppercase mb-5">
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group relative inline-block font-sans text-xs text-muted-foreground/70 tracking-wider uppercase transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 h-px bg-gold/60 transition-all duration-300 w-0 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* \u2500\u2500 Column 3: Contact \u2500\u2500 */}
          <div>
            <h4 className="font-sans text-[11px] tracking-[0.3em] text-gold/50 uppercase mb-5">
              Contact
            </h4>
            <ul className="space-y-3.5">
              <li>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(BRAND.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-2.5 text-xs text-muted-foreground/70 transition-colors duration-300 hover:text-gold"
                >
                  <HiOutlineMapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-gold/40 group-hover:text-gold transition-colors" />
                  <span>{BRAND.address}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${BRAND.phone}`}
                  className="group flex items-center gap-2.5 text-xs text-muted-foreground/70 transition-colors duration-300 hover:text-gold"
                >
                  <HiOutlinePhone className="w-3.5 h-3.5 shrink-0 text-gold/40 group-hover:text-gold transition-colors" />
                  <span>{BRAND.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="group flex items-center gap-2.5 text-xs text-muted-foreground/70 transition-colors duration-300 hover:text-gold"
                >
                  <HiOutlineEnvelope className="w-3.5 h-3.5 shrink-0 text-gold/40 group-hover:text-gold transition-colors" />
                  <span>{BRAND.email}</span>
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2.5 text-xs text-muted-foreground/70">
                  <HiOutlineClock className="w-3.5 h-3.5 shrink-0 text-gold/40" />
                  <span>{BRAND.hours}</span>
                </span>
              </li>
            </ul>
          </div>

          {/* \u2500\u2500 Column 4: Connect \u2500\u2500 */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-sans text-[11px] tracking-[0.3em] text-gold/50 uppercase mb-5">
              Connect
            </h4>
            {/* Large Instagram button */}
            <motion.a
              href={BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-3 px-4 py-3 rounded-xl border border-gold/20 transition-all duration-300 hover:border-gold/50 hover:bg-gold/5 mb-4"
            >
              <RiInstagramLine className="w-5 h-5 text-gold/60 group-hover:text-gold transition-colors" />
              <div>
                <span className="block font-sans text-sm text-foreground group-hover:text-gold transition-colors">
                  {BRAND.instagram}
                </span>
                <span className="block font-sans text-[10px] text-muted-foreground/50 tracking-wider uppercase">
                  Follow Us
                </span>
              </div>
            </motion.a>

            {/* Facebook & X icons */}
            <div className="flex items-center gap-3">
              <motion.a
                href={BRAND.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-full border border-gold/15 flex items-center justify-center text-muted-foreground/60 transition-all duration-300 hover:text-gold hover:border-gold/40"
              >
                <RiFacebookLine className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={BRAND.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-full border border-gold/15 flex items-center justify-center text-muted-foreground/60 transition-all duration-300 hover:text-gold hover:border-gold/40"
              >
                <RiTwitterXLine className="w-4 h-4" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* \u2500\u2500 Bottom Bar \u2500\u2500 */}
      <div className="relative">
        {/* Gold gradient divider */}
        <div
          className="w-full h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent, #c9a96e, #d4af37, #c9a96e, transparent)',
          }}
        />
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-sans text-[11px] text-muted-foreground/50">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <p className="font-sans text-[10px] tracking-[0.25em] text-muted-foreground/30 uppercase">
            Designed with precision
          </p>
        </div>
      </div>
    </footer>
  );
}
