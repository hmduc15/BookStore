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
            <h1
              class="text-primary reset-pw fw-900 d-flex ms-3 mb-3 justify-content-center"
            >
              Đăng nhập
            </h1>
            <form method="post">
              <div class="custom-form-field mb-5">
                <MInput
                  ref="email"
                  Placeholder="Số điện thoại/email"
                  :required="true"
                  v-model="user.user_name"
                  @update:modelValue="handleResetError"
                ></MInput>
              </div>
              <div class="custom-form-field position-relative">
                <MInput
                  ref="pwd"
                  Type="password"
                  Placeholder="Mật khẩu"
                  v-model="user.password"
                  :required="true"
                  @update:modelValue="handleResetError"
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
              <div class="msg d-flex error mt-3 flex-row" v-if="isError">
                <div class="icon_warning"></div>
                {{ this.$t("i18nMessage.Login.FalseLogin") }}
              </div>
              <div class="d-flex align-items justify-content-end mb-5">
                <router-link to="/auth/recover-pw" class="forgot-pwd mt-5"
                  >Quên mật khẩu</router-link
                >
              </div>
              <b-button
                variant="primary"
                type="button"
                class="w-100"
                @click="handleLogin"
              >
                <span
                  class="btn-inner d-flex align-items-center justify-content-center gap-2"
                >
                  <span class="text d-inline-block align-middle width-full"
                    >Đăng nhập</span
                  >
                </span>
              </b-button>
            </form>
            <div class="auth-signup mt-5">
              <p class="d-flex justify-content-center mb-0">
                {{ this.$t("i18nMessage.Login.NotHaveAcc") }}
                <router-link to="/auth/sign-up" class="ms-2"
                  >Đăng ký</router-link
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
import indexedDb from "@/common/indexedDb.js";

export default {
  name: "SignIn",
  data() {
    return {
      user: {
        user_name: "",
        password: "",
      },
      error: false,
      config: { headers: { "Access-Control-Allow-Origin": "*" } },
      isErrorControl: false,
    };
  },
  component: { MInput },
  methods: {
    navigateToRegister() {
      this.$router.push("/register");
    },
    navigateToHome() {
      this.$router.replace("/home");
    },
  },

  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const module = moduleUser();
    const context = moduleContext();
    const isError = ref(false);
    const isHidePassword = ref(true);

    function handleShow() {
      isHidePassword.value = !isHidePassword.value;
      const inputRef = proxy.$refs.pwd?.$el?.querySelector("input");
      if (inputRef) {
        inputRef.type = isHidePassword.value ? "password" : "text";
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

    /**
     * Xu ly login
     */
    async function handleLogin() {
      proxy.validateForm();

      if (proxy.isErrorControl) {
        return;
      }

      try {
        const res = await module.login(proxy.user);
        if (res && res.Success) {
          // Luu lai context vao store
          context.setContext(res.Context);

          // Luu vao indexDb
          const indexDb = new indexedDb();
          await indexDb.set("session_context", res.Context);

          proxy.$toast.success(proxy.$t("i18nMessage.Login.LoginSucees"));

          if (context.getContext?.isAdmin) {
            proxy.$router.push("/admin/dashboard");
          } else {
            // push ve home
            const redirect = proxy.$route.query.redirect || "/";
            proxy.$router.push(redirect);
          }
        } else {
          proxy.$toast.error(proxy.$t("i18nMessage.Login.FalseLogin"));
        }
      } catch (e) {
        proxy.$toast.error(
          proxy.$t("i18nMessage.GlobalMessage.ErrorContactAd")
        );
      }
    }

    /**
     * Clear Msg Error
     */
    function handleResetError() {
      if (isError.value) {
        isError.value = false;
      }
    }

    return {
      proxy,
      handleLogin,
      validateForm,
      isError,
      handleResetError,
      handleShow,
      isHidePassword,
    };
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
