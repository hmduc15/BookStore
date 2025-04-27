<template>
  <b-row>
    <b-col lg="12">
      <b-card>
        <div class="d-flex flex-wrap align-items-center justify-content-between">
          <div class="d-flex flex-wrap align-items-center">
            <div class="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
              <h4 class="me-2 h4">Uppy</h4>
            </div>
          </div>
          <small>For more Information regarding Uppy Plugin refer
            <a href="https://uppy.io/docs/vue/">Documentation</a>
          </small>
        </div>
      </b-card>
    </b-col>
  </b-row>
  <b-row>
    <b-col lg="12">
      <b-card no-body>
        <b-card-header class="mb-0">
          <b-card-title>Introduction</b-card-title>
        </b-card-header>
        <b-card-body>
          <b-card-text class="mb-5">Uppy is a sleek and modular file uploader. It fetches files from local disk, Google Drive,
            Instagram, remote urls, cameras etc, and then uploads them to the final destination. It’s fast, has a
            comprehensible API and lets you worry about more important problems than building a file
            uploader.</b-card-text>
          <div class="text-center">
            <uppy-dashboard id="drag-drop-area" />
          </div>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import UppyDashboard from '@/components/custom/uppy/UppyDashboard.vue'
export default {
  name: 'UppyPage',
  components: {
    UppyDashboard
  }
}
</script>
