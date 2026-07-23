'use client';

import { motion } from 'framer-motion';
import { Phone, Clock } from 'lucide-react';
import PageLayout from '@/components/barber/PageLayout';
import { ALL_SERVICES, BRAND } from '@/components/barber/data';

const tiers = [
  { name: 'Essential', price: '$55', description: 'Quick precision services for the modern gentleman on the go.', services: ['Beard Sculpture', 'Hair Tattoo'] },
  { name: 'Premium', price: '$85', description: 'Our most popular tier \u2014 crafted cuts and indulgent shaves.', services: ['Signature Cut', 'The Executive'] },
  { name: 'Signature', price: '$165', description: 'The ultimate NOIR experience. Transformation, redefined.', services: ["Gentleman's Ritual"] },
];

function WhatsAppLink({ children, message }: { children: React.ReactNode; message: string }) {
  return (
    <a
      href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-shine inline-flex items-center gap-2 bg-gold/10 border border-gold/30 text-gold px-4 py-2 text-[11px] tracking-[0.15em] uppercase hover:bg-gold/20 transition-all duration-300"
    >
      {children}
    </a>
  );
}

export default function PricingPage() {
  return (
    <PageLayout title="Pricing" subtitle="Transparent. Honest. Premium." number="03">
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20">
        {/* Services List */}
        <div className="space-y-4 md:space-y-6">
          {ALL_SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="glass light-reflection rounded-lg p-5 md:p-6 relative group hover:border-gold/30 transition-all duration-500"
            >
              {/* Popular Ribbon */}
              {service.id === 4 && (
                <div className="absolute -top-px right-6 bg-gold text-background text-[9px] tracking-[0.2em] uppercase font-bold px-4 py-1.5 rounded-b-md">
                  Most Popular
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                {/* Left: Number + Title */}
                <div className="flex items-center gap-4 md:w-1/2">
                  <span className="font-serif text-2xl md:text-3xl text-gold/20 select-none w-10">
                    {String(service.id).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="heading-editorial text-lg md:text-xl text-foreground">{service.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1 leading-relaxed max-w-md">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Right: Price + Duration + Book */}
                <div className="flex items-center gap-6 md:ml-auto">
                  <div className="text-right">
                    <span className="text-gold-gradient font-serif text-3xl md:text-4xl font-bold">
                      ${service.price}
                    </span>
                    <div className="flex items-center gap-1.5 justify-end mt-1">
                      <Clock className="w-3 h-3 text-gold/40" />
                      <span className="text-[11px] tracking-wider text-muted-foreground uppercase">{service.duration}</span>
                    </div>
                  </div>
                  <WhatsAppLink message={`Hi, I'd like to book the ${service.title}.`}>
                    <Phone className="w-3.5 h-3.5" />
                    Book Now
                  </WhatsAppLink>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Comparison Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 md:mt-28"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-gold/30 to-transparent" />
            <h2 className="heading-editorial text-xl md:text-2xl text-gold/70">Quick Comparison</h2>
            <div className="h-px flex-1 bg-gradient-to-l from-gold/30 to-transparent" />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`glass rounded-lg p-6 text-center ${i === 1 ? 'border-gold/30 shadow-gold' : ''}`}
              >
                <p className="text-[10px] tracking-[0.25em] uppercase text-gold/50 mb-3">{tier.name}</p>
                <p className="text-gold-gradient font-serif text-4xl md:text-5xl font-bold mb-2">{tier.price}</p>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">{tier.description}</p>
                <div className="space-y-2">
                  {tier.services.map((s) => (
                    <p key={s} className="text-xs text-foreground/70">{s}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-muted-foreground text-sm mb-4">Not sure which service is right for you?</p>
          <WhatsAppLink message="Hi, I'd like help choosing a service.">
            Not Sure? Chat With Us
          </WhatsAppLink>
        </motion.div>
      </section>
    </PageLayout>
  );
}
