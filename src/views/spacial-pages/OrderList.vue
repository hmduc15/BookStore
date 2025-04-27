<template>
  <b-row>
    <b-col sm="12" class="tab-order">
      <div class="tab-title">
        <h1>Đơn hàng của tôi</h1>
      </div>
      <div class="tab-container d-flex">
        <b-button
          class="tab-item col btn-tab"
          :class="activeTab == -1 ? 'active-tab ' : ''"
          @click="handleClick(-1)"
        >
          <div class="tab-item-count">
            {{
              quantity.Approved +
              quantity.Cancel +
              quantity.Created +
              quantity.Done +
              quantity.Paid
            }}
          </div>
          <div class="tab-item-txt">Tất cả</div>
        </b-button>
        <b-button
          class="tab-item col btn-tab"
          :class="activeTab == 0 ? 'active-tab ' : ''"
          @click="handleClick(0)"
        >
          <div class="tab-item-count">{{ quantity.Created || 0 }}</div>
          <div class="tab-item-txt">Đang xử lý</div>
        </b-button>
        <b-button
          class="tab-item col btn-tab"
          :class="activeTab == 2 ? 'active-tab ' : ''"
          @click="handleClick(2)"
        >
          <div class="tab-item-count">{{ quantity.Approved || 0 }}</div>
          <div class="tab-item-txt">Xác nhận</div>
        </b-button>
        <b-button
          class="tab-item col btn-tab"
          :class="activeTab == 1 ? 'active-tab ' : ''"
          @click="handleClick(1)"
        >
          <div class="tab-item-count">{{ quantity.Cancel || 0 }}</div>
          <div class="tab-item-txt">Đã hủy</div>
        </b-button>
        <b-button
          class="tab-item col btn-tab"
          :class="activeTab == 3 ? 'active-tab ' : ''"
          @click="handleClick(3)"
        >
          <div class="tab-item-count">
            {{ quantity.Paid }}
          </div>
          <div class="tab-item-txt">Đã thanh toán</div>
        </b-button>
        <b-button
          class="tab-item col btn-tab"
          :class="activeTab == 4 ? 'active-tab ' : ''"
          @click="handleClick(4)"
        >
          <div class="tab-item-count">{{ quantity.Done || 0 }}</div>
          <div class="tab-item-txt">Hoàn thành</div>
        </b-button>
      </div>
    </b-col>
  </b-row>
  <b-row>
    <div class="tab-list mt-5">
      <template v-if="lstDetail.length > 0">
        <div
          class="order mb-5"
          v-for="item in lstDetail"
          :key="item.order_id"
          @click="viewDetail(item)"
        >
          <div class="order-top d-flex align-items-center">
            <div class="order-code">
              {{ item.order_code }}
            </div>
            <div class="ms-5">
              <template v-if="item.status == 5">
                <span class="badge-status wait-paid">{{
                  mFormat.formatEnum(item.status, "orderStatus")
                }}</span>
              </template>
              <template v-else-if="item.status == 4">
                <span class="badge-status done">{{
                  mFormat.formatEnum(item.status, "orderStatus")
                }}</span>
              </template>
              <template v-else-if="item.status == 0">
                <span class="badge-status in-progress">{{
                  mFormat.formatEnum(item.status, "orderStatus")
                }}</span>
              </template>
              <template v-else-if="item.status == 3">
                <span class="badge-status paid">{{
                  mFormat.formatEnum(item.status, "orderStatus")
                }}</span>
              </template>
              <template v-else-if="item.status == 1">
                <span class="badge-status cancel">{{
                  mFormat.formatEnum(item.status, "orderStatus")
                }}</span>
              </template>
              <template v-else-if="item.status == 2">
                <span class="badge-status approved">{{
                  mFormat.formatEnum(item.status, "orderStatus")
                }}</span>
              </template>
            </div>
          </div>
          <div class="order-body d-flex align-items-center border-top gap-4">
            <div class="img">
              <img
                :src="generateImgPath(item.image_url)"
                class="img-full rounded img-order"
                alt=""
              />
            </div>
            <div class="name">{{ item.name }}</div>
          </div>
          <div class="order-footer d-flex border-top">
            <div class="left" style="color: #000">
              {{ item.groupCount }} sản phẩm
            </div>
            <div class="right d-flex flex-column gap-3">
              <div class="total-amount">
                Tổng tiền: {{ mFormat.formatAmount(item.total_price) }}đ
              </div>
              <div class="btn-container d-flex gap-3">
                <b-button
                  variant="outline-secondary"
                  type="button"
                  @click.stop="cancelOrder(item)"
                  >Hủy đơn</b-button
                >
                <b-button
                  variant="primary"
                  type="button"
                  @click.stop="reBuy(item)"
                  >Mua lại</b-button
                >
              </div>
            </div>
          </div>
        </div>
      </template>
      <div class="empty-data" v-else>
        <MNodata></MNodata>
      </div>
    </div>
  </b-row>
</template>

<script>
import { ref } from "vue";
import orderApi from "@/api/Business/orderApi";
import { cloneDeep } from "lodash";
import { mFormat } from "@/common/mFomat";
import MNodata from "@/components/MNodata/MNodata.vue";
import commonFuntion from "@/common/commonFuntion";
import { getCurrentInstance } from "vue";
import orderStatus from "@/common/contanst/orderStatus";
import emitter from "@/common/emitter";
import cartApi from "@/api/Business/cartApi.js";

