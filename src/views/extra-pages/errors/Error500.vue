<template>
    <b-container class="p-0">
        <b-row class="vh-100">
            <b-col class="text-center align-self-center">
                <div class="error position-relative">
                    <img src="/assets/images/error/500.png" alt="" class="img-fluid error-img">
                    <h1 class="text-in-box">500</h1>
                    <h2 class="mb-0">Oops! This Page is Not Working.</h2>
                    <p class="fs-5">The requested is Internal Server Error.</p>
                    <router-link class="btn btn-primary mt-3" to="/">
                        <div class="d-flex align-items-center"><i class="ph ph-house-line me-2"></i>
                            <p class="mb-0">Back to Home</p>
                        </div>
                    </router-link>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>