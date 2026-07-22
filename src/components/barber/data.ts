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
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648750455!2d-73.98784368459418!3d40.75797797932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
  hours: "Mon–Sat: 10AM – 8PM",
};

// Premium Unsplash images — curated for luxury barber aesthetic
export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=1920&q=80&auto=format&fit=crop",
  heroAlt: "https://images.unsplash.com/photo-1585747860019-8e8ef8b7d904?w=1920&q=80&auto=format&fit=crop",
  services: {
    signatureCut: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80&auto=format&fit=crop",
    royalShave: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80&auto=format&fit=crop",
    beardSculpt: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80&auto=format&fit=crop",
    grooming: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80&auto=format&fit=crop",
  },
  gallery: [
    { src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=900&q=80&auto=format&fit=crop", alt: "Signature Cut" },
    { src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900&q=80&auto=format&fit=crop", alt: "Classic Shave" },
    { src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=900&q=80&auto=format&fit=crop", alt: "Barber Tools" },
    { src: "https://images.unsplash.com/photo-1585747860019-8e8ef8b7d904?w=900&q=80&auto=format&fit=crop", alt: "Barber Interior" },
    { src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=900&q=80&auto=format&fit=crop", alt: "Grooming Products" },
    { src: "https://images.unsplash.com/photo-1596728325488-58c87691e9af?w=900&q=80&auto=format&fit=crop", alt: "Beard Styling" },
    { src: "https://images.unsplash.com/photo-1587393855524-087f83d95bc9?w=900&q=80&auto=format&fit=crop", alt: "Premium Cut" },
    { src: "https://images.unsplash.com/photo-1620252859848-5dc617377c2a?w=900&q=80&auto=format&fit=crop", alt: "Modern Style" },
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
    description:
      "A bespoke haircut crafted with surgical precision. Our master barbers analyze your face structure, hair texture, and lifestyle to create a cut that is uniquely yours.",
    price: "85",
    duration: "45 min",
    image: IMAGES.services.signatureCut,
  },
  {
    id: 2,
    title: "THE ROYAL SHAVE",
    subtitle: "The Art of Indulgence",
    description:
      "An experience, not a service. Hot towels, premium lather, hand-honed straight razor — every step designed to make you feel royalty. Includes a cold towel finish.",
    price: "65",
    duration: "30 min",
    image: IMAGES.services.royalShave,
  },
  {
    id: 3,
    title: "BEARD SCULPTURE",
    subtitle: "Architectural Grooming",
    description:
      "Your beard is a statement. We sculpt it with the precision of an artist — shaping, trimming, and conditioning to create a masterpiece of facial architecture.",
    price: "55",
    duration: "25 min",
    image: IMAGES.services.beardSculpt,
  },
  {
    id: 4,
    title: "THE GENTLEMAN'S RITUAL",
    subtitle: "The Full Experience",
    description:
      "Our signature three-part ritual: precision cut, hot towel shave, and luxury facial treatment. A complete transformation that redefines grooming.",
    price: "165",
    duration: "90 min",
    image: IMAGES.services.grooming,
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Alexander K.",
    role: "Creative Director",
    text: "NOIR isn't a barbershop — it's an experience. The attention to detail is unlike anything I've encountered. Every visit feels like stepping into a different world.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus D.",
    role: "Entrepreneur",
    text: "I've been to barbers in London, Paris, and New York. NOIR is on another level entirely. The craftsmanship is extraordinary.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sebastian L.",
    role: "Architect",
    text: "The precision is architectural. Every line, every angle is calculated. This is what grooming looks like when it's elevated to an art form.",
    rating: 5,
  },
];

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
