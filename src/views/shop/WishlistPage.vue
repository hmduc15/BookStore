<template>
  <b-card no-body>
    <b-card-header
      class="d-flex justify-content-between align-items-center position-relative mb-0 bg-primary"
    >
      <div class="iq-header-title">
        <h4 class="mb-0 text-white">Danh sách yêu thích</h4>
      </div>
    </b-card-header>

    <b-card-body class="py-0">
      <ul class="list-inline p-0 m-0 list-inline-res">
        <template v-if="wishlist.length > 0">
          <li
            v-for="(item, index) in wishlist"
            :key="index"
            class="checkout-product pt-5 pt-md-0"
          >
            <b-row class="align-items-center">
              <b-col sm="3" lg="2">
                <b-row class="align-items-center">
                  <b-col sm="3" class="pb-3 text-center">
                    <router-link
                      to="#"
                      @click="removeWishList(item)"
                      class="badge bg-danger delete-btn p-2"
                      ><i class="ri-close-fill"></i
                    ></router-link>
                  </b-col>
                  <b-col sm="9">
                    <span class="checkout-product-img">
                      <router-link to="#">
                        <img
                          class="img-fluid rounded"
                          :src="generateImgPath(item.image_url)"
                          alt=""
                        />
                      </router-link>
                    </span>
                  </b-col>
                </b-row>
              </b-col>
              <b-col sm="3" lg="4" class="my-3">
                <div class="checkout-product-details">
                  <h5>{{ item.name }}</h5>
                  <div class="price">
                    <h5>{{ mFormat.formatAmount(item.price) }}đ</h5>
                  </div>
                </div>
              </b-col>
              <b-col sm="6" lg="6">
                <b-row>
                  <b-col sm="8">
                    <b-row class="align-items-center mt-2"> </b-row>
                  </b-col>
                  <b-col sm="4" class="mb-5 mt-3 my-md-0">
                    <b-button
                      type="submit"
                      variant="primary"
                      class="view-more"
                      @click="addToCart(item)"
                    >
                      Thêm vào giỏ hàng
                    </b-button>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </li>
        </template>
        <MNodata class="mt-5 mb-5" v-else></MNodata>
      </ul>
    </b-card-body>
  </b-card>
</template>

<script>
import Swal from "sweetalert2";
import QuantityCounter from "@/components/custom/elements/QuantityCounter.vue";
import bookFavouriteApi from "@/api/Business/bookFavouriteApi";
import { getCurrentInstance, ref } from "vue";
import { mFormat } from "@/common/mFomat";
import emitter from "@/common/emitter";
import cartApi from "@/api/Business/cartApi";
import MNodata from "@/components/MNodata/MNodata.vue";

export default {
  name: "wishlistpage",
  components: {
    MNodata,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const wishlist = ref([]);
    const generateImgPath = (path) => {
      return window._linkCdnImage + path;
    };

    const cartSwal = () => {
      Swal.fire({
        title: "Added!",
        text: "Your item has been Added to the cart.",
        icon: "success",
        confirmButtonText: "OK",
        background: "#f9f9f9",
        color: "secondary",
      });
    };

    const deleteSwal = () => {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete this item",
        icon: "error",
        showCancelButton: true,
        backdrop: "rgba(60,60,60,0.8)",
        confirmButtonText: "Yes, delete it!",
        confirmButtonColor: "#c03221",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your item has been deleted.", "success");
        }
      });
    };

    async function getWishList() {
      try {
        const res = await bookFavouriteApi.getAllCart();
        if (res) {
          wishlist.value = res;
        }
      } catch (e) {
        proxy.$toast.error(
          proxy.$t("i18nMessage.GlobalMessage.ErrorContactAd")
        );
      }
    }
    async function removeWishList(item) {
      wishlist.value = wishlist.value.filter((x) => x.book_id != item.book_id);
      emitter.$emit("removeWishList", item);
    }
    async function addToCart(item) {
      var obj = {
        book_favourite_id: item.book_favourite_id,
        book_id: item.book_id,
        quantity: 1,
        price: item.price,
        name: item.name,
        image_url: item.image_url,
      };
      try {
        const res = await cartApi.addCart(obj);
        if (res) {
          proxy.$toast.success(proxy.$t("i18nMessage.AddCart.Success"));
        }
      } catch (ex) {
        console.log(ex);
        proxy.$toast.error(
          proxy.$t("i18nMessage.GlobalMessage.ErrorContactAd")
        );
      } finally {
        await removeWishList(obj);
        emitter.$emit("addToCart", obj);
      }
    }
    return {
      wishlist,
      cartSwal,
      deleteSwal,
      getWishList,
      generateImgPath,
      mFormat,
      removeWishList,
      addToCart,
    };
  },
  created() {
    this.getWishList();
  },
};
</script>
