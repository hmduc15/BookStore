import { defineStore } from 'pinia';
import { useContextStorage } from '@/composables/useContextStorage';
import { cloneDeep } from 'lodash';
import role from '@/common/enum/role';

export const moduleContext = defineStore('context', {
  // Trạng thái (state) lưu trữ thông tin context
  state: () => ({
    context: {},
  }),

  // Getters để truy xuất dữ liệu
  getters: {
    getContext: (state) => {
      return state.context;
    },
  },

  // Actions để cập nhật trạng thái
  actions: {
    setContext(context) {
      this.context.name = context.name || null;
      this.context.database_id = context.database_id || null;
      this.context.account_id = context.account_id || null;
      this.context.role = context.role ?? null;
      this.context.access_token = context.access_token || null;
      this.context.email = context.email || null;
      this.context.isAdmin = context.role === role.Admin;
      const { setSourceContextStorage } = useContextStorage();
      // Set context de lam source goc
      setSourceContextStorage(cloneDeep(this.context))

    },
    clearContext() {
      this.context.name = null;
      this.context.database_id = null;
      this.context.account_id = null;
      this.context.role = null;
      this.context.access_token = null;
    },
  },
});