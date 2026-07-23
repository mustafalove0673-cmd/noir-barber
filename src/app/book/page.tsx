'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineClock, HiOutlineCheck, HiOutlineGift, HiOutlinePhone } from 'react-icons/hi2';
import { RiWhatsappFill } from 'react-icons/ri';
import { ALL_SERVICES, BRAND } from '@/components/barber/data';
import Navigation from '@/components/barber/Navigation';
import SmoothScroll from '@/components/barber/SmoothScroll';
import StickyButtons from '@/components/barber/StickyButtons';
import Footer from '@/components/barber/Footer';

const TIME_SLOTS = [
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
];

function getAvailableDates(): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0) {
      dates.push(d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    }
  }
  return dates;
}

const DATES = getAvailableDates();

function FloatingInput({
  label,
  type = 'text',
  value,
  onChange,
  name,
  required = true,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  name: string;
  required?: boolean;
}) {
  const hasValue = value.length > 0;
  return (
    <div className="relative">
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="peer w-full rounded-sm border border-gold/15 bg-white/[0.02] px-4 pt-6 pb-2 font-sans text-sm text-foreground focus:outline-none focus:border-gold/40 transition-all duration-300 placeholder-transparent"
        placeholder={label}
      />
      <label
        htmlFor={name}
        className={`absolute left-4 transition-all duration-300 pointer-events-none font-sans text-sm ${
          hasValue
            ? 'top-2 text-gold/70 text-[10px] tracking-wider uppercase'
            : 'top-1/2 -translate-y-1/2 text-foreground/40'
        } peer-focus:top-2 peer-focus:text-gold/70 peer-focus:text-[10px] peer-focus:tracking-wider peer-focus:uppercase peer-focus:-translate-y-0`}
      >
        {label}
      </label>
    </div>
  );
}

