<template>
  <b-row>
    <b-col lg="12">
      <b-card>
        <div class="d-flex flex-wrap align-items-center justify-content-between">
          <div class="d-flex flex-wrap align-items-center">
            <div class="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
              <h4 class="me-2 h4">Fslightbox</h4>
            </div>
          </div>
          <small>
            For more Information regarding fslightbox Plugin refer
            <a href="https://fslightbox.com/vue">Documentation</a>
          </small>
        </div>
      </b-card>
    </b-col>
  </b-row>
  <b-row>
    <b-col lg="12">
      <b-card no-body>
        <b-card-header class="d-flex justify-content-between mb-0">
          <b-card-title>Gallery</b-card-title>
        </b-card-header>
        <b-card-body class="text-center">
          <div class="d-grid gap-card grid-cols-3 iq-fslightbox-img">
            <a v-for="(data, index) in galleries" :key="index" data-fslightbox="gallery"
              @click="toggleGallery(index + 1)" role="button">
              <img :src="data" class="img-fluid bg-soft-primary rounded" alt="profile-image" loading="lazy" />
            </a>
          </div>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col lg="12">
      <b-card no-body>
        <b-card-header class="d-flex justify-content-between mb-0">
          <b-card-title>HTML5 Videos</b-card-title>
        </b-card-header>
        <b-card-body class="text-center">
          <div class="d-grid gap-card grid-cols-3 iq-fslightbox-img">
            <a data-fslightbox="gallery" v-for="(data, index) in videos" :key="index" @click="toggleVideo(index + 1)"
              role="button">
              <img :src="data.img" class="img-fluid bg-soft-primary rounded" :alt="data.alt" loading="lazy" />
            </a>
          </div>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col lg="12">
      <b-card no-body>
        <b-card-header class="d-flex justify-content-between mb-0">
          <b-card-title>Youtube Videos</b-card-title>
        </b-card-header>
        <b-card-body class="text-center">
          <div class="d-grid gap-card grid-cols-3 iq-fslightbox-img">
            <a data-fslightbox="gallery" v-for="(data, index) in youTube" :key="index" @click="toggleYoutube(index + 1)"
              role="button">
              <img :src="data.img" class="img-fluid bg-soft-primary rounded" :alt="data.alt" style="height: 100%"
                loading="lazy" />
            </a>
          </div>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
  <FsLightbox :toggler="toggler" :sources="gallerySources" :slide="gallerySlide" />
  <FsLightbox :toggler="toggler1" :sources="videoSources" :slide="videoSlide" />
  <FsLightbox :toggler="toggler2" :sources="youtubeSources" :slide="youtubeSlide" />
</template>

<script setup>
import { ref } from 'vue'
import FsLightbox from 'fslightbox-vue/v3'

const generatePath = (path) => {
  return window.origin + import.meta.env.BASE_URL + path;
};

const galleries = ref([
  generatePath('/assets/images/pro/plugins/img6.jpeg'),
  generatePath('/assets/images/pro/plugins/img1.jpeg'),
  generatePath('/assets/images/pro/plugins/img2.jpg'),
  generatePath('/assets/images/pro/plugins/img3.jpeg'),
  generatePath('/assets/images/pro/plugins/img4.jpeg'),
  generatePath('/assets/images/pro/plugins/img5.jpeg')
])

const videos = ref([
  { img: generatePath('/assets/images/pro/plugins/img7.jpg'), alt: 'Milk Bottle Beside a Tree' },
  { img: generatePath('/assets/images/pro/plugins/img8.jpg'), alt: 'Close-Up of Plant With Green Leaves' },
  { img: generatePath('/assets/images/pro/plugins/img9.jpg'), alt: 'Seagulls Flying Against Blue Sky' }
])

const youTube = ref([
  { img: generatePath('/assets/images/pro/plugins/img10.jpg'), alt: 'Seagulls Flying Against Blue Sky' },
  { img: generatePath('/assets/images/pro/plugins/img11.jpg'), alt: 'Sky High - Fullscreen Lightbox' },
  { img: generatePath('/assets/images/pro/plugins/img12.jpg'), alt: 'Why we lose - Fullscreen Lightbox' }
])

const toggler = ref(false)
const toggler1 = ref(false)
const toggler2 = ref(false)

let gallerySlide = 1
let videoSlide = 1
let youtubeSlide = 1

const gallerySources = ref(galleries.value)
const videoSources = ref([generatePath('/assets/images/pro/plugins/video-1.mp4'), generatePath('/assets/images/pro/plugins/video-2.mp4'), generatePath('/assets/images/pro/plugins/video-3.mp4')])
const youtubeSources = ref(['https://www.youtube.com/watch?v=3nQNiWdeH2Q', 'https://www.youtube.com/watch?v=TW9d8vYrVFQ', 'https://www.youtube.com/watch?v=zyXmsVwZqX4'])

const toggleGallery = (index) => {
  gallerySlide = index
  toggler.value = !toggler.value
}

const toggleVideo = (i) => {
  videoSlide = i
  toggler1.value = !toggler1.value
}
const toggleYoutube = (n) => {
  youtubeSlide = n
  toggler2.value = !toggler2.value
}
</script>
