'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineChevronDown, HiOutlineMagnifyingGlass, HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { RiWhatsappFill } from 'react-icons/ri';
import { FAQS, BRAND } from '@/components/barber/data';
import Navigation from '@/components/barber/Navigation';
import SmoothScroll from '@/components/barber/SmoothScroll';
import StickyButtons from '@/components/barber/StickyButtons';
import Footer from '@/components/barber/Footer';

const CATEGORIES = ['All', 'General', 'Services', 'Booking', 'Products'] as const;
type Category = (typeof CATEGORIES)[number];

const faqCategoryMap: Record<number, Category> = {
  0: 'General',
  1: 'Products',
  2: 'Services',
  3: 'Booking',
  4: 'Booking',
  5: 'Products',
  6: 'General',
  7: 'Services',
};

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden rounded-sm border transition-all duration-500 ${
        isOpen
          ? 'border-gold/30 bg-gold/[0.03]'
          : 'border-border hover:border-gold/20'
      }`}
    >
      {/* Gold left border accent when open */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(180deg, #c9a96e, #d4af37, #e8d5a3)',
        }}
      />

      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
      >
        <span
          className={`font-sans text-sm md:text-base font-medium tracking-wide transition-colors duration-300 ${
            isOpen ? 'text-gold' : 'text-foreground/90'
          }`}
        >
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`flex-shrink-0 transition-colors duration-300 ${
            isOpen ? 'text-gold' : 'text-foreground/40'
          }`}
        >
          <HiOutlineChevronDown className="h-5 w-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pl-8">
              <div className="h-px w-8 mb-4" style={{ background: 'linear-gradient(90deg, rgba(201,169,110,0.3), transparent)' }} />
              <p className="font-sans text-sm leading-relaxed text-foreground/60">
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredFAQs = useMemo(() => {
    return FAQS.filter((faq, i) => {
      const matchesSearch =
        searchQuery === '' ||
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === 'All' || faqCategoryMap[i] === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const filteredIndices = useMemo(() => {
    return FAQS.reduce<number[]>((acc, faq, i) => {
      const matchesSearch =
        searchQuery === '' ||
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === 'All' || faqCategoryMap[i] === activeCategory;
      if (matchesSearch && matchesCategory) acc.push(i);
      return acc;
    }, []);
  }, [searchQuery, activeCategory]);

  const handleToggle = (filteredIdx: number) => {
    const realIdx = filteredIndices[filteredIdx];
    setOpenIndex(openIndex === realIdx ? null : realIdx);
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-background noise-overlay">
        <Navigation />
        <StickyButtons />

        {/* Hero */}
        <section className="relative flex flex-col items-center justify-center pt-32 pb-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="font-sans text-xs tracking-[0.3em] text-gold/70 uppercase mb-4">
              Common Questions
            </p>
            <h1 className="heading-display text-5xl md:text-7xl lg:text-8xl text-foreground">
              FAQ
            </h1>
            <div className="flex justify-center mt-6">
              <div className="h-px w-20" style={{ background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)' }} />
            </div>
          </motion.div>
        </section>

        {/* Search + Categories */}
        <section className="max-w-3xl mx-auto px-6 mb-12">
          {/* Search Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mb-8"
          >
            <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/30" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-sm bg-white/[0.03] border border-gold/10 py-3.5 pl-12 pr-4 font-sans text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-gold/30 focus:bg-white/[0.05] transition-all duration-300 backdrop-blur-md"
            />
          </motion.div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap items-center gap-2"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-sm px-4 py-2 font-sans text-xs tracking-wider uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gold text-background font-medium'
                    : 'bg-white/[0.03] text-foreground/50 border border-gold/10 hover:border-gold/25 hover:text-foreground/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </section>

        {/* FAQ Items */}
        <section className="max-w-3xl mx-auto px-6 pb-20">
          {filteredFAQs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="font-sans text-sm text-foreground/40">
                No questions found matching your search.
              </p>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredFAQs.map((faq, i) => (
                <FAQItem
                  key={filteredIndices[i]}
                  faq={faq}
                  index={i}
                  isOpen={openIndex === filteredIndices[i]}
                  onToggle={() => handleToggle(i)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Still Have Questions CTA */}
        <section className="relative py-20 px-6">
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, transparent, rgba(201,169,110,0.03), transparent)',
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative max-w-lg mx-auto text-center"
          >
            <HiOutlineChatBubbleLeftRight className="h-8 w-8 text-gold/50 mx-auto mb-6" />
            <h3 className="heading-editorial text-2xl md:text-3xl text-foreground mb-4">
              Still Have Questions?
            </h3>
            <p className="font-sans text-sm text-foreground/50 mb-8 leading-relaxed">
              Our team is always ready to help. Reach out on WhatsApp for a quick response.
            </p>
            <motion.a
              href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(
                'Hello NOIR, I have a question.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 rounded-sm bg-gold px-8 py-4 font-sans text-sm font-medium tracking-wider uppercase text-background transition-all duration-300 btn-shine hover:shadow-gold"
            >
              <RiWhatsappFill className="h-5 w-5" />
              Chat With Us
            </motion.a>
          </motion.div>
        </section>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
