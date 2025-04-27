<template>
    <div class="login-content">
        <b-container>
            <b-row class="d-flex align-items-center justify-content-center vh-100 w-100 m-0">
                <b-col lg="5" md="12" class="align-self-center bg-primary py-3">
                    <b-card class="p-0 m-0" body-class="auth-card">
                        <div class="logo-img">
                            <router-link to="/"
                                class="navbar-brand d-flex align-items-center mb-4 justify-content-center">
                                <Logo className="auth-logo" :isFluid='false' />
                            </router-link>
                        </div>
                        <img src="/assets/images/avatars/1.jpg" class="rounded avatar-80 mb-3" alt="">
                        <h2 class="mb-2">Hi ! Ruben Dokidis</h2>
                        <p>Enter Your Password To Access The Admin.</p>
                        <form>
                            <b-row>
                                <col>
                                <div class="floating-label form-group">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="password"
                                        aria-describedby="password" placeholder=" ">
                                </div>
                                </col>
                            </b-row>
                            <router-link to="/auth/sign-in" class="btn btn-primary w-100">Login</router-link>
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