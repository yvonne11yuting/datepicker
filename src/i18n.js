import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './constants/locales';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false,
    },
  });


export default i18n;
