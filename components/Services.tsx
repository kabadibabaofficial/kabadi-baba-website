"use client";

import React from "react";
import Link from "next/link";

const categories = [
  {
    title: "Newspaper",
    desc: "पुराने अखबार और मैगज़ीन",
    image: "/scrap/Newspaper.png",
  },
  {
    title: "Books",
    desc: "किताबें और नोट्स",
    image: "/scrap/Books.png",
  },
  {
    title: "Cardboard",
    desc: "कार्डबोर्ड बॉक्स",
    image: "/scrap/Cardboard.png",
  },
  {
    title: "Plastic",
    desc: "सभी प्रकार का प्लास्टिक",
    image: "/scrap/plasti.png",
  },
  {
    title: "Iron",
    desc: "लोहा और आयरन स्क्रैप",
    image: "/scrap/Iron.png",
  },
  {
    title: "Steel",
    desc: "स्टील का सामान",
    image: "/scrap/Steel.png",
  },
  {
    title: "Copper",
    desc: "तांबा और वायर",
    image: "/scrap/Copper.png",
  },
  {
    title: "Brass",
    desc: "पीतल का सामान",
    image: "/scrap/Brass.png",
  },
  {
    title: "Aluminium",
    desc: "एल्यूमिनियम स्क्रैप",
    image: "/scrap/Aluminium.png",
  },
  {
    title: "Battery",
    desc: "कार और इन्वर्टर बैटरी",
    image: "/scrap/Battery.png",
  },
  {
    title: "Computer",
    desc: "पुराना कंप्यूटर",
    image: "/scrap/Computer.png",
  },
  {
    title: "Laptop",
    desc: "पुराना लैपटॉप",
    image: "/scrap/Laptop.png",
  },
  {
    title: "Mobile",
    desc: "पुराने मोबाइल फोन",
    image: "/scrap/mobile.png",
  },
  {
    title: "TV",
    desc: "TV और LED",
    image: "/scrap/Television.png",
  },
  {
    title: "Fridge",
    desc: "पुराना फ्रिज",
    image: "/scrap/Refrigerator.png",
  },
  {
    title: "AC",
    desc: "पुराना AC",
    image: "/scrap/Air Conditioner.png",
  },
  {
    title: "Washing Machine",
    desc: "पुरानी वॉशिंग मशीन",
    image: "/scrap/Washing Machine.png",
  },
  {
    title: "Furniture",
    desc: "पुराना फर्नीचर",
    image: "/scrap/Furniture.png",
  },
  {
    title: "E-Waste",
    desc: "इलेक्ट्रॉनिक वेस्ट",
    image: "/scrap/E-Waste.png",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Heading */}
        <div className="mb-10 text-center sm:mb-14">
          <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            We Buy Scrap
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-5xl">
            हम क्या खरीदते हैं
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600 sm:mt-4 sm:text-xl">
            घर बैठे अपना पुराना कबाड़ बेचें और तुरंत भुगतान पाएं
          </p>
        </div>

        {/* Scrap Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">

          {categories.map((item) => (
            <div
              key={item.title}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:rounded-3xl"
            >

              {/* Image Area */}
              <div className="relative h-28 overflow-hidden bg-green-50 sm:h-36">

                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div className="pointer-events-none absolute inset-0 bg-green-900/0 transition group-hover:bg-green-900/10" />
              </div>

              {/* Text */}
              <div className="p-3 text-center sm:p-5">

                <h3 className="text-sm font-bold text-gray-900 sm:text-lg">
                  {item.title}
                </h3>

                <p className="mt-1 text-[10px] leading-4 text-gray-500 sm:text-sm sm:leading-5">
                  {item.desc}
                </p>

              </div>

            </div>
          ))}

        </div>

        {/* Button */}
        <div className="mt-10 text-center sm:mt-14">
          <Link
            href="#booking"
            className="inline-flex items-center justify-center rounded-xl bg-green-600 px-7 py-3 font-bold text-white shadow-md transition hover:bg-green-700 sm:px-10 sm:py-4"
          >
            🚚 Book Free Pickup
          </Link>
        </div>

      </div>
    </section>
  );
}