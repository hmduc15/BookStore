<template>
  <input
    type="text"
    ref="autoNumericRef"
    @blur="handleBlur"
    class="form-control"
    :placeholder="Placeholder"
  />
  <div v-if="hasError" class="error">{{ errorMessage }}</div>
</template>

<script>
import AutoNumeric from "autonumeric/dist/autoNumeric.min";

export default {
  name: "AutoNumericVue",

  props: {
    modelValue: { required: true, default: null },
    options: { type: Object, default: () => ({}) },
    Placeholder: { type: String, default: "" },
    required: { type: Boolean, default: false },
  },

  data: () => ({
    anElement: null,
    hasError: false,
    errorMessage: "",
  }),

  watch: {
    modelValue(newVal) {
      if (this.anElement) {
        // Chỉ cập nhật nếu giá trị thực sự thay đổi
        if (newVal !== this.anElement.getNumber()) {
          this.anElement.set(newVal);
        }
      }
    },
    options: {
      deep: true,
      handler(newOptions) {
        if (this.anElement) {
          this.anElement.update(newOptions);
        }
      },
    },
  },

  methods: {
    handleBlur(event) {
      const rawValue = this.anElement.getNumber();
      this.$emit("update:modelValue", rawValue);
      this.$emit("blur", event);
      this.validate();
    },

    validate() {
      const value = this.anElement ? this.anElement.getNumber() : null;
      const isEmpty = value === null || value === "" || isNaN(value);

      if (this.required && isEmpty) {
        this.hasError = true;
        this.errorMessage = `${this.Placeholder} không được để trống.`;
      } else {
        this.hasError = false;
        this.errorMessage = "";
      }

      return this.hasError;
    },

    initAutoNumeric() {
      if (this.anElement) {
        this.anElement.remove();
      }

      this.anElement = new AutoNumeric(
        this.$refs.autoNumericRef,
        this.modelValue,
        this.options
      );

      // Thiết lập sự kiện khi giá trị thay đổi
      this.$refs.autoNumericRef.addEventListener(
        "autoNumeric:rawValueModified",
        (event) => {
          const newValue = this.anElement.getNumber();
          this.$emit("update:modelValue", newValue);
        }
      );
    },
  },

  mounted() {
    this.initAutoNumeric();
  },

  beforeUnmount() {
    if (this.anElement) {
      this.anElement.remove();
    }
  },
};
</script>

<style lang="scss" scoped>
.error {
  color: red;
  font-size: 0.8em;
}
</style>
