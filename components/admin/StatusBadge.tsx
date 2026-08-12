import type { BookingStatus } from "@/components/types/booking";

const styles: Record<BookingStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  contacted: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const labels: Record<BookingStatus, string> = {
  pending: "Pending",
  contacted: "Contacted",
  completed: "Completed",
  cancelled: "Cancelled",
};

interface Props {
  status: BookingStatus;
}

export default function StatusBadge({ status }: Props) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}