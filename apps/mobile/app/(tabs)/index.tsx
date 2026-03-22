/**
 * Home screen - shared i18n keys and layout component
 */
import { View, Text } from 'react-native';
import { PageLayout } from '@marketplace/ui-react/layouts';
import { useTranslation } from 'react-i18next';

export default function HomeScreen() {
  const { t } = useTranslation();
  return (
    <PageLayout title={t('common.welcome')}>
      <Text className="mt-2 text-slate-600">
        Find plumbers, electricians, nail technicians, and more.
      </Text>
    </PageLayout>
  );
}
