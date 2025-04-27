<template>
    <b-row>
        <b-col lg="4">
            <b-card>
                <b-card-header class="mb-0">
                    <div class="text-center">
                        <img src="/assets/images/avatars/1.jpg" alt="" class="img-fluid rounded-circle">
                        <div class="mt-3 profile-detail">
                            <h3>Barry Tech</h3>
                            <p class="text-primary">Web designer</p>
                            <p>Phasellus faucibus mollis pharetra. Proin blandit ac massa. Morbi nulla dolor, ornare
                                at commodo non,
                                feugiat non nisi.</p>
                        </div>
                        <div class="social d-flex align-items-center justify-content-center">
                            <ul class="list-inline d-flex gap-2 p-0 mb-0 align-items-center social-icons">
                                <li>
                                    <router-link to="#" class="avatar-40 rounded-circle bg-primary facebook">
                                        <i class="fa fa-facebook " aria-hidden="true"></i>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="#" class="avatar-40 rounded-circle bg-primary twitter">
                                        <i class="fa fa-twitter" aria-hidden="true"></i>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="#" class="avatar-40 rounded-circle bg-primary youtube">
                                        <i class="fa fa-youtube-play" aria-hidden="true"></i>
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="#" class="avatar-40 rounded-circle bg-primary pinterest">
                                        <i class="fa fa-pinterest-p" aria-hidden="true"></i>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </b-card-header>
            </b-card>

            <b-card no-body>
                <b-card-header class="mb-0">
                    <b-card-title>
                        <h4>Personal Details</h4>
                    </b-card-title>
                </b-card-header>
                <b-card-body>
                    <ul class="list-inline">
                        <li>
                            <b-row class="mb-3">
                                <b-col sm="6">
                                    <h6 class="mb-0">Birthday</h6>
                                </b-col>
                                <b-col sm="6">
                                    <p class="mb-0">3rd March</p>
                                </b-col>
                            </b-row>
                        </li>
                        <li>
                            <b-row class="mb-3">
                                <b-col sm="6">
                                    <h6 class="mb-0">Address</h6>
                                </b-col>
                                <b-col sm="6">
                                    <p class="mb-0">Landon</p>
                                </b-col>
                            </b-row>
                        </li>
                        <li>
                            <b-row class="mb-3">
                                <b-col sm="6">
                                    <h6 class="mb-0">Phone</h6>
                                </b-col>
                                <b-col sm="6">
                                    <p class="mb-0">(010)987 543 201</p>
                                </b-col>
                            </b-row>
                        </li>
                        <li>
                            <b-row class="mb-3">
                                <b-col sm="6">
                                    <h6 class="mb-0">Email</h6>
                                </b-col>
                                <b-col sm="6">
                                    <p class="mb-0">Barry@example.com</p>
                                </b-col>
                            </b-row>
                        </li>
                        <li>
                            <b-row class="mb-3">
                                <b-col sm="6">
                                    <h6 class="mb-0">Twitter</h6>
                                </b-col>
                                <b-col sm="6">
                                    <p class="mb-0">@Barry</p>
                                </b-col>
                            </b-row>
                        </li>
                        <li>
                            <b-row>
                                <b-col sm="6">
                                    <h6 class="mt-1">Facebook</h6>
                                </b-col>
                                <b-col sm="6">
                                    <p class="mb-0">@Barry_Tech</p>
                                </b-col>
                            </b-row>
                        </li>
                    </ul>
                </b-card-body>
            </b-card>

            <b-card no-body>
                <b-card-header class="mb-0">
                    <b-card-title class="mb-0">
                        <h4>Skill Progress</h4>
                    </b-card-title>
                </b-card-header>
                <b-card-body>
                    <ul class="list-inline">
                        <li>
                            <div class="d-flex align-items-center justify-content-between mb-3">
                                <h6 class="mb-0">Adventure</h6>
                                <b-progress class="d-flex-block w-50" :max="0" style="height:5px;">
                                    <b-progress-bar :value="Revenue6"></b-progress-bar>
                                </b-progress>
                            </div>
                        </li>
                        <li>
                            <div class="d-flex align-items-center justify-content-between mb-3">
                                <h6 class="mb-0">Horror</h6>
                                <b-progress class="d-flex-block w-50" :max="0" style="height:5px;">
                                    <b-progress-bar variant="danger" :value="Revenue7"></b-progress-bar>
                                </b-progress>
                            </div>
                        </li>
                        <li>
                            <div class="d-flex align-items-center justify-content-between mb-3">
                                <h6 class="mb-0">Comic Book</h6>
                                <b-progress class="d-flex-block w-50" :max="0" style="height:5px;">
                                    <b-progress-bar variant="info" :value="Revenue8"></b-progress-bar>
                                </b-progress>
                            </div>
                        </li>
                        <li>
                            <div class="d-flex align-items-center justify-content-between mb-3">
                                <h6 class="mb-0">Adventure</h6>
                                <b-progress class="d-flex-block w-50" :max="0" style="height:5px;">
                                    <b-progress-bar :value="Revenue9"></b-progress-bar>
                                </b-progress>
                            </div>
                        </li>

                    </ul>
                </b-card-body>
            </b-card>
        </b-col>

        <b-col lg="8">
            <b-row>
                <b-col md="6">
                    <b-card no-body>
                        <b-card-header class="mb-0">
                            <b-card-title class="mb-0">
                                <h4>Latest Uploads</h4>
                            </b-card-title>
                        </b-card-header>
                        <b-card-body>
                            <ul class="list-inline mb-0">
                                <li class="d-flex mb-4 align-items-center">
                                    <div class="profile-icon bg-secondary">
                                        <span>
                                            <i class="ph ph-file"></i>
                                        </span>
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <h6 class="mb-0">Documentation</h6>
                                        <p class="mb-0">48kb</p>
                                    </div>
                                    <div>
                                        <div class="dropdown">
                                            <span type="button" data-bs-toggle="dropdown" aria-expanded="false"
                                                style="background-color: transparent; border: none;">
                                                <i class="ph ph-dots-three"></i>
                                            </span>
                                            <ul class="dropdown-menu dropdown-menu-end ">
                                                <li><a class="dropdown-item d-flex align-items-center gap-2" href="#"><i
                                                            class="ph ph-share-fat"></i> Share</a></li>
                                                <li><a class="dropdown-item d-flex align-items-center gap-2" href="#"><i
                                                            class="ph ph-x-circle"></i>
                                                        Delete</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>

                                <li class="d-flex mb-4 align-items-center">
                                    <div class="profile-icon bg-secondary">
                                        <span>
                                            <i class="ph ph-image-square"></i>
                                        </span>
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <h6 class="mb-0">Images</h6>
                                        <p class="mb-0">204kb</p>
                                    </div>
                                    <div>
                                        <div class="dropdown">
                                            <span type="button" data-bs-toggle="dropdown" aria-expanded="false"
                                                style="background-color: transparent; border: none;">
                                                <i class="ph ph-dots-three"></i>
                                            </span>
                                            <ul class="dropdown-menu dropdown-menu-end">
                                                <li><a class="dropdown-item d-flex align-items-center gap-2" href="#"><i
                                                            class="ph ph-share-fat"></i> Share</a></li>
                                                <li><a class="dropdown-item d-flex align-items-center gap-2" href="#"><i
                                                            class="ph ph-x-circle"></i>
                                                        Delete</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>

                                <li class="d-flex mb-4 align-items-center">
                                    <div class="profile-icon bg-secondary">
                                        <span>
                                            <i class="ph ph-video"></i>
                                        </span>
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <h6 class="mb-0">Videos</h6>
                                        <p class="mb-0">509kb</p>
                                    </div>
                                    <div>
                                        <div class="dropdown">
                                            <span type="button" data-bs-toggle="dropdown" aria-expanded="false"
                                                style="background-color: transparent; border: none;">
                                                <i class="ph ph-dots-three"></i>
                                            </span>
                                            <ul class="dropdown-menu dropdown-menu-end">
                                                <li><a class="dropdown-item d-flex align-items-center gap-2" href="#"><i
                                                            class="ph ph-share-fat"></i> Share</a></li>
                                                <li><a class="dropdown-item d-flex align-items-center gap-2" href="#"><i
                                                            class="ph ph-x-circle"></i>
                                                        Delete</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>

                                <li class="d-flex mb-4 align-items-center">
                                    <div class="profile-icon bg-secondary">
                                        <span>
                                            <i class="ph ph-file-magnifying-glass"></i>
                                        </span>
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <h6 class="mb-0">Resources</h6>
                                        <p class="mb-0">48kb</p>
                                    </div>
                                    <div>
                                        <div class="dropdown">
                                            <span type="button" data-bs-toggle="dropdown" aria-expanded="false"
                                                style="background-color: transparent; border: none;">
                                                <i class="ph ph-dots-three"></i>
                                            </span>
                                            <ul class="dropdown-menu dropdown-menu-end">
                                                <li><a class="dropdown-item d-flex align-items-center gap-2" href="#"><i
                                                            class="ph ph-share-fat"></i> Share</a></li>
                                                <li><a class="dropdown-item d-flex align-items-center gap-2" href="#"><i
                                                            class="ph ph-x-circle"></i>
                                                        Delete</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>

                                <li class="d-flex  align-items-center">
                                    <div class="profile-icon bg-secondary">
                                        <span>
                                            <i class="ph ph-arrows-clockwise"></i>
                                        </span>
                                    </div>
                                    <div class="flex-grow-1 ms-3">
                                        <h6 class="mb-0">Celine Dion</h6>
                                        <p class="mb-0">204kb</p>
                                    </div>
                                    <div>
                                        <div class="dropdown">
                                            <span type="button" data-bs-toggle="dropdown" aria-expanded="false"
                                                style="background-color: transparent; border: none;">
                                                <i class="ph ph-dots-three"></i>
                                            </span>
                                            <ul class="dropdown-menu dropdown-menu-end">
                                                <li><a class="dropdown-item d-flex align-items-center gap-2" href="#"><i
                                                            class="ph ph-share-fat"></i> Share</a></li>
                                                <li><a class="dropdown-item d-flex align-items-center gap-2" href="#"><i
                                                            class="ph ph-x-circle"></i>
                                                        Delete</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </b-card-body>
                    </b-card>
                </b-col>

                <b-col md="6">
                    <b-card no-body>
                        <b-card-header class="mb-0">
                            <b-card-title>
                                <h4>Top Books</h4>
                            </b-card-title>
                        </b-card-header>
                        <b-card-body>
                            <ul class="list-inline mb-0">
                                <li>
                                    <div class="mb-3">
                                        <div class="d-flex justify-content-between mb-3">
                                            <span>Adventure</span>
                                            <div class="text-primary">
                                                95 <span>%</span>
                                            </div>
                                        </div>
                                        <b-progress :max="0" style="height:6px;">
                                            <b-progress-bar :value="Revenue1"></b-progress-bar>
                                        </b-progress>

                                    </div>

                                </li>

                                <li>
                                    <div class="mb-3">
                                        <div class="d-flex justify-content-between mb-3">
                                            <span>Horror</span>
                                            <div class="text-primary">
                                                72 <span>%</span>
                                            </div>
                                        </div>
                                        <b-progress :max="0" style="height:6px;">
                                            <b-progress-bar :value="Revenue2"></b-progress-bar>
                                        </b-progress>
                                    </div>

                                </li>

                                <li>
                                    <div class="mb-3">
                                        <div class="d-flex justify-content-between mb-3">
                                            <span>Comic Book</span>
                                            <div class="text-primary">
                                                75 <span>%</span>
                                            </div>
                                        </div>
                                        <b-progress :max="0" style="height:6px;">
                                            <b-progress-bar :value="Revenue3"></b-progress-bar>
                                        </b-progress>
                                    </div>

                                </li>

                                <li>
                                    <div class="mb-3">
                                        <div class="d-flex justify-content-between mb-3">
                                            <span>Biography</span>
                                            <div class="text-primary">
                                                70 <span>%</span>
                                            </div>
                                        </div>
                                        <b-progress :max="0" style="height:6px;">
                                            <b-progress-bar :value="Revenue4"></b-progress-bar>
                                        </b-progress>
                                    </div>

                                </li>

                                <li>
                                    <div class="mb-3">
                                        <div class="d-flex justify-content-between mb-3">
                                            <span>Mystery</span>
                                            <div class="text-primary">
                                                80 <span>%</span>
                                            </div>
                                        </div>
                                        <b-progress :max="0" style="height:6px;" ref="progressBar">
                                            <b-progress-bar :value="Revenue5"></b-progress-bar>
                                        </b-progress>
                                    </div>

                                </li>





                            </ul>
                        </b-card-body>
                    </b-card>
                </b-col>

            </b-row>

            <b-card no-body>
                <b-card-header class="mb-0">
                    <b-card-title>
                        <h4>Daily Sales</h4>
                    </b-card-title>
                </b-card-header>
                <b-card-body>
                    <ul class="list-inline mb-0">
                        <li class="d-flex mb-4">
                            <img class="img-fluid avatar-50 rounded-circle " src="/assets/images/avatars/06.jpg" alt="">
                            <div class="flex-grow-1 ms-3">
                                <h5 class="mb-0">Reading on the World</h5>
                                <p class="mb-0">Lorem Ipsum is simply dummy test</p>
                            </div>

                            <div class=" d-flex align-items-center">
                                <span class="text-dark"><b>+$82</b></span>
                            </div>
                        </li>

                        <li class="d-flex mb-4">
                            <img class="img-fluid avatar-50 rounded-circle " src="/assets/images/avatars/07.jpg" alt="">
                            <div class="flex-grow-1 ms-3">
                                <h5 class="mb-0">Little Black Book</h5>
                                <p class="mb-0">Lorem Ipsum is simply dummy test</p>
                            </div>

                            <div class=" d-flex align-items-center">
                                <span class="text-dark"><b>+$90</b></span>
                            </div>
                        </li>
                        <li class="d-flex ">
                            <img class="img-fluid avatar-50 rounded-circle " src="/assets/images/avatars/08.jpg" alt="">
                            <div class="flex-grow-1 ms-3">
                                <h5 class="mb-0">See the More Story</h5>
                                <p class="mb-0">Lorem Ipsum is simply dummy test</p>
                            </div>

                            <div class=" d-flex align-items-center">
                                <span class="text-dark"><b>+$85</b></span>
                            </div>
                        </li>


                    </ul>
                </b-card-body>
            </b-card>

            <b-card no-body>
                <b-card-header class="mb-0">
                    <b-card-title>
                        <h4>Top Products</h4>
                    </b-card-title>
                </b-card-header>
                <b-card-body>
                    <ul class="list-inline mb-0">
                        <li class="align-items-center justify-content-between row mb-3">
                            <div class="col-md-8">
                                <h5>Find The Wave Book</h5>
                                <p class="mb-0">General Book</p>
                            </div>
                            <div class="col-md-4">
                                <div class="d-flex align-items-center">
                                    <span class="text-primary me-3"><b>+$92</b></span>
                                    <b-progress class="d-flex-block w-75" :max="0" style="height:6px;">
                                        <b-progress-bar :value="Revenue10"></b-progress-bar>
                                    </b-progress>
                                </div>
                            </div>
                        </li>

                        <li class="align-items-center justify-content-between row ">
                            <div class="col-md-8">
                                <h5>A man with those Faces</h5>
                                <p class="mb-0">Biography Book</p>
                            </div>
                            <div class="col-md-4">
                                <div class="d-flex align-items-center">
                                    <span class="text-danger me-3"><b>+$85</b></span>
                                    <b-progress class="d-flex-block w-75" :max="0" style="height:6px;">
                                        <b-progress-bar variant="danger" :value="Revenue11"></b-progress-bar>
                                    </b-progress>
                                </div>
                            </div>
                        </li>
                    </ul>
                </b-card-body>
            </b-card>

        </b-col>
    </b-row>
