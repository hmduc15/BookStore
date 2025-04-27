<template>
  <b-card no-body>
    <b-card-header class="d-flex justify-content-between mb-0">
      <div class="header-title">
        <h4 class="card-title">Default Validation</h4>
      </div>
    </b-card-header>
    <b-card-body>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate, ex ac venenatis mollis, diam nibh
        finibus leo</p>
      <form @submit.prevent="formSubmit">
        <b-row>
          <b-col md="6" class="mb-3">
            <label class="form-label" for="validationDefault01">First Name</label>
            <input type="text" class="form-control" id="validationDefault01" required="" />
          </b-col>
          <b-col md="6" class="mb-3">
            <label class="form-label" for="validationDefault02">Last Name</label>
            <input type="text" class="form-control" id="validationDefault02" required="" />
          </b-col>
          <b-col md="6" class="mb-3">
            <label for="validationCustomUsername" class="form-label">Username</label>
            <div class="form-group input-group">
              <span class="input-group-text pt-1" id="basic-addon1">@</span>
              <input type="text" class="form-control" id="validationCustomUsername" aria-label="Username"
                aria-describedby="basic-addon1" required="" />
            </div>
          </b-col>
          <b-col md="6" class="mb-3">
            <label class="form-label" for="validationDefault03">City</label>
            <input type="text" class="form-control" id="validationDefault03" required="" />
          </b-col>
          <b-col md="6" class="mb-3">
            <label class="form-label" for="validationDefault04">State</label>
            <select class="form-select" id="validationDefault04" required="">
              <option selected="" disabled="" value="">Choose...</option>
              <option>...</option>
            </select>
          </b-col>
          <b-col md="6" class="mb-3">
            <label class="form-label" for="validationDefault05">Zip</label>
            <input type="text" class="form-control" id="validationDefault05" required="" />
          </b-col>
        </b-row>
        <div class="form-group">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" required="" />
            <label class="form-check-label" for="invalidCheck2"> Agree to terms and conditions </label>
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary" type="submit">Submit Form</button>
        </div>
      </form>
    </b-card-body>
  </b-card>
</template>

<script setup>
const formSubmit = (e) => {
  console.log('Form submitted!', e)
}
</script>
