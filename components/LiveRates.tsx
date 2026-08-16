"use client";

import React, { useEffect, useMemo, useState } from "react";
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

const rupee = "₹";

export default function LiveRates() {
  const supabase = createClient();

  const [rates, setRates] = useState<RateItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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
        setErrorMessage("Rates load नहीं हो पाए। Please try again.");
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

    return rates.filter((item) => {
      const categoryMatch =
        activeCategory === "All" || item.category === activeCategory;

      const searchMatch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return categoryMatch && searchMatch;
    });
  }, [rates, activeCategory, search]);

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

        {/* LOADING */}
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

        {/* ERROR */}
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

        {/* RESULTS */}
        {!loading && !errorMessage && (
          <>
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
                    key={`${item.category}-${item.name}-${item.id}`}
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