"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    title: "Paper",
    desc: "Newspaper & Books",
    image: "/scrap/01-Paper.png",
  },
  {
    title: "Plastic",
    desc: "Plastic Bottles & Scrap",
    image: "/scrap/02-Plastic.png",
  },
  {
    title: "Iron & Steel",
    desc: "Iron, Steel & Metal",
    image: "/scrap/03-Iron-Steel.png",
  },
  {
    title: "Copper & Brass",
    desc: "Copper, Brass & Wires",
    image: "/scrap/04-Copper-Brass.png",
  },
  {
    title: "E-Waste",
    desc: "Electronic Scrap",
    image: "/scrap/05-E-Waste.png",
  },
  {
    title: "Appliances",
    desc: "AC, Fridge & Machines",
    image: "/scrap/06-Appliances.png",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-white py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Heading */}
        <div className="mb-8 text-center sm:mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Recyclables we pick
          </h2>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Paper | Plastic | Metals | E-Waste | Appliances &amp; More
          </p>
        </div>

        {/* Featured Scrap Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6 lg:gap-5">
          {categories.map((item) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative aspect-[1.15/1] overflow-hidden bg-gray-50">
                <Image
                  src={item.image}
                  alt={`${item.title} scrap pickup in Gorakhpur - Kabadi Baba`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  quality={100}
                  priority
                  className="object-contain p-0.5 transition-transform duration-500 group-hover:scale-105"
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
              </div>

              {/* Title */}
              <div className="px-2 py-3 text-center sm:px-3 sm:py-4">
                <h3 className="text-sm font-bold text-gray-900 sm:text-base">
                  {item.title}
                </h3>

                <p className="mt-1 text-[10px] leading-4 text-gray-500 sm:text-xs">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-7 text-center sm:mt-9">
          <Link
            href="#booking"
            className="inline-flex items-center justify-center rounded-lg border border-green-600 px-6 py-2.5 text-sm font-semibold text-green-700 transition-all duration-300 hover:bg-green-600 hover:text-white sm:px-8 sm:py-3"
          >
            View All Scrap We Buy
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
