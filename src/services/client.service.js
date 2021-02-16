import storage from 'localforage';
import { removeVuexORMFlags } from '@/utils/helpers';

class ClientService {
  async getClients() {
    const clients = await storage.getItem('clients');

    return clients || [];
  }

  async getClient(clientId) {
    const clients = await this.getClients();
    return clients.find(client => client.id === clientId);
  }

  async createClient(client) {
    return this.saveClient(client);
  }

  async updateClient(client) {
    return this.saveClient(client);
  }

  async deleteClient(clientId) {
    const clients = await this.getClients();
    const index = clients.findIndex(item => item.id === clientId);
    clients.splice(index, 1);
    return storage.setItem('clients', clients);
  }

  async saveClient(client) {
    const clients = await this.getClients();
    const index = clients.findIndex(item => item.id === client.id);
    removeVuexORMFlags(client);

    if (index === -1) {
      clients.push(client);
    } else {
      clients[index] = client;
    }
    await storage.setItem('clients', clients);
    return client;
  }
}

export default new ClientService();
