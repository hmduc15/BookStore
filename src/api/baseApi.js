import httpClient from "./httpClient";
import API from './api.js'

/**
 * Base Call Api
 */
export default class BaseApi {

  baseUrl = '';
  controllerName = '';
  apiName = '';



  initAPI() {
    if (this.apiName) {
      this.baseUrl = API[this.apiName] + '/' + this.controllerName;
    }
  }

  getBaseUrl() {
    if (this.baseUrl == '') {
      this.initAPI();
    }

    return this.baseUrl;
  }

  async get(url, config = {}) {
    try {
      return await httpClient.get(url, config);
    } catch (error) {
      throw error; // Để xử lý lỗi ở nơi gọi 
    }
  }

  async post(url, data = {}, config = {}) {
    try {
      return await httpClient.post(url, data, config);
    } catch (error) {
      throw error;
    }
  }

  async put(url, data = {}, config = {}) {
    try {
      config.data = data;
      return await httpClient.put(url, data, config);
    } catch (error) {
      throw error;
    }
  }

  async delete(url, data = {}, config = {}) {
    try {
      config.data = data;
      return await httpClient.delete(url, config);
    } catch (error) {
      throw error;
    }
  }

  async patch(url, data = {}, config = {}) {
    try {
      return await httpClient.patch(url, data, config);
    } catch (error) {
      throw error;
    }
  }

  async upload(url, formData = new FormData(), config = {}) {
    // Merge headers mặc định với headers từ config
    const mergedConfig = {
      ...config,
      headers: {
        ...config.headers,
        'Content-Type': 'multipart/form-data' // Ghi đè Content-Type cho upload file
      }
    };

    return httpClient.post(url, formData, mergedConfig);
  }
}