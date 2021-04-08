import InvoiceRow from '@/store/models/invoice-row';

export default {
  namespaced: true,
  state: {
  },
  mutations: {
  },
  actions: {
    init() {},
    terminate() {},
    invoiceRowProps(store, payload) {
      return InvoiceRow.update({
        where: payload.id,
        data: payload.props,
      });
    },
    async updateInvoiceRow({ dispatch }, payload) {
      await dispatch('invoiceRowProps', payload);
      return dispatch('invoices/updateInvoice', null, { root: true });
    },
    async addRow(store, invoiceId) {
      const row = await InvoiceRow.createNew();
      const rowCount = InvoiceRow.query().where('invoice_id', invoiceId).count();
      row.$update({
        invoice_id: invoiceId,
        order: rowCount,
      });
    },
    async removeRow(store, rowId) {
      await InvoiceRow.delete(rowId);
    },
  },
};
