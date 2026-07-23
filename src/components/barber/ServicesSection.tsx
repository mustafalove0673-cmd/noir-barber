'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES, BRAND } from './data';

gsap.registerPlugin(ScrollTrigger);

function usePriceCounter(target: number, inView: boolean, duration = 1200) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setDisplay(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, inView, duration]);
  return display;
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const strips = gsap.utils.toArray<HTMLElement>('.service-strip');
    strips.forEach((strip, i) => {
      const fromX = i % 2 === 0 ? -100 : 100;
      gsap.fromTo(strip,
        { x: fromX, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: strip,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      );
    });

    const images = gsap.utils.toArray<HTMLElement>('.service-img');
    images.forEach((img) => {
      gsap.fromTo(img,
        { scale: 1.3 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: img,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section id="services" ref={sectionRef} className="relative overflow-hidden">
      {/* Section Header */}
      <div className="px-6 md:px-12 lg:px-20 pt-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-[10px] tracking-[0.4em] text-white/10 uppercase block mb-3">01</span>
          <h2 className="heading-display text-3xl md:text-4xl lg:text-5xl text-orange-gradient mb-2">HİZMETLERİMİZ</h2>
          <p className="font-sans text-[11px] text-white/20 tracking-wider max-w-md">
            Her hizmet, titizlikle hazırlanmış bir deneyimdir
          </p>
        </motion.div>
      </div>

      {/* Service Strips */}
      <div className="relative">
        {SERVICES.map((service, i) => (
          <ServiceStrip key={service.id} service={service} index={i} />
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6 md:px-12 lg:px-20 py-16"
      >
        <a
          href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Merhaba Batuhan, randevu almak istiyorum.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-7 py-3 bg-orange text-background font-sans text-[10px] font-semibold tracking-[0.25em] uppercase btn-shine transition-all duration-300 hover:shadow-orange"
        >
          <span>WHATSAPP İLE RANDEVU AL</span>
        </a>
        <a
          href="/pricing"
          className="inline-flex items-center gap-2.5 px-7 py-3 border border-white/12 text-white/50 font-sans text-[10px] font-semibold tracking-[0.25em] uppercase transition-all duration-300 hover:text-orange hover:border-orange/30"
        >
          <span>TÜM FİYATLARI GÖR</span>
        </a>
      </motion.div>
    </section>
  );
}

function ServiceStrip({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const price = usePriceCounter(Number(service.price), isInView);
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="service-strip relative w-full overflow-hidden border-t border-white/[0.04]">
      <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[70vh] md:min-h-[80vh]`}>
        {/* Image Side */}
        <div className={`relative overflow-hidden order-1 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          <img
            src={service.image}
            alt={service.title}
            className="service-img absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/40" />

          {/* Price badge on image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`absolute bottom-8 ${isEven ? 'right-8' : 'left-8'} z-10`}
          >
            <div className="glass-strong px-6 py-4 text-center">
              <span className="block font-sans text-[9px] tracking-[0.4em] text-white/20 uppercase mb-1">Başlangıç</span>
              <span className="block font-serif text-3xl text-orange-gradient leading-none">₺{price}</span>
              <span className="block font-sans text-[10px] text-white/20 mt-1 border border-white/[0.06] px-2 py-0.5 inline-block">{service.duration}</span>
            </div>
          </motion.div>
        </div>

        {/* Text Side */}
        <div className={`relative flex items-center order-2 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          <div className={`px-8 md:px-12 lg:px-16 xl:px-20 py-12 ${!isEven ? 'lg:text-right' : ''}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-mono text-[10px] tracking-[0.4em] text-white/10 uppercase block mb-4">0{index + 1}</span>
              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white/90 tracking-tight leading-tight mb-3">{service.title}</h3>
              <p className="font-sans text-[11px] tracking-[0.2em] text-orange/40 uppercase mb-5">{service.subtitle}</p>
              <p className="font-sans text-sm text-white/30 leading-relaxed max-w-md mb-8">{service.description}</p>
              <a
                href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Merhaba, ${service.title} hizmeti için randevu almak istiyorum.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-orange/20 px-6 py-2.5 text-[10px] font-medium tracking-[0.25em] uppercase text-orange/60 hover:text-orange hover:border-orange/40 transition-all duration-300"
              >
                <span>Randevu Al</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
