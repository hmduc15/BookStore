<template>
  <b-row>
    <b-col sm="12">
      <b-card>
        <b-row>
          <b-col lg="6">
            <div
              class="back-router d-flex align-items-center pointer"
              @click="() => this.$router.go(-1)"
            >
              <i class="ph ph-caret-left"></i> Quay lại
            </div>
            <div class="login-content custom-image-size">
              <!-- Assuming a component for logo exists -->
              <Logo :color="true" :isFluid="false" />
            </div>
          </b-col>
          <b-col lg="6" class="align-self-center">
            <h4 class="mb-0 text-end" v-if="orderMaster.order_code">
              Mã đơn hàng: <span>{{ orderMaster.order_code }}</span>
            </h4>
          </b-col>
          <b-col sm="12"> </b-col>
        </b-row>
        <b-row>
          <b-col lg="12">
            <div class="table-responsive border-top mb-0">
              <table class="table mb-5">
                <thead>
                  <tr>
                    <th>Thời gian</th>
                    <th>Trạng thái</th>
                    <th>Thông tin người nhận</th>
                    <th>Địa chỉ giao hàng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ mFormat.formatDate(orderMaster.created_date) }}</td>
                    <td>
                      <template v-if="orderMaster.status == 5">
                        <span class="badge-status wait-paid">{{
                          mFormat.formatEnum(orderMaster.status, "orderStatus")
                        }}</span>
                      </template>
                      <template v-else-if="orderMaster.status == 4">
                        <span class="badge-status done">{{
                          mFormat.formatEnum(orderMaster.status, "orderStatus")
                        }}</span>
                      </template>
                      <template v-else-if="orderMaster.status == 0">
                        <span class="badge-status in-progress">{{
                          mFormat.formatEnum(orderMaster.status, "orderStatus")
                        }}</span>
                      </template>
                      <template v-else-if="orderMaster.status == 3">
                        <span class="badge-status paid">{{
                          mFormat.formatEnum(orderMaster.status, "orderStatus")
                        }}</span>
                      </template>
                      <template v-else-if="orderMaster.status == 1">
                        <span class="badge-status cancel">{{
                          mFormat.formatEnum(orderMaster.status, "orderStatus")
                        }}</span>
                      </template>
                      <template v-else-if="orderMaster.status == 2">
                        <span class="badge-status approved">{{
                          mFormat.formatEnum(orderMaster.status, "orderStatus")
                        }}</span>
                      </template>
                    </td>
                    <td>
                      <p class="order-info">
                        {{ orderMaster.receive_name }}<br />
                        SĐT: {{ orderMaster.phone_number }}
                      </p>
                    </td>
                    <td>
                      <p class="order-address">
                        {{ orderMaster.receive_address }}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12" class="mt-3">
            <h5>Sản phẩm ({{ orderDetail.length }})</h5>
            <div class="table-responsive border-top">
              <table class="table table-striped mb-3">
                <thead>
                  <tr>
                    <th class="text-center">No</th>
                    <th>Sách</th>
                    <th class="text-center">Số lượng</th>
                    <th class="text-center">Giá</th>
                    <th class="text-center">Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in orderDetail" :key="index">
                    <th class="text-center">{{ index + 1 }}</th>
                    <td>
                      <div class="d-flex align-items-center gap-5">
                        <span class="checkout-product-img">
                          <router-link to="#">
                            <img
                              :src="generateImgPath(item.image_url)"
                              alt="checkout-1"
                              class="img-fluid rounded-2"
                            />
                          </router-link>
                        </span>
                        <h6 class="mb-0">{{ item.name }}</h6>
                      </div>
                      <!-- <p class="mb-0">{{ item.description }}</p> -->
                    </td>
                    <td class="text-center">{{ item.quantity }}</td>
                    <td class="text-center">
                      {{ mFormat.formatAmount(item.price) }}
                    </td>
                    <td class="text-center">
                      <b>{{
                        mFormat.formatAmount(item.price * item.quantity)
                      }}</b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </b-col>
          <b-col sm="12" class="total d-flex justify-content-end">
            <b class="text-total">
              Tổng tiền: {{ mFormat.formatAmount(totalAmount) }}</b
            >
          </b-col>
          <b-col
            sm="12"
            class="mt-4 pt-2 border-top"
            v-if="orderMaster.status !== 3"
          >
            <b class="text-danger">{{ txtPayment }}</b>
            <div class="d-flex flex-column gap-4 mt-2">
              <div class="d-flex gap-3">
                <input
                  type="radio"
                  class="form-check-input"
                  name="paymentMethod"
                  id="cash"
                  v-model="paymentMethod"
                  :value="0"
                />
                <label for="cash" class="form-check-label pl-2 text-method"
                  ><i class="ph ph-money"></i> Thanh toán khi nhận hàng</label
                >
              </div>

              <div class="d-flex gap-3">
                <input
                  type="radio"
                  class="form-check-input"
                  name="paymentMethod"
                  id="bankTransfer"
                  v-model="paymentMethod"
                  :value="1"
                />
                <label
                  for="bankTransfer"
                  class="form-check-label pl-2 text-method"
                  ><i class="ph ph-bank"></i> Internet banking</label
                >
              </div>
            </div>
          </b-col>
          <div
            class="d-flex gap-2 justify-content-end mt-3"
            v-if="!orderMaster.status || orderMaster.status == 0"
          >
            <b-button
              v-if="orderMaster.status != null && orderMaster.status == 0"
              variant="secondary"
              type="button"
              class="btn btn-primary"
              @click="() => this.$router.go(-1)"
            >
              Hủy
            </b-button>
            <b-button
              v-if="orderMaster.status == null"
              variant="primary"
              type="button"
              class="btn btn-primary"
              @click="handleSubmit"
            >
              Đặt hàng
            </b-button>
          </div>
          <div
            class="d-flex gap-2 justify-content-end mt-3"
            v-if="orderMaster.status == 5"
          >
            <b-button
              variant="primary"
              type="button"
              class="btn btn-primary"
              @click="handlePayment"
            >
              Thanh toán
            </b-button>
          </div>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from "vue";
