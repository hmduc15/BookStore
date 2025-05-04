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
            <h1 class="reset-pw text-primary text-center">Tạo mật khẩu mới</h1>
            <form method="post">
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
                class="w-100 mt-3"
                @click="resetPassword"
              >
                <span
                  class="btn-inner d-flex align-items-center justify-content-center gap-2"
                >
                  <span class="d-inline-block align-middle">Đổi mật khẩu</span>
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
import { getCurrentInstance, ref } from "vue";
import authApi from "@/api/Auth/authApi";
import { key } from "localforage";
import { useRoute } from "vue-router";

export default {
  name: "ResetPassword",
  components: {
    Logo,
    MInput,
  },
  data() {
    return {
      isErrorControl: false,
      pwd: {},
      key,
    };
  },
  setup() {
    const isHidePassword1 = ref(true);
    const isHidePassword2 = ref(true);
    const { proxy } = getCurrentInstance();
    const isErrorControl = ref(false);

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

    async function resetPassword() {
      proxy.validateForm();

      if (proxy.isErrorControl) {
        return;
      }

      if (proxy.pwd.password.trim() !== proxy.pwd.password_sec.trim()) {
        proxy.$toast.info("Mật khẩu không trùng khớp");
        return;
      }
      try {
        var obj = {
          key: proxy.key,
          password: proxy.pwd.password,
        };

        const res = await authApi.resetPassword(obj);
        if (res && res.Success) {
          proxy.$toast.success("Đổi mật khẩu thành công!");
          setTimeout(() => {
            proxy.$router.push("/auth/sign-in");
          }, 3000);
        } else {
          proxy.$toast.error("Đổi mật khẩu thất bại!");
        }
      } catch (ex) {
        console.log(ex);
      }
    }

    return {
      resetPassword,
      validateForm,
      isHidePassword1,
      isHidePassword2,
      isErrorControl,
      handleShow,
    };
  },

  created() {
    const route = useRoute();
    this.key = route.params.key;
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
