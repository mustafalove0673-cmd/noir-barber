'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SmoothScroll from '@/components/barber/SmoothScroll';
import Navigation from '@/components/barber/Navigation';
import Footer from '@/components/barber/Footer';
import StickyButtons from '@/components/barber/StickyButtons';
import { FAQS } from '@/components/barber/data';

function FaqItem({ q, a, i }: { q: string; a: string; i: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="border-b border-white/[0.04]">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left group">
        <span className="font-sans text-sm text-white/45 group-hover:text-white/65 transition-colors">{q}</span>
        <ChevronDown className={`w-4 h-4 text-orange/25 transition-transform duration-300 flex-shrink-0 ml-4 ${open ? 'rotate-180' : ''}`} />
      </button>
      <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
        <p className="pb-5 font-sans text-[12px] text-white/20 leading-relaxed">{a}</p>
      </motion.div>
    </motion.div>
  );
}

export default function FaqPage() {
  return (
    <SmoothScroll>
      <Navigation />
      <StickyButtons />
      <main className="min-h-screen bg-[#0a0a0a] text-foreground overflow-x-hidden">
        <section className="px-6 md:px-12 lg:px-20 pt-32 pb-10">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="font-mono text-[10px] tracking-[0.5em] text-orange/30 uppercase block mb-3">Sık Sorulanlar</span>
              <h1 className="heading-display text-[clamp(3rem,8vw,7rem)] text-orange-gradient mb-3">SSS</h1>
            </motion.div>
          </div>
        </section>
        <section className="px-6 md:px-12 lg:px-20 pb-20">
          <div className="max-w-3xl mx-auto">
            {FAQS.map((faq, i) => <FaqItem key={i} q={faq.q} a={faq.a} i={i} />)}
          </div>
        </section>
        <Footer />
      </main>
    </SmoothScroll>
  );
}
