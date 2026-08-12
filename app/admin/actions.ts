"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type BookingStatus =
  | "pending"
  | "contacted"
  | "completed"
  | "cancelled";

export async function updateBookingStatus(
  id: string,
  status: BookingStatus
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Update Booking Error:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}

export async function deleteBooking(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete Booking Error:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}