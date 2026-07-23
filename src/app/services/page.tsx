'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiArrowRightLine } from 'react-icons/ri';
import PageLayout from '@/components/barber/PageLayout';
import { ALL_SERVICES, BRAND } from '@/components/barber/data';

const categories = [
  { key: 'all', label: 'All' },
  { key: 'cuts', label: 'Cuts' },
  { key: 'shaves', label: 'Shaves' },
  { key: 'treatments', label: 'Treatments' },
];

const categoryMap: Record<string, number[]> = {
  all: [1, 2, 3, 4, 5, 6, 7, 8],
  cuts: [1, 6],
  shaves: [2, 7],
  treatments: [3, 4, 5, 8],
};

export default function ServicesPage() {
  const [activeCat, setActiveCat] = useState('all');
  const filtered = ALL_SERVICES.filter((s) => categoryMap[activeCat]?.includes(s.id));

  return (
    <PageLayout title="Services" subtitle="Every Cut Tells a Story" number="02">
      {/* Filter Tabs */}
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-8">
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCat(cat.key)}
              className={`px-5 py-2 text-[11px] font-medium uppercase tracking-[0.2em] border transition-all duration-300 ${
                activeCat === cat.key
                  ? 'bg-gold/10 border-gold text-gold'
                  : 'border-foreground/10 text-foreground/40 hover:border-gold/30 hover:text-foreground/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services */}
      <div className="max-w-6xl mx-auto px-6 pb-16 md:pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-12 md:space-y-16"
          >
            {filtered.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className={`grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-0 items-center ${
                  i % 2 === 0 ? '' : 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1'
                }`}
              >
                {/* Image */}
                <motion.div
                  initial={{ x: i % 2 === 0 ? -40 : 40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className={`lg:col-span-3 relative img-zoom overflow-hidden ${
                    i % 2 === 0 ? 'lg:-mr-8' : 'lg:-ml-8'
                  }`}
                >
                  <div className="aspect-[16/10]">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/50" />
                  </div>
                  <div className="absolute top-4 left-4 font-sans text-xs tracking-[0.3em] text-gold/60">
                    0{service.id}
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ x: i % 2 === 0 ? 40 : -40, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className={`lg:col-span-2 relative z-10 space-y-4 ${
                    i % 2 === 0 ? 'lg:pl-8' : 'lg:pr-8 lg:text-right'
                  }`}
                >
                  <p className="font-sans text-[10px] tracking-[0.3em] text-gold/50 uppercase">
                    {service.subtitle}
                  </p>
                  <h3 className="heading-editorial text-2xl md:text-3xl lg:text-4xl text-foreground">
                    {service.title}
                  </h3>
                  <p className="font-sans text-sm text-foreground/50 leading-relaxed max-w-md">
                    {service.description}
                  </p>
                  <div className={`flex items-center gap-4 ${i % 2 === 0 ? '' : 'lg:justify-end'}`}>
                    <span className="font-serif text-3xl md:text-4xl text-gold-gradient">
                      ${service.price}
                    </span>
                    <span className="font-sans text-[10px] tracking-[0.2em] text-foreground/30 border border-foreground/10 px-3 py-1">
                      {service.duration}
                    </span>
                  </div>
                  <a
                    href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(`Hi NOIR, I'd like to book ${service.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.15em] text-gold hover:text-gold-light transition-colors group ${
                      i % 2 === 0 ? '' : 'lg:flex-row-reverse'
                    }`}
                  >
                    Book This Service
                    <RiArrowRightLine className={`text-sm transition-transform group-hover:translate-x-1 ${i % 2 === 0 ? '' : 'rotate-180 group-hover:-translate-x-1'}`} />
                  </a>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 md:mt-24 text-center"
        >
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-8" />
          <p className="heading-editorial text-xl md:text-2xl text-foreground mb-3">
            Can&apos;t Decide?
          </p>
          <p className="font-sans text-sm text-foreground/40 mb-8">
            Let our experts guide you to the perfect service.
          </p>
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Hi NOIR, I need help choosing a service.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-3 bg-gold text-background text-[11px] font-semibold uppercase tracking-[0.2em] btn-shine transition-all hover:shadow-gold"
          >
            Chat With Us
          </a>
        </motion.div>
      </div>
    </PageLayout>
  );
}
