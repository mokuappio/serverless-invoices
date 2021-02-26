import InvoiceService from '@/services/invoice.service';
import Invoice from '@/store/models/invoice';
import InvoiceRow from '@/store/models/invoice-row';
import { pick } from '@/utils/helpers';
import dayjs from 'dayjs';
import Errors from '@/utils/errors';

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
    async createNewInvoice() {
      const invoice = await Invoice.createNew();
      await InvoiceService.createInvoice(invoice);
      return invoice.id;
    },
    invoiceProps({ state }, props) {
      return Invoice.update({
        where: state.invoiceId,
        data: props,
      });
    },
    invoiceRowProps(store, payload) {
      return InvoiceRow.update({
        where: payload.id,
        data: payload.props,
      });
    },
    async updateInvoice({ getters, dispatch, commit }, props) {
      await dispatch('invoiceProps', props);

      // Update client
      const clientProps = pick(props, {
        bank_account_id: 'bank_account_id',
        client_name: 'company_name',
        client_address: 'company_address',
        client_postal_code: 'company_postal_code',
        client_country: 'company_country',
        client_county: 'company_county',
        client_city: 'company_city',
        client_reg_no: 'company_reg_no',
        client_vat_no: 'company_vat_no',
        client_email: 'invoice_email',
        currency: 'currency',
      });
      if ('vat_rate' in props) {
        clientProps.has_vat = props.vat_rate > 0;
      }

      if (Object.keys(clientProps).length > 0 && getters.invoice.client_id) {
        dispatch('clients/updateClientById', {
          props: clientProps,
          clientId: getters.invoice.client_id,
        }, { root: true });
      }

      const teamProps = pick(props, {
        late_fee: 'invoice_late_fee',
        from_name: 'company_name',
        from_address: 'company_address',
        from_postal_code: 'company_postal_code',
        from_city: 'company_city',
        from_country: 'company_country',
        from_county: 'company_county',
        from_reg_no: 'company_reg_no',
        from_vat_no: 'company_vat_no',
        from_website: 'website',
        from_email: 'contact_email',
        from_phone: 'contact_phone',
        vat_rate: 'vat_rate',
      });
      if ('due_at' in props || 'issued_at' in props) {
        teamProps.invoice_due_days = dayjs(getters.invoice.due_at)
          .diff(getters.invoice.issued_at, 'days');
      }
      if ('vat_rate' in props) {
        // You can only set VAT to 0 if setting it directly under settings
        // This is to avoid setting general VAT to 0, if only changing per invoice
        if (parseFloat(teamProps.vat_rate) === 0) {
          delete teamProps.vat_rate;
        }
      }

      if (Object.keys(teamProps).length > 0) {
        dispatch('teams/updateTeam', teamProps, { root: true });
      }

      commit('clearErrors');

      return InvoiceService.updateInvoice(getters.invoice)
        .catch(err => commit('setErrors', err.errors));
    },
    async updateInvoiceRow({ getters, dispatch, commit }, payload) {
      await dispatch('invoiceRowProps', payload);

      commit('clearErrors');

      return InvoiceService.updateInvoice(getters.invoice)
        .catch(err => commit('setErrors', err.errors));
    },
    async deleteInvoice(store, invoice) {
      const res = await InvoiceService.deleteInvoice(invoice.id);
      if ('invoice_id' in res) {
        Invoice.delete(res.invoice_id);
      }
      return res;
    },
    async addRow({ state, getters }) {
      const row = await InvoiceRow.createNew();
      row.$update({
        invoice_id: state.invoiceId,
        order: getters.invoice.rows.length,
      });
    },
    async removeRow(store, row) {
      await InvoiceRow.delete(row.id);
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
  },
  getters: {
    invoice(state) {
      return Invoice.query()
        .with(['client'])
        .with('rows', query => query.orderBy('order', 'asc'))
        .find(state.invoiceId);
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
