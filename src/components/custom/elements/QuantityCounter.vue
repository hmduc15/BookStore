<template>
  <div class="btn-group iq-qty-btn" data-qty="btn" role="group">
    <button
      type="button"
      class="btn btn-sm btn-outline-light iq-quantity-minus"
      @click="decrement"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="6"
        height="3"
        viewBox="0 0 6 3"
        fill="none"
      >
        <path
          d="M5.22727 0.886364H0.136364V2.13636H5.22727V0.886364Z"
          fill="currentColor"
        ></path>
      </svg>
    </button>
    <input
      v-model="newValue"
      type="text"
      class="btn btn-sm btn-outline-light input-display"
      data-qty="input"
      title="Qty"
      readonly
    />
    <button
      type="button"
      class="btn btn-sm btn-outline-light iq-quantity-plus"
      @click="increment"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="9"
        height="8"
        viewBox="0 0 9 8"
        fill="none"
      >
        <path
          d="M3.63636 7.70455H4.90909V4.59091H8.02273V3.31818H4.90909V0.204545H3.63636V3.31818H0.522727V4.59091H3.63636V7.70455Z"
          fill="currentColor"
        ></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["update:modelValue", "changeQuantity"]);

const newValue = ref(props.modelValue);

const decrement = () => {
  if (newValue.value > 1) {
    newValue.value -= 1;
  }
};

const increment = () => {
  newValue.value += 1;
};

watch(newValue, (newVal) => {
  emit("update:modelValue", newVal);
});
</script>

<style lang="scss" scoped></style>
