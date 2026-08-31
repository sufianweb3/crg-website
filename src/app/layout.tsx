import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CRG Attire — Fashion Manufacturing & Export, Bangladesh",
  description: "CRG Attire is a fully integrated apparel manufacturer based in Bangladesh since 1996. Design, sampling, production, and export for fashion brands worldwide.",
  metadataBase: new URL("https://crgattire.com"),
  openGraph: {
    title: "CRG Attire — Fashion Manufacturing & Export, Bangladesh",
    description: "CRG Attire is a fully integrated apparel manufacturer based in Bangladesh since 1996. Design, sampling, production, and export for fashion brands worldwide.",
    type: "website",
    locale: "en_US",
    siteName: "CRG Attire",
  },
  twitter: {
    card: "summary_large_image",
    title: "CRG Attire — Fashion Manufacturing & Export, Bangladesh",
    description: "CRG Attire is a fully integrated apparel manufacturer based in Bangladesh since 1996.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#F2FDFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "CRG Attire",
              url: "https://crgattire.com",
              logo: "https://crgattire.com/logo.png",
              foundingDate: "1996",
              address: {
                "@type": "PostalAddress",
                addressCountry: "BD",
                addressRegion: "Bangladesh",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+880-XXXX-XXXXXX",
                contactType: "customer service",
                availableLanguage: "English",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-azure-mist text-peach-black">
        {children}
      </body>
    </html>
  );
}