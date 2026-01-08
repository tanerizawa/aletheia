import type { Metadata } from "next";
import { Inter, Playfair_Display, Source_Sans_3, Lora } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";
import { JsonLd } from "@/lib/seo/json-ld";
import { generateOrganizationSchema } from "@/lib/seo/schemas/organization";

// Optimized font loading with display=swap for faster rendering
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
  preload: true,
  style: ["normal", "italic"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  preload: true,
  style: ["normal", "italic"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  preload: false, // Secondary font, load on demand
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://academos.or.id'),
  title: "Rumah Aletheia - Perpustakaan & Pusat Informasi",
  description: "Rumah Aletheia adalah perpustakaan yang menyediakan informasi kegiatan, koleksi buku, dan berbagai layanan perpustakaan. Kunjungi academos.or.id untuk informasi lebih lanjut.",
  keywords: ["perpustakaan", "rumah aletheia", "academos", "buku", "koleksi buku", "kegiatan perpustakaan", "literasi", "membaca"],
  authors: [{ name: "Rumah Aletheia" }],
  creator: "Rumah Aletheia",
  publisher: "Rumah Aletheia",
  openGraph: {
    title: "Rumah Aletheia - Perpustakaan & Pusat Informasi",
    description: "Perpustakaan dengan lebih dari 8,000 koleksi buku dan berbagai program edukatif untuk meningkatkan minat baca.",
    url: "https://academos.or.id",
    siteName: "Rumah Aletheia",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rumah Aletheia - Perpustakaan & Pusat Informasi",
    description: "Perpustakaan dengan lebih dari 8,000 koleksi buku dan berbagai program edukatif.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Preconnect to external resources for faster loading */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        {/* JSON-LD Structured Data for SEO */}
        <JsonLd data={generateOrganizationSchema()} />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${sourceSans.variable} ${lora.variable} antialiased flex flex-col min-h-screen bg-cream-soft-white`}
        style={{ fontFamily: "var(--font-source-sans), var(--font-inter), sans-serif" }}
      >
        <a href="#main-content" className="skip-to-content">
          Langsung ke konten utama
        </a>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
