const axios = null;

class HttpAdapter {
  async get(uri) {
    return axios.get(uri);
  }
}

export default new HttpAdapter();
