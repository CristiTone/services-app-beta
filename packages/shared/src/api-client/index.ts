/**
 * API client - works identically on web and mobile.
 * Uses fetch (available in both environments). Base URL is set via env at runtime.
 */

import type { ApiListResponse, ApiError } from '../types';

export type ApiClientConfig = {
  baseUrl: string;
  getToken?: () => string | null;
};

let clientConfig: ApiClientConfig = {
  baseUrl: '',
};

export function configureApiClient(config: Partial<ApiClientConfig>) {
  clientConfig = { ...clientConfig, ...config };
}

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  const token = clientConfig.getToken?.();
  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err: ApiError = (data as ApiError) || { message: res.statusText };
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  return data as T;
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${clientConfig.baseUrl}${path}`, {
    method: 'GET',
    headers: getHeaders(),
  });
  return handleResponse<T>(res);
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${clientConfig.baseUrl}${path}`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body),
  });
  return handleResponse<T>(res);
}

export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${clientConfig.baseUrl}${path}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(body),
  });
  return handleResponse<T>(res);
}

export async function apiDelete<T>(path: string): Promise<T> {
  const res = await fetch(`${clientConfig.baseUrl}${path}`, {
    method: 'DELETE',
    headers: getHeaders(),
  });
  return handleResponse<T>(res);
}

// Typed API methods
export const servicesApi = {
  list: (params?: { page?: number; pageSize?: number }) => {
    const search = new URLSearchParams();
    if (params?.page != null) search.set('page', String(params.page));
    if (params?.pageSize != null) search.set('pageSize', String(params.pageSize));
    const q = search.toString();
    return apiGet<ApiListResponse<import('../types').Service>>(
      `/api/services${q ? `?${q}` : ''}`
    );
  },
  getById: (id: string) =>
    apiGet<import('../types').Service>(`/api/services/${id}`),
};

export const usersApi = {
  list: () => apiGet<import('../types').User[]>('/api/users'),
  getById: (id: string) => apiGet<import('../types').User>(`/api/users/${id}`),
};

export const bookingsApi = {
  list: () =>
    apiGet<import('../types').Booking[]>('/api/bookings'),
  create: (body: { serviceId: string; date: string }) =>
    apiPost<import('../types').Booking>('/api/bookings', body),
};
