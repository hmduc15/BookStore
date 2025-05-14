<template>
  <nav class="nav navbar navbar-expand-xl navbar-light iq-navbar border-bottom">
    <div class="container-fluid navbar-inner justify-content-end">
      <!-- Search -->

      <!-- Right -->
      <div
        class="collapse flex-grow-0 navbar-collapse"
        id="navbarSupportedContent"
      >
        <ul class="mb-2 navbar-nav align-items-center navbar-list mb-lg-0">
          <!-- Cart -->
          <li v-if="!context.isAdmin" class="nav-item dropdown">
            <a
              href="#"
              class="nav-link"
              id="notification-cart"
              data-bs-toggle="dropdown"
            >
              <div
                class="btn-action position-relative nav-list-icon pt-1"
                v-tooltip="'Giỏ hàng'"
              >
                <span class="btn-inner">
                  <i class="ph-duotone ph-shopping-cart"></i>
                </span>
                <span
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  >{{ lstCart.length }}</span
                >
              </div>
            </a>
            <div
              class="p-0 sub-drop dropdown-menu dropdown-menu-end toggle-cart-info"
              aria-labelledby="notification-cart"
            >
              <div class="m-0 card-shadow card">
                <div class="py-3 card-header rounded-top-3 bg-primary mb-0">
                  <div class="header-title">
                    <h5 class="mb-0 text-white">Danh sách giỏ hàng</h5>
                  </div>
                </div>
                <div class="p-0 card-body">
                  <template v-if="lstCart.length > 0">
                    <div
                      class="iq-sub-card"
                      v-for="item in lstCart"
                      :key="item.book_id"
                    >
                      <div class="d-flex align-items-center">
                        <div>
                          <img
                            :src="generateImgPath(item.image_url)"
                            class="img-full rounded"
                            alt=""
                          />
                        </div>
                        <div class="ms-3 flex-grow-1 text-start">
                          <h6 class="mb-0">
                            <router-link
                              :to="`/shop/book-page/${item.book_id}`"
                            >
                              <span class="name"> {{ item.name }}</span>
                            </router-link>
                            <span class="quantity ms-2"
                              >x{{ item.quantity }}</span
                            >
                          </h6>
                          <p class="mb-0">
                            {{ mFormat.formatAmount(item.price) }}đ
                          </p>
                        </div>
                        <button
                          type="button"
                          class="btn btn-icon text-danger btn-remove btn-sm"
                          @click.stop="removeCart(item)"
                        >
                          <i class="ph ph-x"></i>
                        </button>
                      </div>
                    </div>
                  </template>
                  <MNodata class="mt-5 mb-5" v-else></MNodata>
                  <div class="d-flex gap-2 p-3 mt-3 justify-content-end">
                    <b-button
                      class="btn btn-primary btn-view-cart"
                      role="button"
                      v-if="lstCart.length > 0"
                      @click="$router.push('/shop/checkout')"
                      >Xem
                    </b-button>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <!-- wishlist -->
          <li v-if="!context.isAdmin" class="nav-item dropdown">
            <a
              href="#"
              class="nav-link"
              id="notification-cart"
              data-bs-toggle="dropdown"
            >
              <div
                class="btn-action position-relative nav-list-icon pt-1"
                v-tooltip="'Yêu thích'"
              >
                <span class="btn-inner">
                  <i class="ph ph-list-heart"></i>
                </span>
                <span
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  >{{ lstWishList.length }}</span
                >
              </div>
            </a>
            <div
              class="p-0 sub-drop dropdown-menu dropdown-menu-end toggle-cart-info"
              aria-labelledby="notification-cart"
            >
              <div class="m-0 card-shadow card">
                <div class="py-3 card-header rounded-top-3 bg-primary mb-0">
                  <div class="header-title">
                    <h5 class="mb-0 text-white">Danh sách yêu thích</h5>
                  </div>
                </div>
                <div class="p-0 card-body">
                  <template v-if="lstWishList.length > 0">
                    <div
                      class="iq-sub-card"
                      v-for="item in lstWishList"
                      :key="item.book_id"
                    >
                      <div class="d-flex align-items-center">
                        <div>
                          <img
                            :src="generateImgPath(item.image_url)"
                            class="img-full rounded"
                            alt=""
                          />
                        </div>
                        <div class="ms-3 flex-grow-1 text-start">
                          <router-link :to="`/shop/book-page/${item.book_id}`">
                            <span class="name"> {{ item.name }}</span>
                          </router-link>
                          {{ mFormat.formatAmount(item.price) }}đ
                        </div>
                        <button
                          type="button"
                          class="btn btn-icon text-danger btn-sm"
                          @click.stop="removeWishList(item)"
                        >
                          <i class="ph ph-x"></i>
                        </button>
                      </div>
                    </div>
                  </template>
                  <MNodata class="mt-5 mb-5" v-else></MNodata>
                  <div class="d-flex p-3 justify-content-end" v-if="isAuthen">
                    <b-button
                      v-if="lstWishList.length > 0"
                      class="btn btn-primary btn-view-cart"
                      role="button"
                      @click="$router.push('/shop/wishlist')"
                      >Xem
                    </b-button>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <!-- Profile -->
          <li class="nav-item dropdown" id="itemdropdown1">
            <a
              class="py-0 nav-link d-flex gap-3 justity-content-between align-items-center"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div class="icon-50">
                <span
                  class="btn-inner d-flex w-100 justify-content-center align-items-center h-100 position-relative"
                >
                  <template v-if="isAuthen">
                    <Avatar
                      :label="context?.name?.charAt(0)"
                      class="mr-2"
                      style="background-color: #ece9fc; color: #2a1261"
                      size="large"
                      shape="circle"
                    />
                    <span
                      class="bg-success p-1 rounded-circle position-absolute end-0 bottom-0 border border-3 border-white"
                    ></span>
                  </template>
                  <i v-else class="ph ph-user-circle-minus use-none"></i>
                </span>
              </div>
              <div class="d-none d-lg-block" v-if="isAuthen">
                <h6 class="mb-0 line-height">{{ context.name }}</h6>
              </div>
            </a>
            <!-- Drop down -->
            <div
              class="p-0 sub-drop dropdown-menu dropdown-menu-end"
              aria-labelledby="notification-cart"
            >
              <div class="m-0 card-shadow card">
                <div class="py-3 card-header rounded-top-3 bg-primary mb-0">
                  <div class="header-title">
                    <h5 class="mb-0 text-white">{{ context.name }}</h5>
                  </div>
                </div>
                <div class="p-0 card-body">
                  <router-link
                    class="iq-sub-card"
                    to="/shop/invoice/list"
                    v-if="isAuthen"
                  >
                    <div class="d-flex align-items-center">
                      <div
                        class="avatar-40 rounded-pill bg-primary-subtle text-primary d-flex align-items-center justify-content-center"
                      >
                        <i class="ri-bill-line"></i>
                      </div>
                      <div class="ms-4 flex-grow-1 text-start">
                        <h6 class="mb-0">Đơn hàng của tôi</h6>
                        <p class="mb-0 font-size-12">
                          Theo dõi tình trạng đơn hàng
                        </p>
                      </div>
                    </div>
                  </router-link>
                  <div
                    class="p-3 d-flex justify-content-center align-items-center"
                  >
                    <b-button
                      class="d-flex align-items-center"
                      v-if="isAuthen"
                      variant="primary"
                      type="button"
                      @click="logOut"
                      >Đăng suất <i class="ph ph-sign-out"></i
                    ></b-button>
                    <b-button
                      v-else
                      class="d-flex align-items-center"
                      variant="primary"
                      type="button"
                      @click="logIn"
                    >
                      Đăng nhập <i class="ph ph-sign-out"></i>
                    </b-button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import logo from "./logo.vue";
