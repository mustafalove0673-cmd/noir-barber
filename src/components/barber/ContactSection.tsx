'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineClock,
} from 'react-icons/hi2';
import { BRAND, INSTAGRAM_REELS } from './data';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const contactInfo = [
  { icon: HiOutlineMapPin, text: BRAND.address },
  { icon: HiOutlinePhone, text: BRAND.phone },
  { icon: HiOutlineEnvelope, text: BRAND.email },
  { icon: HiOutlineClock, text: BRAND.hours },
];

function FloatingInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  multiline = false,
  delay = 0,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  multiline?: boolean;
  delay?: number;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  const sharedProps = {
    name,
    value,
    onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    required,
    className: 'w-full bg-transparent border-b border-white/10 text-white/70 font-sans text-sm py-3 px-1 outline-none transition-all duration-300 placeholder-transparent',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className="relative"
    >
      {multiline ? (
        <textarea {...sharedProps} rows={3} className={`${sharedProps.className} resize-none`} />
      ) : (
        <input type={type} {...sharedProps} />
      )}
      <label
        className={
          'absolute left-1 pointer-events-none transition-all duration-300 font-sans text-xs ' +
          (isActive ? '-top-2 text-orange text-[10px] tracking-wider uppercase' : 'top-3 text-white/20')
        }
      >
        {label}
      </label>
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-orange-gradient"
        initial={{ width: '0%' }}
        animate={{ width: focused ? '100%' : '0%' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </motion.div>
  );
}

function Checkmark() {
  return (
    <motion.svg viewBox="0 0 52 52" className="w-16 h-16" initial="hidden" animate="visible">
      <motion.circle cx="26" cy="26" r="25" fill="none" stroke="#FF6B00" strokeWidth="2"
        variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 0.6 } } }} />
      <motion.path fill="none" stroke="#FF6B00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
        variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 0.5, delay: 0.5 } } }} />
    </motion.svg>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const sectionRef = useRef<HTMLDivElement>(null);
  const contactBgReel = INSTAGRAM_REELS.find(r => r.isContactBg) || INSTAGRAM_REELS[INSTAGRAM_REELS.length - 1];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="relative w-full overflow-hidden">
      {/* Diagonal frame wrapper */}
      <div className="relative" style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}>
        {/* Background video (Instagram reel iframe) */}
        <div className="absolute inset-0 pointer-events-none">
          <iframe
            src={contactBgReel.embedUrl}
            className="w-full h-full object-cover opacity-[0.06]"
            style={{ filter: 'grayscale(1) brightness(0.5)' }}
            allowFullScreen
            loading="lazy"
            title="Batuhan Taşcı atölye"
          />
        </div>
        <div className="absolute inset-0 bg-[#0a0a0a]/85" />

        {/* Decorative diagonal stripes */}
        <div className="absolute inset-0 pattern-stripes opacity-50" />

        {/* Content — ultra minimal */}
        <div className="relative z-10 max-w-4xl mx-auto px-8 md:px-16 lg:px-24 py-16 md:py-20">
          {/* Header — tiny */}
          <div className="mb-10 md:mb-14">
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-8 w-px bg-orange/30" />
              <div>
                <span className="font-mono text-[9px] tracking-[0.4em] text-white/10 uppercase block">04</span>
                <h2 className="heading-display text-xl md:text-2xl text-orange-gradient leading-none">İLETİŞİM</h2>
              </div>
            </motion.div>
          </div>

          {/* Compact grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Form — 3 cols */}
            <div className="lg:col-span-3 relative">
              <AnimatePresence mode="wait">
                {status !== 'success' ? (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-5"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FloatingInput label="İsim" name="name" value={form.name} onChange={handleChange} required delay={0} />
                      <FloatingInput label="Telefon" name="phone" type="tel" value={form.phone} onChange={handleChange} delay={0.05} />
                    </div>
                    <FloatingInput label="E-posta" name="email" type="email" value={form.email} onChange={handleChange} required delay={0.1} />
                    <FloatingInput label="Mesaj" name="message" value={form.message} onChange={handleChange} required multiline delay={0.15} />

                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-2.5 bg-orange text-background font-sans text-[10px] font-semibold tracking-[0.25em] uppercase btn-shine transition-all duration-300 hover:shadow-orange disabled:opacity-50"
                      whileTap={{ scale: 0.98 }}
                    >
                      {status === 'loading' ? 'GÖNDERİLİYOR...' : 'MESAJ GÖNDER'}
                    </motion.button>

                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.p className="text-center text-red-400/60 text-xs font-sans"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          Bir şeyler ters gitti. Lütfen tekrar deneyin.
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.form>
                ) : (
                  <motion.div key="success" className="flex flex-col items-center justify-center py-10 space-y-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
                  >
                    <Checkmark />
                    <p className="font-serif text-lg text-orange-gradient">Mesaj gönderildi</p>
                    <p className="font-sans text-[11px] text-white/20">En kısa sürede dönüş yapacağız</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Info — 2 cols, ultra minimal */}
            <div className="lg:col-span-2 space-y-4">
              <div className="relative overflow-hidden mb-6"
                style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 95%, 5% 100%)' }}
              >
                <iframe
                  src={BRAND.mapsEmbedUrl}
                  width="100%"
                  height="180"
                  style={{ border: 0, filter: 'grayscale(1) invert(1) contrast(0.9) brightness(0.7)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Batuhan Taşcı konum"
                />
              </div>

              <div className="space-y-2.5">
                {contactInfo.map((item, i) => (
                  <motion.a
                    key={i}
                    href={
                      item.text.startsWith('+')
                        ? `tel:${BRAND.phone}`
                        : item.text.includes('@')
                          ? `mailto:${BRAND.email}`
                          : undefined
                    }
                    className="flex items-center gap-2.5 py-1.5 group"
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    whileHover={{ x: 3 }}
                  >
                    <item.icon className="w-3 h-3 text-white/15 group-hover:text-orange/50 transition-colors flex-shrink-0" />
                    <span className="font-sans text-[10px] text-white/25 group-hover:text-white/45 transition-colors">
                      {item.text}
                    </span>
                  </motion.a>
                ))}
              </div>

              {/* Quick links */}
              <div className="flex gap-2 mt-6">
                <a
                  href={`https://wa.me/${BRAND.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 border border-[#25D366]/20 text-[#25D366]/50 text-[9px] tracking-[0.2em] uppercase hover:border-[#25D366]/40 hover:text-[#25D366] transition-all"
                >
                  WhatsApp
                </a>
                <a
                  href={`tel:${BRAND.phone}`}
                  className="flex-1 text-center py-2 border border-orange/20 text-orange/50 text-[9px] tracking-[0.2em] uppercase hover:border-orange/40 hover:text-orange transition-all"
                >
                  Ara
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
