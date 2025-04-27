<template>
  <b-row>
    <!-- Tìm kiếm sách -->
    <div class="text-center">
      <h2 class="mb-3">Tìm kiếm sách</h2>
      <div
        class="d-flex flex-column flex-lg-row align-items-center gap-3 custom-search mb-lg-5 mx-0 mx-md-auto"
      >
        <div
          class="iq-selected d-flex flex-column flex-md-row w-50 search-bar-width gap-3 align-items-center justify-content-end mx-md-auto"
        >
          <div
            class="form-group mb-0 select-genre iq-select2-container-width bg-white"
          >
            <select
              class="select2-basic-single form-control"
              ref="genres"
              style="width: 100%"
              @change="handleChangeGenre"
            >
              <option value="all">Thể loại</option>
              <option
                v-for="item in lstGerne"
                :key="item.genre_id"
                :value="item.genre_id"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="form-group mb-0 iq-select2-container-width bg-white">
            <select
              class="select2-basic-single form-control"
              ref="year"
              style="width: 100%"
              @change="handleChangeYear"
            >
              <option value="all">Năm</option>
              <option
                v-for="item in lstYear.reverse()"
                :key="item"
                :value="item"
              >
                {{ item }}
              </option>
            </select>
          </div>
        </div>
        <div
          class="d-flex align-items-center w-50 search-bar-width mb-5 mb-lg-0 mx-md-auto gap-2"
        >
          <div class="d-block w-75">
            <div
              class="form-group input-group mb-0 search-input category-search-input"
            >
              <span class="input-group-text ps-3 pe-0 border-0">
                <i class="ph ph-magnifying-glass"></i>
              </span>
              <input
                ref="inputRef"
                type="text"
                class="form-control border-0"
                placeholder="Tìm kiếm sách "
                v-model="searchValue"
              />
            </div>
          </div>
          <!-- <b-button
            variant="primary"
            type="button"
            class="btn btn-primary search-data btn-search"
          >
            <span>Tìm kiếm</span>
          </b-button> -->
        </div>
      </div>
    </div>
    <b-col lg="12" class="mb-5">
      <b-card no-body class="rounded-3">
        <b-row class="p-5 row gy-5">
          <template v-if="lstBookBrowse.length > 0">
            <b-col
              v-for="item in lstBookBrowse"
              :key="item.bookId"
              sm="6"
              md="4"
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
                :discountRate="item.discountRate"
                :classImage="true"
              />
            </b-col>
          </template>
          <template v-else>
            <b-col cols="12">
              <MNodata />
            </b-col>
          </template>
          <InfiniteLoading
            @infinite="loadMore"
            :key="infiniteKey"
            class="infinite-loading"
          >
            <template #spinner>
              <div class="loading icon-loading"></div>
            </template>
            <template #complete>
              <span></span>
            </template>
          </InfiniteLoading>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { ref, onMounted, getCurrentInstance, nextTick, watch } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import Choices from "choices.js";
import BookContainer from "@/components/widgets/BookContainer.vue";
import { moduleBook } from "@/store/pinia/store";
import { debounce, cloneDeep } from "lodash";
import genreApi from "@/api/System/genreApi.js";
import MNodata from "@/components/MNodata/MNodata.vue";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

