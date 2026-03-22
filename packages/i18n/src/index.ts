/**
 * i18n - Shared translations for web and mobile.
 * Apps call initI18n(locale) at bootstrap, then use react-i18next's useTranslation().
 */
import i18n from 'i18next';
import en from '../locales/en.json';
import ro from '../locales/ro.json';

export const defaultNS = 'translation';
export const supportedLngs = ['en', 'ro'] as const;
export type Locale = (typeof supportedLngs)[number];

export function initI18n(locale: Locale = 'en') {
  return i18n.init({
    lng: locale,
    fallbackLng: 'en',
    supportedLngs: [...supportedLngs],
    resources: {
      en: { [defaultNS]: en as object },
      ro: { [defaultNS]: ro as object },
    },
    defaultNS,
    interpolation: { escapeValue: false },
  });
}

export { i18n };
