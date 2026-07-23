'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiWhatsappFill, RiPhoneFill } from 'react-icons/ri';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { BRAND } from './data';

const buttons = [
  {
    href: `https://wa.me/${BRAND.whatsapp}`,
    target: '_blank' as const,
    rel: 'noopener noreferrer' as const,
    ariaLabel: 'WhatsApp',
    tooltip: 'WhatsApp',
    Icon: RiWhatsappFill,
    className: 'bg-[#25D366] text-white shadow-[0_0_16px_rgba(37,211,102,0.25)]',
  },
  {
    href: `tel:${BRAND.phone}`,
    target: undefined as unknown as string,
    rel: undefined as unknown as string,
    ariaLabel: 'Call',
    tooltip: 'Call',
    Icon: RiPhoneFill,
    className: 'bg-gold text-background',
  },
  {
    href: `mailto:${BRAND.email}`,
    target: undefined as unknown as string,
    rel: undefined as unknown as string,
    ariaLabel: 'Email',
    tooltip: 'Email',
    Icon: HiOutlineEnvelope,
    className: 'border border-white/10 text-white/50 bg-white/[0.04] backdrop-blur-sm',
  },
];

export default function StickyButtons() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 right-6 flex flex-col items-end gap-2.5 z-40"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
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
                hidden: { opacity: 0, x: 20, scale: 0.8 },
                visible: {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  transition: { type: 'spring', stiffness: 260, damping: 20 },
                },
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              className={`group relative flex items-center justify-center w-11 h-11 rounded-full transition-colors duration-300 ${btn.className}`}
            >
              <span className="absolute right-full mr-2 whitespace-nowrap px-2 py-1 rounded bg-white/90 text-[#0a0a0a] text-[10px] font-sans tracking-wider uppercase opacity-0 -translate-x-1 transition-all duration-200 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0">
                {btn.tooltip}
              </span>
              <btn.Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