export default {
  name: "CategoryBook",
  components: {
    BookContainer,
    MNodata,
    InfiniteLoading,
    Loading,
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();

    const books = ref(null);
    const genres = ref(null);
    const year = ref(null);
    const author = ref(null);
    const lstBookBrowse = ref([]);
    const lstGerne = ref([]);
    const lastPayload = ref({});
    const searchValue = ref("");
    const isLoading = ref(true);
    const fullPage = ref(false);
    const currenPage = ref(-1);
    const infiniteKey = ref(0);

    const lstYear = [
      2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014,
      2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006, 2005, 2004, 2003, 2002,
      2001, 2000,
    ];

    const bookApi = moduleBook();

    onMounted(() => {
      // new Choices(genres.value, {
      //   searchEnabled: true,
      //   shouldSort: false,
      // });
      // new Choices(year.value, {
      //   searchEnabled: true,
      //   shouldSort: false,
      // });
    });

    const dataEmpty = ref(false);
    function initChoices() {
      // Xóa instance cũ (nếu có)
      if (genres.value._choices) {
        genres.value._choices.destroy();
      }
      // Khởi tạo lại Choices
      new Choices(genres.value, {
        searchEnabled: true,
        shouldSort: false,
        noResultsText: "Không có dữ liệu",
        placeholder: true,
        placeholderValue: "Thể loại",
      });

      if (year.value._choices) {
        year.value._choices.destroy();
      }

      new Choices(year.value, {
        searchEnabled: true,
        shouldSort: false,
      });
    }

    watch(searchValue, (newVal) => {
      handleSearch(newVal);
    });

    async function loadMore(state) {
      const nextPage = currenPage.value + 1;
      const skip = nextPage * 5;

      var payload = proxy.processPayload({
        skip: skip,
        filter: lastPayload.value.filter,
      });
      proxy.nomalizeLoadParameter(payload);

      const res = await bookApi.getAllBook(payload);
      if (res && Array.isArray(res) && res.length > 0) {
        let lstClone = [];
        res.map((item) => {
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
            discountRate: item.discount_rate,
          };
          lstClone.push(obj);
        });
        lstBookBrowse.value = [...lstBookBrowse.value, ...lstClone];
        currenPage.value = nextPage;
        state.loaded();
      } else {
        state.complete();
      }
    }

    const handleSearch = debounce(async (value) => {
      if (value.trim() === "") {
        // Nếu search rỗng thì xóa filter search nếu có
        lastPayload.value.filter = lastPayload.value.filter.filter(
          (x) => x.key !== "name"
        );
      } else {
        // Nếu có giá trị tìm kiếm
        const existingSearch = lastPayload.value.filter.find(
          (x) => x.key === "name"
        );

        if (existingSearch) {
          existingSearch.value = value;
        } else {
          lastPayload.value.filter.push({
            key: "name",
            value: value,
            opr: "LIKE",
          });
        }
      }
      lastPayload.value.skip = 0;
      await getAllBook(cloneDeep(lastPayload.value));
    }, 500);

    /**
     * Lay danh sach sach
     */
    async function getAllBook(data) {
      var param = data ?? proxy.processPayload({ sort: "name ASC", take: 5 });
      lstBookBrowse.value = [];
      currenPage.value = 0;
      try {
        nomalizeLoadParameter(param);
        const res = await bookApi.getAllBook(param);
        // Map lai cho giong FE
        if (res) {
          let lstClone = [];
          res.map((item) => {
            var obj = {
              bookId: item.book_id,
              imageBook: item.image_url,
              titleName: item.name,
              authorName: item.author,
              viewBook: "true",
              classBrowseBook: "browse-bookcontent",
              cart: "true",
              price: item.selling_price,
              offerPrice: item.discount_price,
              authorFontSize: "true",
              discountRate: item.discount_rate,
            };
            lstClone.push(obj);
          });
          lstBookBrowse.value = lstBookBrowse.value.concat(lstClone);
          if (res.length == 0) {
            dataEmpty.value = true;
          }
        }
      } catch (e) {
        console.log(e);
        proxy.$toast.error(
          proxy.$t("i18nMessage.GlobalMessage.ErrorContactAd")
        );
      }
    }

    /**
     * Lay danh sach the loai
     */
    async function getAllGenre() {
      try {
        const res = await genreApi.getAllGenre();
        if (res && res.length > 0) {
          res.forEach((item) => {
            var obj = {
              genre_id: item.genre_id,
              name: item.name,
            };
            lstGerne.value.push(obj);
          });
        }
      } catch (ex) {
        consle.log(ex);
        proxy.$toast.error(
          proxy.$t("i18nMessage.GlobalMessage.ErrorContactAd")
        );
      } finally {
        nextTick(() => {
          initChoices();
        });
      }
    }

    /**
     * select the loai
     * @param e
     */
    async function handleChangeGenre(e) {
      currenPage.value = 0;
      lastPayload.value.skip = 0;

      if (e.target.value) {
        var filter = {
          key: "genre_id",
          value: e.target.value,
          opr: "=",
        };

        if (e.target.value == "all") {
          lastPayload.value.filter = lastPayload.value.filter.filter(
            (x) => x.key != "genre_id"
          );
          filter = null;
        }

        if (lastPayload.value.filter.find((x) => x.key == "genre_id")) {
          lastPayload.value.filter = lastPayload.value.filter.filter(
            (x) => x.key != "genre_id"
          );
        }

        if (filter) {
          lastPayload.value.filter.push(filter);
        }
      }
      await proxy.getAllBook(cloneDeep(lastPayload.value));
      infiniteKey.value++;
    }

    async function handleChangeYear(e) {
      if (e.target.value) {
        var filter = {
          key: "publisher_year",
          value: e.target.value,
          opr: "=",
        };

        if (e.target.value == "all") {
          lastPayload.value.filter = lastPayload.value.filter.filter(
            (x) => x.key != "publisher_year"
          );
          filter = null;
        }

        if (lastPayload.value.filter.find((x) => x.key == "publisher_year")) {
          lastPayload.value.filter = lastPayload.value.filter.filter(
            (x) => x.key != "publisher_year"
          );
        }

        if (filter) {
          lastPayload.value.filter.push(filter);
        }
      }
      await proxy.getAllBook(cloneDeep(lastPayload.value));
    }

    function processPayload(options = {}) {
      // Giá trị mặc định
      const defaults = {
        columns: "",
        filter: [],
        sort: "name ASC",
        take: 5,
        type: 0,
      };

      // Merge options với defaults
      const { columns, filter, sort, take, type, skip } = {
        ...defaults,
        ...options,
      };

      // Xử lý payload
      const payload = {
        columns: columns, // Không cần concat nếu không có initColumns
        filter: filter ? [...defaults.filter, ...filter] : defaults.filter, // Đảm bảo filter luôn là mảng
        sort: sort,
        take: take,
        type: type,
        skip: skip,
      };

      // Lưu payload cuối cùng (nếu cần)
      lastPayload.value = cloneDeep(payload);
      return payload;
    }

    function nomalizeLoadParameter(payload) {
      payload.filter = JSON.stringify(payload.filter || []);
    }

    return {
      books,
      genres,
      year,
      author,
      lstBookBrowse,
      getAllBook,
      getAllGenre,
      lstGerne,
      initChoices,
      handleChangeGenre,
      processPayload,
      lastPayload,
      nomalizeLoadParameter,
      lstYear,
      handleChangeYear,
      dataEmpty,
      searchValue,
      handleSearch,
      loadMore,
      isLoading,
      fullPage,
      currenPage,
      infiniteKey,
    };
  },
  created() {
    // this.getAllBook();
    this.getAllGenre();
  },
};
</script>
<style lang="scss" scoped>
.select-genre {
  width: 300px;
}
.btn-search {
  padding: 7px 18px 10px 18px;
}
.infinite-loading {
  display: flex;
  justify-content: center;
}
</style>
