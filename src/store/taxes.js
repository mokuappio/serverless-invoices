import Tax from '@/store/models/tax';
import TaxService from '@/services/tax.service';

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    init({ dispatch }) {
      return dispatch('getTaxes');
    },
    terminate() {
      return Tax.deleteAll();
    },
    async getTaxes() {
      const taxes = await TaxService.getTaxes();
      await Tax.create({ data: taxes });
      return taxes;
    },
    async taxProps(store, payload) {
      return Tax.update({
        where: payload.taxId,
        data: payload.props,
      });
    },
    async updateTax({ dispatch }, payload) {
      const tax = await dispatch('taxProps', payload);
      return TaxService.updateTax(tax);
    },
    async addNewTax() {
      const tax = await Tax.createNew();
      return TaxService.createTax(tax);
    },
    async deleteTax(store, taxId) {
      await Tax.delete(taxId);
      return TaxService.deleteTax(taxId);
    },
  },
  getters: {
    all() {
      return Tax.all();
    },
    allWithLabels() {
      return Tax.all().filter(tax => !!tax.label);
    },
  },
};
