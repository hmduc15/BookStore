<template>
  <router-view />
  <MLoading></MLoading>
  <modals-container></modals-container>
</template>

<script setup>
import { onMounted } from "vue";
import { useSetting } from "./store/pinia/module/useSetting";

const store = useSetting();

onMounted(() => {
  store.setSetting();
});
</script>
