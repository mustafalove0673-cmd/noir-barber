'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { RiArrowDownLine } from 'react-icons/ri';
import { IMAGES, BRAND } from './data';

const HEADING_CHARS = 'BATUHAN'.split('');

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.5 },
  },
};

const charVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const { left, top, width, height } = sectionRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden"
      id="hero"
    >
      {/* Background Image — Edge to edge, no frame */}
      <div className="absolute inset-0">
        <motion.img
          src={IMAGES.hero}
          alt="Batuhan Taşcı Men's Hair"
          className="h-full w-full object-cover"
          style={{ x: springX, y: springY }}
          animate={{ scale: [1, 1.15] }}
          transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        />
        {/* Gradient: heavy bottom for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(5,5,5,0.6) 30%, rgba(5,5,5,0.15) 60%, rgba(5,5,5,0.3) 100%)',
          }}
        />
        {/* Side vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 30% 80%, transparent 40%, rgba(5,5,5,0.4) 100%)',
          }}
        />
      </div>

      {/* Content — bottom-left, overlaid on image */}
      <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-24 pt-32 md:px-12 lg:px-20 lg:pb-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* BATUHAN — character reveal */}
          <div className="overflow-hidden">
            <motion.h1 className="heading-display text-[clamp(4rem,13vw,11rem)] leading-none">
              {HEADING_CHARS.map((char, i) => (
                <motion.span
                  key={i}
                  variants={charVariants}
                  className="inline-block text-orange-gradient"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* TAŞCI subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="mt-1 font-serif text-[clamp(1.2rem,3vw,2.2rem)] font-light tracking-[0.35em] text-white/40"
          >
            TAŞCI
          </motion.p>

          {/* Thin orange line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 h-px"
            style={{ background: 'linear-gradient(90deg, #FF6B00 0%, transparent 100%)' }}
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.5, ease: 'easeOut' }}
            className="mt-5 text-[10px] font-medium uppercase tracking-[0.6em] text-white/25"
          >
            MEN&apos;S HAIR ARTIST — KARTAL
          </motion.p>

          {/* Sub-tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.6, ease: 'easeOut' }}
            className="mt-2 text-[10px] font-medium uppercase tracking-[0.6em] text-white/20"
          >
            Hassasiyet ve Sanat Buluşur
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.8, ease: 'easeOut' }}
            className="mt-8"
          >
            <a
              href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent('Merhaba Batuhan, randevu almak istiyorum.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-white/15 bg-white/[0.06] backdrop-blur-sm px-8 py-3 text-[11px] font-medium uppercase tracking-[0.3em] text-white/70 hover:text-orange hover:border-orange/30 transition-all duration-500"
            >
              Randevu Al
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[9px] font-medium uppercase tracking-[0.5em] text-white/15">
          KAYDIR
        </span>
        <RiArrowDownLine className="w-3.5 h-3.5 text-orange/30 animate-bounce" />
      </motion.div>
    </section>
  );
}
