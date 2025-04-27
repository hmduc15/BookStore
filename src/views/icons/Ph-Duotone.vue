<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-card no-body>
          <b-card-header class="mb-0 d-flex justify-content-between">
            <div class="header-title">
              <b-card-title>Ph-Duotone Icon</b-card-title>
            </div>
          </b-card-header>
          <b-card-body>
            <p class="d-flex gap-2 align-items-baseline">Use Class <code>&lt;i class="ph ph-bell"&gt;&lt;/i&gt;</code>
            </p>
            <b-row class="mt-3">
              <b-col v-for="icon in PhosphorIcons" :key="icon" sm="6" md="4" lg="2">
                <a class="icons-list d-flex align-items-center gap-3" href="#">
                  <i :class="`${icon.iconClass}`"></i>
                  <p :class="`${icon.isClip === true ? 'line-clip-1 mb-0' : 'mb-0'}`">{{ icon.iconName }}</p>
                </a>
              </b-col>
              <b-col sm="12" class="text-center mt-3">
                <a href="https://phosphoricons.com/" target="_blank" class="btn btn-primary">View All Icon</a>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup>
const PhosphorIcons = [
  { iconClass: 'ph ph-bell', iconName: 'bell' },
  { iconClass: 'ph ph-phone', iconName: 'phone' },
  { iconClass: 'ph ph-dog', iconName: 'dog' },
  { iconClass: 'ph ph-fish', iconName: 'fish' },
  { iconClass: 'ph ph-bug', iconName: 'bug' },
  { iconClass: 'ph ph-caret-down', iconName: 'caret-down' },
  { iconClass: 'ph ph-caret-left', iconName: 'caret-left' },
  { iconClass: 'ph ph-caret-right', iconName: 'caret-right' },
  { iconClass: 'ph ph-caret-up', iconName: 'caret-up' },
  { iconClass: 'ph ph-caret-circle-double-left', iconName: 'caret-circle-double-left', isClip: true },
  { iconClass: 'ph ph-caret-circle-double-right', iconName: 'caret-circle-double-right', isClip: true },
  { iconClass: 'ph ph-download', iconName: 'download' },
  { iconClass: 'ph ph-navigation-arrow', iconName: 'location-arrow' },
  { iconClass: 'ph ph-share', iconName: 'share' },
  { iconClass: 'ph ph-rewind', iconName: 'rewind' },
  { iconClass: 'ph ph-play', iconName: 'play' },
  { iconClass: 'ph ph-pause', iconName: 'pause' },
  { iconClass: 'ph ph-arrows-clockwise', iconName: 'arrows-clockwise' },
  { iconClass: 'ph ph-speaker-low', iconName: 'speaker-low' },
  { iconClass: 'ph ph-speaker-simple-x', iconName: 'speaker-simple-x' },
  { iconClass: 'ph ph-speaker-x', iconName: 'speaker-x' },
  { iconClass: 'ph ph-speaker-high', iconName: 'speaker-high' },
  { iconClass: 'ph ph-youtube-logo', iconName: 'youtube-logo' },
  { iconClass: 'ph ph-car', iconName: 'car' },
  { iconClass: 'ph ph-truck', iconName: 'truck' },
  { iconClass: 'ph ph-tree', iconName: 'tree' },
  { iconClass: 'ph ph-pinterest-logo', iconName: 'pinterest-logo' },
  { iconClass: 'ph ph-file-js', iconName: 'file-js' },
  { iconClass: 'ph ph-buildings', iconName: 'buildings' },
  { iconClass: 'ph ph-note-pencil', iconName: 'note-pencil' },
  { iconClass: 'ph ph-copy', iconName: 'copy' },
  { iconClass: 'ph ph-scissors', iconName: 'cut' },
  { iconClass: 'ph ph-pen', iconName: 'pen' },
  { iconClass: 'ph ph-tag', iconName: 'tag' },
  { iconClass: 'ph ph-sim-card', iconName: 'sim-card' },
  { iconClass: 'ph ph-list-checks', iconName: 'tasks' },
  { iconClass: 'ph ph-chat-centered-text', iconName: 'comment' },
  { iconClass: 'las la-video', iconName: 'video' },
  { iconClass: 'ph ph-smiley', iconName: 'smile' }
];
</script>
