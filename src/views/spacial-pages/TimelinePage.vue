<template>
  <b-row class="justify-content-center">
    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="d-flex justify-content-between mb-0">
          <b-card-title>
            Product Orders
          </b-card-title>
        </b-card-header>
        <b-card-body class="px-0">
          <ul class="px-5">
            <li v-for="(order, index) in orders" :key="index" class="list-unstyled d-flex mb-3">
              <div :class="['timeline-dots', order.borderClass]">
                <i class="ph ph-tent"></i>
              </div>
              <div class="ms-4 w-100">
                <div class="d-flex justify-content-between">
                  <h6>{{ order.clientName }}</h6>
                  <small class="ms-auto custom-text-end">{{ order.date }}</small>
                </div>
                <p>{{ order.description }}</p>
              </div>
            </li>
          </ul>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="d-flex justify-content-between mb-0">
          <b-card-title>
            Product Orders
          </b-card-title>
        </b-card-header>
        <b-card-body class="px-0">
          <ul class="px-5">
            <li v-for="(order, index) in orders" :key="index" class="list-unstyled d-flex mb-3">
              <div :class="['timeline-dots', order.borderClass]">
                <i class="ph ph-tent"></i>
              </div>
              <div class="ms-4 w-100">
                <div class="d-flex justify-content-between">
                  <h6>{{ order.clientName }}</h6>
                  <small class="ms-auto custom-text-end">{{ order.date }}</small>
                </div>
                <p>{{ order.description }}</p>
              </div>
            </li>
          </ul>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>
<script setup>
import { ref } from 'vue';

// Define the reactive data for orders
const orders = ref([
  {
    clientName: 'Client Image',
    date: '19 November 2019',
    description: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
    borderClass: ''
  },
  {
    clientName: 'Client Image',
    date: '19 November 2019',
    description: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
    borderClass: 'border-success'
  },
  {
    clientName: 'Client Image',
    date: '19 November 2019',
    description: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
    borderClass: 'border-danger'
  },
  {
    clientName: 'Client Image',
    date: '19 November 2019',
    description: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
    borderClass: ''
  },
  {
    clientName: 'Client Image',
    date: '19 November 2019',
    description: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
    borderClass: 'border-info'
  },
  {
    clientName: 'Client Image',
    date: '19 November 2019',
    description: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
    borderClass: 'border-info'
  },
  {
    clientName: 'Client Image',
    date: '19 November 2019',
    description: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
    borderClass: 'border-warning'
  },
  {
    clientName: 'Client Image',
    date: '19 November 2019',
    description: 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
    borderClass: 'border-info'
  }
]);
</script>