"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type BookingStatus =
  | "pending"
  | "contacted"
  | "completed"
  | "cancelled";

/* =========================================
   BOOKING STATUS
========================================= */

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

/* =========================================
   DELETE BOOKING
========================================= */

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

/* =========================================
   SCRAP RATE UPDATE
========================================= */

export async function updateScrapRate(
  id: string,
  rate: number
) {
  const supabase = await createClient();

  if (!id) {
    throw new Error("Rate ID is required.");
  }

  if (!Number.isFinite(rate) || rate < 0) {
    throw new Error("Please enter a valid rate.");
  }

  const { error } = await supabase
    .from("scrap_rates")
    .update({
      rate,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Update Scrap Rate Error:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin");
  revalidatePath("/");
}

/* =========================================
   CREATE INVOICE
========================================= */

export async function createInvoice(data: {
  booking_id: string;
  customer_name: string;
  customer_mobile: string;
  customer_address: string;
  items: {
    scrap_type: string;
    unit: "kg" | "pc";
    weight: number;
    rate: number;
    subtotal: number;
  }[];
  payment_status: "pending" | "paid";
}) {
  const supabase = await createClient();

  /* -----------------------------------------
     BASIC VALIDATION
  ----------------------------------------- */

  if (!data.booking_id) {
    throw new Error("Booking is required.");
  }

  if (!data.customer_name?.trim()) {
    throw new Error("Customer name is required.");
  }

  if (!data.items || data.items.length === 0) {
    throw new Error("At least one scrap item is required.");
  }

  /* -----------------------------------------
     PREPARE ITEMS
     
     Database columns:
     invoice_id
     scrap_type
     unit
     weight
     rate
     subtotal

     IMPORTANT:
     Do NOT send quantity or scrap_name.
  ----------------------------------------- */

  const preparedItems = data.items.map((item, index) => {
    const scrapType = String(
      item.scrap_type || ""
    ).trim();

    const unit: "kg" | "pc" =
      item.unit === "pc" ? "pc" : "kg";

    const weight = Number(item.weight);
    const rate = Number(item.rate);

    if (!scrapType) {
      throw new Error(
        `Please select scrap type for item ${index + 1}.`
      );
    }

    if (!Number.isFinite(weight) || weight <= 0) {
      throw new Error(
        `Please enter a valid quantity/weight for item ${
          index + 1
        }.`
      );
    }

    if (!Number.isFinite(rate) || rate < 0) {
      throw new Error(
        `Please enter a valid rate for item ${
          index + 1
        }.`
      );
    }

    const subtotal = Number(
      (weight * rate).toFixed(2)
    );

    return {
      scrap_type: scrapType,
      unit,
      weight,
      rate,
      subtotal,
    };
  });

  /* -----------------------------------------
     TOTAL
  ----------------------------------------- */

  const totalAmount = Number(
    preparedItems
      .reduce(
        (sum, item) => sum + item.subtotal,
        0
      )
      .toFixed(2)
  );

  if (totalAmount <= 0) {
    throw new Error(
      "Invoice total must be greater than ₹0."
    );
  }

  /* -----------------------------------------
     INVOICE NUMBER
  ----------------------------------------- */

  const invoiceNumber =
    `KB-${new Date().getFullYear()}-` +
    Date.now().toString().slice(-6);

  /* -----------------------------------------
     CREATE INVOICE
  ----------------------------------------- */

  const {
    data: invoice,
    error: invoiceError,
  } = await supabase
    .from("invoices")
    .insert({
      invoice_number: invoiceNumber,
      booking_id: data.booking_id,
      customer_name: data.customer_name.trim(),
      customer_mobile:
        data.customer_mobile || "",
      customer_address:
        data.customer_address?.trim() || null,
      subtotal: totalAmount,
      total_amount: totalAmount,
      payment_status: data.payment_status,
    })
    .select("id, invoice_number")
    .single();

  if (invoiceError || !invoice) {
    console.error(
      "Create Invoice Error:",
      invoiceError
    );

    throw new Error(
      invoiceError?.message ||
        "Unable to create invoice."
    );
  }

  /* -----------------------------------------
     CREATE INVOICE ITEMS
     
     ONLY USE ACTUAL DATABASE COLUMNS
  ----------------------------------------- */

  const invoiceItems = preparedItems.map(
    (item) => ({
      invoice_id: invoice.id,
      scrap_type: item.scrap_type,
      unit: item.unit,
      weight: item.weight,
      rate: item.rate,
      subtotal: item.subtotal,
    })
  );

  const { error: itemsError } =
    await supabase
      .from("invoice_items")
      .insert(invoiceItems);

  if (itemsError) {
    console.error(
      "Create Invoice Items Error:",
      itemsError
    );

    /* -----------------------------------------
       ROLLBACK INVOICE
    ----------------------------------------- */

    await supabase
      .from("invoices")
      .delete()
      .eq("id", invoice.id);

    throw new Error(itemsError.message);
  }

  /* -----------------------------------------
     REFRESH
  ----------------------------------------- */

  revalidatePath("/admin");
  revalidatePath("/admin/invoice");
  revalidatePath(
    `/admin/invoice/${invoice.id}`
  );

  return {
    success: true,
    invoiceId: invoice.id,
    invoiceNumber: invoice.invoice_number,
  };
}