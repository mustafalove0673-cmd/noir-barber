'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import PageLayout from '@/components/barber/PageLayout';
import { TESTIMONIALS, BRAND } from '@/components/barber/data';

export default function ReviewsPage() {
  return (
    <PageLayout title="Reviews" subtitle="What Our Clients Say" number="04">
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-16 md:pb-24">
        {/* Rating Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="text-gold fill-gold" size={20} strokeWidth={1.5} />
            ))}
          </div>
          <p className="font-serif text-4xl md:text-5xl text-gold-gradient">5.0</p>
          <p className="font-sans text-xs tracking-[0.2em] text-foreground/40 mt-2">
            Average from 200+ Reviews
          </p>
        </motion.div>

        {/* Horizontal Scrolling Cards */}
        <div className="overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-hide">
          <div className="flex gap-5 w-max">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="w-[280px] md:w-[300px] snap-start flex-shrink-0"
              >
                <div className="glass-strong rounded-2xl p-6 h-full transition-all duration-500 hover:shadow-glow hover:border-gold/30 border border-transparent">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, si) => (
                      <Star key={si} className="text-gold fill-gold" size={14} strokeWidth={1.5} />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="font-serif italic text-foreground/80 text-sm leading-relaxed mb-6">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="mt-auto">
                    <p className="font-serif text-gold text-sm">{t.name}</p>
                    <p className="font-sans text-[10px] tracking-[0.2em] text-foreground/30 uppercase mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="w-[280px] md:w-[300px] snap-start flex-shrink-0"
            >
              <div className="glass-strong rounded-2xl p-6 h-full flex flex-col items-center justify-center text-center border border-gold/20">
                <p className="font-serif text-lg text-gold-gradient mb-2">Share Your Experience</p>
                <p className="font-sans text-xs text-foreground/40 mb-5">We value every voice.</p>
                <a
                  href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Hi NOIR, I want to share my experience!')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-gold text-background text-[10px] font-semibold uppercase tracking-[0.2em] btn-shine"
                >
                  Leave a Review
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-8" />
          <p className="font-sans text-xs tracking-[0.2em] text-foreground/40">
            Ready to join our community of distinguished gentlemen?
          </p>
        </motion.div>
      </div>
    </PageLayout>
  );
}