import Avatar from "primevue/avatar";
import { moduleUser, moduleContext } from "@/store/pinia/store";
import cartApi from "@/api/Business/cartApi";
import { getCurrentInstance, onUnmounted, ref, onMounted } from "vue";
import { mFormat } from "@/common/mFomat";
import MNodata from "../MNodata/MNodata.vue";
import emitter from "@/common/emitter";
import bookFavouriteApi from "@/api/Business/bookFavouriteApi";
import { useContextStorage } from "@/composables/useContextStorage";

export default {
  name: "Header",
  components: { Avatar, MNodata },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const lstCart = ref([]);
    const lstWishList = ref([]);

    const { onLogoutSession } = useContextStorage();

    const isAuthen = moduleUser().isAuthenticated();

    onMounted(() => {
      emitter.$on("addToCart", updateCart);
      emitter.$on("addToWishList", updateWishList);
      emitter.$on("deleteCheckout", removeCart);
      emitter.$on("removeWishList", removeWishList);
    });

    onUnmounted(() => {
      emitter.$off("addToCart", updateCart);
      emitter.$off("addToWishList", updateWishList);
      emitter.$off("deleteCheckout", removeCart);
      emitter.$off("removeWishList", removeWishList);
    });

    const generateImgPath = (path) => {
      return window._linkCdnImage + path;
    };

    const user = moduleUser();
    const context = moduleContext().getContext;

    const toggleSidebar = () => {
      document
        .getElementsByTagName("ASIDE")[0]
        .classList.toggle("sidebar-mini");
    };

    function updateWishList(item) {
      if (lstWishList.value.find((x) => x.book_id == item.book_id)) {
        lstWishList.value.forEach((x) => {
          x.quantity += 1;
        });
      } else {
        lstWishList.value.push(item);
      }
    }

    /**
     * lay data wish list
     */
    async function getDataWishList() {
      try {
        const res = await bookFavouriteApi.getAllCart();
        if (res && res.length > 0) {
          lstWishList.value = res;
        }
      } catch (ex) {
        console.log(ex);
        proxy.$toast.error(
          proxy.$t("i18nMessage.GlobalMessage.ErrorContactAd")
        );
      }
    }

    async function removeWishList(item) {
      lstWishList.value = lstWishList.value.filter(
        (x) => x.book_id != item.book_id
      );
      await bookFavouriteApi.deleteWishList(item);
    }

    /**
     * Update cart
     * @param item
     */
    function updateCart(item) {
      if (lstCart.value.find((x) => x.book_id == item.book_id)) {
        lstCart.value.forEach((x) => {
          x.quantity += 1;
        });
      } else {
        lstCart.value.push(item);
      }
    }
    async function getDataCart() {
      try {
        const res = await cartApi.getAllCart();
        if (res && res.length > 0) {
          lstCart.value = res;
        }
      } catch (ex) {
        console.log(ex);
        proxy.$toast.error(
          proxy.$t("i18nMessage.GlobalMessage.ErrorContactAd")
        );
      }
    }
    /**
     * Xoa gio hang
     */
    async function removeCart(item) {
      lstCart.value = lstCart.value.filter((x) => x.book_id != item.book_id);
      await cartApi.deleteCart(item);
    }

    function logOut() {
      onLogoutSession();
      // window.location.reload();
      window.scrollTo(0, 0);
      proxy.$router.push("/auth/sign-in");
    }

    function logIn() {
      proxy.$router.push("/auth/sign-in");
    }

    return {
      toggleSidebar,
      user,
      context,
      lstCart,
      getDataCart,
      generateImgPath,
      mFormat,
      removeCart,
      updateCart,
      getDataWishList,
      lstWishList,
      removeWishList,
      updateWishList,
      context,
      logOut,
      isAuthen,
      logIn,
    };
  },
  created() {
    const context = moduleContext().getContext;
    const isAuthen = moduleUser().isAuthenticated();
    if (isAuthen && !context.isAdmin) {
      this.getDataWishList();
      this.getDataCart();
    }
  },
};
</script>
<style lang="scss" scoped>
.btn-view-cart {
  background-color: #0dd6b8;
  border: none;
  padding: 7px 10px;
  &:hover {
    background-color: rgb(8, 136.8, 117.6);
  }
  a {
    color: #fff;
  }
}
.name {
  color: #000;
  font-size: 15px;
  &:hover {
    color: rgba(var(--bs-primary-rgb));
  }
}
.use-none {
  font-size: 46px !important;
}
</style>
