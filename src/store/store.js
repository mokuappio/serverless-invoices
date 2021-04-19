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
import clientFields from '@/store/client-fields';
import invoices from '@/store/invoices';
import invoiceRows from '@/store/invoice-rows';
import invoiceClientFields from '@/store/invoice-client-fields';
import invoiceTeamFields from '@/store/invoice-team-fields';
import teams from '@/store/teams';
import teamFields from '@/store/team-fields';
import themes from '@/store/themes';
import taxes from '@/store/taxes';
import data from '@/store/data';
import language from '@/store/language';
import ClientField from '@/store/models/client-field';
import TeamField from '@/store/models/team-field';
import InvoiceClientField from '@/store/models/invoice-client-field';
import InvoiceTeamField from '@/store/models/invoice-team-field';
import Tax from '@/store/models/tax';
import InvoiceRowTax from '@/store/models/invoice-row-tax';

Vue.use(Vuex);

VuexORM.use(VuexORMisDirtyPlugin);
const database = new VuexORM.Database();

database.register(Tax);
database.register(Team);
database.register(TeamField);
database.register(Client);
database.register(ClientField);
database.register(Invoice);
database.register(InvoiceClientField);
database.register(InvoiceTeamField);
database.register(InvoiceRow);
database.register(InvoiceRowTax);
database.register(BankAccount);

export default new Vuex.Store({
  plugins: [VuexORM.install(database)],
  modules: {
    bankAccounts,
    clients,
    clientFields,
    invoices,
    invoiceRows,
    invoiceClientFields,
    invoiceTeamFields,
    teams,
    teamFields,
    themes,
    taxes,
    data,
    language,
  },
  state: {},
  mutations: {},
  actions: {},
});
