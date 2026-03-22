/**
 * Shared TypeScript types - used by API, web, and mobile.
 * Single source of truth for domain models.
 */

export type UserRole = 'customer' | 'provider';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  providerId: string;
  provider?: User;
  createdAt?: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  serviceId: string;
  customerId: string;
  date: string;
  status: BookingStatus;
  service?: Service;
  customer?: User;
  createdAt?: string;
}

export interface ApiListResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  message: string;
  code?: string;
}
