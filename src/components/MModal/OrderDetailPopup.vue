<template>
  <MModal
    :title="title"
    class="address-order"
    @beforeOpen="beforeOpen"
    :showConfirm="true"
    txtBtnConfirm="Cập nhật"
    @confirmClick="handleEditUser"
    @beforeClose="beforeClose"
    :isCenter="false"
  >
    <template v-slot:content>
      <div class="order-detail">
        <b-row>
          <b-col sm="12">
            <div>
              <b-row>
                <b-col class="align-self-center text-start mt-1 mb-1">
                  <h4
                    class="mb-2 order-code fw-bold"
                    v-if="orderMaster.order_code"
                  >
                    Mã đơn hàng: <span>{{ orderMaster.order_code }}</span>
                  </h4>
                  <div></div>
                </b-col>
              </b-row>
              <b-row class="">
                <b-col lg="12">
                  <div class="border-top mb-0">
                    <div class="order-container">
                      <!-- Dòng tiêu đề -->
                      <div class="order-header">
                        <div class="header-cell">Ngày tạo</div>
                        <div class="header-cell">Trạng thái</div>
                        <div class="header-cell">Thông tin người nhận</div>
                        <div class="header-cell">Số điện thoại</div>
                        <div class="header-cell">Địa chỉ giao hàng</div>
                      </div>

                      <!-- Dòng dữ liệu -->
                      <div class="order-row">
                        <!-- Cột Ngày tạo -->
                        <div class="data-cell">
                          <Datepicker
                            v-model="createdDate"
                            wrapper-class="created-date"
                            input-class="publisher-year-input"
                            calendar-class="publisher-year-calendar"
                            format="dd/MM/yyyy"
                            :value-type="'format'"
                            :enable-time-picker="false"
                            :popup-class="'custom-popup'"
                            @changedYear="handleChangedYear"
                            :disabled="isDisable"
                          >
                          </Datepicker>
                        </div>

                        <!-- Cột Trạng thái -->
                        <div class="data-cell d-flex status-col">
                          <template v-if="orderMaster.status == 5">
                            <span class="badge-status wait-paid">{{
                              mFormat.formatEnum(
                                orderMaster.status,
                                "orderStatus"
                              )
                            }}</span>
                          </template>
                          <template v-else-if="orderMaster.status == 4">
                            <span class="badge-status done">{{
                              mFormat.formatEnum(
                                orderMaster.status,
                                "orderStatus"
                              )
                            }}</span>
                          </template>
                          <template v-else-if="orderMaster.status == 0">
                            <span class="badge-status in-progress">{{
                              mFormat.formatEnum(
                                orderMaster.status,
                                "orderStatus"
                              )
                            }}</span>
                          </template>
                          <template v-else-if="orderMaster.status == 3">
                            <span class="badge-status paid">{{
                              mFormat.formatEnum(
                                orderMaster.status,
                                "orderStatus"
                              )
                            }}</span>
                          </template>
                          <template v-else-if="orderMaster.status == 1">
                            <span class="badge-status cancel">{{
                              mFormat.formatEnum(
                                orderMaster.status,
                                "orderStatus"
                              )
                            }}</span>
                          </template>
                          <template v-else-if="orderMaster.status == 2">
                            <span class="badge-status approved">{{
                              mFormat.formatEnum(
                                orderMaster.status,
                                "orderStatus"
                              )
                            }}</span>
                          </template>
                          <b-button
                            @click="showPopupStatus"
                            variant="outline-primary"
                            v-tooltip="'Cập nhật trạng thái'"
                            class="d-flex"
                            type="button"
                            ><i class="ph ph-arrows-clockwise"></i
                          ></b-button>
                        </div>

                        <!-- Cột Thông tin người nhận -->
                        <div class="data-cell">
                          <b-form-textarea
                            class="order-info"
                            v-model="orderMaster.receive_name"
                            required
                            :disabled="isDisable"
                          ></b-form-textarea>
                        </div>
                        <div class="data-cell">
                          <b-form-textarea
                            class="order-info"
                            v-model="orderMaster.phone_number"
                            required
                            :disabled="isDisable"
                          ></b-form-textarea>
                        </div>

                        <!-- Cột Địa chỉ giao hàng -->
                        <div class="data-cell">
                          <b-form-textarea
                            class="order-info"
                            v-model="orderMaster.receive_address"
                            required
                            :disabled="isDisable"
                          ></b-form-textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-col>
        </b-row>
        <b-row class="detail mt-5">
          <h5>Chi tiết đơn hàng</h5>
          <div class="scroller">
            <b-col sm="12">
              <table class="table table-order table-striped mb-3">
                <thead>
                  <tr class="ms-tr">
                    <th class="ms-th text-center">No</th>
                    <th class="ms-th">Sách</th>
                    <th class="ms-th text-center">Giá</th>
                    <th class="ms-th text-center">Số lượng</th>
                    <th class="ms-th text-center">Thành tiền</th>
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
            </b-col>
            <b-col sm="12" class="total d-flex justify-content-end">
              <b class="text-total">
                Tổng tiền: {{ mFormat.formatAmount(totalAmount) }}</b
              >
            </b-col>
          </div>
        </b-row>
      </div>
    </template>
    <template v-slot:footer>
      <b-button
        variant="secondary"
        type="button"
        @click="closeModal"
        :close="close"
      >
        Đóng
      </b-button>
      <b-button variant="primary" type="button" class="" @click="updateOrder"
        >Cập nhật</b-button
      >
    </template>
  </MModal>
