'use client';

import { motion } from 'framer-motion';
import PageLayout from '@/components/barber/PageLayout';

const cookieSections = [
  {
    title: 'What Are Cookies',
    content: 'Cookies are small text files stored on your device when you visit our website. They help us enhance your browsing experience by remembering your preferences and enabling core functionality.',
  },
  {
    title: 'How We Use Cookies',
    content: 'We use cookies to analyze website traffic, improve our services, and provide a personalized experience. Cookies help us understand which pages are most popular and how visitors navigate our site.',
  },
  {
    title: 'Types of Cookies',
    rows: [
      { type: 'Essential', desc: 'Required for basic website functionality. These cannot be disabled.', status: 'Always Active' },
      { type: 'Analytics', desc: 'Help us understand how visitors interact with our website.', status: 'Optional' },
      { type: 'Marketing', desc: 'Used to deliver relevant advertisements and track campaign effectiveness.', status: 'Optional' },
    ],
  },
  {
    title: 'Managing Cookies',
    content: 'You can manage your cookie preferences through your browser settings. Most browsers allow you to block or delete cookies. Note that disabling cookies may affect website functionality.',
  },
  {
    title: 'Third-Party Cookies',
    content: 'Some cookies are placed by third-party services such as analytics tools. These cookies are governed by the respective third-party privacy policies, not this cookie policy.',
  },
  {
    title: 'Changes to This Policy',
    content: 'We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.',
  },
  {
    title: 'Contact',
    content: 'For any questions about our cookie practices, please contact us at hello@noirbarber.com.',
  },
];

export default function CookiePolicyPage() {
  return (
    <PageLayout title="Cookie Policy" subtitle="Legal" number="08">
      <div className="max-w-3xl mx-auto px-6 pt-10 pb-16 md:pb-24">
        {cookieSections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.03 }}
          >
            <h2 className="heading-editorial text-lg md:text-xl text-foreground mb-3">
              {i + 1}. {section.title}
            </h2>

            {section.rows ? (
              <div className="space-y-3 mb-8">
                {section.rows.map((row, ri) => (
                  <div key={ri} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 border-b border-foreground/5">
                    <span className="font-sans text-xs font-medium text-gold/70 uppercase tracking-wider sm:w-24 flex-shrink-0">{row.type}</span>
                    <span className="font-sans text-sm text-foreground/50 flex-1">{row.desc}</span>
                    <span className="font-sans text-[10px] tracking-wider text-foreground/30 uppercase flex-shrink-0">{row.status}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-sans text-sm text-foreground/60 leading-relaxed mb-8">{section.content}</p>
            )}

            {i < cookieSections.length - 1 && (
              <div className="h-px bg-gradient-to-r from-gold/15 to-transparent mb-8" />
            )}
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
}
