'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiWhatsappFill } from 'react-icons/ri';
import { HiArrowDown } from 'react-icons/hi2';
import Navigation from '@/components/barber/Navigation';
import StickyButtons from '@/components/barber/StickyButtons';
import Footer from '@/components/barber/Footer';
import SmoothScroll from '@/components/barber/SmoothScroll';
import { IMAGES, BRAND } from '@/components/barber/data';

const categories = ['All', 'Cuts', 'Shaves', 'Interior', 'Detail'] as const;
type Category = (typeof categories)[number];

interface GalleryImage {
  src: string;
  alt: string;
  w: number;
  h: number;
  category: Category;
}

function assignCategory(alt: string): Category {
  const lower = alt.toLowerCase();
  if (lower.includes('interior') || lower.includes('atelier')) return 'Interior';
  if (lower.includes('shave') || lower.includes('razor')) return 'Shaves';
  if (lower.includes('detail') || lower.includes('tool') || lower.includes('product')) return 'Detail';
  return 'Cuts';
}

const galleryImages: GalleryImage[] = IMAGES.gallery.map((img) => ({
  ...img,
  category: assignCategory(img.alt),
}));

const ITEMS_INITIAL = 8;

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('All');
  const [showCount, setShowCount] = useState(ITEMS_INITIAL);

  const filtered = useMemo(() => {
    if (activeFilter === 'All') return galleryImages;
    return galleryImages.filter((img) => img.category === activeFilter);
  }, [activeFilter]);

  const visible = filtered.slice(0, showCount);
  const hasMore = showCount < filtered.length;

  const handleLoadMore = () => {
    setShowCount((prev) => prev + ITEMS_INITIAL);
  };

  const handleFilterChange = (cat: Category) => {
    setActiveFilter(cat);
    setShowCount(ITEMS_INITIAL);
  };

  return (
    <SmoothScroll>
      <div className="noise-overlay min-h-screen flex flex-col bg-background">
        <Navigation />

        <main className="flex-1 pt-32 pb-24">
          {/* Compact Hero */}
          <section className="relative mb-16 px-6 md:px-12">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-center space-y-4"
              >
                <p className="text-xs uppercase tracking-[0.4em] text-gold/70">
                  Portfolio
                </p>
                <h1 className="heading-display text-5xl md:text-7xl lg:text-8xl text-gold-gradient">
                  THE GALLERY
                </h1>
                <p className="font-sans text-base md:text-lg text-foreground/50 max-w-md mx-auto">
                  Our Portfolio of Precision
                </p>
                <div className="flex justify-center mt-6">
                  <div
                    className="w-32 h-px"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)',
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Filter Tabs */}
          <section className="mb-12 px-6 md:px-12">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap items-center justify-center gap-3"
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleFilterChange(cat)}
                    className={`relative px-6 py-2.5 rounded-full text-sm uppercase tracking-[0.15em] font-medium transition-all duration-400 ${
                      activeFilter === cat
                        ? 'text-background'
                        : 'text-foreground/50 hover:text-foreground/80'
                    }`}
                  >
                    {activeFilter === cat && (
                      <motion.span
                        layoutId="galleryFilter"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            'linear-gradient(135deg, #c9a96e, #d4af37)',
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Masonry Grid */}
          <section className="px-6 md:px-12">
            <div className="mx-auto max-w-7xl">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeFilter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 [column-fill:_balance]"
                >
                  {visible.map((img, index) => (
                    <motion.div
                      key={`${img.src}-${img.alt}`}
                      layout
                      initial={{ opacity: 0, y: 40, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="mb-4 break-inside-avoid"
                    >
                      <div className="group relative overflow-hidden rounded-2xl light-reflection glass cursor-pointer transition-all duration-500 hover:shadow-glow">
                        <div className="img-zoom relative">
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-auto block transition-all duration-700 group-hover:scale-110"
                            style={{
                              aspectRatio: `${img.w}/${img.h}`,
                            }}
                            loading="lazy"
                          />
                        </div>

                        <motion.div
                          initial={false}
                          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"
                        >
                          <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <p className="text-xs uppercase tracking-[0.2em] text-gold/70 mb-1">
                              {img.category}
                            </p>
                            <h3 className="heading-editorial text-xl text-foreground font-medium">
                              {img.alt}
                            </h3>
                            <div
                              className="mt-3 w-8 h-px"
                              style={{
                                background:
                                  'linear-gradient(90deg, #c9a96e, transparent)',
                              }}
                            />
                          </div>
                        </motion.div>

                        <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-gold/30 transition-all duration-500 pointer-events-none" />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Load More */}
              {hasMore && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex justify-center mt-12"
                >
                  <button
                    onClick={handleLoadMore}
                    className="group relative flex items-center gap-3 px-8 py-3.5 rounded-full border border-gold/30 text-sm uppercase tracking-[0.2em] text-foreground/70 hover:text-gold transition-all duration-400 hover:border-gold/60 btn-shine"
                  >
                    <span>Load More</span>
                    <HiArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
                  </button>
                </motion.div>
              )}
            </div>
          </section>

          {/* WhatsApp CTA */}
          <section className="mt-24 px-6 md:px-12">
            <div className="mx-auto max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8 }}
                className="relative rounded-3xl glass-strong p-10 md:p-14 text-center overflow-hidden"
              >
                <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold/30" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold/30" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold/30" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold/30" />

                <RiWhatsappFill className="w-10 h-10 text-[#25D366] mx-auto mb-5" />
                <h3 className="heading-editorial text-2xl md:text-3xl text-foreground mb-3">
                  Love a Style? Book It
                </h3>
                <p className="text-foreground/50 text-sm md:text-base max-w-md mx-auto mb-8">
                  Found something that inspires you? Send us a screenshot on WhatsApp and
                  we will make it yours.
                </p>
                <motion.a
                  href={`https://wa.me/${BRAND.whatsapp}?text=Hi%20NOIR%20BARBER!%20I%20saw%20a%20style%20in%20your%20gallery%20and%20I%27d%20love%20to%20book%20it.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#25D366] text-white text-sm uppercase tracking-[0.15em] font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(37,211,102,0.3)]"
                >
                  <RiWhatsappFill className="w-5 h-5" />
                  Book on WhatsApp
                </motion.a>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
        <StickyButtons />
      </div>
    </SmoothScroll>
  );
}