import Logo from "../../components/partials/logo.vue"; // Adjust path as needed
import { useRoute } from "vue-router";
import { mFormat } from "@/common/mFomat";
import orderApi from "@/api/Business/orderApi";
import IndexedDB from "@/common/indexedDb";
import Swal from "sweetalert2";
import popupUtil from "@/common/popupUtil";
import orderStatus from "@/common/contanst/orderStatus";
import commonFuntion from "@/common/commonFuntion";
import emailApi from "@/api/System/emailApi";
import { moduleContext } from "@/store/pinia/store";

export default {
  name: "InvoiceDetailPage",
  components: {
    Logo,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const customerName = ref("Barry Techs");
    const greetingText = ref(
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
    );

    const items = ref([]);
    const orderSummary = ref(null);
    const notes = ref(
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
    );

    const orderMaster = ref({});
    const orderDetail = ref([]);
    const totalAmount = ref(0);
    const paymentMethod = ref(0);
    const txtPayment = ref("Chọn hình thức thanh toán:");
    const context = moduleContext().getContext;

    const generateImgPath = (path) => {
      return window._linkCdnImage + path;
    };

    onMounted(async () => {
      items.value = [
        {
          name: "Web Design",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          quantity: 5,
          price: "$120.00",
          total: "$2,880.00",
        },
        {
          name: "Web Design",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          quantity: 5,
          price: "$120.00",
          total: "$2,880.00",
        },
        {
          name: "Web Design",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          quantity: 5,
          price: "$120.00",
          total: "$2,880.00",
        },
        {
          name: "Web Design",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          quantity: 5,
          price: "$120.00",
          total: "$2,880.00",
        },
        {
          name: "Web Design",
          description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          quantity: 5,
          price: "$120.00",
          total: "$2,880.00",
        },
      ];

      orderSummary.value = {
        bank: "Threadneedle St",
        accountNumber: "12333456789",
        dueDate: "12 November 2019",
        subTotal: "$4597.50",
        discount: "10%",
        total: "$4137.75 USD",
      };
    });

    const handleDownloadPrint = () => {
      // Implement the download print logic here
      console.log("Download Print clicked");
    };

    async function loadData(id) {
      const indexed = new IndexedDB();
      const res = await indexed.get(id);
      if (res) {
        const orderCode = await orderApi.getOrderCode();
        res.order.order_code = orderCode;
        orderMaster.value = res.order;
        orderDetail.value = res.orderDetail;
        orderDetail.value.forEach((x) => {
          totalAmount.value += (x.quantity || 0) * (x.price || 0);
        });
        paymentMethod.value = orderMaster.value.payment_method || 0;
      } else {
        try {
          const res = await orderApi.getOrderDetail(id);
          if (res.isSucess) {
            orderMaster.value = res.order.order;
            orderDetail.value = res.order.orderDetail;
            orderDetail.value.forEach((x) => {
              totalAmount.value += (x.quantity || 0) * (x.price || 0);
            });
            paymentMethod.value = orderMaster.value.payment_method || 0;
          }
        } catch (ex) {
          console.log(ex);
          proxy.$toast.error(
            proxy.$t("i18nMessage.GlobalMessage.ErrorContactAd")
          );
        }
      }
      if (orderMaster.value.status == orderStatus.Paid) {
        txtPayment.value = "Hình thức thanh toán: ";
      }
    }

    /**
     * Xu ly dat hang
     */
    async function handleSubmit() {
      // = O thnah toan khi nhan hang save luon,
      // != 0 goi thanh toan da
      switch (paymentMethod.value) {
        case 0: // Thanh toan khi nhan hang
          orderMaster.value.status = orderStatus.Created; // Dang xu ly
          orderMaster.value.payment_method = paymentMethod.value;
          var data = {
            order: orderMaster.value,
            orderDetail: orderDetail.value,
          };
          await proxy.saveOrder(data);
          break;
        case 1: // Qr code SePay
          orderMaster.value.payment_method = paymentMethod.value;
          orderMaster.value.status = orderStatus.UnPaid; // Chua thanh toan
          var data = {
            order: orderMaster.value,
            orderDetail: orderDetail.value,
          };
          const res = await orderApi.addOrder(data);
          if (res.Success) {
            const indexed = new IndexedDB();
            indexed.delete(data.order.order_id);
            popupUtil.show("SepayQrPopup", {
              amount: 2000, //totalAmount.value
              orderCode: orderMaster.value.order_code,
              options: async () => {
                var item = orderMaster.value;
                item.status = orderStatus.Paid;
                const res = await orderApi.updateOrderStatus(item);
                if (res && res.isSuccess) {
                  Swal.fire({
                    title: "Tạo đơn hàng thành công",
                    text: "Bạn sẽ nhận được email xác nhận đơn hàng từ chúng tôi.",
                    icon: "success",
                    background: "#f9f9f9",
                    color: "secondary",
                    timer: 2000, // Tự động tắt sau 2 giây
                    timerProgressBar: true, // Hiển thị thanh tiến trình đếm ngược
                    showConfirmButton: false, // Ẩn nút xác nhận
                  }).then(async (res) => {
                    window.location.reload();
                    window.scrollTo(0, 0);
                    var param = {
                      email: context.email,
                      key: data.order.order_id,
                    };
                    await emailApi.sendEmailOrder(param);
                  });
                }
              },
              closePayment: () => {
                console.log("a");
              },
            });
          }
          break;
      }
    }

    async function handlePayment() {
      commonFuntion.mask();
      switch (paymentMethod.value) {
        case 0: // Thanh toan khi nhan hang
          var item = orderMaster.value;
          item.status = orderStatus.Paid;
          const resTM = await orderApi.updateOrderStatus(item);
          if (resTM && resTM.isSuccess) {
            commonFuntion.unmask();
            window.location.reload();
            window.scrollTo(0, 0);

            var param = {
              email: context.email,
              key: data.order.order_id,
            };
            await emailApi.sendEmailOrder(param);
          }
          break;
        case 1: // Qr code SePay
          const indexed = new IndexedDB();
          var data = {
            order: orderMaster.value,
            orderDetail: orderDetail.value,
          };
          indexed.delete(data.order.order_id);
          commonFuntion.unmask();

          popupUtil.show("SepayQrPopup", {
            amount: 2000, //totalAmount.value
            orderCode: orderMaster.value.order_code,
            options: async () => {
              var item = orderMaster.value;
              Swal.fire({
                title: "Tạo đơn hàng thành công",
                text: "Bạn sẽ nhận được email xác nhận đơn hàng từ chúng tôi.",
                icon: "success",
                background: "#f9f9f9",
                color: "secondary",
                timer: 2000, // Tự động tắt sau 2 giây
                timerProgressBar: true, // Hiển thị thanh tiến trình đếm ngược
                showConfirmButton: false, // Ẩn nút xác nhận
              }).then(async (res) => {
                window.location.reload();
                window.scrollTo(0, 0);
                var param = {
                  email: context.email,
                  key: data.order.order_id,
                };
                await emailApi.sendEmailOrder(param);
              });

              item.status = orderStatus.Paid;
              await orderApi.updateOrderStatus(item);
            },
          });
          break;
      }
    }

    /**
     * Goi api save
     */
    async function saveOrder(data) {
      try {
        const res = await orderApi.addOrder(data);
        if (res.Success) {
          const indexed = new IndexedDB();
          indexed.delete(data.order.order_id);
          Swal.fire({
            title: "Tạo đơn hàng thành công",
            text: "Bạn sẽ nhận được email xác nhận đơn hàng từ chúng tôi.",
            icon: "success",
            background: "#f9f9f9",
            color: "secondary",
            timer: 2000, // Tự động tắt sau 2 giây
            timerProgressBar: true, // Hiển thị thanh tiến trình đếm ngược
            showConfirmButton: false, // Ẩn nút xác nhận
          }).then(async (res) => {
            window.location.reload();
            window.scrollTo(0, 0);
            var param = {
              email: context.email,
              key: data.order.order_id,
            };
            await emailApi.sendEmailOrder(param);
          });
        }
      } catch (ex) {
        console.log(ex);
      }
    }

    return {
      customerName,
      greetingText,
      items,
      orderSummary,
      notes,
      handleDownloadPrint,
      handleSubmit,
      loadData,
      orderMaster,
      orderDetail,
      mFormat,
      generateImgPath,
      totalAmount,
      paymentMethod,
      saveOrder,
      txtPayment,
      handlePayment,
    };
  },
  created() {
    const route = useRoute();
    orderApi.updateOrderStatusJob().then((res) => {
      this.loadData(route.params.id);
    });
  },
};
</script>

