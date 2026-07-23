'use client';

import { motion } from 'framer-motion';
import PageLayout from '@/components/barber/PageLayout';
import { BRAND } from '@/components/barber/data';

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

interface TermSection {
  number: string;
  title: string;
  content: React.ReactNode;
}

const sections: TermSection[] = [
  {
    number: '01',
    title: 'Acceptance of Terms',
    content: (
      <>
        <p className="font-sans text-sm text-foreground/70 leading-relaxed">
          By accessing and using the {BRAND.name} website and services, you acknowledge that you have read,
          understood, and agree to be bound by these Terms and Conditions. If you do not agree with any part
          of these terms, you must not use our website or services.
        </p>
        <p className="font-sans text-sm text-foreground/70 leading-relaxed mt-3">
          These terms apply to all visitors, clients, and users of our website. We reserve the right to
          update or modify these terms at any time without prior notice. Your continued use of the website
          following any changes constitutes acceptance of those changes.
        </p>
      </>
    ),
  },
  {
    number: '02',
    title: 'Services',
    content: (
      <>
        <p className="font-sans text-sm text-foreground/70 leading-relaxed">
          {BRAND.name} provides luxury grooming services including, but not limited to, haircuts, shaves,
          beard sculpting, scalp treatments, and full grooming rituals. All services are performed by our
          trained professionals to the highest standards of quality and hygiene.
        </p>
        <p className="font-sans text-sm text-foreground/70 leading-relaxed mt-3">
          The specific services available, their descriptions, durations, and pricing are listed on our
          website and may be updated periodically. We strive to provide accurate information, but we
          reserve the right to modify service offerings at any time.
        </p>
      </>
    ),
  },
  {
    number: '03',
    title: 'Booking & Cancellation',
    content: (
      <>
        <p className="font-sans text-sm text-foreground/70 leading-relaxed">
          Appointments can be booked through our website, WhatsApp, or by calling our atelier directly.
          All bookings are subject to availability. We recommend booking in advance to secure your
          preferred time slot and barber.
        </p>
        <p className="font-sans text-sm text-foreground/70 leading-relaxed mt-3">
          <span className="text-foreground/90 font-medium">Cancellation Policy:</span> We require at least
          24 hours notice for any cancellation or rescheduling. Cancellations made with less than 24 hours
          notice will incur a charge of 50% of the booked service price. No-shows will be charged at the
          full service price.
        </p>
        <p className="font-sans text-sm text-foreground/70 leading-relaxed mt-3">
          Late arrivals of more than 15 minutes may result in a shortened service or rescheduling at our
          discretion. The full service fee will still apply.
        </p>
      </>
    ),
  },
  {
    number: '04',
    title: 'Pricing & Payment',
    content: (
      <>
        <p className="font-sans text-sm text-foreground/70 leading-relaxed">
          All prices displayed on our website are in USD and include applicable taxes unless otherwise
          stated. We accept cash and major credit/debit cards. Payment is due at the time of service
          completion.
        </p>
        <p className="font-sans text-sm text-foreground/70 leading-relaxed mt-3">
          We reserve the right to adjust our pricing at any time. Changes in pricing will be reflected on
          our website. The price quoted at the time of booking confirmation will be honored for that
          specific appointment.
        </p>
        <p className="font-sans text-sm text-foreground/70 leading-relaxed mt-3">
          Gift cards and promotional vouchers are subject to their respective terms and conditions and
          cannot be exchanged for cash.
        </p>
      </>
    ),
  },
  {
    number: '05',
    title: 'Conduct',
    content: (
      <>
        <p className="font-sans text-sm text-foreground/70 leading-relaxed">
          We are committed to providing a refined, comfortable, and respectful environment for all
          clients and staff. We expect all visitors to conduct themselves in a manner that is considerate
          of others and consistent with the atmosphere of our atelier.
        </p>
        <p className="font-sans text-sm text-foreground/70 leading-relaxed mt-3">
          {BRAND.name} reserves the right to refuse service to any individual whose behavior is deemed
          disruptive, abusive, or inappropriate. This includes, but is not limited to, verbal abuse,
          harassment, intoxication, or any conduct that compromises the safety or comfort of our staff
          or other clients.
        </p>
      </>
    ),
  },
  {
    number: '06',
    title: 'Intellectual Property',
    content: (
      <>
        <p className="font-sans text-sm text-foreground/70 leading-relaxed">
          All content on this website, including but not limited to text, graphics, logos, images, audio
          clips, video clips, and software, is the property of {BRAND.name} and is protected by
          international copyright, trademark, and other intellectual property laws.
        </p>
        <p className="font-sans text-sm text-foreground/70 leading-relaxed mt-3">
          You may not reproduce, distribute, modify, create derivative works of, publicly display,
          publicly perform, republish, download, store, or transmit any of the material on our website
          without prior written consent from {BRAND.name}, except as expressly permitted by these terms.
        </p>
      </>
    ),
  },
  {
    number: '07',
    title: 'Limitation of Liability',
    content: (
      <>
        <p className="font-sans text-sm text-foreground/70 leading-relaxed">
          To the fullest extent permitted by applicable law, {BRAND.name} shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages arising from your use of
          our website or services, including but not limited to loss of profits, data, or goodwill.
        </p>
        <p className="font-sans text-sm text-foreground/70 leading-relaxed mt-3">
          Our liability for any claim arising from or related to our services shall not exceed the total
          amount paid by you for the specific service in question. This limitation applies regardless of
          the legal theory on which the claim is based.
        </p>
      </>
    ),
  },
  {
    number: '08',
    title: 'Governing Law',
    content: (
      <>
        <p className="font-sans text-sm text-foreground/70 leading-relaxed">
          These Terms and Conditions shall be governed by and construed in accordance with the laws of
          the State of New York, United States of America, without regard to its conflict of law
          provisions.
        </p>
        <p className="font-sans text-sm text-foreground/70 leading-relaxed mt-3">
          Any disputes arising from these terms or your use of our website and services shall be resolved
          exclusively in the courts located in New York County, New York. You consent to the personal
          jurisdiction of such courts and waive any objection to venue therein.
        </p>
      </>
    ),
  },
  {
    number: '09',
    title: 'Changes to Terms',
    content: (
      <>
        <p className="font-sans text-sm text-foreground/70 leading-relaxed">
          {BRAND.name} reserves the right to revise and update these Terms and Conditions at any time.
          Changes will become effective immediately upon being posted on this page. The date at the top
          of this page indicates when the terms were last revised.
        </p>
        <p className="font-sans text-sm text-foreground/70 leading-relaxed mt-3">
          We encourage you to review these terms periodically to stay informed of any updates. Your
          continued use of the website and services after changes are posted constitutes your acceptance
          of the revised terms.
        </p>
      </>
    ),
  },
  {
    number: '10',
    title: 'Contact',
    content: (
      <>
        <p className="font-sans text-sm text-foreground/70 leading-relaxed">
          If you have any questions or concerns about these Terms and Conditions, please contact us:
        </p>
        <div className="mt-4 space-y-2">
          <p className="font-sans text-sm text-foreground/80">
            <span className="text-gold">{BRAND.name}</span>
          </p>
          <p className="font-sans text-sm text-foreground/80">{BRAND.address}</p>
          <p className="font-sans text-sm text-foreground/80">
            Email:{' '}
            <a
              href={`mailto:${BRAND.email}`}
              className="text-gold hover:text-gold-light transition-colors duration-300"
            >
              {BRAND.email}
            </a>
          </p>
          <p className="font-sans text-sm text-foreground/80">
            Phone:{' '}
            <a
              href={`tel:${BRAND.phone}`}
              className="text-gold hover:text-gold-light transition-colors duration-300"
            >
              {BRAND.phone}
            </a>
          </p>
        </div>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <PageLayout title="Terms & Conditions" subtitle="Legal" number="07">
      <section className="max-w-3xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="space-y-0"
        >
          {sections.map((section, i) => (
            <motion.div
              key={section.number}
              custom={i}
              variants={fadeIn}
            >
              <div className="pb-10">
                <div className="flex items-start gap-4 md:gap-6">
                  <span className="font-serif text-3xl md:text-4xl font-bold text-gold/10 leading-none select-none flex-shrink-0">
                    {section.number}
                  </span>
                  <div className="flex-1">
                    <h2 className="heading-editorial text-foreground text-lg md:text-xl">
                      {section.title}
                    </h2>
                    <div className="mt-4">{section.content}</div>
                  </div>
                </div>
              </div>
              {i < sections.length - 1 && (
                <div className="h-px bg-gradient-to-r from-gold/20 to-transparent mb-0" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>
    </PageLayout>
  );
}
