import InvoiceClientField from '@/store/models/invoice-client-field';

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    init() {},
    terminate() {},
    invoiceClientFieldProps(store, payload) {
      return InvoiceClientField.update({
        where: payload.fieldId,
        data: payload.props,
      });
    },
    async updateInvoiceClientField({ dispatch }, payload) {
      await dispatch('invoiceClientFieldProps', payload);
      return dispatch('invoices/updateInvoice', {
        invoiceId: payload.invoiceId,
      }, { root: true });
    },
    async removeInvoiceClientFields(store, invoiceId) {
      return InvoiceClientField.delete(field => field.invoice_id === invoiceId);
    },
    async addInvoiceClientField(store, payload) {
      const field = await InvoiceClientField.createNew();
      await field.$update({
        ...payload.props,
        invoice_id: payload.invoiceId,
      });
    },
    async removeInvoiceClientField(store, fieldId) {
      await InvoiceClientField.delete(fieldId);
    },
  },
};
