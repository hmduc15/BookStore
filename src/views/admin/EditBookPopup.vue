<template>
  <b-row class="d-flex flex-row book-sale">
    <div
      class="back-router d-flex align-items-center"
      @click="() => this.$router.go(-1)"
    >
      <i class="ph ph-caret-left"></i> Quay lại
    </div>
    <b-col class="img-container">
      <h1 class="title-tab text-center">Ảnh liên quan</h1>
      <div class="img-cover mt-5">
        <h2>Ảnh bìa</h2>
        <div class="preview preview-cover" v-if="urlCover">
          <img
            style="width: 35%"
            :src="urlCover"
            alt="Preview"
            class="preview-image"
          />
        </div>
        <input
          class="form-control mt-3"
          aria-label="file example"
          type="file"
          @change="handleFileChange"
          accept="image/*"
        />
      </div>
      <div class="img-detail mt-5">
        <h2>Ảnh chi tiết</h2>
        <div class="preview-grid d-flex">
          <b-row
            v-for="(img, index) in detailImgs"
            :key="index"
            class="detail-preview"
          >
            <b-col>
              <img
                :src="img.url"
                style="width: 30%"
                alt="Detail Preview"
                class="preview-image"
              />
              <p class="file-name">{{ img.name }}</p>
              <button @click="removeDetailImage(index)" class="btn-remove">
                &times;
              </button>
            </b-col>
          </b-row>
        </div>
        <input
          type="file"
          @change="handleDetailsChange"
          accept="image/*"
          multiple
          class="form-control mt-3"
          :disabled="detailImgs.length >= 5"
        />
      </div>
      <b-form-textarea
        v-model="book.description"
        placeholder="Mô tả sách "
        class="mt-5 description"
        rows="5"
      ></b-form-textarea>
    </b-col>
    <b-col class="info">
      <h1 class="title-tab text-center">Thông tin sách</h1>

      <div class="form-group d-flex flex-column gap-3 mt-5">
        <MInput
          ref="name"
          Id="name"
          v-model="book.name"
          :required="true"
          label="Tên sách"
        />
        <MInput
          ref="author"
          Id="author"
          v-model="book.author"
          label="Tác giả"
          :required="true"
        />
        <div class="d-flex flex-column">
          <label class="label pb-2 fw-bold">Năm xuất bản</label>
          <Datepicker
            v-model="publisherYearModel"
            wrapper-class="publisher-year"
            input-class="publisher-year-input"
            calendar-class="publisher-year-calendar"
            :minimum-view="'year'"
            :value-type="'YYYY'"
            :maximum-view="'year'"
            @changedYear="handleChangedYear"
          >
          </Datepicker>
        </div>
        <MInput
          ref="publishser"
          v-model="book.publisher"
          Id="publishser"
          label="Nhà xuất bản"
          :required="true"
        />
        <div class="genre">
          <label class="label pb-2 fw-bold">Thể loại</label>
          <select
            class="form-select"
            data-trigger
            name="choices-single-default"
            id="choices-single-default"
            v-model="book.genre_id"
            @change="hideTextHolder"
          >
            <option
              v-for="item in lstGerne"
              :key="item.genre_id"
              :value="item.genre_id"
            >
              {{ item.name }}
            </option>
          </select>
        </div>
        <div class="d-flex flex-column">
          <label class="label pb-2 fw-bold">Giá nhập</label>
          <VueAutonumeric
            ref="selling_price"
            v-model="book.import_price"
            :required="true"
            :options="{
              allowDecimalPadding: true,
              currencySymbolPlacement: 's',
              decimalCharacter: ',',
              decimalCharacterAlternative: '.',
              decimalPlaces: 0,
              digitGroupSeparator: '.',
              leadingZero: 'allow',
              maximumValue: 100000000000000000000,
              minimumValue: -100000000000000000000,
              modifyValueOnWheel: 'false',
              negativePositiveSignPlacement: 'p',
              selectOnFocus: false,
              formatOnInput: true,
              unformatOnHover: false,
              formatOnPageLoad: true,
              alwaysAllowDecimalCharacter: true,
            }"
          ></VueAutonumeric>
        </div>
        <div class="d-flex flex-column">
          <label class="label pb-2 fw-bold">Giá bán</label>
          <VueAutonumeric
            ref="selling_price"
            v-model="book.selling_price"
            :required="true"
            :options="{
              allowDecimalPadding: true,
              currencySymbolPlacement: 's',
              decimalCharacter: ',',
              decimalCharacterAlternative: '.',
              decimalPlaces: 0,
              digitGroupSeparator: '.',
              leadingZero: 'allow',
              maximumValue: 100000000000000000000,
              minimumValue: -100000000000000000000,
              modifyValueOnWheel: 'false',
              negativePositiveSignPlacement: 'p',
              selectOnFocus: false,
            }"
          ></VueAutonumeric>
        </div>
        <div class="d-flex flex-column">
          <label class="label pb-2 fw-bold">Số lượng</label>
          <VueAutonumeric
            ref="quantity"
            :required="true"
            v-model="book.quantity"
            :options="{
              digitGroupSeparator: '.', // Dấu phân cách hàng nghìn là dấu chấm
              decimalCharacter: ',', // Dấu thập phân (không dùng trong trường hợp này)
              decimalPlaces: 0, // Không có chữ số thập phân
              currencySymbol: '', // Không hiển thị ký hiệu tiền tệ
              modifyValueOnWheel: false, // Tắt thay đổi giá trị khi cuộn chuột
              minimumValue: 0, // Giá trị tối thiểu là 0
              maximumValue: 999999999999, // Giá trị tối đa
              unformatOnSubmit: true, // Tự động unformat khi submit
              watchExternalChanges: true, // Theo dõi thay đổi từ bên ngoài
              formatOnPageLoad: true, // Format ngay khi tải trang
              selectOnFocus: false, // Không select toàn bộ text khi focus
            }"
          ></VueAutonumeric>
        </div>
        <div class="d-flex flex-column">
          <label class="label pb-2 fw-bold">Giảm giá (%)</label>
          <VueAutonumeric
            ref="discountrate"
            v-model="book.discount_rate"
          ></VueAutonumeric>
        </div>
      </div>
    </b-col>
  </b-row>
  <b-row>
    <div class="btn-cotainer book-sale d-flex justify-content-end">
      <b-button variant="primary" type="button" @click="handlePost"
        >Cập nhật</b-button
      >
    </div>
  </b-row>
