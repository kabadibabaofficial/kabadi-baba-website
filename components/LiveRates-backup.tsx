"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Search,
  FileText,
  Recycle,
  Wrench,
  Monitor,
  Home,
  Package,
  X,
} from "lucide-react";

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

function CategoryIcon({
  category,
}: {
  category: Exclude<Category, "All">;
}) {
  if (category === "Paper") {
    return <FileText size={18} />;
  }

  if (category === "Plastic") {
    return <Recycle size={18} />;
  }

  if (category === "Metal") {
    return <Wrench size={18} />;
  }

  if (category === "E-Waste") {
    return <Monitor size={18} />;
  }

  if (category === "Appliances") {
    return <Home size={18} />;
  }

  return <Package size={18} />;
}

export default function LiveRates() {
  const supabase = createClient();

  const [rates, setRates] = useState<RateItem[]>([]);
  const [activeCategory, setActiveCategory] =
    useState<Category>("All");
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

    return rates.filter((item) => {
      const categoryMatch =
        activeCategory === "All" ||
        item.category === activeCategory;

      const searchMatch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return categoryMatch && searchMatch;
    });
  }, [rates, activeCategory, search]);

  return (
    <section
      id="rates"
      className="bg-gray-50 py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* HEADER */}
        <div className="mb-7 text-center sm:mb-10">

          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:px-4 sm:py-2 sm:text-sm">
            Today&apos;s Scrap Rates
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 sm:mt-4 sm:text-4xl lg:text-5xl">
            Today&apos;s Kabadi Rates
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-xs leading-5 text-gray-600 sm:mt-3 sm:text-base sm:leading-6">
            Check our indicative scrap rates. Final price may vary
            according to material quality, quantity and current
            market conditions.
          </p>
        </div>

        {/* SEARCH */}
        <div className="mx-auto mb-4 max-w-2xl sm:mb-6">
          <div className="relative">

            <Search
              size={20}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search scrap item..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-11 text-sm shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 sm:rounded-2xl sm:px-5 sm:py-4 sm:pl-12 sm:text-base"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY FILTER */}
        <div className="mb-5 flex gap-2 overflow-x-auto pb-2 sm:mb-8 sm:flex-wrap sm:justify-center">

          {categories.map((category) => {
            const active = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition sm:px-4 sm:py-2.5 sm:text-sm ${
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
            <div className="mb-3 flex items-center justify-between sm:mb-4">
              <p className="text-xs font-medium text-gray-500 sm:text-sm">
                {filteredRates.length} items available
              </p>

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-xs font-semibold text-emerald-700 hover:underline sm:text-sm"
                >
                  Clear search
                </button>
              )}
            </div>

            {/* ========================= */}
            {/* MOBILE RATE LIST */}
            {/* ========================= */}

            {filteredRates.length > 0 ? (
              <>
                <div className="space-y-2.5 sm:hidden">

                  {filteredRates.map((item) => (
                    <div
                      key={`mobile-${item.category}-${item.name}-${item.id}`}
                      className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-3 py-3 shadow-sm"
                    >

                      {/* ICON */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        <CategoryIcon category={item.category} />
                      </div>

                      {/* NAME */}
                      <div className="min-w-0 flex-1">

                        <h3 className="truncate text-sm font-bold text-gray-900">
                          {item.name}
                        </h3>

                        <p className="mt-0.5 text-[10px] font-medium text-gray-400">
                          {item.category}
                        </p>

                      </div>

                      {/* RATE */}
                      <div className="shrink-0 text-right">

                        <div className="text-base font-extrabold text-emerald-700">
                          {rupee}
                          {item.rate}
                        </div>

                        <div className="text-[10px] font-medium text-gray-400">
                          /{item.unit}
                        </div>

                      </div>

                    </div>
                  ))}

                </div>

                {/* ========================= */}
                {/* DESKTOP RATE GRID */}
                {/* ========================= */}

                <div className="hidden sm:grid sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">

                  {filteredRates.map((item) => (
                    <div
                      key={`desktop-${item.category}-${item.name}-${item.id}`}
                      className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-5"
                    >

                      <div className="mb-3 flex items-start justify-between gap-2">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-lg text-emerald-600">
                          <CategoryIcon category={item.category} />
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
              </>
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
            <div className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-3 text-center sm:mt-8 sm:rounded-2xl sm:p-4">

              <p className="text-[11px] leading-5 text-amber-800 sm:text-sm">
                <strong>Note:</strong> Rates shown are indicative.
                Final rate is confirmed after checking material
                quality, weight and current market conditions.
              </p>

            </div>

          </>
        )}

      </div>
    </section>
  );
}