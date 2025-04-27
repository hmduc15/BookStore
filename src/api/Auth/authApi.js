import BaseApi from "../baseApi";

class AuthApi extends BaseApi {

  apiName = 'AUTH'
  controllerName = 'Auth'


  /**
   *  APi login
   * @param {*} model 
   * @returns 
   */
  async login(model) {
    try {
      const url = `${this.getBaseUrl()}/login`
      const res = await super.post(url, model);
      return res;
    } catch (e) {
      return e;
    }
  }

  /**
   * API register
   * @param {*} model 
   * @returns 
   */
  async register(model) {
    try {
      const url = `${this.getBaseUrl()}/register`
      const res = await super.post(url, model);
      return res;

    } catch (e) {
      return e;
    }
  }

  /**
   * Check Exist Acc
   * @param {} model 
   * @returns 
   */
  async checkExistAcc(model) {
    try {
      const url = `${this.getBaseUrl()}/checkExist`
      const res = await super.post(url, model);
      return res;

    } catch (e) {
      return e;
    }
  }
  /**
   * API logout
   * @param {} model 
   */
  async logout(model) {

  }

  /**
   * APi refreshToken
   * @param {} param 
   * @returns 
   */
  async refreshToken(param) {
    try {
      const url = `${this.getBaseUrl()}/refresh-token`
      const res = await super.post(url, param);

      return res;
    } catch (e) {
      return e;
    }
  }


}

export default new AuthApi();