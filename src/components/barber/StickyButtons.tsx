'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiWhatsappFill, RiPhoneFill } from 'react-icons/ri';
import { HiOutlineEnvelope } from 'react-icons/hi';
import { BRAND } from './data';

const buttons = [
  {
    href: `https://wa.me/${BRAND.whatsapp}`,
    target: '_blank' as const,
    rel: 'noopener noreferrer' as const,
    ariaLabel: 'Chat on WhatsApp',
    tooltip: 'WhatsApp',
    Icon: RiWhatsappFill,
    extraClass: 'bg-[#25D366] text-white',
    style: {
      boxShadow: '0 0 20px rgba(37,211,102,0.3), 0 4px 12px rgba(0,0,0,0.4)',
    },
  },
  {
    href: `tel:${BRAND.phone}`,
    target: undefined as unknown as string,
    rel: undefined as unknown as string,
    ariaLabel: 'Call us',
    tooltip: 'Call',
    Icon: RiPhoneFill,
    extraClass: 'bg-gold text-background animate-pulse-glow',
    style: undefined,
  },
  {
    href: `mailto:${BRAND.email}`,
    target: undefined as unknown as string,
    rel: undefined as unknown as string,
    ariaLabel: 'Email us',
    tooltip: 'Email',
    Icon: HiOutlineEnvelope,
    extraClass: 'border border-gold/50 text-gold bg-[#0a0a0a]/90',
    style: undefined,
  },
];

export default function StickyButtons() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-8 right-6 flex flex-col items-end gap-3.5 z-40"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {buttons.map((btn, i) => (
            <motion.a
              key={i}
              href={btn.href}
              {...(btn.target ? { target: btn.target } : {})}
              {...(btn.rel ? { rel: btn.rel } : {})}
              aria-label={btn.ariaLabel}
              variants={{
                hidden: { opacity: 0, x: 30, scale: 0.8 },
                visible: {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: { type: 'spring', stiffness: 260, damping: 20 },
                },
              }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              className={\`group relative flex items-center justify-center w-13 h-13 rounded-full shadow-lg transition-colors duration-300 \${btn.extraClass}\`}
              style={btn.style}
            >
              <span className="absolute right-full mr-3 whitespace-nowrap px-3 py-1 rounded-md bg-foreground/90 text-background text-[11px] font-sans tracking-wider uppercase opacity-0 -translate-x-2 transition-all duration-200 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0">
                {btn.tooltip}
              </span>
              <btn.Icon className="w-6 h-6" />
            </motion.a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
