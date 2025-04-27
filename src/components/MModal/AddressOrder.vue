<template>
  <MModal
    :title="title"
    class="address-order"
    @beforeOpen="beforeOpen"
    :showConfirm="true"
    txtBtnConfirm="Tiếp tục"
    @confirmClick="nextStep"
    @beforeClose="beforeClose"
    width="900"
  >
    <template v-slot:content>
      <form>
        <div class="form-group mt-5">
          <b-row>
            <b-col cols="12" md="6">
              <MInput
                ref="name"
                Id="name"
                Placeholder="Họ và tên người nhận"
                v-model="order.receive_name"
                :required="true"
            /></b-col>
            <b-col>
              <MInput
                ref="phoneNumber"
                Id="phoneNumber"
                Placeholder="Số điện thoại"
                v-model="order.phone_number"
                :required="true"
            /></b-col>
          </b-row>
          <b-row class="mt-5">
            <b-col cols="12" md="4">
              <MInput
                ref="province"
                Id="province"
                class="form-control province"
                v-model.trim="provinceSearch"
                Placeholder="Tỉnh"
                @focus="startSearchingProvince"
                @keyup="searchProvinceOnTyping()"
              />
              <div
                class="position-absolute bg-white border mt-1 shadow-sm"
                style="max-height: 200px; overflow-y: auto; z-index: 1000"
                v-show="provinceListShown && filteredProvinces.length"
                v-click-away="hideProvinceList"
              >
                <ul class="list-unstyled mb-0">
                  <li
                    v-for="(item, idx) in filteredProvinces"
                    :key="idx"
                    v-html="highlightName(item)"
                    class="px-3 py-2 cursor-pointer hover-bg-gray"
                    @click="selectProvince(item)"
                  ></li>
                </ul>
              </div>
            </b-col>
            <b-col cols="12" md="4">
              <MInput
                ref="district"
                Id="district"
                class="form-control district"
                v-model.trim="districtSearch"
                Placeholder="Huyện"
                @focus="startSearchingDistrict"
                @keyup="searchDistrictOnTyping()"
              />
              <div
                class="position-absolute bg-white border mt-1 shadow-sm"
                style="max-height: 200px; overflow-y: auto; z-index: 1000"
                v-show="districtListShown && filteredDistricts.length"
                v-click-away="hideDistrictList"
              >
                <ul class="list-unstyled mb-0">
                  <li
                    v-for="(item, idx) in filteredDistricts"
                    :key="idx"
                    v-html="highlightName(item)"
                    class="px-3 py-2 cursor-pointer hover-bg-gray"
                    @click="selectDistrict(item)"
                  ></li>
                </ul>
              </div>
            </b-col>
            <b-col cols="12" md="4">
              <MInput
                ref="ward"
                Id="ward"
                class="form-control ward"
                v-model.trim="wardSearch"
                Placeholder="Xã"
                @focus="startSearchingWard"
                @keyup="searchWardOnTyping()"
              />
              <div
                class="position-absolute bg-white border mt-1 shadow-sm"
                style="max-height: 200px; overflow-y: auto; z-index: 1000"
                v-show="wardListShown && filteredWards.length"
                v-click-away="hideWardList"
              >
                <ul class="list-unstyled mb-0">
                  <li
                    v-for="(item, idx) in filteredWards"
                    :key="idx"
                    v-html="highlightName(item)"
                    class="px-3 py-2 cursor-pointer hover-bg-gray"
                    @click="selectWard(item)"
                  ></li>
                </ul>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-5">
            <b-col>
              <MInput
                ref="address"
                Id="address"
                Placeholder="Địa chỉ nhận hàng"
                v-model="order.adress_detail"
                :required="true"
            /></b-col>
          </b-row>
        </div>
        <div class="form-group"></div>
      </form>
    </template>
  </MModal>
</template>

