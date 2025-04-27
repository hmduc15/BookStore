<template>
  <b-row>
    <b-col lg="8">
      <b-card class="p-0" no-body>
        <b-card-header class="mb-0 d-flex justify-content-between bg-primary">
          <div class="header-title">
            <b-card-title class="text-white">Giỏ hàng</b-card-title>
          </div>
        </b-card-header>
        <b-card-body class="py-0">
          <ul class="list-inline p-0 m-0 list-inline-res">
            <CheckoutProduct
              v-for="(item, index) in carts"
              :key="index"
              :item="item"
              @updateAmount="handleUpdateAmount"
              @deleteItem="handleDeleteItem"
            />
          </ul>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col lg="4">
      <b-card no-body>
        <b-card-body>
          <div
            class="d-flex justify-content-between flex-column border-bottom pb-3"
          >
            <span>Khuyến mãi</span>
            <div
              class="d-flex flex-row justify-content-between align-items-center"
            >
              <b-col sm="9" class="mt-1 mb-1">
                <b-form-input
                  style="height: 40px"
                  v-model="coupons"
                  placeholder="Nhập mã khuyến mãi"
                ></b-form-input>
              </b-col>
              <span
                ><a href="#"><strong>Áp dụng</strong></a></span
              >
            </div>
          </div>
          <p class="pt-3"><b></b></p>
          <div class="d-flex justify-content-between mb-1">
            <span>Thành tiền</span>
            <span>{{ mFormat.formatAmount(totalAmount) }}đ</span>
          </div>
          <div class="d-flex justify-content-between mb-1">
            <span>Khuyến mãi</span>
            <span class="text-primary">0</span>
          </div>
          <!-- <div class="d-flex justify-content-between mb-1">
            <span>Estimated Tax</span>
            <span>$15</span>
          </div>
          <div class="d-flex justify-content-between mb-1">
            <span>EMI Eligibility</span>
            <span><a href="#">Details</a></span>
          </div>
          <div class="d-flex justify-content-between border-bottom pb-3">
            <span>Delivery Charges</span>
            <span class="text-primary">Free</span>
          </div> -->
          <div class="d-flex justify-content-between pt-3">
            <span class="text-dark"><strong>Tổng tiền thanh toán</strong></span>
            <span class="text-dark"
              ><strong>{{ mFormat.formatAmount(totalAmount) }}đ</strong></span
            >
          </div>
          <b-button
            variant="primary"
            type="button"
            id="place-order"
            class="btn btn-primary d-block mt-3 w-100"
            @click="handlePayment"
            >Nhập thông tin nhận hàng</b-button
          >
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import CheckoutProduct from "@/components/widgets/CheckoutProduct.vue";
import cartApi from "@/api/Business/cartApi";
import { mFormat } from "@/common/mFomat";
import popupUtil from "@/common/popupUtil";
import orderApi from "@/api/Business/orderApi.js";
import { computed, getCurrentInstance, onMounted, onUnmounted, ref } from "vue";
import IndexedDB from "@/common/indexedDb";
import commonFuntion from "@/common/commonFuntion";
import orderStatus from "@/common/contanst/orderStatus";
import emitter from "@/common/emitter";

export default {
  name: "CheckoutPage",
  components: {
    CheckoutProduct,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const carts = ref([]);
    const totalAmount = ref(0);

    async function getCarts() {
      try {
        let total = 0;
        const res = await cartApi.getAllCart();
        if (res) {
          res.forEach((item) => {
            item.amount = item.price * item.quantity;
          });
          carts.value = res;
          console.log(carts.value);
          carts.value.forEach((x) => {
            total += x.amount;
          });
          totalAmount.value = total;
        }
      } catch (e) {
        proxy.$toast.error(
          proxy.$t("i18nMessage.GlobalMessage.ErrorContactAd")
        );
      }
    }

    function handleUpdateAmount() {
      let total = 0;
      carts.value.forEach((x) => {
        total += x.amount;
      });
      totalAmount.value = total;
    }

    async function handleDeleteItem(item) {
      carts.value = carts.value.filter((x) => x.book_id !== item.book_id);
      try {
        const res = await cartApi.deleteCart(item);
      } catch (ex) {
        console.log(ex);
      } finally {
        emitter.$emit("deleteCheckout", item);
        proxy.handleUpdateAmount();
      }
    }
    function handlePayment() {
      popupUtil.show("AddressOrder", {
        options: (payload) => {
          var data = {
            order: payload,
            orderDetail: carts.value,
          };
          console.log(data);
          let guid = commonFuntion.generateUUID();
          data.order.created_date = new Date();
          // data.order.status = orderStatus.Created;
          data.order.total_price = totalAmount.value;
          // data.order.order_code = `DH${commonFuntion.generateUniqueOrderCode()}`;
          data.order.order_id = guid;

          // Save indexDb truươớc
          const indexed = new IndexedDB();
          indexed.set(guid, data);

          proxy.$router.push(`/shop/invoice/detail/${guid}`);

          // proxy.saveOrder(data).then((res) => {
          //   if (res && res.Success) {
          //     proxy.$router.push("/shop/invoice");
          //   } else {
          //     proxy.$toast.error("Tạo đơn hàng không thành công");
          //   }
          // });
        },
      });
    }

    async function saveOrder(data) {
      try {
        const res = await orderApi.addOrder(data);
        return res;
      } catch (ex) {
        console.log(ex);
      }
    }

    return {
      carts,
      getCarts,
      handleUpdateAmount,
      handleDeleteItem,
      totalAmount,
      mFormat,
      handlePayment,
      saveOrder,
    };
  },
  created() {
    this.getCarts();
  },
};
</script>
