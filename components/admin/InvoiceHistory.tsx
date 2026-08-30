"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Invoice = {
  id: string;
  invoice_number: string;
  customer_name: string;
  customer_mobile: string;
  total_amount: number;
  payment_status: "pending" | "paid";
  invoice_date: string | null;
  created_at: string;
};

export default function InvoiceHistory() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadInvoices() {
    try {
      setLoading(true);

      const response = await fetch("/api/admin/invoices", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to load invoices."
        );
      }

      setInvoices(data.invoices || []);
    } catch (error) {
      console.error("Invoice History Error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInvoices();
  }, []);

  async function handleDelete(invoice: Invoice) {
    const confirmed = window.confirm(
      `Delete invoice ${invoice.invoice_number}?\n\nCustomer: ${invoice.customer_name}\nAmount: ₹${Number(
        invoice.total_amount || 0
      ).toFixed(2)}\n\nThis action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(invoice.id);

      const response = await fetch(
        `/api/admin/invoices/${invoice.id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to delete invoice."
        );
      }

      setInvoices((current) =>
        current.filter((item) => item.id !== invoice.id)
      );
    } catch (error) {
      console.error("Delete Invoice Error:", error);

      window.alert(
        error instanceof Error
          ? error.message
          : "Unable to delete invoice."
      );
    } finally {
      setDeletingId(null);
    }
  }

  const filteredInvoices = invoices.filter((invoice) => {
    const query = search.toLowerCase().trim();

    if (!query) return true;

    return (
      invoice.invoice_number
        ?.toLowerCase()
        .includes(query) ||
      invoice.customer_name
        ?.toLowerCase()
        .includes(query) ||
      invoice.customer_mobile
        ?.toLowerCase()
        .includes(query)
    );
  });

  function formatDate(date: string | null) {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return (
    <section className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Invoice History
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View, search and manage created invoices.
          </p>
        </div>

        <button
          type="button"
          onClick={loadInvoices}
          disabled={loading}
          className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="mb-5">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search invoice, customer or mobile..."
          className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
        />
      </div>

      {loading ? (
        <div className="rounded-xl bg-gray-50 p-8 text-center text-sm text-gray-500">
          Loading invoices...
        </div>
      ) : filteredInvoices.length === 0 ? (
        <div className="rounded-xl bg-gray-50 p-8 text-center">
          <p className="font-semibold text-gray-700">
            No invoices found
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Created invoices will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[950px] text-left">
            <thead>
              <tr className="border-b bg-gray-50 text-sm text-gray-600">
                <th className="px-4 py-3 font-semibold">
                  Invoice No.
                </th>

                <th className="px-4 py-3 font-semibold">
                  Customer
                </th>

                <th className="px-4 py-3 font-semibold">
                  Mobile
                </th>

                <th className="px-4 py-3 font-semibold">
                  Amount
                </th>

                <th className="px-4 py-3 font-semibold">
                  Payment
                </th>

                <th className="px-4 py-3 font-semibold">
                  Date
                </th>

                <th className="px-4 py-3 font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="px-4 py-4">
                    <span className="font-semibold text-gray-900">
                      {invoice.invoice_number}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-900">
                      {invoice.customer_name}
                    </div>
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-600">
                    {invoice.customer_mobile || "-"}
                  </td>

                  <td className="px-4 py-4 font-bold text-green-700">
                    ₹
                    {Number(
                      invoice.total_amount || 0
                    ).toFixed(2)}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        invoice.payment_status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {invoice.payment_status === "paid"
                        ? "Paid"
                        : "Pending"}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-sm text-gray-600">
                    {formatDate(
                      invoice.invoice_date ||
                        invoice.created_at
                    )}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/invoice/${invoice.id}`}
                        className="inline-flex rounded-lg bg-green-600 px-3 py-2 text-xs font-bold text-white hover:bg-green-700"
                      >
                        View
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(invoice)
                        }
                        disabled={
                          deletingId === invoice.id
                        }
                        className="inline-flex rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                      >
                        {deletingId === invoice.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        Showing {filteredInvoices.length} of{" "}
        {invoices.length} invoices
      </div>
    </section>
  );
}