export default function BookPage() {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [requests, setRequests] = useState('');
  const [isGift, setIsGift] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedServiceData = useMemo(
    () => ALL_SERVICES.find((s) => s.id === selectedService),
    [selectedService]
  );

  const buildWhatsAppMessage = () => {
    const lines = ['NOIR BARBER — Booking Request'];
    lines.push('');
    if (selectedServiceData) {
      lines.push(`Service: ${selectedServiceData.title} ($${selectedServiceData.price})`);
    }
    if (selectedDate) lines.push(`Date: ${selectedDate}`);
    if (selectedTime) lines.push(`Time: ${selectedTime}`);
    lines.push(`Name: ${name}`);
    lines.push(`Phone: ${phone}`);
    if (email) lines.push(`Email: ${email}`);
    if (isGift) lines.push('This is a gift card booking');
    if (requests) lines.push(`Special Requests: ${requests}`);
    return encodeURIComponent(lines.join('\n'));
  };

  const handleSubmit = () => {
    const msg = buildWhatsAppMessage();
    window.open(`https://wa.me/${BRAND.whatsapp}?text=${msg}`, '_blank');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const isValid = selectedService && selectedDate && selectedTime && name && phone;

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-background noise-overlay">
        <Navigation />
        <StickyButtons />

        {/* Hero */}
        <section className="relative flex flex-col items-center justify-center pt-32 pb-12 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="font-sans text-xs tracking-[0.3em] text-gold/70 uppercase mb-4">
              Choose Your Experience
            </p>
            <h1 className="heading-display text-4xl md:text-6xl lg:text-7xl text-foreground">
              BOOK YOUR
            </h1>
            <h1 className="heading-display text-4xl md:text-6xl lg:text-7xl text-gold-gradient mt-1">
              APPOINTMENT
            </h1>
            <div className="flex justify-center mt-6">
              <div className="h-px w-20" style={{ background: 'linear-gradient(90deg, transparent, #c9a96e, transparent)' }} />
            </div>
          </motion.div>
        </section>

        <main className="max-w-5xl mx-auto px-6 pb-24">
          {/* Service Selector */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="font-sans text-xs tracking-[0.3em] text-gold/60 uppercase mb-6">
              01 — Select Service
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {ALL_SERVICES.map((service, i) => (
                <motion.button
                  key={service.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => setSelectedService(service.id)}
                  className={`relative group text-left rounded-sm border p-5 transition-all duration-400 ${
                    selectedService === service.id
                      ? 'border-gold bg-gold/[0.06] shadow-gold'
                      : 'border-border bg-white/[0.01] hover:border-gold/25 hover:bg-white/[0.03]'
                  }`}
                >
                  {selectedService === service.id && (
                    <motion.div
                      layoutId="service-check"
                      className="absolute top-3 right-3 flex items-center justify-center w-5 h-5 rounded-full bg-gold"
                      initial={false}
                    >
                      <HiOutlineCheck className="h-3 w-3 text-background" />
                    </motion.div>
                  )}
                  <p className={`font-sans text-[10px] tracking-widest uppercase mb-2 transition-colors ${
                    selectedService === service.id ? 'text-gold' : 'text-foreground/30'
                  }`}>
                    {service.subtitle}
                  </p>
                  <h3 className={`font-serif text-sm md:text-base font-medium mb-3 transition-colors ${
                    selectedService === service.id ? 'text-gold' : 'text-foreground/90'
                  }`}>
                    {service.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-lg font-medium text-foreground/80">
                      ${service.price}
                    </span>
                    <span className="flex items-center gap-1 font-sans text-[11px] text-foreground/40">
                      <HiOutlineClock className="h-3.5 w-3.5" />
                      {service.duration}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.section>

          {/* Date Selector */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-sans text-xs tracking-[0.3em] text-gold/60 uppercase mb-6">
              02 — Pick a Date
            </h2>
            <div className="flex flex-wrap gap-2">
              {DATES.map((date, i) => (
                <motion.button
                  key={date}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                  onClick={() => setSelectedDate(date)}
                  className={`rounded-sm px-4 py-2.5 font-sans text-xs tracking-wide transition-all duration-300 ${
                    selectedDate === date
                      ? 'bg-gold text-background font-medium'
                      : 'bg-white/[0.03] text-foreground/50 border border-gold/10 hover:border-gold/25 hover:text-foreground/70'
                  }`}
                >
                  {date}
                </motion.button>
              ))}
            </div>
          </motion.section>

          {/* Time Selector */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="font-sans text-xs tracking-[0.3em] text-gold/60 uppercase mb-6">
              03 — Choose a Time
            </h2>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2">
              {TIME_SLOTS.map((time, i) => (
                <motion.button
                  key={time}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.015 }}
                  onClick={() => setSelectedTime(time)}
                  className={`rounded-sm py-2.5 font-sans text-[11px] tracking-wide transition-all duration-300 ${
                    selectedTime === time
                      ? 'bg-gold text-background font-medium'
                      : 'bg-white/[0.03] text-foreground/50 border border-gold/10 hover:border-gold/25 hover:text-foreground/70'
                  }`}
                >
                  {time}
                </motion.button>
              ))}
            </div>
          </motion.section>

          {/* Form Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="font-sans text-xs tracking-[0.3em] text-gold/60 uppercase mb-8">
              04 — Your Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <FloatingInput label="Full Name" name="name" value={name} onChange={setName} />
              <FloatingInput label="Phone Number" name="phone" type="tel" value={phone} onChange={setPhone} />
              <FloatingInput label="Email Address" name="email" type="email" value={email} onChange={setEmail} required={false} />
            </div>

            {/* Special Requests */}
            <div className="relative mb-6">
              <textarea
                id="requests"
                value={requests}
                onChange={(e) => setRequests(e.target.value)}
                rows={3}
                placeholder="Special Requests"
                className="peer w-full rounded-sm border border-gold/15 bg-white/[0.02] px-4 pt-6 pb-2 font-sans text-sm text-foreground focus:outline-none focus:border-gold/40 transition-all duration-300 placeholder-transparent resize-none"
              />
              <label
                htmlFor="requests"
                className={`absolute left-4 transition-all duration-300 pointer-events-none font-sans text-sm ${
                  requests.length > 0
                    ? 'top-2 text-gold/70 text-[10px] tracking-wider uppercase'
                    : 'top-4 text-foreground/40'
                } peer-focus:top-2 peer-focus:text-gold/70 peer-focus:text-[10px] peer-focus:tracking-wider peer-focus:uppercase`}
              >
                Special Requests (optional)
              </label>
            </div>

            {/* Gift Card Toggle */}
            <div className="mb-8">
              <button
                onClick={() => setIsGift(!isGift)}
                className={`flex items-center gap-4 rounded-sm border px-5 py-4 w-full text-left transition-all duration-300 ${
                  isGift
                    ? 'border-gold/30 bg-gold/[0.05]'
                    : 'border-border hover:border-gold/20'
                }`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 ${
                    isGift ? 'bg-gold border-gold' : 'border-gold/20'
                  }`}
                >
                  <HiOutlineGift className={`h-5 w-5 transition-colors ${isGift ? 'text-background' : 'text-gold/50'}`} />
                </div>
                <div>
                  <p className={`font-sans text-sm font-medium transition-colors ${isGift ? 'text-gold' : 'text-foreground/80'}`}>
                    This is a Gift Card Booking
                  </p>
                  <p className="font-sans text-xs text-foreground/40 mt-0.5">
                    Purchasing this service as a gift for someone
                  </p>
                </div>
              </button>
            </div>

            {/* Submit */}
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-8 rounded-sm border border-gold/20 bg-gold/[0.03]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                    className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center mb-4"
                  >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <motion.path
                        d="M6 14L12 20L22 8"
                        stroke="#c9a96e"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      />
                    </svg>
                  </motion.div>
                  <p className="font-sans text-sm text-gold tracking-wide">
                    Opening WhatsApp...
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col sm:flex-row items-center gap-4"
                >
                  <motion.button
                    onClick={handleSubmit}
                    disabled={!isValid}
                    whileHover={isValid ? { scale: 1.02 } : undefined}
                    whileTap={isValid ? { scale: 0.98 } : undefined}
                    className={`flex items-center gap-3 rounded-sm px-10 py-4 font-sans text-sm font-medium tracking-wider uppercase transition-all duration-300 btn-shine ${
                      isValid
                        ? 'bg-gold text-background hover:shadow-gold'
                        : 'bg-white/[0.03] text-foreground/20 cursor-not-allowed border border-gold/10'
                    }`}
                  >
                    <RiWhatsappFill className="h-5 w-5" />
                    Book via WhatsApp
                  </motion.button>
                  <span className="font-sans text-xs text-foreground/30">
                    {isValid ? 'You will be redirected to WhatsApp' : 'Please fill all required fields'}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>

          {/* Prefer to Book by Phone */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-sm border border-gold/10 bg-white/[0.01] p-8 text-center"
          >
            <HiOutlinePhone className="h-8 w-8 text-gold/40 mx-auto mb-4" />
            <h3 className="heading-editorial text-xl md:text-2xl text-foreground mb-2">
              Prefer to Book by Phone?
            </h3>
            <p className="font-sans text-sm text-foreground/50 mb-6">
              Call us directly and we will arrange everything for you.
            </p>
            <motion.a
              href={`tel:${BRAND.phone}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 rounded-sm border border-gold/30 px-8 py-4 font-sans text-sm font-medium tracking-wider uppercase text-gold transition-all duration-300 hover:bg-gold/10 hover:shadow-gold"
            >
              <HiOutlinePhone className="h-5 w-5" />
              {BRAND.phone}
            </motion.a>
          </motion.section>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
