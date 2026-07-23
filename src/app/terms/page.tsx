'use client';

import SmoothScroll from '@/components/barber/SmoothScroll';
import Navigation from '@/components/barber/Navigation';
import Footer from '@/components/barber/Footer';
import StickyButtons from '@/components/barber/StickyButtons';
import { motion } from 'framer-motion';
import { BRAND } from '@/components/barber/data';

export default function TermsPage() {
  return (
    <SmoothScroll>
      <Navigation />
      <StickyButtons />
      <main className="min-h-screen bg-[#0a0a0a] text-foreground">
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-mono text-[10px] tracking-[0.5em] text-orange/30 uppercase block mb-3">Yasal</span>
            <h1 className="heading-display text-3xl md:text-5xl text-orange-gradient mb-8">KULLANIM ŞARTLARI</h1>
            <div className="space-y-6 text-[13px] text-white/30 leading-relaxed">
              <p><strong className="text-white/50">Son Güncelleme:</strong> 1 Ocak 2025</p>
              <h2 className="font-serif text-lg text-white/50 mt-8 mb-2">1. Kabul</h2>
              <p>Bu web sitesini kullanarak aşağıdaki kullanım şartlarını kabul etmiş sayılırsınız.</p>
              <h2 className="font-serif text-lg text-white/50 mt-8 mb-2">2. Hizmetler</h2>
              <p>{BRAND.name} web sitesi, randevu bilgilendirme ve iletişim amacıyla sunulmaktadır. Fiyatlar ve hizmetler değiştirilebilir.</p>
              <h2 className="font-serif text-lg text-white/50 mt-8 mb-2">3. Fikri Mülkiyet</h2>
              <p>Sitedeki tüm içerik (metin, görseller, tasarım) {BRAND.name}&apos;a aittir. İzinsiz kopyalanamaz veya yeniden kullanılamaz.</p>
              <h2 className="font-serif text-lg text-white/50 mt-8 mb-2">4. Sorumluluk Sınırı</h2>
              <p>Web sitemizdeki bilgiler genel bilgilendirme amaçlıdır. {BRAND.name} doğrudan veya dolaylı zararlardan sorumlu tutulamaz.</p>
              <h2 className="font-serif text-lg text-white/50 mt-8 mb-2">5. İletişim</h2>
              <p>Sorularınız için {BRAND.email} adresinden bize ulaşabilirsiniz.</p>
            </div>
          </motion.div>
        </div>
        <Footer />
      </main>
    </SmoothScroll>
  );
}
