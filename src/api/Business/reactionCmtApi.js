import BaseApi from "../baseApi";

class ReactionCmtApi extends BaseApi {
  apiName = 'BUSINESS'
  controllerName = 'ReactionComment'

  /**
   * update Reaction cmt
   */
  async updateReactionCmt(data) {
    try {
      const url = `${this.getBaseUrl()}/updateReaction`
      const res = await super.post(url, data);
      return res;
    } catch (ex) {
      return ex;
    }
  }

  /**
   * Lay cmt theo sach cua user nay
   * @param {} bookId 
   * @returns 
   */
  async getReaction(bookId) {
    try {
      const url = `${this.getBaseUrl()}/getReactionByBookId/${bookId}`
      const res = await super.get(url);
      return res;
    } catch (ex) {
      return ex;
    }
  }

}

export default new ReactionCmtApi();