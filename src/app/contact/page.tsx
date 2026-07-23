'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineMapPin, HiOutlinePhone, HiOutlineEnvelope, HiOutlineClock } from 'react-icons/hi2';
import SmoothScroll from '@/components/barber/SmoothScroll';
import Navigation from '@/components/barber/Navigation';
import Footer from '@/components/barber/Footer';
import StickyButtons from '@/components/barber/StickyButtons';
import { BRAND } from '@/components/barber/data';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) setStatus('success');
    } catch { setStatus('idle'); }
  };

  const info = [
    { icon: HiOutlineMapPin, text: BRAND.address },
    { icon: HiOutlinePhone, text: BRAND.phone },
    { icon: HiOutlineEnvelope, text: BRAND.email },
    { icon: HiOutlineClock, text: BRAND.hours },
  ];

  return (
    <SmoothScroll>
      <Navigation />
      <StickyButtons />
      <main className="min-h-screen bg-[#0a0a0a] text-foreground overflow-x-hidden">
        <section className="px-6 md:px-12 lg:px-20 pt-32 pb-10">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="font-mono text-[10px] tracking-[0.5em] text-orange/30 uppercase block mb-3">04</span>
              <h1 className="heading-display text-[clamp(3rem,8vw,7rem)] text-orange-gradient mb-3">İLETİŞİM</h1>
            </motion.div>
          </div>
        </section>

        <section className="px-6 md:px-12 lg:px-20 pb-20">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {status !== 'success' ? (
                  <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <input name="name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required placeholder="İsim" className="w-full bg-white/[0.03] border-b border-white/10 text-white/60 font-sans text-sm py-3 px-1 outline-none focus:border-orange/40 transition-colors placeholder:text-white/10" />
                      <input name="phone" type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="Telefon" className="w-full bg-white/[0.03] border-b border-white/10 text-white/60 font-sans text-sm py-3 px-1 outline-none focus:border-orange/40 transition-colors placeholder:text-white/10" />
                    </div>
                    <input name="email" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required placeholder="E-posta" className="w-full bg-white/[0.03] border-b border-white/10 text-white/60 font-sans text-sm py-3 px-1 outline-none focus:border-orange/40 transition-colors placeholder:text-white/10" />
                    <textarea name="message" value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required placeholder="Mesajınız" rows={3} className="w-full bg-white/[0.03] border-b border-white/10 text-white/60 font-sans text-sm py-3 px-1 outline-none focus:border-orange/40 transition-colors resize-none placeholder:text-white/10" />
                    <button type="submit" disabled={status === 'loading'} className="w-full py-3 bg-orange text-background font-sans text-[10px] font-semibold tracking-[0.25em] uppercase btn-shine hover:shadow-orange transition-all disabled:opacity-50">
                      {status === 'loading' ? 'GÖNDERİLİYOR...' : 'MESAJ GÖNDER'}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-16">
                    <div className="w-16 h-16 rounded-full border-2 border-orange flex items-center justify-center mb-4">✓</div>
                    <p className="font-serif text-lg text-orange-gradient">Mesajınız gönderildi</p>
                    <p className="font-sans text-[11px] text-white/20 mt-2">En kısa sürede dönüş yapacağız</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Info + Map */}
            <div className="lg:col-span-2 space-y-6">
              <iframe src={BRAND.mapsEmbedUrl} width="100%" height="200" style={{ border: 0, filter: 'grayscale(1) invert(1) contrast(0.9) brightness(0.7)' }} allowFullScreen loading="lazy" title="Konum" />
              <div className="space-y-2.5">
                {info.map((item, i) => (
                  <a key={i} href={item.text.startsWith('+') ? `tel:${BRAND.phone}` : item.text.includes('@') ? `mailto:${BRAND.email}` : undefined} className="flex items-center gap-2.5 py-1.5 group">
                    <item.icon className="w-3 h-3 text-white/15 group-hover:text-orange/50 transition-colors flex-shrink-0" />
                    <span className="font-sans text-[10px] text-white/25 group-hover:text-white/45 transition-colors">{item.text}</span>
                  </a>
                ))}
              </div>
              <div className="flex gap-2">
                <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2 border border-[#25D366]/20 text-[#25D366]/50 text-[9px] tracking-[0.2em] uppercase hover:border-[#25D366]/40 hover:text-[#25D366] transition-all">WhatsApp</a>
                <a href={`tel:${BRAND.phone}`} className="flex-1 text-center py-2 border border-orange/20 text-orange/50 text-[9px] tracking-[0.2em] uppercase hover:border-orange/40 hover:text-orange transition-all">Ara</a>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </SmoothScroll>
  );
}
