<template>
  <div class="pagination-container d-flex gap-3">
    <!-- Items per page selection -->
    <div class="items-per-page-selector">
      <select
        v-model="localItemsPerPage"
        class="form-select form-select-sm"
        @change="handleItemsPerPageChange"
      >
        <option
          v-for="option in itemsPerPageOptions"
          :value="option"
          :key="option"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <!-- Pagination -->
    <nav aria-label="Page navigation">
      <ul class="pagination mb-0">
        <!-- Previous Page -->
        <li class="page-item" :class="{ disabled: internalCurrentPage === 1 }">
          <a class="page-link" href="#" @click.prevent="goToPrevPage">
            <span aria-hidden="true">«</span>
          </a>
        </li>

        <!-- Page Numbers -->
        <template v-for="page in displayedPages" :key="page">
          <li v-if="page === '...'" class="page-item disabled">
            <span class="page-link">...</span>
          </li>
          <li
            v-else
            class="page-item"
            :class="{ active: page === internalCurrentPage }"
          >
            <a class="page-link" href="#" @click.prevent="goToPage(page)">
              {{ page }}
            </a>
          </li>
        </template>

        <!-- Next Page -->
        <li
          class="page-item"
          :class="{ disabled: internalCurrentPage === totalPages }"
        >
          <a class="page-link" href="#" @click.prevent="goToNextPage">
            <span aria-hidden="true">»</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
  initialPage: {
    type: Number,
    default: 1,
  },
  maxVisibleButtons: {
    type: Number,
    default: 5,
  },
  itemsPerPageOptions: {
    type: Array,
    default: () => [5, 10, 20, 50, 100],
  },
});

// Sử dụng internalCurrentPage thay vì props.currentPage
const internalCurrentPage = ref(props.initialPage);
const localItemsPerPage = ref(props.itemsPerPage);

// Tính tổng số trang
const totalPages = computed(() =>
  Math.ceil(props.totalItems / localItemsPerPage.value)
);

// Tạo danh sách trang hiển thị
const displayedPages = computed(() => {
  const pages = [];
  const half = Math.floor(props.maxVisibleButtons / 2);
  let start = Math.max(1, internalCurrentPage.value - half);
  let end = Math.min(totalPages.value, start + props.maxVisibleButtons - 1);

  if (end - start + 1 < props.maxVisibleButtons) {
    start = Math.max(1, end - props.maxVisibleButtons + 1);
  }

  if (start > 1) {
    pages.push(1);
    if (start > 2) {
      pages.push("...");
    }
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages.value) {
    if (end < totalPages.value - 1) {
      pages.push("...");
    }
    pages.push(totalPages.value);
  }

  return pages;
});

// Các hàm xử lý chuyển trang
const goToPage = (page) => {
  if (page !== "..." && page !== internalCurrentPage.value) {
    internalCurrentPage.value = page;
  }
};

const goToPrevPage = () => {
  if (internalCurrentPage.value > 1) {
    internalCurrentPage.value--;
  }
};

const goToNextPage = () => {
  if (internalCurrentPage.value < totalPages.value) {
    internalCurrentPage.value++;
  }
};

// Xử lý khi thay đổi items per page
const handleItemsPerPageChange = () => {
  // Reset về trang đầu tiên khi thay đổi items per page
  internalCurrentPage.value = 1;
};
</script>

<style scoped>
.form-select {
  width: auto;
  display: inline-block;
}
</style>
