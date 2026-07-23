'use client';

import SmoothScroll from '@/components/barber/SmoothScroll';
import Navigation from '@/components/barber/Navigation';
import Footer from '@/components/barber/Footer';
import StickyButtons from '@/components/barber/StickyButtons';
import { motion } from 'framer-motion';
import { BRAND } from '@/components/barber/data';

export default function CookiesPage() {
  return (
    <SmoothScroll>
      <Navigation />
      <StickyButtons />
      <main className="min-h-screen bg-[#0a0a0a] text-foreground">
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-mono text-[10px] tracking-[0.5em] text-orange/30 uppercase block mb-3">Yasal</span>
            <h1 className="heading-display text-3xl md:text-5xl text-orange-gradient mb-8">ÇEREZ POLİTİKASI</h1>
            <div className="space-y-6 text-[13px] text-white/30 leading-relaxed">
              <p><strong className="text-white/50">Son Güncelleme:</strong> 1 Ocak 2025</p>
              <h2 className="font-serif text-lg text-white/50 mt-8 mb-2">1. Çerez Nedir?</h2>
              <p>Çerezler, web sitelerinin tarayıcınızda depoladığı küçük metin dosyalarıdır. Site performansını ve kullanıcı deneyimini iyileştirmek için kullanılır.</p>
              <h2 className="font-serif text-lg text-white/50 mt-8 mb-2">2. Kullanılan Çerez Türleri</h2>
              <p>Zorunlu çerezler: Sitenin temel işlevleri için gereklidir. Analitik çerezler: Site kullanımını anlamamıza yardımcı olur. İşlevsel çerezler: Gelişmiş özellikler ve kişiselleştirme için kullanılır.</p>
              <h2 className="font-serif text-lg text-white/50 mt-8 mb-2">3. Çerez Yönetimi</h2>
              <p>Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilir veya silebilirsiniz. Ancak bu, bazı site özelliklerini etkileyebilir.</p>
              <h2 className="font-serif text-lg text-white/50 mt-8 mb-2">4. İletişim</h2>
              <p>Sorularınız için {BRAND.email} adresinden bize ulaşabilirsiniz.</p>
            </div>
          </motion.div>
        </div>
        <Footer />
      </main>
    </SmoothScroll>
  );
}
