'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { RiWhatsappFill } from 'react-icons/ri';
import { IMAGES, BRAND } from './data';

const HEADING_CHARS = 'NOIR'.split('');

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.5,
    },
  },
};

const charVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(
    useTransform(mouseX, [0, 1], [20, -20]),
    { stiffness: 50, damping: 30 }
  );
  const springY = useSpring(
    useTransform(mouseY, [0, 1], [20, -20]),
    { stiffness: 50, damping: 30 }
  );

  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scrollLineHeight = useTransform(scrollYProgress, [0, 0.15], [60, 0]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };

  const handleBooking = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden"
      id="hero"
    >
      {/* Background Image with Ken Burns + Parallax */}
      <div className="absolute inset-0">
        <motion.img
          src={IMAGES.hero}
          alt="NOIR Barber"
          className="h-full w-full object-cover"
          style={{ x: springX, y: springY }}
          animate={{ scale: [1, 1.15] }}
          transition={{
            duration: 20,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        {/* Dark overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(10,10,10,1) 0%, rgba(10,10,10,0.7) 40%, rgba(10,10,10,0.3) 100%)',
          }}
        />
      </div>

      {/* Main Content — bottom-left */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-20 pt-32 md:px-16 lg:px-24 lg:pb-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* NOIR — character reveal heading */}
          <div className="overflow-hidden">
            <motion.h1 className="heading-display text-[clamp(4rem,12vw,10rem)] leading-none">
              {HEADING_CHARS.map((char, i) => (
                <motion.span
                  key={i}
                  variants={charVariants}
                  className="inline-block text-gold-gradient"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* BARBER subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 font-serif text-[clamp(1.5rem,4vw,3rem)] font-light tracking-[0.3em] text-white/60"
          >
            BARBER
          </motion.p>

          {/* Animated gold line separator */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 h-px"
            style={{
              background:
                'linear-gradient(90deg, #c9a96e 0%, #d4af37 50%, transparent 100%)',
            }}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5, ease: 'easeOut' }}
            className="mt-6 text-xs font-medium uppercase tracking-[0.5em] text-gold"
          >
            WHERE PRECISION MEETS ARTISTRY
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.8, ease: 'easeOut' }}
            className="mt-10"
          >
            <motion.button
              onClick={handleBooking}
              className="btn-shine relative border border-gold/30 bg-gold px-10 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-black transition-all duration-300"
              whileHover={{
                scale: 1.03,
                boxShadow:
                  '0 0 60px rgba(201,169,110,0.15), 0 0 120px rgba(201,169,110,0.08)',
              }}
              whileTap={{ scale: 0.98 }}
            >
              BOOK YOUR EXPERIENCE
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating booking card — bottom right (desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="animate-float absolute bottom-24 right-6 hidden lg:right-24 lg:block"
        >
          <div className="glass shadow-gold relative px-6 py-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-foreground/40">
              Next Available
            </p>
            <p className="mt-1 font-serif text-lg text-foreground/90">
              Today, 2:30 PM
            </p>
            <button
              onClick={handleBooking}
              className="group mt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold transition-colors hover:text-gold-light"
            >
              Book Now
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </button>
            {/* Pulsing gold dot indicator */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-gold" />
            </span>
          </div>
        </motion.div>

        {/* WhatsApp floating button — fixed, above booking card */}
        <motion.a
          href={`https://wa.me/${BRAND.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2.5, ease: 'easeOut' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="animate-pulse-glow fixed bottom-28 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-black shadow-lg md:right-12 lg:right-24"
          aria-label="Chat on WhatsApp"
        >
          <RiWhatsappFill className="h-7 w-7" />
        </motion.a>
      </div>

      {/* Scroll indicator — bottom center, fades on scroll */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-foreground/30">
          SCROLL
        </span>
        <motion.div
          style={{ height: scrollLineHeight }}
          className="w-px bg-gradient-to-b from-gold/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
