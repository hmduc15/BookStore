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
    <!-- <setting-offcanvas></setting-offcanvas> -->
    <df-messenger
      v-if="!isAdmin"
      intent="WELCOME"
      chat-title="BookStoreChatBot"
      agent-id="c549640a-0708-40a0-ad8d-3928ccbb5a53"
      language-code="vi"
    ></df-messenger>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import Sidebar from "@/components/partials/Sidebar.vue";
import Footer from "@/components/partials/Footer.vue";
import SettingOffcanvas from "@/components/setting/SettingOffcanvas.vue";
import Header from "@/components/partials/Header.vue";
import { useContextStorage } from "@/composables/useContextStorage";
import { moduleContext } from "@/store/pinia/store";
// import orderApi from "@/api/Business/orderApi";
import { useSetting } from "@/store/pinia/module/useSetting";

export default {
  name: "DefaultLayout",
  components: {
    Sidebar,
    Footer,
    SettingOffcanvas,
    Header,
  },
  setup() {
    // Pinia Store
    const store = useSetting();
    const pageLayout = computed(() => store.page_layout_value);

    const { getSoureContextStorage } = useContextStorage();
    let cxtObj = getSoureContextStorage("session_context");
    if (cxtObj && cxtObj.access_token) {
      moduleContext().setContext(cxtObj);
    }
    const isAdmin = moduleContext().getContext.isAdmin;
    return {
      pageLayout,
      isAdmin,
    };
  },
  created() {
    // orderApi.updateOrderStatusJob();
  },
};
</script>
