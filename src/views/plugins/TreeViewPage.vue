<template>
  <b-row>
    <b-col lg="12">
      <b-card>
        <div class="d-flex flex-wrap align-items-center justify-content-between">
          <div class="d-flex flex-wrap align-items-center">
            <div class="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
              <h4 class="me-2 h4">Tree-View</h4>
            </div>
          </div>
          <small
            >For more Information regarding jsTree Plugin refer
            <a href="https://apexcharts.com/docs/vue-charts/">Documentation</a>
          </small>
        </div>
      </b-card>
    </b-col>
  </b-row>
  <b-row>
    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="d-flex justify-content-between mb-0">
          <b-card-title>Simple Treeview</b-card-title>
        </b-card-header>
        <b-card-body>
          <treeview :config="config" :nodes="nodes"> </treeview>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col lg="6">
      <b-card no-body>
        <b-card-header class="d-flex justify-content-between mb-0">
          <b-card-title>Checkbox Treeview</b-card-title>
        </b-card-header>
        <b-card-body>
          <treeview :config="config2" :nodes="nodes2"> </treeview>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script setup>
import { ref } from 'vue'
import treeview from 'vue3-treeview'
import 'vue3-treeview/dist/style.css'

const config = ref({
  roots: ['id1', 'id2', 'id3'],
  keyboardNavigation: false,
  dragAndDrop: false,
  checkboxes: false,
  editable: false,
  disabled: false,
  padding: 25
})

const nodes = ref({
  id1: {
    text: 'assets',
    children: ['id11', 'id12', 'id13', 'id14', 'id15']
  },
  id11: {
    text: 'vendor',
    children: []
  },
  id12: {
    text: 'images',
    children: ['id111', 'id112', 'id113', 'id114', 'id115']
  },
  id111: {
    text: 'vendor'
  },
  id112: {
    text: 'images'
  },
  id113: {
    text: 'SCSS'
  },
  id114: {
    text: 'modules'
  },
  id115: {
    text: 'js'
  },
  id13: {
    text: 'SCSS',
    children: []
  },
  id14: {
    text: 'modules',
    children: []
  },
  id15: {
    text: 'js',
    children: []
  },
  id2: {
    text: 'templates',
    children: ['id21', 'id22', 'id23', 'id24', 'id25']
  },
  id21: {
    text: 'components',
    children: []
  },
  id22: {
    text: 'layouts',
    children: []
  },
  id23: {
    text: 'modules',
    children: []
  },
  id24: {
    text: 'layouts',
    children: []
  },
  id25: {
    text: 'pages',
    children: ['id251', 'id252']
  },
  id251: {
    text: 'dashboard',
    children: []
  },
  id252: {
    text: 'index.hbs',
    children: []
  }
})

const config2 = ref({
  roots: ['id1', 'id2', 'id3'],
  keyboardNavigation: false,
  dragAndDrop: false,
  checkboxes: true,
  editable: true,
  disabled: false,
  padding: 25
})

const nodes2 = ref({
  id1: {
    text: 'assets',
    children: ['id11', 'id12', 'id13', 'id14', 'id15']
  },
  id11: {
    text: 'vendor',
    children: []
  },
  id12: {
    text: 'images',
    children: ['id111', 'id112', 'id113', 'id114', 'id115']
  },
  id111: {
    text: 'vendor'
  },
  id112: {
    text: 'images'
  },
  id113: {
    text: 'SCSS'
  },
  id114: {
    text: 'modules'
  },
  id115: {
    text: 'js'
  },
  id13: {
    text: 'SCSS',
    children: []
  },
  id14: {
    text: 'modules',
    children: []
  },
  id15: {
    text: 'js',
    children: []
  },
  id2: {
    text: 'templates',
    children: ['id21', 'id22', 'id23', 'id24', 'id25']
  },
  id21: {
    text: 'components',
    children: []
  },
  id22: {
    text: 'layouts',
    children: []
  },
  id23: {
    text: 'modules',
    children: []
  },
  id24: {
    text: 'layouts',
    children: []
  },
  id25: {
    text: 'pages',
    children: ['id251', 'id252']
  },
  id251: {
    text: 'dashboard',
    children: []
  },
  id252: {
    text: 'index.hbs',
    children: []
  }
})
</script>
