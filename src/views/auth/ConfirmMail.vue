<template>
  <MModal
    title="Xác thực OTP"
    class="register-confirm-popup"
    @beforeOpen="beforeOpen"
    :showConfirm="true"
    txtBtnConfirm="Xác thực"
    @confirmClick="handleAuthen"
    @beforeClose="beforeClose"
    ><template v-slot:content>
      <div class="text-notice mb-3 mt-1">{{ txtNotice }}</div>
      <div class="input-container">
        <MInput
          v-model="otpAuth"
          Placeholder="Mã xác thực"
          ref="otp"
          Id="otp"
          :required="true"
        ></MInput>
      </div>
      <div class="msg error flex-row" v-if="isError">
        <div class="icon_warning"></div>
        {{ this.$t("i18nMessage.Register.OtpError") }}
      </div>
    </template>
  </MModal>
</template>
<script>
import { getCurrentInstance, ref } from "vue";
import { moduleUser } from "@/store/pinia/store";
import basePopup from "@/components/base/basePopup.js";
import MModal from "@/components/MModal/MModal.vue";

export default {
  name: "ConfirmMail",
  components: {
    MModal,
  },
  extends: basePopup,
  setup(props) {
    const { proxy } = getCurrentInstance();
    const title = proxy.$t("i18nTitleModal.Title.AutthenEmail");
    const txtNotice = ref(proxy.$t("i18nTitleModal.TextNotice.SendEmailOtp"));
    const isError = ref(false);

    const otpAuth = ref("");

    const module = moduleUser();

    function beforeOpen(e) {
      proxy.super("beforeOpen", basePopup, e);
      if (proxy._formParam && !proxy._formParam.useEmail) {
        txtNotice.value = proxy.$t("i18nTitleModal.TextNotice.SendSmsOtp");
      }
    }

    /**
     * Handle Authen Otp
     */
    async function handleAuthen() {
      //validate
      let isInvalid = proxy.super("validateControl", basePopup);
      if (!isInvalid) {
        var model = {
          account: proxy._formParam.model,
          key: proxy._formParam.key,
          otp: otpAuth.value,
        };
        try {
          var res = await module.register(model);
          res.Success = true;
          if (res && res.Success) {
            if (
              proxy &&
              proxy._formParam &&
              proxy._formParam.options &&
              typeof proxy._formParam.options == "function"
            ) {
              proxy._formParam.options();
            }
          } else {
            isError.value = false;
          }
        } catch (e) {
          console.log("loi khong verify duoc otp");
        }
      }
    }

    return {
      title,
      beforeOpen,
      txtNotice,
      otpAuth,
      handleAuthen,
      isError,
    };
  },
};
</script>
<style lang="scss" scoped>
.modal-content {
  align-items: center;
}
</style>
