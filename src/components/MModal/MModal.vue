<template>
  <vue-final-modal
    :v-model="true"
    :classes="
      isCenter
        ? 'modal-container-center'
        : 'modal-container' + (dockPosition ? 'docked ' : '') + classDetail
    "
    class="modal-popup"
    overlay-transition="vfm-fade"
    v-slot="{ close }"
    content-transition="vfm-slide-down"
    content-class="modal-content"
    @closed="onClosed"
    :click-to-close="false"
    :content-style="styles"
    :transition="{
      'enter-active-class': '.3s cubic-bezier(.25,.8,.25,1)',
      'enter-class': 'translate-y-full',
      'enter-to-class': 'translate-y-0',
      'leave-active-class': 'transition duration-200 ease-in-out transform',
      'leave-to-class': 'translate-y-full',
      'leave-class': 'translate-y-0',
    }"
    :min-width="600"
    :min-height="600"
    :drag="false"
  >
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title">{{ title }}</div>
      </div>
      <slot name="content"></slot>
      <div class="modal-footer">
        <template v-if="isCenter">
          <button @click="closeModal(close)" :close="close">Đóng</button>
          <b-button
            variant="primary"
            type="button"
            class=""
            v-if="showConfirm"
            @click="confirm"
            >{{ txtBtnConfirm }}</b-button
          >
        </template>
        <template v-else>
          <slot name="footer" @click="closeModal" :close="closeModal"></slot>
        </template>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import { getCurrentInstance, ref, computed } from "vue";
export default {
  name: "MModal",
  components: {},
  props: {
    title: {
      type: String,
      default: "Modal Title",
    },
    message: {
      type: String,
      default: "This is a modal message.",
    },
    showConfirm: {
      type: Boolean,
      default: false,
    },
    dockPosition: {
      type: String,
      default: null,
    },
    txtBtnConfirm: {
      type: String,
      default: "Đồng ý",
    },
    width: {
      type: Number,
      default: 600,
    },
    height: {
      type: Number,
      default: 0,
    },
    isCenter: {
      type: Boolean,
      default: true,
    },
    classDetail: {
      type: String,
      default: "",
    },
    styles: {
      type: String,
      default: "width: 100vh",
    },
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    let showModal = ref(true);

    function closeModal(close) {
      close();
      emit("closeModal");
    }

    /**
     * Emit ra ngoaài cho component cha handle
     */
    function confirm() {
      emit("confirmClick");
    }
    const styles = computed(() => {
      let style = {};
      if (!props.isCenter) {
        style.height = "100vh";
      } else {
        if (props.width) style.width = `${props.width}px`;

        if (props.height) style.height = `${props.height}px`;
      }
      return style;
    });

    return {
      confirm,
      styles,
      closeModal,
    };
  },
};
</script>

<style scoped lang="scss">
.modal-title {
  font-weight: 700;
  font-size: 15px;
}

:deep(.modal-container-center) {
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.modal-container) {
  &.docked {
    justify-content: unset;
  }
}

.modal-content {
  background: white;
  padding: 20px 20px 0 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 100%;
  max-width: 100%;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 10px 0;
}

button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:first-child {
  background-color: #ccc;
}

// button:last-child {
//   background-color: #007bff;
//   color: white;
// }

/* Transition tùy chỉnh */
.vfm-fade-enter-active,
.vfm-fade-leave-active {
  transition: opacity 0.3s;
}

.vfm-fade-enter-from,
.vfm-fade-leave-to {
  opacity: 0;
}

.vfm-slide-down-enter-active,
.vfm-slide-down-leave-active {
  transition: transform 0.3s;
}

.vfm-slide-down-enter-from,
.vfm-slide-down-leave-to {
  transform: translateY(-100%);
}
</style>
