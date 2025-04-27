<template>
  <li class="checkout-product pt-2 pb-2">
    <b-row align-v="center">
      <b-col sm="2">
        <span class="checkout-product-img">
          <router-link to="#">
            <img
              :src="generateImgPath(item.image_url)"
              alt="checkout-1"
              class="img-fluid rounded-2"
            />
          </router-link>
        </span>
      </b-col>
      <b-col sm="4" class="my-3 mb-0 mb-md-3">
        <div class="checkout-detail">
          <router-link :to="`/shop/book-page/${item.book_id}`">
            <h5 class="mb-0 title">{{ item.name }}</h5>
          </router-link>
          <p :class="statusClass">
            {{ status }}
          </p>
          <div class="price">
            <h5>{{ mFormat.formatAmount(item.price) }}đ</h5>
          </div>
        </div>
      </b-col>
      <b-col sm="6">
        <b-row align-v="center">
          <b-col sm="10">
            <b-row align-v="center" class="mt-2">
              <b-col sm="7" md="6">
                <QuantityCounter
                  :modelValue="item.quantity"
                  @update:modelValue="handleQuantityChange"
                />
              </b-col>
              <b-col sm="5" md="6">
                <span class="product-price mb-2">{{
                  mFormat.formatAmount(item.amount)
                }}</span>
              </b-col>
            </b-row>
          </b-col>
          <b-col sm="2" class="mb-5 mb-md-0">
            <router-link
              to="#"
              class="bg-danger-subtle delete-btn btn-small-icon"
              @click="deleteSwal"
            >
              <i class="ph ph-trash text-danger custom-ph-icons"></i>
            </router-link>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </li>
</template>

<script setup>
import Swal from "sweetalert2";
import QuantityCounter from "@/components/custom/elements/QuantityCounter.vue";
import { mFormat } from "@/common/mFomat";
import { computed, watch } from "vue";

const emit = defineEmits(["updateAmount"]);

const generateImgPath = (path) => {
  return window._linkCdnImage + path;
};

const props = defineProps({
  item: Object,
});

function handleQuantityChange(value) {
  props.item.quantity = value;
  props.item.amount = props.item.price * value;
  emit("updateAmount");
}

const deleteSwal = () => {
  Swal.fire({
    title: "Bạn có chắc chắn xóa?",
    icon: "error",
    showCancelButton: true,
    backdrop: "rgba(60,60,60,0.8)",
    confirmButtonText: "Có!",
    cancelButtonText: "Không",
    confirmButtonColor: "#c03221",
  }).then((result) => {
    if (result.isConfirmed) {
      emit("deleteItem", props.item);
    }
  });
};
</script>
<style lang="scss" scoped>
.checkout-detail {
  .title {
    font-size: 14px;
    font-weight: 400;
    line-clamp: 3;
    &:hover {
      color: rgba(var(--bs-primary-rgb));
    }
  }
  .price h5 {
    font-weight: 600;
  }
}
</style>
