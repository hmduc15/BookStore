<template>
    <div class="wrapper">
        <router-view></router-view>
    </div>
    <SettingOffcanvas />
</template>

<script setup>
import SettingOffcanvas from '@/components/setting/SettingOffcanvas.vue'
</script>