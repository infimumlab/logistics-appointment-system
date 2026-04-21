export interface User {
  id: number;
  username: string;
  email: string;
  role: 'customer' | 'admin' | 'warehouse_staff';
}

export interface Appointment {
  id: number;
  user_id: number;
  appointment_date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: number;
  user_id: number;
  message: string;
  is_read: boolean;
  created_at: string;
}
