<template>
    <div class="comingsoon">
        <b-container>
            <div class="row justify-content-center">
                <div class="text-center">
                    <div class="comingsoon-info">
                        <router-link to="/" class="navbar-brand d-flex align-items-center mb-2 justify-content-center">
                            <Logo :isFluid="false" className="auth-logo" />
                        </router-link>
                        <h2 class="mt-5 mb-2">Stay tunned, we're launching very soon</h2>
                        <p class="mt-3 fs-5">We are working very hard to give you the best experience possible!</p>
                        <ul ref="element" class="countdown d-flex align-items-center list-inline row" countdown
                            data-date="Feb 28 2025 20:20:22">
                            <li class="col-md-6 col-lg-3">
                                <b-card no-body>
                                    <div class="card-body"><span data-days>0</span>
                                        Days
                                    </div>
                                </b-card>
                            </li>
                            <li class="col-md-6 col-lg-3">
                                <b-card no-body>
                                    <div class="card-body"><span data-hours>0</span>Hours
                                    </div>
                                </b-card>
                            </li>
                            <li class="col-md-6 col-lg-3">
                                <b-card no-body>
                                    <div class="card-body"><span data-minutes>0</span>Minutes
                                    </div>
                                </b-card>
                            </li>
                            <li class="col-md-6 col-lg-3">
                                <b-card no-body>
                                    <div class="card-body"><span data-seconds>0</span>Seconds
                                    </div>
                                </b-card>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <b-row class="justify-content-center">
                <b-col lg="4" md="8">
                    <form class=" mt-5 mx-4 mx-md-0">
                        <div class="form-group d-flex">
                            <input id="exampleInputEmail1" type="email"
                                class="form-control mb-0 shadow rounded-0 border-end-0"
                                placeholder="Enter email address" />
                            <b-button type="submit" variant="primary">Subscribe</b-button>
                        </div>
                    </form>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useCountdown } from '@/utilities/countdown';
const element = ref(null);
onMounted(() => useCountdown(element.value));
</script>
