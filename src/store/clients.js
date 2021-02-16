import ClientService from '@/services/client.service';
import Client from '@/store/models/client';

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
    async createNewClient(store, client) {
      if (!client.hasOwnProperty('id')) {
        client = new Client(client);
      }
      const res = await ClientService.createClient(client);
      await Client.insert({ data: res });
      return Client.find(res.id);
    },
    clientProps({ state }, props) {
      return Client.update({
        where: state.clientId,
        data: props,
      });
    },
    async updateClient({ getters, dispatch }, props) {
      await dispatch('clientProps', props);
      return ClientService.updateClient(getters.client);
    },
    async updateClientById(store, payload) {
      const client = Client.find(payload.clientId);
      client.$update(payload.props);
      return ClientService.updateClient(client);
    },
    async openNewClientModal({ commit }) {
      const client = await Client.createNew();
      commit('clientId', client.id);
      commit('isModalOpen', true);
    },
    async deleteClient(clientId) {
      const res = await ClientService.deleteClient(clientId);
      if ('client_id' in res) {
        Client.delete(res.client_id);
      }
      return res;
    },
  },
  getters: {
    client(state) {
      return Client.query()
        .with(['bank_account'])
        .find(state.clientId);
    },
    all() {
      return Client.query()
        .where('$isNew', false)
        .with(['bank_account'])
        .get();
    },
  },
};