</template>

<script>
import MModal from "./MModal.vue";
import MInput from "../MInput/MInput.vue";
import basePopup from "../base/basePopup";
import { getCurrentInstance, onMounted, ref, watch, onBeforeMount } from "vue";
import { mFormat } from "@/common/mFomat";
import orderSystemApi from "@/api/System/orderSystemApi.js";
import useDataTable from "@/hooks/useDatatable";
import Datepicker from "vuejs3-datepicker";
import popupUtil from "@/common/popupUtil";

export default {
  name: "EditUserPopUp",
  extends: basePopup,
  components: {
    MModal,
    MInput,
    Datepicker,
  },
  data() {},
  computed: {
    createdDate: {
      get() {
        return this.orderMaster.created_date;
      },
      set(value) {
        // Chuyển đổi chuỗi năm thành number nếu cần
        this.orderMaster.created_date = new Date(value);
      },
    },
    orderInfo: {
      get() {
        return `${this.orderMaster.receive_name},SĐT: ${this.orderMaster.phone_number}`;
      },
    },
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const orderMaster = ref({});
    const orderDetail = ref([]);
    const title = ref("Thông tin chi tiết đơn hàng");
    const totalAmount = ref(0);
    const mode = ref("");
    const isDisable = ref(false);

    const tableData = ref([
      {
        account_id: "f9735b81-61c3-4367-a3d4-466d202bff5e",
        order_code: "DH21560688",
        receive_name: "Duc",
        phone_number: null,
        receive_address:
          "41 ngox 134, Phường Vĩnh Phúc, Quận Ba Đình, Thành phố Hà Nội",
        ship_method: null,
        payment_method: null,
        total_price: 377000,
        status: 0,
        created_by: null,
        created_date: "2025-05-01T00:00:00",
        modified_by: null,
        modified_date: null,
        order_sys_id: "1b49034d-04f0-48fb-b2f2-31648341ba47",
      },
    ]);

    const columns = ref([
      {
        data: null,
        orderable: false,
        searchable: false,
        title: "Action",
        render: function () {
          return `
            <div class="d-flex gap-1 align-items-center list-user-action">
                                        <a class="bg-success-subtle btn-edit-book  rounded" data-toggle="tooltip"
                                            data-placement="top" title="Edit" href="">
                                            <i class="ph ph-pencil-simple text-success custom-ph-icons"></i>
                                        </a>
                                        <a class="bg-danger-subtle delete-btn rounded" data-toggle="tooltip"
                                            data-placement="top" title="Delete" href="#" data-table="action">
                                            <i class="ph ph-trash text-danger custom-ph-icons"></i>
                                        </a>
                                    </div>
        `;
        },
      },
      {
        data: "no",
        title: "No",
      },
      { data: "order_code", title: "Mã đơn hàng" },
      {
        data: "status",
        title: "Trạng thái đơn hàng",
        render: function (row) {
          var text = "";
          switch (row) {
            case 5:
              text = `<span onClick class="wait-paid status">${mFormat.formatEnum(
                row,
                "orderStatus"
              )}</span>`;
              break;
            case 4:
              text = `<span class="done status">${mFormat.formatEnum(
                row,
                "orderStatus"
              )}</span>`;
              break;
            case 0:
              text = `<span class="in-progress  status">${mFormat.formatEnum(
                row,
                "orderStatus"
              )}</span>`;
              break;
            case 3:
              text = `<span class="paid  status">${mFormat.formatEnum(
                row,
                "orderStatus"
              )}</span>`;
              break;
            case 1:
              text = `<span class="cancel  status">${mFormat.formatEnum(
                row,
                "orderStatus"
              )}</span>`;
              break;
            case 2:
              text = `<span class="approved  status">${mFormat.formatEnum(
                row,
                "orderStatus"
              )}</span>`;
              break;
            default:
              text = mFormat.formatEnum(row, "orderStatus");
              break;
          }
          return text;
        },
      },
      { data: "receive_address", title: "Địa chỉ giao hàng" },
      {
        data: "payment_method",
        title: "Phương thức thanh toán",
        width: "20px",
        render: function (row) {
          return mFormat.formatEnum(row, "paymentMethod");
        },
      },
      {
        data: "total_price",
        title: "Tổng tiền",
        className: "dt-right",
        width: "200px",
        render: function (row) {
          return `${mFormat.formatAmount(row)}đ`;
        },
      },
      {
        data: "created_date",
        title: "Ngày tạo đơn hàng",
        className: "dt-right",
        render: function (data, type, row) {
          // Chỉ format khi hiển thị (type === 'display')
          if (type === "display") {
            return mFormat.formatDate(data);
          }
          // Trả về dữ liệu gốc cho sorting/filter
          return data;
        },
      },
    ]);

    const tableRef = ref(null);
    const { refreshTable } = useDataTable({
      tableRef: tableRef,
      columns: columns.value,
      data: tableData.value,
      actionCallback: (data) => {
        deleteSwal(data);
      },
      getData: async () => {
        return [];
      },
      onEditUser: (row) => {
        proxy.handleEditOrder(row);
      },
    });

    async function bindData(data) {
      mode.value = data.mode;
      if (mode.value == "view") {
        isDisable.value = true;
      }
      proxy.super("bindData", basePopup, {});
      await getMasterDetail(data.order.order_sys_id);
    }

    async function getMasterDetail(id) {
      const res = await orderSystemApi.getMasterDetail(id);
      if (res && res.isSucess) {
        orderMaster.value = res.order.order;
        orderDetail.value = [...res.order.orderDetail];
        orderDetail.value.forEach((x) => {
          totalAmount.value += (x.quantity || 0) * (x.price || 0);
        });
      }
    }

    function getDetail() {
      return orderDetail.value;
    }

    const generateImgPath = (path) => {
      return window._linkCdnImage + path;
    };

    function showPopupStatus() {
      popupUtil.show("UpdateStatusPopup", {
        status: orderMaster.value.status,
        options: (status) => {
          orderMaster.value.status = status;
        },
      });
    }
    async function updateOrder() {
      const res = await orderSystemApi.updateOrderMaster(orderMaster.value);
      if (res && res.Success) {
        proxy.$toast.success("Cập nhật đơn hàng thành công");
        proxy.hide();

        if (
          proxy &&
          proxy._formParam &&
          proxy._formParam.submit &&
          typeof proxy._formParam.submit == "function"
        ) {
          proxy._formParam.submit();
        }
      } else {
        proxy.$toast.error("Cập nhật đơn hàng thất bại");
      }
    }

    function closeModal() {
      proxy.hide();
      if (
        proxy &&
        proxy._formParam &&
        proxy._formParam.submit &&
        typeof proxy._formParam.submit == "function"
      ) {
        proxy._formParam.submit();
      }
    }

    return {
      proxy,
      title,
      orderMaster,
      orderDetail,
      mFormat,
      bindData,
      getMasterDetail,
      getDetail,
      columns,
      generateImgPath,
      totalAmount,
      mode,
      isDisable,
      showPopupStatus,
      updateOrder,
      closeModal,
    };
  },
};
</script>

