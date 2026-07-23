'use client';

import { motion } from 'framer-motion';
import { RiArrowRightUpLine } from 'react-icons/ri';
import PageLayout from '@/components/barber/PageLayout';
import { BLOG_POSTS, BRAND } from '@/components/barber/data';

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <PageLayout title="Journal" subtitle="Insights & Stories" number="06">
      <div className="max-w-6xl mx-auto px-6 pt-10 pb-16 md:pb-24">
        {/* Featured Post */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-2xl overflow-hidden mb-10 md:mb-14 group cursor-pointer"
        >
          <div className="aspect-[21/9] md:aspect-[21/8]">
            <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-[10px] font-medium uppercase tracking-[0.2em] rounded-full mb-3 border border-gold/20">
              {featured.category}
            </span>
            <h2 className="heading-editorial text-xl md:text-3xl lg:text-4xl text-foreground mb-2 group-hover:text-gold transition-colors duration-300">
              {featured.title}
            </h2>
            <p className="font-sans text-sm text-foreground/50 max-w-xl mb-3">{featured.excerpt}</p>
            <div className="flex items-center gap-4">
              <span className="font-sans text-[10px] tracking-[0.15em] text-foreground/30 uppercase">{featured.date}</span>
              <span className="text-gold/40 group-hover:text-gold transition-colors"><RiArrowRightUpLine className="w-4 h-4" /></span>
            </div>
          </div>
        </motion.article>

        {/* Rest of Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {rest.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group cursor-pointer"
            >
              <div className="relative rounded-xl overflow-hidden mb-4 aspect-[16/9] img-zoom">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#0a0a0a]/0 group-hover:bg-[#0a0a0a]/30 transition-colors duration-500" />
                <div className="absolute inset-0 border border-transparent group-hover:border-gold/20 rounded-xl transition-colors duration-500" />
              </div>
              <span className="inline-block px-2.5 py-0.5 bg-gold/10 text-gold/70 text-[9px] font-medium uppercase tracking-[0.2em] rounded-full mb-2 border border-gold/10">
                {post.category}
              </span>
              <h3 className="heading-editorial text-lg md:text-xl text-foreground mb-1.5 group-hover:text-gold transition-colors duration-300">
                {post.title}
              </h3>
              <p className="font-sans text-xs text-foreground/40 leading-relaxed mb-2">{post.excerpt}</p>
              <div className="flex items-center gap-3">
                <span className="font-sans text-[10px] tracking-[0.15em] text-foreground/25 uppercase">{post.date}</span>
                <RiArrowRightUpLine className="w-3 h-3 text-gold/30 group-hover:text-gold transition-colors" />
              </div>
            </motion.article>
          ))}
        </div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 md:mt-20 text-center"
        >
          <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-gold/40 to-transparent mb-8" />
          <p className="font-sans text-xs tracking-[0.2em] text-foreground/30 uppercase mb-6">
            More Articles Coming Soon
          </p>
          <a
            href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Hi NOIR, I\'d like to visit the atelier.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold/10 border border-gold/30 text-gold text-[10px] font-medium uppercase tracking-[0.2em] rounded-full hover:bg-gold/20 transition-all"
          >
            Visit Our Atelier
          </a>
        </motion.div>
      </div>
    </PageLayout>
  );
}
