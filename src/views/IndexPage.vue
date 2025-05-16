<template>
  <div class="wrapper">
    <b-row>
      <!-- coverflow slider start -->
      <b-col lg="12" class="mb-5">
        <div class="swiper-container mySwiper iq-width overflow-hidden mx-auto">
          <swiper
            ref="swiperRef"
            :effect="'coverflow'"
            :grab-cursor="true"
            :centered-slides="true"
            :slides-per-view="4"
            :space-between="40"
            :coverflow-effect="{
              rotate: 0,
              stretch: 0,
              depth: 142,
              modifier: 1,
              slideShadows: true,
            }"
            :loop="true"
            :breakpoints="{
              0: { slidesPerView: 2, spaceBetween: 20 },
              375: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 30 },
              1024: { slidesPerView: 5, spaceBetween: 30 },
              1500: { slidesPerView: 5, spaceBetween: 30 },
            }"
            @swiper="onSwiper"
          >
            <swiper-slide
              v-for="(slide, index) in slides"
              :key="index"
              @click="() => slideToCenter(index)"
            >
              <img
                class="img-fluid w-100 rounded"
                :src="generateImgPath(`/assets/images/${slide}`)"
                alt="image"
              />
            </swiper-slide>
          </swiper>
        </div>
      </b-col>
      <!-- coverflow slider end -->

      <!-- browsebook start -->
      <b-col lg="12" class="mb-5">
        <b-card no-body class="rounded-3">
          <b-card-header
            class="d-flex justify-content-between align-items-center position-relative mb-0"
          >
            <div class="iq-header-title asdasd">
              <h4 class="mb-0">Sách nổi bật</h4>
            </div>
            <div class="iq-card-header-toolbar d-flex align-items-center">
              <router-link
                to="/shop/category-page"
                class="btn btn-primary view-more"
                >Xem thêm</router-link
              >
            </div>
          </b-card-header>
          <b-row class="p-5 row gy-5">
            <b-col
              v-for="item in lstBookBrowse"
              :key="item"
              sm="6"
              md="5"
              lg="3"
            >
              <BookContainer
                :imageBook="item.imageBook"
                :titleName="item.titleName"
                :authorName="item.authorName"
                :viewBook="item.viewBook"
                :classBrowseBook="item.classBrowseBook"
                :cart="item.cart"
                :price="item.price"
                :offerPrice="item.offerPrice"
                :authorFontSize="item.authorFontSize"
                :bookId="item.bookId"
                :classImage="true"
                :discountRate="item.discount_rate"
              />
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <!-- browsebook end -->
      <!-- Favorite Reads start -->
      <b-col lg="12" class="mb-5">
        <b-card no-body class="rounded-3">
          <b-card-header
            class="d-flex justify-content-between align-items-center position-relative mb-0"
          >
            <div class="iq-header-title asdasd">
              <h4 class="mb-0">Gợi ý dành cho bạn</h4>
            </div>
            <div class="iq-card-header-toolbar d-flex align-items-center">
              <router-link
                to="/shop/category-page"
                class="btn btn-primary view-more"
                >Xem thêm</router-link
              >
            </div>
          </b-card-header>
          <b-row class="p-5 row gy-5">
            <b-col
              v-for="item in lstRecommend"
              :key="item"
              sm="6"
              md="5"
              lg="3"
            >
              <BookContainer
                :imageBook="item.imageBook"
                :titleName="item.titleName"
                :authorName="item.authorName"
                :viewBook="item.viewBook"
                :classBrowseBook="item.classBrowseBook"
                :cart="item.cart"
                :price="item.price"
                :offerPrice="item.offerPrice"
                :authorFontSize="item.authorFontSize"
                :bookId="item.bookId"
                :classImage="true"
                :discountRate="item.discount_rate"
              />
            </b-col>
          </b-row>
        </b-card>
      </b-col>
      <!-- Favorite Reads end -->
      <!-- Trending -->
      <b-col lg="12" class="mb-5">
        <b-card no-body class="rounded-3">
          <b-card-header
            class="d-flex justify-content-between align-items-center position-relative mb-0"
          >
            <div class="iq-header-title asdasd">
              <h4 class="mb-0">Sách bán chạy</h4>
            </div>
            <div class="iq-card-header-toolbar d-flex align-items-center">
              <router-link
                to="/shop/category-page"
                class="btn btn-primary view-more"
                >Xem thêm</router-link
              >
            </div>
          </b-card-header>
          <b-row class="p-5 row gy-5">
            <b-col v-for="item in lstTrending" :key="item" sm="6" md="5" lg="3">
              <BookContainer
                :imageBook="item.imageBook"
                :titleName="item.titleName"
                :authorName="item.authorName"
                :bookstoProgress="item.bookstoProgress"
                :percentage="item.percentage"
                :subtleColor="item.subtleColor"
                :colorProgressbar="item.colorProgressbar"
                :viewBook="true"
              />
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { ref, getCurrentInstance, onMounted, onUnmounted } from "vue";
import { moduleBook, moduleUser } from "@/store/pinia/store";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { EffectCoverflow, Navigation, Autoplay } from "swiper/core";
import BookContainer from "@/components/widgets/BookContainer.vue";
import FeaturedWriter from "@/components/widgets/FeaturedWriter.vue";
import _ from "lodash";
import MPagination from "@/components/MPagination/MPagination.vue";
import bookRecommendApi from "@/api/Business/bookRecommendApi";
import bookApi1 from "@/api/System/bookApi";
import emitter from "@/common/emitter";

