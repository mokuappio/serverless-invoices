import 'es6-promise';
import VueProgressBar from 'vue-progressbar';
import progressbarConfig from '@/config/progressbar.config';
import '@/config/local-storage.config';
import { ModalPlugin } from 'bootstrap-vue';
import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store/store';
import VueNotifications from 'vue-notification';
import './registerServiceWorker';
import i18n from './config/i18n.config';

Vue.use(ModalPlugin);
Vue.use(VueNotifications);
Vue.use(VueProgressBar, progressbarConfig);

Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');

export default app;
