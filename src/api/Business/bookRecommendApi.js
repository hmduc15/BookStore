import BaseApi from "../baseApi";

class BookRecommendApi extends BaseApi {
  apiName = "RECOMMEND"
  controllerName = 'Recommend'

  async getAllBookRecommend() {
    try {
      const url = `${this.getBaseUrl()}/getBookRecommend`;
      const res = await super.get(url);
      return res;
    } catch (ex) {
      return ex;
    }
  }

}

export default new BookRecommendApi();