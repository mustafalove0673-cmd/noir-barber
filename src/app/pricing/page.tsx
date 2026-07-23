'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock, Phone, ChevronDown } from 'lucide-react';
import SmoothScroll from '@/components/barber/SmoothScroll';
import Navigation from '@/components/barber/Navigation';
import Footer from '@/components/barber/Footer';
import StickyButtons from '@/components/barber/StickyButtons';
import { ALL_SERVICES, BRAND, FAQS } from '@/components/barber/data';

function usePriceCounter(target: number, inView: boolean) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1200, 1);
      setDisplay(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, inView]);
  return display;
}

function ServiceRow({ service, index }: { service: typeof ALL_SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const price = usePriceCounter(Number(service.price), inView);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative border-b border-white/[0.04] py-6 md:py-8 hover:bg-white/[0.01] transition-colors duration-500"
    >
      {/* Popular Badge */}
      {service.id === 4 && (
        <div className="absolute -top-px right-6 bg-orange text-background text-[8px] tracking-[0.25em] uppercase font-bold px-3 py-1">
          EN POPÜLER
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 px-2">
        {/* Left: Number + Title */}
        <div className="flex items-center gap-4 md:w-1/2">
          <span className="font-mono text-xl md:text-2xl text-orange/15 select-none w-10">{String(service.id).padStart(2, '0')}</span>
          <div>
            <h3 className="font-serif text-base md:text-lg text-white/70 group-hover:text-white/90 transition-colors">{service.title}</h3>
            <p className="font-sans text-[11px] text-white/20 mt-0.5 tracking-wider uppercase">{service.subtitle}</p>
          </div>
        </div>

        {/* Description (desktop) */}
        <p className="hidden lg:block text-[11px] text-white/20 leading-relaxed flex-1 max-w-xs">{service.description}</p>

        {/* Right: Price + Duration + Book */}
        <div className="flex items-center gap-6 md:ml-auto">
          <div className="text-right">
            <span className="font-serif text-2xl md:text-3xl text-orange-gradient font-bold">₺{price}</span>
            <div className="flex items-center gap-1 justify-end mt-0.5">
              <Clock className="w-3 h-3 text-orange/30" />
              <span className="font-mono text-[10px] text-white/15">{service.duration}</span>
            </div>
          </div>
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Merhaba Batuhan, ${service.title} hizmeti için randevu almak istiyorum.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-orange/10 border border-orange/20 text-orange/60 px-4 py-2 text-[9px] tracking-[0.15em] uppercase hover:bg-orange/20 hover:text-orange transition-all btn-shine"
          >
            <Phone className="w-3 h-3" />
            <span>Randevu</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function FAQItem({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="border-b border-white/[0.04]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 px-1 text-left group"
      >
        <span className="font-sans text-sm text-white/50 group-hover:text-white/70 transition-colors">{faq.q}</span>
        <ChevronDown className={`w-4 h-4 text-orange/30 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="pb-4 px-1 font-sans text-[12px] text-white/25 leading-relaxed">{faq.a}</p>
      </motion.div>
    </motion.div>
  );
}

export default function PricingPage() {
  return (
    <SmoothScroll>
      <Navigation />
      <StickyButtons />
      <main className="min-h-screen bg-[#0a0a0a] text-foreground overflow-x-hidden">
        {/* Hero */}
        <section className="relative pt-32 pb-12 md:pt-36 md:pb-16 px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="font-mono text-[10px] tracking-[0.5em] text-orange/30 uppercase block mb-3">03</span>
              <h1 className="heading-display text-[clamp(3rem,8vw,6rem)] text-orange-gradient mb-3">FİYATLAR</h1>
              <p className="font-sans text-sm text-white/20 tracking-wider max-w-md">Şeffaf. Dürüst. Premium.</p>
            </motion.div>
          </div>
        </section>

        {/* Services List */}
        <section className="px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="space-y-0">
              {ALL_SERVICES.map((service, i) => (
                <ServiceRow key={service.id} service={service} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 md:px-12 mt-20">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <span className="font-mono text-[10px] tracking-[0.4em] text-white/10 uppercase block mb-2">Sıkça Sorulanlar</span>
              <h2 className="heading-display text-2xl md:text-3xl text-orange-gradient">SSS</h2>
            </motion.div>
            <div>
              {FAQS.map((faq, i) => (
                <FAQItem key={i} faq={faq} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-sans text-sm text-white/25 mb-4">Hangi hizmeti seçeceğinden emin değil misin?</p>
            <a
              href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Merhaba Batuhan, hangi hizmeti seçmem gerektiği hakkında yardım alabilir miyim?')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange text-background text-[10px] font-semibold tracking-[0.2em] uppercase btn-shine hover:shadow-orange transition-all"
            >
              <Phone className="w-3 h-3" />
              Bizimle Konuş
            </a>
          </motion.div>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
