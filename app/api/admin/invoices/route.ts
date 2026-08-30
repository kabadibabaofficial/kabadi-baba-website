import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: invoices, error } = await supabase
      .from("invoices")
      .select(
        `
        id,
        invoice_number,
        booking_id,
        customer_name,
        customer_mobile,
        customer_address,
        invoice_date,
        subtotal,
        total_amount,
        payment_status,
        created_at
      `
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Invoice List Error:", error);

      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      invoices: invoices || [],
    });
  } catch (error) {
    console.error("Invoice List API Error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load invoices.",
      },
      { status: 500 }
    );
  }
}