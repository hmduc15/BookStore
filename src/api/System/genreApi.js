import BaseApi from '../baseApi';

class GenreApi extends BaseApi {
  apiName = 'SYSTEM'
  controllerName = 'Genre'


  async getAllGenre() {
    try {
      const url = `${this.getBaseUrl()}/getAll`;
      const res = await super.get(url);
      return res;
    } catch (ex) {
      return ex;
    }
  }

  async addGenre(model) {
    try {
      const url = `${this.getBaseUrl()}`;
      const res = await super.post(url, model);
      return res;
    } catch (ex) {
      return ex;
    }
  }
  async updateGenre(data) {
    try {
      const url = `${this.getBaseUrl()}`;
      const res = await super.put(url, data);
      return res;
    } catch (ex) {
      return ex;
    }
  }

  async deleteGenre(data) {
    try {
      const url = `${this.getBaseUrl()}`;
      const res = await super.delete(url, data);
      return res;
    } catch (ex) {
      return ex;
    }
  }

}

export default new GenreApi();