</template>
<script>
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const Revenue1 = ref(0);
        const Revenue2 = ref(0);
        const Revenue3 = ref(0);
        const Revenue4 = ref(0);
        const Revenue5 = ref(0);
        const Revenue6 = ref(0);
        const Revenue7 = ref(0);
        const Revenue8 = ref(0);
        const Revenue9 = ref(0);
        const Revenue10 = ref(0);
        const Revenue11 = ref(0);

        const loadProgress = (progressRef, targetValue) => {
            let value = 0;
            const interval = setInterval(() => {
                if (value >= targetValue) {
                    clearInterval(interval);
                } else {
                    value += 1;
                    progressRef.value = value;
                }
            }, 10); // Adjust the speed of the loading animation here
        };

        onMounted(() => {
            loadProgress(Revenue1, 95);
            loadProgress(Revenue2, 72);
            loadProgress(Revenue3, 75);
            loadProgress(Revenue4, 70);
            loadProgress(Revenue5, 80);

            loadProgress(Revenue6, 70);
            loadProgress(Revenue7, 50);
            loadProgress(Revenue8, 75);
            loadProgress(Revenue9, 25);

            loadProgress(Revenue10, 90);
            loadProgress(Revenue11, 85);
        });

        return { Revenue1, Revenue2, Revenue3, Revenue4, Revenue5, Revenue6, Revenue7, Revenue8, Revenue9, Revenue10, Revenue11};
    },
};
</script>