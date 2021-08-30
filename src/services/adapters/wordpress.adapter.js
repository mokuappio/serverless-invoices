import axios from 'axios';
import app from '@/main';
import config from '@/config/app.config';
import NotificationService from '@/services/notification.service';
import { removeVuexORMFlags } from '@/utils/helpers';

const http = axios.create({
  baseURL: config.api_url || '',
  headers: {
    'X-WP-Nonce': config.api_nonce || '',
  },
});

http.interceptors.request.use((request) => {
  if (typeof request.hideLoading === 'undefined' || !request.hideLoading) {
    app.$Progress.start();
  }
  return request;
}, (error) => {
  app.$Progress.finish();

  NotificationService.error('Network error. Check your connection');
  return Promise.reject(error);
});

http.interceptors.response.use((response) => {
  app.$Progress.finish();

  return response;
}, (error) => {
  app.$Progress.finish();

  // Server down
  if (error.response.status >= 500) {
    NotificationService.error('Server Unavailable.');
    return Promise.reject(error);
  }

  return Promise.reject(error);
});

class WordpressAdapter {
  async get(uri) {
    const parts = uri.split('/');

    if (parts.length === 1) {
      const res = await http.get(`si_${parts[0]}`, {
        params: {
          context: 'edit',
          _fields: 'content.raw',
        },
      })
        .then(r => r.data);

      if (parts[0] === 'team') {
        return res.length > 0 ? JSON.parse(res[0].content.raw) : null;
      }
      return res.map(item => JSON.parse(item.content.raw));
    }

    if (parts.length === 2) {
      const res = await http.get(`si_${parts[0]}/${parts[1]}`, {
        params: {
          context: 'edit',
          _fields: 'content.raw',
        },
      })
        .then(r => r.data);
      return JSON.parse(res.content.raw);
    }

    return null;
  }

  async post(uri, data) {
    removeVuexORMFlags(data);
    await http.post(`si_${uri}`, {
      content: JSON.stringify(data),
      status: 'publish',
      slug: data.id,
    });
    return data;
  }

  async patch(uri, data) {
    removeVuexORMFlags(data);
    const parts = uri.split('/');

    if (parts.length === 2) {
      await http.post(`si_${parts[0]}/${parts[1]}`, {
        content: JSON.stringify(data),
      });
      return data;
    }

    return null;
  }

  async put(uri, data) {
    if (uri === 'team') {
      const res = await this.get('team');
      if (res) {
        return this.patch(`${uri}/${res.id}`, data);
      }
      return this.post(uri, data);
    }
    return null;
  }

  async delete(uri) {
    const parts = uri.split('/');

    if (parts.length === 2) {
      return http.delete(`si_${parts[0]}/${parts[1]}`);
    }

    return null;
  }
}

export default new WordpressAdapter();
