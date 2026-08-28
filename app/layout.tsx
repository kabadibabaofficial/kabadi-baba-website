import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";

const siteUrl = "https://www.kabadibaba.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "Kabadi Baba Gorakhpur | Sell Scrap Online | Free Doorstep Pickup",
    template: "%s | Kabadi Baba",
  },

  description:
    "Free doorstep scrap pickup in Gorakhpur. Best market rates, digital weighing and instant UPI payment. Sell newspaper, iron, plastic and e-waste. Book your pickup now - +91 7377788810",

  alternates: {
    canonical: "/",
  },

  verification: {
    google: "HKghWkbumy3i_D88LejI-2ROBhA1333ojU0gWNqSjZ0",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: [
      {
        url: "/icons/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icons/kabadi-baba-icon-192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/icons/kabadi-baba-icon-512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],

    shortcut: "/icons/favicon.ico",

    apple: {
      url: "/icons/kabadi-baba-apple-180.png",
      sizes: "180x180",
      type: "image/png",
    },
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Kabadi Baba",

    title:
      "Kabadi Baba Gorakhpur | Sell Scrap Online | Free Doorstep Pickup",

    description:
      "Free doorstep scrap pickup in Gorakhpur. Best market rates, digital weighing and instant UPI payment. Sell newspaper, iron, plastic and e-waste.",

    locale: "en_IN",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kabadi Baba - Gorakhpur Scrap Dealer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Kabadi Baba Gorakhpur | Sell Scrap Online | Free Doorstep Pickup",

    description:
      "Sell scrap online in Gorakhpur with free doorstep pickup, digital weighing and best market rates.",

    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <LocalBusinessSchema />

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-51MHTVV0K7"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("js", new Date());
            gtag("config", "G-51MHTVV0K7");
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}