import { useTranslation as useTranslationBase } from 'react-i18next';
import { useRouter } from 'next/router';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useEffect } from 'react';
import en from './public/locales/en';
import ru from './public/locales/ru';
import uz from './public/locales/uz';

const resources = {
  en: {
    translation: en,
  },
  uz: {
    translation: uz,
  },
  ru: {
    translation: ru,
  },
};

const initializeI18n = (locale) => {
  i18n.use(initReactI18next).init({
    resources,
    lng: locale,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });
};

export const useTranslation = () => {
  const { i18n: baseI18n } = useTranslationBase();
  const router = useRouter();

  useEffect(() => {
    const changeLanguage = () => {
      const storedLanguage = window.localStorage.getItem('selectedLanguage');
      const locale = storedLanguage || router.locale;
      initializeI18n(locale);
    };

    changeLanguage(); // Run on initial mount

    router.events.on('routeChangeComplete', changeLanguage);

    return () => {
      router.events.off('routeChangeComplete', changeLanguage);
    };
  }, []); // Empty dependency array to run only on initial mount

  return useTranslationBase();
};

const defaultLanguage = 'en';

initializeI18n(defaultLanguage); // Initialize with default language

export { i18n };
