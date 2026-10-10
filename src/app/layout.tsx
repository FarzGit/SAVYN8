import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { ClientEffects } from "@/components/ClientEffects";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { site } from "@/config/site";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: "%s · Sevyn8" },
  description: site.description,
  applicationName: site.name,
  keywords: ["Sevyn8", "Sevyn8 Ring", "smart ring", "wellness ring", "sleep", "recovery", "stress", "wearable"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: site.title,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.title }],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: ["/og.png"] },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0A1A14",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  email: site.contactEmail,
  description: site.description,
  ...(site.socials.length ? { sameAs: site.socials.map((s) => s.href) } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        {site.plausibleDomain && (
          <script defer data-domain={site.plausibleDomain} src="https://plausible.io/js/script.js" />
        )}
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-ivory px-4 py-2 text-bg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <ClientEffects />
      </body>
    </html>
  );
}