export default {
  name: "OrderList",
  components: {
    MNodata,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const activeTab = ref(-1);
    const status = ref(-1);
    const lstOrder = ref([]);
    const lstOrDetailOrg = ref([]);
    const lstDetail = ref([]);
    const quantity = ref({});
    const generateImgPath = (path) => {
      return window._linkCdnImage + path;
    };

    function handleClick(value) {
      lstDetail.value = [];
      activeTab.value = value;
      var lst = cloneDeep(lstOrDetailOrg.value);
      if (value == -1) {
        lstDetail.value = lst;
      } else {
        lstDetail.value = lst.filter((x) => x.status == value);
      }
    }

    async function getQuantityStatus() {
      try {
        const res = await orderApi.getQuantityStatus();
        quantity.value = res;
      } catch (ex) {
        console.log(ex);
      }
    }

    async function getAllOrder() {
      try {
        const res = await orderApi.getAllOrder();
        lstOrder.value = res;
        proxy.getAllDetail();
      } catch (ex) {
        console.log(ex);
      }
    }
    async function getAllDetail() {
      const lstOrderDetail = await orderApi.getAllOrderDetail();
      if (lstOrderDetail.length > 0) {
        let grArray = commonFuntion.groupBy(lstOrderDetail, "order_id");
        lstOrDetailOrg.value = proxy.customData(grArray);
        lstDetail.value = lstOrDetailOrg.value;
      }
    }

    function customData(groupedData) {
      return Object.keys(groupedData).map((groupKey) => {
        const groupItems = groupedData[groupKey];
        const firstItem = groupItems[0];

        // Tạo bản sao của item đầu tiên để không làm thay đổi dữ liệu gốc
        const newItem = { ...firstItem };
        var mapItem = lstOrder.value.find((x) => x.order_id == groupKey);
        newItem.total_price = mapItem.total_price;
        newItem.order_code = mapItem.order_code;
        newItem.status = mapItem.status;

        // Thêm thông tin bổ sung (ví dụ: số lượng phần tử trong nhóm)
        newItem.groupCount = groupItems.length;
        // Hoặc có thể thêm toàn bộ mảng items nếu cần
        // newItem.items = groupItems;

        return newItem;
      });
    }

    async function cancelOrder(item) {
      item.status = orderStatus.Cancel;

      try {
        const res = await orderApi.updateOrderStatus(item);
        if (res && res.isSuccess) {
          proxy.$toast.success("Hủy đơn hàng thành công");
        }
      } catch (ex) {
        console.log(ex);
      }
    }
    function viewDetail(item) {
      proxy.$router.push(`/shop/invoice/detail/${item.order_id}`);
    }
    async function reBuy(item) {
      var obj = {
        book_id: item.book_id,
        quantity: 1,
        name: item.name,
        price: item.price,
        image_url: item.image_url,
      };
      try {
        const res = await cartApi.addCart(obj);
        if (res) {
          proxy.$router.push(`/shop/checkout`);
        }
      } catch (ex) {
        console.log(ex);
        proxy.$toast.error(
          proxy.$t("i18nMessage.GlobalMessage.ErrorContactAd")
        );
      } finally {
        emitter.$emit("addToCart", obj);
      }
    }

    return {
      generateImgPath,
      activeTab,
      handleClick,
      getQuantityStatus,
      status,
      quantity,
      getAllOrder,
      lstDetail,
      mFormat,
      getAllDetail,
      customData,
      lstOrDetailOrg,
      cancelOrder,
      viewDetail,
      reBuy,
    };
    s;
  },
  created() {
    this.getAllOrder();
    this.getQuantityStatus();
    //  this.getAllDetail();
  },
};
</script>

<style lang="scss">
.tab-order {
  background-color: var(--bs-gray-900);
  padding: 5px;
  border-radius: 5px;
  .tab-title {
    padding: 15px 15px 5px;
  }
}

.tab-list {
  .order {
    background-color: var(--bs-gray-900);
    padding: 16px 24px;

    border-radius: 5px;
    &:hover {
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
      border: 0px solid #ccc;
      cursor: pointer;
    }
    .order-top {
      padding: 10px;
      .order-code {
        color: var(--bs-primary);
        font-weight: 600;
        font-size: 15px;
      }
    }
    .order-body {
      padding: 15px 0;
      .name {
        font-weight: 600;
        color: #000;
      }
    }
    .order-footer {
      padding: 10px 0;
      gap: 10px 0;
      justify-content: space-between;
      align-items: center;
      .total-amount {
        color: #000;
        font-weight: 600;
      }
    }
  }
}
.tab-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 14px;
  font-weight: 600;
  color: #000;
  background-color: unset;
  border: none;
  outline: none;
  border-radius: unset;

  &:focus {
    color: var(--bs-primary);
    background-color: unset;
  }

  &:active {
    color: var(--bs-primary);
    background-color: unset;
  }

  &:hover {
    color: var(--bs-primary);
    background-color: unset;
  }
  .tab-item-count {
    padding: 5px;
  }
}
.order-status {
  padding: 2px 10px 1px 10px;
  background-color: var(--p-primary-50);
  border-radius: 20px;
  color: var(--p-primary-600);
}

.right {
  align-items: end;
}

.active-tab {
  border-bottom: 2px solid var(--bs-primary);
  color: var(--bs-primary);
}

.img-order {
  max-width: 90px;
  max-height: 90px;
  width: 90px;
  height: 90px;
  object-fit: contain;
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
</style>
