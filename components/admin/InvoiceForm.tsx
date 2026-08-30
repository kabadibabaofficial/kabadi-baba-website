"use client";

import { useMemo, useState } from "react";
import { createInvoice } from "@/app/admin/actions";

type Unit = "kg" | "pc";

interface Booking {
  id: string;
  full_name: string;
  mobile: string;
  address: string;
  scrap_type: string;
  weight: number | string;
  pickup_date: string;
}

interface ScrapRate {
  id: string;
  name: string;
  rate: number;
  unit: Unit;
}

interface InvoiceItem {
  id: string;
  scrap_type: string;
  unit: Unit;
  quantity: number;
  rate: number;
}

interface Props {
  bookings: Booking[];
  rates: ScrapRate[];
}

export default function InvoiceForm({
  bookings,
  rates,
}: Props) {
  const [bookingId, setBookingId] = useState("");

  const [paymentStatus, setPaymentStatus] =
    useState<"pending" | "paid">("paid");

  const [items, setItems] = useState<InvoiceItem[]>([]);

  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState("");

  const selectedBooking = useMemo(
    () =>
      bookings.find(
        (booking) => booking.id === bookingId
      ),
    [bookings, bookingId]
  );

  const totalAmount = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum +
          Number(item.quantity || 0) *
            Number(item.rate || 0),
        0
      ),
    [items]
  );

  const addItem = () => {
    const firstRate = rates[0];

    setItems((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        scrap_type: firstRate?.name || "",
        unit: firstRate?.unit || "kg",
        quantity: 1,
        rate: Number(firstRate?.rate || 0),
      },
    ]);
  };

  const updateItem = (
    id: string,
    changes: Partial<InvoiceItem>
  ) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              ...changes,
            }
          : item
      )
    );
  };

  const changeScrap = (
    id: string,
    scrapName: string
  ) => {
    const selectedRate = rates.find(
      (rate) => rate.name === scrapName
    );

    updateItem(id, {
      scrap_type: scrapName,
      unit: selectedRate?.unit || "kg",
      rate: Number(selectedRate?.rate || 0),
    });
  };

  const removeItem = (id: string) => {
    setItems((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const handleCreateInvoice = async () => {
    setMessage("");

    if (!bookingId) {
      setMessage("Please select a customer booking.");
      return;
    }

    if (!selectedBooking) {
      setMessage("Customer booking not found.");
      return;
    }

    if (items.length === 0) {
      setMessage("Please add at least one scrap item.");
      return;
    }

    for (const item of items) {
      if (!item.scrap_type) {
        setMessage("Please select scrap type.");
        return;
      }

      if (item.quantity <= 0) {
        setMessage(
          "Quantity/weight must be greater than 0."
        );
        return;
      }

      if (item.rate < 0) {
        setMessage("Rate cannot be negative.");
        return;
      }
    }

    try {
      setCreating(true);

      const result = await createInvoice({
        booking_id: selectedBooking.id,
        customer_name: selectedBooking.full_name,
        customer_mobile: selectedBooking.mobile,
        customer_address: selectedBooking.address,

        items: items.map((item) => ({
          scrap_type: item.scrap_type,
          unit: item.unit,
          weight: Number(item.quantity),
          rate: Number(item.rate),
          subtotal:
            Number(item.quantity) *
            Number(item.rate),
        })),

        payment_status: paymentStatus,
      });

      if (result.success) {
        // Open the newly created invoice
        window.location.href =
          `/admin/invoice/${result.invoiceId}`;
        return;
      }
    } catch (error) {
      console.error(error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to create invoice."
      );
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* CUSTOMER */}
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">
          Customer
        </h2>

        <div className="mt-4">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Select Booking
          </label>

          <select
            value={bookingId}
            onChange={(event) =>
              setBookingId(event.target.value)
            }
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm"
          >
            <option value="">
              Select customer booking
            </option>

            {bookings.map((booking) => (
              <option
                key={booking.id}
                value={booking.id}
              >
                {booking.full_name} — {booking.mobile}
              </option>
            ))}
          </select>
        </div>

        {selectedBooking && (
          <div className="mt-5 grid gap-4 rounded-xl bg-gray-50 p-5 md:grid-cols-3">
            <div>
              <p className="text-xs text-gray-500">
                Name
              </p>

              <p className="font-semibold text-gray-900">
                {selectedBooking.full_name}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Mobile
              </p>

              <p className="font-semibold text-gray-900">
                {selectedBooking.mobile}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500">
                Address
              </p>

              <p className="font-semibold text-gray-900">
                {selectedBooking.address}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* ITEMS */}
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Scrap Items
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              KG और PC दोनों का option available है।
            </p>
          </div>

          <button
            type="button"
            onClick={addItem}
            className="rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white hover:bg-green-700"
          >
            + Add Item
          </button>
        </div>

        {items.length === 0 ? (
          <div className="mt-6 rounded-xl border border-dashed p-8 text-center text-sm text-gray-500">
            No items added yet.
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {items.map((item, index) => {
              const amount =
                Number(item.quantity || 0) *
                Number(item.rate || 0);

              return (
                <div
                  key={item.id}
                  className="rounded-xl border bg-gray-50 p-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-semibold text-gray-700">
                      Item {index + 1}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        removeItem(item.id)
                      }
                      className="rounded-lg bg-red-100 px-3 py-1 text-sm font-semibold text-red-600"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid gap-4 md:grid-cols-5">

                    {/* SCRAP */}
                    <div className="md:col-span-2">
                      <label className="mb-1 block text-xs font-semibold text-gray-600">
                        Scrap Type
                      </label>

                      <select
                        value={item.scrap_type}
                        onChange={(event) =>
                          changeScrap(
                            item.id,
                            event.target.value
                          )
                        }
                        className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm"
                      >
                        <option value="">
                          Select Scrap
                        </option>

                        {rates.map((rate) => (
                          <option
                            key={rate.id}
                            value={rate.name}
                          >
                            {rate.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* UNIT */}
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-gray-600">
                        Unit
                      </label>

                      <select
                        value={item.unit}
                        onChange={(event) =>
                          updateItem(item.id, {
                            unit:
                              event.target
                                .value as Unit,
                          })
                        }
                        className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm"
                      >
                        <option value="kg">
                          KG
                        </option>

                        <option value="pc">
                          PC
                        </option>
                      </select>
                    </div>

                    {/* QUANTITY */}
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-gray-600">
                        {item.unit === "kg"
                          ? "Weight (KG)"
                          : "Quantity (PC)"}
                      </label>

                      <input
                        type="number"
                        min="0"
                        step={
                          item.unit === "kg"
                            ? "0.001"
                            : "1"
                        }
                        value={item.quantity}
                        onChange={(event) =>
                          updateItem(item.id, {
                            quantity: Number(
                              event.target.value
                            ),
                          })
                        }
                        className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm"
                      />
                    </div>

                    {/* RATE */}
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-gray-600">
                        Rate /{" "}
                        {item.unit === "kg"
                          ? "KG"
                          : "PC"}
                      </label>

                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.rate}
                        onChange={(event) =>
                          updateItem(item.id, {
                            rate: Number(
                              event.target.value
                            ),
                          })
                        }
                        className="w-full rounded-lg border bg-white px-3 py-2.5 text-sm"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between rounded-lg bg-green-50 px-4 py-3">
                    <span className="text-sm text-gray-600">
                      Amount
                    </span>

                    <span className="text-lg font-bold text-green-700">
                      ₹{amount.toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* PAYMENT */}
      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Payment Status
            </label>

            <select
              value={paymentStatus}
              onChange={(event) =>
                setPaymentStatus(
                  event.target.value as
                    | "pending"
                    | "paid"
                )
              }
              className="w-full rounded-xl border bg-white px-4 py-3"
            >
              <option value="paid">
                Paid
              </option>

              <option value="pending">
                Pending
              </option>
            </select>
          </div>

          <div className="rounded-xl bg-green-50 p-5 text-right">
            <p className="text-sm text-gray-500">
              Total Amount
            </p>

            <p className="text-3xl font-bold text-green-700">
              ₹{totalAmount.toFixed(2)}
            </p>
          </div>
        </div>

        {message && (
          <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {message}
          </div>
        )}

        <button
          type="button"
          onClick={handleCreateInvoice}
          disabled={
            creating ||
            !bookingId ||
            items.length === 0
          }
          className="mt-6 w-full rounded-xl bg-green-600 px-5 py-4 font-bold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {creating
            ? "Creating Invoice..."
            : "Create Invoice"}
        </button>
      </section>
    </div>
  );
}