<style lang="scss" scoped>
.order-address {
  max-width: 200px;
  white-space: break-spaces;
}

.text-total {
  color: #000;
  padding-right: 74px;
}

.text-method {
  display: flex;
  gap: 0 2px;
  align-items: center;
  color: #000;
  font-weight: 700;
}

.paid-status {
  background-color: var(--p-highlight-background);
  color: var(--p-primary-color);
}

.back-router {
  cursor: pointer;

  &:hover {
    color: var(--bs-primary);
  }
}

.badge-status {
  width: fit-content;
  border-radius: 20px;
  border: 1px solid;
  padding: 6px 20px 6px 20px;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.wait-paid {
  background: rgba(246, 165, 0, 0.2);
  color: #f6a500;
  border-color: transparent;
}

.done {
  border-color: transparent;

  background-color: #d5f1d7;
  color: #41d241;
}

.in-progress {
  background: rgba(36, 137, 244, 0.2);
  color: #2489f4;
  border-color: transparent;
}

.paid {
  background-color: #d1ecf1;
  /* Xanh dương nhạt */
  color: #0c5460;
  border-color: transparent;
}

.cancel {
  background-color: #f8d7da;
  /* Nền đỏ nhạt */
  color: #721c24;
  border-color: transparent;
}

.approved {
  background-color: #fff3cd;
  /* Vàng nhạt */
  color: #856404;
  border-color: transparent;
}
</style>
