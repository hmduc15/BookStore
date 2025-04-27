<template>
  <ul class="navbar-nav iq-main-menu" id="sidebar-menu">
    <li v-for="(item, index) in filterSidebar" :key="index" :class="{
      'nav-item': !item.isDivider,
      [item.class]: item.class && !item.isDivider
    }">
      <!-- dropdown menu items start -->
      <template v-if="item.children">
        <a class="nav-link" v-b-toggle="`collapse-${index}`" href="javascript:void(0);" role="button"
          aria-expanded="false">
          <i class="icon" data-bs-toggle="tooltip" data-bs-placement="right" :data-bs-original-title="item.mainTitle" :title="item.mainTitle">
            <i :class="item.mainLogo"></i>
          </i>
          <span class="item-name">{{ item.mainTitle }}</span>
          <i class="right-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" class="icon-18" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </i>
        </a>

        <b-collapse tag="ul" class="sub-nav" :id="`collapse-${index}`">
    <li v-for="(data, id) in item.children" :key="id" :class="['nav-item']">
      <!-- child if -->
      <template v-if="data.children">
        <router-link v-if="data.route !== '#'" class="nav-link" :to="data.route">
          <i class="icon" data-bs-toggle="tooltip" data-bs-placement="right" :data-bs-original-title="data.title" :title="data.title">
            <i :class="data.logo"></i>
          </i>
          <span class="item-name">{{ data.title }}</span>
        </router-link>
        <a v-else class="nav-link" :href="data.route">
          <i class="icon" data-bs-toggle="tooltip" data-bs-placement="right" :data-bs-original-title="data.title" :title="data.title">
            <i :class="data.logo"></i>
          </i>
          <span class="item-name">{{ data.title }}</span>
        </a>

        <ul>
          <li v-for="(subData, subId) in data.children" :key="subId" class="sub-nav">
            <a :href="subData.route" class="nav-link" v-b-toggle="`sub-collapse-${subId}`">
              <i class="icon" data-bs-toggle="tooltip" data-bs-placement="right" :data-bs-original-title="subData.title" :title="subData.title">
                <i :class="subData.logo"></i>
              </i>
              <i v-if="subData.miniTitle" class="sidenav-mini-icon">{{ subData.miniTitle }}</i>
              <span class="item-name">{{ subData.title }}</span>
              <i class="right-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" class="icon-18" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </i>
            </a>
            <b-collapse tag="ul" class="sub-nav" :id="`sub-collapse-${subId}`">
          <li v-for="(child, childId) in subData.subChild" :key="childId" class="nav-item">

            <!-- for proper route -->
            <router-link v-if="child.route !== '#'" class="nav-link" to="javascript:void(0);">
              <i class="icon" data-bs-toggle="tooltip" data-bs-placement="right" :data-bs-original-title="child.title" :title="child.title">
                <i :class="item.mainLogo"></i>
              </i>
              <i v-if="child.miniTitle" class="sidenav-mini-icon">{{ child.miniTitle }}</i>
              <span class="item-name">{{ child.title }}</span>
            </router-link>

            <!-- for route as "#" -->
            <a v-else class="nav-link" :href="child.route">
              <i class="icon" data-bs-toggle="tooltip" data-bs-placement="right" :data-bs-original-title="child.title" :title="child.title">
                <i :class="item.mainLogo"></i>
              </i>
              <i v-if="child.miniTitle" class="sidenav-mini-icon">{{ child.miniTitle }}</i>
              <span class="item-name">{{ child.title }}</span>
            </a>
          </li>
          </b-collapse>
    </li>
  </ul>
</template>

<!-- child else -->
<template v-else>
  <router-link v-if="data.route !== '#'" :to="data.route" class="nav-link">
    <i class="icon" data-bs-toggle="tooltip" data-bs-placement="right" :data-bs-original-title="data.title" :title="data.title">
      <i :class="data.logo"></i>
    </i>
    <i v-if="data.miniTitle" class="sidenav-mini-icon">{{ data.miniTitle }}</i>
    <span class="item-name">{{ data.title }}</span>
  </router-link>
  <a v-else :href="data.route" class="nav-link">
    <i class="icon" data-bs-toggle="tooltip" data-bs-placement="right" :data-bs-original-title="data.title" :title="data.title">
      <i :class="data.logo"></i>
    </i>
    <i v-if="data.miniTitle" class="sidenav-mini-icon">{{ data.miniTitle }}</i>
    <span class="item-name">{{ data.title }}</span>
  </a>
</template>
</li>
</b-collapse>
</template>
<!-- dropdown menu items end -->

<!-- static item start -->
<template v-else-if="item.isStatic">
  <a class="nav-link static-item disabled text-uppercase" href="#">
    <span class="default-icon">{{ item.mainTitle }}</span>
    <i class="sidenav-mini-icon">-</i>
  </a>
</template>
<!-- static item end -->

<!-- divider start -->

<template v-else-if="item.isDivider">
  <hr class="hr-horizontal">
  </hr>
</template>

<!-- divider end -->

<!-- single page links start -->
<template v-else>
  <router-link class="nav-link" :to="item.route" role="button">
    <i class="icon" data-bs-toggle="tooltip" data-bs-placement="right" :data-bs-original-title="item.mainTitle" :title="item.mainTitle">
      <i :class="item.mainLogo"></i>
    </i>
    <span class="item-name">{{ item.mainTitle }}</span>
  </router-link>
</template>
<!-- single page links end -->
</li>
</ul>
</template>

<script setup>
import { onMounted , nextTick, computed } from 'vue';
import { sidebarMenu } from '../../plugins/sidebar';
import Scrollbar from 'smooth-scrollbar';
import { Tooltip } from 'bootstrap'
import { moduleContext } from '@/store/pinia/store';
import role from '@/common/enum/role';

const context = moduleContext().getContext;

const filterSidebar = computed(() => {
  if (context.isAdmin) {
    return sidebarMenu.filter(item => item.role && item.role.includes(role.Admin))
  } else {
    return sidebarMenu.filter(item => item.role && item.role.includes(role.User))
  }
});


onMounted(() => {
  nextTick(() => {
     Scrollbar.init(document.querySelector('.data-scrollbar'), { continuousScrolling: false });
     const sidebarTooltip = document.querySelectorAll('[data-bs-toggle="tooltip"]')
      sidebarTooltip.forEach((tooltipElement) => {
        new Tooltip(tooltipElement)
      })
  })
});
</script>