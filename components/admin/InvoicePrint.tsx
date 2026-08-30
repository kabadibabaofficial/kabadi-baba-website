"use client";

import { useEffect, useState } from "react";

interface InvoiceItem {
  id: string;
  scrap_name?: string | null;
  scrap_type?: string | null;
  quantity?: number | string | null;
  weight?: number | string | null;
  unit?: "kg" | "pc" | string | null;
  rate?: number | string | null;
  subtotal?: number | string | null;
}

interface Invoice {
  id: string;
  invoice_number: string;
  customer_name: string;
  customer_mobile: string;
  customer_address: string | null;
  invoice_date: string;
  subtotal: number | string;
  total_amount: number | string;
  payment_status: "pending" | "paid";
  invoice_items: InvoiceItem[];
}

interface Props {
  invoiceId: string;
}

function safeNumber(value: unknown, fallback = 0): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function getItemName(item: InvoiceItem): string {
  return (
    item.scrap_name?.trim() ||
    item.scrap_type?.trim() ||
    "Scrap"
  );
}

function getQuantity(item: InvoiceItem): number {
  const quantity = safeNumber(item.quantity, NaN);

  if (Number.isFinite(quantity) && quantity > 0) {
    return quantity;
  }

  return safeNumber(item.weight, 0);
}

function formatMoney(value: unknown): string {
  return `\u20B9${safeNumber(value).toFixed(2)}`;
}

function formatAddress(address: string | null): string {
  if (!address) return "";

  return address
    .replace(/\s+/g, " ")
    .trim();
}

export default function InvoicePrint({ invoiceId }: Props) {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadInvoice() {
      try {
        const response = await fetch(
          `/api/admin/invoice/${invoiceId}`,
          {
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Unable to load invoice."
          );
        }

        const raw = data.invoice;

        const items = Array.isArray(raw?.invoice_items)
          ? raw.invoice_items
          : [];

        setInvoice({
          ...raw,
          invoice_items: items.map(
            (item: InvoiceItem, index: number) => ({
              ...item,
              id:
                item.id ||
                `item-${index}`,

              scrap_name:
                item.scrap_name?.trim() ||
                item.scrap_type?.trim() ||
                "Scrap",

              scrap_type:
                item.scrap_type?.trim() ||
                item.scrap_name?.trim() ||
                "Scrap",

              quantity: getQuantity(item),

              weight:
                item.weight ??
                item.quantity ??
                0,

              unit:
                item.unit === "pc"
                  ? "pc"
                  : "kg",

              rate: safeNumber(item.rate),

              subtotal: safeNumber(
                item.subtotal,
                getQuantity(item) *
                  safeNumber(item.rate)
              ),
            })
          ),
        });
      } catch (err) {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load invoice."
        );
      } finally {
        setLoading(false);
      }
    }

    loadInvoice();
  }, [invoiceId]);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center">
        Loading invoice...
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center">
        <p className="font-semibold text-red-600">
          {error || "Invoice not found."}
        </p>

        <a
          href="/admin/invoice"
          className="mt-4 inline-block rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white"
        >
          Back to Invoice
        </a>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hello ${invoice.customer_name},

Thank you for choosing Kabadi Baba.

Invoice No: ${invoice.invoice_number}
Total Amount: ${formatMoney(invoice.total_amount)}
Payment: ${
      invoice.payment_status === "paid"
        ? "PAID"
        : "PENDING"
    }

