/**
 * React island: service detail - fetches one service and shows it.
 * Uses shared API client (configured in main.tsx / client entry).
 */
import { useState, useEffect } from 'react';
import { servicesApi } from '@marketplace/shared/api-client';
import { formatPrice } from '@marketplace/shared/utils';
import type { Service } from '@marketplace/shared/types';
import { Button } from '@marketplace/ui-react/forms';

interface Props {
  serviceId: string;
  locale: string;
}

export default function ServiceDetail({ serviceId, locale }: Props) {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!serviceId) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    servicesApi
      .getById(serviceId)
      .then((data) => {
        if (!cancelled) setService(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err : new Error(String(err)));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [serviceId]);

  if (loading) return <p className="text-slate-600">{locale === 'ro' ? 'Se încarcă...' : 'Loading...'}</p>;
  if (error) return <p className="text-red-600">{error.message}</p>;
  if (!service) return <p>{locale === 'ro' ? 'Serviciu negăsit' : 'Service not found'}</p>;

  return (
    <div className="mt-6 max-w-2xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900">{service.title}</h2>
      <p className="mt-2 text-slate-600">{service.description}</p>
      <p className="mt-4 text-xl font-semibold text-marketplace-primary">
        {formatPrice(service.price)}
      </p>
      <Button className="mt-4">
        {locale === 'ro' ? 'Rezervați acum' : 'Book now'}
      </Button>
    </div>
  );
}
