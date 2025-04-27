<template>
  <b-row>
    <b-col lg="12">
      <b-card>
        <div class="d-flex flex-wrap align-items-center justify-content-between">
          <div class="d-flex flex-wrap align-items-center">
            <div class="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
              <h4 class="me-2 h4">Flatpickr</h4>
            </div>
          </div>
          <small>For more Information regarding Flatpickr Plugin refer
            <a href="https://flatpickr.js.org/examples/">Documentation</a>
          </small>
        </div>
      </b-card>
    </b-col>
  </b-row>
  <b-row>
    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="mb-0 d-flex justify-content-between">
          <div class="header-title">
            <b-card-title>Basic Date Time</b-card-title>
          </div>
        </b-card-header>
        <b-card-body>
          <p> Flatpickr without any config</p>
          <div class="text-center">
            <flat-picker v-model="form.dateTime" :config="configs.dateTimePicker" class="form-control"
              placeholder="Select Date time.."></flat-picker>
          </div>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="mb-0 d-flex justify-content-between">
          <div class="header-title">
            <b-card-title class="card-title">Selecting multiple dates</b-card-title>
          </div>
        </b-card-header>
          <b-card-body>
            <p> It is possible to select multiple dates.</p>
            <div class="text-center">
              <flat-picker id="multidate-input" v-model="form.multiDate" :config="configs.multiDatePicker"
                class="form-control" placeholder="Select Date.."></flat-picker>
            </div>
          </b-card-body>
      </b-card>
    </b-col>

    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="mb-0 d-flex justify-content-between">
          <div class="header-title">
            <b-card-title>minDate</b-card-title>
          </div>
        </b-card-header>
        <b-card-body>
          <p> minDate option specifies the minimum/earliest date (inclusively) allowed for selection.</p>
          <div class="text-center">
            <flat-picker id="minDate-input" v-model="form.minDate" :config="configs.minDatePicker" class="form-control"
              placeholder="Select Date.."></flat-picker>
          </div>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="mb-0 d-flex justify-content-between">
          <div class="header-title">
            <b-card-title>maxDate</b-card-title>
          </div>
        </b-card-header>
        <b-card-body>
          <p> maxDate option specifies the maximum/latest date (inclusively) allowed for selection.</p>
          <div class="text-center">
            <flat-picker id="maxDate-input" v-model="form.maxDate" :config="configs.maxDatePicker" class="form-control"
              placeholder="Select Date.."></flat-picker>
          </div>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="mb-0 d-flex justify-content-between">
          <div class="header-title">
            <b-card-title>Disabling Specific dates</b-card-title>
          </div>
        </b-card-header>
        <b-card-body>
          <p> If you’d like to make certain dates unavailable for selection</p>
          <div class="text-center">
            <flat-picker id="specificdisable-input" v-model="form.specificDisable" :config="configs.specificDisablePicker"
              class="form-control" placeholder="Select Date.."></flat-picker>
          </div>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="mb-0 d-flex justify-content-between">
          <div class="header-title">
            <b-card-title>Time_picker</b-card-title>
          </div>
        </b-card-header>
        <b-card-body>
          <p> Time pickers allow users to enter a specific Time value .</p>
          <div class="text-center">
            <div class="form-group">
              <flat-picker v-model="form.time" :config="configs.timePicker" class="form-control"
                placeholder="Select Time"></flat-picker>
            </div>
          </div>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="mb-0 d-flex justify-content-between">
          <div class="header-title">
            <b-card-title>Disabling all dates except select few</b-card-title>
          </div>
        </b-card-header>
        <b-card-body>
          <p> This is the enable option, which takes in an array of date strings, date ranges and functions.
            Essentially the same as the disable option above, but reversed.
          </p>
          <div class="text-center">
            <flat-picker v-model="form.disableExcept" :config="configs.disableExceptPicker" class="form-control"
              placeholder="Select Date.."></flat-picker>
          </div>
        </b-card-body>
      </b-card>
    </b-col>

    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="mb-0 d-flex justify-content-between">
          <div class="header-title">
            <b-card-title>Human-friendly Dates</b-card-title>
          </div>
        </b-card-header>
        <b-card-body>
          <p> Upon date selection, the original input will contain a Y-m-d... string, while the altInput will
            display the date in a more legible, customizable format.</p>
          <div class="text-center">
            <flat-picker v-model="form.humanDate" :config="configs.humanDatePicker" class="form-control"
              placeholder="Select Date.."></flat-picker>
          </div>
        </b-card-body>
      </b-card>
    </b-col>

    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="mb-0 d-flex justify-content-between">
          <div class="header-title">
            <b-card-title>Range Calendar</b-card-title>
          </div>
        </b-card-header>
        <b-card-body>
          <p> Select a range of dates using the range calendar.</p>
          <div class="text-center">
            <div class="form-group">
              <flat-picker v-model="form.range" :config="configs.rangePicker" class="form-control"
                placeholder="Select Date"></flat-picker>
            </div>
          </div>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="mb-0 d-flex justify-content-between">
          <div class="header-title">
            <b-card-title> Date Picker</b-card-title>
          </div>
        </b-card-header>
        <b-card-body>
          <p> Date pickers allow users to enter a specific date . </p>
          <div class="text-center">
            <div class="form-group text-center">
              <flat-picker v-model="form.dateBasic" :config="configs.basic" class="form-control"
                placeholder="Select Date.."></flat-picker>
            </div>
          </div>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>
<script setup>
import { ref, reactive } from 'vue'
import FlatPicker from 'vue-flatpickr-component'

const form = ref({
  dateBasic: null,
  dateTime: null,
  multiDate: null,
  minDate: null,
  maxDate: null,
  specificDisable: null,
  humanDate: null,
  range: null,
  disableExcept: null,
  time: null,
  date: '2017-01-01',
  dateLocale: null,
  dateInline: +new Date(),
  dateConfirm: null,
  allowInput: null,
  dateStart: null,
  dateEnd: null,
  monthSelect: null
})

const configs = reactive({
  basic: {},
  dateTimePicker: {
    enableTime: true,
    dateFormat: 'd-m-Y H:i'
  },
  multiDatePicker: {
    mode: 'multiple',
    dateFormat: 'Y-m-d'
  },
  minDatePicker: {
    minDate: '2020-01'
  },
  maxDatePicker: {
    dateFormat: 'd.m.Y',
    maxDate: '15.12.2017'
  },
  specificDisablePicker: {
    disable: ['2025-01-30', '2025-02-21', '2025-03-08', new Date(2025, 4, 9)],
    dateFormat: 'Y-m-d'
  },
  timePicker: {
    wrap: true,
    enableTime: true,
    enableSeconds: true,
    noCalendar: true
  },
  disableExceptPicker: {
    enable: ['2025-03-30', '2025-05-21', '2025-06-08', new Date(2025, 8, 9)]
  },
  humanDatePicker: {
    altInput: true,
    altFormat: 'F j, Y',
    dateFormat: 'Y-m-d'
  },
  rangePicker: {
    mode: 'range',
    minDate: 'today',
    dateFormat: 'Y-m-d'
  }
})
</script>