</template>

<script>
import MInput from "@/components/MInput/MInput.vue";
import { getCurrentInstance, onBeforeMount, ref, computed } from "vue";
import commonFuntion from "@/common/commonFuntion";
import VueAutonumeric from "@/components/MAutonumber/VueAutonumeric.vue";
import imgApi from "@/api/System/imgApi.js";
import genreApi from "@/api/System/genreApi";
import Datepicker from "vuejs3-datepicker";
import bookApi from "@/api/System/bookApi";
import { useRoute } from "vue-router";
export default {
  name: "SaleBook",
  components: {
    MInput,
    VueAutonumeric,
    Datepicker,
  },
  data() {
    return {
      book: {},
      isErrorControl: false,
    };
  },
  computed: {
    publisherYearModel: {
      get() {
        // Chuyển đổi giá trị số thành chuỗi năm (nếu publisher_year là number)
        return this.book.publisher_year
          ? this.book.publisher_year.toString()
          : null;
      },
      set(value) {
        // Chuyển đổi chuỗi năm thành number nếu cần
        this.book.publisher_year = value ? parseInt(value) : null;
      },
    },
  },
  setup() {
    const { proxy } = getCurrentInstance();
    const urlCover = ref(null);
    const detailImgs = ref([]);
    const imgCoverFile = ref(null);
    const imgDetailFile = ref([]);
    const lstGerne = ref([]);
    const isShowHolder = ref(true);
    function handleFileChange(event) {
      const file = event.target.files[0];

      if (file && file.type.match("image.*")) {
        imgCoverFile.value = file;
        // Tạo URL tạm để preview
        urlCover.value = URL.createObjectURL(file);
      } else {
        clearPreview();
      }
    }

    const handleDetailsChange = (event) => {
      const files = Array.from(event.target.files);
      const remainingSlots = 5 - detailImgs.value.length;

      imgDetailFile.value = files;

      files.slice(0, remainingSlots).forEach((file) => {
        if (!file.type.match("image.*")) return;

        detailImgs.value.push({
          url: URL.createObjectURL(file),
          name: file.name,
        });
      });
    };

    const removeDetailImage = (index) => {
      debugger;
      URL.revokeObjectURL(detailImgs.value[index].url);
      detailImgs.value.splice(index, 1);
      imgDetailFile.value.splice(index, 1);
    };

    const clearPreview = () => {
      // Giải phóng bộ nhớ
      if (urlCover.value) {
        URL.revokeObjectURL(previewUrl.value);
      }
      urlCover.value = null;

      if (detailImgs.value) {
        detailImgs.value.forEach((img) => URL.revokeObjectURL(img.url));
      }

      // Reset input file
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = "";
      }
    };

    onBeforeMount(() => {
      detailImgs.value.forEach((img) => URL.revokeObjectURL(img.url));
    });

    function validateForm() {
      let listRef = proxy.$refs;
      for (const ref in listRef) {
        if (
          listRef[ref] &&
          typeof listRef[ref].validate === "function" &&
          listRef[ref].validate()
        ) {
          proxy.isErrorControl = true;
        } else {
          proxy.isErrorControl = false;
        }
      }
    }

    async function handlePost() {
      if (!imgDetailFile.value || !imgCoverFile.value) {
        proxy.$toast.info("Upload ảnh trước khi Cập nhật ");
        return;
      }

      proxy.validateForm();

      if (proxy.isErrorControl) {
        return;
      }

      var lstDetail = imgDetailFile.value.map((x) => x.name);
      proxy.book.image_url = imgCoverFile.value.name;
      proxy.book.image_detail_url = lstDetail.join(";");
      var price =
        proxy.book.selling_price -
        (proxy.book.selling_price * (proxy.book.discount_rate ?? 0)) / 100;
      proxy.book.price = price;
      try {
        const res = await bookApi.updateBook(proxy.book);
        if (res && res.Success) {
          await proxy.uploadImg();
          proxy.$toast.success("Cập nhật sách thành công");
        }
      } catch (ex) {
        console.log(ex);
      }
    }

    async function uploadImg() {
      const formData = new FormData();
      formData.append("file", imgCoverFile.value);
      if (imgDetailFile.value && imgDetailFile.value.length > 0) {
        imgDetailFile.value.forEach((x) => {
          formData.append("fileDetails", x);
        });
      }
      try {
        const res = await imgApi.uploadImg(formData);
        return res;
      } catch (error) {
        console.error("Upload failed:", error);
        throw error;
      }
    }
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
      }
    }

    const generateImgPath = (path) => {
      return window._linkCdnImage + path;
    };
    const generateImgDetailPath = (path) => {
      return window._linkCdnImageDetail + path;
    };

    function hideTextHolder() {
      isShowHolder.value = false;
    }

    function handleChangedYear(payload) {
      proxy.book.publisher_year = payload.year;
    }

    async function loadData(id) {
      await proxy.getBookDetail(id);
    }
    async function getBookDetail(id) {
      try {
        const res = await bookApi.getBookDetail(id);
        if (res) {
          proxy.book = res;
          if (proxy.book.genre_id) {
            hideTextHolder();
          }
          if (proxy.book.image_url) {
            urlCover.value = generateImgPath(proxy.book.image_url);
            var file = await commonFuntion.convertImageToFile(
              urlCover.value,
              proxy.book.image_url
            );
            if (file) {
              imgCoverFile.value = file;
            }
          }
          if (
            proxy.book.image_detail_url &&
            proxy.book.image_detail_url.length > 0
          ) {
            var lstDetail = proxy.book.image_detail_url.split(";");
            for (const [index, item] of lstDetail.entries()) {
              const obj = {
                url: generateImgDetailPath(item),
                name: item,
              };
              commonFuntion
                .convertImageToFile(obj.url, obj.name)
                .then((res) => {
                  if (res) {
                    imgDetailFile.value.push(res);
                    detailImgs.value.push(obj);
                  }
                })
                .catch((ex) => {
                  console.log(ex);
                });
            }
          }
        }
      } catch (e) {
        console.log(e);
        proxy.$toast.error(
          proxy.$t("i18nMessage.GlobalMessage.ErrorContactAd")
        );
      }
    }

    return {
      urlCover,
      handleFileChange,
      clearPreview,
      detailImgs,
      handleDetailsChange,
      removeDetailImage,
      handlePost,
      imgCoverFile,
      imgDetailFile,
      uploadImg,
      validateForm,
      lstGerne,
      getAllGenre,
      isShowHolder,
      hideTextHolder,
      handleChangedYear,
      loadData,
      getBookDetail,
      generateImgPath,
      generateImgDetailPath,
    };
  },
  created() {
    // this.getAllBook();
    this.getAllGenre();
    const route = useRoute();
    this.loadData(route.params.id);
  },
};
</script>

<style lang="scss">
.book-sale {
  padding: 15px;
  background: var(--bs-gray-900);
}

.description {
  height: 150px;
}

.genre {
  position: relative;
}

.text-holder {
  position: absolute;
  top: 10px;
  left: 16px;
}
.publisher-year #calendar-div .vuejs3-datepicker__value {
  width: 100%;
  padding: 9px 12px;
  border: 1px solid #f1f1f1;
  border-radius: 4px;
  .vuejs3-datepicker__content {
    color: #857b7b;
    padding-top: 2px;
  }
}
.back-router {
  cursor: pointer;
  &:hover {
    color: var(--bs-primary);
  }
}
</style>
