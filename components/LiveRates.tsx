"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

type Category =
  | "All"
  | "Paper"
  | "Plastic"
  | "Metal"
  | "E-Waste"
  | "Appliances"
  | "Other";

type RateItem = {
  id: string;
  name: string;
  rate: number;
  unit: "kg" | "pc";
  category: Exclude<Category, "All">;
};

const categories: Category[] = [
  "All",
  "Paper",
  "Plastic",
  "Metal",
  "E-Waste",
  "Appliances",
  "Other",
];

const popularOrder = [
  "Newspaper",
  "Carton",
  "Iron",
  "Aluminium",
  "Copper",
  "Brass",
  "Plastic Bottle",
  "Plastic",
  "Inverter Battery",
  "E-Waste",
  "Refrigerator",
  "Washing Machine",
];

const scrapImages: Record<string, string> = {
  // Paper
  "White Paper": "/images/scrap-rates/white-paper.png",
  "Record Paper": "/images/scrap-rates/record-paper.png",
  "Paper Tube": "/images/scrap-rates/paper-tube.png",
  "Grey Board": "/images/scrap-rates/grey-board.png",
  "Magazines": "/images/scrap-rates/magazines.png",
  "Books": "/images/scrap-rates/books.png",
  "Copy Paper": "/images/scrap-rates/copy-paper.png",
  Newspaper: "/images/scrap-rates/newspaper.webp",
  Carton: "/images/scrap-rates/carton.webp",

  // Plastic
  "Plastic Bottle": "/images/scrap-rates/plastic-bottle.webp",
  Plastic: "/images/scrap-rates/plastic.webp",
  "Plastic Drum (200 Litre)": "/images/scrap-rates/01-plastic-drum-200-litre.png",
  "Plastic Jar (15 Litre)": "/images/scrap-rates/02-plastic-jar-15-litre.png",
  "Mix Plastic": "/images/scrap-rates/03-mix-plastic.png",
  "Plastic Can (50 Litre)": "/images/scrap-rates/04-plastic-can-50-litre.png",
  "Plastic (PP) Bags": "/images/scrap-rates/05-plastic-pp-bags.png",
  "Polythene Bags (LD)": "/images/scrap-rates/06-polythene-bags-ld.png",
  "Water Tank (Sintex)": "/images/scrap-rates/07-water-tank-sintex.png",
  "Plastic Jar (5 Litre)": "/images/scrap-rates/08-plastic-jar-5-litre.png",
  "PVC Pipe": "/images/scrap-rates/09-pvc-pipe.png",
  "Packaging Film": "/images/scrap-rates/10-packaging-film.png",
  "Plastic Can (25 Litre)": "/images/scrap-rates/11-plastic-can-25-litre.png",
  "Soft Plastic": "/images/scrap-rates/12-soft-plastic.png",
  "Hard Plastic": "/images/scrap-rates/13-hard-plastic.png",
  "Polythene Bags (HM)": "/images/scrap-rates/14-polythene-bags-hm.png",
  "PET Bottle": "/images/scrap-rates/15-pet-bottle.png",

  // Metal
  "MS Drum (200 Litre)": "/images/scrap-rates/22-ms-drum-200-litre (2).png",
  "Aluminium Wire": "/images/scrap-rates/23-aluminium-wire.png",
  "Beverage Cans (Aluminium)": "/images/scrap-rates/24-beverage-cans-aluminium.png",
  "Copper Wire": "/images/scrap-rates/25-copper-wire.png",
  "Casting Aluminium": "/images/scrap-rates/26-casting-aluminium.png",
  "MS Drum (50 Litre)": "/images/scrap-rates/27-ms-drum-50-litre.png",
  Tin: "/images/scrap-rates/28-tin.png",
  Steel: "/images/scrap-rates/steel-scrap-new.png",
  Iron: "/images/scrap-rates/iron.webp",
  Aluminium: "/images/scrap-rates/aluminium.webp",
  Copper: "/images/scrap-rates/copper.webp",
  Brass: "/images/scrap-rates/brass.webp",

  // E-Waste
  "Monitor (LCD/LED)": "/images/scrap-rates/30-monitor-lcd-led.webp",
  "Monitor (CRT)": "/images/scrap-rates/31-monitor-crt.webp",
  Printer: "/images/scrap-rates/32-printer.webp",
  Laptop: "/images/scrap-rates/33-laptop.webp",
  "Computer CPU": "/images/scrap-rates/34-computer-cpu.webp",
  "Alkaline Battery": "/images/scrap-rates/35-alkaline-battery.webp",
  "UPS (with battery)": "/images/scrap-rates/36-ups-with-battery.webp",
  "UPS (without battery)": "/images/scrap-rates/37-ups-without-battery.webp",
  Microwave: "/images/scrap-rates/38-microwave.webp",
  "Inverter Battery": "/images/scrap-rates/Inverter_Battery.png",
  "E-Waste": "/images/scrap-rates/e-waste.webp",

  // Appliances
  "Refrigerator (Double Door)": "/images/scrap-rates/39_Refrigerator_Double_Door.png",
  "Refrigerator (Single Door)": "/images/scrap-rates/39_Refrigerator_Single_Door.png",
  Refrigerator: "/images/scrap-rates/39_Refrigerator_Double_Door.png",
  "Television (CRT)": "/images/scrap-rates/40_Television_CRT.png",
  "Television (LCD/LED)": "/images/scrap-rates/41_Television_LCD_LED.png",
  "AC (1.5 Ton)": "/images/scrap-rates/42_AC_1.5_Ton.png",
  "AC (1 Ton)": "/images/scrap-rates/43_AC_1_Ton.png",
  "AC (2 Ton)": "/images/scrap-rates/44_AC_2_Ton.png",
  Geyser: "/images/scrap-rates/45_Geyser.png",
  "Cooler (Plastic/Fibre)": "/images/scrap-rates/46_Cooler_Plastic_Fibre.png",
  "Cooler (Tin)": "/images/scrap-rates/47_Cooler_Tin.png",
  "Washing Machine": "/images/scrap-rates/washing-machine.webp",

  // Other
  Tyre: "/images/scrap-rates/48_Tyre.png",
  "Milk Covers": "/images/scrap-rates/49_Milk_Covers.png",
  Bike: "/images/scrap-rates/50_Bike.png",
  Fibre: "/images/scrap-rates/51_Fibre.png",
  "Other Scrap": "/images/scrap-rates/52_Other_Scrap.png",
  Car: "/images/scrap-rates/53_Car.png",
};