<script>
import MModal from "./MModal.vue";
import basePopup from "../base/basePopup";
import MInput from "@/components/MInput/MInput.vue";
import { getCurrentInstance, ref } from "vue";
import ky from "ky";
import { array, mask } from "superstruct";
import { ProvinceSchema, DistrictShema, WardSchema } from "@/common/structs";
import { debounce } from "lodash";
import popupUtil from "@/common/popupUtil";

export default {
  name: "AddressOrder",
  components: {
    MModal,
    MInput,
  },
  data() {
    return {
      BASE_API_URL: "https://provinces.open-api.vn/api",
      provinceSearch: "",
      provinceListShown: false,
      filteredProvinces: [],
      selectedProvince: null,
      districtSearch: "",
      districtListShown: false,
      filteredDistricts: [],
      selectedDistrict: null,
      wardSearch: "",
      wardListShown: false,
      filteredWards: [],
      selectedWard: null,
      order: {},
      isErrorControl: false,
    };
  },
  extends: basePopup,
  setup() {
    const { proxy } = getCurrentInstance();
    const title = ref("Thông tin giao hàng");

    //#region location
    function markRequireAll(query) {
      const words = query.split(/\s+/);
      return words.map((w) => `+${w}`).join(" ");
    }
    async function startSearchingProvince() {
      proxy.provinceListShown = true;
      if (!proxy.filteredProvinces.length) {
        await proxy.fetchProvinces();
      }
    }

    async function fetchProvinces() {
      const rdata = await ky.get(`${proxy.BASE_API_URL}/p/`).json();
      proxy.filteredProvinces = mask(rdata, array(ProvinceSchema));
    }

    function highlightName(item) {
      if (!item.matches) {
        return item.name;
      }
      const name = item.name;
      const matches = Object.values(item.matches);
      matches.sort((v1, v2) => v1[0] - v2[0]);
      const parts = [];
      let lastPos = 0;
      for (const [s, e] of matches) {
        parts.push(name.slice(lastPos, s));
        parts.push(`<strong>${name.slice(s, e)}</strong>`);
        lastPos = e;
      }
      parts.push(name.slice(lastPos));
      return parts.join("");
    }

    function hideProvinceList(event) {
      if (!event?.srcElement?.className?.includes("province")) {
        proxy.provinceListShown = false;
      }
    }

    function selectProvince(province) {
      proxy.hideProvinceList();
      proxy.selectedProvince = province;
      proxy.provinceSearch = province.name;
      proxy.resetDistrict();
      // proxy.resetWard();
    }

    async function startSearchingDistrict() {
      proxy.districtListShown = true;
      if (proxy.filteredDistricts.length || !proxy.selectedProvince) {
        return;
      }
      await proxy.fetchDistricts(proxy.selectedProvince.code);
    }

    async function fetchDistricts(provinceCode) {
      const rdata = await ky
        .get(`${proxy.BASE_API_URL}/p/${provinceCode}`, {
          searchParams: { depth: 2 },
        })
        .json();
      const province = mask(rdata, ProvinceSchema);
      proxy.filteredDistricts = province.districts;
    }

    function hideDistrictList(event) {
      if (!event?.srcElement?.className?.includes("district")) {
        proxy.districtListShown = false;
      }
    }

    function selectDistrict(district) {
      proxy.hideDistrictList();
      proxy.selectedDistrict = district;
      proxy.districtSearch = district.name;
      proxy.resetWard();
    }

    async function startSearchingWard() {
      proxy.wardListShown = true;
      if (proxy.filteredWards.length || !proxy.selectedDistrict) {
        return;
      }
      await proxy.fetchWards(proxy.selectedDistrict.code);
    }

    async function fetchWards(districtCode) {
      const rdata = await ky
        .get(`${proxy.BASE_API_URL}/d/${districtCode}`, {
          searchParams: { depth: 2 },
        })
        .json();
      const district = mask(rdata, DistrictShema);
      proxy.filteredWards = district.wards;
    }

    function hideWardList(event) {
      if (!event?.srcElement?.className?.includes("ward")) {
        proxy.wardListShown = false;
      }
    }

    const searchDistrictOnTyping = debounce(async function () {
      const term = proxy.districtSearch.trim();
      if (!term || !proxy.selectedProvince) {
        return;
      }
      proxy.searchDistrict(term, proxy.selectedProvince.code);
    }, 300);

    const searchProvinceOnTyping = debounce(async function () {
      const term = proxy.provinceSearch.trim();
      if (!term) {
        return;
      }
      proxy.searchProvince(term);
    }, 300);

    const searchWardOnTyping = debounce(async function () {
      const term = proxy.wardSearch.trim();
      if (!term && !proxy.selectedDistrict.code) {
        return;
      }
      proxy.searchWard(term, proxy.selectedDistrict.code);
    }, 300);

    async function searchDistrict(term, provinceCode) {
      if (this.selectedDistrict && this.selectedDistrict.name === term) {
        return;
      }
      const rdata = await ky
        .get(`${this.BASE_API_URL}/d/search/`, {
          searchParams: { q: this.markRequireAll(term), p: provinceCode },
        })
        .json();
      this.filteredDistricts = mask(rdata, array(DistrictShema));
    }

    async function searchProvince(term) {
      if (this.selectedProvince && this.selectedProvince.name === term) {
        return;
      }
      const rdata = await ky
        .get(`${this.BASE_API_URL}/p/search/`, {
          searchParams: { q: this.markRequireAll(term) },
        })
        .json();
      this.filteredProvinces = mask(rdata, array(ProvinceSchema));
    }
    async function searchWard(term, districtCode) {
      if (this.selectedWard && this.selectedWard.name === term) {
        return;
      }
      const rdata = await ky
        .get(`${this.BASE_API_URL}/w/search/`, {
          searchParams: { q: this.markRequireAll(term), d: districtCode },
        })
        .json();
      this.filteredWards = mask(rdata, array(WardSchema));
    }

    function selectWard(ward) {
      proxy.hideWardList();
      proxy.selectedWard = ward;
      proxy.wardSearch = ward.name;
    }

    function resetProvince() {
      proxy.provinceSearch = "";
      proxy.selectedProvince = null;
      proxy.filteredProvinces = [];
      proxy.provinceListShown = false;
    }

    function resetDistrict() {
      proxy.districtSearch = "";
      proxy.selectedDistrict = null;
      proxy.filteredDistricts = [];
      proxy.districtListShown = false;
    }

    function resetWard() {
      proxy.wardSearch = "";
      proxy.selectedWard = null;
      proxy.filteredWards = [];
      proxy.wardListShown = false;
    }
    ////#endregion

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

    function nextStep() {
      proxy.validateForm();

      if (proxy.isErrorControl) {
        return;
      }
      var address = `${proxy.order.adress_detail}, ${proxy.wardSearch}, ${proxy.districtSearch}, ${proxy.provinceSearch}`;
      proxy.order.receive_address = address;
      if (
        proxy &&
        proxy._formParam &&
        proxy._formParam.options &&
        typeof proxy._formParam.options == "function"
      ) {
        proxy._formParam.options(proxy.order);
        popupUtil.hideAll();
      }
    }

    return {
      title,
      highlightName,
      fetchProvinces,
      hideProvinceList,
      startSearchingProvince,
      selectProvince,
      startSearchingDistrict,
      fetchDistricts,
      hideDistrictList,
      resetProvince,
      resetDistrict,
      resetWard,
      startSearchingWard,
      hideWardList,
      fetchWards,
      selectDistrict,
      selectWard,
      searchDistrictOnTyping,
      searchProvinceOnTyping,
      searchDistrict,
      markRequireAll,
      searchProvince,
      searchWard,
      searchWardOnTyping,
      nextStep,
      validateForm,
    };
  },
};
</script>

<style lang="scss" scoped>
.address-order {
  .modal-content {
    width: 750px;
  }
}
</style>
