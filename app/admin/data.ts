import { supabase } from "@/lib/supabase";

export type BookingStatus =
  | "pending"
  | "contacted"
  | "completed"
  | "cancelled";

export interface Booking {
  id: string;
  full_name: string;
  mobile: string;
  address: string;
  scrap_type: string;
  weight: number;
  pickup_date: string;
  status: BookingStatus;
  created_at: string;
}

export async function getBookings(
  search?: string,
  status?: BookingStatus
): Promise<Booking[]> {
  let query = supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  // Search
  if (search?.trim()) {
    const keyword = search.trim();

    query = query.or(
      [
        `full_name.ilike.%${keyword}%`,
        `mobile.ilike.%${keyword}%`,
        `address.ilike.%${keyword}%`,
        `scrap_type.ilike.%${keyword}%`,
      ].join(",")
    );
  }

  // Status Filter
  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }

  return (data ?? []) as Booking[];
}

export async function getDashboardStats() {
  const { data, error } = await supabase
    .from("bookings")
    .select("status");

  if (error) {
    console.error("Error fetching dashboard stats:", error);

    return {
      total: 0,
      pending: 0,
      contacted: 0,
      completed: 0,
      cancelled: 0,
    };
  }

  return {
    total: data.length,
    pending: data.filter((booking) => booking.status === "pending").length,
    contacted: data.filter((booking) => booking.status === "contacted").length,
    completed: data.filter((booking) => booking.status === "completed").length,
    cancelled: data.filter((booking) => booking.status === "cancelled").length,
  };
}