const rupee = "₹";

export default function LiveRates() {
  const supabase = createClient();

  const [rates, setRates] = useState<RateItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    const loadRates = async () => {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("scrap_rates")
        .select("id, name, rate, unit, category")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error loading scrap rates:", error);
        setErrorMessage(
          "Rates load नहीं हो पाए। Please try again."
        );
        setLoading(false);
        return;
      }

      setRates((data || []) as RateItem[]);
      setLoading(false);
    };

    loadRates();
  }, []);

  const filteredRates = useMemo(() => {
    const query = search.trim().toLowerCase();

    let filtered = rates.filter((item) => {
      const categoryMatch =
        activeCategory === "All" || item.category === activeCategory;

      const searchMatch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return categoryMatch && searchMatch;
    });

    /*
     * All section:
     * Popular items हमेशा सबसे ऊपर रहेंगे।
     */
    if (activeCategory === "All" && !query) {
      const popularItems: RateItem[] = [];
      const remainingItems: RateItem[] = [];

      popularOrder.forEach((popularName) => {
        const found = filtered.find(
          (item) => item.name.toLowerCase() === popularName.toLowerCase()
        );

        if (found) {
          popularItems.push(found);
        }
      });

      filtered.forEach((item) => {
        const isPopular = popularOrder.some(
          (name) => name.toLowerCase() === item.name.toLowerCase()
        );

        if (!isPopular) {
          remainingItems.push(item);
        }
      });

      filtered = showAll
        ? [...popularItems, ...remainingItems]
        : popularItems;
    }

    return filtered;
  }, [rates, activeCategory, search, showAll]);

  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    setShowAll(false);
    setSearch("");
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setShowAll(false);
  };

  return (
    <section id="rates" className="bg-gray-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* Heading */}
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

        {/* Search */}
        <div className="mx-auto mb-6 max-w-2xl">
          <div className="relative">
            <input
              type="search"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search scrap item..."
              className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-4 pr-12 text-base shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />

            <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-xl text-gray-400">
              🔍
            </span>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center">
          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
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

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="text-lg font-semibold text-gray-700">
              Loading today&apos;s rates...
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Please wait.
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && errorMessage && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
            <div className="text-lg font-bold text-red-700">
              Rates load नहीं हो पाए
            </div>

            <p className="mt-2 text-sm text-red-600">
              {errorMessage}
            </p>
          </div>
        )}

        {/* Rates */}
        {!loading && !errorMessage && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                {activeCategory === "All" && !search
                  ? showAll
                    ? `${rates.length} items available`
                    : `${filteredRates.length} popular items`
                  : `${filteredRates.length} items available`}
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

            {filteredRates.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                {filteredRates.map((item) => (
                  <div
                    key={`${item.category}-${item.name}-${item.id}`}
                    className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-5"
                  >
                    {/* Large Item Image + Category */}
                    <div className="mb-4">
                      <div className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-white p-2 sm:h-44">
                        {scrapImages[item.name] ? (
                          <Image
                            src={scrapImages[item.name]}
                            alt={`${item.name} scrap`}
                            width={200}
                            height={200}
                            loading="lazy"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
                          />
                        ) : (
                          <span className="text-6xl">
                            {item.category === "Paper" && "📄"}
                            {item.category === "Plastic" && "♻️"}
                            {item.category === "Metal" && "🔧"}
                            {item.category === "E-Waste" && "💻"}
                            {item.category === "Appliances" && "🧊"}
                            {item.category === "Other" && "♻️"}
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex justify-end">
                        <span className="rounded-full bg-gray-50 px-2 py-1 text-[10px] font-medium text-gray-500">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Name */}
                    <h3 className="min-h-[40px] text-sm font-bold leading-5 text-gray-900 sm:text-base">
                      {item.name}
                    </h3>

                    {/* Rate */}
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

            {/* Note */}
            <div className="mt-8 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-center">
              <p className="text-xs leading-5 text-amber-800 sm:text-sm">
                <strong>Note:</strong> Rates shown are indicative. Final rate
                is confirmed after checking material quality, weight and
                current market conditions.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}