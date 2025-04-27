<template>
    <div>
        <b-row>
            <b-col xl="3" lg="4">
                <div class="card">
                    <div class="card-header d-flex justify-content-between mb-0">
                        <div class="header-title">
                            <h4 class="card-title">Add New User</h4>
                        </div>
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="form-group">
                                <div class="profile-img-edit position-relative">
                                    <img src="/assets/images/avatars/01.jpg" alt="profile-pic"
                                        class="theme-color-default-img profile-pic rounded avatar-100" loading="lazy">

                                    <div class="upload-icone bg-primary">
                                        <svg class="upload-button icon-14" width="14" height="14" viewBox="0 0 24 24">
                                            <path fill="#ffffff"
                                                d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                                        </svg>
                                        <input class="file-upload" type="file" accept="image/*">
                                    </div>
                                </div>
                                <div class="img-extension mt-3">
                                    <div class="d-inline-block align-items-center">
                                        <span>Only</span>{{ '' }}
                                        <a href="javascript:void(0);">.jpg</a>{{ '' }}
                                        <a href="javascript:void(0);">.png</a>{{ '' }}
                                        <a href="javascript:void(0);">.jpeg</a>{{ '' }}
                                        <span>allowed</span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group iq-select2-userAdd">
                                <label class="form-label">User Role:</label>
                                <select ref="userRole" class="select2-basic-single form-control">
                                    <option selected>Select</option>
                                    <option>Web Designer</option>
                                    <option>Web Developer</option>
                                    <option>Tester</option>
                                    <option>Php Developer</option>
                                    <option>Ios Developer</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="furl">Facebook URL:</label>
                                <input type="text" class="form-control" id="furl" placeholder="Facebook URL">
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="turl">Twitter URL:</label>
                                <input type="text" class="form-control" id="turl" placeholder="Twitter URL">
                            </div>
                            <div class="form-group">
                                <label class="form-label" for="instaurl">Instagram URL:</label>
                                <input type="text" class="form-control" id="instaurl" placeholder="Instagram URL">
                            </div>
                            <div class="form-group mb-0">
                                <label class="form-label" for="lurl">Linkedin URL:</label>
                                <input type="text" class="form-control" id="lurl" placeholder="Linkedin URL">
                            </div>
                        </form>
                    </div>
                </div>
            </b-col>
            <b-col xl="9" lg="8">
                <b-card no-body>
                    <b-card-header class="d-flex justify-content-between mb-0">
                        <div class="header-title">
                            <h4 class="card-title">New User Information</h4>
                        </div>
                    </b-card-header>
                    <b-card-body>
                        <div class="new-user-info">
                            <form>
                                <b-row class="row">
                                    <b-col md="6" class="form-group ">
                                        <label class="form-label" for="fname">First Name:</label>
                                        <input type="text" class="form-control" id="fname" placeholder="First Name">
                                    </b-col>
                                    <b-col md="6" class="form-group ">
                                        <label class="form-label" for="lname">Last Name:</label>
                                        <input type="text" class="form-control" id="lname" placeholder="Last Name">
                                    </b-col>
                                    <b-col md="6" class="form-group ">
                                        <label class="form-label" for="add1">Street Address 1:</label>
                                        <input type="text" class="form-control" id="add1"
                                            placeholder="Street Address 1">
                                    </b-col>
                                    <b-col md="6" class="form-group ">
                                        <label class="form-label" for="add2">Street Address 2:</label>
                                        <input type="text" class="form-control" id="add2"
                                            placeholder="Street Address 2">
                                    </b-col>
                                    <b-col md="12" class="form-group col-md-12">
                                        <label class="form-label" for="cname">Company Name:</label>
                                        <input type="text" class="form-control" id="cname" placeholder="Company Name">
                                    </b-col>
                                    <b-col sm="12" class="form-group col-sm-12 iq-select2-userAdd">
                                        <label class="form-label">Country:</label>
                                        <select class="select2-basic-single form-control" ref="country">
                                            <option selected>Select Country</option>
                                            <option>Canada</option>
                                            <option>Noida</option>
                                            <option>USA</option>
                                            <option>India</option>
                                            <option>Africag</option>
                                        </select>
                                    </b-col>
                                    <b-col md="6" class="form-group ">
                                        <label class="form-label" for="mobno">Mobile Number:</label>
                                        <input type="text" class="form-control" id="mobno" placeholder="Mobile Number">
                                    </b-col>
                                    <b-col md="6" class="form-group ">
                                        <label class="form-label" for="altconno">Alternate Contact:</label>
                                        <input type="text" class="form-control" id="altconno"
                                            placeholder="Alternate Contact">
                                    </b-col>
                                    <b-col md="6" class="form-group ">
                                        <label class="form-label" for="email">Email:</label>
                                        <input type="email" class="form-control" id="email" placeholder="Email">
                                    </b-col>
                                    <b-col md="6" class="form-group ">
                                        <label class="form-label" for="pno">Pin Code:</label>
                                        <input type="text" class="form-control" id="pno" placeholder="Pin Code">
                                    </b-col>
                                    <b-col md="12" class="form-group col-md-12">
                                        <label class="form-label" for="city">Town/City:</label>
                                        <input type="text" class="form-control" id="city" placeholder="Town/City">
                                    </b-col>
                                </b-row>
                                <hr>
                                <h5 class="mb-3">Security</h5>
                                <b-row class="row">
                                    <b-col md="12" class="form-group col-md-12">
                                        <label class="form-label" for="uname">User Name:</label>
                                        <input type="text" class="form-control" id="uname" placeholder="User Name">
                                    </b-col>
                                    <b-col md="6" class="form-group ">
                                        <label class="form-label" for="pass">Password:</label>
                                        <input type="password" class="form-control" id="pass" placeholder="Password">
                                    </b-col>
                                    <b-col md="6" class="form-group ">
                                        <label class="form-label" for="rpass">Repeat Password:</label>
                                        <input type="password" class="form-control" id="rpass"
                                            placeholder="Repeat Password ">
                                    </b-col>
                                </b-row>
                                <div class="checkbox">
                                    <label class="form-label mb-3"><input class="form-check-input me-2" type="checkbox"
                                            value="" id="flexchexked">Enable Two-Factor-Authentication</label>
                                </div>
                                <div class="form-group">
                                    <button type="submit" class="btn btn-primary">Save</button>{{ '' }}
                                    <button type="submit" class="btn btn-danger">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Choices from 'choices.js';

const country = ref(null);
const userRole = ref(null);

onMounted(() => {
    new Choices(country.value, {
        searchEnabled: true,
        shouldSort: false,
    });
    new Choices(userRole.value, {
        searchEnabled: true,
        shouldSort: false,
    });
});

</script>