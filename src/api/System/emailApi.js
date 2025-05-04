import BaseApi from "../baseApi";

class EmailApi extends BaseApi {

  apiName = 'SYSTEM'
  controllerName = 'Email'

  /**
   * API gui OTP
   * @param {*} model 
   * @returns 
   */
  async sendEmailOtp(model) {
    try {
      const url = `${this.getBaseUrl()}/sendEmailOtp`
      const res = await super.post(url, model);

      return res;
    } catch (e) {
      console.log(e);
    }
  }

  async sendEmailConfirm(model) {
    try {
      const url = `${this.getBaseUrl()}/sendEmailConfirm`
      const res = await super.post(url, model);
      return res;
    } catch (e) {
      console.log(e);
    }
  }

  async sendEmailReminder(model) {
    try {
      const url = `${this.getBaseUrl()}/sendEmailReminder`
      const res = await super.post(url, model);
      return res;
    } catch (e) {
      console.log(e);
    }
  }


  async sendEmailOrder(model) {
    try {
      const url = `${this.getBaseUrl()}/sendEmailOrder`
      const res = await super.post(url, model);
      return res;
    } catch (e) {
      console.log(e);
    }
  }


}

export default new EmailApi();