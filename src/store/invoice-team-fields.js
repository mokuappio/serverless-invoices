import InvoiceTeamField from '@/store/models/invoice-team-field';

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    init() {},
    terminate() {},
    invoiceTeamFieldProps(store, payload) {
      return InvoiceTeamField.update({
        where: payload.fieldId,
        data: payload.props,
      });
    },
    async updateInvoiceTeamField({ dispatch }, payload) {
      await dispatch('invoiceTeamFieldProps', payload);
      return dispatch('invoices/updateInvoice', {
        invoiceId: payload.invoiceId,
      }, { root: true });
    },
    async addInvoiceTeamField(store, payload) {
      const field = await InvoiceTeamField.createNew();
      await field.$update({
        ...payload.props,
        invoice_id: payload.invoiceId,
      });
    },
    async removeInvoiceTeamFields(store, invoiceId) {
      return InvoiceTeamField.delete(field => field.invoice_id === invoiceId);
    },
    removeInvoiceTeamField(store, fieldId) {
      return InvoiceTeamField.delete(fieldId);
    },
  },
};
