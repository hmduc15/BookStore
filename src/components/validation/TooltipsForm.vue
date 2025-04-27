<template>
  <b-card no-body>
    <b-card-header class="d-flex justify-content-between mb-0">
      <div class="header-title">
        <h4 class="card-title">Tooltips</h4>
      </div>
    </b-card-header>
    <b-card-body>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate, ex ac venenatis mollis, diam nibh finibus leo</p>
      <form :class="`row g-3 needs-validation ${valid ? 'was-validated' : ''}`" novalidate="" @submit.prevent="formSubmit">
        <b-col md="6" class="position-relative">
          <label for="validationTooltip01" class="form-label">First Name</label>
          <input type="text" class="form-control" id="validationTooltip01" value="Mark" required="" />
          <div class="valid-tooltip">Looks good!</div>
        </b-col>
        <b-col md="6" class="position-relative">
          <label for="validationTooltip02" class="form-label">Last Name</label>
          <input type="text" class="form-control" id="validationTooltip02" value="Otto" required="" />
          <div class="valid-tooltip">Looks good!</div>
        </b-col>
        <b-col md="6" class="position-relative">
          <label for="validationTooltipUsername" class="form-label">Username</label>
          <div class="input-group has-validation">
            <span class="input-group-text pt-1" id="validationTooltipUsernamePrepend">@</span>
            <input type="text" class="form-control" id="validationTooltipUsername" aria-describedby="validationTooltipUsernamePrepend" required="" />
            <div class="invalid-tooltip">Please choose a unique and valid username.</div>
          </div>
        </b-col>
        <b-col md="6" class="position-relative">
          <label for="validationTooltip03" class="form-label">City</label>
          <input type="text" class="form-control" id="validationTooltip03" required="" />
          <div class="invalid-tooltip">Please provide a valid city.</div>
        </b-col>
        <b-col md="6" class="position-relative">
          <label for="validationTooltip04" class="form-label">State</label>
          <select class="form-select" id="validationTooltip04" required="">
            <option selected="" disabled="" value="">Choose...</option>
            <option>...</option>
          </select>
          <div class="invalid-tooltip">Please select a valid state.</div>
        </b-col>
        <b-col md="6" class="position-relative">
          <label for="validationTooltip05" class="form-label">Zip</label>
          <input type="text" class="form-control" id="validationTooltip05" required="" />
          <div class="invalid-tooltip">Please provide a valid zip.</div>
        </b-col>
        <div class="form-group mb-0">
          <button class="btn btn-primary mt-5" type="submit">Submit Form</button>
        </div>
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
        firstName: '',
        lastName: '',
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
