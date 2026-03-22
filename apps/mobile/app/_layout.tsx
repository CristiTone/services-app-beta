/**
 * Root layout - configures API client, i18n, and tab layout.
 */
import '../global.css';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { configureApiClient } from '@marketplace/shared/api-client';
import { initI18n } from '@marketplace/i18n';

const apiUrl = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

export default function RootLayout() {
  useEffect(() => {
    configureApiClient({ baseUrl: apiUrl });
    initI18n('en');
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
