"use client";

import React, { useMemo, useState } from "react";

type Category =
  | "All"
  | "Paper"
  | "Plastic"
  | "Metal"
  | "E-Waste"
  | "Appliances"
  | "Other";

type RateItem = {
  name: string;
  rate: string;
  unit: "kg" | "pc";
  category: Exclude<Category, "All">;
};

const rates: RateItem[] = [
  // PAPER
  { name: "Newspaper", rate: "10", unit: "kg", category: "Paper" },
  { name: "Carton", rate: "10", unit: "kg", category: "Paper" },
  { name: "Books", rate: "9", unit: "kg", category: "Paper" },
  { name: "Grey Board", rate: "2", unit: "kg", category: "Paper" },
  { name: "Copy Paper", rate: "10", unit: "kg", category: "Paper" },
  { name: "Magazines", rate: "7", unit: "kg", category: "Paper" },
  { name: "Record Paper", rate: "8", unit: "kg", category: "Paper" },
  { name: "White Paper", rate: "8", unit: "kg", category: "Paper" },
  { name: "Paper Tube", rate: "6", unit: "kg", category: "Paper" },

  // PLASTIC
  { name: "Mix Plastic", rate: "4", unit: "kg", category: "Plastic" },
  { name: "Soft Plastic", rate: "10", unit: "kg", category: "Plastic" },
  { name: "Hard Plastic", rate: "2", unit: "kg", category: "Plastic" },
  { name: "Plastic Jar (15 Litre)", rate: "15", unit: "kg", category: "Plastic" },
  { name: "Plastic Jar (5 Litre)", rate: "15", unit: "kg", category: "Plastic" },
  { name: "Polythene Bags (LD)", rate: "8", unit: "kg", category: "Plastic" },
  { name: "Plastic (PP) Bags", rate: "3", unit: "kg", category: "Plastic" },
  { name: "PVC Pipe", rate: "5", unit: "kg", category: "Plastic" },
  { name: "PET Bottle", rate: "15", unit: "kg", category: "Plastic" },
  { name: "Water Tank (Sintex)", rate: "15", unit: "kg", category: "Plastic" },
  { name: "Plastic Can (25 Litre)", rate: "15", unit: "kg", category: "Plastic" },
  { name: "Plastic Can (50 Litre)", rate: "15", unit: "kg", category: "Plastic" },
  { name: "Plastic Drum (200 Litre)", rate: "15", unit: "kg", category: "Plastic" },
  { name: "Polythene Bags (HM)", rate: "10", unit: "kg", category: "Plastic" },
  { name: "Packaging Film", rate: "0", unit: "kg", category: "Plastic" },

  // METAL
  { name: "Iron", rate: "24", unit: "kg", category: "Metal" },
  { name: "Tin", rate: "20", unit: "kg", category: "Metal" },
  { name: "Aluminium", rate: "155", unit: "kg", category: "Metal" },
  { name: "Steel", rate: "45", unit: "kg", category: "Metal" },
  { name: "Brass", rate: "410", unit: "kg", category: "Metal" },
  { name: "Copper", rate: "650", unit: "kg", category: "Metal" },
  { name: "Casting Aluminium", rate: "110", unit: "kg", category: "Metal" },
  { name: "Beverage Cans (Aluminium)", rate: "110", unit: "kg", category: "Metal" },
  { name: "Copper Wire", rate: "45", unit: "kg", category: "Metal" },
  { name: "Aluminium Wire", rate: "20", unit: "kg", category: "Metal" },
  { name: "MS Drum (200 Litre)", rate: "19", unit: "kg", category: "Metal" },
  { name: "MS Drum (50 Litre)", rate: "20", unit: "kg", category: "Metal" },

  // E-WASTE
  { name: "E-Waste", rate: "15", unit: "kg", category: "E-Waste" },
  { name: "Laptop", rate: "50", unit: "pc", category: "E-Waste" },
  { name: "Computer CPU", rate: "200", unit: "pc", category: "E-Waste" },
  { name: "Monitor (CRT)", rate: "180", unit: "pc", category: "E-Waste" },
  { name: "Monitor (LCD/LED)", rate: "40", unit: "pc", category: "E-Waste" },
  { name: "Printer", rate: "25", unit: "kg", category: "E-Waste" },
  { name: "UPS (with battery)", rate: "220", unit: "pc", category: "E-Waste" },
  { name: "UPS (without battery)", rate: "120", unit: "pc", category: "E-Waste" },
  { name: "Microwave", rate: "18", unit: "kg", category: "E-Waste" },
  { name: "Alkaline Battery", rate: "2", unit: "kg", category: "E-Waste" },
  { name: "Inverter Battery", rate: "80", unit: "kg", category: "E-Waste" },

  // APPLIANCES
  { name: "Television (LCD/LED)", rate: "40", unit: "pc", category: "Appliances" },
  { name: "Television (CRT)", rate: "40", unit: "pc", category: "Appliances" },
  { name: "AC (1 Ton)", rate: "2000", unit: "pc", category: "Appliances" },
  { name: "AC (1.5 Ton)", rate: "2500", unit: "pc", category: "Appliances" },
  { name: "AC (2 Ton)", rate: "3000", unit: "pc", category: "Appliances" },
  { name: "Washing Machine", rate: "500", unit: "pc", category: "Appliances" },
  { name: "Refrigerator (Single Door)", rate: "400", unit: "pc", category: "Appliances" },
  { name: "Refrigerator (Double Door)", rate: "600", unit: "pc", category: "Appliances" },
  { name: "Geyser", rate: "15", unit: "kg", category: "Appliances" },
  { name: "Cooler (Plastic/Fibre)", rate: "5", unit: "kg", category: "Appliances" },
  { name: "Cooler (Tin)", rate: "15", unit: "kg", category: "Appliances" },

  // OTHER
  { name: "Tyre", rate: "3", unit: "kg", category: "Other" },
  { name: "Fibre", rate: "5", unit: "kg", category: "Other" },
  { name: "Milk Covers", rate: "0", unit: "kg", category: "Other" },
  { name: "Bike", rate: "2000", unit: "pc", category: "Other" },
  { name: "Car", rate: "8000", unit: "pc", category: "Other" },
  { name: "Other Scrap", rate: "2", unit: "kg", category: "Other" },
];

