"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
} from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Rates", href: "#rates" },
  { name: "Book Pickup", href: "#booking" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
<header className="relative z-[100] w-full border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">

        {/* LOGO */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex items-center gap-2 sm:gap-3"
        >
          <img
            src="/logo/kabadi-baba-logo.png"
            alt="Kabadi Baba Logo"
            className="h-10 w-10 rounded-xl object-cover shadow-md sm:h-14 sm:w-14 sm:rounded-2xl"
          />

          <div>
            <h1 className="text-lg font-extrabold tracking-tight text-gray-900 sm:text-2xl">
              Kabadi <span className="text-green-600">Baba</span>
            </h1>

            <p className="hidden text-xs text-gray-500 sm:block">
              Gorakhpur's Trusted Scrap Pickup
            </p>
          </div>
        </Link>

        {/* DESKTOP NAV */}
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

        {/* DESKTOP BUTTONS */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href="tel:+917377788810"
            className="flex items-center gap-2 rounded-xl border border-green-600 px-4 py-2.5 font-semibold text-green-700 transition hover:bg-green-50"
          >
            <Phone size={18} />
            Call
          </a>

          <a
            href="https://wa.me/917377788810"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 font-semibold text-white shadow-md transition hover:bg-green-700"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-[120] flex h-11 w-11 items-center justify-center rounded-lg text-gray-800 hover:bg-gray-100 active:bg-gray-200 md:hidden"
        >
          {menuOpen ? (
            <X size={29} strokeWidth={2.5} />
          ) : (
            <Menu size={29} strokeWidth={2.5} />
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <>
          {/* BACKDROP */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={closeMenu}
            className="fixed inset-0 z-[105] bg-black/30 md:hidden"
          />

          {/* MENU PANEL */}
          <div className="absolute left-0 right-0 top-full z-[110] mx-3 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl md:hidden">

            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div>
                <p className="font-bold text-gray-900">
                  Kabadi Baba
                </p>

                <p className="text-xs text-gray-500">
                  Quick Navigation
                </p>
              </div>

              {/* CLOSE */}
              <button
                type="button"
                aria-label="Close menu"
                onClick={closeMenu}
                className="flex h-10 w-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-900 active:bg-gray-200"
              >
                <X size={24} strokeWidth={2.5} />
              </button>
            </div>

            {/* LINKS */}
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={closeMenu}
                  className="border-b border-gray-100 px-5 py-4 text-base font-semibold text-gray-700 hover:bg-green-50 hover:text-green-600"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* CALL + WHATSAPP */}
            <div className="grid grid-cols-2 gap-3 p-4">

              <a
                href="tel:+917377788810"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-xl border border-green-600 py-3 font-semibold text-green-700"
              >
                <Phone size={18} />
                Call
              </a>

              <a
                href="https://wa.me/917377788810"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-semibold text-white"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>

            </div>
          </div>
        </>
      )}
    </header>
  );
}
