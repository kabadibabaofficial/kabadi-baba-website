import BookingRow from "./BookingRow";

interface Props {
  bookings: any[];
}

export default function BookingsTable({ bookings }: Props) {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No bookings found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Mobile</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">Scrap</th>
            <th className="p-3 text-left">Weight</th>
            <th className="p-3 text-left">Pickup Date</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))}
        </tbody>
      </table>
    </div>
  );
}