<template>
  <div class="vl-parent" id="m-loading">
    <Loading
      v-model:active="isLoading"
      :can-cancel="false"
      :is-full-page="fullPage"
      :color="'#0DD6B8'"
      loader="dots"
    />
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { ref } from "vue";
export default {
  name: "MLoading",
  components: {
    Loading,
  },
  setup() {
    const isLoading = ref(true);
    const fullPage = ref(true);
    return {
      isLoading,
      fullPage,
    };
  },
};
</script>
