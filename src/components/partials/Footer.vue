<template>
  <footer class="footer">
    <div class="footer-body">
      <ul class="left-panel list-inline mb-0 p-0">
        <li class="list-inline-item fw-500">
          <!-- <router-link class="footer-link" to="/extra-pages/privacy-policy"
            >Privacy Policy</router-link
          > -->
        </li>
        {{
          ""
        }}
        <li class="list-inline-item fw-500">
          <!-- <router-link class="footer-link" to="/extra-pages/terms-of-services"
            >Terms of Use</router-link
          > -->
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";
import { useSetting } from "@/store/pinia/module/useSetting";
const date = new Date().getFullYear();
const store = useSetting();
const appName = computed(() => store.app_name_value);
</script>
