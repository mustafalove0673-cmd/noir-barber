'use client';

import SmoothScroll from '@/components/barber/SmoothScroll';
import Navigation from '@/components/barber/Navigation';
import Footer from '@/components/barber/Footer';
import StickyButtons from '@/components/barber/StickyButtons';
import { motion } from 'framer-motion';
import { BRAND } from '@/components/barber/data';

export default function PrivacyPage() {
  return (
    <SmoothScroll>
      <Navigation />
      <StickyButtons />
      <main className="min-h-screen bg-[#0a0a0a] text-foreground">
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-mono text-[10px] tracking-[0.5em] text-orange/30 uppercase block mb-3">Yasal</span>
            <h1 className="heading-display text-3xl md:text-5xl text-orange-gradient mb-8">GİZLİLİK POLİTİKASI</h1>
            <div className="space-y-6 text-[13px] text-white/30 leading-relaxed">
              <p><strong className="text-white/50">Son Güncelleme:</strong> 1 Ocak 2025</p>
              <h2 className="font-serif text-lg text-white/50 mt-8 mb-2">1. Veri Toplama</h2>
              <p>{BRAND.name} olarak web sitemizi ziyaret ettiğinizde kişisel bilgilerinizi (isim, telefon, e-posta) yalnızca randevu ve iletişim amacıyla toplarız. Bu bilgiler üçüncü taraflarla paylaşılmaz.</p>
              <h2 className="font-serif text-lg text-white/50 mt-8 mb-2">2. Çerezler</h2>
              <p>Web sitemiz kullanıcı deneyimini iyileştirmek için çerezler kullanır. Çerezleri tarayıcı ayarlarınızdan yönetebilirsiniz.</p>
              <h2 className="font-serif text-lg text-white/50 mt-8 mb-2">3. Veri Güvenliği</h2>
              <p>Kişisel verilerinizin güvenliğini sağlamak için endüstri standardı güvenlik önlemleri uygulanmaktadır.</p>
              <h2 className="font-serif text-lg text-white/50 mt-8 mb-2">4. İletişim</h2>
              <p>Gizlilik politikamızla ilgili sorularınız için {BRAND.email} adresinden bize ulaşabilirsiniz.</p>
            </div>
          </motion.div>
        </div>
        <Footer />
      </main>
    </SmoothScroll>
  );
}
