-- Database Schema for Logistics Appointment System

-- Users table stores user information
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Appointments table stores appointment details
CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    appointment_date TIMESTAMP NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'scheduled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Appointment Slots table for available appointment times
CREATE TABLE appointment_slots (
    id SERIAL PRIMARY KEY,
    appointment_id INT REFERENCES appointments(id),
    slot_start TIMESTAMP NOT NULL,
    slot_end TIMESTAMP NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inventory Items table for managing items
CREATE TABLE inventory_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Appointment Items table for linking appointments with inventory items
CREATE TABLE appointment_items (
    id SERIAL PRIMARY KEY,
    appointment_id INT REFERENCES appointments(id),
    inventory_item_id INT REFERENCES inventory_items(id),
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications table for user notifications
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Audit Logs for tracking changes
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    action VARCHAR(100) NOT NULL,
    user_id INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TypeScript Interfaces for Type Safety
/* TypeScript Interfaces */

interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    created_at: string;
    updated_at: string;
}

interface Appointment {
    id: number;
    user_id: number;
    appointment_date: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface AppointmentSlot {
    id: number;
    appointment_id: number;
    slot_start: string;
    slot_end: string;
    is_available: boolean;
    created_at: string;
}

interface InventoryItem {
    id: number;
    name: string;
    quantity: number;
    created_at: string;
    updated_at: string;
}

interface AppointmentItem {
    id: number;
    appointment_id: number;
    inventory_item_id: number;
    quantity: number;
    created_at: string;
}

interface Notification {
    id: number;
    user_id: number;
    message: string;
    is_read: boolean;
    created_at: string;
}

interface AuditLog {
    id: number;
    action: string;
    user_id: number;
    created_at: string;
}