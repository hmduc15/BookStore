<template>
  <MModal
    :title="title"
    class="address-order"
    @beforeOpen="beforeOpen"
    :showConfirm="true"
    txtBtnConfirm="Cập nhật"
    @confirmClick="handleEditUser"
    @beforeClose="beforeClose"
  >
    <template v-slot:content>
      <div class="custom-form-field mt-3">
        <MInput
          v-model="model.name"
          Placeholder="Họ và tên"
          ref="name"
          Id="name"
          :required="true"
        ></MInput>
      </div>
      <div class="custom-form-field mt-3">
        <MInput
          v-model="model.address"
          Placeholder="Địa chỉ"
          ref="address"
          Id="address"
        ></MInput>
      </div>
      <div class="custom-form-field mt-3">
        <MInput
          v-model="model.phone_number"
          Placeholder="Số điện thoại"
          ref="tel"
          Id="tel"
        ></MInput>
      </div>
      <div class="custom-form-field mt-3">
        <MInput
          v-model="model.email"
          Placeholder="Email"
          ref="email"
          Id="email"
        ></MInput>
      </div>
    </template>
  </MModal>
</template>

<script>
import MModal from "./MModal.vue";
import popupUtil from "@/common/popupUtil";
import MInput from "../MInput/MInput.vue";
import basePopup from "../base/basePopup";
import { getCurrentInstance, onMounted, ref, watch, onBeforeMount } from "vue";
import userApi from "@/api/System/userApi";
import emailApi from "@/api/System/emailApi";
import commonFuntion from "@/common/commonFuntion";

export default {
  name: "EditUserPopUp",
  extends: basePopup,
  components: {
    MModal,
    MInput,
  },
  data() {},
  setup() {
    const { proxy } = getCurrentInstance();

    const title = ref("Thông tin tài khoản");
    const useEmail = ref(false);
    const isErrorControl = ref(false);

    function handleSwitchMethod(value) {
      useEmail.value = value.target.checked;
    }

    function bindData(data) {
      var dataE = proxy._formParam.account;
      proxy.super("bindData", basePopup, dataE);
    }

    /**
     * Xử lý validate
     */
    function validateForm() {
      let listRef = proxy.$refs;
      for (const ref in listRef) {
        if (
          listRef[ref] &&
          typeof listRef[ref].validate === "function" &&
          listRef[ref].validate()
        ) {
          proxy.isErrorControl = true;
        } else {
          proxy.isErrorControl = false;
        }
      }
    }

    async function handleEditUser() {
      proxy.validateForm();
      if (isErrorControl.value) {
        return;
      }

      commonFuntion.mask();
      try {
        const res = await userApi.updateUser(proxy.model);
        if (res) {
          proxy.$toast.success("Cập nhật tài khoản thành công");
          if (
            proxy &&
            proxy._formParam &&
            proxy._formParam.submit &&
            typeof proxy._formParam.submit == "function"
          ) {
            proxy._formParam.submit();
          }
        } else {
          proxy.$toast.error("Cập nhật tài khoản thất bại");
        }
      } catch (ex) {
        proxy.$toast.error("Cập nhật tài khoản thất bại");
        console.log(ex);
        commonFuntion.unmask();
      } finally {
        commonFuntion.unmask();
      }
    }

    return {
      title,
      handleSwitchMethod,
      useEmail,
      validateForm,
      handleEditUser,
      bindData,
    };
  },
};
</script>

<style></style>
