<template>
  <b-container class="p-0">
    <b-row class="vh-100 justify-content-center">
      <b-col class="text-center align-self-center">
        <div class="error position-relative">
          <img
            src="/assets/images/error/404.png"
            alt=""
            class="img-fluid error-img"
          />
          <h2 class="mb-0 mt-5">Oops! Không tìm thấy trang</h2>
          <p class="fs-5">
            Đường dẫn đang truy cập đã bị thay đổi hoặc không tồn tại.
          </p>
          <router-link class="btn btn-primary mt-3" to="/">
            <div class="d-flex align-items-center">
              <i class="ph ph-house-line me-2"></i>
              <p class="mb-0">Back to Home</p>
            </div>
          </router-link>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>
