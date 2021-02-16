import 'es6-promise';
import '@/config/storage.config';
import { BVModalPlugin } from 'bootstrap-vue';
import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store/store';
import VueNotifications from 'vue-notification';

Vue.use(BVModalPlugin);
Vue.use(VueNotifications);

Vue.config.productionTip = false;

const app = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

export default app;
