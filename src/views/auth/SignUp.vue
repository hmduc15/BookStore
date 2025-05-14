<template>
  <div class="login-content">
    <b-container>
      <b-row
        class="d-flex align-items-center justify-content-center vh-100 w-100 m-0"
      >
        <b-col lg="5" md="12" class="align-self-center bg-primary py-3">
          <b-card class="p-0 m-0" body-class="auth-card">
            <div class="logo-img">
              <router-link
                to="/"
                class="navbar-brand d-flex align-items-center justify-content-center mb-1"
              >
                <Logo className="auth-logo" :isFluid="false" />
              </router-link>
            </div>
            <h1
              class="text-primary reset-pw fw-900 d-flex ms-3 justify-content-center"
            >
              Đăng ký
            </h1>
            <form method="post">
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
              <div class="custom-form-field position-relative mt-3">
                <MInput
                  Type="password"
                  v-model="user.password"
                  Placeholder="Mật khẩu"
                  ref="pwd"
                  Id="pwd"
                  :required="true"
                  @update:modelValue="handleResetError"
                  rule="password"
                ></MInput>
                <b-button
                  class="btn-show btn-eye position-absolute btn-outline"
                  type="button"
                  @click="handleShow"
                >
                  <div class="icon-hide" v-if="isHidePassword"></div>
                  <div class="icon-show" v-else></div>
                </b-button>
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
                  >Đăng ký với Email</label
                >
              </div>
              <b-button
                variant="primary"
                type="button"
                class="w-100 mt-4"
                @click="handleRegister"
              >
                <span
                  class="btn-inner d-flex align-items-center justify-content-center gap-2"
                >
                  <span
                    class="text-center d-inline-block align-middle width-full"
                    >Đăng ký</span
                  >
                </span>
              </b-button>
            </form>
            <div
              class="d-flex align-items-center mt-5 justify-content-center auth-signup"
            >
              <p class="text-center mb-0">
                Bạn đã có tài khoản rồi?
                <router-link to="/auth/sign-in" class="ms-2"
                  >Đăng nhập</router-link
                >
              </p>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import MInput from "@/components/MInput/MInput.vue";
import Logo from "@/components/partials/logo.vue";
import { getCurrentInstance, ref } from "vue";
import { moduleContext, moduleUser } from "@/store/pinia/store.js";
import popupUtil from "@/common/popupUtil.js";
import commonFn from "@/common/commonFuntion";
import emailApi from "@/api/System/emailApi";

export default {
  name: "SignUp",
  data() {
    return {
      user: {},
      invalidity: {
        name: false,
        address: false,
        tel: false,
        email: false,
        pwd: false,
      },
    };
  },
  method: {
    handleSwitchMethod(value) {
      console.log(value.target.value);
      useEmail.value = value;
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();

    let txtSwitchEmail = ref(proxy.$t("i18nForm.Register.WithEmail"));
    const useEmail = ref(false);
    const isErrorControl = ref(false);
    const msg = ref("");
    const isError = ref(false);
    const isHidePassword = ref(true);

    const module = moduleUser();

    function handleShow() {
      isHidePassword.value = !isHidePassword.value;
      const inputRef = proxy.$refs.pwd?.$el?.querySelector("input");
      if (inputRef) {
        inputRef.type = isHidePassword.value ? "password" : "text";
      }
    }

    function handleSwitchMethod(value) {
      useEmail.value = value.target.checked;
    }

    /**
     * Xử lý Register
     */
    async function handleRegister() {
      // Validate Form
      proxy.validateForm();
      if (isErrorControl.value) {
        return;
      }

      if (isError.value) {
        isError.value = false;
      }

      proxy.user.useEmail = useEmail.value;
      try {
        commonFn.mask();
        // var res = {};
        // res.Success = true;
        var res = await module.checkExistAcc(proxy.user);
        // Neu chua ton tai
        if (res && res.Success) {
          // goi api gui OTP
          var resOtp = {};
          if (useEmail.value) {
            commonFn.mask();
            resOtp = await emailApi.sendEmailOtp(proxy.user);
          } else {
            signIn(proxy.user.phone_number);
          }
          // resOtp.Success = true;
          if (resOtp && resOtp.Success) {
            commonFn.unmask();
            popupUtil.show("ConfirmMail", {
              useEmail: useEmail.value,
              key: resOtp.keyRegister,
              model: proxy.user,
              options: () => {
                popupUtil.hideAll();
                proxy.$toast.success(proxy.$t("i18nMessage.Register.Success"));
                proxy.$router.push("/auth/sign-in");
              },
            });
          }
        } else if (!res.Success && res.hasOwnProperty("ErrorCode")) {
          commonFn.unmask();
          let errCode = res.ErrorCode;
          isError.value = true;
          switch (errCode) {
            case proxy._enum.statusCode.Duplicate:
              proxy.$toast.error(
                useEmail.value
                  ? proxy.$t("i18nMessage.Register.DuplicateUserEmail")
                  : proxy.$t("i18nMessage.Register.DuplicateUserPhone")
              );
              break;
          }
        }
      } catch (e) {
        console.log(e);
        commonFn.unmask();
      } finally {
        commonFn.unmask();
      }
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

    function handleResetError() {
      if (isError.value) {
        isError.value = false;
      }
    }

    return {
      proxy,
      txtSwitchEmail,
      handleSwitchMethod,
      useEmail,
      handleRegister,
      validateForm,
      isErrorControl,
      msg,
      isError,
      handleResetError,
      isHidePassword,
      handleShow,
    };
  },
  watch: {
    form: {
      handler(newVal) {
        Object.keys(this.form).forEach((prop) => {
          if (!this.form[prop].length) {
            this.invalidity[prop] = true;
          } else this.invalidity[prop] = false;
        });
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
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
</style>
