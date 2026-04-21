import apiClient from './api';
import { Appointment } from '../types';

export const appointmentService = {
  getAll: async () => {
    const response = await apiClient.get('/appointments');
    return response.data;
  },

  getUserAppointments: async () => {
    const response = await apiClient.get('/appointments/user');
    return response.data;
  },

  create: async (appointment_date: string) => {
    const response = await apiClient.post('/appointments', { appointment_date });
    return response.data;
  },

  update: async (id: number, status: string) => {
    const response = await apiClient.put(`/appointments/${id}`, { status });
    return response.data;
  },

  delete: async (id: number) => {
    await apiClient.delete(`/appointments/${id}`);
  },
};
