"use client";

import { useMemo, useState } from "react";
import { Search, Save, Loader2 } from "lucide-react";
import { updateScrapRate } from "@/app/admin/actions";

type Category =
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
  category: Category;
};

interface RateManagerProps {
  initialRates: RateItem[];
}

const categories = [
  "All",
  "Paper",
  "Plastic",
  "Metal",
  "E-Waste",
  "Appliances",
  "Other",
] as const;

export default function RateManager({
  initialRates,
}: RateManagerProps) {
  const [rates, setRates] = useState<RateItem[]>(initialRates);
  const [search, setSearch] = useState("");
  const [category, setCategory] =
    useState<(typeof categories)[number]>("All");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const filteredRates = useMemo(() => {
    const query = search.trim().toLowerCase();

    return rates.filter((item) => {
      const categoryMatch =
        category === "All" || item.category === category;

      const searchMatch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return categoryMatch && searchMatch;
    });
  }, [rates, search, category]);

  const startEditing = (item: RateItem) => {
    setEditingId(item.id);
    setEditingValue(String(item.rate));
    setMessage("");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingValue("");
  };

  const saveRate = async (item: RateItem) => {
    const value = Number(editingValue);

    if (!Number.isFinite(value) || value < 0) {
      setMessage("Please enter a valid rate.");
      return;
    }

    setSavingId(item.id);
    setMessage("");

    try {
      await updateScrapRate(item.id, value);

      setRates((currentRates) =>
        currentRates.map((rate) =>
          rate.id === item.id
            ? { ...rate, rate: value }
            : rate
        )
      );

      setEditingId(null);
      setEditingValue("");
      setMessage(`${item.name} rate updated successfully.`);
    } catch (error) {
      console.error("Rate update error:", error);
      setMessage("Unable to update rate. Please try again.");
    } finally {
      setSavingId(null);
    }
  };

  return (
    <section className="mt-8 rounded-2xl bg-white p-3 shadow-sm sm:mt-10 sm:p-6">
      {/* HEADER */}
      <div className="mb-5 sm:mb-6">
        <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
          Kabadi Rates
        </h2>

        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          यहाँ से website के सभी scrap rates update करें।
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:mb-6 md:grid-cols-3">

        <div className="relative md:col-span-2">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search scrap item..."
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
          />
        </div>

        <select
          value={category}
          onChange={(event) =>
            setCategory(
              event.target.value as (typeof categories)[number]
            )
          }
          className="w-full rounded-xl border border-gray-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-3 py-3 text-xs font-medium text-green-700 sm:text-sm">
          {message}
        </div>
      )}

      {/* COUNT */}
      <div className="mb-3 text-xs font-medium text-gray-500 sm:text-sm">
        {filteredRates.length} rates available
      </div>

      {/* RATE LIST */}
      <div className="space-y-2 sm:space-y-3">
        {filteredRates.map((item) => {
          const isEditing = editingId === item.id;
          const isSaving = savingId === item.id;

          return (
            <div
              key={item.id}
              className="rounded-xl border border-gray-200 bg-gray-50 p-3 transition hover:border-green-200 hover:bg-white sm:p-4"
            >
              <div className="flex items-center justify-between gap-2">

                {/* ITEM INFO */}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-bold text-gray-900 sm:text-base">
                    {item.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-1.5 text-[10px] text-gray-500 sm:text-xs">
                    <span className="rounded-full bg-white px-2 py-0.5">
                      {item.category}
                    </span>

                    <span className="rounded-full bg-white px-2 py-0.5">
                      /{item.unit}
                    </span>
                  </div>
                </div>

                {/* RATE / EDIT */}
                {!isEditing ? (
                  <div className="flex shrink-0 items-center gap-2">
                    <div className="text-right">
                      <div className="text-sm font-extrabold text-green-700 sm:text-xl">
                        ₹{item.rate}
                      </div>

                      <div className="text-[9px] text-gray-500 sm:text-xs">
                        per {item.unit}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => startEditing(item)}
                      className="rounded-lg border border-green-600 bg-white px-3 py-2 text-xs font-semibold text-green-700 transition hover:bg-green-50 sm:px-5 sm:py-2.5 sm:text-sm"
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  /* EDIT MODE */
                  <div className="flex shrink-0 flex-wrap items-center justify-end gap-2">

                    <div className="flex items-center">
                      <span className="rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 px-2 py-2 text-sm font-semibold text-gray-700 sm:px-3 sm:py-3">
                        ₹
                      </span>

                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={editingValue}
                        onChange={(event) =>
                          setEditingValue(event.target.value)
                        }
                        autoFocus
                        className="w-20 rounded-r-lg border border-gray-300 bg-white px-2 py-2 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 sm:w-32 sm:px-3 sm:py-3"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => saveRate(item)}
                      disabled={isSaving}
                      className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4 sm:py-3 sm:text-sm"
                    >
                      {isSaving ? (
                        <>
                          <Loader2
                            size={15}
                            className="animate-spin"
                          />
                          Saving
                        </>
                      ) : (
                        <>
                          <Save size={15} />
                          Save
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={cancelEditing}
                      disabled={isSaving}
                      className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-100 disabled:opacity-60 sm:px-4 sm:py-3 sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* EMPTY STATE */}
      {filteredRates.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center">
          <p className="text-sm font-semibold text-gray-700">
            No rate found
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Try another search or category.
          </p>
        </div>
      )}
    </section>
  );
}