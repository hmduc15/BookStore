<template>
  <MModal
    :title="title"
    class="address-order"
    @beforeOpen="beforeOpen"
    :showConfirm="true"
    txtBtnConfirm="Thêm"
    @confirmClick="handleAddUser"
    @beforeClose="beforeClose"
  >
    <template v-slot:content>
      <b-row>
        <b-col>
          <b-card no-body>
            <b-card-header
              class="d-flex justify-content-between align-items-center position-relative mb-0"
            >
              <div class="iq-header-title">
                <h4 class="mb-0">Add New Category</h4>
              </div>
            </b-card-header>
            <b-card-body>
              <form action="">
                <div class="form-group">
                  <label>Category Name:</label>
                  <input type="text" class="form-control p-2 bg-white border" />
                </div>
                <div class="form-group">
                  <label>Category Description:</label>
                  <textarea
                    type="text"
                    class="form-control bg-white border"
                  ></textarea>
                </div>
                <div class="d-flex gap-2">
                  <b-button type="submit" variant="danger">Reset</b-button>
                  <b-button type="submit" variant="primary">Save</b-button>
                </div>
              </form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </template>
  </MModal>
</template>

<script>
import MModal from "./MModal.vue";
import popupUtil from "@/common/popupUtil";
import MInput from "../MInput/MInput.vue";
import basePopup from "../base/basePopup";
import { getCurrentInstance, ref } from "vue";
import userApi from "@/api/System/userApi";
import emailApi from "@/api/System/emailApi";
import commonFuntion from "@/common/commonFuntion";

export default {
  name: "AddCategoryPopup",
  extends: basePopup,
  data() {
    return {
      user: {},
    };
  },
  components: {
    MModal,
    MInput,
  },
  setup() {
    const { proxy } = getCurrentInstance();

    const title = ref("Thông tin tài khoản");
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
          proxy.isErrorControl = true;
        } else {
          proxy.isErrorControl = false;
        }
      }
    }

    async function handleAddUser() {
      proxy.validateForm();
      if (isErrorControl.value) {
        return;
      }

      commonFuntion.mask();
      try {
        const res = await userApi.createUser(proxy.user);
        if (res && res.Success) {
          if (useEmail.value) {
            var param = {
              email: proxy.user.email,
              key: res.keyConfirm,
            };
            const resEmail = await emailApi.sendEmailConfirm(param);
            if (resEmail && resEmail.Success) {
              proxy.$toast.success("Thêm tài khoản thành công");
              if (
                proxy &&
                proxy._formParam &&
                proxy._formParam.submit &&
                typeof proxy._formParam.submit == "function"
              ) {
                proxy._formParam.submit();
              }
            }
          }
        } else {
          proxy.$toast.error(res.Message);
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
      handleAddUser,
    };
  },
};
</script>

<style></style>
