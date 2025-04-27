<template>
    <b-row>
        <b-col sm="12" lg="6">
            <b-card no-body>
                <b-card-header class="d-flex justify-content-between mb-0">
                    <div class="header-title">
                        <h4 class="card-title">Basic Checkbox</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate, ex ac venenatis mollis,
                        diam nibh
                        finibus leo</p>
                    <div class="form-check form-check-inline me-2">
                        <input type="checkbox" class="form-check-input" id="checkbox1">
                        <label for="checkbox1">Primary / Inactive</label>
                    </div>{{" "}}
                    <div class="form-check form-check-inline me-2">
                        <input type="checkbox" class="form-check-input" value="" id="checkbox2" checked />
                        <label for="checkbox2">Primary / Active</label>
                    </div>{{" "}}
                    <div class="form-check form-check-inline me-2">
                        <input type="checkbox" class="form-check-input" value="" id="checkbox3" disabled>
                        <label for="checkbox3">Disable / Inactive</label>
                    </div>{{" "}}
                    <div class="form-check form-check-inline me-2">
                        <input type="checkbox" class="form-check-input" value="" id="checkbox4" checked disabled />
                        <label for="checkbox4">Active / Disable</label>
                    </div>{{" "}}
                </b-card-body>
            </b-card>
            <b-card no-body>
                <b-card-header class="d-flex justify-content-between mb-0">
                    <div class="header-title">
                        <h4 class="card-title">Custom Color</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate, ex ac venenatis mollis,
                        diam nibh
                        finibus leo</p>
                    <div class="form-check custom-checkbox custom-checkbox-color form-check-inline">
                        <input type="checkbox" class="form-check-input bg-primary" id="customCheck-11">
                        <label class="form-check-label" for="customCheck-11">Primary </label>
                    </div>{{" "}}
                    <div class="form-check custom-checkbox custom-checkbox-color form-check-inline">
                        <input type="checkbox" class="form-check-input bg-success" id="customCheck-22">
                        <label class="form-check-label" for="customCheck-22">Success</label>
                    </div>{{" "}}
                    <div class="form-check custom-checkbox custom-checkbox-color form-check-inline">
                        <input type="checkbox" class="form-check-input bg-danger" id="customCheck-33">
                        <label class="form-check-label" for="customCheck-33">Danger</label>
                    </div>{{" "}}
                    <div class="form-check custom-checkbox custom-checkbox-color form-check-inline">
                        <input type="checkbox" class="form-check-input bg-warning" id="customCheck-44">
                        <label class="form-check-label" for="customCheck-44">Warning</label>
                    </div>{{" "}}
                    <div class="form-check custom-checkbox custom-checkbox-color form-check-inline">
                        <input type="checkbox" class="form-check-input bg-dark" id="customCheck-55">
                        <label class="form-check-label" for="customCheck-55">Dark</label>
                    </div>{{" "}}
                    <div class="form-check custom-checkbox custom-checkbox-color form-check-inline">
                        <input type="checkbox" class="form-check-input bg-info" id="customCheck-66">
                        <label class="form-check-label" for="customCheck-66"> Info</label>
                    </div>
                </b-card-body>
            </b-card>
            <b-card no-body>
                <b-card-header class="d-flex justify-content-between mb-0">
                    <div class="header-title">
                        <h4 class="card-title">Boolean Checkbox</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate, ex ac venenatis mollis,
                        diam nibh
                        finibus leo</p>
                    <div class="form-check form-check-inline me-2">
                        <input type="checkbox" class="form-check-input" id="customCheck-t" checked />
                        <label class="form-check-label" for="customCheck-t">True</label>
                    </div>{{" "}}
                    <div class="form-check form-check-inline me-2">
                        <input type="checkbox" class="form-check-input" id="customCheck-f">
                        <label class="form-check-label" for="customCheck-f">False</label>
                    </div>
                </b-card-body>
            </b-card>
        </b-col>
        <b-col sm="12" lg="6">
            <b-card no-body>
                <b-card-header class="d-flex justify-content-between mb-0">
                    <div class="header-title">
                        <h4 class="card-title">Custom Checkbox</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate, ex ac venenatis mollis,
                        diam nibh
                        finibus leo</p>
                    <div class="form-check form-checkbox form-check-inline">
                        <input type="checkbox" class="form-check-input" id="customCheck5">
                        <label class="form-check-label" for="customCheck5">Primary / Inactive</label>
                    </div>{{" "}}
                    <div class="form-check form-checkbox form-check-inline">
                        <input type="checkbox" class="form-check-input" id="customCheck6" checked />
                        <label class="form-check-label" for="customCheck6">Primary - active</label>
                    </div>{{" "}}
                    <div class="form-check form-checkbox form-check-inline">
                        <input type="checkbox" class="form-check-input" id="customCheck7" disabled>
                        <label class="form-check-label" for="customCheck7">Primary - inactive - disabled</label>
                    </div>{{" "}}
                    <div class="form-check custom-checkbox form-check-inline">
                        <input type="checkbox" class="form-check-input" id="customCheck8" disabled checked>
                        <label class="form-check-label" for="customCheck8">Primary - active - disabled</label>
                    </div>{{" "}}
                </b-card-body>
            </b-card>
            <b-card no-body>
                <b-card-header class="d-flex justify-content-between mb-0">
                    <div class="header-title">
                        <h4 class="card-title">Color</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate, ex ac venenatis mollis,
                        diam nibh
                        finibus leo</p>
                    <div class="form-check form-checkbox form-check-inline">
                        <input type="checkbox" class="form-check-input bg-primary" id="customCheck-1" checked />
                        <label class="form-check-label" for="customCheck-1"> Primary</label>
                    </div>{{" "}}
                    <div class="form-check form-checkbox form-check-inline">
                        <input type="checkbox" class="form-check-input bg-success" id="customCheck-2" checked />
                        <label class="form-check-label" for="customCheck-2">Success</label>
                    </div>{{" "}}
                    <div class="form-check form-checkbox form-check-inline">
                        <input type="checkbox" class="form-check-input bg-danger" id="customCheck-3" checked />
                        <label class="form-check-label" for="customCheck-3">Danger</label>
                    </div>{{" "}}
                    <div class="form-check form-checkbox form-check-inline">
                        <input type="checkbox" class="form-check-input bg-warning" id="customCheck-4" checked />
                        <label class="form-check-label" for="customCheck-4">Warning</label>
                    </div>{{" "}}
                    <div class="form-check form-checkbox form-check-inline">
                        <input type="checkbox" class="form-check-input bg-dark" id="customCheck-5" checked />
                        <label class="form-check-label" for="customCheck-5">Dark</label>
                    </div>{{" "}}
                    <div class="form-check form-checkbox form-check-inline">
                        <input type="checkbox" class="form-check-input bg-info" id="customCheck-6" checked />
                        <label class="form-check-label" for="customCheck-6">Info</label>
                    </div>{{" "}}
                </b-card-body>
            </b-card>
            <b-card no-body>
                <b-card-header class="d-flex justify-content-between mb-0">
                    <div class="header-title">
                        <h4 class="card-title">Change Icon</h4>
                    </div>
                </b-card-header>
                <b-card-body class="custom-checkboxs">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate, ex ac venenatis mollis,
                        diam nibh finibus leo</p>
                    <div class="form-check custom-checkbox checkbox-icon form-check-inline">
                        <input type="checkbox" class="form-check-input" id="customCheck-10"
                            v-model="checkboxes.music" />
                        <label class="form-check-label" for="customCheck-10"><i
                                class="fa fa-music me-2"></i>Music</label>
                    </div>{{" "}}
                    <div class="form-check custom-checkbox checkbox-icon form-check-inline">
                        <input type="checkbox" class="form-check-input" id="customCheck-20" v-model="checkboxes.sms" />
                        <label class="form-check-label" for="customCheck-20"><i
                                class="fa fa-commenting-o me-2"></i>SMS</label>
                    </div>{{" "}}
                    <div class="form-check custom-checkbox checkbox-icon form-check-inline">
                        <input type="checkbox" class="form-check-input" id="customCheck-30"
                            v-model="checkboxes.cancel" />
                        <label class="form-check-label" for="customCheck-30"><i
                                class="fa fa-times me-2"></i>Cancel</label>
                    </div>{{" "}}
                    <div class="form-check custom-checkbox checkbox-icon form-check-inline">
                        <input type="checkbox" class="form-check-input" id="customCheck-40" v-model="checkboxes.file" />
                        <label class="form-check-label" for="customCheck-40"><i class="fa fa-file me-2"></i>File</label>
                    </div>{{" "}}
                    <div class="form-check custom-checkbox checkbox-icon form-check-inline">
                        <input type="checkbox" class="form-check-input" id="customCheck-50" v-model="checkboxes.bold" />
                        <label class="form-check-label" for="customCheck-50"><i class="fa fa-bold me-2"></i>Bold</label>
                    </div>{{" "}}
                    <div class="form-check custom-checkbox checkbox-icon form-check-inline">
                        <input type="checkbox" class="form-check-input" id="customCheck-60"
                            v-model="checkboxes.location" />
                        <label class="form-check-label" for="customCheck-60"><i
                                class="fa fa-map-marker me-2"></i>Location</label>
                    </div>{{" "}}
                    <div class="form-check custom-checkbox checkbox-icon form-check-inline">
                        <input type="checkbox" class="form-check-input" id="customCheck-70"
                            v-model="checkboxes.camera" />
                        <label class="form-check-label" for="customCheck-70"><i
                                class="fa fa-camera me-2"></i>Camera</label>
                    </div>{{ " " }}
                </b-card-body>
            </b-card>
        </b-col>
    </b-row>
</template>

<script setup>
import { reactive } from 'vue';

// Define reactive state for checkboxes
const checkboxes = reactive({
    music: true,
    sms: true,
    cancel: true,
    file: true,
    bold: true,
    location: true,
    camera: true
});
</script>