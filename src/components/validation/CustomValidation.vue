<template>
  <b-card no-body>
    <b-card-header class="d-flex justify-content-between mb-0">
      <div class="header-title">
        <h4 class="card-title">Custom Validation</h4>
      </div>
    </b-card-header>
    <b-card-body>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate, ex ac venenatis mollis, diam nibh
        finibus leo</p>
      <form :class="`row g-3 needs-validation ${valid ? 'was-validated' : ''}`" @submit.prevent="formSubmit"
        novalidate="">
        <b-col md="4">
          <label for="validationCustom01" class="form-label">First name</label>
          <!-- <input type="text" class="form-control" id="validationCustom01" required="" placeholder="Mark" /> -->
          <BFormInput class="form-control" id="validationCustom01" :state="valid === true ? valid : null"
            value="Mark" />
          <div class="valid-feedback">Looks good!</div>
        </b-col>
        <b-col md="4">
          <label for="validationCustom02" class="form-label">Last name</label>
          <!-- <input type="text" class="form-control" id="validationCustom02" required="" placeholder="Otto" /> -->
          <BFormInput class="form-control" id="validationCustom02" :state="valid === true ? valid : null"
            value="Otto" />
          <div class="valid-feedback">Looks good!</div>
        </b-col>
        <b-col md="4">
          <label for="validationCustomUsername01" class="form-label">Username</label>
          <div class="input-group has-validation">
            <span class="input-group-text pt-1" id="inputGroupPrepend">@</span>
            <input type="text" class="form-control" id="validationCustomUsername01" aria-describedby="inputGroupPrepend"
              required="" />
            <div class="invalid-feedback">Please choose a username.</div>
          </div>
        </b-col>
        <b-col md="6">
          <label for="validationCustom03" class="form-label">City</label>
          <input type="text" class="form-control" id="validationCustom03" required="" />
          <div class="invalid-feedback">Please provide a valid city.</div>
        </b-col>
        <b-col md="3">
          <label for="validationCustom04" class="form-label">State</label>
          <select class="form-select" id="validationCustom04" required="">
            <option selected="" disabled="" value="">Choose...</option>
            <option>...</option>
          </select>
          <div class="invalid-feedback">Please select a valid state.</div>
        </b-col>
        <b-col md="3">
          <label for="validationCustom05" class="form-label">Zip</label>
          <input type="text" class="form-control" id="validationCustom05" required="" />
          <div class="invalid-feedback">Please provide a valid zip.</div>
        </b-col>
        <b-col cols="12" class="">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required="" />
            <label class="form-check-label" for="invalidCheck"> Agree to terms and conditions </label>
            <div class="invalid-feedback">You must agree before submitting.</div>
          </div>
        </b-col>
        <b-col cols="12" class="">
          <button class="btn btn-primary" type="submit">Submit Form</button>
        </b-col>
      </form>
    </b-card-body>
  </b-card>
</template>

<script>
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
export default {
  setup() {
    const v = useVuelidate()
    return {
      v
    }
  },
  data() {
    return {
      valid: false,
      form: {
        firstName: 'Mark',
        lastName: 'Otto',
        username: '',
        city: '',
        state: '',
        zip: '',
        agree: false
      }
    }
  },
  validations() {
    return {
      form: {
        firstName: {
          required
        },
        lastName: {
          required
        },
        username: {
          required
        },
        city: {
          required
        },
        state: {
          required
        },
        zip: {
          required
        },
        agree: {
          required
        }
      }
    }
  },
  methods: {
    async formSubmit() {
      this.valid = true
      const result = await this.v.$validate()
      if (result) {
        // this.valid = true
      }
    },
    resetForm() {
      this.v.$reset()
      this.valid = false
    }
  }
}
</script>
