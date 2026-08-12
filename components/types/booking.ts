export type BookingStatus =
  | "pending"
  | "contacted"
  | "completed"
  | "cancelled";

export interface Booking {
  id: string;
  full_name: string;
  mobile: string;
  address: string | null;
  scrap_type: string | null;
  status: BookingStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DashboardStats {
  total: number;
  pending: number;
  contacted: number;
  completed: number;
  cancelled: number;
}