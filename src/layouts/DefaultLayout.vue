<template>
  <div class="wrapper">
    <Sidebar></Sidebar>
    <main class="main-content">
      <div class="position-sticky top-0 z-3">
        <Header></Header>
      </div>
      <div :class="`content-inner ${pageLayout} pb-0`" id="page_layout">
        <router-view></router-view>
      </div>
      <Footer></Footer>
    </main>
    <setting-offcanvas></setting-offcanvas>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import Sidebar from "@/components/partials/Sidebar.vue";
import Footer from "@/components/partials/Footer.vue";
import SettingOffcanvas from "@/components/setting/SettingOffcanvas.vue";
import Header from "@/components/partials/Header.vue";
import { useContextStorage } from "@/composables/useContextStorage";
import { moduleContext } from "@/store/pinia/store";
import orderApi from "@/api/Business/orderApi";

// Pinia Store
import { useSetting } from "@/store/pinia/module/useSetting";

const store = useSetting();
const pageLayout = computed(() => store.page_layout_value);

const { getSoureContextStorage } = useContextStorage();
let cxtObj = getSoureContextStorage("session_context");
if (cxtObj && cxtObj.access_token) {
  moduleContext().setContext(cxtObj);
}

// await orderApi.updateOrderStatusJob();
onMounted(async () => {
  const context = moduleContext().getContext;
  const isAdmin = context?.isAdmin ?? false; // Safely access isAdmin with fallback
  if (!isAdmin) {
    try {
    } catch (ex) {
      console.error("Failed to update order status:", ex);
    }
  }
});
</script>
