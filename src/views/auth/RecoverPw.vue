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
                class="navbar-brand d-flex align-items-center justify-content-center mb-2"
              >
                <Logo className="auth-logo" :isFluid="false" />
              </router-link>
            </div>
            <h1 class="reset-pw text-primary">Quên mật khẩu</h1>
            <p class="mb-5 auth-desc">
              Nhập địa chỉ email của bạn và chúng tôi sẽ gửi cho bạn email có
              hướng dẫn đặt lại mật khẩu.
            </p>
            <form method="post">
              <div class="custom-form-field">
                <MInput
                  ref="email"
                  type="email"
                  name="email"
                  class="form-control mb-3 mb-md-5"
                  Placeholder="Email"
                  :required="true"
                  rule="email"
                  v-model="email"
                />
              </div>
              <b-button
                variant="primary"
                type="button"
                class="w-100 mt-3"
                @click="sendEmailRecover"
              >
                <span
                  class="btn-inner d-flex align-items-center justify-content-center gap-2"
                >
                  <span class="d-inline-block align-middle">Gửi yêu cầu</span
                  >{{ "" }}
                  <i class="ph ph-plus custom-ph-icons"></i>
                </span>
              </b-button>
            </form>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Logo from "@/components/partials/logo.vue";
import MInput from "@/components/MInput/MInput.vue";
import { getCurrentInstance } from "vue";
import authApi from "@/api/Auth/authApi";
import commonFuntion from "@/common/commonFuntion";

export default {
  name: "RecoverPw",
  components: {
    Logo,
    MInput,
  },
  data() {
    return {
      email: "",
      isErrorControl: false,
    };
  },
  setup() {
    const { proxy } = getCurrentInstance();

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

    async function sendEmailRecover() {
      proxy.validateForm();

      if (proxy.isErrorControl) {
        return;
      }
      commonFuntion.mask();
      try {
        const res = await authApi.sendResetPassword(proxy.email);
        if (res && res.hasOwnProperty("isNotExist") && res.isNotExist) {
          proxy.$toast.info("Không tồn tại tài khoản với email này!");
        } else if (res && res.isSend) {
          proxy.$toast.success(
            "Gửi yêu cầu thành công, vui lòng kiểm tra email!"
          );
        } else {
          proxy.$toast.error("Gửi yêu cầu thất bại!");
        }
      } catch (Ex) {
        console.log(Ex);
      } finally {
        commonFuntion.unmask();
      }
    }
    return {
      sendEmailRecover,
      validateForm,
    };
  },
};
</script>
