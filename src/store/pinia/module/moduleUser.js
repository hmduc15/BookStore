import { defineStore } from "pinia";
import authApi from "@/api/Auth/authApi";
import { moduleContext } from "./moduleContext";

import { useContextStorage } from "@/composables/useContextStorage";
import commonFunction from "@/common/commonFuntion";


export const moduleUser = defineStore('user', {
  state: () => (
    {
      user: {},
      controller: 'AUTH',
    }
  ),

  getters: {

  },
  actions: {
    isAuthenticated: () => {
      const context = moduleContext()?.getContext;
      const { getSoureContextStorage } = useContextStorage();

      // Lấy context từ localStorage hoặc store
      let cxtObj = getSoureContextStorage('session_context') || context;

      if (!cxtObj?.access_token) return false;

      try {
        // Chuẩn hóa token (loại bỏ Bearer nếu có)
        const rawToken = cxtObj.access_token.replace(/^Bearer\s+/i, '');
        const tokenParts = rawToken.split('.');

        if (tokenParts.length !== 3) return false;

        // Hàm giải mã Base64 URL-safe
        const decodeBase64Url = (str) => {
          // Thay thế các ký tự URL-safe
          let output = str.replace(/-/g, '+').replace(/_/g, '/');

          // Thêm padding '=' nếu cần
          const pad = output.length % 4;
          if (pad) {
            if (pad === 1) {
              throw new Error('InvalidLengthError: Input base64url string is wrong length');
            }
            output += new Array(5 - pad).join('=');
          }

          return atob(output);
        };

        // Giải mã payload
        const tokenPayload = JSON.parse(decodeBase64Url(tokenParts[1]));

        // Kiểm tra thời gian hết hạn
        if (!tokenPayload.exp) return false; // Token không có trường exp

        const expirationTime = tokenPayload.exp * 1000; // Chuyển sang mili giây
        const currentTime = Date.now();

        // Token hợp lệ nếu chưa đến thời điểm hết hạn
        const isValid = currentTime < expirationTime;

        // Cập nhật store nếu cần
        if (isValid && cxtObj?.access_token) {
          moduleContext().setContext(cxtObj);
        }

        return isValid;
      } catch (e) {
        console.error('Token validation failed:', e);
        return false;
      }
    },
    /**
     * Login 
     * @param {} model 
     * @returns 
     */
    async login(model) {
      try {
        const res = await authApi.login(model);
        return res;
      } catch (e) {
        throw e;
      } finally {
        // tăắt loading
      }
    },

    /**
     * Register Acc
     * @param {*} model 
     */
    async register(model) {
      commonFunction.mask();
      try {
        const res = await authApi.register(model);
        return res;
      } catch (e) {
        throw e;
      } finally {
        commonFunction.unmask();
      }
    },

    /**
     * Register Acc
     * @param {*} model 
     */
    async checkExistAcc(model) {
      try {
        const res = await authApi.checkExistAcc(model);
        return res;
      } catch (e) {
        throw e;
      } finally {
      }
    },

    /**
     * Logout
     */
    async logOut() {
      try {
        // Xoa het session
        const { onLogoutSession } = useContextStorage();
        onLogoutSession();
        // Se goi them api ở day de cap nhat last login ...

      } catch (e) {

      }
    }


  }



})