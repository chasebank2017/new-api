/**
 * 与官网 openclawapi.ai 统一：使用 localStorage key "locale"（en/zh），前后端语言一致。
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import zhTranslation from './locales/zh.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    load: 'languageOnly',
    resources: {
      en: enTranslation,
      zh: zhTranslation,
    },
    fallbackLng: 'zh',
    supportedLngs: ['zh', 'en'],
    nsSeparator: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'locale',
      caches: ['localStorage'],
    },
  });

export default i18n;
