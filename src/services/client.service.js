import storage from 'localforage';

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
    const clients = await this.getClients();

    delete client.$id;
    delete client.$isNew;
    delete client.$isDirty;

    clients.push(client);
    await storage.setItem('clients', clients);
    return client;
  }

  async updateClient(client) {
    const clients = await this.getClients();
    const index = clients.findIndex(item => item.id === client.id);

    // TODO: Fix this mess
    if (index === -1) {
      return false;
    }
    clients[index] = client;
    return storage.setItem('clients', clients);
  }

  async deleteClient(clientId) {
    const clients = await this.getClients();
    const index = clients.findIndex(item => item.id === clientId);
    clients.splice(index, 1);
    return storage.setItem('clients', clients);
  }
}

export default new ClientService();
