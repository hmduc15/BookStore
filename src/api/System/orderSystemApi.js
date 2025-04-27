import BaseApi from "../baseApi";

class OrderSystemApi extends BaseApi {
  apiName = 'SYSTEM'
  controllerName = 'OrderSystem'

  /**
   * Check xem don hang thanh toan chua
   * @param {} code 
   * @returns 
   */
  async checkOrderPaid(code) {
    try {
      const url = `${this.getBaseUrl()}/checkOrderPaid/${code}`;
      const res = await super.get(url);
      return res;
    } catch (ex) {
      return ex;
    }
  }

  async getAllOrder() {
    try {
      const url = `${this.getBaseUrl()}/getAll`;
      const res = await super.get(url);
      return res;
    } catch (ex) {
      return ex;
    }
  }
  async getMasterDetail(id) {
    try {
      const url = `${this.getBaseUrl()}/getMasterDetail/${id}`;
      const res = await super.get(url);
      return res;
    } catch (ex) {
      return ex;
    }
  }
  async updateOrderMaster(data) {
    try {
      const url = `${this.getBaseUrl()}`;
      const res = await super.put(url, data)
      return res;
    } catch (ex) {
      return ex;
    }
  }
}

export default new OrderSystemApi();