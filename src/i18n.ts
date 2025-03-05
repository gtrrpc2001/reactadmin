import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslations from './locales/en.json';
import koTranslations from './locales/ko.json';
import ptTranslations from './locales/pt.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        detection: {
            order: ["navigator", "localStorage"]
        },
        resources: {
            en: {
                translation: enTranslations,
            },
            ko: {
                translation: koTranslations,
            },
            pt: {
                translation: ptTranslations,
            },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;