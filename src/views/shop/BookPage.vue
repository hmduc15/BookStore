<template>
  <b-row>
    <b-col sm="12">
      <b-card no-body>
        <b-card-header
          class="d-flex justify-content-between align-items-center position-relative mb-0"
        >
          <div class="iq-header-title">
            <h4 class="mb-0">Chi tiết sách</h4>
          </div>
        </b-card-header>
        <b-card-body class="pb-5">
          <b-row class="align-items-top">
            <b-col md="6">
              <div class="product-vertical-slider custom-thumb-swiper">
                <div class="slider__flex gap-2 gap-lg-5">
                  <div class="slider__col">
                    <div class="slider__thumbs">
                      <div class="swiper-container">
                        <Swiper
                          class="swiper-wrapper"
                          :modules="modules"
                          direction="vertical"
                          :slide-to-clicked-slide="true"
                          loop
                          loop-slide="5"
                          :slidesPerView="3"
                          :spaceBetween="24"
                          @swiper="setMainSwiper"
                          :controller="{ control: thumbSwiper }"
                          :breakpoints="{
                            0: {
                              direction: 'horizontal',
                              slidesPerView: 3,
                            },
                            768: {
                              direction: 'vertical',
                            },
                          }"
                        >
                          <SwiperSlide
                            class="swiper-slide"
                            v-for="(src, index) in slideLeft"
                            :key="index"
                          >
                            <div class="slider__image">
                              <img
                                :src="src"
                                class="img-fluid rounded-3"
                                alt=""
                                loading="lazy"
                              />
                            </div>
                          </SwiperSlide>
                        </Swiper>
                      </div>
                    </div>
                  </div>
                  <div class="slider__images w-100 bg-light-subtle">
                    <div class="swiper-container">
                      <Swiper
                        class="swiper-wrapper"
                        :modules="modules"
                        direction="vertical"
                        :space-between="24"
                        :loop="true"
                        :loop-slide="5"
                        :mousewheel="true"
                        :grabCursor="true"
                        @swiper="setThumbSwiper"
                        :controller="{ control: mainSwiper }"
                        :breakpoints="{
                          0: {
                            direction: 'horizontal',
                          },
                          768: {
                            direction: 'vertical',
                          },
                        }"
                      >
                        <SwiperSlide
                          class="swiper-slide"
                          v-for="(data, index) in slideCenter"
                          :key="index"
                        >
                          <div class="slider__image">
                            <img :src="data" alt="" loading="lazy" />
                          </div>
                        </SwiperSlide>
                      </Swiper>
                    </div>
                  </div>
                </div>
              </div>
            </b-col>
            <b-col md="6">
              <b-card no-body class="border-0">
                <b-card-body class="p-0 book-vertical-desc">
                  <h3 class="mb-3">
                    {{ itemBook.name }}
                  </h3>
                  <div
                    class="price d-flex align-items-center gap-2 font-weight-bold mb-2"
                  >
                    <span
                      class="font-size-20 pr-2 old-price"
                      v-if="itemBook.discount_rate"
                      >{{ mFormat.formatAmount(itemBook.selling_price) }}đ</span
                    >
                    <span class="font-size-24 text-dark"
                      >{{ mFormat.formatAmount(itemBook.price) }}đ</span
                    ><span
                      class="label-discount"
                      v-if="
                        itemBook.discount_rate && itemBook.discount_rate != 0
                      "
                      >{{ `-${itemBook.discount_rate}%` }}</span
                    >
                  </div>
                  <div class="mb-3">
                    <span class="text-warning">
                      <i class="fa fa-star mr-1"></i>&nbsp;
                      <i class="fa fa-star mr-1"></i>&nbsp;
                      <i class="fa fa-star mr-1"></i>&nbsp;
                      <i class="fa fa-star mr-1"></i>&nbsp;
                      <i class="fa fa-star"></i>
                    </span>
                  </div>
                  <span class="text-dark mb-4 pb-4 p-2 border-bottom d-block">{{
                    itemBook.description
                  }}</span>
                  <div class="text-primary mb-2">
                    Tác giả:
                    <span class="text-body">{{ itemBook.author }}</span>
                  </div>
                  <div class="text-primary mb-2">
                    Thể loại:
                    <span class="text-body">{{ itemBook.genre_name }}</span>
                  </div>
                  <div class="text-primary mb-3">
                    Nhà xuất bản:
                    <span class="text-body">{{ itemBook.publisher }}</span>
                  </div>
                  <div class="mb-5 d-flex gap-2 align-items-center mt-5">
                    <b-button
                      type="button"
                      variant="primary"
                      @click="addToCart"
                      class="btn btn-primary view-more cart-btn d-flex gap-2"
                    >
                      <i class="ph-duotone ph-shopping-cart"></i>
                      Thêm vào giỏ hàng
                    </b-button>
                  </div>
                  <div class="mb-3">
                    <b-button
                      @click="addToWishList"
                      class="text-body text-center wishlist-btn"
                    >
                      <span
                        class="avatar-30 rounded-circle bg-primary d-inline-block text-white me-2"
                      >
                        <i class="ri-heart-fill"></i> </span
                      >{{ "" }}
                      <span>Thêm vào danh sách yêu thích</span>
                    </b-button>
                  </div>
                  <div class="social d-flex align-items-center">
                    <h5 class="mb-0 me-2">Share:</h5>
                    <ul
                      class="list-inline d-flex gap-2 p-0 mb-0 align-items-center social-icons"
                    >
                      <li>
                        <a
                          href="#"
                          class="avatar-40 rounded-circle bg-primary facebook"
                        >
                          <i class="fa fa-facebook" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class="avatar-40 rounded-circle bg-primary twitter"
                        >
                          <i class="fa fa-twitter" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class="avatar-40 rounded-circle bg-primary youtube"
                        >
                          <i class="fa fa-youtube-play" aria-hidden="true"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class="avatar-40 rounded-circle bg-primary pinterest"
                        >
                          <i class="fa fa-pinterest-p" aria-hidden="true"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </b-card-body>
              </b-card>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col lg="12" class="mb-5">
      <b-card no-body class="rounded-3 similar-slider">
        <b-card-header
          class="d-flex justify-content-between align-items-center position-relative mb-0"
        >
          <div class="iq-header-title">
            <h4 class="mb-0">Sách cùng thể loại</h4>
          </div>
          <div class="iq-card-header-toolbar d-flex align-items-center">
            <router-link
              to="/shop/category-page"
              class="btn btn-primary view-more"
              >Xem thêm</router-link
            >
          </div>
        </b-card-header>
        <div class="p-2">
          <div class="overflow-hidden">
            <Swiper
              tag="ul"
              class="p-0 m-0 list-inline"
              :loop="true"
              :slide-per-view="Math.min(similarBooks.length, 2)"
              :space-between="0"
              :autoplay="{
                delay: 4000,
                disableOnInteraction: false,
              }"
              :breakpoints="breakpointsSlide"
            >
              <swiper-slide
                v-for="(item, index) in similarBooks"
                :key="index"
                class="swiper-slide p-4"
              >
                <BookContainer
                  classBrowseBook=" browse-bookcontent mb-0"
                  :bookId="item.bookId"
                  :imageBook="item.imageBook"
                  :titleName="item.titleName"
                  :authorName="item.authorName"
                  readMoreSimilar="false"
                  viewBook="true"
                  btnView="true"
                  @bookClick="handleReload"
                />
              </swiper-slide>
            </Swiper>
          </div>
        </div>
      </b-card>
    </b-col>

    <b-col lg="12" class="mb-5">
      <b-card no-body class="rounded-3">
        <b-card-header
          class="d-flex justify-content-between align-items-center position-relative mb-0"
        >
          <div class="iq-header-title">
            <h4 class="mb-0">Đánh giá sách</h4>
          </div>
        </b-card-header>
        <div class="p-2">
          <MComment
            :lstComment="lstComment"
            :bookId="bookId"
            v-if="isAuthen"
          ></MComment>
          <div class="iq-header-title text-center" v-else>
            <h4 class="m-5">Vui lòng đăng nhập để đánh giá sách</h4>
          </div>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
