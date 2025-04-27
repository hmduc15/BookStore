// src/api/httpClient.js
import axios from 'axios';
import { moduleContext } from '@/store/pinia/module/moduleContext';
import { useContextStorage } from '@/composables/useContextStorage';


const { getSoureContextStorage } = useContextStorage();

// Tạo instance của axios
const httpClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request Interceptor
httpClient.interceptors.request.use(
  (config) => {

    let headers = config.headers || {};
    let context = moduleContext().getContext;
    if (!context.access_token) {
      context = getSoureContextStorage('session_context');
      if (context != null) {
        moduleContext().setContext(context);
      }
    }

    if (!headers['Authorization']) {
      if (context && context.access_token) {
        headers[`Authorization`] = context.access_token;
        headers[`AccountId`] = context.account_id;
      }
    }

    if (config.data instanceof FormData) {
      delete headers['Content-Type'];
    }

    // 
    config.headers = headers;

    // Thêm timestamp để tránh cache
    // Bỏ qua thêm timestamp nếu là FormData (tránh làm hỏng dữ liệu)
    if (!(config.data instanceof FormData)) {
      config.params = {
        ...config.params,
        _t: Date.now()
      };
    }

    return config;
  },
  (error) => {
    // Xử lý lỗi request
    console.error('[Request Error]', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
httpClient.interceptors.response.use(
  (response) => {
    // Trả về dữ liệu trực tiếp thay vì toàn bộ response object
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Xử lý lỗi 401 - Token hết hạn
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // // Gọi API refresh token
        // const refreshToken = localStorage.getItem('refreshToken');
        // const response = await axios.post(
        //   'http://your-api-url.com/api/refresh-token',
        //   { refreshToken }
        // );

        // const newToken = response.data.accessToken;
        // localStorage.setItem('token', newToken);

        // Cập nhật header với token mới và thử lại request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return httpClient(originalRequest);
      } catch (refreshError) {
        // Nếu refresh token thất bại, đăng xuất user
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        // window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Xử lý các mã lỗi khác
    const errorMessage = {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      data: error.response?.data
    };

    switch (error.response?.status) {
      case 400:
        console.error('[Bad Request]', errorMessage);
        break;
      case 403:
        console.error('[Forbidden]', errorMessage);
        break;
      case 404:
        console.error('[Not Found]', errorMessage);
        break;
      case 429:
        console.error('[Too Many Requests]', errorMessage);
        break;
      case 500:
        console.error('[Server Error]', errorMessage);
        break;
      default:
        console.error('[Unknown Error]', errorMessage);
    }

    // Nếu không có response (mạng lỗi)
    if (!error.response) {
      errorMessage.message = 'Network Error: Please check your connection';
    }

    return Promise.reject(errorMessage);
  }
);

// Các phương thức HTTP
export default {
  get(url, config = {}) {
    return httpClient.get(url, config);
  },

  post(url, data = {}, config = {}) {
    return httpClient.post(url, data, config);
  },

  put(url, data = {}, config = {}) {
    return httpClient.put(url, data, config);
  },

  delete(url, config = {}) {
    return httpClient.delete(url, config);
  },

  patch(url, data = {}, config = {}) {
    return httpClient.patch(url, data, config);
  },


};