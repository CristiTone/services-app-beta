/**
 * Configure API client and i18n once when the app loads (client-side).
 * Used in a layout or root so all islands can use useServices and api client.
 */
import { useEffect } from 'react';
import { configureApiClient } from '@marketplace/shared/api-client';
import { initI18n } from '@marketplace/i18n';
import type { Locale } from '@marketplace/i18n';

export function ClientConfig({ apiUrl, locale }: { apiUrl: string; locale: Locale }) {
  useEffect(() => {
    configureApiClient({ baseUrl: apiUrl });
    initI18n(locale);
  }, [apiUrl, locale]);
  return null;
}
