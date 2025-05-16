<template>
  <div :class="classBrowseBook">
    <div class="p-0">
      <div class="d-flex align-items-center gap-1">
        <div
          :class="`${
            classImage === true ? 'col-6' : ''
          } position-relative p-0 img-shadow img-book`"
        >
          <a href="javascript:void(0);" tabindex="-1">
            <img
              :src="generateImgPath(imageBook)"
              class="img-full rounded w-100"
              alt=""
            />
          </a>
          <div v-if="viewBook === 'true'" class="view-book">
            <router-link
              v-if="!btnView"
              class="btn view-book-btn"
              :to="`/shop/book-page/${bookId}`"
            >
              Xem
            </router-link>
            <b-button
              v-else
              type="button"
              @click.stop="handleViewClick(bookId)"
              class="btn view-book-btn"
              >Xem</b-button
            >
          </div>
        </div>
        <div class="col-6 px-3">
          <h4
            class="mb-1 line-clip-2"
            v-tooltip="titleName.length > 22 ? titleName : ''"
          >
            {{ titleName }}
          </h4>
          <h4
            v-tooltip="authorName.length > 22 ? authorName : ''"
            :class="`mb-1 line-clip-1 ${'font-size-13'} author`"
          >
            {{ authorName }}
          </h4>

          <div v-if="bookstoProgress === 'true'">
            <div class="iq-progress-bar-linear d-inline-block w-100">
              <div
                class="d-flex justify-content-between align-items-center text-dark font-size-13"
              >
                <span>Reading</span>
                <span class="me-4">{{ percentage }}%</span>
              </div>

              <div
                :class="`progress bg-${subtleColor}-subtle`"
                style="height: 6px"
              >
                <div
                  :class="`progress-bar bg-${colorProgressbar}`"
                  :style="{
                    width: animatedPercentage + '%',
                    transition: 'width 1s ease-in-out',
                  }"
                  role="progressbar"
                  :aria-valuenow="animatedPercentage"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>

            <a href="#" class="text-dark read-now" tabindex="-1"
              >Read Now<i class="ri-arrow-right-s-line"></i
            ></a>
          </div>

          <a v-if="readMore === 'true'" href="#" class="text-dark" tabindex="-1"
            >Read Now<i class="ri-arrow-right-s-line"></i
          ></a>

          <a
            v-if="readMoreSimilar === 'true'"
            href="#"
            class="text-dark read-now"
            tabindex="-1"
            >Read Now<i class="ri-arrow-right-s-line"> </i>
          </a>

          <div v-if="cart === 'true'">
            <div class="d-block line-height font-size-19">
              <span class="text-warning">
                <i class="ph-fill ph-star"></i>{{ "" }}
                <i class="ph-fill ph-star"></i>{{ "" }}
                <i class="ph-fill ph-star"></i>{{ "" }}
                <i class="ph-fill ph-star"></i>{{ "" }}
                <i class="ph-fill ph-star"></i>
              </span>
            </div>
            <div class="price d-flex flex-column-reverse mb-2">
              <span class="pe-1" v-if="discount_rate"
                ><del>{{ mFormat.formatAmount(price) }}đ</del>
              </span>
              <h6 class="mb-0">
                <b>{{ mFormat.formatAmount(offerPrice) }}đ</b>
                <span
                  class="label-discount"
                  v-if="discountRate || discountRate != 0"
                  >{{ `-${discountRate}%` }}</span
                >
              </h6>
            </div>
            <div class="iq-product-action">
              <b-button
                v-tooltip="this.$t('i18nTooltip.BtnToolTip.AddCart')"
                href="javascript:void(0);"
                @click="addToCart"
                class="btn btn-small-icon fs-1 cart-btn bg-primary-subtle"
              >
                <i class="ri-shopping-cart-2-fill text-primary fs-5"></i>
              </b-button>
              {{ "" }}
              <b-button
                href="javascript:void(0);"
                @click="addToWishList"
                class="btn btn-small-icon ms-2 fs-1 wishlist-btn bg-danger-subtle"
                v-tooltip="this.$t('i18nTooltip.BtnToolTip.AddWishList')"
              >
                <i class="ri-heart-fill text-danger fs-5"></i>
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swal from "sweetalert2";
import { ref, onMounted, getCurrentInstance } from "vue";
import { mFormat } from "@/common/mFomat";
import bookFavouriteApi from "@/api/Business/bookFavouriteApi";
import cartApi from "@/api/Business/cartApi.js";
import emitter from "@/common/emitter";

const emit = defineEmits(["bookClick"]);

const { proxy } = getCurrentInstance();

const generateImgPath = (path) => {
  return window._linkCdnImage + path;
};

// progressBar annimation
const animatedPercentage = ref(0);
onMounted(() => {
  setTimeout(() => {
    animatedPercentage.value = props.percentage;
  }, 1000);
});

const props = defineProps({
  btnView: {
    type: Boolean,
    default: false,
  },
  bookId: {
    type: String,
    default: "",
  },
  classBrowseBook: {
    type: String,
    default: "",
  },
  classImage: {
    type: Boolean,
    default: false,
  },
  readMore: {
    type: String,
    default: "",
  },
  path: {
    type: String,
    default: "",
  },
  imageBook: {
    type: String,
    default: "",
  },
  viewBook: {
    type: String,
    default: "",
  },
  titleName: {
    type: String,
    default: "",
  },
  authorName: {
    type: String,
    default: "",
  },
  authorFontSize: {
    type: Boolean,
    default: false,
  },
  bookstoProgress: {
    type: String,
    default: "",
  },
  percentage: {
    type: Number,
  },
  colorProgressbar: {
    type: String,
    default: "",
  },
  readMoreSimilar: {
    type: String,
    default: "",
  },
  cart: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
  },
  offerPrice: {
    type: Number,
  },
  discountRate: {
    type: Number,
  },
  subtleColor: {
    type: String,
    default: "",
  },
});

const addToCart = async () => {
  var obj = {
    book_id: props.bookId,
    quantity: 1,
    price: props.offerPrice,
    name: props.titleName,
    image_url: props.imageBook,
  };

  try {
    const res = await cartApi.addCart(obj);
    if (res) {
      proxy.$toast.success(proxy.$t("i18nMessage.AddCart.Success"));
    }
  } catch (ex) {
    console.log(ex);
    proxy.$toast.error(proxy.$t("i18nMessage.GlobalMessage.ErrorContactAd"));
  } finally {
    emitter.$emit("addToCart", obj);
    emitter.$emit("reloadRecommend");
  }
};

const addToWishList = async () => {
  var obj = {
    book_id: props.bookId,
    author: props.authorName,
    image_url: props.imageBook,
    name: props.titleName,
    price: props.offerPrice,
  };
  try {
    const res = await bookFavouriteApi.addFavourite(obj);
    if (res) {
      proxy.$toast.success(proxy.$t("i18nMessage.AddCart.Success"));
    }
  } catch (ex) {
    console.log(ex);
    proxy.$toast.error(proxy.$t("i18nMessage.GlobalMessage.ErrorContactAd"));
  } finally {
    emitter.$emit("addToWishList", obj);
    emitter.$emit("reloadRecommend");
  }
};

function handleViewClick(id) {
  emit("bookClick", id);
}
</script>

<style lang="scss" scoped>
.img-full {
  width: 100%;
  height: 100%;
}
.img-shadow {
  height: 250px;
}
.cart-btn,
.wishlist-btn {
  border: none;
}
.img-book {
  width: 150px;
}
.label-discount {
  margin-left: 8px;
  padding: 2px 2px;
  border-radius: 4px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  background-color: #c92127;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0px;
}
</style>
