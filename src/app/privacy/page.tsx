'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/barber/Navigation';
import SmoothScroll from '@/components/barber/SmoothScroll';
import StickyButtons from '@/components/barber/StickyButtons';
import Footer from '@/components/barber/Footer';
import { BRAND } from '@/components/barber/data';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const GoldDivider = () => (
  <div className="my-10 flex justify-center">
    <div
      className="w-full max-w-xs h-px"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)' }}
    />
  </div>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="heading-editorial text-2xl md:text-3xl text-gold font-semibold">{children}</h2>
);

export default function PrivacyPolicyPage() {
  return (
    <SmoothScroll>
      <Navigation />
      <StickyButtons />

      <main className="min-h-screen pt-28 pb-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Hero */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
          >
            <motion.p
              custom={0}
              variants={fadeInUp}
              className="text-xs tracking-[0.3em] text-gold/70 uppercase mb-4"
            >
              Last Updated: January 2025
            </motion.p>
            <motion.h1
              custom={1}
              variants={fadeInUp}
              className="heading-display text-5xl md:text-7xl lg:text-8xl text-gold-gradient"
            >
              PRIVACY POLICY
            </motion.h1>
            <motion.div
              custom={2}
              variants={fadeInUp}
              className="mt-6"
              style={{
                background: 'linear-gradient(90deg, transparent, #c9a96e, #d4af37, #c9a96e, transparent)',
                height: '1px',
              }}
            />
          </motion.div>

          {/* Intro */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm leading-relaxed text-foreground/80 mb-12"
          >
            At {BRAND.name}, we are committed to protecting your privacy. This Privacy Policy
            outlines how we collect, use, and safeguard your personal information when you visit
            our website or use our services.
          </motion.p>

          {/* Sections */}
          <motion.div
            initial="hidden"
            animate="visible"
          >
            <motion.div custom={0} variants={fadeInUp}>
              <SectionHeading>1. Information We Collect</SectionHeading>
              <p className="text-sm leading-relaxed text-foreground/80 mt-4">
                We collect information you provide directly to us, including your name, email address,
                phone number, and any other contact details you share when booking an appointment,
                signing up for our newsletter, or contacting us. We also collect information about your
                service preferences and grooming history to provide you with a personalized experience.
              </p>
            </motion.div>

            <GoldDivider />

            <motion.div custom={1} variants={fadeInUp}>
              <SectionHeading>2. How We Use Your Information</SectionHeading>
              <p className="text-sm leading-relaxed text-foreground/80 mt-4">
                We use your information to schedule and manage appointments, communicate with you about
                your bookings, send promotional offers and updates (with your consent), improve our
                services and customer experience, and comply with legal obligations. Your data enables
                us to deliver the luxury grooming experience you expect from {BRAND.name}.
              </p>
            </motion.div>

            <GoldDivider />

            <motion.div custom={2} variants={fadeInUp}>
              <SectionHeading>3. Information Sharing</SectionHeading>
              <p className="text-sm leading-relaxed text-foreground/80 mt-4">
                We do not sell, trade, or rent your personal information to third parties. We may share
                your information with trusted service providers who assist us in operating our business
                (such as payment processors or booking platforms), but only to the extent necessary for
                them to perform their services. We may also disclose information when required by law or
                to protect our rights.
              </p>
            </motion.div>

            <GoldDivider />

            <motion.div custom={3} variants={fadeInUp}>
              <SectionHeading>4. Data Security</SectionHeading>
              <p className="text-sm leading-relaxed text-foreground/80 mt-4">
                We implement industry-standard security measures to protect your personal information.
                This includes encrypted data transmission (SSL/TLS), secure storage of your data, and
                restricted access to personal information. While no system is completely secure, we
                continually review and update our security practices to ensure your data remains
                protected.
              </p>
            </motion.div>

            <GoldDivider />

            <motion.div custom={4} variants={fadeInUp}>
              <SectionHeading>5. Cookies</SectionHeading>
              <p className="text-sm leading-relaxed text-foreground/80 mt-4">
                Our website uses cookies to enhance your browsing experience. These include essential
                cookies required for the website to function, analytics cookies that help us understand
                how visitors interact with our site, and marketing cookies that allow us to deliver
                relevant content. For more details, please refer to our Cookie Policy.
              </p>
            </motion.div>

            <GoldDivider />

            <motion.div custom={5} variants={fadeInUp}>
              <SectionHeading>6. Your Rights</SectionHeading>
              <p className="text-sm leading-relaxed text-foreground/80 mt-4">
                You have the right to access, correct, or delete your personal information at any time.
                You may also request to opt out of marketing communications or request a copy of the
                data we hold about you. To exercise any of these rights, please contact us using the
                details provided below. We will respond to your request within 30 days.
              </p>
            </motion.div>

            <GoldDivider />

            <motion.div custom={6} variants={fadeInUp}>
              <SectionHeading>7. Changes to This Policy</SectionHeading>
              <p className="text-sm leading-relaxed text-foreground/80 mt-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices
                or for other operational, legal, or regulatory reasons. Any changes will be posted on
                this page with an updated revision date. We encourage you to review this policy
                periodically to stay informed about how we protect your information.
              </p>
            </motion.div>

            <GoldDivider />

            <motion.div custom={7} variants={fadeInUp}>
              <SectionHeading>8. Contact Us</SectionHeading>
              <div className="mt-4 space-y-2">
                <p className="text-sm leading-relaxed text-foreground/80">
                  If you have any questions about this Privacy Policy or your personal data, please
                  reach out to us:
                </p>
                <p className="text-sm text-foreground/80">
                  <span className="text-gold">{BRAND.name}</span><br />
                  {BRAND.address}<br />
                  Email: <a href={`mailto:${BRAND.email}`} className="text-gold hover:text-gold-light transition-colors">{BRAND.email}</a><br />
                  Phone: <a href={`tel:${BRAND.phone}`} className="text-gold hover:text-gold-light transition-colors">{BRAND.phone}</a>
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
