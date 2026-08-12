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
    if (status === booking.status) {
      return;
    }

    startTransition(async () => {
      await updateBookingStatus(booking.id, status);
    });
  };

  const removeBooking = () => {
    const confirmed = window.confirm(
      `Delete ${booking.full_name}?\n\nThis action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      await deleteBooking(booking.id);
    });
  };

  return (
    <tr className="border-b bg-white transition hover:bg-gray-50">
      <td className="p-3 font-medium text-gray-900">
        {booking.full_name}
      </td>

      <td className="p-3 text-gray-700">
        {booking.mobile}
      </td>

      <td className="p-3 text-gray-700">
        {booking.address}
      </td>

      <td className="p-3 text-gray-700">
        {booking.scrap_type}
      </td>

      <td className="p-3 text-gray-700">
        {booking.weight}
      </td>

      <td className="p-3 text-gray-700">
        {booking.pickup_date}
      </td>

      <td className="p-3">
        <select
          value={booking.status}
          disabled={isPending}
          onChange={(event) =>
            changeStatus(
              event.target.value as BookingStatus
            )
          }
          className={`rounded-lg border px-2 py-1 text-sm font-medium focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 ${statusStyles[booking.status]}`}
        >
          <option value="pending">Pending</option>
          <option value="contacted">Contacted</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </td>

      <td className="p-3">
        <div className="flex gap-2">
          <a
            href={`tel:${booking.mobile}`}
            aria-label={`Call ${booking.full_name}`}
            className="rounded bg-blue-500 px-2 py-1 text-white transition hover:bg-blue-600"
          >
            📞
          </a>

          <a
            href={`https://wa.me/91${booking.mobile}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${booking.full_name}`}
            className="rounded bg-green-500 px-2 py-1 text-white transition hover:bg-green-600"
          >
            💬
          </a>

          <button
            type="button"
            onClick={removeBooking}
            disabled={isPending}
            aria-label={`Delete ${booking.full_name}`}
            className="rounded bg-red-500 px-2 py-1 text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            🗑️
          </button>
        </div>
      </td>
    </tr>
  );
}