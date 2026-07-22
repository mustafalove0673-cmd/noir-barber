import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "NOIR BARBER | Luxury Grooming Atelier",
  description:
    "Where precision meets artistry. Experience the finest men's grooming at NOIR BARBER — a luxury atelier redefining the craft of barbering.",
  keywords: [
    "luxury barber",
    "men's grooming",
    "premium haircut",
    "gentleman's barber",
    "barbershop",
    "NOIR BARBER",
  ],
  authors: [{ name: "NOIR BARBER" }],
  openGraph: {
    title: "NOIR BARBER | Luxury Grooming Atelier",
    description:
      "Where precision meets artistry. Experience the finest men's grooming.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased noise-overlay`}
      >
        {children}
      </body>
    </html>
  );
}
