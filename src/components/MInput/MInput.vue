<template>
  <div class="v-input" :class="['d-flex flex-column']">
    <label class="label pb-2 fw-bold" v-if="label">{{ label }}</label>
    <div
      :class="[
        'textfield-input',
        Invalid || hasError ? 'invalid' : '',
        Disable ? 'disabled' : '',
        Type == 'password' ? 'relative' : '',
      ]"
    >
      <input
        ref="input"
        v-bind="$attrs"
        :type="Type"
        name=""
        :id="Id"
        :placeholder="Placeholder"
        :value="internalText"
        :disabled="Disable"
        @input="handleInput"
        @blur="handleBlur"
        :rule="rule"
        required
        class="form-control"
      />
    </div>
    <div v-if="hasError" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { ref, watch, onMounted, getCurrentInstance } from "vue";
import { mFormat } from "@/common/mFomat";
import commonFuntion from "@/common/commonFuntion";

export default {
  name: "MInput",
  props: {
    Id: String,
    Placeholder: String,
    modelValue: [String, Number],
    Clicked: Boolean,
    Invalid: Boolean,
    Disable: Boolean,
    Type: {
      type: String,
      default: "text",
    },
    required: Boolean,
    rule: String,
    label: {
      type: String,
      default: null,
    },
  },
  emits: ["update:modelValue", "onBlurEvent", "validateError"],
  inheritAttrs: false,
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const input = ref(null);
    const isHidePassword = ref(true);
    const hasError = ref(false);
    const errorMessage = ref("");
    const internalText = ref(props.modelValue || "");

    // Đồng bộ giá trị từ prop xuống
    watch(
      () => props.modelValue,
      (newVal) => {
        if (newVal !== internalText.value) {
          if (props.rule == "date") {
            newVal = mFormat.formatDate(newVal);
          }
          internalText.value = newVal || "";
        }
      }
    );

    // Đồng bộ giá trị từ input lên
    const handleInput = (event) => {
      let value = event.target.value;
      if (props.rule == "number") {
        value = mFormat.formatAmount(value);
      }
      internalText.value = value;
      emit("update:modelValue", value);

      if (value) {
        hasError.value = false;
        errorMessage.value = "";
      }
    };

    const handleBlur = (event) => {
      emit("onBlurEvent", event.target.id);
      validate();
    };

    const validate = () => {
      if (props.required && !internalText.value?.trim()) {
        hasError.value = true;
        errorMessage.value = `${
          props.label ? props.label : props.Placeholder
        } không được để trống.`;
        return true;
      }

      if (props.rule === "password" && internalText.value?.trim()) {
        const validPwd = commonFuntion.validatePassword(internalText.value);
        if (!validPwd) {
          hasError.value = true;
          errorMessage.value = `${props.Placeholder} phải đúng định dạng có ít nhất 8 kí tự, chữ cái in hoa và kí tự đặc biệt.`;
          return true;
        }
      }

      hasError.value = false;
      errorMessage.value = "";
      return false;
    };

    const focus = () => {
      input.value?.focus();
    };

    onMounted(() => {
      if (props.Clicked) {
        focus();
      }
    });

    return {
      input,
      isHidePassword,
      hasError,
      errorMessage,
      internalText,
      handleInput,
      handleBlur,
      validate,
      focus,
    };
  },
};
</script>

<style scoped>
@import url(./MInput.css);

.error {
  color: red;
  font-size: 0.8em;
  margin-top: 5px;
}
.textfield-input.invalid input {
  border-color: red;
}
.textfield-input.disabled input {
  background-color: #f0f0f0;
  cursor: not-allowed;
}
</style>
