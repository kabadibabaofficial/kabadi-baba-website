"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  PhoneCall,
} from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Rates", href: "#rates" },
  { name: "Book Pickup", href: "#booking" },
  { name: "Contact", href: "#contact" },
];

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20.52 3.48A11.87 11.87 0 0 0 12.08 0C5.53 0 .2 5.33.2 11.88c0 2.09.55 4.13 1.59 5.94L.1 24l6.32-1.66a11.85 11.85 0 0 0 5.66 1.44h.01c6.55 0 11.88-5.33 11.88-11.88 0-3.18-1.24-6.17-3.45-8.42ZM12.09 21.75h-.01a9.84 9.84 0 0 1-5.02-1.37l-.36-.21-3.75.98 1-3.65-.23-.38a9.84 9.84 0 0 1-1.51-5.24C2.21 6.44 6.64 2 12.09 2c2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.86-9.88 9.86Zm5.42-7.39c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.08 4.5.71.31 1.27.49 1.71.63.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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

          {/* CALL */}
          <a
            href="tel:+917377788810"
            className="flex items-center gap-2 rounded-xl border border-green-600 px-4 py-2.5 font-semibold text-green-700 transition hover:bg-green-50"
          >
            <PhoneCall size={18} />
            Call
          </a>

          {/* WHATSAPP */}
          <a
            href="https://wa.me/917377788810"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 font-semibold text-white shadow-md transition hover:bg-green-700"
          >
            <WhatsAppIcon size={19} />
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

              {/* CALL */}
              <a
                href="tel:+917377788810"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-xl border border-green-600 py-3 font-semibold text-green-700"
              >
                <PhoneCall size={18} />
                Call
              </a>

              {/* WHATSAPP */}
              <a
                href="https://wa.me/917377788810"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-semibold text-white"
              >
                <WhatsAppIcon size={19} />
                WhatsApp
              </a>

            </div>
          </div>
        </>
      )}
    </header>
  );
}