import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(
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

    // First delete invoice items
    const { error: itemsError } = await supabase
      .from("invoice_items")
      .delete()
      .eq("invoice_id", id);

    if (itemsError) {
      console.error(
        "Delete Invoice Items Error:",
        itemsError
      );

      return NextResponse.json(
        { error: itemsError.message },
        { status: 500 }
      );
    }

    // Then delete invoice
    const { error: invoiceError } = await supabase
      .from("invoices")
      .delete()
      .eq("id", id);

    if (invoiceError) {
      console.error(
        "Delete Invoice Error:",
        invoiceError
      );

      return NextResponse.json(
        { error: invoiceError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Invoice deleted successfully.",
    });
  } catch (error) {
    console.error(
      "Delete Invoice API Error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to delete invoice.",
      },
      { status: 500 }
    );
  }
}