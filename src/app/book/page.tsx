'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SmoothScroll from '@/components/barber/SmoothScroll';
import Navigation from '@/components/barber/Navigation';
import Footer from '@/components/barber/Footer';
import StickyButtons from '@/components/barber/StickyButtons';
import { ALL_SERVICES, BRAND } from '@/components/barber/data';

export default function BookPage() {
  const [selectedService, setSelectedService] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Merhaba Batuhan, randevu almak istiyorum.\nHizmet: ${selectedService}\nTarih: ${date}\nSaat: ${time}\nİsim: ${name}\nTelefon: ${phone}`;
    window.open(`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <SmoothScroll>
      <Navigation />
      <StickyButtons />
      <main className="min-h-screen bg-[#0a0a0a] text-foreground overflow-x-hidden">
        {/* Hero */}
        <section className="px-6 md:px-12 lg:px-20 pt-32 pb-12">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="font-mono text-[10px] tracking-[0.5em] text-orange/30 uppercase block mb-3">Hızlı & Kolay</span>
              <h1 className="heading-display text-[clamp(3rem,8vw,7rem)] text-orange-gradient mb-3">RANDEVU</h1>
              <p className="font-sans text-sm text-white/20 tracking-wider">Tercih ettiğiniz hizmeti seçin, WhatsApp ile onaylayın</p>
            </motion.div>
          </div>
        </section>

        {/* Form */}
        <section className="px-6 md:px-12 lg:px-20 pb-20">
          <div className="max-w-2xl mx-auto">
            <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-8">
              {/* Service Select */}
              <div>
                <label className="font-sans text-[10px] tracking-[0.3em] text-orange/40 uppercase block mb-2">Hizmet Seçin</label>
                <select value={selectedService} onChange={e => setSelectedService(e.target.value)} required className="w-full bg-white/[0.03] border border-white/[0.08] text-white/60 font-sans text-sm py-3 px-4 outline-none focus:border-orange/30 transition-colors">
                  <option value="">Hizmet seçin...</option>
                  {ALL_SERVICES.map(s => <option key={s.id} value={s.title}>{s.title} — ₺{s.price} ({s.duration})</option>)}
                </select>
              </div>

              {/* Date + Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-sans text-[10px] tracking-[0.3em] text-orange/40 uppercase block mb-2">Tarih</label>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="w-full bg-white/[0.03] border border-white/[0.08] text-white/60 font-sans text-sm py-3 px-4 outline-none focus:border-orange/30 transition-colors [color-scheme:dark]" />
                </div>
                <div>
                  <label className="font-sans text-[10px] tracking-[0.3em] text-orange/40 uppercase block mb-2">Saat</label>
                  <select value={time} onChange={e => setTime(e.target.value)} required className="w-full bg-white/[0.03] border border-white/[0.08] text-white/60 font-sans text-sm py-3 px-4 outline-none focus:border-orange/30 transition-colors">
                    <option value="">Saat seçin...</option>
                    {['09:00','09:30','10:00','10:30','11:00','11:30','12:00','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Name + Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-sans text-[10px] tracking-[0.3em] text-orange/40 uppercase block mb-2">İsim</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Adınız" className="w-full bg-white/[0.03] border border-white/[0.08] text-white/60 font-sans text-sm py-3 px-4 outline-none focus:border-orange/30 transition-colors placeholder:text-white/10" />
                </div>
                <div>
                  <label className="font-sans text-[10px] tracking-[0.3em] text-orange/40 uppercase block mb-2">Telefon</label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required placeholder="0531..." className="w-full bg-white/[0.03] border border-white/[0.08] text-white/60 font-sans text-sm py-3 px-4 outline-none focus:border-orange/30 transition-colors placeholder:text-white/10" />
                </div>
              </div>

              {/* Info */}
              <div className="glass p-4 flex items-start gap-3">
                <span className="text-orange text-xs mt-0.5">ℹ</span>
                <p className="font-sans text-[11px] text-white/25 leading-relaxed">Randevu talebiniz WhatsApp ile iletilir. En kısa sürede onay我们会返回消息。</p>
              </div>

              {/* Submit */}
              <button type="submit" className="w-full py-3.5 bg-orange text-background font-sans text-[10px] font-semibold tracking-[0.25em] uppercase btn-shine hover:shadow-orange transition-all">
                WhatsApp ile Randevu Talep Et
              </button>
            </motion.form>
          </div>
        </section>
        <Footer />
      </main>
    </SmoothScroll>
  );
}
