import BaseApi from "../baseApi";

class CartApi extends BaseApi {
  apiName = 'BUSINESS'
  controllerName = 'Cart'


  /** oj;
   * add sach yeu thich
   * @param {*} data 
   * @returns 
   */
  async addCart(data) {
    try {
      const url = `${this.getBaseUrl()}`;
      const res = await super.post(url, data);
      return res;
    } catch (ex) {
      return ex;
    }
  }

  async getAllCart() {
    try {
      const url = `${this.getBaseUrl()}/getAll`;
      const res = await super.get(url);
      return res;
    } catch (ex) {
      return ex;
    }
  }

  async deleteCart(data) {
    try {
      const url = `${this.getBaseUrl()}`;
      const res = await super.delete(url, data);
      return res;
    } catch (ex) {
      return ex;
    }
  }

}



export default new CartApi();