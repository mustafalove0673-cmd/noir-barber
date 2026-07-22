'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineClock,
} from 'react-icons/hi2';
import { BRAND } from './data';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const contactInfo = [
  { icon: HiOutlineMapPin, text: BRAND.address },
  { icon: HiOutlinePhone, text: BRAND.phone },
  { icon: HiOutlineEnvelope, text: BRAND.email },
  { icon: HiOutlineClock, text: BRAND.hours },
];

function FloatingInput({
  label,
  name,
  type = 'text',
  value,
  onChange,
  required = false,
  multiline = false,
  delay = 0,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  multiline?: boolean;
  delay?: number;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  const sharedProps = {
    name,
    value,
    onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    required,
    className:
      'w-full bg-transparent border-b border-[rgba(201,169,110,0.2)] text-foreground font-sans text-base py-3 px-1 outline-none transition-all duration-300 placeholder-transparent',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="relative"
    >
      {multiline ? (
        <textarea
          {...sharedProps}
          rows={4}
          className={`${sharedProps.className} resize-none`}
        />
      ) : (
        <input type={type} {...sharedProps} />
      )}
      <label
        className={
          'absolute left-1 pointer-events-none transition-all duration-300 font-sans text-sm ' +
          (isActive
            ? '-top-2 text-gold text-xs tracking-wider uppercase'
            : 'top-3 text-muted-foreground')
        }
      >
        {label}
        {!required && (
          <span className="text-muted-foreground/50 ml-1 text-xs lowercase">
            (optional)
          </span>
        )}
      </label>
      {/* Focus glow line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-gold-gradient"
        initial={{ width: '0%' }}
        animate={{ width: focused ? '100%' : '0%' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </motion.div>
  );
}

function Checkmark() {
  return (
    <motion.svg
      viewBox="0 0 52 52"
      className="w-20 h-20"
      initial="hidden"
      animate="visible"
    >
      <motion.circle
        cx="26"
        cy="26"
        r="25"
        fill="none"
        stroke="#c9a96e"
        strokeWidth="2"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' } },
        }}
      />
      <motion.path
        fill="none"
        stroke="#c9a96e"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 0.5, delay: 0.5, ease: 'easeInOut' },
          },
        }}
      />
    </motion.svg>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const sectionRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 bg-background overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-6xl mx-auto mb-16 md:mb-20">
        <motion.p
          className="font-sans text-sm tracking-[0.3em] text-gold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          04
        </motion.p>
        <motion.h2
          className="heading-display text-4xl md:text-5xl lg:text-6xl text-gold-gradient mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          GET IN TOUCH
        </motion.h2>
        <motion.p
          className="font-sans text-muted-foreground text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We&apos;d love to hear from you
        </motion.p>
      </div>

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left: Contact Form */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-8"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.4 } }}
              >
                <FloatingInput
                  label="Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  delay={0}
                />
                <FloatingInput
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  delay={0.1}
                />
                <FloatingInput
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  delay={0.2}
                />
                <FloatingInput
                  label="Message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  multiline
                  delay={0.3}
                />

                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  className={
                    'w-full py-4 bg-gold text-background font-sans font-semibold text-sm tracking-[0.2em] uppercase btn-shine transition-all duration-300 ' +
                    (status === 'loading'
                      ? 'opacity-70 cursor-wait'
                      : 'hover:shadow-gold hover:brightness-110 active:scale-[0.98]')
                  }
                  whileTap={{ scale: 0.98 }}
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-3">
                      <motion.span
                        className="inline-block w-5 h-5 border-2 border-background border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                      SENDING...
                    </span>
                  ) : (
                    'SEND MESSAGE'
                  )}
                </motion.button>

                <AnimatePresence>
                  {status === 'error' && (
                    <motion.p
                      className="text-center text-red-400/80 text-sm font-sans"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      Something went wrong. Please try again.
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="flex flex-col items-center justify-center py-16 space-y-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }}
              >
                <Checkmark />
                <motion.p
                  className="heading-editorial text-xl text-gold-gradient"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  Message sent successfully
                </motion.p>
                <motion.p
                  className="font-sans text-muted-foreground text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                >
                  We&apos;ll get back to you soon
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Map + Info */}
        <div className="space-y-8">
          {/* Map */}
          <motion.div
            className="relative rounded-xl overflow-hidden"
            style={{
              boxShadow: '0 0 30px rgba(201,169,110,0.15), 0 0 60px rgba(201,169,110,0.05)',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <iframe
              src={BRAND.mapsEmbedUrl}
              width="100%"
              height="280"
              style={{ border: 0, filter: 'grayscale(1) invert(1) contrast(0.9) brightness(0.8)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="NOIR BARBER location map"
              className="rounded-xl"
            />
            <div className="absolute inset-0 rounded-xl border border-gold/20 pointer-events-none" />
          </motion.div>

          {/* Contact Info Cards */}
          <div className="space-y-4">
            {contactInfo.map((item, i) => (
              <motion.a
                key={i}
                href={
                  item.text.startsWith('+') || item.text.startsWith('(')
                    ? `tel:${BRAND.phone}`
                    : item.text.includes('@')
                      ? `mailto:${BRAND.email}`
                      : undefined
                }
                className={
                  'flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ' +
                  (item.text.includes('@') || item.text.startsWith('+') || item.text.startsWith('(')
                    ? 'cursor-pointer'
                    : 'cursor-default')
                }
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                whileHover={{ x: 8 }}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-gold/10">
                  <item.icon className="w-5 h-5 text-gold" />
                </div>
                <span className="font-sans text-sm text-foreground/80 leading-relaxed">
                  {item.text}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