<style lang="scss">
.order-container {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  /* Bỏ overflow: hidden để tránh cắt lịch */
}

.order-header,
.order-row {
  display: flex;
  width: 100%;
}

.order-header {
  background-color: #f4f4f4;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}

.header-cell,
.data-cell {
  flex: 1;
  padding: 12px;
  border-right: 1px solid #ddd;
  text-align: left;
  display: flex;
  align-items: center;
  /* Đặt position: relative để làm mốc cho lịch */
  position: relative;
}

.header-cell:last-child,
.data-cell:last-child {
  border-right: none;
}

.order-row {
  background-color: #fff;
}

.order-row:nth-child(even) {
  background-color: #f9f9f9;
}

.order-info,
.order-address {
  margin: 0;
}

.order-info {
  &:focus {
    background-color: #fff !important;
  }
  background-color: #fff;
  padding: 2px 0px 0px 10px;
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
.order-detail {
  flex: 1;
}
.order-code {
  font-size: 20px;
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
  background-color: #d1ecf1; /* Xanh dương nhạt */
  color: #0c5460;
  border-color: transparent;
}
.cancel {
  background-color: #f8d7da; /* Nền đỏ nhạt */
  color: #721c24;
  border-color: transparent;
}
.approved {
  background-color: #fff3cd; /* Vàng nhạt */
  color: #856404;
  border-color: transparent;
}
.detail {
  height: 52vh;
}
.scroller {
  height: 100%;
  overflow-y: scroll;
  scrollbar-color: #b8bcc3 transparent;
  scrollbar-width: thin;
}
.table-order {
  position: relative;
  overflow: unset;
}
.table-order .ms-tr .ms-th {
  position: sticky;
  top: 0;
}

/* CSS cho ô nhập Datepicker */
.publisher-year-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* CSS cho lịch Datepicker */
.publisher-year-calendar {
  z-index: 9999; /* Đảm bảo lịch nổi lên trên các phần tử khác */
}

/* CSS cho popup lịch */
.custom-popup {
  position: fixed !important; /* Sử dụng fixed để lịch luôn hiển thị trong khung nhìn */
  z-index: 9999 !important; /* z-index cao để tránh bị che */
  background: #fff !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
  /* Tùy chỉnh vị trí nếu cần */
  top: auto !important; /* Để thư viện tự tính vị trí */
  left: auto !important; /* Để thư viện tự tính vị trí */
}
.status-col {
  justify-content: space-between;
}
.created-date #calendar-div .vuejs3-datepicker__value {
  padding: 6px 15px;
}
</style>
