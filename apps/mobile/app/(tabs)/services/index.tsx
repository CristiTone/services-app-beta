/**
 * Services list - same useServices hook and ServiceCard as web (maximum code sharing)
 */
import { useServices } from '@marketplace/shared/hooks';
import { ServiceCard } from '@marketplace/ui-react/cards';
import { PageLayout } from '@marketplace/ui-react/layouts';
import { useTranslation } from 'react-i18next';
import { ScrollView, ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function ServicesScreen() {
  const { t } = useTranslation();
  const { services, loading, error, refetch } = useServices({ page: 1, pageSize: 20 });
  const router = useRouter();

  return (
    <PageLayout title={t('services.title')}>
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 24 }}>
        {loading && <ActivityIndicator size="large" className="mt-4" />}
        {error && (
          <View>
            <Text className="text-red-600">{error.message}</Text>
            <Pressable onPress={() => refetch()} className="mt-2">
              <Text className="text-marketplace-primary underline">{t('common.retry')}</Text>
            </Pressable>
          </View>
        )}
        {!loading && !error && (
          <View className="gap-4">
            {services.map((service) => (
              <Pressable
                key={service.id}
                onPress={() => router.push(`/services/${service.id}`)}
              >
                <ServiceCard service={service} className="mb-4" />
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </PageLayout>
  );
}
