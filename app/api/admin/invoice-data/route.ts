import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: bookings, error: bookingsError } = await supabase
      .from("bookings")
      .select(
        "id, full_name, mobile, address, scrap_type, weight, pickup_date"
      )
      .order("created_at", { ascending: false });

    if (bookingsError) {
      console.error("Invoice Bookings Error:", bookingsError);

      return NextResponse.json(
        {
          error: bookingsError.message,
        },
        { status: 500 }
      );
    }

    const { data: rates, error: ratesError } = await supabase
      .from("scrap_rates")
      .select("id, name, rate, unit")
      .order("name", { ascending: true });

    if (ratesError) {
      console.error("Invoice Rates Error:", ratesError);

      return NextResponse.json(
        {
          error: ratesError.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      bookings: bookings || [],
      rates: rates || [],
    });
  } catch (error) {
    console.error("Invoice Data API Error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load invoice data.",
      },
      { status: 500 }
    );
  }
}