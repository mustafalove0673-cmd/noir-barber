"use client";

import SmoothScroll from "@/components/barber/SmoothScroll";
import Navigation from "@/components/barber/Navigation";
import HeroSection from "@/components/barber/HeroSection";
import ServicesSection from "@/components/barber/ServicesSection";
import GallerySection from "@/components/barber/GallerySection";
import TestimonialsSection from "@/components/barber/TestimonialsSection";
import InstagramSection from "@/components/barber/InstagramSection";
import BookingCTA, { FloatingBookingPrompt } from "@/components/barber/BookingCTA";
import ContactSection from "@/components/barber/ContactSection";
import Footer from "@/components/barber/Footer";
import StickyButtons from "@/components/barber/StickyButtons";

export default function Home() {
  return (
    <SmoothScroll>
      <Navigation />
      <StickyButtons />
      <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <HeroSection />

        <ServicesSection />

        <div className="max-w-xs mx-auto px-6 py-10 md:py-14">
          <FloatingBookingPrompt />
        </div>

        <GallerySection />

        <TestimonialsSection />

        <InstagramSection />

        <BookingCTA />

        <ContactSection />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
