<template>
  <MModal
    :title="title"
    class="address-order"
    @beforeOpen="beforeOpen"
    :showConfirm="true"
    txtBtnConfirm="Cập nhật"
    @confirmClick="handleEdit"
    @beforeClose="beforeClose"
  >
    <template v-slot:content>
      <b-row>
        <b-col>
          <b-card-body class="mt-5">
            <form action="">
              <div class="form-group">
                <MInput
                  v-model="model.name"
                  Placeholder="Tên thể loại"
                  ref="name"
                  Id="name"
                  :required="true"
                ></MInput>
              </div>
              <div class="form-group">
                <b-form-textarea
                  type="text"
                  class="form-control bg-white border"
                  placeholder="Mô tả"
                  v-model="model.description"
                ></b-form-textarea>
              </div>
            </form>
          </b-card-body>
        </b-col>
      </b-row>
    </template>
  </MModal>
</template>

<script>
import MModal from "./MModal.vue";
import MInput from "../MInput/MInput.vue";
import basePopup from "../base/basePopup";
import { getCurrentInstance, ref } from "vue";
import commonFuntion from "@/common/commonFuntion";
import genreApi from "@/api/System/genreApi";

export default {
  name: "EditCategoryPopup",
  extends: basePopup,
  data() {},
  components: {
    MModal,
    MInput,
  },
  setup() {
    const { proxy } = getCurrentInstance();

    const title = ref("Thể loại");
    const useEmail = ref(false);
    const isErrorControl = ref(false);

    function handleSwitchMethod(value) {
      useEmail.value = value.target.checked;
    }

    /**
     * Xử lý validate
     */
    function validateForm() {
      let listRef = proxy.$refs;
      for (const ref in listRef) {
        if (
          listRef[ref] &&
          typeof listRef[ref].validate === "function" &&
          listRef[ref].validate()
        ) {
          isErrorControl.value = true;
        } else {
          isErrorControl.value = false;
        }
      }
    }

    function bindData(data) {
      var dataE = proxy._formParam.genre;
      proxy.super("bindData", basePopup, dataE);
    }

    async function handleEdit() {
      proxy.validateForm();
      if (isErrorControl.value) {
        return;
      }

      commonFuntion.mask();
      try {
        delete proxy.model.no;
        const res = await genreApi.updateGenre(proxy.model);
        if (res) {
          proxy.$toast.success("Cập nhật thể loại thành công");
          if (
            proxy &&
            proxy._formParam &&
            proxy._formParam.submit &&
            typeof proxy._formParam.submit == "function"
          ) {
            proxy._formParam.submit();
          }
        } else {
          proxy.$toast.error("Cập nhật thể loại thất bại");
        }
      } catch (ex) {
        console.log(ex);
        commonFuntion.unmask();
      } finally {
        commonFuntion.unmask();
      }
    }

    return {
      title,
      handleSwitchMethod,
      useEmail,
      validateForm,
      handleEdit,
      isErrorControl,
      bindData,
    };
  },
};
</script>

<style></style>
