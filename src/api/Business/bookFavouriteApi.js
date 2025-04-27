import BaseApi from "../baseApi";

class BookFavouriteApi extends BaseApi {
  apiName = 'BUSINESS'
  controllerName = 'BookFavourite'


  /**
   * add sach yeu thich
   * @param {*} data 
   * @returns 
   */
  async addFavourite(data) {
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

  async deleteWishList(data) {
    try {
      const url = `${this.getBaseUrl()}`;
      const res = await super.delete(url, data);
      return res;
    } catch (ex) {
      return ex;
    }
  }

}



export default new BookFavouriteApi();