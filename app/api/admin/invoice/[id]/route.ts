import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: "Invoice ID is required." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data: invoice, error: invoiceError } =
      await supabase
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
          created_at,
          invoice_items (
            id,
            scrap_type,
            weight,
            unit,
            rate,
            subtotal
          )
        `
        )
        .eq("id", id)
        .single();

    if (invoiceError) {
      console.error("Invoice Detail Error:", invoiceError);

      return NextResponse.json(
        { error: invoiceError.message },
        { status: 500 }
      );
    }

    if (!invoice) {
      return NextResponse.json(
        { error: "Invoice not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      invoice,
    });
  } catch (error) {
    console.error("Invoice Detail API Error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load invoice.",
      },
      { status: 500 }
    );
  }
}