import ClientField from '@/store/models/client-field';

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    init() {},
    terminate() {},
    async clientFieldProps(store, payload) {
      return ClientField.update({
        where: payload.fieldId,
        data: payload.props,
      });
    },
    async updateClientField({ dispatch }, payload) {
      await dispatch('clientFieldProps', payload);
      return dispatch('clients/updateClient', null, { root: true }); // TODO: pass clientId to make generic
    },
    async addNewField(store, clientId) {
      const field = await ClientField.createNew();
      field.$update({
        client_id: clientId,
      });
    },
    async deleteClientField({ dispatch }, fieldId) {
      await ClientField.delete(fieldId);
      return dispatch('clients/updateClient', null, { root: true }); // TODO: pass clientId to make generic
    },
  },
};
