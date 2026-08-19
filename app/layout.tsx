import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kabadi Baba | Scrap Dealer in Gorakhpur",
  description:
    "Kabadi Baba is Gorakhpur's trusted scrap dealer. Book free doorstep scrap pickup for newspaper, cardboard, plastic, iron, steel, e-waste and more at the best market price.",
  verification: {
    google: "HKghWkbumy3i_D88LejI-2ROBhA1333ojU0gWNqSjZ0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}