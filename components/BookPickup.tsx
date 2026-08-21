"use client";

import React, { useState } from "react";
import { supabase } from "../lib/supabase";
import { MapPin, Navigation } from "lucide-react";

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
  const [weight, setWeight] = useState("");
  const [pickupDate, setPickupDate] = useState("");

  // Location
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationMessage, setLocationMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleScrapChange = (item: string) => {
    setScrap((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  // GET CURRENT LOCATION
  const handleGetLocation = () => {
    setLocationMessage("");
    setErrorMessage("");

    if (!navigator.geolocation) {
      setLocationMessage("Your browser does not support location.");
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLatitude(lat);
        setLongitude(lng);

        setLocationMessage(
          "✓ Location captured successfully."
        );

        setLocationLoading(false);
      },
      (error) => {
        console.error("Location error:", error);

        let message =
          "Unable to get your location. Please allow location permission.";

        if (error.code === error.PERMISSION_DENIED) {
          message =
            "Location permission denied. Please allow location access in your browser.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          message = "Your location is currently unavailable. Please try again.";
        } else if (error.code === error.TIMEOUT) {
          message = "Location request timed out. Please try again.";
        }

        setLocationMessage(message);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSuccess("");
    setErrorMessage("");

    const cleanName = name.trim();
    const cleanMobile = mobile.replace(/\D/g, "");
    const cleanAddress = address.trim();
    const numericWeight = weight ? Number(weight) : 0;

    if (!cleanName) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(cleanMobile)) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!cleanAddress) {
      setErrorMessage("Please enter your complete address.");
      return;
    }

    if (scrap.length === 0) {
      setErrorMessage("Please select at least one scrap type.");
      return;
    }

    if (weight && (Number.isNaN(numericWeight) || numericWeight < 0)) {
      setErrorMessage("Please enter a valid weight.");
      return;
    }

    if (pickupDate && pickupDate < today) {
      setErrorMessage("Please select today or a future pickup date.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("bookings").insert([
        {
          full_name: cleanName,
          mobile: cleanMobile,
          address: cleanAddress,
          scrap_type: scrap.join(", "),
          weight: numericWeight,
          pickup_date: pickupDate || today,
          latitude,
          longitude,
          status: "pending",
        },
      ]);

      if (error) {
        console.error("Booking error:", error);

        setErrorMessage(
          "Unable to submit your pickup request. Please try again."
        );

        return;
      }

      setSuccess(
        "Pickup request received successfully! Our team will contact you soon."
      );

      setName("");
      setMobile("");
      setAddress("");
      setScrap([]);
      setWeight("");
      setPickupDate("");
      setLatitude(null);
      setLongitude(null);
      setLocationMessage("");
    } catch (error) {
      console.error("Unexpected booking error:", error);

      setErrorMessage(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="booking"
      className="bg-gray-50 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">

        {/* HEADER */}
        <div className="mb-8 text-center sm:mb-10">
          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
            Free Doorstep Pickup
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Book a Scrap Pickup
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            अपना विवरण भरें और हमारी टीम जल्द ही आपसे संपर्क करेगी।
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="space-y-7 rounded-3xl bg-white p-5 shadow-lg sm:p-8"
        >

          {/* CUSTOMER DETAILS */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-900">
              Customer Details
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">

              {/* NAME */}
              <div>
                <label
                  htmlFor="booking-name"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Full Name *
                </label>

                <input
                  id="booking-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  autoComplete="name"
                  required
                  disabled={loading}
                  className="min-h-[50px] w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-gray-100"
                />
              </div>

              {/* MOBILE */}
              <div>
                <label
                  htmlFor="booking-mobile"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Mobile Number *
                </label>

                <input
                  id="booking-mobile"
                  type="tel"
                  value={mobile}
                  onChange={(e) =>
                    setMobile(
                      e.target.value.replace(/\D/g, "").slice(0, 10)
                    )
                  }
                  placeholder="10-digit mobile number"
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength={10}
                  required
                  disabled={loading}
                  className="min-h-[50px] w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-gray-100"
                />
              </div>

              {/* ADDRESS */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="booking-address"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Complete Address *
                </label>

                <textarea
                  id="booking-address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House / Flat, Area, Landmark, Gorakhpur"
                  rows={3}
                  required
                  disabled={loading}
                  className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-gray-100"
                />
              </div>

              {/* LOCATION */}
              <div className="sm:col-span-2">
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                        <MapPin className="h-6 w-6 text-emerald-600" />
                      </div>

                      <div>
                        <h4 className="font-bold text-gray-900">
                          Pickup Location
                        </h4>

                        <p className="mt-1 text-xs leading-5 text-gray-600 sm:text-sm">
                          अपने pickup location को आसानी से share करें।
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleGetLocation}
                      disabled={loading || locationLoading}
                      className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Navigation className="h-5 w-5" />

                      {locationLoading
                        ? "Getting Location..."
                        : "Use My Current Location"}
                    </button>

                  </div>

                  {locationMessage && (
                    <div
                      className={`mt-3 rounded-xl px-3 py-2 text-xs font-medium sm:text-sm ${
                        latitude !== null && longitude !== null
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {locationMessage}
                    </div>
                  )}

                  {latitude !== null && longitude !== null && (
                    <div className="mt-3 rounded-xl bg-white p-3 text-xs text-gray-600">
                      <span className="font-semibold text-gray-800">
                        Location captured:
                      </span>{" "}
                      {latitude.toFixed(6)}, {longitude.toFixed(6)}
                    </div>
                  )}

                  <p className="mt-3 text-[11px] leading-5 text-gray-500">
                    Location sharing is optional. Your address is still required
                    for pickup.
                  </p>

                </div>
              </div>

            </div>
          </div>

          {/* SCRAP TYPE */}
          <div>
            <h3 className="mb-1 text-lg font-bold text-gray-900">
              What Scrap Do You Have?
            </h3>

            <p className="mb-4 text-sm text-gray-500">
              Select one or more items.
            </p>

            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4">
              {SCRAP_ITEMS.map((item) => {
                const checked = scrap.includes(item);

                return (
                  <label
                    key={item}
                    className={`flex min-h-[48px] cursor-pointer items-center gap-2 rounded-xl border p-3 transition ${
                      checked
                        ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                        : "border-gray-200 bg-white text-gray-700 hover:border-emerald-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleScrapChange(item)}
                      disabled={loading}
                      className="h-4 w-4 accent-emerald-600"
                    />

                    <span className="text-sm font-medium">
                      {item}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* WEIGHT + DATE */}
          <div className="grid gap-4 sm:grid-cols-2">

            <div>
              <label
                htmlFor="booking-weight"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Approximate Weight (kg)
              </label>

              <input
                id="booking-weight"
                type="number"
                min="0"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 25"
                inputMode="decimal"
                disabled={loading}
                className="min-h-[50px] w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-gray-100"
              />

              <p className="mt-1.5 text-xs text-gray-500">
                Weight नहीं पता? इसे खाली छोड़ सकते हैं।
              </p>
            </div>

            <div>
              <label
                htmlFor="booking-date"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Preferred Pickup Date
              </label>

              <input
                id="booking-date"
                type="date"
                min={today}
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                disabled={loading}
                className="min-h-[50px] w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:bg-gray-100"
              />
            </div>

          </div>

          {/* ERROR */}
          {errorMessage && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
            >
              {errorMessage}
            </div>
          )}

          {/* SUCCESS */}
          {success && (
            <div
              role="status"
              className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-700"
            >
              ✓ {success}
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="min-h-[52px] w-full rounded-xl bg-emerald-600 px-6 py-3 text-base font-bold text-white shadow-md transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Submitting Request..." : "🚚 Book Free Pickup"}
          </button>

          <p className="text-center text-xs leading-5 text-gray-500">
            Free doorstep pickup • Transparent weighing • Best market price
          </p>

        </form>
      </div>
    </section>
  );
}