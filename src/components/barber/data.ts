// NOIR BARBER — Brand Data & Constants

export const BRAND = {
  name: "NOIR BARBER",
  tagline: "LUXURY GROOMING ATELIER",
  phone: "+1 (212) 555-0199",
  email: "hello@noirbarber.com",
  address: "580 Fifth Avenue, Suite 1201, New York, NY 10036",
  whatsapp: "12125550199",
  instagram: "@noirbarber",
  instagramUrl: "https://instagram.com/noirbarber",
  facebookUrl: "https://facebook.com/noirbarber",
  twitterUrl: "https://x.com/noirbarber",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648750455!2d-73.98784368459418!3d40.75797797932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
  hours: "Mon–Sat: 10AM – 8PM",
  founded: "2018",
};

export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1920&q=80&auto=format&fit=crop",
  heroAlt: "https://images.unsplash.com/photo-1585747860019-8e8ef8b7d904?w=1920&q=80&auto=format&fit=crop",
  about: "https://images.unsplash.com/photo-1585747860019-8e8ef8b7d904?w=1200&q=80&auto=format&fit=crop",
  services: {
    signatureCut: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80&auto=format&fit=crop",
    royalShave: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80&auto=format&fit=crop",
    beardSculpt: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80&auto=format&fit=crop",
    grooming: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80&auto=format&fit=crop",
  },
  gallery: [
    { src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=900&q=80&auto=format&fit=crop", alt: "Signature Cut", w: 900, h: 1200 },
    { src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900&q=80&auto=format&fit=crop", alt: "Classic Shave", w: 900, h: 600 },
    { src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=900&q=80&auto=format&fit=crop", alt: "Barber Tools", w: 900, h: 900 },
    { src: "https://images.unsplash.com/photo-1585747860019-8e8ef8b7d904?w=900&q=80&auto=format&fit=crop", alt: "Barber Interior", w: 900, h: 700 },
    { src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=900&q=80&auto=format&fit=crop", alt: "Grooming Products", w: 900, h: 1100 },
    { src: "https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=900&q=80&auto=format&fit=crop", alt: "Beard Styling", w: 900, h: 600 },
    { src: "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=900&q=80&auto=format&fit=crop", alt: "Premium Cut", w: 900, h: 800 },
    { src: "https://images.unsplash.com/photo-1620252859848-5dc617377c2a?w=900&q=80&auto=format&fit=crop", alt: "Modern Style", w: 900, h: 1000 },
    { src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80&auto=format&fit=crop", alt: "Detail Work", w: 600, h: 600 },
    { src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80&auto=format&fit=crop", alt: "Fade Master", w: 600, h: 800 },
    { src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80&auto=format&fit=crop", alt: "Razor Art", w: 600, h: 700 },
    { src: "https://images.unsplash.com/photo-1585747860019-8e8ef8b7d904?w=600&q=80&auto=format&fit=crop", alt: "Atelier", w: 600, h: 900 },
  ],
  instagram: [
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=600&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1585747860019-8e8ef8b7d904?w=600&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=600&q=80&auto=format&fit=crop",
  ],
};

export const SERVICES = [
  {
    id: 1,
    title: "THE SIGNATURE CUT",
    subtitle: "Precision Engineering",
    description: "A bespoke haircut crafted with surgical precision. Our master barbers analyze your face structure, hair texture, and lifestyle to create a cut that is uniquely yours.",
    price: "85",
    duration: "45 min",
    image: IMAGES.services.signatureCut,
  },
  {
    id: 2,
    title: "THE ROYAL SHAVE",
    subtitle: "The Art of Indulgence",
    description: "An experience, not a service. Hot towels, premium lather, hand-honed straight razor — every step designed to make you feel royalty. Includes a cold towel finish.",
    price: "65",
    duration: "30 min",
    image: IMAGES.services.royalShave,
  },
  {
    id: 3,
    title: "BEARD SCULPTURE",
    subtitle: "Architectural Grooming",
    description: "Your beard is a statement. We sculpt it with the precision of an artist — shaping, trimming, and conditioning to create a masterpiece of facial architecture.",
    price: "55",
    duration: "25 min",
    image: IMAGES.services.beardSculpt,
  },
  {
    id: 4,
    title: "THE GENTLEMAN'S RITUAL",
    subtitle: "The Full Experience",
    description: "Our signature three-part ritual: precision cut, hot towel shave, and luxury facial treatment. A complete transformation that redefines grooming.",
    price: "165",
    duration: "90 min",
    image: IMAGES.services.grooming,
  },
];

export const ALL_SERVICES = [
  ...SERVICES,
  { id: 5, title: "SCALP TREATMENT", subtitle: "Deep Restoration", description: "A therapeutic scalp massage with essential oils, followed by a nourishing treatment that restores vitality to your hair and scalp.", price: "45", duration: "20 min", image: IMAGES.services.grooming },
  { id: 6, title: "THE EXECUTIVE", subtitle: "Power Lunch", description: "Designed for the modern executive. A quick precision cut with hot towel refresh in under 30 minutes. Walk in sharp, walk out sharper.", price: "95", duration: "25 min", image: IMAGES.services.signatureCut },
  { id: 7, title: "HAIR TATTOO", subtitle: "Micro Artistry", description: "Intricate designs shaved into your hair or beard with surgical precision. Express yourself with temporary or permanent styles.", price: "40", duration: "20 min", image: IMAGES.services.beardSculpt },
  { id: 8, title: "COLOR & BLEND", subtitle: "Natural Enhancement", description: "Subtle grey blending or full color treatment. We use premium products for a natural, undetectable result that looks effortlessly refined.", price: "120", duration: "60 min", image: IMAGES.services.royalShave },
];

export const TESTIMONIALS = [
  { id: 1, name: "Alexander K.", role: "Creative Director", text: "NOIR isn't a barbershop — it's an experience. The attention to detail is unlike anything I've encountered.", rating: 5 },
  { id: 2, name: "Marcus D.", role: "Entrepreneur", text: "I've been to barbers in London, Paris, and New York. NOIR is on another level entirely. The craftsmanship is extraordinary.", rating: 5 },
  { id: 3, name: "Sebastian L.", role: "Architect", text: "The precision is architectural. Every line, every angle is calculated. This is grooming elevated to an art form.", rating: 5 },
  { id: 4, name: "James R.", role: "Finance Executive", text: "The Gentleman's Ritual is the best 90 minutes of my month. I leave feeling like a completely different person.", rating: 5 },
  { id: 5, name: "Oliver T.", role: "Photographer", text: "Finally, a barbershop that understands that the details matter. From the music to the products — everything is curated.", rating: 5 },
  { id: 6, name: "Daniel M.", role: "Lawyer", text: "I send all my clients here. It's the kind of place where you know you're in expert hands from the moment you walk in.", rating: 5 },
];

export const FAQS = [
  { q: "Do I need to book an appointment?", a: "While walk-ins are always welcome, we recommend booking through WhatsApp for priority scheduling. This ensures you get your preferred time slot and barber." },
  { q: "What products do you use?", a: "We exclusively use premium grooming products from brands like Reuzel, Uppercut Deluxe, and American Crew. All products are available for purchase at our atelier." },
  { q: "How long does a typical visit take?", a: "Depending on the service, visits range from 20 minutes to 90 minutes. The Signature Cut takes approximately 45 minutes, while The Gentleman's Ritual is our comprehensive 90-minute experience." },
  { q: "Do you offer group bookings?", a: "Yes! We accommodate private group bookings for special occasions, corporate events, and groom parties. Contact us via WhatsApp to arrange." },
  { q: "What is your cancellation policy?", a: "We ask for at least 24 hours notice for cancellations. Late cancellations may incur a 50% charge. No-shows are charged at full price." },
  { q: "Do you gift cards?", a: "Absolutely. Our luxury gift cards are available in any denomination and make the perfect gift. Purchase in-store or contact us to arrange delivery." },
  { q: "Is parking available?", a: "Yes, there is a parking garage located directly beneath our building with valet service. The first hour is complimentary for all NOIR clients." },
  { q: "Do you cater to all hair types?", a: "Our master barbers are trained to work with all hair types and textures. We take pride in delivering exceptional results regardless of your hair type." },
];

export const BLOG_POSTS = [
  { id: 1, title: "The Art of the Fade: A Masterclass", excerpt: "Discover the techniques behind the perfect fade cut and why it remains the most requested style at NOIR.", date: "Jan 15, 2025", category: "Technique", image: IMAGES.services.signatureCut },
  { id: 2, title: "Beard Care: Your Complete Guide", excerpt: "From daily maintenance to professional sculpting — everything you need to know about keeping your beard impeccable.", date: "Jan 8, 2025", category: "Grooming", image: IMAGES.services.beardSculpt },
  { id: 3, title: "The History of Barbering", excerpt: "A journey through the centuries — from ancient Egyptian barbers to the modern luxury grooming atelier.", date: "Dec 28, 2024", category: "Culture", image: IMAGES.heroAlt },
  { id: 4, title: "Hot Towel Shave: The Ritual", excerpt: "Why the traditional hot towel shave remains the ultimate indulgence in men's grooming.", date: "Dec 15, 2024", category: "Experience", image: IMAGES.services.royalShave },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Pricing", href: "/pricing" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Book", href: "/book" },
];

export const HOME_ANCHORS = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const FOOTER_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Pricing", href: "/pricing" },
  { label: "Reviews", href: "/reviews" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Book", href: "/book" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Terms & Conditions", href: "/terms" },
];
