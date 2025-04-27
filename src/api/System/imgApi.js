import BaseApi from "../baseApi";

class ImgApi extends BaseApi {
  apiName = "FILE"
  controllerName = 'cdn/ImageControler'

  async uploadImg(file) {
    try {
      const url = `${this.getBaseUrl()}/upload`;
      const res = await super.upload(url, file)
      return res;
    } catch (ex) {
      return ex;
    }
  }
}

export default new ImgApi();