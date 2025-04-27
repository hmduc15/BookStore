<template>
  <div class="login-content">
    <b-container>
      <b-row
        class="d-flex align-items-center justify-content-center vh-100 w-100 m-0"
      >
        <b-col lg="5" md="12" class="align-self-center bg-primary py-3">
          <b-card class="p-0 m-0" body-class="auth-card">
            <div class="logo-img">
              <router-link
                to="/"
                class="navbar-brand d-flex align-items-center mb-5 justify-content-center"
              >
                <Logo className="auth-logo" :isFluid="false" />
              </router-link>
            </div>
            <img
              src="/assets/images/avatars/1.jpg"
              class="rounded avatar-80 mb-3"
              alt=""
            />
            <h1 class="text-primary reset-pw">Two Factor -Verification</h1>
            <p>
              Enter your email address and we’ll send you an email with
              instructions to reset your password
            </p>
            <div class="form-group me-3">
              <label class="form-label" for="otp01"
                >Enter the OTP you recieved to veify your device</label
              >
              <input
                type="email"
                class="form-control mb-0"
                id="otp01"
                placeholder="Enter OTP"
              />
            </div>
            <b-button type="button" variant="primary" class="w-100"
              >Verify</b-button
            >
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script setup>
import Logo from "@/components/partials/logo.vue";
</script>
