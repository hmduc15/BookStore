import BaseApi from "../baseApi";

class DashBoardApi extends BaseApi {
  apiName = 'SYSTEM'
  controllerName = 'DashBoard'

  async getDataDashboard1() {
    try {
      const url = `${this.getBaseUrl()}/getDataDashboard1`;
      const res = await super.get(url);
      return res;
    } catch (ex) {
      return ex;
    }
  }

  async getDataDashboard2() {
    try {
      const url = `${this.getBaseUrl()}/getDataDashboard2`;
      const res = await super.get(url);
      return res;
    } catch (ex) {
      return ex;
    }
  }
}

export default new DashBoardApi();