<template>
  <MModal
    :title="title"
    class="address-order"
    @beforeOpen="beforeOpen"
    :showConfirm="true"
    txtBtnConfirm="Cập nhật"
    @confirmClick="handleUpdate"
    height="350"
    @beforeClose="beforeClose"
  >
    <template v-slot:content>
      <div class="update-status">
        <div
          class="form-check form-check-inline"
          v-for="option in statusOptions"
          :key="option.value"
        >
          <input
            type="radio"
            class="form-check-input"
            name="status"
            :id="'radio-' + option.value"
            :value="option.value"
            v-model="model.status"
          />
          <label
            :for="'radio-' + option.value"
            class="form-check-label pl-2 pointer"
            >{{ option.label }}</label
          >
        </div>
      </div>
    </template>
  </MModal>
</template>

<script>
import MModal from "./MModal.vue";
import { getCurrentInstance, ref } from "vue";
import basePopup from "../base/basePopup";
import popupUtil from "@/common/popupUtil";
export default {
  name: "UpdateStatusPopup",
  components: {
    MModal,
  },
  extends: basePopup,
  data() {
    return {
      statusOptions: [
        { value: 0, label: "Đơn hàng mới" },
        { value: 1, label: "Đã hủy" },
        { value: 2, label: "Xác nhận" },
        { value: 5, label: "Chờ thanh toán" },
        { value: 3, label: "Đã thanh toán" },
        { value: 4, label: "Hoàn thành" },
      ],
    };
  },
  setup() {
    const title = ref("Cập nhật trạng thái đơn hàng");
    const selectedStatus = ref(null);
    const { proxy } = getCurrentInstance();

    function bindData(data) {
      var dataE = proxy._formParam.status;
      proxy.super("bindData", basePopup, dataE);
    }

    function handleUpdate() {
      if (
        proxy &&
        proxy._formParam &&
        proxy._formParam.options &&
        typeof proxy._formParam.options == "function"
      ) {
        popupUtil.hide("UpdateStatusPopup");
        proxy._formParam.options(proxy.model.status);
        proxy.hide();
      }
    }

    return {
      title,
      selectedStatus,
      proxy,
      handleUpdate,
    };
  },
};
</script>

<style lang="scss" scoped>
.update-status {
  padding-left: 10px;
  margin-top: 18px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px 0;
}
.pointer {
  cursor: pointer;
}
</style>
