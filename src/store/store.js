import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import VuexORMisDirtyPlugin from '@vuex-orm/plugin-change-flags';
import BankAccount from '@/store/models/bank-account';
import Client from '@/store/models/client';
import Invoice from '@/store/models/invoice';
import InvoiceRow from '@/store/models/invoice-row';
import Team from '@/store/models/team';
import bankAccounts from '@/store/bank-accounts';
import clients from '@/store/clients';
import invoices from '@/store/invoices';
import teams from '@/store/teams';
import themes from '@/store/themes';
import localForage from 'localforage';
import { download } from '../utils/helpers';

Vue.use(Vuex);

VuexORM.use(VuexORMisDirtyPlugin);
const database = new VuexORM.Database();

database.register(Team);
database.register(Client);
database.register(Invoice);
database.register(InvoiceRow);
database.register(BankAccount);

export default new Vuex.Store({
  plugins: [VuexORM.install(database)],
  modules: {
    bankAccounts,
    clients,
    invoices,
    teams,
    themes,
  },
  state: {},
  mutations: {},
  actions: {
    async exportJson() {
      let results = [];
      const keys = await localForage.keys();
      keys.forEach((key) => {
        results.push(localForage.getItem(key));
      });
      results = await Promise.all(results);

      const data = {};
      keys.forEach((key, index) => {
        data[key] = results[index];
      });

      download(JSON.stringify(data), 'serverless-invoices.json', 'application/json');
    },
    importJson() {

    },
  },
});
