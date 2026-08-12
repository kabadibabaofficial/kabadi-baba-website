'use client';

import React, { useState } from "react";
import { supabase } from "../lib/supabase";

const SCRAP_ITEMS = [
  "Newspaper",
  "Books",
  "Cardboard",
  "Plastic",
  "Iron",
  "Steel",
  "Copper",
  "Brass",
  "Aluminium",
  "Battery",
  "Computer",
  "Laptop",
  "Mobile",
  "TV",
  "Fridge",
  "AC",
  "Washing Machine",
  "Furniture",
  "E-Waste",
  "Mixed Scrap",
];

export default function BookPickup() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [scrap, setScrap] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleScrapChange = (item: string) => {
    setScrap((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (scrap.length === 0) {
      alert("कृपया कम से कम एक Scrap Type चुनें");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("bookings").insert([
        {
          full_name: name,
          mobile: mobile,
          address: address,
          scrap_type: scrap.join(", "),
          weight: 10,
          pickup_date: new Date().toISOString().split("T")[0],
          status: "Pending",
        },
      ]);

      if (error) {
        console.error(error);
        alert("❌ Something went wrong. Please try again.");
        return;
      }

      alert("✅ Pickup Request Submitted Successfully!");

      setName("");
      setMobile("");
      setAddress("");
      setScrap([]);
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="bg-gray-50 py-24">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-center text-gray-500 mb-10">
          अपना विवरण भरें, हमारी टीम जल्द संपर्क करेगी।
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-lg p-8 space-y-6"
        >
          <input
            type="text"
            placeholder="पूरा नाम"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-xl p-4"
            required
          />

          <input
            type="tel"
            placeholder="मोबाइल नंबर"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full border rounded-xl p-4"
            required
          />

          <textarea
            placeholder="पूरा पता"
            rows={4}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded-xl p-4"
            required
          />

          <div>
            <h3 className="text-lg font-semibold mb-4">Select Scrap Type</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {SCRAP_ITEMS.map((item) => {
                const checked = scrap.includes(item);
                return (
                  <label
                    key={item}
                    className={`flex items-center gap-2 border rounded-xl p-3 cursor-pointer bg-white hover:border-green-500 transition-colors ${
                      checked ? "border-green-600" : "border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleScrapChange(item)}
                      className="accent-green-600 w-4 h-4"
                    />
                    <span className="text-sm">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "⏳ Booking..." : "🚚 Book Pickup"}
          </button>
        </form>
      </div>
    </section>
  );
}
