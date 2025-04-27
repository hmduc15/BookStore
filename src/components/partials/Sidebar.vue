<template>
  <aside
    :class="`sidebar sidebar-base ${sidebarType.join(
      ' '
    )} ${sidebarColor} ${sidebarMenuStyle}`"
    data-toggle="main-sidebar"
    id=" first-tour"
  >
    <div
      class="sidebar-header d-flex align-items-center justify-content-start position-relative"
    >
      <template v-if="context.isAdmin">
        <router-link to="/admin/dashboard" class="navbar-brand">
          <Logo :isFluid="true" />
        </router-link>
      </template>
      <template v-else>
        <router-link to="/" class="navbar-brand">
          <Logo :isFluid="true" />
        </router-link>
      </template>
      <div class="sidebar-toggle" @click="toggleSidebarMini">
        <i class="icon">
          <svg
            class="icon-20 icon-arrow"
            width="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5 19L8.5 12L15.5 5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </i>
      </div>
    </div>
    <div class="sidebar-body pt-0 pb-3 data-scrollbar">
      <div class="sidebar-list">
        <VerticalNav />
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from "vue";
import VerticalNav from "./VerticalNav.vue";
import Logo from "./logo.vue";
import { useSetting } from "@/store/pinia/module/useSetting";
import { moduleContext } from "@/store/pinia/store";

const generateImgPath = (path) => {
  return window.origin + import.meta.env.BASE_URL + path;
};

const context = moduleContext().getContext;

// Store
const store = useSetting();
const sidebarType = computed(() => store.sidebar_type_value);

const sidebarColor = computed(() => store.sidebar_color_value);
const sidebarMenuStyle = computed(() => store.sidebar_menu_style_value);

const toggleSidebarMini = () => {
  if (sidebarType.value.includes("sidebar-mini")) {
    store.sidebar_type([]);
  } else {
    store.sidebar_type(["sidebar-mini"]);
  }
};
</script>
