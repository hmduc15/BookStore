import BaseApi from "../baseApi";

class OrderApi extends BaseApi {
  apiName = 'BUSINESS'
  controllerName = 'Order'

  async addOrder(data) {
    try {
      const url = `${this.getBaseUrl()}/insertOrder`;
      const res = await super.post(url, data);
      return res;
    } catch (ex) {
      return ex;
    }
  }

  async getOrderDetail(id) {
    try {
      const url = `${this.getBaseUrl()}/getOrderDetail/${id}`;
      const res = await super.get(url);
      return res;
    } catch (ex) {
      return ex;
    }
  }
  async updateOrderMastre(model) {
    try {
      const url = `${this.getBaseUrl()}/updateOrder`;
      const res = await super.post(url, model);
      return res;
    } catch (ex) {
      return ex;
    }
  }

  async getQuantityStatus() {
    try {
      const url = `${this.getBaseUrl()}/getQuantityStatus`;
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

  async getAllOrderDetail() {
    try {
      const url = `${this.getBaseUrl()}/getAllDetail`;
      const res = await super.get(url);
      return res;
    } catch (ex) {
      return ex;
    }
  }

  async updateOrderStatus(data) {
    try {
      const url = `${this.getBaseUrl()}/updateOrderStatus`;
      const res = await super.post(url, data);
      return res;
    } catch (ex) {
      return ex;
    }
  }

  async updateOrderStatusJob() {
    try {
      const url = `${this.getBaseUrl()}/updatOrderStatusJob`;
      const res = await super.get(url);
      return res;
    } catch (ex) {
      return ex;
    }
  }

  async getOrderCode() {
    try {
      const url = `${this.getBaseUrl()}/getOrderCode`;
      const res = await super.get(url);
      return res;
    } catch (ex) {
      return ex;
    }
  }


}

export default new OrderApi();