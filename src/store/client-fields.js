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
      const field = await dispatch('clientFieldProps', payload);
      return dispatch('clients/updateClient', {
        clientId: field.client_id,
      }, { root: true });
    },
    async addNewField(store, clientId) {
      const field = await ClientField.createNew();
      field.$update({
        client_id: clientId,
      });
    },
    async addAllFields(store, clientId) {
      // Get all distinct custom fields
      const uniqueLabels = ClientField.all()
        .map(field => field.label)
        .filter((value, index, self) => self.indexOf(value) === index);

      await Promise.all(uniqueLabels.map(async (label) => {
        const field = await ClientField.createNew();
        await field.$update({
          label,
          client_id: clientId,
        });
      }));
    },
    async deleteClientField({ dispatch }, fieldId) {
      const field = await ClientField.delete(fieldId);
      return dispatch('clients/updateClient', {
        clientId: field.client_id,
      }, { root: true }); // TODO: pass clientId to make generic
    },
  },
};
