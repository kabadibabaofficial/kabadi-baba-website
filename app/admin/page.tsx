import { getBookings, getDashboardStats } from "./data";
import { DashboardCards } from "@/components/admin/DashboardCards";
import BookingsTable from "@/components/admin/BookingsTable";
import RateManager from "@/components/admin/RateManager";
import { createClient } from "@/lib/supabase/server";

interface Props {
  searchParams: Promise<{
    q?: string;
    status?: string;
  }>;
}

const validStatuses = [
  "pending",
  "contacted",
  "completed",
  "cancelled",
] as const;

export default async function AdminPage({
  searchParams,
}: Props) {
  const { q, status } = await searchParams;

  const selectedStatus = validStatuses.includes(
    status as (typeof validStatuses)[number]
  )
    ? (status as (typeof validStatuses)[number])
    : undefined;

  const supabase = await createClient();

  const [bookings, stats, ratesResult] = await Promise.all([
    getBookings(q, selectedStatus),
    getDashboardStats(),
    supabase
      .from("scrap_rates")
      .select("id, name, rate, unit, category")
      .order("id", { ascending: true }),
  ]);

  if (ratesResult.error) {
    console.error(
      "Error fetching scrap rates:",
      ratesResult.error
    );
  }

  const rates = ratesResult.data ?? [];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl p-6">

        {/* PAGE TITLE */}
        <h1 className="mb-8 text-4xl font-bold text-green-600">
          Kabadi Baba Admin Dashboard
        </h1>

        {/* DASHBOARD STATS */}
        <DashboardCards stats={stats} />

        {/* ========================================
            CUSTOMER SEARCH / FILTER
        ======================================== */}

        <form
          method="GET"
          className="my-6 grid gap-4 rounded-xl bg-white p-4 shadow-sm md:grid-cols-4"
        >
          <input
            type="text"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search Name / Mobile / Address..."
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200 md:col-span-3"
          />

          <select
            name="status"
            defaultValue={selectedStatus ?? ""}
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div className="flex gap-3 md:col-span-4">
            <button
              type="submit"
              className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
            >
              Search
            </button>

            <a
              href="/admin"
              className="rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Reset
            </a>
          </div>
        </form>

        {/* ========================================
            CUSTOMER DETAILS / BOOKINGS
        ======================================== */}

        <BookingsTable bookings={bookings} />

        {/* ========================================
            KABADI RATES - LAST
        ======================================== */}

        <RateManager initialRates={rates} />

      </div>
    </div>
  );
}