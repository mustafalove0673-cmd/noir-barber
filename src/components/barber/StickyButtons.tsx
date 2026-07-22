'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiWhatsappFill, RiPhoneFill } from 'react-icons/ri';
import { BRAND } from './data';

export default function StickyButtons() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-8 right-6 flex flex-col items-end gap-4 z-40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* WhatsApp Button */}
          <motion.a
            href={`https://wa.me/${BRAND.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg"
            style={{
              boxShadow: '0 0 20px rgba(37,211,102,0.3), 0 4px 12px rgba(0,0,0,0.4)',
            }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
          >
            <RiWhatsappFill className="w-7 h-7" />
          </motion.a>

          {/* Call Button */}
          <motion.a
            href={`tel:${BRAND.phone}`}
            aria-label="Call us"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-gold text-background shadow-lg animate-pulse-glow"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
          >
            <RiPhoneFill className="w-6 h-6" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
