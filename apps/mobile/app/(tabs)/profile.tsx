import { Text } from 'react-native';
import { PageLayout } from '@marketplace/ui-react/layouts';
import { useTranslation } from 'react-i18next';

export default function ProfileScreen() {
  const { t } = useTranslation();
  return (
    <PageLayout title={t('nav.profile')}>
      <Text className="text-slate-600">Profile and settings (placeholder)</Text>
    </PageLayout>
  );
}
