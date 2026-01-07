import type { Metadata } from "next";
import { Inter, Playfair_Display, Source_Sans_3, Lora } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";

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
        {/*
          Development helper: block known analytics endpoints in dev so the
          dev server and local environment don't produce ERR_CONNECTION_REFUSED
          logs when extensions or other tooling try to send analytics.
        */}
        {process.env.NODE_ENV !== "production" && (
          // eslint-disable-next-line @next/next/next-script-for-ga
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){try{var hosts=["google-analytics.com","www.google-analytics.com","www.googletagmanager.com","www.google.com","www.googleadservices.com","www.google-analytics.com/analytics.js","www.google-analytics.com/mp/collect"];function match(u){try{return hosts.some(function(h){return u&&u.indexOf(h)!==-1})}catch(e){return false}};var _fetch=window.fetch;window.fetch=function(input){try{var url=typeof input==='string'?input:(input&&input.url?input.url:'');if(match(url)){return Promise.resolve(new Response(null,{status:204}))}return _fetch.apply(this,arguments)}catch(e){return _fetch.apply(this,arguments)}};var X=window.XMLHttpRequest;var _open=X&&X.prototype&&X.prototype.open; if(_open){X.prototype.open=function(method,url){try{if(match(url)){this.abort();return}return _open.apply(this,arguments)}catch(e){return _open.apply(this,arguments)}}}window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};console.info('Dev helper: analytics endpoints are blocked');}catch(e){} })();`,
            }}
          />
        )}
        {/*
          Production Google Analytics (gtag) loader.
          Controlled by `NEXT_PUBLIC_GA_ID`. If you don't want analytics,
          leave that env var unset. This is a non-blocking, opt-in snippet.
        */}
        {/**
          Temporarily disable analytics injection for local Lighthouse and audit runs.
          This short-circuits the production GA snippet until we complete the
          analytics gating verification. Remove `&& false` to re-enable.
        */}
        {process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_GA_ID && process.env.NEXT_PUBLIC_DISABLE_ANALYTICS !== '1' && false && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { send_page_view: true });`,
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${sourceSans.variable} ${lora.variable} antialiased flex flex-col min-h-screen bg-[#E8E3DB]`}
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
