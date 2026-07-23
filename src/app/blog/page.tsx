'use client';

import { motion } from 'framer-motion';
import SmoothScroll from '@/components/barber/SmoothScroll';
import Navigation from '@/components/barber/Navigation';
import Footer from '@/components/barber/Footer';
import StickyButtons from '@/components/barber/StickyButtons';
import { BLOG_POSTS, BRAND } from '@/components/barber/data';

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <SmoothScroll>
      <Navigation />
      <StickyButtons />
      <main className="min-h-screen bg-[#0a0a0a] text-foreground overflow-x-hidden">
        <section className="px-6 md:px-12 lg:px-20 pt-32 pb-10">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="font-mono text-[10px] tracking-[0.5em] text-orange/30 uppercase block mb-3">Bilgi & İpuçları</span>
              <h1 className="heading-display text-[clamp(3rem,8vw,7rem)] text-orange-gradient mb-3">BLOG</h1>
            </motion.div>
          </div>
        </section>

        {/* Featured */}
        <section className="px-6 md:px-12 lg:px-20 pb-16">
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 glass overflow-hidden hover:border-orange/20 transition-all duration-500">
              <img src={featured.image} alt={featured.title} className="w-full h-64 md:h-full object-cover" />
              <div className="p-8 flex flex-col justify-center">
                <span className="font-mono text-[9px] tracking-[0.3em] text-orange/40 uppercase mb-3">{featured.category} • {featured.date}</span>
                <h2 className="font-serif text-2xl text-white/70 mb-3">{featured.title}</h2>
                <p className="font-sans text-sm text-white/25 leading-relaxed mb-6">{featured.excerpt}</p>
                <span className="font-sans text-[10px] text-orange/50 uppercase tracking-wider">Devamını Oku →</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Grid */}
        <section className="px-6 md:px-12 lg:px-20 pb-20">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
            {rest.map((post, i) => (
              <motion.article key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass overflow-hidden group hover:border-orange/20 transition-all duration-500">
                <img src={post.image} alt={post.title} className="w-full h-48 object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="p-5">
                  <span className="font-mono text-[8px] tracking-[0.3em] text-orange/30 uppercase">{post.category} • {post.date}</span>
                  <h3 className="font-serif text-base text-white/60 mt-2 mb-2 group-hover:text-white/80 transition-colors">{post.title}</h3>
                  <p className="font-sans text-[11px] text-white/20 leading-relaxed">{post.excerpt}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
        <Footer />
      </main>
    </SmoothScroll>
  );
}
