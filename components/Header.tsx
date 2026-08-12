"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Rates", href: "#rates" },
  { name: "Book Pickup", href: "#booking" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-xl text-white shadow-md sm:h-14 sm:w-14 sm:rounded-2xl sm:text-3xl">
            ♻️
          </div>

          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-gray-900 sm:text-2xl">
              Kabadi <span className="text-green-600">Baba</span>
            </h1>

            <p className="hidden text-xs text-gray-500 sm:block">
              Gorakhpur's Trusted Scrap Pickup
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold text-gray-700 transition hover:text-green-600"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:+917377788810"
            className="rounded-xl border border-green-600 px-4 py-2.5 font-semibold text-green-700 transition hover:bg-green-50"
          >
            📞 Call
          </a>

          <a
            href="https://wa.me/917377788810"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-green-600 px-4 py-2.5 font-semibold text-white shadow-md transition hover:bg-green-700"
          >
            💬 WhatsApp
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-lg text-2xl text-gray-800 transition hover:bg-gray-100 active:bg-gray-200 md:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="relative z-50 border-t border-gray-100 bg-white px-4 pb-5 shadow-lg md:hidden">
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-gray-100 py-4 text-base font-semibold text-gray-700 hover:text-green-600"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <a
              href="tel:+917377788810"
              className="rounded-xl border border-green-600 py-3 text-center font-semibold text-green-700"
            >
              📞 Call
            </a>

            <a
              href="https://wa.me/917377788810"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-green-600 py-3 text-center font-semibold text-white"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}