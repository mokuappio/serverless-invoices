import Vue from 'vue';
import i18next from 'i18next';
import VueI18Next from '@panter/vue-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import app from '@/main';

Vue.use(VueI18Next);

i18next
  .use(LanguageDetector)
  .use(Backend);

const path = window.name
  ? JSON.parse(window.name).front_url
  : `${window.location.origin}${process.env.BASE_URL}`;


const initialized = i18next.init({
  fallbackLng: 'en',
  whitelist: ['en', 'fr', 'et', 'fa', 'bn', 'es'],
  backend: {
    loadPath: `${path}/locales/{{lng}}/{{ns}}.json`,
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
  // loadComponentNamespace: true,
});

i18n.initialized = initialized;

export default i18n;
