import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://kabadibaba.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Kabadi Baba – Scrap Dealer in Gorakhpur | Scrap Pickup",
    template: "%s | Kabadi Baba",
  },

  description:
    "Kabadi Baba is Gorakhpur's trusted scrap dealer and scrap pickup service. Sell newspaper, cardboard, plastic, iron, steel, copper, aluminium and e-waste with free doorstep pickup, digital weighing and reliable payment.",

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
    title: "Kabadi Baba – Scrap Dealer in Gorakhpur | Scrap Pickup",
    description:
      "Gorakhpur's trusted scrap dealer and scrap pickup service with free doorstep pickup, digital weighing and reliable payment.",
    locale: "en_IN",
  },

  twitter: {
    card: "summary_large_image",
    title: "Kabadi Baba – Scrap Dealer in Gorakhpur | Scrap Pickup",
    description:
      "Gorakhpur's trusted scrap dealer and scrap pickup service.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}