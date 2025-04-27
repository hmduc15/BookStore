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
                        <h1 class="text-primary reset-pw">Account De-activate</h1>
                        <p>Enter your details to de-activate your account</p>
                        <div class="form-group me-3">
                            <label class="form-label" for="email01">Email</label>
                            <input type="email" class="form-control mb-0" id="email01" placeholder="Enter Email">
                        </div>
                        <div class="form-group me-3">
                            <label class="form-label" for="username01">Username</label>
                            <input type="email" class="form-control mb-0" id="username01" placeholder="Enter Username">
                        </div>
                        <b-button type="button" variant="primary" class="w-100">De-activate</b-button>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script setup>
import Logo from "@/components/partials/logo.vue"
</script>