<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <b-card no-body>
          <b-card-header class="d-flex justify-content-between mb-0">
            <div class="header-title">
              <b-card-title>Unicons Icon</b-card-title>
            </div>
          </b-card-header>
          <b-card-body>
            <p class="d-flex gap-2 align-items-baseline">Use Class 
                <code>&lt;i class="ion-archive"&gt;&lt;/i&gt;</code>
            </p>
            <b-row class="mt-3">
              <b-col sm="6" md="4" lg="2" v-for="icon in Unicons" :key="icon">
                <a class="icons-list d-flex align-items-center gap-3" href="#">
                  <i :class="icon.iconClass"></i>{{ icon.iconName }}
                </a>
              </b-col>
              <b-col sm="12" class="text-center mt-3">
                <a href="https://www.unicon.net/" target="_blank" class="btn btn-primary">View All Icon</a>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script setup>
const Unicons = [
  { iconClass: 'ion ion-archive', iconName: 'Archive' },
  { iconClass: 'ion ion-reply', iconName: 'Reply' },
  { iconClass: 'ion ion-reply-all', iconName: 'Reply All' },
  { iconClass: 'ion ion-forward', iconName: 'Forward' },
  { iconClass: 'ion ion-play', iconName: 'Play' },
  { iconClass: 'ion ion-volume-high', iconName: 'Volume High' },
  { iconClass: 'ion ion-pricetags', iconName: 'Pricetags' },
  { iconClass: 'ion ion-pause', iconName: 'Pause' },
  { iconClass: 'ion ion-briefcase', iconName: 'Briefcase' },
  { iconClass: 'ion ion-medkit', iconName: 'Medkit' },
  { iconClass: 'ion ion-at', iconName: 'At' },
  { iconClass: 'ion ion-pound', iconName: 'Pound' },
  { iconClass: 'ion ion-asterisk', iconName: 'Asterisk' },
  { iconClass: 'ion ion-alert', iconName: 'Alert' },
  { iconClass: 'ion ion-alert-circled', iconName: 'Alert Circled' },
  { iconClass: 'ion ion-refresh', iconName: 'Refresh' },
  { iconClass: 'ion ion-loop', iconName: 'Loop' },
  { iconClass: 'ion ion-shuffle', iconName: 'Shuffle' },
  { iconClass: 'ion ion-home', iconName: 'Home' },
  { iconClass: 'ion ion-search', iconName: 'Search' },
  { iconClass: 'ion ion-flag', iconName: 'Flag' },
  { iconClass: 'ion ion-heart', iconName: 'Heart' },
  { iconClass: 'ion ion-heart-broken', iconName: 'Broken' },
  { iconClass: 'ion ion-gear-a', iconName: 'Gear' },
  { iconClass: 'ion ion-gear-b', iconName: 'Gear Bold' },
  { iconClass: 'ion ion-toggle-filled', iconName: 'Toggle' },
  { iconClass: 'ion ion-trash-b', iconName: 'Trash Fill' },
  { iconClass: 'ion ion-hammer', iconName: 'Hammer' },
  { iconClass: 'ion ion-wrench', iconName: 'Wrench' },
  { iconClass: 'ion ion-information-circled', iconName: 'Information' },
  { iconClass: 'ion ion-help-circled', iconName: 'Help' },
  { iconClass: 'ion ion-plus-circled', iconName: 'Plus' },
  { iconClass: 'ion ion-close-circled', iconName: 'Close' },
  { iconClass: 'ion ion-email-unread', iconName: 'Email' },
  { iconClass: 'ion ion-upload', iconName: 'Upload' },
  { iconClass: 'ion ion-soup-can', iconName: 'Database' },
  { iconClass: 'ion ion-thumbsup', iconName: 'Thumbsup' },
  { iconClass: 'ion ion-thumbsdown', iconName: 'Thumbsdown' },
  { iconClass: 'ion ion-pricetag', iconName: 'Pricetag' },
  { iconClass: 'ion ion-bowtie', iconName: 'Bowtie' }
];
</script>
