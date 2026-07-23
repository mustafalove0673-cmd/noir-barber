'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineClock,
} from 'react-icons/hi2';
import { RiWhatsappFill } from 'react-icons/ri';
import PageLayout from '@/components/barber/PageLayout';
import { BRAND } from '@/components/barber/data';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const contactInfo = [
  { icon: HiOutlineMapPin, text: BRAND.address, href: undefined },
  { icon: HiOutlinePhone, text: BRAND.phone, href: `tel:${BRAND.phone}` },
  { icon: HiOutlineEnvelope, text: BRAND.email, href: `mailto:${BRAND.email}` },
  { icon: HiOutlineClock, text: BRAND.hours, href: undefined },
];

function FloatingInput({ label, name, type = 'text', value, onChange, required = false, multiline = false, delay = 0 }: {
  label: string; name: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean; multiline?: boolean; delay?: number;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;
  const cls = 'w-full bg-transparent border-b border-gold/20 text-foreground font-sans text-base py-3 px-1 outline-none transition-all duration-300 placeholder-transparent';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative"
    >
      {multiline ? (
        <textarea name={name} value={value} onChange={onChange} rows={3} className={`${cls} resize-none`} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required={required} />
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} className={cls} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} required={required} />
      )}
      <label className={`absolute left-1 pointer-events-none transition-all duration-300 font-sans text-sm ${isActive ? '-top-2 text-gold text-xs tracking-wider uppercase' : 'top-3 text-foreground/30'}`}>
        {label}
        {!required && <span className="text-foreground/20 ml-1 text-xs lowercase">(optional)</span>}
      </label>
      <motion.div className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-gold to-gold-light" initial={{ width: '0%' }} animate={{ width: focused ? '100%' : '0%' }} transition={{ duration: 0.4 }} />
    </motion.div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      setStatus(data.success ? 'success' : 'error');
    } catch { setStatus('error'); }
  };

  return (
    <PageLayout title="Contact" subtitle="Get In Touch" number="05">
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-16 md:pb-24">
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-xl overflow-hidden mb-12 md:mb-16"
          style={{ boxShadow: '0 0 40px rgba(201,169,110,0.1)' }}
        >
          <iframe
            src={BRAND.mapsEmbedUrl}
            width="100%" height="300"
            style={{ border: 0, filter: 'grayscale(1) invert(1) contrast(0.9) brightness(0.8)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="NOIR BARBER location"
            className="rounded-xl"
          />
          <div className="absolute inset-0 rounded-xl border border-gold/20 pointer-events-none" />
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 md:mb-16">
          {contactInfo.slice(0, 3).map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, borderColor: 'rgba(201,169,110,0.4)' }}
              className="glass-strong rounded-xl p-5 text-center border border-transparent transition-all duration-300 hover:shadow-gold"
            >
              <item.icon className="w-5 h-5 text-gold mx-auto mb-3" />
              <p className="font-sans text-xs text-foreground/60 leading-relaxed">{item.text}</p>
            </motion.a>
          ))}
        </div>

        {/* Form + Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {status !== 'success' ? (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-6" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}>
                  <FloatingInput label="Name" name="name" value={form.name} onChange={handleChange} required delay={0} />
                  <FloatingInput label="Email" name="email" type="email" value={form.email} onChange={handleChange} required delay={0.05} />
                  <FloatingInput label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} delay={0.1} />
                  <FloatingInput label="Message" name="message" value={form.message} onChange={handleChange} required multiline delay={0.15} />
                  <motion.button type="submit" disabled={status === 'loading'}
                    className="w-full py-3.5 bg-gold text-background font-sans text-[11px] font-semibold uppercase tracking-[0.2em] btn-shine transition-all hover:shadow-gold disabled:opacity-60"
                    whileTap={{ scale: 0.98 }}>
                    {status === 'loading' ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span className="inline-block w-4 h-4 border-2 border-background border-t-transparent rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
                        SENDING...
                      </span>
                    ) : 'SEND MESSAGE'}
                  </motion.button>
                  {status === 'error' && <p className="text-center text-red-400/70 text-xs font-sans">Something went wrong. Please try again.</p>}
                </motion.form>
              ) : (
                <motion.div key="success" className="flex flex-col items-center justify-center py-12 space-y-4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                  <motion.svg viewBox="0 0 52 52" className="w-16 h-16"><motion.circle cx="26" cy="26" r="25" fill="none" stroke="#c9a96e" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6 }} /><motion.path fill="none" stroke="#c9a96e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" d="M14.1 27.2l7.1 7.2 16.7-16.8" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.5 }} /></motion.svg>
                  <p className="heading-editorial text-lg text-gold-gradient">Message Sent</p>
                  <p className="font-sans text-xs text-foreground/40">We&apos;ll get back to you shortly.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-strong rounded-xl p-6">
              <p className="font-sans text-[10px] tracking-[0.3em] text-gold/60 uppercase mb-3">Hours</p>
              <p className="font-sans text-sm text-foreground/70">{BRAND.hours}</p>
              <p className="font-sans text-xs text-foreground/30 mt-2">Closed Sundays</p>
            </div>

            <a
              href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Hi NOIR, I would like to book an appointment.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 glass-strong rounded-xl p-5 border border-gold/10 hover:border-gold/30 transition-all hover:shadow-gold group"
            >
              <span className="flex-shrink-0 w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                <RiWhatsappFill className="w-6 h-6 text-[#25D366]" />
              </span>
              <div>
                <p className="font-sans text-sm font-medium text-foreground/80 group-hover:text-gold transition-colors">Prefer WhatsApp?</p>
                <p className="font-sans text-xs text-foreground/40">Quick booking &amp; inquiries</p>
              </div>
            </a>

            <a
              href={`tel:${BRAND.phone}`}
              className="flex items-center gap-4 glass-strong rounded-xl p-5 border border-gold/10 hover:border-gold/30 transition-all hover:shadow-gold group"
            >
              <span className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                <HiOutlinePhone className="w-5 h-5 text-gold" />
              </span>
              <div>
                <p className="font-sans text-sm font-medium text-foreground/80 group-hover:text-gold transition-colors">Call Us Directly</p>
                <p className="font-sans text-xs text-foreground/40">{BRAND.phone}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
