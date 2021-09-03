import storage from 'localforage';
import { removeVuexORMFlags } from '@/utils/helpers';

class LocalAdapter {
  async get(uri) {
    const parts = uri.split('/');

    if (parts.length === 1) {
      if (parts[0] === 'team') {
        return storage.getItem(parts[0]);
      }
      return (await storage.getItem(parts[0])) || [];
    }

    if (parts.length === 2) {
      return (await storage.getItem(parts[0]))
        .find(it => it.id === parts[1]);
    }

    return null;
  }

  async post(uri, data) {
    const items = await this.get(uri);

    removeVuexORMFlags(data);
    items.push(data);

    await storage.setItem(uri, items);

    return data;
  }

  async patch(uri, data) {
    const parts = uri.split('/');

    if (parts.length === 2) {
      const items = await this.get(parts[0]);

      const index = items.findIndex(it => it.id === parts[1]);
      removeVuexORMFlags(data);
      items[index] = data;

      await storage.setItem(parts[0], items);

      return data;
    }

    return null;
  }

  async put(uri, data) {
    return storage.setItem(uri, data);
  }

  async delete(uri) {
    const parts = uri.split('/');

    if (parts.length === 2) {
      const items = await this.get(parts[0]);

      const index = items.findIndex(it => it.id === parts[1]);
      items.splice(index, 1);

      return storage.setItem(parts[0], items);
    }

    return null;
  }
}

export default new LocalAdapter();
