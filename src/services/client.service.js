import data from '@/services/data.service';

class ClientService {
  async getClients() {
    return data.get('clients');
  }

  async getClient(clientId) {
    return data.get(`clients/${clientId}`);
  }

  async createClient(client) {
    return data.post('clients', client);
  }

  async updateClient(client) {
    return data.patch(`clients/${client.id}`, client);
  }

  async deleteClient(clientId) {
    return data.delete(`clients/${clientId}`);
  }
}

export default new ClientService();
