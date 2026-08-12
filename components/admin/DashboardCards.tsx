interface Stats {
  total: number;
  pending: number;
  contacted: number;
  completed: number;
  cancelled: number;
}

interface Props {
  stats: Stats;
}

export function DashboardCards({ stats }: Props) {
  return (
    <div className="mb-8 grid gap-6 md:grid-cols-4">
      <div className="rounded-2xl bg-white p-6 shadow-md">
        <h3 className="text-sm text-gray-500">Total Bookings</h3>

        <p className="mt-2 text-4xl font-bold text-green-600">
          {stats.total}
        </p>
      </div>

      <div className="rounded-2xl bg-yellow-50 p-6 shadow-md">
        <h3 className="text-sm text-gray-500">Pending</h3>

        <p className="mt-2 text-4xl font-bold text-yellow-600">
          {stats.pending}
        </p>
      </div>

      <div className="rounded-2xl bg-blue-50 p-6 shadow-md">
        <h3 className="text-sm text-gray-500">Contacted</h3>

        <p className="mt-2 text-4xl font-bold text-blue-600">
          {stats.contacted}
        </p>
      </div>

      <div className="rounded-2xl bg-green-50 p-6 shadow-md">
        <h3 className="text-sm text-gray-500">Completed</h3>

        <p className="mt-2 text-4xl font-bold text-green-700">
          {stats.completed}
        </p>
      </div>

      <div className="rounded-2xl bg-red-50 p-6 shadow-md md:col-span-4">
        <h3 className="text-sm text-gray-500">Cancelled</h3>

        <p className="mt-2 text-4xl font-bold text-red-600">
          {stats.cancelled}
        </p>
      </div>
    </div>
  );
}