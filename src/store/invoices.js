import InvoiceService from '@/services/invoice.service';
import Invoice from '@/store/models/invoice';
import { generateInvoiceNumber, pick } from '@/utils/helpers';
import dayjs from 'dayjs';
import Errors from '@/utils/errors';

function getInvoice(invoiceId) {
  return Invoice.query()
    .with(['client', 'client_fields', 'team_fields'])
    .with('rows', query => query.orderBy('order', 'asc'))
    .find(invoiceId);
}

export default {
  namespaced: true,
  state: {
    errors: new Errors(),
    invoiceId: null,
    isSendModalOpen: false,
  },
  mutations: {
    invoiceId(state, invoiceId) {
      state.invoiceId = invoiceId;
    },
    isSendModalOpen(state, isSendModalOpen) {
      state.isSendModalOpen = isSendModalOpen;
    },
    setErrors(state, errors) {
      state.errors.set(errors);
    },
    clearErrors(state) {
      state.errors.clear();
    },
  },
  actions: {
    init({ dispatch }) {
      dispatch('getInvoices');
    },
    terminate() {
      return Invoice.deleteAll();
    },
    async getInvoices() {
      const invoices = await InvoiceService.getInvoices();
      await Invoice.create({ data: invoices });
      return invoices;
    },
    async getInvoice({ commit }, invoiceId) {
      const invoice = await InvoiceService.getInvoice(invoiceId);
      await Invoice.insert({ data: invoice });
      commit('invoiceId', invoiceId);
      return invoice;
    },
    async createNewInvoice({ dispatch }) {
      const invoice = await Invoice.createNew();
      await InvoiceService.createInvoice(invoice);
      await dispatch('prefillTeam', {
        invoiceId: invoice.id,
      });
      return invoice.id;
    },
    invoiceProps(store, payload) {
      return Invoice.update({
        where: payload.invoiceId,
        data: payload.props,
      });
    },
    async updateClient({ dispatch }, payload) {
      const clientProps = pick(payload.props, {
        bank_account_id: 'bank_account_id',
        client_name: 'company_name',
        client_address: 'company_address',
        client_postal_code: 'company_postal_code',
        client_country: 'company_country',
        client_county: 'company_county',
        client_city: 'company_city',
        client_email: 'invoice_email',
        currency: 'currency',
      });
      if ('vat_rate' in payload.props) {
        clientProps.has_vat = payload.props.vat_rate > 0;
      }
      const invoice = getInvoice(payload.invoiceId);

      if (Object.keys(clientProps).length > 0 && invoice.client_id) {
        dispatch('clients/updateClientById', {
          props: clientProps,
          clientId: invoice.client_id,
        }, { root: true });
      }
    },
    async updateTeam({ dispatch }, payload) {
      const teamProps = pick(payload.props, {
        late_fee: 'invoice_late_fee',
        from_name: 'company_name',
        from_address: 'company_address',
        from_postal_code: 'company_postal_code',
        from_city: 'company_city',
        from_country: 'company_country',
        from_county: 'company_county',
        from_website: 'website',
        from_email: 'contact_email',
        from_phone: 'contact_phone',
        vat_rate: 'vat_rate',
      });
      const invoice = getInvoice(payload.invoiceId);

      if ('due_at' in payload.props || 'issued_at' in payload.props) {
        teamProps.invoice_due_days = dayjs(invoice.due_at)
          .diff(invoice.issued_at, 'days');
      }
      if ('vat_rate' in payload.props) {
        // You can only set VAT to 0 if setting it directly under settings
        // This is to avoid setting general VAT to 0, if only changing per invoice
        if (parseFloat(teamProps.vat_rate) === 0) {
          delete teamProps.vat_rate;
        }
      }

      if (Object.keys(teamProps).length > 0) {
        dispatch('teams/updateTeam', teamProps, { root: true });
      }
    },
    async updateInvoice({ dispatch, commit }, payload) {
      if (payload.props) {
        await dispatch('invoiceProps', payload);
        await dispatch('updateClient', payload);
        await dispatch('updateTeam', payload);
      }

      commit('clearErrors');
      return InvoiceService.updateInvoice(getInvoice(payload.invoiceId))
        .catch(err => commit('setErrors', err.errors));
    },
    async deleteInvoice(store, invoice) {
      const res = await InvoiceService.deleteInvoice(invoice.id);
      await Invoice.delete(invoice.id);
      return res;
    },
    async bookInvoice({ getters, commit, dispatch }) {
      commit('clearErrors');

      try {
        await InvoiceService.bookInvoice(getters.invoice);
        return dispatch('getInvoice', getters.invoice.id);
      } catch (err) {
        commit('setErrors', err.errors);
      }
    },
    prefillClient({ dispatch, rootGetters }, payload) {
      const client = payload.client;
      dispatch('invoiceClientFields/removeInvoiceClientFields', payload.invoiceId, { root: true });

      client.fields.forEach((field) => {
        dispatch('invoiceClientFields/addInvoiceClientField', {
          invoiceId: payload.invoiceId,
          props: {
            label: field.label,
            value: field.value,
            client_field_id: field.id,
          },
        }, { root: true });
      });

      return dispatch('updateInvoice', {
        invoiceId: payload.invoiceId,
        props: {
          client_id: client.id,
          client_name: client.company_name,
          client_address: client.company_address,
          client_postal_code: client.company_postal_code,
          client_city: client.company_city,
          client_county: client.company_county,
          client_country: client.company_country,
          client_email: client.invoice_email,
          currency: client.currency || rootGetters['teams/team'].currency || 'USD',
          vat_rate: client.has_vat ? rootGetters['teams/team'].vat_rate : 0,
          bank_name: client.bank_account ? client.bank_account.bank_name : null,
          bank_account_no: client.bank_account ? client.bank_account.account_no : null,
        },
      });
    },
    prefillTeam({ dispatch, getters, rootGetters }, payload) {
      const team = rootGetters['teams/team'];
      dispatch('invoiceTeamFields/removeInvoiceTeamFields', payload.invoiceId, { root: true });

      team.fields.forEach((field) => {
        dispatch('invoiceTeamFields/addInvoiceTeamField', {
          invoiceId: payload.invoiceId,
          props: {
            label: field.label,
            value: field.value,
          },
        }, { root: true });
      });

      return dispatch('updateInvoice', {
        invoiceId: payload.invoiceId,
        props: {
          issued_at: dayjs()
            .format('YYYY-MM-DD'),
          due_at: dayjs()
            .add(team.invoice_due_days || 14, 'days')
            .format('YYYY-MM-DD'),
          number: generateInvoiceNumber(getters.all),
          late_fee: team.invoice_late_fee || 0.5,
          from_name: team.company_name,
          from_address: team.company_address,
          from_postal_code: team.company_postal_code,
          from_city: team.company_city,
          from_country: team.company_country,
          from_county: team.company_county,
          from_website: team.website,
          from_email: team.contact_email,
          from_phone: team.contact_phone,
          vat_rate: team.vat_rate || 0,
          currency: team.currency || 'USD',
        },
      });
    },
  },
  getters: {
    invoice(state) {
      return getInvoice(state.invoiceId);
    },
    all() {
      return Invoice.query()
        .where('$isNew', false)
        .with(['client'])
        .with('rows', query => query.orderBy('order', 'asc')) // TODO: do we need this?
        .orderBy('issued_at', 'desc')
        .orderBy('number', 'desc')
        .get();
    },
  },
};
