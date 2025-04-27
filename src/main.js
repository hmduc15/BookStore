import { createApp } from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
import VueApexCharts from 'vue3-apexcharts'
import HighchartsVue from 'vue3-highcharts';
import Vue3Autocounter from '@/assets/vendor/vue3-autocounter'

import 'sweetalert2/dist/sweetalert2.min.css';
import App from './App.vue'
import Router from './router/index'




import 'bootstrap';
import '@/assets/scss/base/icon.scss'
import '@/assets/scss/base/toast.scss'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import 'choices.js/public/assets/styles/choices.min.css';
import './assets/scss/booksto.scss';
import './assets/scss/custom.scss';
import './assets/scss/customizer.scss';
import './assets/scss/rtl.scss';
import './assets/vendor/phosphor-icons/Fonts/regular/style.css';
import './assets/vendor/phosphor-icons/Fonts/duotone/style.css';
import './assets/vendor/phosphor-icons/Fonts/fill/style.css';
import './assets/vendor/ionicons/css/ionicons.min.css';
import 'swiper/scss'
import 'flatpickr/dist/flatpickr.css';
import 'jquery';
import { createPinia } from 'pinia';
import { useComponent } from './common/globalComponent';
import i18n from './i18ns/i18n';
import { popupRegister } from './common/popup/register';
import { vfmPlugin } from './lib/vueFinalModal/Plugin';
import { BootstrapVueNext } from 'bootstrap-vue-next';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import _enum from './common/enum';
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { directive as vClickAway } from 'vue3-click-away';
import Datepicker from 'vuejs3-datepicker';


const app = createApp(App);

popupRegister(app);


const globalConfig = app.config.globalProperties;


const pinia = createPinia();
app.use(VueSweetalert2);
app.use(VueApexCharts);
app.use(Vue3Autocounter);
app.use(HighchartsVue);


useComponent(app);

app.use(Router);
app.use(pinia);
app.use(vfmPlugin);
app.use(BootstrapVueNext);
app.use(VueToast, window._toastConfig || {});
app.use(FloatingVue);
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});
app.use(Datepicker);

app.directive('click-away', vClickAway);


app.mount('#app');

globalConfig.$t = i18n.global.t;
globalConfig._enum = _enum

export { globalConfig };
