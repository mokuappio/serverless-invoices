import ClientService from '@/services/client.service';
import Client from '@/store/models/client';

function getClientById(clientId) {
  return Client.query()
    .with(['bank_account', 'fields'])
    .find(clientId);
}

export default {
  namespaced: true,
  state: {
    clientId: null,
    isModalOpen: false,
  },
  mutations: {
    clientId(state, clientId) {
      state.clientId = clientId;
    },
    isModalOpen(state, isOpen) {
      state.isModalOpen = isOpen;
    },
  },
  actions: {
    init({ dispatch }) {
      return dispatch('getClients');
    },
    terminate() {
      return Client.deleteAll();
    },
    async getClients() {
      const clients = await ClientService.getClients();
      await Client.create({ data: clients });
      return clients;
    },
    async getClient({ commit }, clientId) {
      const client = await ClientService.getClient(clientId);
      commit('clientId', client.id);
      Client.insert({ data: client });
    },
    async createNewClient({ dispatch }, client) {
      if (!client.hasOwnProperty('id')) {
        client = new Client(client);
      }
      await dispatch('clientFields/addAllFields', client.id, { root: true });

      const res = await ClientService.createClient(client);
      await Client.insert({ data: res });
      return getClientById(res.id);
    },
    clientProps(store, payload) {
      return Client.update({
        where: payload.clientId,
        data: payload.props,
      });
    },
    async updateClient({ dispatch }, payload) {
      if (payload.props) {
        await dispatch('clientProps', payload);
      }
      return ClientService.updateClient(getClientById(payload.clientId));
    },
    async openNewClientModal({ commit }) {
      const client = await Client.createNew();
      commit('clientId', client.id);
      commit('isModalOpen', true);
    },
    async deleteClient(store, clientId) {
      const res = await ClientService.deleteClient(clientId);
      await Client.delete(clientId);
      return res;
    },
  },
  getters: {
    client(state) {
      return getClientById(state.clientId);
    },
    all() {
      return Client.query()
        .where('$isNew', false)
        .with(['bank_account', 'fields'])
        .get();
    },
  },
};
