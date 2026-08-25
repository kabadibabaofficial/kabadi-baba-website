import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

const siteUrl = "https://www.kabadibaba.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Kabadi Baba – Sell Scrap Online | Free Pickup in Gorakhpur",
    template: "%s | Kabadi Baba",
  },

  description:
    "Kabadi Baba is Gorakhpur's trusted scrap dealer and scrap pickup service. Sell newspaper, books, cardboard, plastic, iron, steel, copper, aluminium and e-waste with free doorstep pickup, digital weighing, best market price and reliable payment.",

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

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Kabadi Baba",
    title: "Kabadi Baba – Sell Scrap Online | Free Pickup in Gorakhpur",
    description:
      "Sell your old scrap online in Gorakhpur with Kabadi Baba. Free doorstep pickup, digital weighing, best market price and reliable payment.",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Kabadi Baba – Sell Scrap Online | Free Pickup in Gorakhpur",
    description:
      "Sell scrap online in Gorakhpur with free doorstep pickup, digital weighing and best market price.",
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
