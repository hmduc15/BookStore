<template>
  <MModal
    :title="title"
    class="address-order"
    @beforeOpen="beforeOpen"
    :showConfirm="true"
    txtBtnConfirm="Thêm"
    @confirmClick="handleAddUser"
    @beforeClose="beforeClose"
  >
    <template v-slot:content>
      <div class="custom-form-field mt-3">
        <MInput
          v-model="user.name"
          Placeholder="Họ và tên"
          ref="name"
          Id="name"
          :required="true"
        ></MInput>
      </div>
      <div class="custom-form-field mt-3">
        <MInput
          v-model="user.address"
          Placeholder="Địa chỉ"
          ref="address"
          Id="address"
        ></MInput>
      </div>
      <div class="custom-form-field mt-3" v-if="!useEmail">
        <MInput
          v-model="user.phone_number"
          Placeholder="Số điện thoại"
          ref="tel"
          Id="tel"
          :required="true"
          @update:modelValue="handleResetError"
        ></MInput>
      </div>
      <div class="custom-form-field mt-3" v-else>
        <MInput
          v-model="user.email"
          Placeholder="Email"
          ref="email"
          Id="email"
          :required="true"
          @update:modelValue="handleResetError"
        ></MInput>
      </div>
      <div class="form-check form-switch mt-2">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          :checked="useEmail"
          @change="handleSwitchMethod"
        />
        <label class="form-check-label" for="flexSwitchCheckChecked"
          >Sử dụng Email</label
        >
      </div>
    </template>
  </MModal>
</template>

<script>
import MModal from "./MModal.vue";
import popupUtil from "@/common/popupUtil";
import MInput from "../MInput/MInput.vue";
import basePopup from "../base/basePopup";
import { getCurrentInstance, ref } from "vue";
import userApi from "@/api/System/userApi";
import emailApi from "@/api/System/emailApi";
import commonFuntion from "@/common/commonFuntion";

export default {
  name: "AddUserPopup",
  extends: basePopup,
  data() {
    return {
      user: {},
    };
  },
  components: {
    MModal,
    MInput,
  },
  setup() {
    const { proxy } = getCurrentInstance();

    const title = ref("Thông tin tài khoản");
    const useEmail = ref(false);
    const isErrorControl = ref(false);

    function handleSwitchMethod(value) {
      useEmail.value = value.target.checked;
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
          proxy.isErrorControl.value = true;
        } else {
          proxy.isErrorControl.value = false;
        }
      }
    }

    async function handleAddUser() {
      proxy.validateForm();
      if (isErrorControl.value) {
        return;
      }

      commonFuntion.mask();
      try {
        const res = await userApi.createUser(proxy.user);
        if (res && res.Success) {
          if (useEmail.value) {
            var param = {
              email: proxy.user.email,
              key: res.keyConfirm,
            };
            const resEmail = await emailApi.sendEmailConfirm(param);
            if (resEmail && resEmail.Success) {
              proxy.$toast.success(
                "Đã gửi email xác nhận cho tài khoản đăng ký"
              );
              if (
                proxy &&
                proxy._formParam &&
                proxy._formParam.submit &&
                typeof proxy._formParam.submit == "function"
              ) {
                proxy._formParam.submit();
              }
            }
          }
        } else {
          proxy.$toast.error(res.Message);
        }
      } catch (ex) {
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
      handleAddUser,
    };
  },
};
</script>

<style></style>
