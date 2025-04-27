<template>
  <b-row>
    <b-col lg="12">
      <b-card>
        <div class="d-flex flex-wrap align-items-center justify-content-between">
          <div class="d-flex flex-wrap align-items-center">
            <div class="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
              <h4 class="me-2 h4">Select2</h4>
            </div>
          </div>
          <small>For more Information regarding Select2 Plugin refer
            <a href="https://www.npmjs.com/package/@vueform/multiselect">Documentation</a>
          </small>
        </div>
      </b-card>
    </b-col>
  </b-row>
  <b-row>
    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="mb-0">
        <b-card-title>Single select boxes</b-card-title>
        </b-card-header>
        <b-card-body>
        <b-card-text class="mb-5">Select2 can take a regular select box. By default it supports all options and operations that are available in a standard select box,but with added flexibility.</b-card-text>
        <select-component v-model="value" :options="options" class="form-control"></select-component>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="mb-0">
        <b-card-title>Multiple select boxes</b-card-title>
        </b-card-header>
        <b-card-body>
        <b-card-text class="mb-5">Select2 also supports multi-value select boxes. The select below is declared with the multiple attribute. We can select multiple data in One time.</b-card-text>
        <select-component v-model="multivalue" mode="tags" :options="multioptions" class="form-control"
          :close-on-select="false"></select-component>
          </b-card-body>
      </b-card>
    </b-col>
    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="mb-0">
        <b-card-title>Dropdown Items</b-card-title>
        </b-card-header>
        <b-card-body>
        <b-card-text class="mb-5">A dropdown allows a user to select a value from a series of options. A selection dropdown can allow
          multiple search selections.</b-card-text>
        <select-component v-model="value" :options="dropdownoptions" class="form-control"></select-component>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="mb-0">
        <b-card-title>Items Input</b-card-title>
        </b-card-header>
        <b-card-body>
        <b-card-text class="mb-5">A dropdown allows a user to select a value from a series of options(Limit is 5
          items).</b-card-text>
        <select-component v-model="multivalue" mode="tags" :options="inputoptions" class="form-control"
          :max="max"></select-component>
          </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'multi-select',
  setup() {
    const value = ref("1")
    const max = ref(5)
    const multivalue = ref(['choise1'])
    const options = ref(['Alabama', 'Amalapuram', 'Arizona', 'Colorada', 'Idaho', 'Montana', 'Anakapalli', 'Akkayapalem', 'Nebraska', 'New Maxico', 'North Dakota', 'Utah', 'Wyoming'])
    const multioptions = ref(['California', 'Nevada', 'Oregon', 'Washington', 'Arizona', 'Colorada', 'Idaho', 'Montana', 'Nebraska', 'New Maxico', 'North Dakota', 'Utah', 'Wyoming', 'Alabama', 'Arkansas', 'Lowa', 'Kansas', 'Missouri', 'Texas', 'South Dakota', 'Kentucky', 'Illinois'])
    const dropdownoptions = ref(['Dropdown item 1', 'Dropdown item 2', 'Dropdown item 3', 'Dropdown item 4', 'Dropdown item 5', 'Dropdown item 6', 'Dropdown item 7', 'Dropdown item 8'])
    const inputoptions = ref(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10'])
    return {
      value,
      max,
      multivalue,
      options,
      multioptions,
      dropdownoptions,
      inputoptions
    }
  }
}
</script>
