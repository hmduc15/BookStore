import { defineStore } from "pinia";
import bookApi from "@/api/System/bookApi";


export const moduleBook = defineStore('book', {
  state: () => ({
    lstBook: [],
    payload: {}
  }),

  getters: {

  },

  actions: {

    /**
     * Lay danh sach sach
     * @param {*} payload 
     * @returns 
     */
    async getAllBook(payload) {
      try {
        this.setPayload(payload);
        const res = await bookApi.getAllBook(payload);
        return res;
      } catch (e) {
        throw e;
      } finally {

      }
    },

    /**
     * Lay danh sach detail
     * @param {} id 
     * @returns 
     */
    async getBookDetail(id) {
      try {
        const res = await bookApi.getBookDetail(id);
        return res;
      } catch (e) {
        throw e;
      } finally {

      }
    },

    /**
     * Lay sach cos cung the loai
     * @param {} id 
     * @returns 
     */
    async getSimilarBooks(id) {
      try {
        const res = await bookApi.getSimilarBook(id);
        return res;
      } catch (e) {
        throw e;
      } finally {

      }
    },

    setPayload(payload) {
      this.payload = payload;
    },

    setListBook(data) {
      this.lstBook = data;
    },

  }

})