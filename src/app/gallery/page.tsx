'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiWhatsappFill, RiCloseLine } from 'react-icons/ri';
import { HiArrowDown } from 'react-icons/hi2';
import Navigation from '@/components/barber/Navigation';
import StickyButtons from '@/components/barber/StickyButtons';
import Footer from '@/components/barber/Footer';
import SmoothScroll from '@/components/barber/SmoothScroll';
import { IMAGES, BRAND } from '@/components/barber/data';

const categories = ['Tümü', 'Kesimler', 'Tıraş', 'İç Mekan', 'Detay'] as const;
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
  if (lower.includes('mekan') || lower.includes('atölye')) return 'İç Mekan';
  if (lower.includes('traş') || lower.includes('jilet')) return 'Tıraş';
  if (lower.includes('detay') || lower.includes('alet') || lower.includes('ürün')) return 'Detay';
  return 'Kesimler';
}

const galleryImages: GalleryImage[] = IMAGES.gallery.map((img) => ({
  ...img,
  category: assignCategory(img.alt),
}));

const ITEMS_INITIAL = 8;

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<Category>('Tümü');
  const [showCount, setShowCount] = useState(ITEMS_INITIAL);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string; index: number } | null>(null);

  const filtered = useMemo(() => {
    if (activeFilter === 'Tümü') return galleryImages;
    return galleryImages.filter((img) => img.category === activeFilter);
  }, [activeFilter]);

  const visible = filtered.slice(0, showCount);
  const hasMore = showCount < filtered.length;

  const handleLoadMore = () => setShowCount((p) => p + ITEMS_INITIAL);
  const handleFilterChange = (cat: Category) => { setActiveFilter(cat); setShowCount(ITEMS_INITIAL); };

  const openLightbox = (img: typeof galleryImages[0], index: number) => setLightbox({ src: img.src, alt: img.alt, index });
  const closeLightbox = () => setLightbox(null);

  const navigateLightbox = (dir: -1 | 1) => {
    if (!lightbox) return;
    const current = filtered.findIndex(img => img.src === lightbox.src);
    const next = (current + dir + filtered.length) % filtered.length;
    setLightbox({ src: filtered[next].src, alt: filtered[next].alt, index: next });
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
        <Navigation />

        <main className="flex-1 pt-32 pb-24">
          {/* Compact Hero */}
          <section className="relative mb-12 px-6 md:px-12">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-center space-y-3"
              >
                <span className="font-mono text-[10px] tracking-[0.5em] text-orange/40 uppercase block">Portfolyo</span>
                <h1 className="heading-display text-5xl md:text-7xl text-orange-gradient">GALERİ</h1>
                <p className="font-sans text-sm text-white/25 tracking-wider">Hassasiyet koleksiyonumuz</p>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 60 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-px bg-orange/30 mx-auto mt-4"
                />
              </motion.div>
            </div>
          </section>

          {/* Filter Tabs */}
          <section className="mb-10 px-6 md:px-12">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="flex flex-wrap items-center justify-center gap-2"
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleFilterChange(cat)}
                    className={`relative px-5 py-2 rounded-full text-[11px] uppercase tracking-[0.15em] font-medium transition-all duration-300 ${
                      activeFilter === cat ? 'text-background' : 'text-white/40 hover:text-white/60'
                    }`}
                  >
                    {activeFilter === cat && (
                      <motion.span
                        layoutId="galleryFilter"
                        className="absolute inset-0 rounded-full bg-orange"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
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
                  transition={{ duration: 0.3 }}
                  className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3"
                >
                  {visible.map((img, index) => (
                    <motion.div
                      key={`${img.src}-${img.alt}`}
                      layout
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      className="mb-3 break-inside-avoid"
                    >
                      <div
                        onClick={() => openLightbox(img, index)}
                        className="group relative overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-orange"
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                          style={{ aspectRatio: `${img.w}/${img.h}` }}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <p className="font-sans text-[9px] tracking-[0.2em] text-orange/50 uppercase mb-0.5">{img.category}</p>
                            <h3 className="font-serif text-base text-white/80">{img.alt}</h3>
                          </div>
                        </div>
                        <div className="absolute inset-0 border border-transparent group-hover:border-orange/20 transition-all duration-500 pointer-events-none" />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {hasMore && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex justify-center mt-10"
                >
                  <button
                    onClick={handleLoadMore}
                    className="group flex items-center gap-2 px-6 py-2.5 border border-orange/20 text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-orange hover:border-orange/40 transition-all btn-shine"
                  >
                    <span>Daha Fazla</span>
                    <HiArrowDown className="w-3 h-3 group-hover:translate-y-1 transition-transform" />
                  </button>
                </motion.div>
              )}
            </div>
          </section>

          {/* WhatsApp CTA */}
          <section className="mt-20 px-6 md:px-12">
            <div className="mx-auto max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-strong p-10 md:p-14 text-center relative"
                style={{ clipPath: 'polygon(2% 0%, 100% 0%, 98% 100%, 0% 100%)' }}
              >
                <RiWhatsappFill className="w-8 h-8 text-[#25D366] mx-auto mb-4" />
                <h3 className="font-serif text-xl md:text-2xl text-white/70 mb-2">Beğendin mi?</h3>
                <p className="font-sans text-sm text-white/25 mb-6">Bir stili beğendiysen WhatsApp&apos;tan ekran görüntüsü gönder, senin için yapıyoruz.</p>
                <a
                  href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Merhaba Batuhan, galerinizdeki bir stili beğendim ve randevu almak istiyorum.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-2.5 bg-[#25D366] text-white text-[10px] uppercase tracking-[0.15em] font-medium hover:shadow-[0_0_30px_rgba(37,211,102,0.3)] transition-all"
                >
                  <RiWhatsappFill className="w-4 h-4" />
                  WhatsApp ile İlet
                </a>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
        <StickyButtons />

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
              onClick={closeLightbox}
            >
              <button onClick={closeLightbox} className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-orange transition-colors">
                <RiCloseLine className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-orange transition-colors"
              >
                ←
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-orange transition-colors"
              >
                →
              </button>
              <motion.img
                key={lightbox.src}
                src={lightbox.src}
                alt={lightbox.alt}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="max-w-[90vw] max-h-[85vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <p className="font-sans text-[11px] text-white/30">{lightbox.alt}</p>
                <p className="font-mono text-[9px] text-white/15 mt-1">{lightbox.index + 1} / {filtered.length}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SmoothScroll>
  );
}
