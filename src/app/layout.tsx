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
  title: "Batuhan Taşcı Men's Hair | Hair Artist — Kartal, İstanbul",
  description:
    "İstanbul Kartal'da premium erkek kuaför deneyimi. Batuhan Taşcı, saç sanatıyla mükemmelliğe ulaşmanızı sağlıyor. Randevu için hemen arayın!",
  keywords: [
    "erkek kuaförü",
    "barber",
    "saç sanatçısı",
    "İstanbul kuaför",
    "Kartal berber",
    "fade kesim",
    "sakal şekillendirme",
    "Batuhan Taşcı",
    "men's hair",
    "hair artist",
    "premium kuaför",
    "VIP bakım",
  ],
  authors: [{ name: "Batuhan Taşcı" }],
  openGraph: {
    title: "Batuhan Taşcı Men's Hair | Hair Artist",
    description:
      "İstanbul Kartal'da premium erkek kuaför deneyimi. Hassasiyet ve sanat buluşuyor.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased noise-overlay`}
      >
        {children}
      </body>
    </html>
  );
}
