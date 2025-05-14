<template>
  <MModal
    :title="title"
    class="address-order"
    @beforeOpen="beforeOpen"
    :showConfirm="false"
    @beforeClose="beforeClose"
    width="900"
  >
    <template v-slot:content>
      <b-col class="d-flex">
        <div class="col-md-6 pt-5">
          <p class="fw-bold text-center">Mở app ngân hàng và quét mã QR</p>
          <img :src="linkQr" class="img-fluid" />
        </div>
        <div class="line"></div>
        <div class="col-md-6 pt-5">
          <p class="fw-bold text-center">Chuyển khoản theo thông tin</p>
          <div class="text-center">
            <img
              style="max-height: 50px"
              src="https://qr.sepay.vn/assets/img/banklogo/ACB.png"
            />
            <p class="fw-bold">Ngân hàng ACB</p>
            <table class="table">
              <tbody>
                <tr>
                  <td>Chủ tài khoản:</td>
                  <td><b>Hoàng Minh Đức</b></td>
                </tr>
                <tr>
                  <td>Số TK:</td>
                  <td><b>5098831</b></td>
                </tr>
                <tr>
                  <td>Số tiền:</td>
                  <td>
                    <b>{{ amount }}</b>
                  </td>
                </tr>
                <tr>
                  <td>Nội dung CK:</td>
                  <td>
                    <b>{{ orderCode }}</b>
                  </td>
                </tr>
              </tbody>
            </table>
            <p class="bg-light p-2">
              Lưu ý: Vui lòng giữ nguyên nội dung chuyển khoản
              {{ orderCode }} để hệ thống tự động xác nhận thanh toán
            </p>
          </div>
        </div>
      </b-col>
    </template>
  </MModal>
</template>

<script>
import { getCurrentInstance, ref, onUnmounted } from "vue";
import MModal from "./MModal.vue";
import basePopup from "../base/basePopup";
import orderSystemApi from "@/api/System/orderSystemApi";
import popupUtil from "@/common/popupUtil";

export default {
  name: "SepayQrPopup",
  components: {
    MModal,
  },
  extends: basePopup,
  setup() {
    const { proxy } = getCurrentInstance();
    const title = ref("Quét mã QR để tiến hành thanh toán");
    const linkQr = ref("");
    const amount = ref(0);
    const orderCode = ref("");
    const checkInterval = ref(null);
    const isChecking = ref(false);

    // Hủy interval khi component unmount
    onUnmounted(() => {
      stopPaymentCheck();
    });

    function generateQr() {
      amount.value = proxy._formParam.amount;
      orderCode.value = proxy._formParam.orderCode;

      var link =
        window._linkQrsepay + `=${amount.value}&des=${orderCode.value}`;
      linkQr.value = link;

      proxy.startPaymentCheck();
    }

    function beforeOpen(e) {
      proxy.super("beforeOpen", basePopup, e);
      if (proxy._formParam) {
        proxy.generateQr();
      }
    }

    function beforeClose(e) {
      proxy.super("beforeClose", basePopup, e);
      if (
        proxy &&
        proxy._formParam &&
        proxy._formParam.closePayment &&
        typeof proxy._formParam.closePayment == "function"
      ) {
        proxy._formParam.closePayment();
      }
    }

    async function checkOrderPaid() {
      try {
        const response = await orderSystemApi.checkOrderPaid(orderCode.value);
        return response;
      } catch (error) {
        console.error("Lỗi khi kiểm tra thanh toán:", error);
        return { isPaid: false };
      }
    }

    function startPaymentCheck() {
      if (isChecking.value) return;

      isChecking.value = true;
      const intervalTime = 1000; // 5 giây kiểm tra 1 lần

      checkInterval.value = setInterval(async () => {
        const result = await checkOrderPaid();
        if (result && result.isPaid) {
          stopPaymentCheck();
          popupUtil.hideAll();
          if (
            proxy &&
            proxy._formParam &&
            proxy._formParam.options &&
            typeof proxy._formParam.options == "function"
          ) {
            proxy._formParam.options();
          }
        }
      }, intervalTime);
    }

    function stopPaymentCheck() {
      if (checkInterval.value) {
        clearInterval(checkInterval.value);
        checkInterval.value = null;
        isChecking.value = false;
      }
    }

    return {
      title,
      generateQr,
      proxy,
      beforeOpen,
      linkQr,
      amount,
      orderCode,
      checkOrderPaid,
      startPaymentCheck,
      beforeClose,
    };
  },
};
</script>

<style>
.line {
  width: 0.5px;
  border: 1px solid;
  margin-top: 13%;
}
</style>
