"use client";

type Booking = {
  id: string;
  full_name: string;
  mobile: string;
  address: string;
  scrap_type: string;
  status: string;
};

interface AdminTableProps {
  bookings: Booking[];
}

export default function AdminTable({ bookings }: AdminTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 mt-6">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Mobile</th>
            <th className="p-3">Address</th>
            <th className="p-3">Scrap</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.length > 0 ? (
            bookings.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{item.full_name}</td>

                <td className="p-3">{item.mobile}</td>

                <td className="p-3">{item.address}</td>

                <td className="p-3">{item.scrap_type}</td>

                <td className="p-3">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                    {item.status}
                  </span>
                </td>

                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <a
                      href={`tel:${item.mobile}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg"
                      title="Call Customer"
                    >
                      📞
                    </a>

                    <a
                      href={`https://wa.me/91${item.mobile}?text=${encodeURIComponent(
                        `Hi ${item.full_name},

Kabadi Baba se bol rahe hain.

Aapki pickup request receive ho gayi hai.

Hamari team jaldi aapse contact karegi.

Thank you!`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg"
                      title="WhatsApp Customer"
                    >
                      💬
                    </a>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center p-6 text-gray-500">
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}