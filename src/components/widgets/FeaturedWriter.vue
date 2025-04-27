<template>
  <b-card no-body class="rounded-3 mb-0">
    <b-card-header class="d-flex justify-content-between align-items-center position-relative mb-0">
      <div class="iq-header-title">
        <h4 class="mb-0">{{ title }}</h4>
      </div>
      <div class="dropdown">
        <button class="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"
          style="background-color: transparent; border: none;">
          This Week
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item d-flex align-items-center gap-1" href="#"><i class="ph ph-eye mr-2"></i> View</a>
          </li>
          <li><a class="dropdown-item d-flex align-items-center gap-1" href="#"><i class="ph ph-trash mr-2"></i>
              Delete</a></li>
          <li><a class="dropdown-item d-flex align-items-center gap-1" href="#"><i class="ph ph-pencil-simple mr-2"></i>
              Edit</a></li>
          <li><a class="dropdown-item d-flex align-items-center gap-1" href="#"><i class="ph ph-printer mr-2"></i>
              Print</a></li>
          <li><a class="dropdown-item d-flex align-items-center gap-1" href="#"><i
                class="ph ph-file-arrow-down mr-2"></i> Download</a>
          </li>
        </ul>
      </div>
    </b-card-header>
    <div class="card-body">
      <div class="row mb-0 align-items-center overflow-auto" style="max-height: 380px;">
        <div v-for="(writer, index) in writers" :key="index" class="col-sm-6 d-flex mb-3 align-items-center">
          <a href="javascript:void(0);" class="me-3">
            <img :src="generateImgPath(writer.image)" alt="" class="img-fluid avatar-60 rounded-circle">
          </a>
          <div class="mt-1">
            <h6 class="mb-0">{{ writer.name }}</h6>
            <small class="mb-0">Publish Books: <b>{{ writer.publishBooks }}</b></small>
          </div>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script setup>

const generateImgPath = (path) => {
  return window.origin + import.meta.env.BASE_URL + path;
};

const props = defineProps({
  title: {
    type: String,
    default: 'Featured Writer'
  },
  writers: {
    type: Array,
    required: true
  }
});
</script>