import BaseApi from "../baseApi";

class CommentApi extends BaseApi {
  apiName = 'SYSTEM'
  controllerName = 'Comment'

  /**
   * Lay cmt theo Id sach
   * @param {} bookId 
   * @returns 
   */
  async getCommentByBook(bookId) {
    try {
      const url = `${this.getBaseUrl()}/getCommentByBook/${bookId}`;
      const res = await super.get(url);
      return res;
    } catch (ex) {
      return ex;
    }
  }

  /**&
   * Add Cmt
   */
  async addComment(data) {
    try {
      const url = `${this.getBaseUrl()}`;
      const res = await super.post(url, data);
      return res;
    } catch (ex) {
      return ex;
    }
  }

  /**
   * update like
   * @param {*} data 
   * @returns 
   */
  async updateLike(data) {
    try {
      const url = `${this.getBaseUrl()}/actionLike`
      const res = await super.post(url, data);
      return res;
    } catch (ex) {
      return ex;
    }
  }

}

export default new CommentApi();