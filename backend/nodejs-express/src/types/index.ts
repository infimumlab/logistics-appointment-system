export interface User {
  id: number;
  username: string;
  email: string;
  role: 'customer' | 'admin' | 'warehouse_staff';
  created_at: Date;
  updated_at: Date;
}

export interface Appointment {
  id: number;
  user_id: number;
  appointment_date: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: Date;
  updated_at: Date;
}

export interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  created_at: Date;
  updated_at: Date;
}

export interface Notification {
  id: number;
  user_id: number;
  message: string;
  is_read: boolean;
  created_at: Date;
}
