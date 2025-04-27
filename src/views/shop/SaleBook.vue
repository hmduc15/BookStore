<template>
  <b-row class="d-flex flex-row book-sale">
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
          ref="fileInput"
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
          ref="detailFileInput"
        />
      </div>
      <b-form-textarea
        ref="description"
        v-model="book.description"
        placeholder="Mô tả sách "
        required
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
          Placeholder="Tên sách"
          v-model="book.name"
          :required="true"
        />
        <MInput
          ref="author"
          Id="author"
          v-model="book.author"
          Placeholder="Tác giả"
          :required="true"
        />

        <Datepicker
          wrapper-class="publisher-year"
          input-class="publisher-year-input"
          calendar-class="publisher-year-calendar"
          placeholder="Năm xuất bản"
          :minimum-view="'year'"
          :maximum-view="'year'"
          @changedYear="handleChangedYear"
        >
        </Datepicker>
        <MInput
          ref="publishser"
          v-model="book.publisher"
          Id="publishser"
          Placeholder="Nhà xuất bản"
          :required="true"
        />
        <div class="genre">
          <p class="text-holder" v-if="isShowHolder">Thể loại</p>
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
        <VueAutonumeric
          ref="selling_price"
          v-model="book.selling_price"
          Placeholder="Giá bán"
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
        <VueAutonumeric
          ref="quantity"
          :required="true"
          v-model="book.quantity"
          Placeholder="Số luợng"
        ></VueAutonumeric>
        <VueAutonumeric
          ref="discountrate"
          v-model="book.discount_rate"
          Placeholder="Giảm giá"
        ></VueAutonumeric>
      </div>
    </b-col>
  </b-row>
  <b-row>
    <div class="btn-cotainer book-sale d-flex justify-content-end">
      <b-button variant="primary" type="button" @click="handlePost"
        >Đăng bán</b-button
      >
    </div>
  </b-row>
</template>

<script>
import MInput from "@/components/MInput/MInput.vue";
import { getCurrentInstance, onBeforeMount, ref } from "vue";
import commonFuntion from "@/common/commonFuntion";
import VueAutonumeric from "@/components/MAutonumber/VueAutonumeric.vue";
import imgApi from "@/api/System/imgApi.js";
import genreApi from "@/api/System/genreApi";
import Datepicker from "vuejs3-datepicker";
import bookApi from "@/api/System/bookApi";

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
  setup() {
    const { proxy } = getCurrentInstance();
    const urlCover = ref(null);
    const detailImgs = ref([]);
    const imgCoverFile = ref(null);
    const imgDetailFile = ref(null);
    const lstGerne = ref([]);
    const isShowHolder = ref(true);

    function inputPrice(value) {
      proxy.book.selling_price = value;
    }

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
      URL.revokeObjectURL(detailImgs.value[index].url);
      detailImgs.value.splice(index, 1);
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
        proxy.$toast.info("Upload ảnh trước khi đăng bán ");
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
        const res = await bookApi.saleBook(proxy.book);
        if (res && res.isSuccess) {
          await proxy.uploadImg();
          proxy.$toast.success("Đăng bán sách thành công");
          proxy.book = {};
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

    function hideTextHolder() {
      isShowHolder.value = false;
    }

    function handleChangedYear(payload) {
      proxy.book.publisher_year = payload.year;
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
      inputPrice,
      validateForm,
      lstGerne,
      getAllGenre,
      isShowHolder,
      hideTextHolder,
      handleChangedYear,
    };
  },
  created() {
    // this.getAllBook();
    this.getAllGenre();
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
  }
}
</style>