export default {
  name: "IndePage",
  components: {
    BookContainer,
    FeaturedWriter,
    Swiper,
    SwiperSlide,
    MPagination,
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const lstBookBrowse = ref([]);
    const lstTrending = ref([]);
    const bookApi = moduleBook();

    const lstRecommend = ref([]);

    const generateImgPath = (path) => {
      return window.origin + import.meta.env.BASE_URL + path;
    };

    SwiperCore.use([EffectCoverflow, Navigation, Autoplay]);

    const slides = ref([
      "swiper/01.jpg",
      "swiper/02.jpg",
      "swiper/03.jpg",
      "swiper/04.jpg",
      "swiper/05.jpg",
      "swiper/06.jpg",
      "swiper/07.jpg",
      "swiper/08.jpg",
      "swiper/09.jpg",
      "swiper/10.jpg",
    ]);

    onMounted(() => {
      emitter.$on("reloadRecommend", getAllRecommend);
    });
    onUnmounted(() => {
      emitter.$off("reloadRecommend", getAllRecommend);
    });

    const swiperRef = ref(null);
    let swiperInstance = null;

    const onSwiper = (swiper) => {
      swiperInstance = swiper;
    };

    const slideToCenter = (index) => {
      if (swiperInstance) {
        swiperInstance.slideToLoop(index);
      }
    };

    /**
     * Lay danh sach sach
     */
    async function getAllBook() {
      const payload = {
        columns: "book_id,author",
        filter: `[{"key": "created_date", "Value": "2025-04-01T00:00:00", "Opr": ">="}]`,
        sort: "name DESC",
        take: 8,
        type: 0,
      };

      try {
        const res = await bookApi.getAllBook(payload);
        // Map lai cho giong FE
        if (res && res.length > 0) {
          let lstClone = _.cloneDeep(res);
          lstClone.map((item) => {
            var obj = {
              bookId: item.book_id,
              imageBook: item.image_url,
              titleName: item.name,
              authorName: item.author,
              viewBook: "true",
              classBrowseBook: "browse-bookcontent",
              cart: "true",
              price: item.selling_price,
              offerPrice: item.price,
              authorFontSize: "true",
              discount_rate: item.discount_rate,
            };
            lstBookBrowse.value.push(obj);
          });
        }
      } catch (e) {
        proxy.$toast.error(
          proxy.$t("i18nMessage.GlobalMessage.ErrorContactAd")
        );
      }
    }

    async function getAllRecommend() {
      try {
        const res = await bookRecommendApi.getAllBookRecommend();
        let lstClone = _.cloneDeep(res);
        var lst = [];
        lstClone.map((item) => {
          var obj = {
            bookId: item.book_id,
            imageBook: item.image_url,
            titleName: item.name,
            authorName: item.author,
            viewBook: "true",
            classBrowseBook: "browse-bookcontent",
            cart: "true",
            price: item.selling_price,
            offerPrice: item.price,
            authorFontSize: "true",
            discount_rate: item.discount_rate,
          };
          lst.push(obj);
        });
        lstRecommend.value = lst;
      } catch (e) {
        proxy.$toast.error(
          proxy.$t("i18nMessage.GlobalMessage.ErrorContactAd")
        );
      }
    }

    async function getListTrending() {
      try {
        const res = await bookApi1.getListTrending();
        let lstClone = _.cloneDeep(res);
        lstClone.map((item) => {
          var obj = {
            bookId: item.book_id,
            imageBook: item.image_url,
            titleName: item.name,
            authorName: item.author,
            viewBook: "true",
            classBrowseBook: "browse-bookcontent",
            cart: "true",
            price: item.selling_price,
            offerPrice: item.price,
            authorFontSize: "true",
            discount_rate: item.discount_rate,
          };
          lstTrending.value.push(obj);
        });
      } catch (e) {
        proxy.$toast.error(
          proxy.$t("i18nMessage.GlobalMessage.ErrorContactAd")
        );
      }
    }

    return {
      lstBookBrowse,
      getAllBook,
      slideToCenter,
      onSwiper,
      swiperRef,
      slides,
      lstTrending,
      generateImgPath,
      getAllRecommend,
      lstRecommend,
      getListTrending,
    };
  },

  created() {
    this.getAllBook();
    this.getListTrending();
    const isAuthen = moduleUser().isAuthenticated();
    if (isAuthen) {
      this.getAllRecommend();
    }
  },
};
</script>
