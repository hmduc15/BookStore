<template>
  <div :class="`logo-main ${className}`">
    <img
      :class="['logo-normal', { 'img-fluid': isFluid }]"
      src="/assets/images/logo.jpg"
      height="30"
      alt="logo"
    />
    <img
      :class="['logo-color', { 'img-fluid': isFluid }]"
      src="/assets/images/logo-white.png"
      height="30"
      alt="logo"
    />
    <img
      :class="['logo-mini', { 'img-fluid': isFluid }]"
      src="/assets/images/logo.jpg"
      height="30"
      alt="logo"
    />
    <img
      :class="['logo-mini-white', { 'img-fluid': isFluid }]"
      src="/assets/images/logo-mini-white.png"
      height="30"
      alt="logo"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  className: { type: String, default: "" },
  isFluid: { type: Boolean, default: false },
});
</script>
