import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css"; // Using Tailwind CDN instead
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
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
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,800;1,400&family=Source+Sans+Pro:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Lora:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${inter.variable} antialiased flex flex-col min-h-screen bg-[#F5F1E8]`}
        style={{ fontFamily: "'Source Sans Pro', 'Inter', sans-serif" }}
      >
        <a href="#main-content" className="skip-to-content">
          Langsung ke konten utama
        </a>
        <Header />
        <main id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
