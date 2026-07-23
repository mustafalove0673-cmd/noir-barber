'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineClock,
} from 'react-icons/hi2';
import { BRAND } from './data';

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
          (isActive ? '-top-2 text-gold text-[10px] tracking-wider uppercase' : 'top-3 text-white/20')
        }
      >
        {label}
      </label>
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gold-gradient"
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
      <motion.circle cx="26" cy="26" r="25" fill="none" stroke="#c9a96e" strokeWidth="2"
        variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 0.6 } } }} />
      <motion.path fill="none" stroke="#c9a96e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
        variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 0.5, delay: 0.5 } } }} />
    </motion.svg>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const sectionRef = useRef<HTMLDivElement>(null);

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
      {/* Full-bleed image background */}
      <div className="relative">
        <div className="absolute inset-0 bg-[#0a0a0a]">
          <img
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&q=80&auto=format&fit=crop"
            alt=""
            className="w-full h-full object-cover opacity-10"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-[#0a0a0a]/80" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <motion.p
              className="font-mono text-[10px] tracking-[0.4em] text-white/15 uppercase mb-3"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              04
            </motion.p>
            <motion.h2
              className="heading-display text-3xl md:text-4xl lg:text-5xl text-gold-gradient mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              GET IN TOUCH
            </motion.h2>
            <motion.p
              className="font-sans text-[11px] text-white/20 tracking-wider"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              We&apos;d love to hear from you
            </motion.p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Form */}
            <div className="relative">
              <AnimatePresence mode="wait">
                {status !== 'success' ? (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
                  >
                    <FloatingInput label="Name" name="name" value={form.name} onChange={handleChange} required delay={0} />
                    <FloatingInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} required delay={0.05} />
                    <FloatingInput label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} delay={0.1} />
                    <FloatingInput label="Message" name="message" value={form.message} onChange={handleChange} required multiline delay={0.15} />

                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-3 bg-gold text-background font-sans text-[10px] font-semibold tracking-[0.25em] uppercase btn-shine transition-all duration-300 hover:shadow-gold disabled:opacity-50"
                      whileTap={{ scale: 0.98 }}
                    >
                      {status === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}
                    </motion.button>

                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.p className="text-center text-red-400/60 text-xs font-sans"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          Something went wrong. Please try again.
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.form>
                ) : (
                  <motion.div key="success" className="flex flex-col items-center justify-center py-12 space-y-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1, transition: { duration: 0.5 } }}
                  >
                    <Checkmark />
                    <p className="font-serif text-lg text-gold-gradient">Message sent</p>
                    <p className="font-sans text-[11px] text-white/20">We&apos;ll get back to you soon</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Map + Info */}
            <div className="space-y-6">
              <motion.div
                className="relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.8 }}
              >
                <iframe
                  src={BRAND.mapsEmbedUrl}
                  width="100%"
                  height="240"
                  style={{ border: 0, filter: 'grayscale(1) invert(1) contrast(0.9) brightness(0.7)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="NOIR BARBER location"
                />
              </motion.div>

              <div className="space-y-3">
                {contactInfo.map((item, i) => (
                  <motion.a
                    key={i}
                    href={
                      item.text.startsWith('+') || item.text.startsWith('(')
                        ? `tel:${BRAND.phone}`
                        : item.text.includes('@')
                          ? `mailto:${BRAND.email}`
                          : undefined
                    }
                    className="flex items-center gap-3 py-2 group"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    whileHover={{ x: 4 }}
                  >
                    <item.icon className="w-3.5 h-3.5 text-white/15 group-hover:text-gold/50 transition-colors flex-shrink-0" />
                    <span className="font-sans text-[11px] text-white/30 group-hover:text-white/50 transition-colors">
                      {item.text}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
