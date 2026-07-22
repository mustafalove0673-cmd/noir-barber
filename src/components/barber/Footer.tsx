'use client';

import { motion } from 'framer-motion';
import { RiInstagramLine, RiFacebookLine, RiTwitterXLine } from 'react-icons/ri';
import { BRAND, NAV_LINKS } from './data';

const socialLinks = [
  { icon: RiInstagramLine, href: BRAND.instagramUrl, label: 'Instagram' },
  { icon: RiFacebookLine, href: '#', label: 'Facebook' },
  { icon: RiTwitterXLine, href: '#', label: 'X' },
];

const extraLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#050505]">
      {/* Top gold gradient line */}
      <div
        className="w-full h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #c9a96e, #d4af37, #c9a96e, transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center space-y-8"
        >
          {/* Brand Name */}
          <h3 className="font-serif text-3xl md:text-4xl tracking-wide text-foreground">
            {BRAND.name}
          </h3>

          {/* Tagline */}
          <p className="font-sans text-xs tracking-[0.3em] text-gold uppercase">
            {BRAND.tagline}
          </p>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[...NAV_LINKS, ...extraLinks].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative font-sans text-sm text-muted-foreground tracking-wider uppercase transition-colors duration-300 hover:text-foreground py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 h-px bg-gold transition-all duration-300 -translate-x-1/2 w-0 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-5">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-muted-foreground transition-colors duration-300 hover:text-gold hover:border-gold/50"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>

          {/* Gold divider */}
          <div className="flex justify-center">
            <div
              className="w-2/5 h-px"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)',
              }}
            />
          </div>

          {/* Bottom text */}
          <div className="space-y-2">
            <p className="font-sans text-xs text-muted-foreground/60">
              &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            </p>
            <p className="font-sans text-[10px] tracking-widest text-muted-foreground/30 uppercase">
              Designed with precision
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
