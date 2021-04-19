import Vue from 'vue';
import i18next from 'i18next';
import VueI18Next from '@panter/vue-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import app from '@/main';
import enJson from '../../public/locales/en';
import estJson from '../../public/locales/est';

Vue.use(VueI18Next);

i18next.use(LanguageDetector);

const initialized = i18next.init({
  fallbackLng: 'en',
  whitelist: ['en', 'est'],
  resources: {
    en: enJson,
    est: estJson,
  },
  detection: {
    order: ['querystring', 'path', 'localStorage', 'navigator'],
    lookupQuerystring: 'lang',
    caches: ['localStorage'],
    checkWhitelist: true,
  },
});
initialized.then(() => app.$store.dispatch('language/initLanguage', i18next.language));

const i18n = new VueI18Next(i18next, {
  loadComponentNamespace: true,
});

i18n.initialized = initialized;

export default i18n;
