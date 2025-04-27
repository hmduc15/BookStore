<template>
    <div class="login-content">
        <b-container>
            <b-row class="d-flex align-items-center justify-content-center vh-100 w-100 m-0">
                <b-col lg="5" md="12" class="align-self-center bg-primary py-3">
                    <b-card class="p-0 m-0" body-class="auth-card">
                        <div class="logo-img">
                            <router-link to="/"
                                class="navbar-brand d-flex align-items-center justify-content-center mb-2">
                                <Logo className="auth-logo" :isFluid='false' />
                            </router-link>
                        </div>
                        <h1 class="reset-pw text-primary">Reset Password</h1>
                        <p class="mb-5 auth-desc"> Enter your email address and we'll send you an email with
                            instructions to reset
                            your password. </p>
                        <form method="post">
                            <div class="custom-form-field">
                                <input type="email" name="email" class="form-control mb-3 mb-md-5" placeholder="Email *"
                                    required>
                            </div>
                            <b-button variant="primary" type="button" class=" w-100">
                                <span class="btn-inner d-flex align-items-center justify-content-center gap-2">
                                    <span class="d-inline-block align-middle">Reset
                                        Password</span>{{ '' }}
                                        <i class="ph ph-plus custom-ph-icons"></i>
                                </span>
                            </b-button>
                        </form>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script setup>
import Logo from "@/components/partials/logo.vue"
</script>