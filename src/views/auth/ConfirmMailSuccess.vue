<template>
  <div class="success-container">
    <div class="img-container">
      <img
        class="img"
        src="../../../public/assets/images/pages/img-success.jpg"
      />
    </div>
    <b-col class="form-container d-flex mt-5 pt-5">
      <div class="top text-center">
        <div class="logo-container">
          <img
            :class="['logo-normal', 'logo']"
            src="/assets/images/logo.jpg"
            height="30"
            alt="logo"
          />
        </div>
        <h3 class="text-center notice">Tạo mật khẩu mới</h3>
      </div>
      <div class="pwd">
        <div class="custom-form-field position-relative mt-3">
          <MInput
            Type="password"
            v-model="pwd.password"
            Placeholder="Mật khẩu"
            ref="pwd1"
            Id="pwd"
            :required="true"
            @update:modelValue="handleResetError"
            rule="password"
          ></MInput>
          <b-button
            class="btn-show btn-eye position-absolute btn-outline"
            type="button"
            @click="handleShow(1)"
          >
            <div class="icon-hide" v-if="isHidePassword1"></div>
            <div class="icon-show" v-else></div>
          </b-button>
        </div>
        <div class="custom-form-field position-relative mt-3">
          <MInput
            Type="password"
            v-model="pwd.password_sec"
            Placeholder="Xác nhận mật khẩu"
            ref="pwd2"
            Id="pwd"
            :required="true"
            @update:modelValue="handleResetError"
          ></MInput>
          <b-button
            class="btn-show btn-eye position-absolute btn-outline"
            type="button"
            @click="handleShow(2)"
          >
            <div class="icon-hide" v-if="isHidePassword2"></div>
            <div class="icon-show" v-else></div>
          </b-button>
        </div>
        <b-button
          variant="primary"
          type="button"
          @click="confirmAcc"
          class="w-100 mt-5"
          >Xác nhận</b-button
        >
      </div>
    </b-col>
  </div>
</template>

<script>
import MInput from "@/components/MInput/MInput.vue";
import Logo from "@/components/partials/logo.vue";
import { getCurrentInstance, ref } from "vue";
import commonFuntion from "@/common/commonFuntion";
import { useRoute } from "vue-router";
import userApi from "@/api/System/userApi.js";
import statusCode from "@/common/enum/statusCode";

export default {
  name: "ConfirmEmailSuccess",
  components: {
    MInput,
    Logo,
  },
  data() {
    return {
      pwd: {},
    };
  },
  setup() {
    const isHidePassword1 = ref(true);
    const isHidePassword2 = ref(true);
    const { proxy } = getCurrentInstance();
    const isErrorControl = ref(false);
    const route = useRoute();

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

    function handleShow(index) {
      if (index == 1) {
        isHidePassword1.value = !isHidePassword1.value;
        const inputRef = proxy.$refs.pwd1?.$el?.querySelector("input");
        if (inputRef) {
          inputRef.type = isHidePassword1.value ? "password" : "text";
        }
      } else {
        isHidePassword2.value = !isHidePassword2.value;
        const inputRef = proxy.$refs.pwd2?.$el?.querySelector("input");
        if (inputRef) {
          inputRef.type = isHidePassword2.value ? "password" : "text";
        }
      }
    }

    async function confirmAcc() {
      proxy.validateForm();
      if (isErrorControl.value) {
        return;
      }

      if (proxy.pwd.password.trim() !== proxy.pwd.password_sec.trim()) {
        proxy.$toast.info("Mật khẩu không trùng khớp");
        return;
      }
      try {
        var data = {
          key: route.params.id,
          password: proxy.pwd.password,
        };

        const res = await userApi.verifyConfirm(data);
        if (res && res.Success) {
          proxy.$toast.success("Tạo tài khoản thành công");
          // da ve login
        } else if (!res.Success && res.ErrorCode === statusCode.LinkExpried) {
          proxy.$toast.success(
            "Link đã hết hạn, vui lòng liên hệ quản trị viên"
          );
        } else {
          proxy.$toast.error("Tạo tài khoản thất bại");
        }
      } catch (ex) {
        console.log(ex);
      }
    }

    return {
      isHidePassword1,
      isHidePassword2,
      handleShow,
      confirmAcc,
      validateForm,
      isErrorControl,
    };
  },
};
</script>

<style lang="scss" scoped>
.success-container {
  display: flex;
}
.img-container {
  max-width: 700px;
  min-height: 700px;
  .img {
    width: 100%;
    height: 100%;
  }
}
.form-container {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 160px;
  .notice {
    color: #6e7990;
    font-size: 25px;
  }
  .pwd {
    width: 500px;
  }
}

.btn-show {
  top: 3px;
  right: -12px;
}
.btn-outline {
  z-index: 2;
  background-color: transparent;
  border: 0;
  outline: none;
  cursor: pointer;
  &:focus {
    background-color: transparent;
  }
}
.logo {
  width: 100px;
  height: 100px;
}
</style>
