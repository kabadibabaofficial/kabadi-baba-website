
"use client";

import React from "react";
import Image from "next/image";

const socials = [
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "YouTube", href: "#", icon: "youtube" },
  { label: "WhatsApp", href: "https://wa.me/917377788810", icon: "whatsapp" },
];

function SocialIcon({ type }: { type: string }) {
  if (type === "facebook") {
    return <span className="text-xl font-bold leading-none">f</span>;
  }

  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.4" cy="6.7" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (type === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M21.6 7.2a2.9 2.9 0 0 0-2.04-2.05C17.76 4.65 12 4.65 12 4.65s-5.76 0-7.56.5A2.9 2.9 0 0 0 2.4 7.2 30.2 30.2 0 0 0 1.9 12a30.2 30.2 0 0 0 .5 4.8 2.9 2.9 0 0 0 2.04 2.05c1.8.5 7.56.5 7.56.5s5.76 0 7.56-.5a2.9 2.9 0 0 0 2.04-2.05 30.2 30.2 0 0 0 .5-4.8 30.2 30.2 0 0 0-.5-4.8ZM10.2 15.15v-6.3L15.7 12l-5.5 3.15Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path d="M20.1 3.9A11.3 11.3 0 0 0 12.02.55C5.74.55.63 5.66.63 11.94c0 2 .52 3.95 1.5 5.67L.55 23.45l5.98-1.55a11.35 11.35 0 0 0 5.48 1.4h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.18-5.9-3.31-8.01Z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8.9 7.25c-.25-.56-.51-.57-.75-.58h-.64c-.22 0-.57.08-.87.4-.3.33-1.14 1.12-1.14 2.73s1.17 3.17 1.33 3.39c.16.22 2.25 3.6 5.55 4.9 2.74 1.08 3.3.87 3.89.82.59-.05 1.91-.78 2.18-1.53.27-.75.27-1.39.19-1.53-.08-.14-.3-.22-.63-.39-.33-.16-1.91-.94-2.2-1.05-.3-.11-.51-.16-.73.16-.22.33-.84 1.05-1.03 1.27-.19.22-.38.25-.7.08-.33-.16-1.38-.51-2.62-1.62-.97-.86-1.62-1.92-1.81-2.25-.19-.33-.02-.5.14-.66.14-.14.33-.38.49-.57.16-.19.22-.33.33-.55.11-.22.05-.41-.03-.57-.08-.16-.7-1.69-.96-2.31Z" fill="currentColor" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
      <path d="M20 10.2c0 5.1-8 11.3-8 11.3S4 15.3 4 10.2a8 8 0 1 1 16 0Z" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative mt-10 overflow-hidden bg-[#008B57] text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <svg className="absolute -left-5 bottom-16 h-52 w-44 opacity-20" viewBox="0 0 180 220" fill="none">
          <path d="M22 215C22 145 47 76 132 15C120 91 82 157 22 215Z" fill="#7CF28C" />
          <path d="M15 171C53 130 91 110 145 96C111 135 70 158 15 171Z" fill="#7CF28C" />
          <path d="M29 127C54 90 84 63 125 43C96 83 65 109 29 127Z" fill="#7CF28C" />
        </svg>

        <svg className="absolute -right-7 bottom-10 h-56 w-48 opacity-20" viewBox="0 0 190 230" fill="none">
          <path d="M166 225C166 151 140 83 54 18C67 96 103 164 166 225Z" fill="#7CF28C" />
          <path d="M177 178C137 137 98 114 43 101C80 137 122 161 177 178Z" fill="#7CF28C" />
          <path d="M158 133C134 94 103 66 62 45C91 85 119 111 158 133Z" fill="#7CF28C" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:py-14">
        <div className="grid items-center lg:grid-cols-[1fr_1px_1fr] lg:gap-14">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="relative h-28 w-36 sm:h-32 sm:w-40">
              <Image
                src="/kabadi-baba-logo-final-cropped.png"
                alt="Kabadi Baba logo"
                fill
                sizes="160px"
                className="object-contain"
                priority
              />
            </div>

            <h2 className="-mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
              <span className="text-white">Kabadi </span>
              <span className="text-lime-300">Baba</span>
            </h2>

            <p className="mt-1 text-base font-semibold text-white sm:text-lg">
              Sell Scrap Online in Gorakhpur
            </p>

            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-white ring-1 ring-white/10 transition hover:scale-105 ${
                    social.icon === "facebook"
                      ? "bg-[#1877F2]"
                      : social.icon === "instagram"
                        ? "bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#515BD4]"
                        : social.icon === "youtube"
                          ? "bg-[#FF0000]"
                          : "bg-[#25D366]"
                  }`}
                >
                  <SocialIcon type={social.icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="hidden h-56 w-px bg-white/30 lg:block" />

          <div className="mt-10 flex justify-center lg:mt-0 lg:justify-start">
            <div className="flex items-start gap-4">
              <div className="mt-1 shrink-0 text-lime-300">
                <LocationIcon />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">
                  Registered Address:-
                </h3>

                <p className="mt-5 text-base leading-8 text-white/95 sm:text-lg">
                  216K, Ram Janki Nagar,
                  <br />
                  Kaushalpuram, Bashratpur,
                  <br />
                  Gorakhpur, Uttar Pradesh
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/30 pt-7">
          <div className="flex flex-col gap-5 text-center text-sm text-white/90 md:flex-row md:items-center md:justify-between md:text-left">
            <p>© 2026 Kabadi Baba. All rights reserved.</p>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:justify-end">
              <a href="#" className="transition hover:text-white">Privacy Policy</a>
              <span className="text-white/60">|</span>
              <a href="#" className="transition hover:text-white">Terms &amp; Conditions</a>
              <span className="text-white/60">|</span>
              <a href="#contact" className="transition hover:text-white">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
