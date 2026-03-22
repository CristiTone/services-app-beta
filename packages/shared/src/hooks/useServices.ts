/**
 * useServices hook - 100% reusable on web and mobile.
 * Fetches services using shared API client; no platform-specific code.
 */
import { useState, useEffect, useCallback } from 'react';
import type { Service } from '../types';
import type { ApiListResponse } from '../types';
import { servicesApi } from '../api-client';

export interface UseServicesResult {
  services: Service[];
  total: number;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useServices(params?: {
  page?: number;
  pageSize?: number;
}): UseServicesResult {
  const [services, setServices] = useState<Service[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await servicesApi.list(params);
      setServices(res.data);
      setTotal(res.total);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [params?.page, params?.pageSize]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  return { services, total, loading, error, refetch: fetchServices };
}
