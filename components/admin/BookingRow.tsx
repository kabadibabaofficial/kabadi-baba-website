"use client";

import { useTransition } from "react";
import {
  updateBookingStatus,
  deleteBooking,
} from "@/app/admin/actions";

type BookingStatus =
  | "pending"
  | "contacted"
  | "completed"
  | "cancelled";

interface Booking {
  id: string;
  full_name: string;
  mobile: string;
  address: string;
  scrap_type: string;
  weight: number | string;
  pickup_date: string;
  status: BookingStatus;
  created_at: string;
  latitude: number | null;
  longitude: number | null;
}

interface Props {
  booking: Booking;
}

const statusStyles: Record<BookingStatus, string> = {
  pending: "border-yellow-300 bg-yellow-50 text-yellow-700",
  contacted: "border-blue-300 bg-blue-50 text-blue-700",
  completed: "border-green-300 bg-green-50 text-green-700",
  cancelled: "border-red-300 bg-red-50 text-red-700",
};

export default function BookingRow({ booking }: Props) {
  const [isPending, startTransition] = useTransition();

  const changeStatus = (status: BookingStatus) => {
    if (status === booking.status) return;

    startTransition(async () => {
      try {
        await updateBookingStatus(booking.id, status);
      } catch (error) {
        console.error("Status update error:", error);
        alert("Status update nahi ho saka.");
      }
    });
  };

  const removeBooking = () => {
    const confirmed = window.confirm(
      `Delete ${booking.full_name}?\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    startTransition(async () => {
      try {
        await deleteBooking(booking.id);
      } catch (error) {
        console.error("Delete booking error:", error);
        alert("Booking delete nahi ho saki.");
      }
    });
  };

  const hasLocation =
    booking.latitude !== null &&
    booking.longitude !== null &&
    booking.latitude !== undefined &&
    booking.longitude !== undefined;

  const mapsUrl = hasLocation
    ? `https://www.google.com/maps?q=${booking.latitude},${booking.longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        booking.address
      )}`;

  const whatsappNumber = booking.mobile.replace(/\D/g, "");

  return (
    <tr className="border-b bg-white transition hover:bg-gray-50">

      {/* CUSTOMER */}
      <td className="p-3 font-medium text-gray-900">
        {booking.full_name}
      </td>

      {/* MOBILE */}
      <td className="p-3 text-gray-700">
        {booking.mobile}
      </td>

      {/* ADDRESS */}
      <td className="p-3 text-gray-700">
        {booking.address}
      </td>

      {/* SCRAP */}
      <td className="p-3 text-gray-700">
        {booking.scrap_type}
      </td>

      {/* WEIGHT */}
      <td className="p-3 text-gray-700">
        {booking.weight}
      </td>

      {/* PICKUP DATE */}
      <td className="p-3 text-gray-700">
        {booking.pickup_date}
      </td>

      {/* STATUS */}
      <td className="p-3">
        <select
          value={booking.status}
          disabled={isPending}
          onChange={(event) =>
            changeStatus(
              event.target.value as BookingStatus
            )
          }
          className={`rounded-lg border px-2 py-1 text-sm font-medium focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
            statusStyles[booking.status]
          }`}
        >
          <option value="pending">Pending</option>
          <option value="contacted">Contacted</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </td>

      {/* ACTIONS */}
      <td className="p-3">
        <div className="flex flex-wrap gap-2">

          {/* CALL */}
          <a
            href={`tel:${booking.mobile}`}
            title="Call customer"
            aria-label={`Call ${booking.full_name}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500 text-lg text-white shadow-sm transition hover:bg-blue-600"
          >
            📞
          </a>

          {/* WHATSAPP */}
          <a
            href={`https://wa.me/91${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp customer"
            aria-label={`WhatsApp ${booking.full_name}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-green-500 text-lg text-white shadow-sm transition hover:bg-green-600"
          >
            💬
          </a>

          {/* LOCATION */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={
              hasLocation
                ? "Open exact customer location"
                : "Open address in Google Maps"
            }
            aria-label={`View location of ${booking.full_name}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-lg text-white shadow-sm transition hover:bg-emerald-700"
          >
            📍
          </a>

          {/* INVOICE */}
          <a
            href={`/admin/invoice?booking=${booking.id}`}
            title="Create invoice"
            aria-label={`Create invoice for ${booking.full_name}`}
            className="inline-flex h-9 items-center justify-center rounded-lg bg-purple-600 px-3 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700"
          >
            Invoice
          </a>

          {/* DELETE */}
          <button
            type="button"
            onClick={removeBooking}
            disabled={isPending}
            title="Delete booking"
            aria-label={`Delete ${booking.full_name}`}
            className="inline-flex h-9 items-center justify-center rounded-lg bg-red-600 px-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            🗑️ Delete
          </button>

        </div>
      </td>
    </tr>
  );
}