Thank you,
Kabadi Baba
Gorakhpur Ka Bharosemand Scrap Dealer`
  );

  const formattedDate = new Date(
    invoice.invoice_date
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const address = formatAddress(
    invoice.customer_address
  );

  return (
    <>
      {/* ACTION BUTTONS */}
      <div className="mb-5 flex flex-wrap gap-3 print:hidden">
        <a
          href="/admin/invoice"
          className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          ← Back
        </a>

        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white hover:bg-green-700"
        >
          🖨 Print / Save PDF
        </button>

        <a
          href={`https://wa.me/91${invoice.customer_mobile}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-green-500 px-5 py-3 text-sm font-bold text-white hover:bg-green-600"
        >
          💬 Send on WhatsApp
        </a>
      </div>

      {/* INVOICE */}
      <div
        id="invoice"
        className="overflow-hidden rounded-2xl bg-white shadow-lg print:rounded-none print:shadow-none"
      >
        {/* HEADER */}
        <div className="border-b-4 border-green-600 px-6 py-7 sm:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4">
              <img
                src="/logo/kabadi-baba-logo.png"
                alt="Kabadi Baba Logo"
                className="h-20 w-20 object-contain sm:h-24 sm:w-24"
              />

              <div>
                <h1 className="text-3xl font-black tracking-tight text-green-700 sm:text-4xl">
                  KABADI BABA
                </h1>

                <p className="mt-1 text-sm font-semibold text-gray-600">
                  Gorakhpur Ka Bharosemand Scrap Dealer
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  Scrap Collection & Recycling
                </p>
              </div>
            </div>

            <div className="sm:text-right">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Invoice
              </p>

              <p className="mt-1 text-xl font-black text-gray-900">
                {invoice.invoice_number}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {formattedDate}
              </p>
            </div>
          </div>
        </div>

        {/* CUSTOMER */}
        <div className="grid gap-6 border-b px-6 py-7 sm:grid-cols-2 sm:px-8">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
              Customer Details
            </p>

            <p className="text-lg font-bold text-gray-900">
              {invoice.customer_name}
            </p>

            <p className="mt-1 text-sm text-gray-600">
              📞 {invoice.customer_mobile}
            </p>

            {address && (
              <p className="mt-1 max-w-md text-sm leading-6 text-gray-600">
                📍 {address}
              </p>
            )}
          </div>

          <div className="sm:text-right">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
              Payment Status
            </p>

            <span
              className={`inline-flex rounded-full px-4 py-2 text-sm font-bold ${
                invoice.payment_status === "paid"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {invoice.payment_status === "paid"
                ? "✓ PAID"
                : "PENDING"}
            </span>
          </div>
        </div>

        {/* SCRAP DETAILS */}
        <div className="px-6 py-7 sm:px-8">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-500">
            Scrap Details
          </p>

          <div className="overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border-b p-3 text-left font-bold text-gray-700">
                    #
                  </th>

                  <th className="border-b p-3 text-left font-bold text-gray-700">
                    Scrap Item
                  </th>

                  <th className="border-b p-3 text-right font-bold text-gray-700">
                    Quantity
                  </th>

                  <th className="border-b p-3 text-center font-bold text-gray-700">
                    Unit
                  </th>

                  <th className="border-b p-3 text-right font-bold text-gray-700">
                    Rate
                  </th>

                  <th className="border-b p-3 text-right font-bold text-gray-700">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {invoice.invoice_items.map(
                  (item, index) => {
                    const quantity =
                      getQuantity(item);

                    const rate =
                      safeNumber(item.rate);

                    const amount =
                      safeNumber(
                        item.subtotal,
                        quantity * rate
                      );

                    return (
                      <tr key={item.id}>
                        <td className="border-b p-3 text-gray-500">
                          {index + 1}
                        </td>

                        <td className="border-b p-3 font-semibold text-gray-900">
                          {getItemName(item)}
                        </td>

                        <td className="border-b p-3 text-right text-gray-700">
                          {quantity.toLocaleString(
                            "en-IN",
                            {
                              maximumFractionDigits: 3,
                            }
                          )}
                        </td>

                        <td className="border-b p-3 text-center font-bold uppercase text-gray-700">
                          {item.unit === "pc"
                            ? "PC"
                            : "KG"}
                        </td>

                        <td className="border-b p-3 text-right text-gray-700">
                          {formatMoney(rate)}
                        </td>

                        <td className="border-b p-3 text-right font-bold text-gray-900">
                          {formatMoney(amount)}
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>

          {/* TOTAL */}
          <div className="mt-6 flex justify-end">
            <div className="w-full max-w-sm">
              <div className="flex justify-between border-b py-3 text-sm">
                <span className="text-gray-600">
                  Subtotal
                </span>

                <span className="font-semibold text-gray-900">
                  {formatMoney(invoice.subtotal)}
                </span>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-green-50 px-4 py-4">
                <span className="text-lg font-black text-gray-900">
                  Total Amount
                </span>

                <span className="text-2xl font-black text-green-700">
                  {formatMoney(
                    invoice.total_amount
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t bg-gray-50 px-6 py-7 text-center sm:px-8">
          <p className="font-bold text-gray-800">
            Thank you for choosing KABADI BABA!
          </p>

          <p className="mt-1 text-xs text-gray-500">
            Gorakhpur Ka Bharosemand Scrap Dealer
          </p>

          <p className="mt-3 text-[11px] text-gray-400">
            This is a computer-generated invoice.
          </p>
        </div>
      </div>

      {/* PRINT CSS */}
      <style jsx global>{`
        @media print {
          html,
          body {
            background: #ffffff !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          #invoice {
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }

          @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
    </>
  );
}