const categories: Category[] = [
  "All",
  "Paper",
  "Plastic",
  "Metal",
  "E-Waste",
  "Appliances",
  "Other",
];

const rupee = "\u20B9";

export default function LiveRates() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [search, setSearch] = useState("");

  const filteredRates = useMemo(() => {
    const query = search.trim().toLowerCase();

    return rates.filter((item) => {
      const categoryMatch =
        activeCategory === "All" || item.category === activeCategory;

      const searchMatch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  return (
    <section id="rates" className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* HEADER */}
        <div className="mb-8 text-center sm:mb-10">
          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            Today&apos;s Scrap Rates
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Today&apos;s Kabadi Rates
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Check our indicative scrap rates. Final price may vary according
            to material quality, quantity and current market conditions.
          </p>
        </div>

        {/* SEARCH */}
        <div className="mx-auto mb-6 max-w-2xl">
          <div className="relative">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search scrap item..."
              className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 pr-12 text-base shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />

            <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-xl text-gray-400">
              🔍
            </span>
          </div>
        </div>

        {/* CATEGORY FILTER */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center">
          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "bg-emerald-600 text-white shadow-md"
                    : "bg-white text-gray-700 shadow-sm hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* RESULT COUNT */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">
            {filteredRates.length} items available
          </p>

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-sm font-semibold text-emerald-700 hover:underline"
            >
              Clear search
            </button>
          )}
        </div>

        {/* RATE CARDS */}
        {filteredRates.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {filteredRates.map((item) => (
              <div
                key={`${item.category}-${item.name}`}
                className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-5"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-lg">
                    {item.category === "Paper" && "📄"}
                    {item.category === "Plastic" && "♻️"}
                    {item.category === "Metal" && "🔩"}
                    {item.category === "E-Waste" && "💻"}
                    {item.category === "Appliances" && "🏠"}
                    {item.category === "Other" && "♻️"}
                  </div>

                  <span className="rounded-full bg-gray-50 px-2 py-1 text-[10px] font-medium text-gray-500">
                    {item.category}
                  </span>
                </div>

                <h3 className="min-h-[40px] text-sm font-bold leading-5 text-gray-900 sm:text-base">
                  {item.name}
                </h3>

                <div className="mt-3">
                  <span className="text-xl font-extrabold text-emerald-700 sm:text-2xl">
                    {rupee}
                    {item.rate}
                  </span>

                  <span className="ml-1 text-xs font-medium text-gray-500">
                    /{item.unit}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="text-4xl">🔎</div>
            <h3 className="mt-3 text-lg font-bold text-gray-900">
              No scrap item found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Try another item or category.
            </p>
          </div>
        )}

        {/* DISCLAIMER */}
        <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-center">
          <p className="text-xs leading-5 text-amber-800 sm:text-sm">
            <strong>Note:</strong> Rates shown are indicative. Final rate is
            confirmed after checking material quality, weight and current
            market conditions.
          </p>
        </div>

      </div>
    </section>
  );
}