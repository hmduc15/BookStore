import BaseApi from "../baseApi";

class BookApi extends BaseApi {
  apiName = 'SYSTEM'
  controllerName = 'Book'

  /**
   * API lay all sach
   * @param {} payload 
   * @returns 
   */
  async getAllBook(payload) {
    try {
      const url = `${this.getBaseUrl()}/getAll`;
      const res = await super.post(url, payload);
      return res;
    } catch (ex) {
      return ex;
    }
  }


  async getAllBookAdmin() {
    try {
      const url = `${this.getBaseUrl()}/getAllBook`;
      const res = await super.get(url);
      return res;
    } catch (ex) {
      return ex;
    }
  }

  /**
   * Lay detail sach
   * @param {} id 
   * @returns 
   */
  async getBookDetail(id) {
    try {
      const url = `${this.getBaseUrl()}/getById/${id}`;
      const res = await super.get(url);
      return res;
    } catch (ex) {
      return ex;
    }
  }

  /**
   * Lay sach cung the loai
   * @param {*} id 
   * @returns 
   */
  async getSimilarBook(id) {
    try {
      const url = `${this.getBaseUrl()}/getSimilarBook/${id}`;
      const res = await super.get(url);
      return res;
    } catch (ex) {
      return ex;
    }
  }

  async getListTrending() {
    try {
      const url = `${this.getBaseUrl()}/getListTrending`;
      const res = await super.get(url);
      return res;
    } catch (ex) {
      return ex;
    }
  }

  async saleBook(data) {
    try {
      const url = `${this.getBaseUrl()}/saleBook/`;
      const res = await super.post(url, data);
      return res;
    } catch (ex) {
      return ex;
    }
  }


  async deleteBook(data) {
    try {
      const url = `${this.getBaseUrl()}`;
      const res = await super.delete(url, data);
      return res;
    } catch (ex) {
      return ex;
    }
  }


  async updateBook(data) {
    try {
      const url = `${this.getBaseUrl()}`;
      const res = await super.put(url, data);
      return res;
    } catch (ex) {
      return ex;
    }
  }
}

export default new BookApi();