/**
 * Service detail screen - shared types and formatPrice
 */
import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { servicesApi } from '@marketplace/shared/api-client';
import { formatPrice } from '@marketplace/shared/utils';
import type { Service } from '@marketplace/shared/types';
import { PageLayout, Button } from '@marketplace/ui-react';
import { useTranslation } from 'react-i18next';

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useTranslation();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    servicesApi
      .getById(id)
      .then(setService)
      .catch((e) => setError(e instanceof Error ? e : new Error(String(e))))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <PageLayout title={t('common.loading')} />;
  if (error) return <PageLayout title={error.message} />;
  if (!service) return <PageLayout title={t('common.error')} />;

  return (
    <PageLayout title={service.title}>
      <Text className="text-slate-600">{service.description}</Text>
      <Text className="mt-4 text-xl font-semibold text-marketplace-primary">
        {formatPrice(service.price)}
      </Text>
      <Button className="mt-4">{t('services.book')}</Button>
    </PageLayout>
  );
}
