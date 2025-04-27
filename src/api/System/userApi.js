import BaseApi from "../baseApi";

class UserApi extends BaseApi {
  apiName = 'SYSTEM'
  controllerName = 'User'


  async getAllUser() {
    try {
      const url = `${this.getBaseUrl()}/getAll`;
      const res = await super.get(url);
      return res;
    } catch (ex) {
      return ex;
    }
  }


  async createUser(data) {
    try {
      const url = `${this.getBaseUrl()}/createUser`;
      const res = await super.post(url, data);
      return res;
    } catch (ex) {
      return ex;
    }
  }

  async verifyConfirm(data) {
    try {
      const url = `${this.getBaseUrl()}/verifyConfirm`;
      const res = await super.post(url, data);
      return res;
    } catch (ex) {
      return ex;
    }
  }
  async updateUser(data) {
    try {
      const url = `${this.getBaseUrl()}`;
      const res = await super.put(url, data);
      return res;
    } catch (ex) {
      return ex;
    }
  }

  async deleteUser(data) {
    try {
      const url = `${this.getBaseUrl()}`;
      const res = await super.delete(url, data);
      return res;
    } catch (ex) {
      return ex;
    }
  }

}

export default new UserApi();