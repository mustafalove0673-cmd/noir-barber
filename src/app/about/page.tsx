'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import PageLayout from '@/components/barber/PageLayout';
import { BRAND, IMAGES } from '@/components/barber/data';

function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const PHILOSOPHY = [
  {
    number: '01',
    title: 'Craftsmanship',
    description: "Every cut, every shave, every detail is treated as a work of art. We don't just groom \u2014 we create.",
    className: 'md:-rotate-1',
  },
  {
    number: '02',
    title: 'Precision',
    description: 'Surgical attention to detail. Every angle calculated, every line deliberate. Perfection is our baseline.',
    className: 'md:rotate-1',
  },
  {
    number: '03',
    title: 'Experience',
    description: 'From the moment you enter, every sense is engaged. The scent of premium products, the sound of carefully curated music, the touch of expert hands.',
    className: 'md:-rotate-[0.5deg]',
  },
];

const STATS = [
  { value: 2000, suffix: '+', label: 'Clients' },
  { value: 6, suffix: '+', label: 'Years' },
  { value: 4, suffix: '', label: 'Master Barbers' },
  { value: 5, suffix: '', label: 'Star Rating' },
];

export default function AboutPage() {
  const philosophyRef = useRef<HTMLDivElement>(null);
  const philosophyInView = useInView(philosophyRef, { once: true, margin: '-80px' });
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-50px' });
  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: '-80px' });
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: '-50px' });

  return (
    <PageLayout title="About" subtitle="Our Story" number="01">
      {/* ===== HERO IMAGE ===== */}
      <section className="relative w-full h-[50vh] md:h-[65vh] lg:h-[70vh] overflow-hidden">
        <motion.img
          src={IMAGES.about}
          alt="NOIR BARBER Atelier Interior"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/60" />

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-20 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-gold-gradient font-sans text-[11px] md:text-xs tracking-[0.25em] uppercase mb-3 block">
              Founded in {BRAND.founded}
            </span>
            <h2 className="heading-display text-3xl md:text-5xl lg:text-6xl text-foreground max-w-2xl leading-[0.95]">
              Where Tradition Meets{' '}
              <span className="text-gold-gradient">Modern Mastery</span>
            </h2>
            <p className="font-sans text-sm md:text-base text-foreground/60 mt-4 max-w-lg leading-relaxed">
              Born from a vision to elevate men&rsquo;s grooming into an art form, NOIR BARBER
              has redefined what it means to look and feel exceptional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== PHILOSOPHY SECTION ===== */}
      <section className="py-20 md:py-32 px-6 md:px-12" ref={philosophyRef}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={philosophyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14 md:mb-20"
          >
            <span className="font-sans text-[11px] tracking-[0.25em] text-gold/50 uppercase block mb-3">
              Our Philosophy
            </span>
            <h3 className="heading-editorial text-2xl md:text-4xl lg:text-5xl text-foreground">
              Three Pillars of <span className="text-gold-gradient">Perfection</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {PHILOSOPHY.map((item, i) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 40 }}
                animate={philosophyInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`glass shadow-gold rounded-lg p-8 md:p-10 ${item.className}`}
              >
                <span className="font-serif text-5xl md:text-6xl font-bold text-gold/10 select-none block mb-4">
                  {item.number}
                </span>
                <h4 className="heading-editorial text-xl md:text-2xl text-foreground mb-3">
                  {item.title}
                </h4>
                <p className="font-sans text-sm text-foreground/50 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="border-y border-gold/10" ref={statsRef}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-center"
              >
                <div className="heading-display text-3xl md:text-4xl lg:text-5xl text-gold-gradient mb-2">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                  />
                </div>
                <span className="font-sans text-[11px] md:text-xs tracking-[0.2em] text-foreground/40 uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUES / BRAND STORY ===== */}
      <section className="py-20 md:py-32 px-6 md:px-12" ref={valuesRef}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={valuesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="font-sans text-[11px] tracking-[0.25em] text-gold/50 uppercase block mb-4">
                The Brand
              </span>
              <h3 className="heading-editorial text-2xl md:text-3xl lg:text-4xl text-foreground mb-6">
                More Than a Barbershop.{' '}
                <span className="text-gold-gradient">An Atelier.</span>
              </h3>
              <div className="space-y-5 font-sans text-sm md:text-base text-foreground/50 leading-[1.8]">
                <p>
                  NOIR BARBER was conceived in the heart of New York City \u2014 a city that demands
                  excellence in every detail. We set out to build something that had never existed
                  before: a grooming space where every element, from the hand-selected products to the
                  carefully curated atmosphere, serves a singular purpose \u2014 to make you feel
                  extraordinary.
                </p>
                <p>
                  Our team of master barbers represents the finest talent in the industry. Each has
                  spent years perfecting their craft, studying the art of facial architecture, and
                  developing techniques that blend classical barbering with contemporary innovation.
                </p>
                <p>
                  We believe that how you present yourself to the world is a reflection of your
                  self-respect. At NOIR, we don&rsquo;t just cut hair \u2014 we craft confidence. Every visit
                  is a ritual, every service a masterpiece.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={valuesInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="glass-strong rounded-lg overflow-hidden shadow-gold">
                <img
                  src={IMAGES.services.grooming}
                  alt="NOIR BARBER grooming experience"
                  className="w-full h-[350px] md:h-[450px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 md:-left-10 glass-strong rounded-lg p-5 shadow-gold max-w-[220px]">
                <span className="text-gold-gradient font-serif text-3xl font-bold block mb-1">
                  {BRAND.founded}
                </span>
                <span className="font-sans text-[10px] tracking-[0.2em] text-foreground/40 uppercase">
                  Year Founded
                </span>
              </div>
              <div className="absolute top-6 -right-3 w-1 h-24 bg-gradient-to-b from-gold/40 via-gold to-gold/40 rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 md:py-28 px-6 md:px-12" ref={ctaRef}>
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-sans text-[11px] tracking-[0.25em] text-gold/50 uppercase block mb-4">
              Experience the Difference
            </span>
            <h3 className="heading-editorial text-2xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Visit Our <span className="text-gold-gradient">Atelier</span>
            </h3>
            <p className="font-sans text-sm text-foreground/40 max-w-md mx-auto mb-10 leading-relaxed">
              Step into a world where grooming becomes art. Book your appointment today and
              experience the NOIR difference firsthand.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://maps.google.com/?q=580+Fifth+Avenue+New+York"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex items-center gap-3 bg-gold text-background font-sans text-xs tracking-[0.15em] uppercase px-8 py-4 rounded-lg hover:bg-gold-light transition-colors duration-300"
              >
                Visit Our Atelier
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
              <a
                href={`https://wa.me/${BRAND.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex items-center gap-3 bg-[#25D366] text-white font-sans text-xs tracking-[0.15em] uppercase px-8 py-4 rounded-lg hover:bg-[#20bd5a] transition-colors duration-300"
              >
                Book on WhatsApp
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gold gradient divider */}
      <div
        className="h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #c9a96e 20%, #d4af37 50%, #c9a96e 80%, transparent)',
        }}
      />
    </PageLayout>
  );
}