import Swal from "sweetalert2";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Controller } from "swiper";
import { getCurrentInstance, ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { moduleBook } from "@/store/pinia/store";
import BookContainer from "@/components/widgets/BookContainer.vue";
import MComment from "@/components/MComment/MComment.vue";
import { mFormat } from "@/common/mFomat";
import commentAPi from "@/api/System/commentAPi";
import { moduleUser } from "@/store/pinia/store";
import emitter from "@/common/emitter";
import cartApi from "@/api/Business/cartApi";
import bookFavouriteApi from "@/api/Business/bookFavouriteApi";

export default {
  name: "BookPage",
  components: {
    Swiper,
    SwiperSlide,
    BookContainer,
    MComment,
  },
  data() {
    return {
      itemBook: {},
    };
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const bookApi = moduleBook();
    const user = moduleUser();

    const generatePath = (path) => {
      return window.origin + import.meta.env.BASE_URL + path;
    };

    let slideLeft = ref([]);
    let slideCenter = ref([]);
    let similarBooks = ref([]);
    let lstComment = ref([]);
    let bookId = ref("");
    const isAuthen = ref(false);

    let breakpointsSlide = ref({});

    const modules = [Navigation, Controller];

    const mainSwiper = ref(null);
    const thumbSwiper = ref(null);
    const setMainSwiper = (swiper) => {
      mainSwiper.value = swiper;
    };
    const setThumbSwiper = (swiper) => {
      thumbSwiper.value = swiper;
    };

    const BrowseBooks = [
      {
        imageBook: "browse-books/01.jpg",
        titleName: "The Word Books Day..",
        authorName: "Paul Molive",
        viewBook: "true",
        classBrowseBook: "browse-bookcontent",
        cart: "true",
        price: 99,
        offerPrice: 89,
      },
      {
        imageBook: "browse-books/02.jpg",
        titleName: "The catcher in the Rye",
        authorName: "Anna Sthesia",
        viewBook: "true",
        classBrowseBook: "browse-bookcontent",
        cart: "true",
        price: 89,
        offerPrice: 79,
      },
      {
        imageBook: "browse-books/03.jpg",
        titleName: "Little Black Book",
        authorName: "Monty Carlo",
        viewBook: "true",
        classBrowseBook: "browse-bookcontent",
        cart: "true",
        price: 100,
        offerPrice: 89,
      },
      {
        imageBook: "browse-books/04.jpg",
        titleName: "Take The Risk Book",
        authorName: "Smith goal",
        viewBook: "true",
        classBrowseBook: "browse-bookcontent",
        cart: "true",
        price: 120,
        offerPrice: 99,
      },
      {
        imageBook: "browse-books/05.jpg",
        titleName: "The Raze Night Book",
        authorName: "Paige Turner",
        viewBook: "true",
        classBrowseBook: "browse-bookcontent",
        cart: "true",
        price: 150,
        offerPrice: 129,
      },
      {
        imageBook: "browse-books/06.jpg",
        titleName: "Find The Wave Book",
        authorName: "Barb Ackue",
        viewBook: "true",
        classBrowseBook: "browse-bookcontent",
        cart: "true",
        price: 120,
        offerPrice: 100,
      },
    ];

    const products = [
      {
        imageBook: "favorite/03.jpg",
        titleName: "The Secret to English Busy People..",
        authorName: "Author : Daniel Ace",
        bookstoProgress: "true",
        percentage: 78,
        subtleColor: "success",
        colorProgressbar: "success",
      },
      {
        imageBook: "favorite/04.jpg",
        titleName: "The adventures of Robins books...",
        authorName: "Author : Luka Afton",
        bookstoProgress: "true",
        percentage: 78,
        subtleColor: "danger",
        colorProgressbar: "danger",
      },
      {
        imageBook: "favorite/01.jpg",
        titleName: "Every Book is a new Wonderful Travel..",
        authorName: "Author : Pedro Araez",
        bookstoProgress: "true",
        percentage: 78,
        subtleColor: "info",
        colorProgressbar: "info",
      },
      {
        imageBook: "favorite/02.jpg",
        titleName: "Casey Christie night book into find...",
        authorName: "Author : Michael klock",
        bookstoProgress: "true",
        percentage: 78,
        subtleColor: "warning",
        colorProgressbar: "warning",
      },
    ];

    const addToCart = async () => {
      var obj = {
        book_id: proxy.itemBook.book_id,
        quantity: 1,
        price: proxy.itemBook.selling_price - proxy.itemBook.discount_price,
        name: proxy.itemBook.name,
        image_url: proxy.itemBook.image_url,
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
        emitter.$emit("addToCart", obj);
      }
    };

    const addToWishList = async () => {
      var obj = {
        book_id: proxy.itemBook.book_id,
        quantity: 1,
        price: proxy.itemBook.selling_price - proxy.itemBook.discount_price,
        name: proxy.itemBook.name,
        image_url: proxy.itemBook.image_url,
      };
      try {
        const res = await bookFavouriteApi.addFavourite(obj);
        if (res) {
          proxy.$toast.success(proxy.$t("i18nMessage.AddCart.Success"));
        }
      } catch (ex) {
        console.log(ex);
        proxy.$toast.error(
          proxy.$t("i18nMessage.GlobalMessage.ErrorContactAd")
        );
      } finally {
        emitter.$emit("addToWishList", obj);
      }
    };

    onMounted(() => {
      isAuthen.value = user.isAuthenticated;
    });

    async function handleReload(id) {
      proxy.$router.push(`/shop/book-page/${id}`);
      await proxy.loadData(id);
    }

    /**
     * ham load data chung
     */
    async function loadData(id) {
      await proxy.getBookDetail(id);
      await proxy.getSimilarBooks(id);
      await proxy.getComment(id);
      bookId.value = id;
    }

    /**
     * Lay du lieu detail sach
     */
    async function getBookDetail(id) {
      try {
        const res = await bookApi.getBookDetail(id);
        if (res) {
          proxy.itemBook = res;
          if (res && res.image_detail_url) {
            var lstImgDetail = res.image_detail_url.split(";");
            lstImgDetail.forEach((item) => {
              var src = window._linkCdnImageDetail + item;
              slideLeft.value.push(src);
              slideCenter.value.push(src);
            });
          }
        }
      } catch (e) {
        console.log(e);
        proxy.$toast.error(
          proxy.$t("i18nMessage.GlobalMessage.ErrorContactAd")
        );
      } finally {
        document.title = `Sách ${proxy?.itemBook.name}`;
      }
    }

    /**
     * Lay danh sach sach cung the loai
     */
    async function getSimilarBooks(id) {
      try {
        const res = await bookApi.getSimilarBooks(id);
        if (res && res.length > 0) {
          var lstSimilar = [];
          res.forEach((item) => {
            var obj = {
              bookId: item.book_id,
              imageBook: item.image_url,
              titleName: item.name,
              authorName: item.author,
            };
            lstSimilar.push(obj);
          });
          similarBooks.value = lstSimilar;
        }
      } catch (e) {
        console.log(e);
        proxy.$toast.error(
          proxy.$t("i18nMessage.GlobalMessage.ErrorContactAd")
        );
      } finally {
        similarBooks.value.length > 1
          ? (breakpointsSlide.value = { 320: { slidesPerView: 1 } })
          : {
              320: { slidesPerView: 1 },
              550: { slidesPerView: 2 },
            };
      }
    }

    async function getComment(id) {
      try {
        const res = await commentAPi.getCommentByBook(id);
        if (res) {
          lstComment.value = res;
        }
      } catch (e) {
        console.log(e);
        proxy.$toast.error(
          proxy.$t("i18nMessage.GlobalMessage.ErrorContactAd")
        );
      }
    }

    return {
      generatePath,
      modules,
      mainSwiper,
      thumbSwiper,
      setMainSwiper,
      setThumbSwiper,
      BrowseBooks,
      products,
      addToWishList,
      getBookDetail,
      getSimilarBooks,
      slideLeft,
      slideCenter,
      similarBooks,
      handleReload,
      loadData,
      breakpointsSlide,
      mFormat,
      getComment,
      lstComment,
      bookId,
      isAuthen,
      addToCart,
    };
  },
  created() {
    const route = useRoute();
    this.loadData(route.params.id);
  },
};
</script>
<style lang="scss" scoped>
.wishlist-btn {
  background-color: unset;
  border: none;
  padding-left: 0;
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
