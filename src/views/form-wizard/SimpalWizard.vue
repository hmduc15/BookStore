

<template>
    <b-row>
        <div class="col-sm-12 col-lg-12">
            <b-card no-body>
                <b-card-header class="d-flex justify-content-between mb-0">
                    <div class="header-title">
                        <h4 class="card-title">Simple Wizard</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <form id="form-wizard1" class="mt-3 text-center">
                        <ul id="top-tab-list" class="p-0 row list-inline">
                            <li class="mb-2 col-lg-3 col-md-6 text-start"
                                :class="{ 'active': isActive(0), 'done': isDone(0) }" >
                                <a href="javascript:void(0);">
                                    <div class="iq-icon me-3">
                                        <svg class="icon-20 svg-icon" width="20" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4"
                                                d="M8.23918 8.70907V7.36726C8.24934 5.37044 9.92597 3.73939 11.9989 3.73939C13.5841 3.73939 15.0067 4.72339 15.5249 6.19541C15.6976 6.65262 16.2057 6.89017 16.663 6.73213C16.8865 6.66156 17.0694 6.50253 17.171 6.29381C17.2727 6.08508 17.293 5.84654 17.2117 5.62787C16.4394 3.46208 14.3462 2 11.9786 2C8.95048 2 6.48126 4.41626 6.46094 7.38714V8.91084L8.23918 8.70907Z"
                                                fill="currentColor"></path>
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M7.7688 8.71118H16.2312C18.5886 8.71118 20.5 10.5808 20.5 12.8867V17.8246C20.5 20.1305 18.5886 22.0001 16.2312 22.0001H7.7688C5.41136 22.0001 3.5 20.1305 3.5 17.8246V12.8867C3.5 10.5808 5.41136 8.71118 7.7688 8.71118ZM11.9949 17.3286C12.4928 17.3286 12.8891 16.941 12.8891 16.454V14.2474C12.8891 13.7703 12.4928 13.3827 11.9949 13.3827C11.5072 13.3827 11.1109 13.7703 11.1109 14.2474V16.454C11.1109 16.941 11.5072 17.3286 11.9949 17.3286Z"
                                                fill="currentColor"></path>
                                        </svg>
                                    </div>{{" "}}
                                    <span class="dark-wizard">Account</span>
                                </a>
                            </li>
                            <li class="mb-2 col-lg-3 col-md-6 text-start"
                                :class="{ 'active': isActive(1), 'done': isDone(1) }">
                                <a href="javascript:void(0);">
                                    <div class="iq-icon me-3">
                                        <svg class="icon-20" width="20" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M11.997 15.1746C7.684 15.1746 4 15.8546 4 18.5746C4 21.2956 7.661 21.9996 11.997 21.9996C16.31 21.9996 19.994 21.3206 19.994 18.5996C19.994 15.8786 16.334 15.1746 11.997 15.1746Z"
                                                fill="currentColor"></path>
                                            <path opacity="0.4"
                                                d="M11.9971 12.5838C14.9351 12.5838 17.2891 10.2288 17.2891 7.29176C17.2891 4.35476 14.9351 1.99976 11.9971 1.99976C9.06008 1.99976 6.70508 4.35476 6.70508 7.29176C6.70508 10.2288 9.06008 12.5838 11.9971 12.5838Z"
                                                fill="currentColor"></path>
                                        </svg>
                                    </div>{{" "}}
                                    <span class="dark-wizard">Personal</span>
                                </a>
                            </li>
                            <li class="mb-2 col-lg-3 col-md-6 text-start"
                                :class="{ 'active': isActive(2), 'done': isDone(2) }" >
                                <a href="javascript:void(0);">
                                    <div class="iq-icon me-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon-20" width="20"
                                            viewBox="0 0 24 24" fill="none">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M16.71 10.0721C16.71 10.5716 17.11 10.9711 17.61 10.9711C18.11 10.9711 18.52 10.5716 18.52 10.0721C18.52 9.57269 18.11 9.16315 17.61 9.16315C17.11 9.16315 16.71 9.57269 16.71 10.0721ZM14.77 16.1054C14.06 16.8146 13.08 17.2542 12 17.2542C10.95 17.2542 9.97 16.8446 9.22 16.1054C8.48 15.3563 8.07 14.3774 8.07 13.3285C8.06 12.2897 8.47 11.3108 9.21 10.5616C9.96 9.81243 10.95 9.40288 12 9.40288C13.05 9.40288 14.04 9.81243 14.78 10.5516C15.52 11.3008 15.93 12.2897 15.93 13.3285C15.92 14.4173 15.48 15.3962 14.77 16.1054ZM12 10.9012C11.35 10.9012 10.74 11.1509 10.27 11.6204C9.81 12.0799 9.56 12.6892 9.57 13.3185V13.3285C9.57 13.9778 9.82 14.5871 10.28 15.0466C10.74 15.5061 11.35 15.7558 12 15.7558C13.34 15.7558 14.42 14.667 14.43 13.3285C14.43 12.6792 14.18 12.0699 13.72 11.6104C13.26 11.1509 12.65 10.9012 12 10.9012Z"
                                                fill="currentColor" />
                                            <path opacity="0.4"
                                                d="M17.44 6.2364L17.34 6.01665C17.07 5.44728 16.76 4.78801 16.57 4.40844C16.11 3.50943 15.32 3.00999 14.35 3H9.64C8.67 3.00999 7.89 3.50943 7.43 4.40844C7.23 4.80799 6.89 5.52719 6.61 6.11654L6.55 6.2364C6.52 6.31632 6.44 6.35627 6.36 6.35627C3.95 6.35627 2 8.3141 2 10.7114V16.6448C2 19.0422 3.95 21 6.36 21H17.64C20.04 21 22 19.0422 22 16.6448V10.7114C22 8.3141 20.04 6.35627 17.64 6.35627C17.55 6.35627 17.48 6.30633 17.44 6.2364Z"
                                                fill="currentColor" />
                                        </svg>
                                    </div>{{" "}}
                                    <span class="dark-wizard">Image</span>
                                </a>
                            </li>
                            <li class="mb-2 col-lg-3 col-md-6 text-start"
                                :class="{ 'active': isActive(3), 'done': isDone(3) }">
                                <a href="javascript:void(0);">
                                    <div class="iq-icon me-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="none"
                                            viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>{{" "}}
                                    <span class="dark-wizard">Finish</span>
                                </a>
                            </li>
                        </ul>

                        <!-- fieldsets -->
                        <fieldset v-show="currentTab === 0">
                            <div class="form-card text-start">
                                <!-- Content for Account Information -->
                                <b-row>
                                    <b-col cols="7">
                                        <h3 class="mb-4">Account Information:</h3>
                                    </b-col>
                                    <b-col cols="5" class="text-end">
                                        <h2 class="steps">Step 1 - 4</h2>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col md="6">
                                        <div class="form-group">
                                            <label class="form-label">Email: *</label>
                                            <input type="email" class="form-control" name="email"
                                                placeholder="Email Id" />
                                        </div>
                                    </b-col>
                                    <b-col md="6">
                                        <div class="form-group">
                                            <label class="form-label">Username: *</label>
                                            <input type="text" class="form-control" name="uname"
                                                placeholder="UserName" />
                                        </div>
                                    </b-col>
                                    <b-col md="6">
                                        <div class="form-group">
                                            <label class="form-label">Password: *</label>
                                            <input type="password" class="form-control" name="pwd"
                                                placeholder="Password" />
                                        </div>
                                    </b-col>
                                    <b-col md="6">
                                        <div class="form-group">
                                            <label class="form-label">Confirm Password: *</label>
                                            <input type="password" class="form-control" name="cpwd"
                                                placeholder="Confirm Password" />
                                        </div>
                                    </b-col>
                                </b-row>
                                <button type="button" class="btn btn-primary next action-button float-end"
                                    @click="changeTab(1)" :disabled="currentTab === tabs.length - 1">Next</button>
                            </div>
                        </fieldset>
                        <fieldset v-show="currentTab === 1">
                            <div class="form-card text-start">
                                <!-- Content for Personal Information -->
                                <b-row>
                                    <b-col cols="7">
                                        <h3 class="mb-4">Personal Information:</h3>
                                    </b-col>
                                    <b-col cols="5">
                                        <h2 class="steps text-end">Step 2 - 4</h2>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col md="6">
                                        <div class="form-group">
                                            <label class="form-label">First Name: *</label>
                                            <input type="text" class="form-control" name="fname"
                                                placeholder="First Name" />
                                        </div>
                                    </b-col>
                                    <b-col md="6">
                                        <div class="form-group">
                                            <label class="form-label">Last Name: *</label>
                                            <input type="text" class="form-control" name="lname"
                                                placeholder="Last Name" />
                                        </div>
                                    </b-col>
                                    <b-col md="6">
                                        <div class="form-group">
                                            <label class="form-label">Contact No.: *</label>
                                            <input type="text" class="form-control" name="phno"
                                                placeholder="Contact No." />
                                        </div>
                                    </b-col>
                                    <b-col md="6">
                                        <div class="form-group">
                                            <label class="form-label">Alternate Contact No.: *</label>
                                            <input type="text" class="form-control" name="phno_2"
                                                placeholder="Alternate Contact No." />
                                        </div>
                                    </b-col>
                                </b-row>
                                <button type="button" class="btn btn-primary next action-button float-end"
                                    @click="changeTab(1)" :disabled="currentTab === tabs.length - 1">Next</button>
                                <button type="button"
                                    class="btn btn-dark previous action-button-previous float-end me-1"
                                    @click="changeTab(-1)" :disabled="currentTab === 0">Previous</button>
                            </div>
                        </fieldset>
                        <fieldset v-show="currentTab === 2">
                            <div class="form-card text-start">
                                <!-- Content for Image Upload -->
                                <b-row>
                                    <b-col cols="7">
                                        <h3 class="mb-4">Image Upload:</h3>
                                    </b-col>
                                    <b-col cols="5" class="text-end">
                                        <h2 class="steps">Step 3 - 4</h2>
                                    </b-col>
                                </b-row>
                                <div class="form-group">
                                    <label class="form-label">Upload Your Photo:</label>
                                    <input type="file" class="form-control" name="pic" accept="image/*">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Upload Signature Photo:</label>
                                    <input type="file" class="form-control" name="pic-2" accept="image/*">
                                </div>
                                <button type="button" class="btn btn-primary next action-button float-end"
                                    @click="changeTab(1)" :disabled="currentTab === tabs.length - 1">Submit</button>
                                <button type="button"
                                    class="btn btn-dark previous action-button-previous float-end me-1"
                                    @click="changeTab(-1)" :disabled="currentTab === 0">Previous</button>
                            </div>
                        </fieldset>
                        <fieldset v-show="currentTab === 3">
                            <div class="form-card text-start">
                                <!-- Content for Finish -->
                                <b-row>
                                    <b-col cols="7">
                                        <h3 class="mb-4">Finish:</h3>
                                    </b-col>
                                    <b-col cols="5" class="text-end">
                                        <h2 class="steps">Step 4 - 4</h2>
                                    </b-col>
                                </b-row>
                                <br><br>
                                <h2 class="text-center text-success"><strong>SUCCESS !</strong></h2>
                                <br>
                                <div class="row justify-content-center">
                                    <div class="col-3"> <img src="/assets/images/pages/img-success.png"
                                            class="img-fluid" alt="fit-image" loading="lazy"> </div>
                                </div>
                                <br><br>
                                <div class="row justify-content-center">
                                    <div class="text-center col-7">
                                        <h5 class="text-center purple-text">You Have Successfully Signed Up</h5>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </b-card-body>
            </b-card>
        </div>
    </b-row>
</template>

<script>
export default {
    data() {
        return {
            currentTab: 0,
            tabs: [
                { id: 'account' },
                { id: 'personal' },
                { id: 'payment' },
                { id: 'confirm' }
            ]
        };
    },
    methods: {
        changeTab(direction) {
            if (this.currentTab + direction >= 0 && this.currentTab + direction < this.tabs.length) {
                this.currentTab += direction;
            }
            console.log('Current Tab:', this.currentTab); // Debugging
        },
        isActive(index) {
            return this.currentTab === index;
        },
        isDone(index) {
            return this.currentTab > index || this.currentTab === 3;
        }
    }
};
</script>
